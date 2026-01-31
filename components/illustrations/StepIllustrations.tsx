"use client";

// Step 1: Country Selection - Globe with markers
export function CountryIllustration() {
  return (
    <div className="flex justify-center mb-6">
      <svg viewBox="0 0 120 120" className="w-28 h-28 sm:w-36 sm:h-36">
        {/* Globe */}
        <circle cx="60" cy="60" r="45" fill="currentColor" className="text-blue-100 dark:text-blue-900/50" />
        <circle cx="60" cy="60" r="42" fill="currentColor" className="text-blue-200 dark:text-blue-800/50" />
        
        {/* Continents/land masses */}
        <ellipse cx="45" cy="50" rx="15" ry="12" fill="currentColor" className="text-green-400 dark:text-green-600" />
        <ellipse cx="70" cy="55" rx="12" ry="18" fill="currentColor" className="text-green-500 dark:text-green-500" />
        <ellipse cx="55" cy="75" rx="8" ry="6" fill="currentColor" className="text-green-400 dark:text-green-600" />
        
        {/* Central America highlight */}
        <ellipse cx="50" cy="60" rx="8" ry="5" fill="currentColor" className="text-yellow-400 animate-pulse" />
        
        {/* Location markers */}
        <g className="animate-bounce-slow">
          <circle cx="48" cy="58" r="4" fill="currentColor" className="text-red-500" />
          <circle cx="48" cy="58" r="2" fill="white" />
        </g>
        <g className="animate-bounce-slow" style={{ animationDelay: "0.2s" }}>
          <circle cx="55" cy="62" r="3" fill="currentColor" className="text-red-400" />
          <circle cx="55" cy="62" r="1.5" fill="white" />
        </g>
        
        {/* Airplane flying around */}
        <g className="animate-orbit">
          <path d="M0,-52 L3,-50 L1,-48 L-1,-48 L-3,-50 Z" fill="currentColor" className="text-gray-600 dark:text-gray-400" transform="translate(60,60)" />
        </g>

        <style jsx>{`
          @keyframes orbit {
            from { transform: translate(60px, 60px) rotate(0deg) translateX(52px) rotate(0deg); }
            to { transform: translate(60px, 60px) rotate(360deg) translateX(52px) rotate(-360deg); }
          }
          @keyframes bounce-slow {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-5px); }
          }
          .animate-orbit { animation: orbit 8s linear infinite; }
          .animate-bounce-slow { animation: bounce-slow 2s ease-in-out infinite; }
        `}</style>
      </svg>
    </div>
  );
}

// Step 2: Destination Type - Beach, Mountain, City
export function DestinationIllustration() {
  return (
    <div className="flex justify-center mb-6">
      <svg viewBox="0 0 160 100" className="w-40 h-24 sm:w-48 sm:h-28">
        {/* Sun */}
        <g className="animate-pulse-slow">
          <circle cx="130" cy="25" r="15" fill="currentColor" className="text-yellow-400" />
          <g stroke="currentColor" strokeWidth="2" className="text-yellow-400">
            <line x1="130" y1="5" x2="130" y2="0" />
            <line x1="130" y1="45" x2="130" y2="50" />
            <line x1="110" y1="25" x2="105" y2="25" />
            <line x1="150" y1="25" x2="155" y2="25" />
            <line x1="115" y1="10" x2="112" y2="7" />
            <line x1="145" y1="40" x2="148" y2="43" />
            <line x1="115" y1="40" x2="112" y2="43" />
            <line x1="145" y1="10" x2="148" y2="7" />
          </g>
        </g>

        {/* Mountains */}
        <polygon points="20,85 45,45 70,85" fill="currentColor" className="text-emerald-600 dark:text-emerald-500" />
        <polygon points="50,85 80,40 110,85" fill="currentColor" className="text-emerald-500 dark:text-emerald-400" />
        <polygon points="70,55 80,40 90,55" fill="white" opacity="0.6" />
        
        {/* Beach/Water */}
        <path d="M0,85 Q40,75 80,85 T160,85 L160,100 L0,100 Z" fill="currentColor" className="text-blue-400 dark:text-blue-500 animate-wave" />
        <path d="M0,90 Q40,82 80,90 T160,90 L160,100 L0,100 Z" fill="currentColor" className="text-blue-300 dark:text-blue-400" />
        
        {/* Palm tree */}
        <g className="animate-sway">
          <rect x="10" y="60" width="4" height="30" fill="currentColor" className="text-amber-700" rx="1" />
          <path d="M12,60 Q5,50 0,45 Q8,48 12,55 Z" fill="currentColor" className="text-green-500" />
          <path d="M12,60 Q19,50 24,45 Q16,48 12,55 Z" fill="currentColor" className="text-green-500" />
          <path d="M12,55 Q8,42 5,35 Q10,42 12,50 Z" fill="currentColor" className="text-green-600" />
          <path d="M12,55 Q16,42 19,35 Q14,42 12,50 Z" fill="currentColor" className="text-green-600" />
        </g>

        {/* City buildings in back */}
        <rect x="120" y="55" width="12" height="30" fill="currentColor" className="text-gray-400 dark:text-gray-500" />
        <rect x="134" y="50" width="10" height="35" fill="currentColor" className="text-gray-500 dark:text-gray-400" />
        <rect x="146" y="60" width="8" height="25" fill="currentColor" className="text-gray-400 dark:text-gray-500" />
        {/* Windows */}
        <rect x="122" y="58" width="3" height="3" fill="currentColor" className="text-yellow-300" />
        <rect x="127" y="58" width="3" height="3" fill="currentColor" className="text-yellow-300" />
        <rect x="122" y="65" width="3" height="3" fill="currentColor" className="text-yellow-300" />

        <style jsx>{`
          @keyframes wave {
            0%, 100% { transform: translateX(0); }
            50% { transform: translateX(5px); }
          }
          @keyframes sway {
            0%, 100% { transform: rotate(0deg); transform-origin: 12px 90px; }
            50% { transform: rotate(3deg); transform-origin: 12px 90px; }
          }
          @keyframes pulse-slow {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.9; transform: scale(1.05); }
          }
          .animate-wave { animation: wave 3s ease-in-out infinite; }
          .animate-sway { animation: sway 4s ease-in-out infinite; }
          .animate-pulse-slow { animation: pulse-slow 3s ease-in-out infinite; }
        `}</style>
      </svg>
    </div>
  );
}

