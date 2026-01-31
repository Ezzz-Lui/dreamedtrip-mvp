"use client";

export function HeroIllustration() {
  return (
    <div className="relative w-full h-[300px] sm:h-[400px] overflow-hidden">
      {/* Sky background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-100 via-blue-50 to-transparent dark:from-blue-950/30 dark:via-blue-900/20 dark:to-transparent" />
      
      {/* Clouds */}
      <svg className="absolute top-8 left-[10%] w-24 h-16 opacity-60 animate-float" viewBox="0 0 100 50">
        <ellipse cx="25" cy="25" rx="25" ry="15" fill="currentColor" className="text-blue-200 dark:text-blue-800/50" />
        <ellipse cx="50" cy="20" rx="30" ry="18" fill="currentColor" className="text-blue-200 dark:text-blue-800/50" />
        <ellipse cx="75" cy="25" rx="25" ry="15" fill="currentColor" className="text-blue-200 dark:text-blue-800/50" />
      </svg>
      
      <svg className="absolute top-16 right-[15%] w-32 h-20 opacity-50 animate-float-delayed" viewBox="0 0 100 50">
        <ellipse cx="25" cy="25" rx="25" ry="15" fill="currentColor" className="text-blue-200 dark:text-blue-800/50" />
        <ellipse cx="50" cy="20" rx="30" ry="18" fill="currentColor" className="text-blue-200 dark:text-blue-800/50" />
        <ellipse cx="75" cy="25" rx="25" ry="15" fill="currentColor" className="text-blue-200 dark:text-blue-800/50" />
      </svg>

      {/* Mountains in background */}
      <svg className="absolute bottom-0 left-0 w-full h-48 opacity-40" viewBox="0 0 1200 300" preserveAspectRatio="none">
        <path d="M0,300 L0,150 L200,50 L400,120 L600,40 L800,100 L1000,60 L1200,140 L1200,300 Z" 
              fill="currentColor" className="text-primary/30" />
        <path d="M0,300 L0,200 L300,100 L500,150 L700,80 L900,130 L1200,90 L1200,300 Z" 
              fill="currentColor" className="text-primary/20" />
      </svg>

      {/* Animated bus */}
      <div className="absolute bottom-24 left-0 w-full animate-bus-drive">
        <svg className="w-32 h-20" viewBox="0 0 120 80" fill="none">
          {/* Bus body */}
          <rect x="10" y="20" width="100" height="45" rx="8" fill="currentColor" className="text-orange-500" />
          <rect x="10" y="20" width="100" height="8" rx="4" fill="currentColor" className="text-orange-600" />
          
          {/* Windows */}
          <rect x="18" y="28" width="20" height="18" rx="2" fill="currentColor" className="text-blue-200 dark:text-blue-300" />
          <rect x="42" y="28" width="20" height="18" rx="2" fill="currentColor" className="text-blue-200 dark:text-blue-300" />
          <rect x="66" y="28" width="20" height="18" rx="2" fill="currentColor" className="text-blue-200 dark:text-blue-300" />
          <rect x="90" y="28" width="15" height="18" rx="2" fill="currentColor" className="text-blue-200 dark:text-blue-300" />
          
          {/* Wheels */}
          <circle cx="30" cy="65" r="10" fill="currentColor" className="text-gray-800 dark:text-gray-700 animate-spin-slow" />
          <circle cx="30" cy="65" r="6" fill="currentColor" className="text-gray-400" />
          <circle cx="90" cy="65" r="10" fill="currentColor" className="text-gray-800 dark:text-gray-700 animate-spin-slow" />
          <circle cx="90" cy="65" r="6" fill="currentColor" className="text-gray-400" />
          
          {/* Details */}
          <rect x="15" y="50" width="8" height="8" rx="1" fill="currentColor" className="text-yellow-300" />
          <rect x="97" y="50" width="8" height="8" rx="1" fill="currentColor" className="text-red-500" />
        </svg>
      </div>

      {/* Airplane */}
      <div className="absolute top-12 right-0 animate-plane-fly">
        <svg className="w-20 h-16" viewBox="0 0 80 60" fill="none">
          <path d="M10,30 L25,28 L35,15 L45,15 L40,28 L55,26 L60,20 L65,20 L63,30 L65,40 L60,40 L55,34 L40,32 L45,45 L35,45 L25,32 L10,30 Z" 
                fill="currentColor" className="text-blue-500" />
          <ellipse cx="35" cy="30" rx="8" ry="6" fill="currentColor" className="text-blue-300 dark:text-blue-400" />
        </svg>
      </div>

      {/* Happy travelers */}
      <div className="absolute bottom-20 right-[15%] flex gap-2 animate-wave">
        {/* Person 1 */}
        <svg className="w-12 h-16" viewBox="0 0 40 60" fill="none">
          <circle cx="20" cy="12" r="8" fill="currentColor" className="text-amber-600" />
          <path d="M20,20 L20,40 M20,25 L12,32 M20,25 L28,32 M20,40 L14,55 M20,40 L26,55" 
                stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="text-blue-600" />
        </svg>
        
        {/* Person 2 */}
        <svg className="w-12 h-16" viewBox="0 0 40 60" fill="none">
          <circle cx="20" cy="12" r="8" fill="currentColor" className="text-pink-400" />
          <path d="M20,20 L20,40 M20,25 L12,32 M20,25 L28,32 M20,40 L14,55 M20,40 L26,55" 
                stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="text-green-600" />
        </svg>
      </div>

      {/* Palm trees */}
      <svg className="absolute bottom-16 left-[20%] w-16 h-24 opacity-70" viewBox="0 0 60 100">
        <rect x="26" y="40" width="8" height="60" fill="currentColor" className="text-amber-700 dark:text-amber-800" />
        <path d="M30,40 Q15,30 10,25 Q20,28 30,35 Z" fill="currentColor" className="text-green-600 dark:text-green-700" />
        <path d="M30,40 Q45,30 50,25 Q40,28 30,35 Z" fill="currentColor" className="text-green-600 dark:text-green-700" />
        <path d="M30,35 Q20,20 15,10 Q25,18 30,30 Z" fill="currentColor" className="text-green-500 dark:text-green-600" />
        <path d="M30,35 Q40,20 45,10 Q35,18 30,30 Z" fill="currentColor" className="text-green-500 dark:text-green-600" />
        <path d="M30,30 Q28,15 28,5 Q30,15 30,25 Z" fill="currentColor" className="text-green-600 dark:text-green-700" />
      </svg>

      <svg className="absolute bottom-16 right-[25%] w-12 h-20 opacity-60" viewBox="0 0 60 100">
        <rect x="26" y="50" width="8" height="50" fill="currentColor" className="text-amber-700 dark:text-amber-800" />
        <path d="M30,50 Q15,40 10,35 Q20,38 30,45 Z" fill="currentColor" className="text-green-600 dark:text-green-700" />
        <path d="M30,50 Q45,40 50,35 Q40,38 30,45 Z" fill="currentColor" className="text-green-600 dark:text-green-700" />
        <path d="M30,45 Q20,30 15,20 Q25,28 30,40 Z" fill="currentColor" className="text-green-500 dark:text-green-600" />
        <path d="M30,45 Q40,30 45,20 Q35,28 30,40 Z" fill="currentColor" className="text-green-500 dark:text-green-600" />
      </svg>

      {/* Suitcase */}
      <svg className="absolute bottom-20 left-[35%] w-10 h-12 animate-bounce-slow" viewBox="0 0 40 50">
        <rect x="5" y="10" width="30" height="35" rx="2" fill="currentColor" className="text-red-500" />
        <rect x="5" y="10" width="30" height="4" fill="currentColor" className="text-red-600" />
        <rect x="15" y="5" width="10" height="8" rx="1" fill="currentColor" className="text-red-600" />
        <circle cx="12" cy="27" r="2" fill="currentColor" className="text-yellow-300" />
        <circle cx="28" cy="27" r="2" fill="currentColor" className="text-yellow-300" />
      </svg>

      {/* Sun */}
      <svg className="absolute top-8 right-[10%] w-16 h-16 animate-pulse-slow" viewBox="0 0 60 60">
        <circle cx="30" cy="30" r="12" fill="currentColor" className="text-yellow-400" />
        <g stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-yellow-400">
          <line x1="30" y1="8" x2="30" y2="14" />
          <line x1="30" y1="46" x2="30" y2="52" />
          <line x1="8" y1="30" x2="14" y2="30" />
          <line x1="46" y1="30" x2="52" y2="30" />
          <line x1="14" y1="14" x2="18" y2="18" />
          <line x1="42" y1="42" x2="46" y2="46" />
          <line x1="14" y1="46" x2="18" y2="42" />
          <line x1="42" y1="18" x2="46" y2="14" />
        </g>
      </svg>

      {/* Camera */}
      <svg className="absolute bottom-32 right-[35%] w-10 h-8 animate-bounce-slow" viewBox="0 0 50 40">
        <rect x="5" y="10" width="40" height="25" rx="3" fill="currentColor" className="text-gray-700 dark:text-gray-600" />
        <circle cx="25" cy="22" r="8" fill="currentColor" className="text-gray-400" />
        <circle cx="25" cy="22" r="5" fill="currentColor" className="text-gray-600" />
        <rect x="38" y="14" width="4" height="4" rx="1" fill="currentColor" className="text-red-500" />
        <rect x="15" y="5" width="20" height="8" rx="2" fill="currentColor" className="text-gray-600 dark:text-gray-700" />
      </svg>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        
        @keyframes bus-drive {
          0% { transform: translateX(-150px); }
          100% { transform: translateX(calc(100vw + 150px)); }
        }
        
        @keyframes plane-fly {
          0% { transform: translate(0, 0); }
          100% { transform: translate(-120vw, 40px); }
        }
        
        @keyframes wave {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-5deg); }
          75% { transform: rotate(5deg); }
        }
        
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
          animation-delay: 1s;
        }
        
        .animate-bus-drive {
          animation: bus-drive 25s linear infinite;
        }
        
        .animate-plane-fly {
          animation: plane-fly 30s linear infinite;
        }
        
        .animate-wave {
          animation: wave 2s ease-in-out infinite;
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
      `}</style>
    </div>
  );
}
