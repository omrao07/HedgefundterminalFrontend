import { useEffect, useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  Wallet,
  Settings,
} from "lucide-react";

import { SimpleSwitch as Switch } from "./ui/simple-switch";
import { SimpleLabel as Label } from "./ui/simple-label";
import {
  SimpleDialog as Dialog,
  SimpleDialogContent as DialogContent,
  SimpleDialogHeader as DialogHeader,
  SimpleDialogTitle as DialogTitle,
  SimpleDialogDescription as DialogDescription,
} from "./ui/simple-dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { CommandBar } from "./CommandBar";

/* ---------------------------------------------
   FIX 1: LOCAL TradingMode (prevents TS failure)
---------------------------------------------- */
export type TradingMode = "paper" | "live";

/* ---------------------------------------------
   FIX 2: KPI typing
---------------------------------------------- */
type KpiTrend = "up" | "down" | "neutral";

interface KPI {
  label: string;
  value: string;
  trend: KpiTrend;
  color: string;
}

/* ---------------------------------------------
   Props
---------------------------------------------- */
interface TopbarProps {
  tradingMode: TradingMode;
  onModeChange: (mode: TradingMode) => void;
  dummyCapital: number;
  onCapitalChange: (amount: number) => void;
  onCommand: (command: string) => void;
}

/* ---------------------------------------------
   Component
---------------------------------------------- */
export function Topbar({
  tradingMode,
  onModeChange,
  dummyCapital,
  onCapitalChange,
  onCommand,
}: TopbarProps) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showSettings, setShowSettings] = useState(false);
  const [tempCapital, setTempCapital] = useState(dummyCapital.toString());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSaveCapital = () => {
    const amount = Number(tempCapital);
    if (!Number.isNaN(amount) && amount > 0) {
      onCapitalChange(amount);
      setShowSettings(false);
    }
  };

  /* ---------------------------------------------
     KPI DATA (typed)
  ---------------------------------------------- */
  const kpis: KPI[] = [
    {
      label: "Total PnL",
      value: "+$12,456",
      trend: "up",
      color: "text-[#00E0A4]",
    },
    {
      label: "Daily %",
      value: "+2.34%",
      trend: "up",
      color: "text-[#00E0A4]",
    },
    {
      label: "Win Rate",
      value: "68.5%",
      trend: "neutral",
      color: "text-[#2979FF]",
    },
  ];

  return (
    <>
      {/* ================= TOPBAR ================= */}
      <div className="h-[60px] bg-black border-b border-[#1F1F23] px-4 flex items-center justify-between">

        {/* LEFT */}
        <div className="flex items-center min-w-[180px]">
          <span className="text-lg font-semibold tracking-wide">
            D STRATEGIES
          </span>
        </div>

        {/* CENTER */}
        <div className="flex items-center gap-3">

          {/* Command Bar */}
          <CommandBar onCommand={onCommand} />

          {/* Mode Toggle */}
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-[#1F1F23]">
            <Label className="text-xs">Paper</Label>
            <Switch
              checked={tradingMode === "live"}
              onCheckedChange={(checked) =>
                onModeChange(checked ? "live" : "paper")
              }
            />
            <Label className="text-xs">Live</Label>

            <div
              className={`ml-1 px-2 py-0.5 rounded text-[10px] ${
                tradingMode === "paper"
                  ? "bg-blue-500/20 text-blue-400"
                  : "bg-red-500/20 text-red-400"
              }`}
            >
              {tradingMode.toUpperCase()}
            </div>
          </div>

          {/* Capital */}
          <button
            onClick={() => setShowSettings(true)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg border border-[#1F1F23]"
          >
            <Wallet className="h-4 w-4 text-emerald-400" />
            <div className="text-left">
              <div className="text-[10px] text-gray-400">
                {tradingMode === "paper" ? "Paper Capital" : "Live Capital"}
              </div>
              <div className="text-sm">
                ${dummyCapital.toLocaleString()}
              </div>
            </div>
            <Settings className="h-3 w-3 text-gray-400" />
          </button>

          {/* KPI CARDS */}
          {kpis.map((kpi) => (
            <div
              key={kpi.label}
              className="px-3 py-2 rounded-lg border border-[#1F1F23] min-w-[100px]"
            >
              <div className="text-[10px] text-gray-400">
                {kpi.label}
              </div>
              <div className={`flex items-center gap-1 text-sm ${kpi.color}`}>
                {kpi.trend === "up" && <TrendingUp className="h-3 w-3" />}
                {kpi.trend === "down" && <TrendingDown className="h-3 w-3" />}
                <span>{kpi.value}</span>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT */}
        <div className="text-right px-3 py-2 rounded-lg border border-[#1F1F23]">
          <div className="text-[10px] text-gray-400">
            {currentTime.toLocaleDateString()}
          </div>
          <div className="text-sm font-mono">
            {currentTime.toLocaleTimeString()}
          </div>
        </div>
      </div>

      {/* ================= SETTINGS DIALOG ================= */}
      <Dialog open={showSettings} onOpenChange={setShowSettings}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Trading Capital</DialogTitle>
            <DialogDescription>
              Set your {tradingMode} trading capital
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 pt-4">
            <div>
              <Label>Capital ($)</Label>
              <Input
                type="number"
                value={tempCapital}
                onChange={(e) => setTempCapital(e.target.value)}
              />
            </div>

            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setShowSettings(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveCapital}>
                Save
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}