// Step 3: Duration & Budget - Calendar and wallet
export function BudgetIllustration() {
  return (
    <div className="flex justify-center mb-6">
      <svg viewBox="0 0 140 100" className="w-36 h-24 sm:w-44 sm:h-28">
        {/* Calendar */}
        <g>
          <rect x="10" y="20" width="55" height="50" rx="4" fill="currentColor" className="text-white dark:text-gray-800" stroke="currentColor" strokeWidth="2" className="text-gray-300 dark:text-gray-600" />
          <rect x="10" y="20" width="55" height="14" rx="4" fill="currentColor" className="text-red-500" />
          <rect x="10" y="30" width="55" height="4" fill="currentColor" className="text-red-500" />
          
          {/* Calendar hooks */}
          <rect x="22" y="15" width="4" height="12" rx="1" fill="currentColor" className="text-gray-500" />
          <rect x="49" y="15" width="4" height="12" rx="1" fill="currentColor" className="text-gray-500" />
          
          {/* Days */}
          <g fill="currentColor" className="text-gray-600 dark:text-gray-400" fontSize="8">
            <text x="18" y="45">1</text>
            <text x="28" y="45">2</text>
            <text x="38" y="45">3</text>
            <text x="48" y="45">4</text>
          </g>
          
          {/* Selected days highlight */}
          <circle cx="28" cy="52" r="6" fill="currentColor" className="text-primary/20" />
          <circle cx="38" cy="52" r="6" fill="currentColor" className="text-primary/20" />
          <circle cx="48" cy="52" r="6" fill="currentColor" className="text-primary/30 animate-pulse" />
          
          <g fill="currentColor" className="text-gray-600 dark:text-gray-400" fontSize="8">
            <text x="18" y="55">5</text>
            <text x="28" y="55">6</text>
            <text x="38" y="55">7</text>
            <text x="48" y="55">8</text>
          </g>
        </g>

        {/* Wallet/Money */}
        <g className="animate-float">
          <rect x="75" y="35" width="55" height="35" rx="4" fill="currentColor" className="text-amber-600 dark:text-amber-500" />
          <rect x="75" y="35" width="55" height="10" rx="4" fill="currentColor" className="text-amber-700 dark:text-amber-600" />
          <ellipse cx="102" cy="55" rx="12" ry="8" fill="currentColor" className="text-amber-800 dark:text-amber-700" />
          
          {/* Money bills sticking out */}
          <rect x="80" y="30" width="20" height="12" rx="1" fill="currentColor" className="text-green-500" />
          <rect x="85" y="28" width="15" height="10" rx="1" fill="currentColor" className="text-green-400" />
          
          {/* Dollar sign */}
          <text x="88" y="37" fill="currentColor" className="text-green-700" fontSize="8" fontWeight="bold">$</text>
        </g>

        {/* Floating coins */}
        <g className="animate-bounce-coin">
          <circle cx="120" cy="25" r="8" fill="currentColor" className="text-yellow-500" />
          <circle cx="120" cy="25" r="5" fill="currentColor" className="text-yellow-400" />
          <text x="117" y="28" fill="currentColor" className="text-yellow-700" fontSize="8" fontWeight="bold">$</text>
        </g>
        <g className="animate-bounce-coin" style={{ animationDelay: "0.3s" }}>
          <circle cx="105" cy="18" r="6" fill="currentColor" className="text-yellow-500" />
          <circle cx="105" cy="18" r="4" fill="currentColor" className="text-yellow-400" />
        </g>

        <style jsx>{`
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-5px); }
          }
          @keyframes bounce-coin {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-8px) rotate(10deg); }
          }
          .animate-float { animation: float 3s ease-in-out infinite; }
          .animate-bounce-coin { animation: bounce-coin 2s ease-in-out infinite; }
        `}</style>
      </svg>
    </div>
  );
}

