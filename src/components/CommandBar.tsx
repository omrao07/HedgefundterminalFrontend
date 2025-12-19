import { useState, useEffect } from "react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "./ui/command";
import { Search } from "lucide-react";

interface CommandBarProps {
  onCommand: (command: string) => void;
}

export function CommandBar({ onCommand }: CommandBarProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  // Bloomberg-style commands
  const commands = [
    { id: "DES", label: "DES - Security Description", category: "Security" },
    { id: "FA", label: "FA - Financial Analysis", category: "Analysis" },
    { id: "YAS", label: "YAS - Yields & Spreads", category: "Fixed Income" },
    { id: "LQA", label: "LQA - Liquidity Assessment", category: "Fixed Income" },
    { id: "TRACE", label: "TRACE - Bond Trades", category: "Fixed Income" },
    { id: "WCDS", label: "WCDS - CDS Spreads", category: "Fixed Income" },
    { id: "YCRV", label: "YCRV - Yield Curves", category: "Fixed Income" },
    { id: "BVAL", label: "BVAL - Bloomberg Valuation", category: "Fixed Income" },
    { id: "OMON", label: "OMON - Option Monitor", category: "Options" },
    { id: "WEI", label: "WEI - World Equity Indices", category: "Markets" },
    { id: "GP", label: "GP - Graph Price", category: "Charts" },
    { id: "HS", label: "HS - Historical Comparison", category: "Charts" },
    { id: "GC", label: "GC - Graph Yield Curves", category: "Charts" },
    { id: "GF", label: "GF - Graph Fundamentals", category: "Charts" },
    { id: "HDS", label: "HDS - Top Holders", category: "Fundamentals" },
    { id: "ANR", label: "ANR - Analyst Recommendations", category: "Fundamentals" },
    { id: "MOST", label: "MOST - Most Active", category: "Fundamentals" },
    { id: "OVME", label: "OVME - Option Valuation", category: "Options" },
    { id: "CHART", label: "CHART - Advanced Charting", category: "Charts" },
    { id: "RISK", label: "RISK - Risk Analytics", category: "Risk" },
    { id: "VAR", label: "VAR - Value at Risk", category: "Risk" },
    { id: "NEWS", label: "NEWS - News Search", category: "News" },
    { id: "N", label: "N - Top News", category: "News" },
    { id: "NH", label: "NH - News History", category: "News" },
    { id: "COMP", label: "COMP - Company Comparison", category: "Analysis" },
    { id: "RV", label: "RV - Relative Value", category: "Analysis" },
    { id: "BETA", label: "BETA - Beta Analysis", category: "Analysis" },
    { id: "CACT", label: "CACT - Corporate Actions", category: "Security" },
    { id: "DVD", label: "DVD - Dividend Analysis", category: "Security" },
    { id: "ERN", label: "ERN - Earnings Analysis", category: "Fundamentals" },
    { id: "EST", label: "EST - Estimates", category: "Fundamentals" },
    { id: "MODL", label: "MODL - Model Builder", category: "Quantitative" },
    { id: "QMOD", label: "QMOD - Quantum Models", category: "Quantitative" },
    { id: "DAMO", label: "DAMO - Damodaran Valuation", category: "Valuation" },
    { id: "STRAT", label: "STRAT - Strategy Library (3000+)", category: "Strategies" },
    { id: "ML", label: "ML - Machine Learning Models", category: "AI" },
    { id: "WIZ", label: "WIZ - Wizard Mode Macro Brain", category: "Advanced" },
    { id: "WIZARD", label: "WIZARD - Wizard Mode Full Access", category: "Advanced" },
    { id: "PARL", label: "PARL - Strategy Parliament", category: "Advanced" },
    { id: "MULTI", label: "MULTI - Multiverse Backtester", category: "Advanced" },
    { id: "GENOME", label: "GENOME - Evolution Genome", category: "Advanced" },
    { id: "EMO", label: "EMO - Emotion Trading Engine", category: "Advanced" },
    { id: "WAR", label: "WAR - War Game Scenarios", category: "Advanced" },
    { id: "SYN", label: "SYN - Synthetic Investors", category: "Advanced" },
    { id: "JARVIS", label: "JARVIS - Portfolio AI Assistant", category: "AI" },
    { id: "WATCH", label: "WATCH - Watchlist & Asset Monitoring", category: "Markets" },
    { id: "WL", label: "WL - Watchlist Quick Access", category: "Markets" },
  ];

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleSelect = (commandId: string) => {
    onCommand(commandId);
    setOpen(false);
    setValue("");
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="glass-effect flex items-center gap-2 px-4 py-2 border border-[#1F1F23] rounded-lg hover:border-[#2979FF]/50 transition-all duration-300 shadow-elevated hover:shadow-elevated-hover interactive-scale group"
      >
        <Search className="w-4 h-4 text-[#A0A0A5] group-hover:text-[#2979FF] transition-colors duration-300" />
        <span className="text-sm text-[#A0A0A5] group-hover:text-[#E8E8E8] transition-colors duration-300">Search functions...</span>
        <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-[#1F1F23] bg-[#0D0D0F] px-1.5 text-[10px] text-[#A0A0A5] group-hover:border-[#2979FF]/50 group-hover:text-[#2979FF] transition-all duration-300">
          ⌘K
        </kbd>
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] animate-fade-in" style={{ background: 'rgba(0, 0, 0, 0.85)' }}>
          <div className="w-full max-w-2xl glass-effect-strong border-gradient rounded-lg shadow-elevated animate-slide-up" style={{ boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 60px rgba(41, 121, 255, 0.15)' }}>
            <Command className="bg-transparent">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#2979FF]/10 to-[#00E0A4]/10 rounded-t-lg pointer-events-none" />
                <CommandInput 
                  placeholder="Type a command or search..." 
                  value={value}
                  onValueChange={setValue}
                  className="border-b border-[#1F1F23] relative z-10 text-sm"
                />
              </div>
              <CommandList className="max-h-[400px] scrollbar-thin">
                <CommandEmpty className="py-6 text-center text-sm text-[#A0A0A5]">No results found.</CommandEmpty>
                {["Security", "Analysis", "Fixed Income", "Options", "Markets", "Charts", "Portfolio", "Risk", "News", "Fundamentals", "Quantitative", "Valuation", "Strategies", "AI", "Advanced"].map((category) => {
                  const categoryCommands = commands.filter(cmd => cmd.category === category);
                  if (categoryCommands.length === 0) return null;
                  
                  return (
                    <CommandGroup 
                      key={category} 
                      heading={category} 
                      className="text-[#A0A0A5] text-xs px-3 py-2 border-t border-[#1F1F23]/50 first:border-t-0"
                    >
                      {categoryCommands.map((cmd) => (
                        <CommandItem
                          key={cmd.id}
                          value={cmd.label}
                          onSelect={() => handleSelect(cmd.id)}
                          className="cursor-pointer hover:bg-[#1F1F23] data-[selected=true]:bg-[#1F1F23] rounded-md my-0.5 px-3 py-2 transition-all duration-200 group/item relative overflow-hidden"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-[#2979FF]/0 via-[#2979FF]/5 to-[#00E0A4]/0 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300" />
                          <span className="text-[#00E0A4] mr-3 font-mono text-xs relative z-10 group-hover/item:drop-shadow-[0_0_4px_rgba(0,224,164,0.4)]">{cmd.id}</span>
                          <span className="relative z-10 text-sm">{cmd.label.split(" - ")[1]}</span>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  );
                })}
              </CommandList>
            </Command>
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 text-[#A0A0A5] hover:text-white hover:bg-[#1F1F23] w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 text-xl"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </>
  );
}
