"use client";

import { useState } from "react";

import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";


export default function Home() {
  const { data: session } = authClient.useSession() 

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async () => {
    await authClient.signUp.email({
        email,
        name,
        password,
      },{
        onError: () => {
        window.alert("Error creating user");
      },
      onSuccess: () => {
        window.alert("User created successfully");
      },
    });
  }

  const onLogin = async () => {
    await authClient.signIn.email({
        email,
        password,
      },{
        onError: () => {
        window.alert("Error logging in");
      },
      onSuccess: () => {
        window.alert("User logged in successfully");
      },
    });
  }

  if (session) {
    return (
      <div className="p-4">
        <h1 className="text-2xl">Welcome, {session.user.name}</h1>
        <p className="text-gray-500">You are logged in with email: {session.user.email}</p>
        <Button onClick={() => authClient.signOut()}>Sign Out</Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-4">
      <div className="p-4 flex flex-col gap-y-4">
        <Input placeholder="name" value={name} onChange={(e) => setName(e.target.value)}/>
        <Input placeholder="email" value={email} onChange={(e) =>setEmail( e.target.value)}/>
        <Input placeholder="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        <Button onClick={onSubmit}>Create User</Button>
      </div>

      <div className="p-4 flex flex-col gap-y-4">
        <Input placeholder="email" value={email} onChange={(e) =>setEmail( e.target.value)}/>
        <Input placeholder="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        <Button onClick={onLogin}>Login</Button>
      </div>
    </div>
  )
}

