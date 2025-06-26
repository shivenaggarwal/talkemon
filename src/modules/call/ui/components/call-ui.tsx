import { StreamTheme, useCall } from "@stream-io/video-react-sdk";
import { useState } from "react";

interface Props {
  meetingName: string;
}

export const CallUI = ({ meetingName }: Props) => {
  const call = useCall();
  const [show, setShow] = useState<"lobby" | "call" | "ended">();

  const handleJoin = async () => {
    if (!call) return;
    await call.join();
    setShow("call");
  };

  const handleLeave = async () => {
    if (!call) return;
    call.endCall();
    setShow("ended");
  };

  return (
    <StreamTheme className="h-full ">
      {show === "lobby" && <div>LOBBY</div>}
      {show === "call" && <div>CALL</div>}
      {show === "ended" && <div>ENDED</div>}
    </StreamTheme>
  );
};
