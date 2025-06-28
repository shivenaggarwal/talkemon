import Markdown from "react-markdown";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MeetingGetOne } from "@/modules/meetings/types";
import {
  BookOpenTextIcon,
  ClockFadingIcon,
  FileTextIcon,
  FileVideoIcon,
  SparklesIcon,
} from "lucide-react";
import Link from "next/link";
import { GeneratedAvatar } from "@/components/generated-avatar";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { formatDuration } from "@/lib/utils";
import { Transcript } from "@/modules/meetings/ui/components/transcript";
import { ChatProvider } from "@/modules/meetings/ui/components/chat-provider";

interface Props {
  data: MeetingGetOne;
}

export const CompletedState = ({ data }: Props) => {
  return (
    <div className="flex flex-col gap-y-4">
      <Tabs defaultValue="summary">
        <div className="bg-gradient-to-br from-amber-50/50 to-orange-50/50 rounded-xl border-2 border-amber-200 px-3 shadow-lg backdrop-blur-sm">
          <ScrollArea>
            <TabsList className="p-0 bg-transparent justify-start rounded-none h-13">
              <TabsTrigger
                value="summary"
                className="text-amber-700/70 rounded-none bg-transparent data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-b-amber-400 data-[state=active]:text-amber-900 h-full hover:text-amber-800 font-medium transition-all duration-300"
              >
                <BookOpenTextIcon className="w-4 h-4 mr-2" /> Summary
              </TabsTrigger>
              <TabsTrigger
                value="transcript"
                className="text-amber-700/70 rounded-none bg-transparent data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-b-amber-400 data-[state=active]:text-amber-900 h-full hover:text-amber-800 font-medium transition-all duration-300"
              >
                <FileTextIcon className="w-4 h-4 mr-2" /> Transcript
              </TabsTrigger>
              <TabsTrigger
                value="recording"
                className="text-amber-700/70 rounded-none bg-transparent data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-b-amber-400 data-[state=active]:text-amber-900 h-full hover:text-amber-800 font-medium transition-all duration-300"
              >
                <FileVideoIcon className="w-4 h-4 mr-2" /> Recording
              </TabsTrigger>
              <TabsTrigger
                value="chat"
                className="text-amber-700/70 rounded-none bg-transparent data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-b-amber-400 data-[state=active]:text-amber-900 h-full hover:text-amber-800 font-medium transition-all duration-300"
              >
                <SparklesIcon className="w-4 h-4 mr-2" /> Ask AI
              </TabsTrigger>
            </TabsList>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
        <TabsContent value="chat">
          <ChatProvider meetingId={data.id} meetingName={data.name} />
        </TabsContent>
        <TabsContent value="transcript">
          <Transcript meetingId={data.id} />
        </TabsContent>
        <TabsContent value="recording">
          <div className="bg-gradient-to-br from-amber-50/50 to-orange-50/50 rounded-xl border-2 border-amber-200 px-4 py-5 shadow-lg backdrop-blur-sm">
            <video
              src={data.recordingUrl!}
              className="w-full rounded-lg shadow-md border-2 border-amber-200/50"
              controls
            ></video>
          </div>
        </TabsContent>
        <TabsContent value="summary">
          <div className="bg-gradient-to-br from-amber-50/50 to-orange-50/50 rounded-xl border-2 border-amber-200 shadow-lg backdrop-blur-sm">
            <div className="px-6 py-6 gap-y-5 flex flex-col col-span-5">
              <h2 className="text-2xl font-semibold capitalize text-amber-900 tracking-tight">
                {data.name}
              </h2>
              <div className="flex gap-x-2 items-center">
                <Link
                  href={`/agents/${data.agent_id}`}
                  className="flex items-center gap-x-2 text-amber-600 hover:text-amber-800 hover:underline underline-offset-4 capitalize font-medium transition-colors duration-200"
                >
                  <GeneratedAvatar
                    variant="botttsNeutral"
                    seed={data.agent.name}
                    className="size-5 border border-amber-200 shadow-sm"
                  />
                  {data.agent.name}
                </Link>{" "}
                <p className="text-amber-700/80 font-medium">
                  {data.startedAt ? format(data.startedAt, "PPP") : ""}
                </p>
              </div>
              <div className="flex gap-x-2 items-center">
                <SparklesIcon className="size-4 text-amber-600" />
                <p className="text-amber-900 font-semibold tracking-tight">
                  General Summary
                </p>
              </div>
              <Badge
                variant="outline"
                className="flex items-center gap-x-2 [&>svg]:size-4 bg-amber-50/30 border-2 border-amber-200 text-amber-800 hover:bg-amber-100 hover:border-amber-300 transition-all duration-300 shadow-sm rounded-lg w-fit"
              >
                <ClockFadingIcon className="text-amber-600" />
                {data.duration ? formatDuration(data.duration) : "No duration"}
              </Badge>
              <div className="prose prose-amber max-w-none">
                <Markdown
                  components={{
                    h1: (props) => (
                      <h1
                        className="text-2xl font-semibold mb-6 text-amber-900 tracking-tight"
                        {...props}
                      />
                    ),
                    h2: (props) => (
                      <h2
                        className="text-xl font-semibold mb-6 text-amber-900 tracking-tight"
                        {...props}
                      />
                    ),
                    h3: (props) => (
                      <h3
                        className="text-lg font-semibold mb-6 text-amber-900 tracking-tight"
                        {...props}
                      />
                    ),
                    h4: (props) => (
                      <h4
                        className="text-base font-semibold mb-6 text-amber-900 tracking-tight"
                        {...props}
                      />
                    ),
                    p: (props) => (
                      <p
                        className="mb-6 leading-relaxed text-amber-800"
                        {...props}
                      />
                    ),
                    ul: (props) => (
                      <ul
                        className="list-disc list-inside mb-6 text-amber-800 space-y-1"
                        {...props}
                      />
                    ),
                    ol: (props) => (
                      <ol
                        className="list-decimal list-inside mb-6 text-amber-800 space-y-1"
                        {...props}
                      />
                    ),
                    li: (props) => <li className="mb-1" {...props} />,
                    strong: (props) => (
                      <strong
                        className="font-semibold text-amber-900"
                        {...props}
                      />
                    ),
                    code: (props) => (
                      <code
                        className="bg-amber-100/70 text-amber-900 px-2 py-1 rounded border border-amber-200"
                        {...props}
                      />
                    ),
                    blockquote: (props) => (
                      <blockquote
                        className="border-l-4 border-amber-400 pl-4 italic my-4 text-amber-700 bg-amber-50/30 py-2 rounded-r"
                        {...props}
                      />
                    ),
                  }}
                >
                  {data.summary}
                </Markdown>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
