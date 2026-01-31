"use client";

import { GenieMascot } from "@/components/illustrations/GenieMascot";

interface LoadingGenieProps {
  message?: string;
  size?: "sm" | "md" | "lg";
}

export function LoadingGenie({ 
  message = "Creating your perfect itinerary...", 
  size = "md" 
}: LoadingGenieProps) {
  const sizeClasses = {
    sm: "w-16 h-16",
    md: "w-24 h-24",
    lg: "w-32 h-32"
  };

  return (
    <div className="flex flex-col items-center justify-center gap-6 py-16">
      <div className="relative p-8 rounded-full bg-gradient-to-br from-primary/10 to-primary/5 border-2 border-primary/20">
        <GenieMascot className={sizeClasses[size]} />
        {/* Magic sparkles around genie */}
        <div className="absolute inset-0 animate-ping-slow">
          <div className="absolute top-4 left-4 w-3 h-3 bg-yellow-400 rounded-full animate-twinkle shadow-lg" />
          <div className="absolute top-8 right-6 w-2 h-2 bg-purple-400 rounded-full animate-twinkle shadow-lg" style={{ animationDelay: "0.3s" }} />
          <div className="absolute bottom-8 left-6 w-3 h-3 bg-cyan-400 rounded-full animate-twinkle shadow-lg" style={{ animationDelay: "0.6s" }} />
          <div className="absolute bottom-4 right-4 w-2 h-2 bg-yellow-300 rounded-full animate-twinkle shadow-lg" style={{ animationDelay: "0.9s" }} />
        </div>
      </div>
      
      <div className="text-center space-y-3">
        <p className="text-xl font-semibold animate-pulse">{message}</p>
        <div className="flex gap-1.5 justify-center">
          <span className="w-2.5 h-2.5 bg-primary rounded-full animate-bounce" />
          <span className="w-2.5 h-2.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
          <span className="w-2.5 h-2.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
        </div>
        <p className="text-sm text-muted-foreground">
          Our genie is working its magic ✨
        </p>
      </div>

      <style jsx>{`
        @keyframes ping-slow {
          0%, 100% { opacity: 0; transform: scale(1); }
          50% { opacity: 0.3; transform: scale(1.5); }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.3; transform: scale(0.5); }
        }
        .animate-ping-slow {
          animation: ping-slow 3s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        .animate-twinkle {
          animation: twinkle 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
