"use client";

import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";


export const HomeView = () => {
  const trpc = useTRPC()
  const { data } = useQuery(trpc.hello.queryOptions({ text: "shiven"}))

    return (
      <div className="p-4">
       {data?.greeting}
      </div>
    );
}

