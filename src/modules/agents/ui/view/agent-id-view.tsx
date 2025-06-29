"use client";

import { ErrorState } from "@/components/error-state";
import { GeneratedAvatar } from "@/components/generated-avatar";
import { LoadingState } from "@/components/loading-state";
import { Badge } from "@/components/ui/badge";
import { useConfirm } from "@/hooks/use-confirm";
import { AgentIdViewHeader } from "@/modules/agents/ui/components/agent-id-view-header";
import { useTRPC } from "@/trpc/client";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { VideoIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";
import { UpdateAgentDialog } from "@/modules/agents/ui/components/update-agent-dailog";

interface Props {
  agentId: string;
}

export const AgentIdView = ({ agentId }: Props) => {
  const trpc = useTRPC();
  const router = useRouter();
  const queryClient = useQueryClient();

  const [updateAgentDialogOpen, setUpdateAgentDialogOpen] = useState(false);

  const { data } = useSuspenseQuery(
    trpc.agents.getOne.queryOptions({ id: agentId })
  );

  const removeAgent = useMutation(
    trpc.agents.remove.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          trpc.agents.getMany.queryOptions({})
        );
        await queryClient.invalidateQueries(
          trpc.premium.getFreeUsage.queryOptions()
        );
        router.push("/agents");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    })
  );

  const [RemoveConfirmation, confirmRemove] = useConfirm(
    "Are you sure?",
    `The following action will remove ${data.meetingCount} associated meetings`
  );

  const handleRemoveAgent = async () => {
    const ok = await confirmRemove();

    if (!ok) return;

    await removeAgent.mutateAsync({ id: agentId });
  };

  return (
    <>
      <RemoveConfirmation />
      <UpdateAgentDialog
        open={updateAgentDialogOpen}
        onOpenChange={setUpdateAgentDialogOpen}
        initialValues={data}
      />
      <div className="flex-1 py-4 px-4 md:px-8 flex flex-col gap-y-4">
        {/* {JSON.stringify(data, null, 2)} */}
        <AgentIdViewHeader
          agentId={agentId}
          agentName={data.name}
          onEdit={() => setUpdateAgentDialogOpen(true)}
          onRemove={handleRemoveAgent}
        />
        <div className="bg-gradient-to-br from-amber-50/50 to-orange-50/50 rounded-xl border-2 border-amber-200 shadow-lg backdrop-blur-sm">
          <div className="px-6 py-6 gap-y-6 flex flex-col col-span-5">
            <div className="flex items-center gap-x-3">
              <GeneratedAvatar
                variant="botttsNeutral"
                seed={data.name}
                className="size-10 border-2 border-amber-300 rounded-full shadow-md ring-2 ring-amber-200/50"
              />
              <h2 className="text-2xl font-semibold text-amber-900 tracking-tight">
                {data.name}
              </h2>
            </div>
            <Badge
              variant="outline"
              className="flex items-center gap-x-2 [&>svg]:size-4 bg-gradient-to-r from-amber-50/50 to-orange-50/50 border-2 border-amber-200 text-amber-800 hover:bg-amber-100 hover:border-amber-300 shadow-sm transition-all duration-300 w-fit"
            >
              <VideoIcon className="text-amber-600" />
              {data.meetingCount}{" "}
              {data.meetingCount === 1 ? "meeting" : "meetings"}
            </Badge>
            <div className="flex flex-col gap-y-4">
              <p className="text-lg font-semibold text-amber-900 tracking-tight">
                Instructions
              </p>
              <div className="bg-amber-50/30 border-2 border-amber-200/50 rounded-lg p-4 shadow-sm">
                <p className="text-amber-800 leading-relaxed">
                  {data.instructions}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const AgentsIdViewLoading = () => {
  return (
    <LoadingState
      title="Loading Agent"
      description="This may take a few seconds"
    />
  );
};

export const AgentIdViewError = () => {
  return (
    <ErrorState
      title="Error Loading Agent"
      description="Something went wrong. Please try again in a while."
    />
  );
};
