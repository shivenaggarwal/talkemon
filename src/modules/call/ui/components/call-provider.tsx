"use client";

import { authClient } from "@/lib/auth-client";
import { GenerateAvatarUri } from "@/lib/avatar";
import { CallConnect } from "@/modules/call/ui/components/call-connect";
import { LoaderIcon } from "lucide-react";

interface Props {
  meetingId: string;
  meetingName: string;
}

export const CallProvider = ({ meetingId, meetingName }: Props) => {
  const { data, isPending } = authClient.useSession();

  if (!data || isPending) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-y-6 bg-gradient-to-br from-amber-50/50 to-orange-50/50 border-2 border-amber-200 rounded-xl p-10 shadow-lg backdrop-blur-sm">
          <LoaderIcon className="size-6 animate-spin text-amber-600" />
        </div>
      </div>
    );
  }

  return (
    <CallConnect
      meetingId={meetingId}
      meetingName={meetingName}
      userId={data.user.id}
      userName={data.user.name}
      userImage={
        data.user.image ??
        GenerateAvatarUri({ seed: data.user.name, variant: "initials" })
      }
    />
  );
};
