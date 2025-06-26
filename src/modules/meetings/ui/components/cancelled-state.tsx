import { EmptyState } from "@/components/empty-state";

export const CancelledState = () => {
  return (
    <div className="bg-gradient-to-br from-amber-50/50 to-orange-50/50 p-6 rounded-xl border-2 border-amber-200 shadow-lg backdrop-blur-sm flex flex-col gap-y-8 items-center justify-center">
      <EmptyState
        title="Meeting is cancelled"
        description="This meeting was cancelled"
      />
    </div>
  );
};
