import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Badge } from "../ui/badge";
import {
  TrendingUp,
  TrendingDown,
  Play,
  Pause,
  AlertCircle,
  Zap,
  Heart,
  Swords,
  User,
  Search,
  Filter,
} from "lucide-react";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "../ui/tabs";
import { ScrollArea } from "../ui/scroll-area";
import { Switch } from "../ui/switch";
import { Input } from "../ui/input";

/* =========================
   DOMAIN TYPES (FIX)
   ========================= */

export type TradingMode = "paper" | "live";

interface StrategyTabProps {
  tradingMode: TradingMode;
}

type StrategyStatus = "active" | "halted" | "triggered" | "paused";

interface Strategy {
  id: string;
  name: string;
  type: string;
  status: StrategyStatus;
  profitability: number;
  leverage: number;
  winRate: number;
  riskScore: number;
  sharpeRatio: number;
  maxDrawdown: number;
  wins: number;
  losses: number;
  allocation: number;
  currentPnL: number;
  isUserStrategy?: boolean;
}

/* =========================
   COMPONENT
   ========================= */

export function StrategiesTab({ tradingMode }: StrategyTabProps) {
  const [activeTab, setActiveTab] = useState("active");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [showOnlyMyStrategies, setShowOnlyMyStrategies] = useState(false);
  const [emotionTab, setEmotionTab] = useState("emotion");

  /* =========================
     USER STRATEGIES
     ========================= */

  const userStrategies: Strategy[] = [
    {
      id: "u-1",
      name: "Merger Arbitrage Alpha",
      type: "M&A",
      status: "active",
      profitability: 15.4,
      leverage: 2.5,
      winRate: 72.3,
      riskScore: 6.2,
      sharpeRatio: 1.85,
      maxDrawdown: -8.2,
      wins: 45,
      losses: 17,
      allocation: 25,
      currentPnL: 3850,
      isUserStrategy: true,
    },
    {
      id: "u-2",
      name: "Momentum Breakout",
      type: "Momentum",
      status: "active",
      profitability: 22.1,
      leverage: 3,
      winRate: 65.8,
      riskScore: 7.8,
      sharpeRatio: 1.62,
      maxDrawdown: -12.5,
      wins: 38,
      losses: 20,
      allocation: 20,
      currentPnL: 4420,
      isUserStrategy: true,
    },
  ];

  /* =========================
     MASS STRATEGY LIBRARY
     ========================= */

  const allStrategies: Strategy[] = Array.from({ length: 3500 }, (_, i) => {
    const profit = (Math.random() - 0.3) * 40;
    return {
      id: `lib-${i}`,
      name: `Quant Strategy ${i + 1}`,
      type: ["Momentum", "Mean Reversion", "Volatility", "Arbitrage"][i % 4],
      status: ["active", "paused", "triggered", "halted"][i % 4] as StrategyStatus,
      profitability: Number(profit.toFixed(2)),
      leverage: Number((1 + Math.random() * 4).toFixed(1)),
      winRate: Number((40 + Math.random() * 45).toFixed(1)),
      riskScore: Number((3 + Math.random() * 7).toFixed(1)),
      sharpeRatio: Number(((Math.random() - 0.2) * 3).toFixed(2)),
      maxDrawdown: -Number((Math.random() * 20).toFixed(1)),
      wins: Math.floor(Math.random() * 80),
      losses: Math.floor(Math.random() * 60),
      allocation: Number((Math.random() * 5).toFixed(2)),
      currentPnL: Math.floor((Math.random() - 0.4) * 10000),
    };
  });

  const combined = [...userStrategies, ...allStrategies];

  /* =========================
     FILTERING
     ========================= */

  const filtered = combined.filter((s) => {
    if (showOnlyMyStrategies && !s.isUserStrategy) return false;
    if (selectedStatus !== "all" && s.status !== selectedStatus) return false;
    if (selectedCategory !== "all" && s.type !== selectedCategory) return false;
    if (
      searchTerm &&
      !`${s.name} ${s.type}`.toLowerCase().includes(searchTerm.toLowerCase())
    )
      return false;
    return true;
  });

  /* =========================
     HELPERS
     ========================= */

  const statusColor = (s: StrategyStatus) =>
    s === "active"
      ? "bg-green-500/20 text-green-400"
      : s === "halted"
      ? "bg-red-500/20 text-red-400"
      : s === "triggered"
      ? "bg-yellow-500/20 text-yellow-400"
      : "bg-gray-500/20 text-gray-400";

  /* =========================
     STRATEGY CARD
     ========================= */

  const StrategyCard = ({ s }: { s: Strategy }) => (
    <div className="border rounded-lg p-4 bg-[#151519]">
      <div className="flex justify-between mb-2">
        <div>
          <div className="flex gap-2 items-center">
            <h3 className="text-sm">{s.name}</h3>
            {s.isUserStrategy && (
              <Badge className="bg-blue-500/20 text-blue-400 text-[10px]">
                MY STRATEGY
              </Badge>
            )}
          </div>
          <div className="text-xs text-gray-400">{s.type}</div>
        </div>
        <Badge className={`text-xs ${statusColor(s.status)}`}>
          {s.status.toUpperCase()}
        </Badge>
      </div>

      <div className="mb-3">
        <div className="text-xs text-gray-400">PnL</div>
        <div
          className={`text-lg ${
            s.currentPnL >= 0 ? "text-green-400" : "text-red-400"
          }`}
        >
          {s.currentPnL >= 0 ? "+" : "-"}$
          {Math.abs(s.currentPnL).toLocaleString()}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs">
        <div>
          <span className="text-gray-400">Win Rate</span>
          <div>{s.winRate}%</div>
        </div>
        <div>
          <span className="text-gray-400">Risk</span>
          <div>{s.riskScore}/10</div>
        </div>
      </div>
    </div>
  );

  /* =========================
     RENDER
     ========================= */

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
      <TabsList>
        <TabsTrigger value="active">
          Strategies ({combined.length.toLocaleString()})
        </TabsTrigger>
        <TabsTrigger value="emotion">
          <Heart className="h-3 w-3 mr-1" />
          Emotion Engine
        </TabsTrigger>
      </TabsList>

      <TabsContent value="active">
        <div className="p-4 space-y-4">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search strategies..."
                className="pl-9"
              />
            </div>
            <Switch
              checked={showOnlyMyStrategies}
              onCheckedChange={setShowOnlyMyStrategies}
            />
          </div>

          <ScrollArea className="h-[70vh]">
            <div className="grid grid-cols-3 gap-4">
              {filtered.map((s) => (
                <StrategyCard key={s.id} s={s} />
              ))}
            </div>
          </ScrollArea>
        </div>
      </TabsContent>

      <TabsContent value="emotion">
        <div className="p-6 text-center text-gray-400">
          Emotion engine active — signals streaming
        </div>
      </TabsContent>
    </Tabs>
  );
}