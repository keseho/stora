"use client";

import { SignInButton, SignOutButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { useMutation, useQueries, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function Home() {
  const createfile = useMutation(api.file.createFile);
  const files = useQuery(api.file.getFile);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <SignedIn>
        <SignOutButton>
          <Button>Sign Out</Button>
        </SignOutButton>
      </SignedIn>

      <SignedOut>
        <SignInButton mode="modal">
          <Button>Sign In</Button>
        </SignInButton>
      </SignedOut>
      {files?.map((file) => {
        return <div key={file._id}>{file.name}</div>;
      })}

      <Button
        onClick={() => {
          createfile({
            name: "hello world",
          });
        }}
      >
        Click Me
      </Button>
    </main>
  );
}
