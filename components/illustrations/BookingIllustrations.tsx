"use client";

// Step 1: Review booking - Checklist
export function ReviewIllustration() {
  return (
    <div className="flex justify-center mb-8">
      <svg viewBox="0 0 120 120" className="w-36 h-36 sm:w-40 sm:h-40">
        {/* Clipboard */}
        <rect x="30" y="20" width="60" height="80" rx="4" fill="currentColor" className="text-gray-200 dark:text-gray-700" />
        <rect x="35" y="25" width="50" height="70" rx="2" fill="currentColor" className="text-white dark:text-gray-800" />
        
        {/* Clip */}
        <rect x="50" y="15" width="20" height="12" rx="6" fill="currentColor" className="text-gray-400 dark:text-gray-600" />
        
        {/* Checklist items */}
        <g className="animate-check-1">
          <rect x="42" y="35" width="36" height="8" rx="2" fill="currentColor" className="text-gray-200 dark:text-gray-600" />
          <circle cx="45" cy="39" r="3" fill="currentColor" className="text-green-500" />
          <path d="M43.5,39 L44.5,40 L46.5,37.5" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        </g>
        
        <g className="animate-check-2">
          <rect x="42" y="48" width="36" height="8" rx="2" fill="currentColor" className="text-gray-200 dark:text-gray-600" />
          <circle cx="45" cy="52" r="3" fill="currentColor" className="text-green-500" />
          <path d="M43.5,52 L44.5,53 L46.5,50.5" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        </g>
        
        <g className="animate-check-3">
          <rect x="42" y="61" width="36" height="8" rx="2" fill="currentColor" className="text-gray-200 dark:text-gray-600" />
          <circle cx="45" cy="65" r="3" fill="currentColor" className="text-green-500" />
          <path d="M43.5,65 L44.5,66 L46.5,63.5" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        </g>
        
        <rect x="42" y="74" width="36" height="8" rx="2" fill="currentColor" className="text-gray-200 dark:text-gray-600" />
        <circle cx="45" cy="78" r="3" fill="currentColor" className="text-gray-300 dark:text-gray-500" />

        <style jsx>{`
          @keyframes check {
            0% { opacity: 0; transform: scale(0); }
            50% { opacity: 1; transform: scale(1.2); }
            100% { opacity: 1; transform: scale(1); }
          }
          .animate-check-1 { animation: check 0.5s ease-out 0.3s both; }
          .animate-check-2 { animation: check 0.5s ease-out 0.6s both; }
          .animate-check-3 { animation: check 0.5s ease-out 0.9s both; }
        `}</style>
      </svg>
    </div>
  );
}

// Step 2: Enter details - Form with pen
export function DetailsIllustration() {
  return (
    <div className="flex justify-center mb-8">
      <svg viewBox="0 0 120 120" className="w-36 h-36 sm:w-40 sm:h-40">
        {/* Paper/Form */}
        <rect x="25" y="30" width="70" height="60" rx="4" fill="currentColor" className="text-white dark:text-gray-800" stroke="currentColor" strokeWidth="2" className="text-gray-300 dark:text-gray-600" />
        
        {/* Form lines */}
        <line x1="35" y1="45" x2="75" y2="45" stroke="currentColor" strokeWidth="2" className="text-gray-300 dark:text-gray-600" />
        <line x1="35" y1="55" x2="85" y2="55" stroke="currentColor" strokeWidth="2" className="text-gray-300 dark:text-gray-600" />
        <line x1="35" y1="65" x2="70" y2="65" stroke="currentColor" strokeWidth="2" className="text-gray-300 dark:text-gray-600" />
        <line x1="35" y1="75" x2="80" y2="75" stroke="currentColor" strokeWidth="2" className="text-gray-300 dark:text-gray-600" />
        
        {/* Pen writing */}
        <g className="animate-write">
          <path d="M75,50 L85,40 L88,43 L78,53 Z" fill="currentColor" className="text-blue-500" />
          <rect x="85" y="37" width="6" height="6" rx="1" fill="currentColor" className="text-yellow-400" transform="rotate(45 88 40)" />
          <circle cx="76" cy="51" r="2" fill="currentColor" className="text-blue-700" />
        </g>
        
        {/* Envelope icon */}
        <g transform="translate(35, 45)">
          <rect x="0" y="0" width="24" height="16" rx="2" fill="currentColor" className="text-blue-100 dark:text-blue-900" stroke="currentColor" strokeWidth="1.5" className="text-blue-400" />
          <path d="M0,0 L12,10 L24,0" stroke="currentColor" strokeWidth="1.5" fill="none" className="text-blue-400" />
        </g>

        <style jsx>{`
          @keyframes write {
            0%, 100% { transform: translate(0, 0); }
            50% { transform: translate(5px, 5px); }
          }
          .animate-write { animation: write 2s ease-in-out infinite; }
        `}</style>
      </svg>
    </div>
  );
}

