import { useState, useMemo } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Slider } from "../ui/slider";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { ScrollArea } from "../ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { 
  Search, 
  Filter, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  Shield, 
  Zap, 
  Target,
  PieChart,
  BarChart3,
  X,
  Plus,
  Settings,
  Activity,
  CheckCircle2,
  ArrowUpRight,
  ArrowDownRight,
  Percent,
  DollarSign,
  TrendingUpIcon
} from "lucide-react";
import { LineChart, Line, BarChart, Bar, PieChart as RePieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface Strategy {
  id: string;
  name: string;
  type: string;
  profitability: number;
  leverage: number;
  winRate: number;
  riskScore: number;
  sharpeRatio: number;
  maxDrawdown: number;
  volatility: number;
  beta: number;
  alpha: number;
}

interface SelectedStrategy extends Strategy {
  allocation: number; // Percentage allocation
}

type RiskProfile = "conservative" | "moderate" | "aggressive" | "custom";

export function PortfolioBuilderTab() {
  const [riskProfile, setRiskProfile] = useState<RiskProfile>("moderate");
  const [customRiskTolerance, setCustomRiskTolerance] = useState(5);
  const [selectedStrategies, setSelectedStrategies] = useState<SelectedStrategy[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [sortBy, setSortBy] = useState<"profitability" | "risk" | "sharpe">("sharpe");
  const [viewMode, setViewMode] = useState<"grid" | "table">("table");

  // Generate comprehensive strategy library
  const generateStrategies = (): Strategy[] => {
    const strategyTypes = [
      "Statistical Arbitrage", "Pairs Trading", "Market Making", "Momentum", "Mean Reversion",
      "Volatility Arbitrage", "Merger Arbitrage", "Convertible Arbitrage", "Fixed Income Arbitrage",
      "Options Strategies", "Crypto Arbitrage", "FX Carry", "Commodity Spreads", "ETF Arbitrage",
      "Index Arbitrage", "Event Driven", "Delta Neutral", "Gamma Scalping", "Theta Decay",
      "Vega Trading", "Skew Trading", "Calendar Spreads", "Butterfly Spreads", "Iron Condor",
      "Straddle", "Strangle", "Call Spread", "Put Spread", "Ratio Spread"
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
      const volatility = 5 + Math.random() * 25; // 5% to 30%
      const beta = 0.5 + Math.random() * 1.5; // 0.5 to 2.0
      const alpha = (Math.random() - 0.3) * 15; // -4.5 to +10.5

      strategies.push({
        id: `strat-${i}`,
        name: `${prefix} ${type} ${asset}`,
        type,
        profitability: Number(profitability.toFixed(2)),
        leverage: Number(leverage.toFixed(1)),
        winRate: Number(winRate.toFixed(1)),
        riskScore: Number(riskScore.toFixed(1)),
        sharpeRatio: Number(sharpeRatio.toFixed(2)),
        maxDrawdown: Number(maxDrawdown.toFixed(1)),
        volatility: Number(volatility.toFixed(1)),
        beta: Number(beta.toFixed(2)),
        alpha: Number(alpha.toFixed(2)),
      });
    }

    return strategies;
  };

  const [allStrategies] = useState<Strategy[]>(generateStrategies());

  // Risk profile configurations
  const riskProfiles = {
    conservative: { maxRisk: 4, maxLeverage: 2, targetSharpe: 1.5, label: "Conservative", maxDrawdown: -8, color: "#00E0A4" },
    moderate: { maxRisk: 6, maxLeverage: 3, targetSharpe: 1.2, label: "Moderate", maxDrawdown: -12, color: "#2979FF" },
    aggressive: { maxRisk: 9, maxLeverage: 5, targetSharpe: 0.8, label: "Aggressive", maxDrawdown: -20, color: "#FF6B9D" },
    custom: { maxRisk: customRiskTolerance, maxLeverage: 5, targetSharpe: 0.5, label: "Custom", maxDrawdown: -25, color: "#FFB84D" }
  };

  // Filter strategies based on risk profile
  const recommendedStrategies = useMemo(() => {
    const profile = riskProfiles[riskProfile];
    let filtered = allStrategies.filter(s => 
      s.riskScore <= profile.maxRisk && 
      s.leverage <= profile.maxLeverage &&
      s.maxDrawdown >= profile.maxDrawdown
    );

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(s => 
        s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.type.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply type filter
    if (filterType !== "all") {
      filtered = filtered.filter(s => s.type === filterType);
    }

    // Sort
    filtered.sort((a, b) => {
      if (sortBy === "profitability") return b.profitability - a.profitability;
      if (sortBy === "risk") return a.riskScore - b.riskScore;
      return b.sharpeRatio - a.sharpeRatio;
    });

    return filtered;
  }, [allStrategies, riskProfile, searchTerm, filterType, sortBy, customRiskTolerance]);

  // Portfolio calculations
  const portfolioMetrics = useMemo(() => {
    if (selectedStrategies.length === 0) {
      return {
        totalAllocation: 0,
        avgRisk: 0,
        avgSharpe: 0,
        avgDrawdown: 0,
        expectedReturn: 0,
        portfolioVolatility: 0,
        diversificationScore: 0,
        avgBeta: 0,
        avgAlpha: 0,
        informationRatio: 0,
        sortinoRatio: 0
      };
    }

    const totalAllocation = selectedStrategies.reduce((sum, s) => sum + s.allocation, 0);
    const avgRisk = selectedStrategies.reduce((sum, s) => sum + (s.riskScore * s.allocation / 100), 0);
    const avgSharpe = selectedStrategies.reduce((sum, s) => sum + (s.sharpeRatio * s.allocation / 100), 0);
    const avgDrawdown = selectedStrategies.reduce((sum, s) => sum + (s.maxDrawdown * s.allocation / 100), 0);
    const expectedReturn = selectedStrategies.reduce((sum, s) => sum + (s.profitability * s.allocation / 100), 0);
    const avgBeta = selectedStrategies.reduce((sum, s) => sum + (s.beta * s.allocation / 100), 0);
    const avgAlpha = selectedStrategies.reduce((sum, s) => sum + (s.alpha * s.allocation / 100), 0);
    
    const portfolioVolatility = Math.sqrt(
      selectedStrategies.reduce((sum, s) => sum + Math.pow(s.volatility * s.allocation / 100, 2), 0)
    );

    const informationRatio = avgAlpha / (portfolioVolatility || 1);
    const sortinoRatio = expectedReturn / (Math.abs(avgDrawdown) || 1);

    // Diversification score based on strategy type variety
    const uniqueTypes = new Set(selectedStrategies.map(s => s.type)).size;
    const diversificationScore = Math.min(100, (uniqueTypes / Math.min(selectedStrategies.length, 10)) * 100);

    return {
      totalAllocation,
      avgRisk,
      avgSharpe,
      avgDrawdown,
      expectedReturn,
      portfolioVolatility,
      diversificationScore,
      avgBeta,
      avgAlpha,
      informationRatio,
      sortinoRatio
    };
  }, [selectedStrategies]);

  const addStrategy = (strategy: Strategy) => {
    if (selectedStrategies.find(s => s.id === strategy.id)) return;
    
    const remainingAllocation = 100 - portfolioMetrics.totalAllocation;
    const suggestedAllocation = Math.min(
      remainingAllocation,
      Math.round(100 / (selectedStrategies.length + 1))
    );

    setSelectedStrategies([...selectedStrategies, { ...strategy, allocation: suggestedAllocation }]);
  };

  const removeStrategy = (id: string) => {
    setSelectedStrategies(selectedStrategies.filter(s => s.id !== id));
  };

  const updateAllocation = (id: string, allocation: number) => {
    setSelectedStrategies(selectedStrategies.map(s => 
      s.id === id ? { ...s, allocation } : s
    ));
  };

  const autoBalance = () => {
    const equalAllocation = Math.floor(100 / selectedStrategies.length);
    const remainder = 100 - (equalAllocation * selectedStrategies.length);
    
    setSelectedStrategies(selectedStrategies.map((s, index) => ({
      ...s,
      allocation: index === 0 ? equalAllocation + remainder : equalAllocation
    })));
  };

  const riskBasedAllocation = () => {
    const totalInverseRisk = selectedStrategies.reduce((sum, s) => sum + (10 - s.riskScore), 0);
    
    setSelectedStrategies(selectedStrategies.map(s => ({
      ...s,
      allocation: Math.round(((10 - s.riskScore) / totalInverseRisk) * 100)
    })));
  };

  const sharpeBasedAllocation = () => {
    const totalSharpe = selectedStrategies.reduce((sum, s) => sum + Math.max(0, s.sharpeRatio), 0);
    
    if (totalSharpe === 0) {
      autoBalance();
      return;
    }
    
    setSelectedStrategies(selectedStrategies.map(s => ({
      ...s,
      allocation: Math.round((Math.max(0, s.sharpeRatio) / totalSharpe) * 100)
    })));
  };

  // Get unique strategy types for filter
  const strategyTypes = Array.from(new Set(allStrategies.map(s => s.type))).sort();

  // Prepare radar chart data
  const radarData = [
    { metric: 'Return', value: Math.min(100, (portfolioMetrics.expectedReturn + 12) / 0.4), max: 100 },
    { metric: 'Sharpe', value: Math.min(100, ((portfolioMetrics.avgSharpe + 0.6) / 3) * 100), max: 100 },
    { metric: 'Diversification', value: portfolioMetrics.diversificationScore, max: 100 },
    { metric: 'Risk-Adjusted', value: Math.min(100, 100 - (portfolioMetrics.avgRisk * 10)), max: 100 },
    { metric: 'Stability', value: Math.min(100, 100 - (Math.abs(portfolioMetrics.avgDrawdown) * 5)), max: 100 },
  ];

  const COLORS = ['#00E0A4', '#2979FF', '#FF6B9D', '#FFB84D', '#9D4EDD', '#06FFA5', '#4CC9F0', '#F72585'];

  return (
    <div className="space-y-3">
      {/* Terminal Header Bar */}
      <div className="glass-effect-strong border border-[#2F2F33] rounded-lg p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#00E0A4] animate-pulse" />
              <span className="text-xs text-[#00E0A4] font-mono">PORTFOLIO BUILDER</span>
            </div>
            <div className="h-4 w-px bg-[#2F2F33]" />
            <div className="flex items-center gap-4 text-xs font-mono">
              <div className="flex items-center gap-1.5">
                <span className="text-[#666]">SELECTED</span>
                <span className="text-[#2979FF]">{selectedStrategies.length}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[#666]">ALLOCATED</span>
                <span className={portfolioMetrics.totalAllocation === 100 ? "text-[#00E0A4]" : "text-[#FFB84D]"}>
                  {portfolioMetrics.totalAllocation.toFixed(1)}%
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[#666]">UNIVERSE</span>
                <span className="text-[#E8E8E8]">{recommendedStrategies.length}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Badge className="bg-[#151519] border border-[#2F2F33] text-[#A0A0A5] text-xs font-mono">
              PROFILE: {riskProfiles[riskProfile].label.toUpperCase()}
            </Badge>
            <Button
              size="sm"
              className="bg-gradient-to-r from-[#2979FF] to-[#00E0A4] text-white text-xs font-mono h-7 px-4 hover:shadow-elevated transition-all"
              disabled={portfolioMetrics.totalAllocation !== 100 || selectedStrategies.length === 0}
            >
              <Zap className="w-3 h-3 mr-1.5" />
              DEPLOY
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-3">
        {/* Left Panel - Risk & Universe */}
        <div className="col-span-8 space-y-3">
          {/* Risk Profile */}
          <Card className="glass-effect-strong border-gradient p-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs text-[#A0A0A5] uppercase tracking-wider font-mono">Risk Configuration</h3>
              </div>

              {/* Compact Risk Buttons */}
              <div className="grid grid-cols-4 gap-2">
                {(Object.keys(riskProfiles) as RiskProfile[]).map((profile) => {
                  const config = riskProfiles[profile];
                  const isActive = riskProfile === profile;
                  
                  return (
                    <button
                      key={profile}
                      onClick={() => setRiskProfile(profile)}
                      className={`relative p-3 rounded-lg border transition-all duration-300 ${
                        isActive
                          ? "border-[#2979FF] bg-[#2979FF]/10"
                          : "border-[#2F2F33] bg-[#0D0D0F] hover:border-[#2979FF]/50"
                      }`}
                    >
                      <div className="text-center">
                        <div className={`text-xs font-mono mb-1 ${isActive ? "text-[#2979FF]" : "text-[#A0A0A5]"}`}>
                          {config.label.toUpperCase()}
                        </div>
                        <div className="text-[10px] text-[#666] font-mono">
                          RISK {config.maxRisk}/10
                        </div>
                      </div>
                      {isActive && (
                        <div className="absolute top-1 right-1">
                          <CheckCircle2 className="w-3 h-3 text-[#00E0A4]" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Custom Risk Slider */}
              {riskProfile === "custom" && (
                <div className="pt-3 border-t border-[#2F2F33] animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="flex items-center justify-between text-xs font-mono mb-2">
                    <span className="text-[#666]">CUSTOM RISK TOLERANCE</span>
                    <span className="text-[#00E0A4]">{customRiskTolerance}/10</span>
                  </div>
                  <Slider
                    value={[customRiskTolerance]}
                    onValueChange={(value) => setCustomRiskTolerance(value[0])}
                    min={1}
                    max={10}
                    step={1}
                    className="w-full"
                  />
                </div>
              )}

              {/* Risk Metrics Grid */}
              <div className="grid grid-cols-4 gap-2 pt-3 border-t border-[#2F2F33]">
                <div className="text-center">
                  <div className="text-[10px] text-[#666] mb-1 font-mono">MAX RISK</div>
                  <div className="text-sm text-[#FFB84D] font-mono">{riskProfiles[riskProfile].maxRisk}</div>
                </div>
                <div className="text-center">
                  <div className="text-[10px] text-[#666] mb-1 font-mono">MAX LEV</div>
                  <div className="text-sm text-[#2979FF] font-mono">{riskProfiles[riskProfile].maxLeverage}x</div>
                </div>
                <div className="text-center">
                  <div className="text-[10px] text-[#666] mb-1 font-mono">TARGET SR</div>
                  <div className="text-sm text-[#00E0A4] font-mono">{riskProfiles[riskProfile].targetSharpe}</div>
                </div>
                <div className="text-center">
                  <div className="text-[10px] text-[#666] mb-1 font-mono">MAX DD</div>
                  <div className="text-sm text-[#FF6B9D] font-mono">{riskProfiles[riskProfile].maxDrawdown}%</div>
                </div>
              </div>
            </div>
          </Card>

          {/* Strategy Universe */}
          <Card className="glass-effect-strong border-gradient p-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs text-[#A0A0A5] uppercase tracking-wider font-mono">Strategy Universe</h3>
                <Badge variant="outline" className="border-[#2F2F33] text-[#666] text-xs font-mono">
                  {recommendedStrategies.length} AVAILABLE
                </Badge>
              </div>

              {/* Search and Filters */}
              <div className="grid grid-cols-12 gap-2">
                <div className="col-span-5 relative">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#666]" />
                  <Input
                    placeholder="Search strategies..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8 h-8 bg-[#0D0D0F] border-[#2F2F33] text-[#E8E8E8] text-xs font-mono focus:border-[#2979FF] transition-all"
                  />
                </div>
                <div className="col-span-4">
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="w-full h-8 px-2 bg-[#0D0D0F] border border-[#2F2F33] rounded-md text-[#E8E8E8] text-xs font-mono focus:border-[#2979FF] transition-all"
                  >
                    <option value="all">ALL TYPES</option>
                    {strategyTypes.slice(0, 15).map(type => (
                      <option key={type} value={type}>{type.toUpperCase()}</option>
                    ))}
                  </select>
                </div>
                <div className="col-span-3">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="w-full h-8 px-2 bg-[#0D0D0F] border border-[#2F2F33] rounded-md text-[#E8E8E8] text-xs font-mono focus:border-[#2979FF] transition-all"
                  >
                    <option value="sharpe">SHARPE</option>
                    <option value="profitability">RETURN</option>
                    <option value="risk">RISK</option>
                  </select>
                </div>
              </div>

              {/* Strategy Table */}
              <div className="border border-[#2F2F33] rounded-lg overflow-hidden">
                <ScrollArea className="h-[520px]">
                  <Table>
                    <TableHeader className="sticky top-0 bg-[#0D0D0F] z-10">
                      <TableRow className="border-[#2F2F33] hover:bg-transparent">
                        <TableHead className="text-[10px] text-[#666] font-mono h-8">STRATEGY</TableHead>
                        <TableHead className="text-[10px] text-[#666] font-mono h-8 text-right">RETURN</TableHead>
                        <TableHead className="text-[10px] text-[#666] font-mono h-8 text-right">SHARPE</TableHead>
                        <TableHead className="text-[10px] text-[#666] font-mono h-8 text-right">RISK</TableHead>
                        <TableHead className="text-[10px] text-[#666] font-mono h-8 text-right">WIN%</TableHead>
                        <TableHead className="text-[10px] text-[#666] font-mono h-8 text-right">DD</TableHead>
                        <TableHead className="text-[10px] text-[#666] font-mono h-8 text-right">VOL</TableHead>
                        <TableHead className="text-[10px] text-[#666] font-mono h-8"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recommendedStrategies.slice(0, 200).map((strategy) => {
                        const isSelected = selectedStrategies.find(s => s.id === strategy.id);
                        
                        return (
                          <TableRow
                            key={strategy.id}
                            className={`border-[#2F2F33] transition-all ${
                              isSelected
                                ? "bg-[#00E0A4]/5 hover:bg-[#00E0A4]/10"
                                : "hover:bg-[#151519]"
                            }`}
                          >
                            <TableCell className="py-2">
                              <div>
                                <div className="text-xs text-[#E8E8E8] truncate max-w-[200px]">
                                  {strategy.name}
                                </div>
                                <div className="text-[10px] text-[#666] font-mono mt-0.5">
                                  {strategy.type}
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="py-2 text-right">
                              <span className={`text-xs font-mono ${
                                strategy.profitability >= 0 ? "text-[#00E0A4]" : "text-[#FF6B9D]"
                              }`}>
                                {strategy.profitability > 0 ? '+' : ''}{strategy.profitability.toFixed(1)}%
                              </span>
                            </TableCell>
                            <TableCell className="py-2 text-right">
                              <span className="text-xs text-[#E8E8E8] font-mono">
                                {strategy.sharpeRatio.toFixed(2)}
                              </span>
                            </TableCell>
                            <TableCell className="py-2 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                <span className="text-xs text-[#E8E8E8] font-mono">
                                  {strategy.riskScore.toFixed(1)}
                                </span>
                                <div className="w-12 h-1 bg-[#1F1F23] rounded-full overflow-hidden">
                                  <div 
                                    className={`h-full transition-all ${
                                      strategy.riskScore <= 4 ? 'bg-[#00E0A4]' :
                                      strategy.riskScore <= 7 ? 'bg-[#FFB84D]' :
                                      'bg-[#FF6B9D]'
                                    }`}
                                    style={{ width: `${(strategy.riskScore / 10) * 100}%` }}
                                  />
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="py-2 text-right">
                              <span className="text-xs text-[#E8E8E8] font-mono">
                                {strategy.winRate.toFixed(0)}%
                              </span>
                            </TableCell>
                            <TableCell className="py-2 text-right">
                              <span className="text-xs text-[#FF6B9D] font-mono">
                                {strategy.maxDrawdown.toFixed(1)}%
                              </span>
                            </TableCell>
                            <TableCell className="py-2 text-right">
                              <span className="text-xs text-[#A0A0A5] font-mono">
                                {strategy.volatility.toFixed(1)}%
                              </span>
                            </TableCell>
                            <TableCell className="py-2 text-right">
                              <Button
                                size="sm"
                                variant={isSelected ? "outline" : "default"}
                                className={`h-6 px-2 text-[10px] font-mono transition-all ${
                                  isSelected
                                    ? "border-[#FF6B9D] text-[#FF6B9D] hover:bg-[#FF6B9D]/10"
                                    : "bg-[#2979FF] text-white hover:bg-[#00E0A4]"
                                }`}
                                onClick={() => isSelected ? removeStrategy(strategy.id) : addStrategy(strategy)}
                                disabled={!isSelected && portfolioMetrics.totalAllocation >= 100}
                              >
                                {isSelected ? 'RMV' : 'ADD'}
                              </Button>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </ScrollArea>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Panel - Portfolio & Analytics */}
        <div className="col-span-4 space-y-3">
          {/* Portfolio Analytics */}
          <Card className="glass-effect-strong border-gradient p-4">
            <h3 className="text-xs text-[#A0A0A5] uppercase tracking-wider font-mono mb-3">Portfolio Analytics</h3>
            
            {/* Allocation Bar */}
            <div className="mb-4">
              <div className="flex items-center justify-between text-xs font-mono mb-1.5">
                <span className="text-[#666]">ALLOCATION</span>
                <span className={`${
                  portfolioMetrics.totalAllocation === 100 ? 'text-[#00E0A4]' :
                  portfolioMetrics.totalAllocation > 100 ? 'text-[#FF6B9D]' :
                  'text-[#FFB84D]'
                }`}>
                  {portfolioMetrics.totalAllocation.toFixed(1)}%
                </span>
              </div>
              <Progress value={Math.min(portfolioMetrics.totalAllocation, 100)} className="h-1.5" />
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              <div className="p-2 rounded bg-[#0D0D0F]/50 border border-[#2F2F33]">
                <div className="flex items-center gap-1 mb-1">
                  <TrendingUpIcon className="w-3 h-3 text-[#00E0A4]" />
                  <span className="text-[9px] text-[#666] font-mono">EXP RETURN</span>
                </div>
                <div className={`text-base font-mono ${
                  portfolioMetrics.expectedReturn >= 0 ? 'text-[#00E0A4]' : 'text-[#FF6B9D]'
                }`}>
                  {portfolioMetrics.expectedReturn > 0 ? '+' : ''}{portfolioMetrics.expectedReturn.toFixed(2)}%
                </div>
              </div>
              
              <div className="p-2 rounded bg-[#0D0D0F]/50 border border-[#2F2F33]">
                <div className="flex items-center gap-1 mb-1">
                  <Activity className="w-3 h-3 text-[#2979FF]" />
                  <span className="text-[9px] text-[#666] font-mono">SHARPE</span>
                </div>
                <div className="text-base text-[#2979FF] font-mono">
                  {portfolioMetrics.avgSharpe.toFixed(2)}
                </div>
              </div>

              <div className="p-2 rounded bg-[#0D0D0F]/50 border border-[#2F2F33]">
                <div className="flex items-center gap-1 mb-1">
                  <AlertTriangle className="w-3 h-3 text-[#FFB84D]" />
                  <span className="text-[9px] text-[#666] font-mono">RISK SCORE</span>
                </div>
                <div className="text-base text-[#FFB84D] font-mono">
                  {portfolioMetrics.avgRisk.toFixed(2)}
                </div>
              </div>

              <div className="p-2 rounded bg-[#0D0D0F]/50 border border-[#2F2F33]">
                <div className="flex items-center gap-1 mb-1">
                  <ArrowDownRight className="w-3 h-3 text-[#FF6B9D]" />
                  <span className="text-[9px] text-[#666] font-mono">MAX DD</span>
                </div>
                <div className="text-base text-[#FF6B9D] font-mono">
                  {portfolioMetrics.avgDrawdown.toFixed(2)}%
                </div>
              </div>

              <div className="p-2 rounded bg-[#0D0D0F]/50 border border-[#2F2F33]">
                <div className="flex items-center gap-1 mb-1">
                  <BarChart3 className="w-3 h-3 text-[#E8E8E8]" />
                  <span className="text-[9px] text-[#666] font-mono">VOLATILITY</span>
                </div>
                <div className="text-base text-[#E8E8E8] font-mono">
                  {portfolioMetrics.portfolioVolatility.toFixed(2)}%
                </div>
              </div>

              <div className="p-2 rounded bg-[#0D0D0F]/50 border border-[#2F2F33]">
                <div className="flex items-center gap-1 mb-1">
                  <PieChart className="w-3 h-3 text-[#00E0A4]" />
                  <span className="text-[9px] text-[#666] font-mono">DIVERSITY</span>
                </div>
                <div className="text-base text-[#00E0A4] font-mono">
                  {portfolioMetrics.diversificationScore.toFixed(0)}%
                </div>
              </div>

              <div className="p-2 rounded bg-[#0D0D0F]/50 border border-[#2F2F33]">
                <div className="flex items-center gap-1 mb-1">
                  <Target className="w-3 h-3 text-[#9D4EDD]" />
                  <span className="text-[9px] text-[#666] font-mono">BETA</span>
                </div>
                <div className="text-base text-[#9D4EDD] font-mono">
                  {portfolioMetrics.avgBeta.toFixed(2)}
                </div>
              </div>

              <div className="p-2 rounded bg-[#0D0D0F]/50 border border-[#2F2F33]">
                <div className="flex items-center gap-1 mb-1">
                  <Zap className="w-3 h-3 text-[#FFB84D]" />
                  <span className="text-[9px] text-[#666] font-mono">ALPHA</span>
                </div>
                <div className="text-base text-[#FFB84D] font-mono">
                  {portfolioMetrics.avgAlpha.toFixed(2)}%
                </div>
              </div>
            </div>

            {/* Radar Chart */}
            {selectedStrategies.length > 0 && (
              <div className="h-48 mt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarData}>
                    <PolarGrid stroke="#2F2F33" />
                    <PolarAngleAxis 
                      dataKey="metric" 
                      tick={{ fill: '#666', fontSize: 10 }}
                    />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} />
                    <Radar
                      name="Portfolio"
                      dataKey="value"
                      stroke="#2979FF"
                      fill="#2979FF"
                      fillOpacity={0.3}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            )}
          </Card>

          {/* Selected Strategies */}
          <Card className="glass-effect-strong border-gradient p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs text-[#A0A0A5] uppercase tracking-wider font-mono">Position Sizing</h3>
              {selectedStrategies.length > 1 && (
                <div className="flex gap-1">
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="h-6 px-2 text-[9px] font-mono border-[#2F2F33] text-[#666] hover:border-[#2979FF] hover:text-[#E8E8E8]"
                    onClick={autoBalance}
                  >
                    EQL
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="h-6 px-2 text-[9px] font-mono border-[#2F2F33] text-[#666] hover:border-[#2979FF] hover:text-[#E8E8E8]"
                    onClick={riskBasedAllocation}
                  >
                    RISK
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="h-6 px-2 text-[9px] font-mono border-[#2F2F33] text-[#666] hover:border-[#2979FF] hover:text-[#E8E8E8]"
                    onClick={sharpeBasedAllocation}
                  >
                    SR
                  </Button>
                </div>
              )}
            </div>

            <ScrollArea className="h-[400px]">
              {selectedStrategies.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <Target className="w-8 h-8 text-[#666] mb-2" />
                  <p className="text-xs text-[#666] font-mono">NO POSITIONS</p>
                  <p className="text-[10px] text-[#444] mt-1 font-mono">ADD FROM UNIVERSE</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {selectedStrategies.map((strategy, index) => (
                    <div
                      key={strategy.id}
                      className="p-3 rounded-lg bg-[#0D0D0F]/50 border border-[#2F2F33] hover:border-[#2979FF]/50 transition-all"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1 min-w-0">
                          <div className="text-xs text-[#E8E8E8] truncate mb-0.5">
                            {strategy.name}
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-[9px] text-[#666] font-mono">
                              {strategy.type.substring(0, 12)}
                            </span>
                            <span className={`text-[9px] font-mono ${
                              strategy.profitability >= 0 ? 'text-[#00E0A4]' : 'text-[#FF6B9D]'
                            }`}>
                              {strategy.profitability > 0 ? '+' : ''}{strategy.profitability.toFixed(1)}%
                            </span>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-5 w-5 p-0 text-[#FF6B9D] hover:bg-[#FF6B9D]/10"
                          onClick={() => removeStrategy(strategy.id)}
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>

                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs font-mono">
                          <span className="text-[#666]">SIZE</span>
                          <span className="text-[#00E0A4]">{strategy.allocation}%</span>
                        </div>
                        <Slider
                          value={[strategy.allocation]}
                          onValueChange={(value) => updateAllocation(strategy.id, value[0])}
                          min={0}
                          max={100}
                          step={1}
                          className="w-full"
                        />
                      </div>

                      <div className="grid grid-cols-4 gap-1.5 mt-2 pt-2 border-t border-[#2F2F33]">
                        <div className="text-center">
                          <div className="text-[8px] text-[#666] font-mono">SR</div>
                          <div className="text-[10px] text-[#E8E8E8] font-mono">{strategy.sharpeRatio.toFixed(1)}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-[8px] text-[#666] font-mono">RISK</div>
                          <div className="text-[10px] text-[#FFB84D] font-mono">{strategy.riskScore.toFixed(1)}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-[8px] text-[#666] font-mono">WIN</div>
                          <div className="text-[10px] text-[#E8E8E8] font-mono">{strategy.winRate.toFixed(0)}%</div>
                        </div>
                        <div className="text-center">
                          <div className="text-[8px] text-[#666] font-mono">VOL</div>
                          <div className="text-[10px] text-[#E8E8E8] font-mono">{strategy.volatility.toFixed(0)}%</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </Card>
        </div>
      </div>
    </div>
  );
}