"use client";

import { Button } from "@/components/ui/button";
import { NewMeetingDialog } from "@/modules/meetings/ui/components/new-meeting-dialog";
import { PlusIcon } from "lucide-react";
import { useState } from "react";

export const MeetingsListHeader = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <NewMeetingDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
      <div className="px-4 py-4 md:px-8 flex flex-col gap-y-4 bg-gradient-to-br from-amber-50/30 to-orange-50/30">
        <div className="flex items-center justify-between">
          <h5 className="font-bold text-xl text-amber-900 drop-shadow-sm tracking-wide font-serif">
            My Meetings
          </h5>
          <Button
            onClick={() => setIsDialogOpen(true)}
            className="bg-gradient-to-r from-amber-400 to-orange-400 border-2 border-amber-400 text-white font-semibold hover:from-amber-500 hover:to-orange-500 hover:border-amber-500 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 shadow-md rounded-xl h-10 px-4"
          >
            <PlusIcon className="size-4 text-white" />
            <span className="font-medium tracking-tight">New Meeting</span>
          </Button>
        </div>
        <div className="flex items-center gap-x-2 p-1">TODO: filters</div>
      </div>
    </>
  );
};
