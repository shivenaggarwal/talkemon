import { CallControls, SpeakerLayout } from "@stream-io/video-react-sdk";
import Link from "next/link";
import Image from "next/image";

interface Props {
  onLeave: () => void;
  meetingName: string;
}

export const CallActive = ({ onLeave, meetingName }: Props) => {
  return (
    <div className="flex flex-col justify-between p-4 h-full">
      <div className="bg-gradient-to-br from-amber-50/80 to-orange-50/80 backdrop-blur-sm border-2 border-amber-200 rounded-full p-2 pr-4 flex items-center gap-3 shadow-lg w-fit">
        <Link
          href="/"
          className="flex items-center justify-center p-1.5 bg-amber-100/50 rounded-full"
        >
          <Image src="/logo.svg" width={45} height={45} alt="logo" />
        </Link>
        <h4 className="text-base font-semibold text-amber-900 tracking-tight">
          {meetingName}
        </h4>
      </div>
      <SpeakerLayout />
      <div className="flex justify-center">
        <CallControls onLeave={onLeave} />
      </div>
    </div>
  );
};
