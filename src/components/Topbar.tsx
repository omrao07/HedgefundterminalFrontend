import { useEffect, useState } from "react";
import { TrendingUp, TrendingDown, Wallet, Settings, Search } from "lucide-react";
import { SimpleSwitch as Switch } from "./ui/simple-switch";
import { SimpleLabel as Label } from "./ui/simple-label";
import { SimpleDialog as Dialog, SimpleDialogContent as DialogContent, SimpleDialogHeader as DialogHeader, SimpleDialogTitle as DialogTitle, SimpleDialogDescription as DialogDescription } from "./ui/simple-dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { CommandBar } from "./CommandBar";
import type { TradingMode } from "../App";
import logoImage from "figma:asset/042d5e1664771b156028b87b2d64ce145e7ca896.png";

interface TopbarProps {
  tradingMode: TradingMode;
  onModeChange: (mode: TradingMode) => void;
  dummyCapital: number;
  onCapitalChange: (amount: number) => void;
  onCommand: (command: string) => void;
}

export function Topbar({ tradingMode, onModeChange, dummyCapital, onCapitalChange, onCommand }: TopbarProps) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showSettings, setShowSettings] = useState(false);
  const [tempCapital, setTempCapital] = useState(dummyCapital.toString());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSaveCapital = () => {
    const amount = parseFloat(tempCapital);
    if (!isNaN(amount) && amount > 0) {
      onCapitalChange(amount);
      setShowSettings(false);
    }
  };

  const kpis = [
    { label: "Total PnL", value: "+$12,456", trend: "up", color: "text-[#00E0A4]" },
    { label: "Daily %", value: "+2.34%", trend: "up", color: "text-[#00E0A4]" },
    { label: "Win Rate", value: "68.5%", trend: "neutral", color: "text-[#2979FF]" },
  ];

  return (
    <>
      <div className="h-[60px] bg-black border-b border-[#1F1F23] px-4 flex items-center justify-between relative overflow-hidden">
        
        {/* Left: Logo */}
        <div className="flex items-center min-w-[180px] relative z-10">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-[#2979FF]/20 to-[#00E0A4]/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <img 
              src={logoImage} 
              alt="D Strategies" 
              className="h-14 w-auto object-contain relative transition-transform duration-300 group-hover:scale-105"
              style={{ 
                filter: 'invert(1) brightness(2) contrast(1.5)',
                mixBlendMode: 'screen'
              }}
            />
          </div>
        </div>

        {/* Center: Command Bar & Mode Toggle */}
        <div className="flex items-center gap-3 relative z-10">
          {/* Bloomberg-style Command Bar */}
          <CommandBar onCommand={onCommand} />

          {/* Paper/Live Mode Toggle */}
          <div className="glass-effect flex items-center gap-2 px-3 py-2 rounded-lg border border-[#1F1F23] shadow-elevated hover:shadow-elevated-hover transition-all duration-300 interactive-scale">
            <Label htmlFor="mode-toggle" className="text-xs text-[#A0A0A5]">
              Paper
            </Label>
            <Switch
              id="mode-toggle"
              checked={tradingMode === "live"}
              onCheckedChange={(checked) => onModeChange(checked ? "live" : "paper")}
            />
            <Label htmlFor="mode-toggle" className="text-xs">
              Live
            </Label>
            <div className={`ml-1 px-2 py-0.5 rounded text-[10px] ${
              tradingMode === "paper" 
                ? "bg-[#2979FF]/20 text-[#2979FF] border border-[#2979FF]/30" 
                : "bg-[#FF5252]/20 text-[#FF5252] border border-[#FF5252]/30 status-live"
            }`}>
              {tradingMode.toUpperCase()}
            </div>
          </div>

          {/* Capital Display */}
          <button
            onClick={() => setShowSettings(true)}
            className="glass-effect flex items-center gap-2 px-3 py-2 rounded-lg border border-[#1F1F23] hover:border-[#00E0A4]/50 transition-all duration-300 shadow-elevated hover:shadow-elevated-hover interactive-scale group"
          >
            <Wallet className="h-4 w-4 text-[#00E0A4] group-hover:drop-shadow-[0_0_8px_rgba(0,224,164,0.5)] transition-all duration-300" />
            <div className="text-left">
              <div className="text-[10px] text-[#A0A0A5]">
                {tradingMode === "paper" ? "Paper Capital" : "Live Capital"}
              </div>
              <div className="text-sm">${dummyCapital.toLocaleString()}</div>
            </div>
            <Settings className="h-3 w-3 text-[#A0A0A5] group-hover:rotate-90 transition-transform duration-300" />
          </button>

          {/* KPI Cards */}
          {kpis.map((kpi, idx) => (
            <div 
              key={idx} 
              className="metric-card glass-effect px-3 py-2 rounded-lg border border-[#1F1F23] min-w-[100px] shadow-elevated hover:shadow-elevated-hover interactive-scale transition-all duration-300"
              style={{ animationDelay: `${idx * 50}ms` }}
            >
              <div className="text-[10px] text-[#A0A0A5] mb-0.5">{kpi.label}</div>
              <div className={`text-sm flex items-center gap-1 ${kpi.color}`}>
                {kpi.trend === "up" && <TrendingUp className="h-3 w-3 drop-shadow-[0_0_4px_rgba(0,224,164,0.3)]" />}
                {kpi.trend === "down" && <TrendingDown className="h-3 w-3" />}
                <span>{kpi.value}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Right: Date & Time */}
        <div className="text-right min-w-[120px] relative z-10 glass-effect px-3 py-2 rounded-lg border border-[#1F1F23]/50">
          <div className="text-[10px] text-[#A0A0A5]">
            {currentTime.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
          </div>
          <div className="text-sm font-mono tabular-nums">
            {currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          </div>
        </div>
      </div>

      {/* Settings Dialog */}
      <Dialog open={showSettings} onOpenChange={setShowSettings}>
        <DialogContent className="bg-[#151519] border-[#1F1F23] text-[#E8E8E8]">
          <DialogHeader>
            <DialogTitle>Trading Capital Settings</DialogTitle>
            <DialogDescription className="text-xs text-[#A0A0A5]">
              Set your {tradingMode === "paper" ? "paper trading" : "live trading"} capital amount
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div>
              <Label htmlFor="capital" className="text-xs text-[#A0A0A5]">
                Capital Amount ($)
              </Label>
              <Input
                id="capital"
                type="number"
                value={tempCapital}
                onChange={(e) => setTempCapital(e.target.value)}
                className="mt-2 bg-[#0D0D0F] border-[#1F1F23]"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setShowSettings(false)}
                className="flex-1 bg-[#0D0D0F] border-[#1F1F23] hover:bg-[#1F1F23]"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSaveCapital}
                className="flex-1 bg-[#00E0A4] text-[#0D0D0F] hover:bg-[#00E0A4]/90"
              >
                Save Changes
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}