// Step 3: Success - Checkmark with confetti
export function SuccessIllustration() {
  return (
    <div className="flex justify-center mb-8">
      <svg viewBox="0 0 120 120" className="w-40 h-40 sm:w-48 sm:h-48">
        {/* Circle background */}
        <circle cx="60" cy="60" r="35" fill="currentColor" className="text-green-500 animate-scale-in" />
        <circle cx="60" cy="60" r="30" fill="currentColor" className="text-green-400 animate-scale-in" style={{ animationDelay: "0.1s" }} />
        
        {/* Checkmark */}
        <g className="animate-draw-check">
          <path d="M45,60 L54,69 L75,48" stroke="white" strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        
        {/* Confetti */}
        <g className="animate-confetti-1">
          <rect x="30" y="20" width="4" height="8" rx="1" fill="currentColor" className="text-yellow-400" transform="rotate(15 32 24)" />
        </g>
        <g className="animate-confetti-2">
          <circle cx="85" cy="25" r="3" fill="currentColor" className="text-pink-400" />
        </g>
        <g className="animate-confetti-3">
          <rect x="25" y="85" width="6" height="6" rx="1" fill="currentColor" className="text-blue-400" transform="rotate(45 28 88)" />
        </g>
        <g className="animate-confetti-4">
          <circle cx="90" cy="80" r="2.5" fill="currentColor" className="text-purple-400" />
        </g>
        <g className="animate-confetti-5">
          <rect x="20" y="50" width="5" height="5" rx="1" fill="currentColor" className="text-green-400" />
        </g>
        <g className="animate-confetti-6">
          <circle cx="95" cy="50" r="2" fill="currentColor" className="text-orange-400" />
        </g>

        <style jsx>{`
          @keyframes scale-in {
            0% { transform: scale(0); opacity: 0; }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); opacity: 1; }
          }
          @keyframes draw-check {
            0% { stroke-dasharray: 100; stroke-dashoffset: 100; }
            100% { stroke-dasharray: 100; stroke-dashoffset: 0; }
          }
          @keyframes confetti {
            0% { transform: translateY(0) rotate(0deg); opacity: 1; }
            100% { transform: translateY(40px) rotate(180deg); opacity: 0; }
          }
          .animate-scale-in { animation: scale-in 0.5s ease-out both; }
          .animate-draw-check { animation: draw-check 0.6s ease-out 0.3s both; }
          .animate-confetti-1 { animation: confetti 1.5s ease-out 0.5s infinite; }
          .animate-confetti-2 { animation: confetti 1.8s ease-out 0.7s infinite; }
          .animate-confetti-3 { animation: confetti 1.6s ease-out 0.6s infinite; }
          .animate-confetti-4 { animation: confetti 1.7s ease-out 0.8s infinite; }
          .animate-confetti-5 { animation: confetti 1.9s ease-out 0.9s infinite; }
          .animate-confetti-6 { animation: confetti 1.4s ease-out 0.4s infinite; }
        `}</style>
      </svg>
    </div>
  );
}
