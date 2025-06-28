import { EmptyState } from "@/components/empty-state";
import { Button } from "@/components/ui/button";
import { VideoIcon } from "lucide-react";
import Link from "next/link";

interface Props {
  meetingId: string;
  // onCancelMeeting: () => void;
  // isCancelling: boolean;
}

export const UpcomingState = ({
  meetingId,
}: // onCancelMeeting,
// isCancelling,
Props) => {
  return (
    <div className="bg-gradient-to-br from-amber-50/50 to-orange-50/50 p-6 rounded-xl border-2 border-amber-200 shadow-lg backdrop-blur-sm flex flex-col gap-y-8 items-center justify-center">
      <EmptyState
        title="Not started yet"
        description="Once you start this meeting, a summary will appear here"
      />
      <div className="flex flex-col-reverse lg:flex-row lg:justify-center items-center gap-2 w-full">
        {/* <Button
          variant="outline"
          className="w-full lg:w-auto bg-amber-50/50 border-2 border-amber-200 text-amber-800 hover:bg-amber-100 hover:border-amber-300 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 shadow-md rounded-xl h-11 px-6 font-medium tracking-tight"
          onClick={onCancelMeeting}
          disabled={isCancelling}
        >
          <BanIcon /> Cancel Meeting
        </Button> */}
        <Button
          // disabled={isCancelling}
          asChild
          className="w-full lg:w-auto bg-gradient-to-r from-amber-400 to-orange-400 border-2 border-amber-400 text-white font-semibold hover:from-amber-500 hover:to-orange-500 hover:border-amber-500 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 shadow-md rounded-xl h-11 px-6 tracking-tight"
        >
          <Link href={`/call/${meetingId}`}>
            <VideoIcon /> Start Meeting
          </Link>
        </Button>
      </div>
    </div>
  );
};
