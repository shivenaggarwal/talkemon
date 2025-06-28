import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Highlighter from "react-highlight-words";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { GenerateAvatarUri } from "@/lib/avatar";
import { format } from "date-fns";

interface Props {
  meetingId: string;
}

export const Transcript = ({ meetingId }: Props) => {
  const trpc = useTRPC();
  const { data } = useQuery(
    trpc.meetings.getTranscript.queryOptions({ id: meetingId })
  );

  const [searchQuery, setSearchQuery] = useState("");
  const filteredData = (data ?? []).filter((item) =>
    item.text.toString().toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-gradient-to-br from-amber-50/50 to-orange-50/50 rounded-xl border-2 border-amber-200 px-6 py-6 flex flex-col gap-y-4 w-full shadow-lg backdrop-blur-sm">
      <p className="text-amber-900 font-semibold tracking-tight">Transcript</p>
      <div className="relative">
        <Input
          placeholder="Search Transcript"
          className="pl-10 h-11 w-[280px] border-2 border-amber-200 bg-amber-50/30 text-amber-900 placeholder:text-amber-600/70 focus:border-amber-400 focus:ring-amber-300/50 transition-all duration-300 rounded-lg shadow-sm"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-amber-600/70" />
      </div>
      <ScrollArea>
        <div className="flex flex-col gap-y-4">
          {filteredData.map((item) => {
            return (
              <div
                key={item.start_ts}
                className="flex flex-col gap-y-3 hover:bg-amber-50/50 p-4 rounded-lg border-2 border-amber-100 hover:border-amber-200 hover:shadow-md transition-all duration-300 bg-amber-50/20"
              >
                <div className="flex gap-x-3 items-center">
                  <Avatar className="size-6 border border-amber-200 shadow-sm">
                    <AvatarImage
                      src={
                        item.user.image ??
                        GenerateAvatarUri({
                          seed: item.user.image,
                          variant: "initials",
                        })
                      }
                      alt="User Avatar"
                    />
                  </Avatar>
                  <p className="text-amber-900 font-semibold tracking-tight">
                    {item.user.name}
                  </p>
                  <p className="text-amber-600 font-medium">
                    {format(new Date(0, 0, 0, 0, 0, 0, item.start_ts), "mm:ss")}
                  </p>
                </div>
                <Highlighter
                  className="text-amber-800 leading-relaxed"
                  highlightClassName="bg-gradient-to-r from-orange-200 to-amber-200 px-1 py-0.5 rounded font-medium text-amber-900"
                  searchWords={[searchQuery]}
                  autoEscape={true}
                  textToHighlight={item.text}
                />
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
};
