import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Badge } from "../ui/badge";
import { TrendingUp, TrendingDown, Play, Pause, AlertCircle, Zap, Heart, Swords, User, Search, Filter } from "lucide-react";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { ScrollArea } from "../ui/scroll-area";
import { Switch } from "../ui/switch";
import { Slider } from "../ui/slider";
import { Input } from "../ui/input";
import type { TradingMode } from "../../App";

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
  isUserStrategy?: boolean; // Track if it's a user's custom strategy
}

export function StrategiesTab({ tradingMode }: StrategyTabProps) {
  const [activeTab, setActiveTab] = useState("active");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [showOnlyMyStrategies, setShowOnlyMyStrategies] = useState(false);
  
  // User's custom/favorited strategies
  const [userStrategies] = useState<Strategy[]>([
    {
      id: "1",
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
      id: "2",
      name: "Momentum Breakout",
      type: "Momentum",
      status: "active",
      profitability: 22.1,
      leverage: 3.0,
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
    {
      id: "3",
      name: "Carry Trade FX",
      type: "Carry Trade",
      status: "triggered",
      profitability: 8.7,
      leverage: 5.0,
      winRate: 58.3,
      riskScore: 8.5,
      sharpeRatio: 1.12,
      maxDrawdown: -15.3,
      wins: 28,
      losses: 20,
      allocation: 15,
      currentPnL: 1305,
      isUserStrategy: true,
    },
    {
      id: "4",
      name: "Vol Surface Arb",
      type: "Volatility",
      status: "active",
      profitability: 18.9,
      leverage: 2.0,
      winRate: 70.5,
      riskScore: 5.5,
      sharpeRatio: 2.15,
      maxDrawdown: -6.8,
      wins: 52,
      losses: 22,
      allocation: 18,
      currentPnL: 3402,
      isUserStrategy: true,
    },
    {
      id: "5",
      name: "VIX Spike Hunter",
      type: "Volatility",
      status: "halted",
      profitability: -3.2,
      leverage: 1.5,
      winRate: 45.2,
      riskScore: 9.2,
      sharpeRatio: -0.45,
      maxDrawdown: -18.7,
      wins: 15,
      losses: 18,
      allocation: 10,
      currentPnL: -320,
      isUserStrategy: true,
    },
    {
      id: "6",
      name: "Statistical Mean Reversion",
      type: "Mean Reversion",
      status: "active",
      profitability: 12.5,
      leverage: 2.2,
      winRate: 68.9,
      riskScore: 6.0,
      sharpeRatio: 1.58,
      maxDrawdown: -9.1,
      wins: 42,
      losses: 19,
      allocation: 12,
      currentPnL: 1500,
      isUserStrategy: true,
    },
  ]);

  // Generate 3500+ strategies for Advanced Library
  const generateAllStrategies = (): Strategy[] => {
    const strategyTypes = [
      "Statistical Arbitrage", "Pairs Trading", "Market Making", "Momentum", "Mean Reversion",
      "Volatility Arbitrage", "Merger Arbitrage", "Convertible Arbitrage", "Fixed Income Arbitrage",
      "Options Strategies", "Crypto Arbitrage", "FX Carry", "Commodity Spreads", "ETF Arbitrage",
      "Index Arbitrage", "Event Driven", "Delta Neutral", "Gamma Scalping", "Theta Decay",
      "Vega Trading", "Skew Trading", "Calendar Spreads", "Butterfly Spreads", "Iron Condor",
      "Straddle", "Strangle", "Call Spread", "Put Spread", "Ratio Spread", "M&A", "Carry Trade",
      "Volatility"
    ];

    const strategyPrefixes = [
      "AI-Enhanced", "ML-Optimized", "Quant", "Adaptive", "Dynamic", "Multi-Asset",
      "Cross-Market", "Intraday", "Swing", "Position", "Scalping", "HFT", "Algorithmic",
      "Smart", "Precision", "Advanced", "Pro", "Elite", "Premium", "Ultimate", "Tactical",
      "Strategic", "Systematic", "Opportunistic", "Alpha-Seeking"
    ];

    const assetClasses = [
      "Equity", "FX", "Crypto", "Commodity", "Bond", "Derivatives", "ETF", "Index",
      "Options", "Futures", "Forex", "Digital Asset", "Multi-Asset", "Cross-Asset",
      "Rates", "Credit", "EM", "DM"
    ];

    const strategies: Strategy[] = [];
    let id = 1000;

    for (let i = 0; i < 3500; i++) {
      const type = strategyTypes[Math.floor(Math.random() * strategyTypes.length)];
      const prefix = strategyPrefixes[Math.floor(Math.random() * strategyPrefixes.length)];
      const asset = assetClasses[Math.floor(Math.random() * assetClasses.length)];
      
      const profitability = (Math.random() - 0.3) * 40; // -12 to +28
      const leverage = 1 + Math.random() * 4; // 1x to 5x
      const winRate = 40 + Math.random() * 45; // 40% to 85%
      const riskScore = 3 + Math.random() * 7; // 3 to 10
      const sharpeRatio = (Math.random() - 0.2) * 3; // -0.6 to 2.4
      const maxDrawdown = -(Math.random() * 20); // 0 to -20%
      const wins = Math.floor(Math.random() * 100);
      const losses = Math.floor(Math.random() * 80);
      const allocation = Math.random() * 5; // 0 to 5%
      const currentPnL = (Math.random() - 0.4) * 10000; // -4000 to +6000

      const statusRand = Math.random();
      let status: StrategyStatus;
      if (statusRand < 0.65) status = "active";
      else if (statusRand < 0.80) status = "paused";
      else if (statusRand < 0.90) status = "triggered";
      else status = "halted";

      strategies.push({
        id: `adv-${id++}`,
        name: `${prefix} ${type} ${asset} ${i + 1}`,
        type,
        status,
        profitability: Number(profitability.toFixed(2)),
        leverage: Number(leverage.toFixed(1)),
        winRate: Number(winRate.toFixed(1)),
        riskScore: Number(riskScore.toFixed(1)),
        sharpeRatio: Number(sharpeRatio.toFixed(2)),
        maxDrawdown: Number(maxDrawdown.toFixed(1)),
        wins,
        losses,
        allocation: Number(allocation.toFixed(2)),
        currentPnL: Number(currentPnL.toFixed(0)),
        isUserStrategy: false,
      });
    }

    return strategies;
  };

  const [allStrategies] = useState<Strategy[]>(generateAllStrategies());

  // Combine user strategies with all strategies
  const combinedStrategies = [...userStrategies, ...allStrategies];

  // Machine learning strategy generation
  const mlGeneratedStrategies = [
    { date: "2025-01-28", strategy: "AI-Generated Momentum + Vol Filter", backtest: "89.2%", deployed: true },
    { date: "2025-01-27", strategy: "ML Cross-Asset Correlation", backtest: "84.7%", deployed: true },
    { date: "2025-01-26", strategy: "Deep Learning Price Pattern", backtest: "81.3%", deployed: false },
    { date: "2025-01-25", strategy: "Reinforcement Learning Exit", backtest: "92.5%", deployed: true },
  ];

  // Emotion Engine data
  const [activeEmotionTab, setActiveEmotionTab] = useState("emotion");
  
  const marketEmotions = [
    { emotion: "Fear", level: 78, indicator: "VIX", value: 28.4, signal: "BUY Puts", confidence: 85 },
    { emotion: "Greed", level: 34, indicator: "Put/Call Ratio", value: 0.68, signal: "SELL Calls", confidence: 72 },
    { emotion: "Euphoria", level: 12, indicator: "Margin Debt", value: "$847B", signal: "SHORT High Beta", confidence: 68 },
    { emotion: "Panic", level: 89, indicator: "News Sentiment", value: -0.72, signal: "BUY Dip", confidence: 91 },
    { emotion: "Complacency", level: 45, indicator: "Vol Term Structure", value: 1.15, signal: "LONG Vol", confidence: 76 },
    { emotion: "Despair", level: 23, indicator: "Retail Flow", value: "-$2.4B", signal: "Contrarian LONG", confidence: 81 },
  ];

  const emotionTrades = [
    { timestamp: "14:35:21", emotion: "Fear Spike", trade: "SPY 485P 30DTE", size: "$2.4M", pnl: "+$145K", status: "OPEN" },
    { timestamp: "14:32:15", emotion: "Greed Extreme", trade: "TSLA Short", size: "$1.8M", pnl: "+$89K", status: "OPEN" },
    { timestamp: "14:28:42", emotion: "Panic Selling", trade: "QQQ Long", size: "$3.2M", pnl: "+$234K", status: "CLOSED" },
    { timestamp: "14:21:33", emotion: "Euphoria Peak", trade: "NVDA 580C Sell", size: "$1.5M", pnl: "+$67K", status: "CLOSED" },
  ];

  const warGameScenarios = [
    { 
      scenario: "Taiwan Strait Crisis", 
      probability: 18, 
      timeframe: "6-12 months",
      marketImpact: "SPY -35%, Defense +120%, Tech -45%",
      hedges: ["LMT Calls", "TSM Puts", "Gold Long"],
      severity: "CRITICAL"
    },
    { 
      scenario: "Iran-Israel Escalation", 
      probability: 34, 
      timeframe: "3-6 months",
      marketImpact: "Oil +45%, Energy +28%, SPY -12%",
      hedges: ["XLE Calls", "USO Long", "TLT Long"],
      severity: "HIGH"
    },
    { 
      scenario: "Russia-NATO Friction", 
      probability: 42, 
      timeframe: "1-3 months",
      marketImpact: "EUR -8%, Defense +15%, Energy +22%",
      hedges: ["EUR Puts", "NG Long", "BA Calls"],
      severity: "MEDIUM"
    },
    { 
      scenario: "North Korea Provocation", 
      probability: 28, 
      timeframe: "1-6 months",
      marketImpact: "Asia -6%, Gold +12%, Defense +18%",
      hedges: ["GLD Calls", "EWY Puts", "RTX Calls"],
      severity: "MEDIUM"
    },
  ];

  const activeWarGames = [
    { game: "Taiwan Crisis Sim", status: "RUNNING", iterations: 10000, daysSim: 180, optimalHedge: "70% Defense + 30% Gold", expectedReturn: "+18.4%" },
    { game: "Middle East Escalation", status: "RUNNING", iterations: 5000, daysSim: 90, optimalHedge: "85% Energy + 15% Bonds", expectedReturn: "+24.7%" },
    { game: "Trade War 2.0", status: "COMPLETE", iterations: 15000, daysSim: 365, optimalHedge: "60% EM Shorts + 40% USD", expectedReturn: "+12.3%" },
  ];

  const investorArchetypes = [
    { 
      archetype: "Retail FOMO Trader", 
      population: 10000, 
      strategy: "Buy high, sell low on momentum",
      avgReturn: -8.4,
      volatility: 34.2,
      turnover: 450,
      exploitability: 87
    },
    { 
      archetype: "Boomer Buy & Hold", 
      population: 5000, 
      strategy: "60/40 stocks/bonds rebalance",
      avgReturn: 7.2,
      volatility: 12.4,
      turnover: 12,
      exploitability: 23
    },
    { 
      archetype: "Hedge Fund Manager", 
      population: 500, 
      strategy: "Multi-strategy long/short",
      avgReturn: 12.8,
      volatility: 18.5,
      turnover: 280,
      exploitability: 34
    },
    { 
      archetype: "Quant Algo Trader", 
      population: 2000, 
      strategy: "Statistical arbitrage",
      avgReturn: 15.4,
      volatility: 9.2,
      turnover: 1840,
      exploitability: 12
    },
    { 
      archetype: "Value Investor", 
      population: 3000, 
      strategy: "Deep value + dividends",
      avgReturn: 9.6,
      volatility: 14.8,
      turnover: 24,
      exploitability: 41
    },
  ];

  const marketSimulation = [
    { archetype: "Retail FOMO", buyPressure: 12.4, sellPressure: 8.2, netFlow: "+$420M", marketShare: 18.2 },
    { archetype: "Boomer Buy & Hold", buyPressure: 4.2, sellPressure: 3.8, netFlow: "+$45M", marketShare: 24.5 },
    { archetype: "Hedge Fund", buyPressure: 18.7, sellPressure: 16.3, netFlow: "+$280M", marketShare: 32.1 },
    { archetype: "Quant Algo", buyPressure: 42.3, sellPressure: 41.8, netFlow: "+$78M", marketShare: 15.8 },
    { archetype: "Value Investor", buyPressure: 5.6, sellPressure: 6.2, netFlow: "-$52M", marketShare: 9.4 },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "CRITICAL": return "bg-[#FF5252]/20 text-[#FF5252] border-[#FF5252]/30";
      case "HIGH": return "bg-[#FF9800]/20 text-[#FF9800] border-[#FF9800]/30";
      case "MEDIUM": return "bg-[#2979FF]/20 text-[#2979FF] border-[#2979FF]/30";
      default: return "bg-[#A0A0A5]/20 text-[#A0A0A5] border-[#A0A0A5]/30";
    }
  };

  const toggleStrategy = (id: string) => {
    // This would toggle strategy status in a real implementation
    console.log("Toggle strategy:", id);
  };

  const getStatusColor = (status: StrategyStatus | string) => {
    switch (status) {
      case "active": return "bg-[#00E0A4]/20 text-[#00E0A4]";
      case "halted": return "bg-[#FF5252]/20 text-[#FF5252]";
      case "triggered": return "bg-[#FF9800]/20 text-[#FF9800]";
      case "paused": return "bg-[#FF9800]/20 text-[#FF9800] border-[#FF9800]/30";
      case "disabled": return "bg-[#A0A0A5]/20 text-[#A0A0A5] border-[#A0A0A5]/30";
      default: return "bg-[#A0A0A5]/20 text-[#A0A0A5]";
    }
  };

  const getRiskColor = (score: number) => {
    if (score >= 8) return "text-[#FF5252]";
    if (score >= 6) return "text-[#FF9800]";
    return "text-[#00E0A4]";
  };

  // Filter logic for all strategies
  const filteredStrategies = combinedStrategies.filter(strategy => {
    const matchesSearch = strategy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         strategy.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || strategy.type === selectedCategory;
    const matchesStatus = selectedStatus === "all" || strategy.status === selectedStatus;
    const matchesMyStrategies = !showOnlyMyStrategies || strategy.isUserStrategy;
    
    return matchesSearch && matchesCategory && matchesStatus && matchesMyStrategies;
  });

  // Get unique strategy types for category filter
  const strategyCategories = Array.from(new Set(combinedStrategies.map(s => s.type))).sort();

  // Calculate stats for filtered strategies
  const totalAllocation = filteredStrategies.reduce((sum, s) => sum + (s.status === "active" ? s.allocation : 0), 0);
  const activeStrategiesCount = filteredStrategies.filter(s => s.status === "active").length;
  const totalProfit = filteredStrategies.reduce((sum, s) => sum + (s.status === "active" ? s.currentPnL : 0), 0);
  const avgWinRate = filteredStrategies.length > 0 
    ? filteredStrategies.reduce((sum, s) => sum + s.winRate, 0) / filteredStrategies.length 
    : 0;

  // User strategies stats
  const myActiveStrategies = userStrategies.filter(s => s.status === "active");
  const myTotalAllocation = userStrategies.reduce((sum, s) => sum + s.allocation, 0);
  const myTotalProfit = userStrategies.reduce((sum, s) => sum + s.currentPnL, 0);

  // Strategy rendering component
  const StrategyCard = ({ strategy, onToggle }: { strategy: Strategy; onToggle?: (id: string) => void }) => {
    const isProfitable = strategy.profitability >= 0;
    
    return (
      <div className={`bg-[#151519] rounded-lg border p-4 hover:border-[#00E0A4] transition-colors ${
        strategy.isUserStrategy ? 'border-[#2979FF]' : 'border-[#1F1F23]'
      }`}>
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-sm">{strategy.name}</h3>
              {strategy.isUserStrategy && (
                <Badge className="text-[9px] px-1.5 py-0 bg-[#2979FF]/20 text-[#2979FF] border-[#2979FF]/30">
                  MY STRATEGY
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#A0A0A5]">{strategy.type}</span>
              <Badge className={`text-[10px] px-1.5 py-0 ${getStatusColor(strategy.status)}`}>
                {strategy.status.toUpperCase()}
              </Badge>
            </div>
          </div>
          {strategy.isUserStrategy && onToggle && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onToggle(strategy.id)}
              className="h-7 w-7 p-0"
            >
              {strategy.status === "active" ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4" />
              )}
            </Button>
          )}
        </div>

        {/* Current PnL */}
        <div className="mb-3 p-2 bg-[#0D0D0F] rounded">
          <div className="text-xs text-[#A0A0A5] mb-1">Current PnL</div>
          <div className={`text-xl flex items-center gap-1 ${strategy.currentPnL >= 0 ? 'text-[#00E0A4]' : 'text-[#FF5252]'}`}>
            {strategy.currentPnL >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
            ${Math.abs(strategy.currentPnL).toLocaleString()}
          </div>
        </div>

        {/* Allocation Progress */}
        <div className="mb-3">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-[#A0A0A5]">Allocation</span>
            <span>{strategy.allocation.toFixed(2)}%</span>
          </div>
          <Progress value={Math.min(strategy.allocation, 100)} className="h-1.5" />
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="text-xs">
            <div className="text-[#A0A0A5]">Profitability</div>
            <div className={isProfitable ? 'text-[#00E0A4]' : 'text-[#FF5252]'}>
              {isProfitable ? '+' : ''}{strategy.profitability}%
            </div>
          </div>
          <div className="text-xs">
            <div className="text-[#A0A0A5]">Leverage</div>
            <div>{strategy.leverage}x</div>
          </div>
          <div className="text-xs">
            <div className="text-[#A0A0A5]">Win Rate</div>
            <div className="text-[#00E0A4]">{strategy.winRate}%</div>
          </div>
          <div className="text-xs">
            <div className="text-[#A0A0A5]">Risk Score</div>
            <div className={getRiskColor(strategy.riskScore)}>{strategy.riskScore}/10</div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="border-t border-[#1F1F23] pt-3 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-[#A0A0A5]">Sharpe Ratio</span>
            <span>{strategy.sharpeRatio}</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-[#A0A0A5]">Max Drawdown</span>
            <span className="text-[#FF5252]">{strategy.maxDrawdown}%</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-[#A0A0A5]">Win/Loss</span>
            <span>{strategy.wins}W / {strategy.losses}L</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
      <TabsList className="bg-[#1F1F23] border-b-2 border-[#2979FF]/20 w-full justify-start rounded-none h-12 p-0">
        <TabsTrigger 
          value="active"
          className="data-[state=active]:bg-white data-[state=active]:text-black bg-transparent text-[#E8E8E8] hover:text-white hover:bg-[#2A2A2E] rounded-lg px-6 h-10 transition-all mx-1"
        >
          All Strategies ({combinedStrategies.length.toLocaleString()})
        </TabsTrigger>
        <TabsTrigger 
          value="emotion"
          className="data-[state=active]:bg-white data-[state=active]:text-black bg-transparent text-[#E8E8E8] hover:text-white hover:bg-[#2A2A2E] rounded-lg px-6 h-10 transition-all mx-1"
        >
          <Heart className="h-3 w-3 mr-2" />
          Emotion Engine
        </TabsTrigger>
      </TabsList>

      {/* Active Strategies Tab - Now includes ALL strategies with filtering */}
      <TabsContent value="active" className="mt-0 h-[calc(100vh-180px)]">
        <div className="h-full flex flex-col">
          {/* Header Section */}
          <div className="border-b border-[#1F1F23] bg-[#151519] p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Zap className="w-5 h-5 text-[#00E0A4]" />
                <div>
                  <h2 className="text-sm">Strategy Management Dashboard</h2>
                  <p className="text-xs text-[#A0A0A5]">{combinedStrategies.length.toLocaleString()} total strategies available</p>
                </div>
              </div>
              
              {/* Toggle for My Strategies */}
              <div className="flex items-center gap-3">
                <span className="text-xs text-[#A0A0A5]">Show only my strategies</span>
                <Switch 
                  checked={showOnlyMyStrategies} 
                  onCheckedChange={setShowOnlyMyStrategies}
                />
              </div>
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-[#0D0D0F] rounded-lg border border-[#1F1F23] p-3">
                <div className="text-xs text-[#A0A0A5] mb-1">
                  {showOnlyMyStrategies ? "My Active Strategies" : "Active Strategies"}
                </div>
                <div className="text-xl text-[#00E0A4]">
                  {showOnlyMyStrategies ? myActiveStrategies.length : activeStrategiesCount}
                </div>
                <div className="text-xs text-[#A0A0A5]">
                  {showOnlyMyStrategies ? `of ${userStrategies.length} total` : `of ${filteredStrategies.length.toLocaleString()} filtered`}
                </div>
              </div>
              <div className="bg-[#0D0D0F] rounded-lg border border-[#1F1F23] p-3">
                <div className="text-xs text-[#A0A0A5] mb-1">Total Allocation</div>
                <div className="text-xl">
                  {showOnlyMyStrategies ? myTotalAllocation.toFixed(1) : totalAllocation.toFixed(1)}%
                </div>
                <div className="text-xs text-[#A0A0A5]">Of capital</div>
              </div>
              <div className="bg-[#0D0D0F] rounded-lg border border-[#1F1F23] p-3">
                <div className="text-xs text-[#A0A0A5] mb-1">Combined P&L</div>
                <div className={`text-xl ${(showOnlyMyStrategies ? myTotalProfit : totalProfit) >= 0 ? 'text-[#00E0A4]' : 'text-[#FF5252]'}`}>
                  ${(showOnlyMyStrategies ? myTotalProfit : totalProfit).toLocaleString()}
                </div>
                <div className="text-xs text-[#00E0A4]">Today</div>
              </div>
              <div className="bg-[#0D0D0F] rounded-lg border border-[#1F1F23] p-3">
                <div className="text-xs text-[#A0A0A5] mb-1">Avg Win Rate</div>
                <div className="text-xl">{avgWinRate.toFixed(1)}%</div>
                <div className="text-xs text-[#A0A0A5]">Across filtered</div>
              </div>
            </div>

            {/* Search and Filter */}
            <div className="flex items-center gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#A0A0A5]" />
                <Input
                  type="text"
                  placeholder="Search strategies by name or type..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-[#0D0D0F] border-[#1F1F23] text-sm"
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-[#A0A0A5]" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-[#0D0D0F] border border-[#1F1F23] rounded px-4 py-2 text-sm"
                >
                  <option value="all">All Categories</option>
                  {strategyCategories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="bg-[#0D0D0F] border border-[#1F1F23] rounded px-4 py-2 text-sm"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="paused">Paused</option>
                  <option value="triggered">Triggered</option>
                  <option value="halted">Halted</option>
                </select>
              </div>
            </div>

            {/* Results Count */}
            <div className="flex items-center justify-between text-xs text-[#A0A0A5]">
              <span>
                Showing {filteredStrategies.length.toLocaleString()} of {combinedStrategies.length.toLocaleString()} strategies
                {showOnlyMyStrategies && " (My Strategies Only)"}
              </span>
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm("")}
                  className="text-[#2979FF] hover:text-[#2979FF]/80"
                >
                  Clear search
                </button>
              )}
            </div>
          </div>

          {/* Strategy Grid */}
          <ScrollArea className="flex-1 p-4">
            {filteredStrategies.length > 0 ? (
              <div className="grid grid-cols-3 gap-4">
                {filteredStrategies.map((strategy) => (
                  <StrategyCard 
                    key={strategy.id} 
                    strategy={strategy} 
                    onToggle={strategy.isUserStrategy ? toggleStrategy : undefined}
                  />
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-64">
                <div className="text-center">
                  <AlertCircle className="w-12 h-12 text-[#A0A0A5] mx-auto mb-3" />
                  <p className="text-[#A0A0A5]">No strategies found matching your criteria</p>
                  <p className="text-xs text-[#A0A0A5] mt-1">Try adjusting your search or filters</p>
                </div>
              </div>
            )}
          </ScrollArea>
        </div>
      </TabsContent>

      {/* Emotion Engine Tab */}
      <TabsContent value="emotion" className="p-0 m-0 h-full">
        <div className="h-[calc(100vh-180px)]">
          <Tabs value={activeEmotionTab} onValueChange={setActiveEmotionTab} className="h-full flex flex-col">
            <TabsList className="bg-[#1F1F23] border-b-2 border-[#2979FF]/20 rounded-none w-full justify-start p-0 h-12">
              <TabsTrigger value="emotion" className="data-[state=active]:bg-[#151519] data-[state=active]:text-[#00E0A4] data-[state=active]:border-b-2 data-[state=active]:border-[#00E0A4] bg-transparent text-[#E8E8E8] hover:text-white hover:bg-[#151519]/50 rounded-none border-b-2 border-transparent px-6 whitespace-nowrap transition-all">
                Emotion Trading
              </TabsTrigger>
              <TabsTrigger value="wargame" className="data-[state=active]:bg-[#151519] data-[state=active]:text-[#00E0A4] data-[state=active]:border-b-2 data-[state=active]:border-[#00E0A4] bg-transparent text-[#E8E8E8] hover:text-white hover:bg-[#151519]/50 rounded-none border-b-2 border-transparent px-6 whitespace-nowrap transition-all">
                War Game Engine
              </TabsTrigger>
              <TabsTrigger value="synthetic" className="data-[state=active]:bg-[#151519] data-[state=active]:text-[#00E0A4] data-[state=active]:border-b-2 data-[state=active]:border-[#00E0A4] bg-transparent text-[#E8E8E8] hover:text-white hover:bg-[#151519]/50 rounded-none border-b-2 border-transparent px-6 whitespace-nowrap transition-all">
                Synthetic Investors
              </TabsTrigger>
            </TabsList>

            <ScrollArea className="flex-1">
              <div className="p-4">
                {/* Emotion Trading Engine */}
                <TabsContent value="emotion" className="mt-0">
                  <div className="space-y-4">
                    <div className="bg-[#151519] rounded-lg border border-[#1F1F23] p-4">
                      <div className="flex items-center gap-2 mb-4">
                        <Heart className="w-6 h-6 text-[#FF6B9D]" />
                        <div>
                          <h3 className="text-sm">Emotion-Driven Trading Engine</h3>
                          <p className="text-xs text-[#A0A0A5]">AI analyzes market sentiment and emotions to generate contrarian signals</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-4 gap-4">
                        <div className="bg-[#0D0D0F] rounded-lg border border-[#1F1F23] p-3">
                          <div className="text-xs text-[#A0A0A5] mb-1">Dominant Emotion</div>
                          <div className="text-xl text-[#FF5252]">Fear</div>
                        </div>
                        <div className="bg-[#0D0D0F] rounded-lg border border-[#1F1F23] p-3">
                          <div className="text-xs text-[#A0A0A5] mb-1">Active Signals</div>
                          <div className="text-xl text-[#2979FF]">6</div>
                        </div>
                        <div className="bg-[#0D0D0F] rounded-lg border border-[#1F1F23] p-3">
                          <div className="text-xs text-[#A0A0A5] mb-1">Trades Today</div>
                          <div className="text-xl">42</div>
                        </div>
                        <div className="bg-[#0D0D0F] rounded-lg border border-[#1F1F23] p-3">
                          <div className="text-xs text-[#A0A0A5] mb-1">Emotion P&L</div>
                          <div className="text-xl text-[#00E0A4]">+$1.2M</div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-[#151519] rounded-lg border border-[#1F1F23]">
                      <div className="p-4 border-b border-[#1F1F23]">
                        <h3 className="text-sm">Real-Time Market Emotions</h3>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b border-[#1F1F23]">
                              <th className="text-left text-xs text-[#A0A0A5] p-3">Emotion</th>
                              <th className="text-right text-xs text-[#A0A0A5] p-3">Level</th>
                              <th className="text-left text-xs text-[#A0A0A5] p-3">Indicator</th>
                              <th className="text-right text-xs text-[#A0A0A5] p-3">Value</th>
                              <th className="text-left text-xs text-[#A0A0A5] p-3">Trading Signal</th>
                              <th className="text-right text-xs text-[#A0A0A5] p-3">Confidence</th>
                            </tr>
                          </thead>
                          <tbody>
                            {marketEmotions.map((emotion, idx) => (
                              <tr key={idx} className="border-b border-[#1F1F23] hover:bg-[#0D0D0F] transition-colors">
                                <td className="p-3 text-sm">{emotion.emotion}</td>
                                <td className="p-3 text-sm text-right">
                                  <div className="flex items-center gap-2 justify-end">
                                    <span className={emotion.level >= 70 ? 'text-[#FF5252]' : emotion.level >= 40 ? 'text-[#FF9800]' : 'text-[#00E0A4]'}>
                                      {emotion.level}%
                                    </span>
                                    <Progress value={emotion.level} className="w-20 h-2" />
                                  </div>
                                </td>
                                <td className="p-3 text-sm text-[#A0A0A5]">{emotion.indicator}</td>
                                <td className="p-3 text-sm text-right">{emotion.value}</td>
                                <td className="p-3">
                                  <Badge className="text-xs bg-[#2979FF]/20 text-[#2979FF] border-[#2979FF]/30">
                                    {emotion.signal}
                                  </Badge>
                                </td>
                                <td className="p-3 text-sm text-right text-[#00E0A4]">{emotion.confidence}%</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div className="bg-[#151519] rounded-lg border border-[#1F1F23]">
                      <div className="p-4 border-b border-[#1F1F23]">
                        <h3 className="text-sm">Recent Emotion Trades</h3>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b border-[#1F1F23]">
                              <th className="text-left text-xs text-[#A0A0A5] p-3">Timestamp</th>
                              <th className="text-left text-xs text-[#A0A0A5] p-3">Emotion Trigger</th>
                              <th className="text-left text-xs text-[#A0A0A5] p-3">Trade</th>
                              <th className="text-right text-xs text-[#A0A0A5] p-3">Size</th>
                              <th className="text-right text-xs text-[#A0A0A5] p-3">P&L</th>
                              <th className="text-left text-xs text-[#A0A0A5] p-3">Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {emotionTrades.map((trade, idx) => (
                              <tr key={idx} className="border-b border-[#1F1F23] hover:bg-[#0D0D0F] transition-colors">
                                <td className="p-3 text-xs text-[#A0A0A5]">{trade.timestamp}</td>
                                <td className="p-3 text-sm">{trade.emotion}</td>
                                <td className="p-3 text-sm">{trade.trade}</td>
                                <td className="p-3 text-sm text-right">{trade.size}</td>
                                <td className="p-3 text-sm text-right text-[#00E0A4]">{trade.pnl}</td>
                                <td className="p-3">
                                  <Badge className={`text-xs ${trade.status === 'OPEN' ? 'bg-[#2979FF]/20 text-[#2979FF] border-[#2979FF]/30' : 'bg-[#A0A0A5]/20 text-[#A0A0A5] border-[#A0A0A5]/30'}`}>
                                    {trade.status}
                                  </Badge>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                {/* War Game Engine */}
                <TabsContent value="wargame" className="mt-0">
                  <div className="space-y-4">
                    <div className="bg-[#151519] rounded-lg border border-[#1F1F23] p-4">
                      <div className="flex items-center gap-2 mb-4">
                        <Swords className="w-6 h-6 text-[#FF5252]" />
                        <div>
                          <h3 className="text-sm">Geopolitical War Game Engine</h3>
                          <p className="text-xs text-[#A0A0A5]">Monte Carlo simulations for conflict scenarios and optimal hedging strategies</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="bg-[#0D0D0F] rounded-lg border border-[#1F1F23] p-3">
                          <div className="text-xs text-[#A0A0A5] mb-1">Active Simulations</div>
                          <div className="text-xl text-[#2979FF]">3</div>
                        </div>
                        <div className="bg-[#0D0D0F] rounded-lg border border-[#1F1F23] p-3">
                          <div className="text-xs text-[#A0A0A5] mb-1">Scenarios Tracked</div>
                          <div className="text-xl">4</div>
                        </div>
                        <div className="bg-[#0D0D0F] rounded-lg border border-[#1F1F23] p-3">
                          <div className="text-xs text-[#A0A0A5] mb-1">Hedges Active</div>
                          <div className="text-xl text-[#00E0A4]">12</div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-[#151519] rounded-lg border border-[#1F1F23]">
                      <div className="p-4 border-b border-[#1F1F23]">
                        <h3 className="text-sm">Active War Game Scenarios</h3>
                      </div>
                      <div className="p-4 space-y-3">
                        {warGameScenarios.map((scenario, idx) => (
                          <div key={idx} className="bg-[#0D0D0F] rounded-lg border border-[#1F1F23] p-4">
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <h4 className="text-sm mb-1">{scenario.scenario}</h4>
                                <div className="flex items-center gap-2 text-xs text-[#A0A0A5]">
                                  <span>Timeframe: {scenario.timeframe}</span>
                                  <span>•</span>
                                  <span>Probability: {scenario.probability}%</span>
                                </div>
                              </div>
                              <Badge className={getSeverityColor(scenario.severity)}>
                                {scenario.severity}
                              </Badge>
                            </div>
                            <div className="space-y-2 text-xs">
                              <div>
                                <span className="text-[#A0A0A5]">Market Impact: </span>
                                <span>{scenario.marketImpact}</span>
                              </div>
                              <div>
                                <span className="text-[#A0A0A5]">Optimal Hedges: </span>
                                <span className="text-[#00E0A4]">{scenario.hedges.join(", ")}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-[#151519] rounded-lg border border-[#1F1F23]">
                      <div className="p-4 border-b border-[#1F1F23]">
                        <h3 className="text-sm">Running Simulations</h3>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b border-[#1F1F23]">
                              <th className="text-left text-xs text-[#A0A0A5] p-3">Simulation</th>
                              <th className="text-left text-xs text-[#A0A0A5] p-3">Status</th>
                              <th className="text-right text-xs text-[#A0A0A5] p-3">Iterations</th>
                              <th className="text-right text-xs text-[#A0A0A5] p-3">Days Simulated</th>
                              <th className="text-left text-xs text-[#A0A0A5] p-3">Optimal Hedge</th>
                              <th className="text-right text-xs text-[#A0A0A5] p-3">Expected Return</th>
                            </tr>
                          </thead>
                          <tbody>
                            {activeWarGames.map((game, idx) => (
                              <tr key={idx} className="border-b border-[#1F1F23] hover:bg-[#0D0D0F] transition-colors">
                                <td className="p-3 text-sm">{game.game}</td>
                                <td className="p-3">
                                  <Badge className={`text-xs ${game.status === 'RUNNING' ? 'bg-[#00E0A4]/20 text-[#00E0A4] border-[#00E0A4]/30' : 'bg-[#A0A0A5]/20 text-[#A0A0A5] border-[#A0A0A5]/30'}`}>
                                    {game.status}
                                  </Badge>
                                </td>
                                <td className="p-3 text-sm text-right">{game.iterations.toLocaleString()}</td>
                                <td className="p-3 text-sm text-right">{game.daysSim}</td>
                                <td className="p-3 text-sm">{game.optimalHedge}</td>
                                <td className="p-3 text-sm text-right text-[#00E0A4]">{game.expectedReturn}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                {/* Synthetic Investors */}
                <TabsContent value="synthetic" className="mt-0">
                  <div className="space-y-4">
                    <div className="bg-[#151519] rounded-lg border border-[#1F1F23] p-4">
                      <div className="flex items-center gap-2 mb-4">
                        <User className="w-6 h-6 text-[#9C27B0]" />
                        <div>
                          <h3 className="text-sm">Synthetic Investor Simulation</h3>
                          <p className="text-xs text-[#A0A0A5]">AI models different investor archetypes to identify exploitable patterns</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-4 gap-4">
                        <div className="bg-[#0D0D0F] rounded-lg border border-[#1F1F23] p-3">
                          <div className="text-xs text-[#A0A0A5] mb-1">Total Agents</div>
                          <div className="text-xl">20,500</div>
                        </div>
                        <div className="bg-[#0D0D0F] rounded-lg border border-[#1F1F23] p-3">
                          <div className="text-xs text-[#A0A0A5] mb-1">Archetypes</div>
                          <div className="text-xl text-[#2979FF]">5</div>
                        </div>
                        <div className="bg-[#0D0D0F] rounded-lg border border-[#1F1F23] p-3">
                          <div className="text-xs text-[#A0A0A5] mb-1">Exploitable</div>
                          <div className="text-xl text-[#FF9800]">13,500</div>
                        </div>
                        <div className="bg-[#0D0D0F] rounded-lg border border-[#1F1F23] p-3">
                          <div className="text-xs text-[#A0A0A5] mb-1">Market Edge</div>
                          <div className="text-xl text-[#00E0A4]">+4.2%</div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-[#151519] rounded-lg border border-[#1F1F23]">
                      <div className="p-4 border-b border-[#1F1F23]">
                        <h3 className="text-sm">Investor Archetypes</h3>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b border-[#1F1F23]">
                              <th className="text-left text-xs text-[#A0A0A5] p-3">Archetype</th>
                              <th className="text-right text-xs text-[#A0A0A5] p-3">Population</th>
                              <th className="text-left text-xs text-[#A0A0A5] p-3">Strategy</th>
                              <th className="text-right text-xs text-[#A0A0A5] p-3">Avg Return</th>
                              <th className="text-right text-xs text-[#A0A0A5] p-3">Volatility</th>
                              <th className="text-right text-xs text-[#A0A0A5] p-3">Turnover</th>
                              <th className="text-right text-xs text-[#A0A0A5] p-3">Exploitability</th>
                            </tr>
                          </thead>
                          <tbody>
                            {investorArchetypes.map((archetype, idx) => (
                              <tr key={idx} className="border-b border-[#1F1F23] hover:bg-[#0D0D0F] transition-colors">
                                <td className="p-3 text-sm">{archetype.archetype}</td>
                                <td className="p-3 text-sm text-right">{archetype.population.toLocaleString()}</td>
                                <td className="p-3 text-sm text-[#A0A0A5]">{archetype.strategy}</td>
                                <td className="p-3 text-sm text-right">
                                  <span className={archetype.avgReturn >= 0 ? 'text-[#00E0A4]' : 'text-[#FF5252]'}>
                                    {archetype.avgReturn >= 0 ? '+' : ''}{archetype.avgReturn}%
                                  </span>
                                </td>
                                <td className="p-3 text-sm text-right">{archetype.volatility}%</td>
                                <td className="p-3 text-sm text-right">{archetype.turnover}%</td>
                                <td className="p-3 text-sm text-right">
                                  <div className="flex items-center gap-2 justify-end">
                                    <span className={archetype.exploitability >= 70 ? 'text-[#00E0A4]' : archetype.exploitability >= 40 ? 'text-[#FF9800]' : 'text-[#A0A0A5]'}>
                                      {archetype.exploitability}%
                                    </span>
                                    <Progress value={archetype.exploitability} className="w-16 h-2" />
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div className="bg-[#151519] rounded-lg border border-[#1F1F23]">
                      <div className="p-4 border-b border-[#1F1F23]">
                        <h3 className="text-sm">Market Flow Simulation</h3>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b border-[#1F1F23]">
                              <th className="text-left text-xs text-[#A0A0A5] p-3">Archetype</th>
                              <th className="text-right text-xs text-[#A0A0A5] p-3">Buy Pressure</th>
                              <th className="text-right text-xs text-[#A0A0A5] p-3">Sell Pressure</th>
                              <th className="text-right text-xs text-[#A0A0A5] p-3">Net Flow</th>
                              <th className="text-right text-xs text-[#A0A0A5] p-3">Market Share</th>
                            </tr>
                          </thead>
                          <tbody>
                            {marketSimulation.map((sim, idx) => (
                              <tr key={idx} className="border-b border-[#1F1F23] hover:bg-[#0D0D0F] transition-colors">
                                <td className="p-3 text-sm">{sim.archetype}</td>
                                <td className="p-3 text-sm text-right text-[#00E0A4]">{sim.buyPressure}M/hr</td>
                                <td className="p-3 text-sm text-right text-[#FF5252]">{sim.sellPressure}M/hr</td>
                                <td className="p-3 text-sm text-right">
                                  <span className={sim.netFlow.startsWith('+') ? 'text-[#00E0A4]' : 'text-[#FF5252]'}>
                                    {sim.netFlow}
                                  </span>
                                </td>
                                <td className="p-3 text-sm text-right">{sim.marketShare}%</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </div>
            </ScrollArea>
          </Tabs>
        </div>
      </TabsContent>
    </Tabs>
  );
}
