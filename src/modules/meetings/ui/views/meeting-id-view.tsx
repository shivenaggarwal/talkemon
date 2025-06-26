"use client";

import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { useConfirm } from "@/hooks/use-confirm";
import { ActiveState } from "@/modules/meetings/ui/components/active-state";
import { CancelledState } from "@/modules/meetings/ui/components/cancelled-state";
import { MeetingIdViewHeader } from "@/modules/meetings/ui/components/meeting-id-view-header";
import { ProcessingState } from "@/modules/meetings/ui/components/processing-state";
import { UpcomingState } from "@/modules/meetings/ui/components/upcoming-state";
import { UpdateMeetingialog } from "@/modules/meetings/ui/components/update-meeting-dialog";
import { useTRPC } from "@/trpc/client";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  meetingId: string;
}

export const MeetingIdView = ({ meetingId }: Props) => {
  const trpc = useTRPC();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data } = useSuspenseQuery(
    trpc.meetings.getOne.queryOptions({ id: meetingId })
  );

  const [updateMeetingDialogOpen, setUpdateMeetingDialogOpen] = useState(false);

  const [RemoveConfirmation, confrimRemove] = useConfirm(
    "Are you sure?",
    "The following action will removve this meeting."
  );

  const removeMeeting = useMutation(
    trpc.meetings.remove.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.meetings.getMany.queryOptions({}));
        // todo invalidate free tier usage
        router.push("/meetings");
      },
    })
  );

  const handleRemoveMeeting = async () => {
    const ok = await confrimRemove();
    if (!ok) return;

    await removeMeeting.mutateAsync({ id: meetingId });
  };

  const isActive = data.status == "active";
  const isCompleted = data.status == "completed";
  const isCancelled = data.status == "cancelled";
  const isProcessing = data.status == "processing";
  const isUpcoming = data.status == "upcoming";

  return (
    <>
      <RemoveConfirmation />
      <UpdateMeetingialog
        open={updateMeetingDialogOpen}
        onOpenChange={setUpdateMeetingDialogOpen}
        initialValues={data}
      />
      <div className="flex-1 py-4 px-4 md:px-8 flex flex-col gap-y-4">
        <MeetingIdViewHeader
          meetingId={meetingId}
          meetingName={data.name}
          onEdit={() => setUpdateMeetingDialogOpen(true)}
          onRemove={handleRemoveMeeting}
        />
        {isCompleted && <div>COMPLETED</div>}

        {isProcessing && <ProcessingState />}
        {isCancelled && <CancelledState />}
        {isActive && <ActiveState meetingId={meetingId} />}
        {isUpcoming && (
          <UpcomingState
            meetingId={meetingId}
            onCancelMeeting={() => {}}
            isCancelling={false}
          />
        )}
      </div>
    </>
  );
};

export const MeetingsIdViewLoading = () => {
  return (
    <LoadingState
      title="Loading Meetings"
      description="This may take a few seconds"
    />
  );
};

export const MeetingsIdViewError = () => {
  return (
    <ErrorState
      title="Error Loading Meetings"
      description="Something went wrong. Please try again in a while."
    />
  );
};
