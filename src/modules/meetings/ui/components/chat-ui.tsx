import { LoadingState } from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Channel as StreamChannel } from "stream-chat";
import "stream-chat-react/dist/css/v2/index.css";
import {
  useCreateChatClient,
  Chat,
  Channel,
  Window,
  MessageList,
  MessageInput,
  Thread,
} from "stream-chat-react";

interface ChatUIProps {
  meetingId: string;
  meetingName: string;
  userId: string;
  userName: string;
  userImage: string | undefined;
}

export const ChatUI = ({
  meetingId,
  meetingName,
  userId,
  userName,
  userImage,
}: ChatUIProps) => {
  const trpc = useTRPC();
  const { mutateAsync: generateChatToken } = useMutation(
    trpc.meetings.generateChatToken.mutationOptions()
  );

  const [channel, setChannel] = useState<StreamChannel>();

  const client = useCreateChatClient({
    apiKey: process.env.NEXT_PUBLIC_STERAM_CHAT_API_KEY!,
    tokenOrProvider: generateChatToken,
    userData: {
      id: userId,
      name: userName,
      image: userImage,
    },
  });

  useEffect(() => {
    if (!client) return;
    const channel = client.channel("messaging", meetingId, {
      members: [userId],
    });
    setChannel(channel);
  }, [client, meetingId, meetingName, userId]);

  if (!client) {
    return (
      <LoadingState
        title="loading chat"
        description="This may take a few seconds"
      />
    );
  }

  return (
    <div className="bg-gradient-to-br from-amber-50/50 to-orange-50/50 rounded-xl border-2 border-amber-200 overflow-hidden shadow-lg backdrop-blur-sm">
      <style jsx global>{`
        /* Override Stream Chat styles to match amber theme */
        .str-chat {
          --str-chat__primary-color: rgb(245 158 11); /* amber-500 */
          --str-chat__active-primary-color: rgb(217 119 6); /* amber-600 */
          --str-chat__surface-color: rgb(254 252 232); /* amber-50 */
          --str-chat__secondary-surface-color: rgb(253 230 138); /* amber-200 */
          --str-chat__primary-surface-color: rgb(252 211 77); /* amber-300 */
          --str-chat__primary-surface-color-low-emphasis: rgb(
            254 243 199
          ); /* amber-100 */
          --str-chat__border-radius-md: 0.75rem;
          --str-chat__border-radius-sm: 0.5rem;
        }

        .str-chat__container {
          background: transparent !important;
        }

        .str-chat__channel {
          background: transparent !important;
        }

        .str-chat__main-panel {
          background: transparent !important;
          border: none !important;
        }

        .str-chat__channel-header {
          background: linear-gradient(
            135deg,
            rgb(254 252 232 / 0.8),
            rgb(255 237 213 / 0.8)
          ) !important;
          border-bottom: 2px solid rgb(251 191 36) !important;
          border-radius: 0.75rem 0.75rem 0 0 !important;
          color: rgb(146 64 14) !important;
          font-weight: 600 !important;
        }

        .str-chat__list {
          background: transparent !important;
        }

        .str-chat__message-simple {
          background: rgb(254 243 199 / 0.3) !important;
          border: 1px solid rgb(251 191 36 / 0.3) !important;
          border-radius: 0.75rem !important;
          margin: 0.5rem 0 !important;
          transition: all 0.3s ease !important;
        }

        .str-chat__message-simple:hover {
          background: rgb(254 243 199 / 0.5) !important;
          border-color: rgb(251 191 36 / 0.5) !important;
          box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1) !important;
        }

        .str-chat__message-text {
          color: rgb(146 64 14) !important;
          line-height: 1.6 !important;
        }

        .str-chat__message-data {
          color: rgb(180 83 9) !important;
          font-weight: 500 !important;
        }

        .str-chat__input {
          background: linear-gradient(
            135deg,
            rgb(254 252 232 / 0.5),
            rgb(255 237 213 / 0.5)
          ) !important;
          border-top: 2px solid rgb(251 191 36) !important;
          border-radius: 0 0 0.75rem 0.75rem !important;
          padding: 1rem !important;
        }

        .str-chat__input-flat {
          background: rgb(254 252 232 / 0.8) !important;
          border: 2px solid rgb(251 191 36) !important;
          border-radius: 0.75rem !important;
          color: rgb(146 64 14) !important;
          font-weight: 500 !important;
          transition: all 0.3s ease !important;
        }

        .str-chat__input-flat:focus {
          border-color: rgb(245 158 11) !important;
          box-shadow: 0 0 0 3px rgb(245 158 11 / 0.1) !important;
          outline: none !important;
        }

        .str-chat__input-flat::placeholder {
          color: rgb(180 83 9 / 0.7) !important;
        }

        .str-chat__send-button {
          background: linear-gradient(
            135deg,
            rgb(245 158 11),
            rgb(251 146 60)
          ) !important;
          border: 2px solid rgb(245 158 11) !important;
          border-radius: 0.75rem !important;
          color: white !important;
          font-weight: 600 !important;
          transition: all 0.3s ease !important;
          box-shadow: 0 2px 4px rgb(0 0 0 / 0.1) !important;
        }

        .str-chat__send-button:hover {
          background: linear-gradient(
            135deg,
            rgb(217 119 6),
            rgb(234 88 12)
          ) !important;
          border-color: rgb(217 119 6) !important;
          box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1) !important;
          transform: scale(1.02) !important;
        }

        .str-chat__avatar {
          border: 2px solid rgb(251 191 36) !important;
          box-shadow: 0 2px 4px rgb(0 0 0 / 0.1) !important;
        }

        .str-chat__date-separator {
          background: rgb(245 158 11) !important;
          color: white !important;
          border-radius: 1rem !important;
          font-weight: 600 !important;
          padding: 0.5rem 1rem !important;
        }

        .str-chat__thread {
          background: linear-gradient(
            135deg,
            rgb(254 252 232 / 0.8),
            rgb(255 237 213 / 0.8)
          ) !important;
          border-left: 2px solid rgb(251 191 36) !important;
        }

        .str-chat__scrollable-list-wrapper {
          scrollbar-width: thin;
          scrollbar-color: rgb(251 191 36) transparent;
        }

        .str-chat__scrollable-list-wrapper::-webkit-scrollbar {
          width: 6px;
        }

        .str-chat__scrollable-list-wrapper::-webkit-scrollbar-track {
          background: transparent;
        }

        .str-chat__scrollable-list-wrapper::-webkit-scrollbar-thumb {
          background: rgb(251 191 36);
          border-radius: 3px;
        }

        .str-chat__scrollable-list-wrapper::-webkit-scrollbar-thumb:hover {
          background: rgb(245 158 11);
        }
      `}</style>
      <Chat client={client}>
        <Channel channel={channel}>
          <Window>
            <div className="flex-1 overflow-y-auto max-h-[calc(100vh-23rem)] border-b-2 border-amber-200">
              <MessageList />
            </div>
            <MessageInput />
          </Window>
          <Thread />
        </Channel>
      </Chat>
    </div>
  );
};
