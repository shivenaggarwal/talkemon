import { LogInIcon } from "lucide-react";
import {
  DefaultVideoPlaceholder,
  // DreamVideoPlaceholder,
  StreamVideoParticipant,
  ToggleAudioPreviewButton,
  ToggleVideoPreviewButton,
  useCallStateHooks,
  VideoPreview,
} from "@stream-io/video-react-sdk";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import { authClient } from "@/lib/auth-client";
import { GenerateAvatarUri } from "@/lib/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Props {
  onJoin: () => void;
}

const DisabledVideoPreview = () => {
  const { data } = authClient.useSession();
  return (
    <div className="w-full h-full bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center">
      <DefaultVideoPlaceholder
        participant={
          {
            name: data?.user.name ?? "",
            image:
              data?.user.image ??
              GenerateAvatarUri({
                seed: data?.user.name ?? "",
                variant: "initials",
              }),
          } as StreamVideoParticipant
        }
      />
    </div>
  );
};

const AllowBrowserPermissions = () => {
  return (
    <div className="w-full h-full flex items-center justify-center p-4 bg-red-50/30">
      <p className="text-sm text-center text-red-700/80">
        Please grant your browser permission to access your camera and
        microphone.
      </p>
    </div>
  );
};

export const CallLobby = ({ onJoin }: Props) => {
  const { useCameraState, useMicrophoneState } = useCallStateHooks();

  const { hasBrowserPermission: hasMicPermission } = useMicrophoneState();
  const { hasBrowserPermission: hasCameraPermission } = useCameraState();

  const hasBrowserMediaPermission = hasCameraPermission && hasMicPermission;

  return (
    <div className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-amber-50 to-orange-100/50">
      <div className="py-4 px-30 flex flex-1 items-center justify-center">
        <div className="flex w-full max-w-lg flex-col items-center justify-center gap-y-6 bg-gradient-to-br from-amber-50/50 to-orange-50/50 border-2 border-amber-200 rounded-xl p-10 shadow-lg backdrop-blur-sm">
          <div className="flex flex-col gap-y-2 text-center">
            <h6 className="text-lg font-semibold text-amber-900 tracking-tight">
              Ready to join?
            </h6>
            <p className="text-sm text-amber-700/80">
              Set up your call before joining
            </p>
          </div>
          <VideoPreview
            className="w-full aspect-video rounded-lg overflow-hidden border-2 border-amber-200"
            DisabledVideoPreview={
              hasBrowserMediaPermission
                ? DisabledVideoPreview
                : AllowBrowserPermissions
            }
          />
          <div className="flex items-center justify-center gap-x-4">
            <div className="bg-amber-50/50 border-2 border-amber-200 text-amber-800 hover:bg-amber-100 hover:border-amber-300 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 shadow-sm rounded-full p-3 data-[state=on]:bg-amber-200 data-[state=on]:border-amber-300">
              <ToggleAudioPreviewButton />
            </div>
            <div className="bg-amber-50/50 border-2 border-amber-200 text-amber-800 hover:bg-amber-100 hover:border-amber-300 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 shadow-sm rounded-full p-3 data-[state=on]:bg-amber-200 data-[state=on]:border-amber-300">
              <ToggleVideoPreviewButton />
            </div>
          </div>
          <div className="flex gap-x-3 justify-between w-full pt-4">
            <Button
              asChild
              variant="ghost"
              className="bg-amber-50/50 border-2 border-amber-200 text-amber-800 hover:bg-amber-100 hover:border-amber-300 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 shadow-md rounded-xl h-11 px-6 font-medium tracking-tight"
            >
              <Link href="/meetings">Cancel</Link>
            </Button>
            <Button
              onClick={onJoin}
              disabled={!hasBrowserMediaPermission}
              className="bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-500 hover:to-orange-500 text-white font-semibold hover:shadow-lg hover:scale-[1.02] transition-all duration-300 shadow-md rounded-xl h-11 px-6 tracking-tight flex-1 flex items-center justify-center gap-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <LogInIcon />
              Join Call
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
