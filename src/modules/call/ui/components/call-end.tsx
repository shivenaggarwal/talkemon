import { Button } from "@/components/ui/button";
import Link from "next/link";

export const CallEnded = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-amber-50 to-orange-100/50">
      <div className="py-4 px-30 flex flex-1 items-center justify-center">
        <div className="flex w-full max-w-lg flex-col items-center justify-center gap-y-6 bg-gradient-to-br from-amber-50/50 to-orange-50/50 border-2 border-amber-200 rounded-xl p-10 shadow-lg backdrop-blur-sm">
          <div className="flex flex-col gap-y-2 text-center">
            <h6 className="text-lg font-semibold text-amber-900 tracking-tight">
              You have ended the call
            </h6>
            <p className="text-sm text-amber-700/80">
              Summary will appear in a few minutes.
            </p>
          </div>
          <Button
            asChild
            className="bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-500 hover:to-orange-500 text-white font-semibold hover:shadow-lg hover:scale-[1.02] transition-all duration-300 shadow-md rounded-xl h-11 px-6 tracking-tight flex-1 flex items-center justify-center gap-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Link href="/meetings">Back to meetings</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
