interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  const tabs = [
    { id: "dashboard", label: "Dashboard" },
    { id: "portfoliobuilder", label: "Portfolio Builder" },
    { id: "intelligence", label: "Intelligence" },
    { id: "equities", label: "Equities" },
    { id: "commodities", label: "Commodities" },
    { id: "strategies", label: "Strategies" },
    { id: "execution", label: "Execution" },
    { id: "news", label: "News" },
    { id: "markets", label: "Markets" },
    { id: "research", label: "Research" },
    { id: "calendars", label: "Calendars" },
    { id: "fixedincome", label: "Fixed Income" },
    { id: "ai", label: "AI & Optimization" },
    { id: "valuation", label: "Valuation" },
    { id: "quant", label: "Quant Models" },
    { id: "wizardmode", label: "Wizard Mode" },
  ];

  return (
    <div className="w-28 glass-effect-strong border-r border-[#1F1F23] flex flex-col items-center py-3 overflow-hidden relative">
      {/* Ambient glow effects */}
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-[#2979FF]/[0.08] via-[#2979FF]/[0.03] to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-[#00E0A4]/[0.05] to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#2979FF]/20 to-transparent" />
      
      <div className="space-y-1.5 w-full flex flex-col items-center scrollbar-thin overflow-y-auto px-2 relative z-10">
        {tabs.map((tab, index) => {
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`w-24 h-11 rounded-lg flex items-center justify-center transition-all duration-300 relative group overflow-hidden ${
                isActive 
                  ? "bg-gradient-to-br from-[#151519] via-[#1A1A1E] to-[#1F1F23] text-[#00E0A4] shadow-elevated border border-[#00E0A4]/20" 
                  : "text-[#A0A0A5] hover:bg-[#151519] hover:text-[#E8E8E8] border border-transparent hover:border-[#2979FF]/20"
              }`}
              style={{ 
                animationDelay: `${index * 30}ms`,
                transform: isActive ? 'translateX(3px)' : 'translateX(0)'
              }}
            >
              {/* Active indicator with enhanced glow */}
              {isActive && (
                <>
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-7 bg-gradient-to-b from-[#2979FF] via-[#00E0A4] to-[#2979FF] rounded-r shadow-[0_0_12px_rgba(0,224,164,0.6)]" />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#00E0A4]/[0.08] to-transparent pointer-events-none" />
                  <div className="absolute inset-0 border border-[#00E0A4]/20 rounded-lg pointer-events-none" />
                  {/* Corner accents */}
                  <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#00E0A4]/40 rounded-tr-lg" />
                  <div className="absolute bottom-0 left-1 w-2 h-2 border-b border-l border-[#2979FF]/40 rounded-bl-lg" />
                </>
              )}
              
              {/* Hover effect with shimmer */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#2979FF]/0 via-[#2979FF]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              <div className="absolute inset-0 holographic opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              <span className={`text-[10px] leading-tight text-center px-2 relative z-10 transition-all duration-300 font-mono tracking-tight ${
                isActive ? 'font-semibold drop-shadow-[0_0_10px_rgba(0,224,164,0.4)]' : 'group-hover:font-medium'
              }`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00E0A4]/30 to-transparent" />
    </div>
  );
}