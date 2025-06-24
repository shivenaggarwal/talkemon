"use client";

import { GeneratedAvatar } from "@/components/generated-avatar";
import { Badge } from "@/components/ui/badge";
import { AgentGetOne } from "@/modules/agents/types";
import { ColumnDef } from "@tanstack/react-table";
import { CornerDownRightIcon, VideoIcon } from "lucide-react";

export const columns: ColumnDef<AgentGetOne>[] = [
  {
    accessorKey: "name",
    header: "Agent Name",
    cell: ({ row }) => (
      <div className="flex flex-col gap-y-1">
        <div className="flex items-center gap-x-2">
          <GeneratedAvatar
            variant="botttsNeutral"
            seed={row.original.name}
            className="size-6 border-2 border-amber-300 rounded-full shadow-sm ring-2 ring-amber-200/50"
          />
          <span className="font-semibold capitalize text-amber-900 tracking-tight">
            {row.original.name}
          </span>
        </div>
        <div className="flex items-center gap-x-2">
          <CornerDownRightIcon className="size-3 text-amber-600/70" />
          <span className="text-sm text-amber-700/80 max-w-[200px] truncate capitalize">
            {row.original.instructions}
          </span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "meetingCount",
    header: "Meetings",
    cell: () => (
      <Badge
        variant="outline"
        className="flex items-center gap-x-2 [&>svg]:size-4 bg-gradient-to-r from-amber-50/50 to-orange-50/50 border-2 border-amber-200 text-amber-800 hover:bg-amber-100 hover:border-amber-300 shadow-sm transition-all duration-300"
      >
        <VideoIcon className="text-amber-600" />5 meetings
        {/* {row.original.meetingCount}{" "}
        {row.original.meetingCount === 1 ? "meeting" : "meetings"} */}
      </Badge>
    ),
  },
];