// Step 4: Who & Pace - People and speedometer
export function PartyIllustration() {
  return (
    <div className="flex justify-center mb-6">
      <svg viewBox="0 0 150 100" className="w-40 h-26 sm:w-48 sm:h-32">
        {/* Person 1 - waving */}
        <g className="animate-wave-person">
          <circle cx="35" cy="25" r="10" fill="currentColor" className="text-amber-400" />
          <path d="M35,35 L35,60 M35,42 L25,55 M35,42 L50,35 M35,60 L28,80 M35,60 L42,80" 
                stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="text-blue-500" />
        </g>

        {/* Person 2 */}
        <g>
          <circle cx="60" cy="28" r="9" fill="currentColor" className="text-pink-400" />
          <path d="M60,37 L60,60 M60,44 L50,55 M60,44 L70,55 M60,60 L53,80 M60,60 L67,80" 
                stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="text-green-500" />
        </g>

        {/* Person 3 (smaller/child) */}
        <g className="animate-jump">
          <circle cx="82" cy="40" r="7" fill="currentColor" className="text-orange-400" />
          <path d="M82,47 L82,65 M82,52 L75,60 M82,52 L89,60 M82,65 L77,80 M82,65 L87,80" 
                stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="text-purple-500" />
        </g>

        {/* Heart between people */}
        <path d="M55,20 C55,15 60,12 62,16 C64,12 69,15 69,20 C69,26 62,30 62,30 C62,30 55,26 55,20" 
              fill="currentColor" className="text-red-400 animate-pulse" />

        {/* Speedometer */}
        <g transform="translate(110, 50)">
          <path d="M-25,0 A25,25 0 0,1 25,0" fill="none" stroke="currentColor" strokeWidth="6" className="text-gray-200 dark:text-gray-700" />
          <path d="M-25,0 A25,25 0 0,1 0,-25" fill="none" stroke="currentColor" strokeWidth="6" className="text-green-400" />
          <path d="M0,-25 A25,25 0 0,1 18,-18" fill="none" stroke="currentColor" strokeWidth="6" className="text-yellow-400" />
          <path d="M18,-18 A25,25 0 0,1 25,0" fill="none" stroke="currentColor" strokeWidth="6" className="text-red-400" />
          
          {/* Needle */}
          <g className="animate-needle">
            <line x1="0" y1="0" x2="0" y2="-18" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="text-gray-800 dark:text-gray-200" />
            <circle cx="0" cy="0" r="4" fill="currentColor" className="text-gray-800 dark:text-gray-200" />
          </g>
          
          {/* Labels */}
          <text x="-20" y="15" fontSize="6" fill="currentColor" className="text-gray-500">slow</text>
          <text x="10" y="15" fontSize="6" fill="currentColor" className="text-gray-500">fast</text>
        </g>

        <style jsx>{`
          @keyframes wave-person {
            0%, 100% { transform: rotate(0deg); transform-origin: 35px 42px; }
            50% { transform: rotate(-10deg); transform-origin: 35px 42px; }
          }
          @keyframes jump {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-8px); }
          }
          @keyframes needle {
            0%, 100% { transform: rotate(-30deg); }
            50% { transform: rotate(30deg); }
          }
          .animate-wave-person { animation: wave-person 1.5s ease-in-out infinite; }
          .animate-jump { animation: jump 1s ease-in-out infinite; }
          .animate-needle { animation: needle 3s ease-in-out infinite; }
        `}</style>
      </svg>
    </div>
  );
}

