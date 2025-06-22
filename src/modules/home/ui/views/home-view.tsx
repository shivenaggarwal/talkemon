"use client";

import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";


export const HomeView = () => {
  const { data: session } = authClient.useSession() 
    const router = useRouter();

  if (!session) {
      return (
        <p>Loading..</p>
   )}
    return (
      <div className="p-4">
        <h1 className="text-2xl">Welcome, {session.user.name}</h1>
        <p className="text-gray-500">You are logged in with email: {session.user.email}</p>
        <Button onClick={() => authClient.signOut({ fetchOptions: { onSuccess: () => router.push("/sign-in") } })}>Sign Out</Button>
      </div>
    );
}

