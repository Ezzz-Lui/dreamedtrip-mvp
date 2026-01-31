"use client";

export function GenieMascot({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <svg viewBox="0 0 100 120" fill="none" className="w-full h-full">
        {/* Magic sparkles */}
        <g className="animate-twinkle">
          <circle cx="15" cy="20" r="2" fill="currentColor" className="text-yellow-400" />
          <circle cx="85" cy="25" r="1.5" fill="currentColor" className="text-yellow-300" />
          <circle cx="20" cy="35" r="1" fill="currentColor" className="text-yellow-400" />
        </g>

        {/* Genie body (smoke/cloud form) */}
        <g className="animate-float-genie">
          {/* Bottom smoke tail */}
          <path
            d="M 45,95 Q 40,85 42,75 Q 44,70 46,65 Q 48,60 50,55"
            stroke="currentColor"
            strokeWidth="8"
            strokeLinecap="round"
            fill="none"
            className="text-cyan-400 dark:text-cyan-300"
            opacity="0.8"
          />
          <ellipse cx="42" cy="90" rx="8" ry="12" fill="currentColor" className="text-cyan-300 dark:text-cyan-200" opacity="0.6" />
          
          {/* Main body */}
          <ellipse cx="50" cy="55" rx="20" ry="25" fill="currentColor" className="text-cyan-400 dark:text-cyan-300" />
          <ellipse cx="50" cy="55" rx="16" ry="21" fill="currentColor" className="text-cyan-300 dark:text-cyan-200" opacity="0.7" />
          
          {/* Arms */}
          <ellipse cx="30" cy="55" rx="8" ry="12" fill="currentColor" className="text-cyan-400 dark:text-cyan-300" transform="rotate(-20 30 55)" />
          <ellipse cx="70" cy="55" rx="8" ry="12" fill="currentColor" className="text-cyan-400 dark:text-cyan-300" transform="rotate(20 70 55)" />
          
          {/* Head */}
          <circle cx="50" cy="35" r="15" fill="currentColor" className="text-cyan-400 dark:text-cyan-300" />
          <circle cx="50" cy="35" r="12" fill="currentColor" className="text-cyan-300 dark:text-cyan-200" opacity="0.8" />
        </g>

        {/* Face */}
        <g className="animate-blink">
          {/* Eyes */}
          <ellipse cx="44" cy="33" rx="2.5" ry="3" fill="currentColor" className="text-gray-800 dark:text-gray-900" />
          <ellipse cx="56" cy="33" rx="2.5" ry="3" fill="currentColor" className="text-gray-800 dark:text-gray-900" />
          <circle cx="44.5" cy="32" r="1" fill="white" />
          <circle cx="56.5" cy="32" r="1" fill="white" />
          
          {/* Smile */}
          <path
            d="M 43,38 Q 50,42 57,38"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
            className="text-gray-800 dark:text-gray-900"
          />
        </g>

        {/* Turban/Hat */}
        <g>
          <ellipse cx="50" cy="22" rx="16" ry="8" fill="currentColor" className="text-purple-500 dark:text-purple-400" />
          <ellipse cx="50" cy="20" rx="14" ry="6" fill="currentColor" className="text-purple-600 dark:text-purple-500" />
          {/* Jewel */}
          <circle cx="50" cy="20" r="3" fill="currentColor" className="text-yellow-400 animate-pulse-slow" />
          <circle cx="50" cy="20" r="1.5" fill="currentColor" className="text-yellow-200" />
        </g>

        {/* Magic wand/staff (optional) */}
        <g className="animate-wave-wand">
          <line x1="70" y1="55" x2="82" y2="48" stroke="currentColor" strokeWidth="2" className="text-amber-600 dark:text-amber-500" />
          <circle cx="82" cy="48" r="4" fill="currentColor" className="text-yellow-400" />
          <circle cx="82" cy="48" r="2" fill="currentColor" className="text-yellow-200" />
          {/* Star sparkle */}
          <path
            d="M 82,44 L 83,46 L 85,46 L 83.5,47.5 L 84,49.5 L 82,48 L 80,49.5 L 80.5,47.5 L 79,46 L 81,46 Z"
            fill="currentColor"
            className="text-yellow-300 animate-twinkle"
          />
        </g>
      </svg>

      <style jsx>{`
        @keyframes float-genie {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        
        @keyframes twinkle {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.3; transform: scale(0.8); }
        }
        
        @keyframes blink {
          0%, 90%, 100% { transform: scaleY(1); }
          95% { transform: scaleY(0.1); }
        }
        
        @keyframes wave-wand {
          0%, 100% { transform: rotate(0deg); transform-origin: 70px 55px; }
          25% { transform: rotate(-10deg); transform-origin: 70px 55px; }
          75% { transform: rotate(10deg); transform-origin: 70px 55px; }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.1); }
        }
        
        .animate-float-genie {
          animation: float-genie 3s ease-in-out infinite;
        }
        
        .animate-twinkle {
          animation: twinkle 2s ease-in-out infinite;
        }
        
        .animate-blink {
          animation: blink 4s ease-in-out infinite;
        }
        
        .animate-wave-wand {
          animation: wave-wand 2s ease-in-out infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