// Step 5: Interests - Stars, camera, food
export function InterestsIllustration() {
  return (
    <div className="flex justify-center mb-6">
      <svg viewBox="0 0 160 100" className="w-44 h-28 sm:w-52 sm:h-32">
        {/* Camera */}
        <g className="animate-float" style={{ animationDelay: "0s" }}>
          <rect x="10" y="35" width="35" height="25" rx="3" fill="currentColor" className="text-gray-700 dark:text-gray-600" />
          <circle cx="27" cy="47" r="8" fill="currentColor" className="text-gray-500" />
          <circle cx="27" cy="47" r="5" fill="currentColor" className="text-blue-400" />
          <circle cx="27" cy="45" r="2" fill="white" opacity="0.6" />
          <rect x="15" y="30" width="15" height="8" rx="2" fill="currentColor" className="text-gray-600 dark:text-gray-700" />
          <circle cx="38" cy="40" r="2" fill="currentColor" className="text-red-500 animate-pulse" />
        </g>

        {/* Food/Restaurant */}
        <g className="animate-float" style={{ animationDelay: "0.2s" }}>
          <ellipse cx="75" cy="55" rx="20" ry="8" fill="currentColor" className="text-white dark:text-gray-300" stroke="currentColor" strokeWidth="2" className="text-gray-300 dark:text-gray-600" />
          <ellipse cx="75" cy="48" rx="15" ry="12" fill="currentColor" className="text-orange-400" />
          <ellipse cx="75" cy="46" rx="10" ry="8" fill="currentColor" className="text-orange-300" />
          {/* Steam */}
          <path d="M70,35 Q68,30 70,25" stroke="currentColor" strokeWidth="2" fill="none" className="text-gray-400 animate-steam" />
          <path d="M75,33 Q73,28 75,23" stroke="currentColor" strokeWidth="2" fill="none" className="text-gray-400 animate-steam" style={{ animationDelay: "0.3s" }} />
          <path d="M80,35 Q78,30 80,25" stroke="currentColor" strokeWidth="2" fill="none" className="text-gray-400 animate-steam" style={{ animationDelay: "0.6s" }} />
        </g>

        {/* Adventure/Hiking boot */}
        <g className="animate-walk">
          <path d="M110,70 L110,55 L115,50 L130,50 L135,55 L135,70 L140,75 L105,75 Z" fill="currentColor" className="text-amber-700" />
          <path d="M108,75 L142,75 L142,80 L108,80 Z" fill="currentColor" className="text-amber-900" />
          <path d="M112,55 L112,65 M118,55 L118,65 M124,55 L124,65 M130,55 L130,65" stroke="currentColor" strokeWidth="2" className="text-amber-500" />
        </g>

        {/* Stars scattered */}
        <g className="animate-twinkle">
          <polygon points="50,15 52,21 58,21 53,25 55,31 50,27 45,31 47,25 42,21 48,21" fill="currentColor" className="text-yellow-400" />
        </g>
        <g className="animate-twinkle" style={{ animationDelay: "0.5s" }}>
          <polygon points="100,10 101,14 105,14 102,17 103,21 100,18 97,21 98,17 95,14 99,14" fill="currentColor" className="text-yellow-400" transform="scale(0.8)" />
        </g>
        <g className="animate-twinkle" style={{ animationDelay: "1s" }}>
          <polygon points="140,25 141,28 144,28 142,30 143,33 140,31 137,33 138,30 136,28 139,28" fill="currentColor" className="text-yellow-400" />
        </g>

        {/* Music notes */}
        <g className="animate-float-note">
          <text x="145" y="55" fontSize="16" fill="currentColor" className="text-purple-500">♪</text>
        </g>
        <g className="animate-float-note" style={{ animationDelay: "0.5s" }}>
          <text x="150" y="45" fontSize="12" fill="currentColor" className="text-purple-400">♫</text>
        </g>

        <style jsx>{`
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-5px); }
          }
          @keyframes steam {
            0%, 100% { opacity: 0.3; transform: translateY(0); }
            50% { opacity: 0.8; transform: translateY(-5px); }
          }
          @keyframes walk {
            0%, 100% { transform: rotate(0deg); transform-origin: 125px 80px; }
            25% { transform: rotate(-5deg); transform-origin: 125px 80px; }
            75% { transform: rotate(5deg); transform-origin: 125px 80px; }
          }
          @keyframes twinkle {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.5; transform: scale(0.8); }
          }
          @keyframes float-note {
            0%, 100% { transform: translateY(0) rotate(0deg); opacity: 1; }
            50% { transform: translateY(-10px) rotate(10deg); opacity: 0.7; }
          }
          .animate-float { animation: float 2.5s ease-in-out infinite; }
          .animate-steam { animation: steam 2s ease-in-out infinite; }
          .animate-walk { animation: walk 1s ease-in-out infinite; }
          .animate-twinkle { animation: twinkle 2s ease-in-out infinite; }
          .animate-float-note { animation: float-note 3s ease-in-out infinite; }
        `}</style>
      </svg>
    </div>
  );
}
