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
    <div className="flex flex-col items-center justify-center gap-4 py-12">
      <div className="relative">
        <GenieMascot className={sizeClasses[size]} />
        {/* Magic sparkles around genie */}
        <div className="absolute inset-0 animate-ping-slow">
          <div className="absolute top-0 left-0 w-2 h-2 bg-yellow-400 rounded-full animate-twinkle" />
          <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-purple-400 rounded-full animate-twinkle" style={{ animationDelay: "0.3s" }} />
          <div className="absolute bottom-4 left-4 w-2 h-2 bg-cyan-400 rounded-full animate-twinkle" style={{ animationDelay: "0.6s" }} />
          <div className="absolute bottom-2 right-0 w-1.5 h-1.5 bg-yellow-300 rounded-full animate-twinkle" style={{ animationDelay: "0.9s" }} />
        </div>
      </div>
      
      <div className="text-center space-y-2">
        <p className="text-lg font-medium animate-pulse">{message}</p>
        <div className="flex gap-1 justify-center">
          <span className="w-2 h-2 bg-primary rounded-full animate-bounce" />
          <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
          <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
        </div>
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
