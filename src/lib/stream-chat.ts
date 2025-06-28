import "server-only";
import { StreamChat } from "stream-chat";

export const streamChat = StreamChat.getInstance(
  process.env.NEXT_PUBLIC_STERAM_CHAT_API_KEY!,
  process.env.STERAM_CHAT_SECRET_KEY!
);
