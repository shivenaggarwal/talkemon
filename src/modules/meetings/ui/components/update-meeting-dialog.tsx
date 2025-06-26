import { ResponsiveDialog } from "@/components/responsive-dialog";
import { MeetingGetOne } from "@/modules/meetings/types";
import { MeetingForm } from "@/modules/meetings/ui/components/meeting-form";

interface UpdateMeetingialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialValues: MeetingGetOne;
}

export const UpdateMeetingialog = ({
  open,
  onOpenChange,
  initialValues,
}: UpdateMeetingialogProps) => {
  return (
    <ResponsiveDialog
      title="Edit Meeting"
      description="Edit the meeting details"
      open={open}
      onOpenChange={onOpenChange}
    >
      <MeetingForm
        onSucess={() => {
          onOpenChange(false);
        }}
        onCancel={() => onOpenChange(false)}
        initialValues={initialValues}
      />
    </ResponsiveDialog>
  );
};
