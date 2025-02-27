'use client';

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className=" flex flex-col items-center space-y-8 justify-center min-h-screen bg-gradient-to-b from-background to-secondary/10">
      <div className="text-center space-y-4">
        <h1 className="text-6xl font-bold text-primary">
          Smart Attendance Platform
        </h1>
        <p className="text-xl text-muted-foreground">
          Seamless, Secure & Effortless Attendance Tracking
        </p>
      </div>

      <div className="space-y-4">
        <Button 
          size="lg"
          onClick={() => router.push('/login')}
          className="px-8"
        >
          Login to Continue
        </Button>
      </div>
    </div>
  );
}
