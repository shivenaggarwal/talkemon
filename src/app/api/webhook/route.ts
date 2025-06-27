import {
  // CallEndedEvent,
  // CallTranscriptionReadyEvent,
  // CallRecordingReadyEvent,
  CallSessionParticipantLeftEvent,
  CallSessionStartedEvent,
} from "@stream-io/node-sdk";

import { streamVideo } from "@/lib/stream-video";
import { NextRequest, NextResponse } from "next/server";
import { agents, meetings } from "@/db/schema";
import { and, eq, not } from "drizzle-orm";
import { db } from "@/db";

function verifySignatureWithSDK(body: string, signature: string): boolean {
  return streamVideo.verifyWebhook(body, signature);
}

export async function POST(req: NextRequest) {
  const signature = req.headers.get("x-signature");
  const apiKey = req.headers.get("x-api-key");

  if (!signature || !apiKey) {
    return NextResponse.json(
      { error: "Missing signature or API key" },
      { status: 400 }
    );
  }

  const body = await req.text();

  if (!verifySignatureWithSDK(body, signature)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  let payload: unknown;

  try {
    payload = JSON.parse(body) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const eventType = (payload as Record<string, unknown>)?.type;

  if (eventType === "call.session_started") {
    const event = payload as CallSessionStartedEvent;
    const meetingId = event.call.custom?.meetingId;

    if (!meetingId) {
      return NextResponse.json({ error: "Missing meetingId" }, { status: 400 });
    }

    const [existingMeeting] = await db
      .select()
      .from(meetings)
      .where(
        and(
          eq(meetings.id, meetingId),
          not(eq(meetings.status, "completed")),
          not(eq(meetings.status, "active")),
          not(eq(meetings.status, "cancelled")),
          not(eq(meetings.status, "processing"))
        )
      );

    if (!existingMeeting) {
      return NextResponse.json({ error: "Meeting not found" }, { status: 404 });
    }

    await db
      .update(meetings)
      .set({
        status: "active",
        startedAt: new Date(),
      })
      .where(eq(meetings.id, existingMeeting.id));

    const [existingAgent] = await db
      .select()
      .from(agents)
      .where(eq(agents.id, existingMeeting.agent_id));

    if (!existingAgent) {
      return NextResponse.json({ error: "Agent not found" }, { status: 404 });
    }

    const call = streamVideo.video.call("default", meetingId);
    console.log("Connecting OpenAI agent...");

    const realtimeClient = await streamVideo.video.connectOpenAi({
      call,
      openAiApiKey: process.env.OPENAI_API_KEY!,
      agentUserId: existingAgent.id,
    });
    // console.log("real time call", realtimeClient);
    console.log("OpenAI agent connected.");

    console.log(
      "Updating agent session with instructions:",
      existingAgent.instructions
    );

    realtimeClient.updateSession({
      instructions: existingAgent.instructions,
    });
    console.log("real time call", realtimeClient);

    console.log("real time call", realtimeClient);
    if (realtimeClient && typeof realtimeClient.realtime?.on === "function") {
      console.log("im working yayaayyyayyayayayayayaayayyy");
      realtimeClient.realtime.on("server.session.created", (event) => {
        console.log("[Agent Debug] server.session.created", event);
      });
      realtimeClient.realtime.on("server.response.created", (event) => {
        console.log("[Agent Debug] server.response.created", event);
      });
      realtimeClient.realtime.on(
        "server.response.output_item.added",
        (event) => {
          console.log("[Agent Debug] server.response.output_item.added", event);
        }
      );
      realtimeClient.realtime.on("server.response.audio.delta", (event) => {
        console.log("[Agent Debug] server.response.audio.delta", event);
      });
      realtimeClient.realtime.on("server.response.text.delta", (event) => {
        console.log("[Agent Debug] server.response.text.delta", event);
      });
      realtimeClient.realtime.on(
        "server.input_audio_buffer.speech_started",
        (event) => {
          console.log(
            "[Agent Debug] server.input_audio_buffer.speech_started",
            event
          );
        }
      );
      realtimeClient.realtime.on(
        "server.input_audio_buffer.speech_stopped",
        (event) => {
          console.log(
            "[Agent Debug] server.input_audio_buffer.speech_stopped",
            event
          );
        }
      );
    } else {
      console.warn(
        "[Agent Debug] realtimeClient.realtime.on is not a function or realtime is missing"
      );
    }

    console.log("Agent session updated.");
  } else if (eventType === "call.session_participant_left") {
    const event = payload as CallSessionParticipantLeftEvent;
    const meetingId = event.call_cid.split(":")[1]; // cid is formatted as "type:id"

    if (!meetingId) {
      return NextResponse.json({ error: "Missing meetingId" }, { status: 400 });
    }

    const call = streamVideo.video.call("default", meetingId);
    await call.end();
  }

  return NextResponse.json({ status: "ok" });
}
