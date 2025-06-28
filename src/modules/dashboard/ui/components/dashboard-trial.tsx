import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  MAX_FREE_AGENTS,
  MAX_FREE_MEETINGS,
} from "@/modules/premium/constants";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { RocketIcon } from "lucide-react";
import Link from "next/link";

export const DashboardTrial = () => {
  const trpc = useTRPC();
  const { data } = useQuery(trpc.premium.getFreeUsage.queryOptions());

  // if (!data) return null;
  if (!data)
    return null;
    // <div className="p-3 text-xs text-amber-600/70 bg-gradient-to-br from-amber-50/50 to-orange-50/50 rounded-xl border-2 border-amber-200 shadow-sm">
    //   Loading trial info...
    // </div>

  return (
    <div className="bg-gradient-to-br from-amber-50/50 to-orange-50/50 border-2 border-amber-200 rounded-xl w-full shadow-lg backdrop-blur-sm flex flex-col gap-y-2 overflow-hidden">
      <div className="p-4 flex flex-col gap-y-4">
        <div className="flex items-center gap-2">
          <RocketIcon className="size-4 text-amber-600" />
          <p className="text-amber-900 font-semibold tracking-tight">
            Free Trial
          </p>
        </div>
        <div className="flex flex-col gap-y-2">
          <p className="text-amber-800 text-xs font-medium">
            {data.agentCount}/{MAX_FREE_AGENTS} Agents
          </p>
          <Progress
            value={(data.agentCount / MAX_FREE_AGENTS) * 100}
            className="h-2 bg-amber-100 border border-amber-200 [&>div]:bg-gradient-to-r [&>div]:from-amber-400 [&>div]:to-orange-400 [&>div]:transition-all [&>div]:duration-500"
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <p className="text-amber-800 text-xs font-medium">
            {data.meetingCount}/{MAX_FREE_MEETINGS} Meetings
          </p>
          <Progress
            value={(data.meetingCount / MAX_FREE_MEETINGS) * 100}
            className="h-2 bg-amber-100 border border-amber-200 [&>div]:bg-gradient-to-r [&>div]:from-amber-400 [&>div]:to-orange-400 [&>div]:transition-all [&>div]:duration-500"
          />
        </div>
      </div>
      <Button
        className="bg-amber-50/30 border-t-2 border-amber-200 hover:bg-amber-100 hover:border-amber-300 rounded-t-none rounded-b-xl text-amber-800 font-semibold hover:text-amber-900 transition-all duration-300 hover:shadow-lg hover:scale-[1.01] tracking-tight"
        asChild
      >
        <Link href="/upgrade">Upgrade</Link>
      </Button>
    </div>
  );
};
