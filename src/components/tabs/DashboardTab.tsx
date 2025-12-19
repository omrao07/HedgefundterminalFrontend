import { useState, useMemo } from "react";
import { LineChart, Line, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart, ScatterChart, Scatter } from "recharts";
import { TrendingUp, TrendingDown, Activity, DollarSign, Target, Award, BarChart3, PieChart as PieChartIcon, Zap, ChevronDown, Search, Star, Plus, X, List } from "lucide-react";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import type { TradingMode } from "../../App";

interface DashboardTabProps {
  tradingMode: TradingMode;
  dummyCapital: number;
}

export function DashboardTab({ tradingMode, dummyCapital }: DashboardTabProps) {
  const [analyticsView, setAnalyticsView] = useState<"overview" | "detailed" | "watchlist">("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPair, setSelectedPair] = useState<[string, string] | null>(null);

  // Mock equity curve data
  const equityCurve = Array.from({ length: 60 }, (_, i) => ({
    date: `Day ${i + 1}`,
    equity: dummyCapital + (Math.random() - 0.3) * 5000 + i * 200,
  }));

  // Asset distribution
  const assetDistribution = [
    { name: "Equities", value: 45000, percentage: 45, color: "#00E0A4" },
    { name: "Forex", value: 25000, percentage: 25, color: "#2979FF" },
    { name: "Crypto", value: 15000, percentage: 15, color: "#9C27B0" },
    { name: "Commodities", value: 10000, percentage: 10, color: "#FF9800" },
    { name: "Cash", value: 5000, percentage: 5, color: "#A0A0A5" },
  ];

  // Exchange distribution
  const exchangeDistribution = useMemo(() => [
    { exchange: "NYSE", capital: 35000, percentage: 35 },
    { exchange: "NASDAQ", capital: 25000, percentage: 25 },
    { exchange: "Binance", capital: 15000, percentage: 15 },
    { exchange: "Forex.com", capital: 20000, percentage: 20 },
    { exchange: "CME", capital: 5000, percentage: 5 },
  ], []);

  // Daily performance
  const dailyPerformance = [
    { date: "Mon", pnl: 1200 },
    { date: "Tue", pnl: -800 },
    { date: "Wed", pnl: 2100 },
    { date: "Thu", pnl: 1500 },
    { date: "Fri", pnl: -500 },
    { date: "Sat", pnl: 900 },
    { date: "Sun", pnl: 1800 },
  ];

  const portfolioMetrics = [
    { label: "Total Portfolio Value", value: `$${(dummyCapital + 12456).toLocaleString()}`, change: "+12.46%", icon: DollarSign, positive: true },
    { label: "Daily PnL", value: "+$2,340", change: "+2.34%", icon: TrendingUp, positive: true },
    { label: "Total Return", value: "+18.5%", change: "Since inception", icon: Target, positive: true },
    { label: "Sharpe Ratio", value: "2.45", change: "Risk-adjusted", icon: Award, positive: true },
    { label: "Active Strategies", value: "8", change: "Running", icon: Activity, positive: true },
    { label: "Win Rate", value: "68.5%", change: "145/212 trades", icon: TrendingUp, positive: true },
  ];

  // Spread analysis data
  const spreadData = Array.from({ length: 30 }, (_, i) => ({
    time: `${i}m`,
    btcUsd: 42000 + (Math.random() - 0.5) * 500,
    ethUsd: 2200 + (Math.random() - 0.5) * 50,
    eurUsd: 1.08 + (Math.random() - 0.5) * 0.01,
  }));

  // Correlation heatmap data
  const correlationGrid = [
    { name: "BTC", btc: 1.00, eth: 0.85, eur: -0.15, gold: 0.32, sp500: 0.45 },
    { name: "ETH", btc: 0.85, eth: 1.00, eur: -0.08, gold: 0.28, sp500: 0.52 },
    { name: "EUR/USD", btc: -0.15, eth: -0.08, eur: 1.00, gold: 0.65, sp500: -0.22 },
    { name: "Gold", btc: 0.32, eth: 0.28, eur: 0.65, gold: 1.00, sp500: 0.18 },
    { name: "S&P500", btc: 0.45, eth: 0.52, eur: -0.22, gold: 0.18, sp500: 1.00 },
  ];

  // Risk/Return allocation
  const riskReturnData = [
    { strategy: "M&A Arb", risk: 6.2, return: 15.4, allocation: 25 },
    { strategy: "Momentum", risk: 7.8, return: 22.1, allocation: 20 },
    { strategy: "Carry Trade", risk: 8.5, return: 8.7, allocation: 15 },
    { strategy: "Vol Arb", risk: 5.5, return: 18.9, allocation: 18 },
    { strategy: "VIX Hunter", risk: 9.2, return: -3.2, allocation: 10 },
    { strategy: "Mean Rev", risk: 6.0, return: 12.5, allocation: 12 },
  ];

  // Performance breakdown
  const performanceBreakdown = [
    { category: "M&A Strategies", allocation: 25, profit: 3850, activeCount: 1 },
    { category: "Momentum Strategies", allocation: 20, profit: 4420, activeCount: 1 },
    { category: "Carry Trades", allocation: 15, profit: 1305, activeCount: 1 },
    { category: "Volatility Strategies", allocation: 28, profit: 3082, activeCount: 2 },
    { category: "Mean Reversion", allocation: 12, profit: 1500, activeCount: 1 },
  ];

  const getCorrelationColor = (value: number) => {
    if (value >= 0.7) return "bg-[#00E0A4]/80";
    if (value >= 0.4) return "bg-[#00E0A4]/50";
    if (value >= 0.1) return "bg-[#2979FF]/30";
    if (value >= -0.1) return "bg-[#A0A0A5]/20";
    if (value >= -0.4) return "bg-[#FF9800]/30";
    return "bg-[#FF5252]/50";
  };

  // Watchlist data
  const watchlist = [
    {
      symbol: "BTC/USD",
      name: "Bitcoin",
      price: 42150.23,
      change: 892.45,
      changePercent: 2.16,
      volume: "$28.5B",
      marketCap: "$825B",
      strength: 78,
      sparkline: Array.from({ length: 20 }, () => Math.random() * 100 + 50),
    },
    {
      symbol: "ETH/USD",
      name: "Ethereum",
      price: 2204.56,
      change: -45.23,
      changePercent: -2.01,
      volume: "$12.3B",
      marketCap: "$265B",
      strength: 65,
      sparkline: Array.from({ length: 20 }, () => Math.random() * 100 + 40),
    },
    {
      symbol: "EUR/USD",
      name: "Euro Dollar",
      price: 1.0842,
      change: 0.0023,
      changePercent: 0.21,
      volume: "$145B",
      marketCap: "-",
      strength: 55,
      sparkline: Array.from({ length: 20 }, () => Math.random() * 100 + 45),
    },
    {
      symbol: "AAPL",
      name: "Apple Inc.",
      price: 178.45,
      change: 3.25,
      changePercent: 1.86,
      volume: "$54.2M",
      marketCap: "$2.8T",
      strength: 82,
      sparkline: Array.from({ length: 20 }, () => Math.random() * 100 + 60),
    },
    {
      symbol: "TSLA",
      name: "Tesla Inc.",
      price: 242.18,
      change: -8.43,
      changePercent: -3.36,
      volume: "$112.4M",
      marketCap: "$768B",
      strength: 48,
      sparkline: Array.from({ length: 20 }, () => Math.random() * 100 + 30),
    },
    {
      symbol: "GC",
      name: "Gold Futures",
      price: 2042.30,
      change: 12.80,
      changePercent: 0.63,
      volume: "$42.1B",
      marketCap: "-",
      strength: 72,
      sparkline: Array.from({ length: 20 }, () => Math.random() * 100 + 55),
    },
  ];

  const filteredWatchlist = watchlist.filter(asset =>
    asset.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
    asset.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStrengthColor = (strength: number) => {
    if (strength >= 70) return "text-[#00E0A4]";
    if (strength >= 50) return "text-[#FF9800]";
    return "text-[#FF5252]";
  };

  const getStrengthLabel = (strength: number) => {
    if (strength >= 70) return "Strong";
    if (strength >= 50) return "Moderate";
    return "Weak";
  };

  const calculateSpread = () => {
    if (!selectedPair) return null;
    const [asset1, asset2] = selectedPair;
    const price1 = watchlist.find(a => a.symbol === asset1)?.price || 0;
    const price2 = watchlist.find(a => a.symbol === asset2)?.price || 0;
    const spread = ((price1 - price2) / price2) * 100;
    return spread;
  };

  return (
    <div className="space-y-4">
      {/* Analytics View Toggle */}
      <div className="flex items-center justify-between glass-effect rounded-lg border border-[#1F1F23] p-4 shadow-elevated">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-gradient-to-br from-[#00E0A4]/20 to-[#2979FF]/20">
            <BarChart3 className="w-5 h-5 text-[#00E0A4] drop-shadow-[0_0_8px_rgba(0,224,164,0.4)]" />
          </div>
          <h2 className="text-lg bg-gradient-to-r from-[#E8E8E8] to-[#A0A0A5] bg-clip-text text-transparent">Portfolio Dashboard & Analytics</h2>
        </div>
        <div className="flex gap-2 glass-effect rounded-lg p-1 border border-[#1F1F23]">
          <button
            onClick={() => setAnalyticsView("overview")}
            className={`text-xs px-4 py-2 rounded-md transition-all duration-300 relative overflow-hidden group ${
              analyticsView === "overview"
                ? "bg-[#00E0A4]/20 text-[#00E0A4] border border-[#00E0A4]/30 shadow-[0_0_20px_rgba(0,224,164,0.2)]"
                : "text-[#A0A0A5] hover:bg-[#151519] hover:text-[#E8E8E8] border border-transparent"
            }`}
          >
            {analyticsView === "overview" && (
              <div className="absolute inset-0 bg-gradient-to-r from-[#00E0A4]/10 to-transparent animate-pulse" />
            )}
            <span className="relative z-10">Overview</span>
          </button>
          <button
            onClick={() => setAnalyticsView("detailed")}
            className={`text-xs px-4 py-2 rounded-md transition-all duration-300 relative overflow-hidden group ${
              analyticsView === "detailed"
                ? "bg-[#2979FF]/20 text-[#2979FF] border border-[#2979FF]/30 shadow-[0_0_20px_rgba(41,121,255,0.2)]"
                : "text-[#A0A0A5] hover:bg-[#151519] hover:text-[#E8E8E8] border border-transparent"
            }`}
          >
            {analyticsView === "detailed" && (
              <div className="absolute inset-0 bg-gradient-to-r from-[#2979FF]/10 to-transparent animate-pulse" />
            )}
            <span className="relative z-10">Advanced Analytics</span>
          </button>
          <button
            onClick={() => setAnalyticsView("watchlist")}
            className={`text-xs px-4 py-2 rounded-md transition-all duration-300 relative overflow-hidden group ${
              analyticsView === "watchlist"
                ? "bg-[#FF9800]/20 text-[#FF9800] border border-[#FF9800]/30 shadow-[0_0_20px_rgba(255,152,0,0.2)]"
                : "text-[#A0A0A5] hover:bg-[#151519] hover:text-[#E8E8E8] border border-transparent"
            }`}
          >
            {analyticsView === "watchlist" && (
              <div className="absolute inset-0 bg-gradient-to-r from-[#FF9800]/10 to-transparent animate-pulse" />
            )}
            <span className="relative z-10">Watchlist</span>
          </button>
        </div>
      </div>

      {analyticsView === "overview" ? (
        <>
          {/* Top Metrics Row */}
          <div className="grid grid-cols-6 gap-4">
            {portfolioMetrics.map((metric, idx) => {
              const Icon = metric.icon;
              return (
                <div 
                  key={idx} 
                  className="metric-card glass-effect rounded-lg border border-[#1F1F23] p-4 hover:border-[#2979FF]/40 transition-all duration-300 shadow-elevated hover:shadow-elevated-hover interactive-scale group relative overflow-hidden"
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  {/* Subtle gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#2979FF]/5 via-transparent to-[#00E0A4]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  
                  <div className="flex items-start justify-between mb-2 relative z-10">
                    <span className="text-xs text-[#A0A0A5] group-hover:text-[#E8E8E8] transition-colors duration-300">{metric.label}</span>
                    <Icon className={`h-4 w-4 ${metric.positive ? 'text-[#00E0A4]' : 'text-[#FF5252]'} group-hover:drop-shadow-[0_0_8px_rgba(0,224,164,0.4)] transition-all duration-300`} />
                  </div>
                  <div className="text-xl mb-1 relative z-10 font-medium">{metric.value}</div>
                  <div className={`text-xs ${metric.positive ? 'text-[#00E0A4]' : 'text-[#A0A0A5]'} relative z-10`}>
                    {metric.change}
                  </div>
                  
                  {/* Bottom accent line */}
                  <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${
                    metric.positive 
                      ? 'from-transparent via-[#00E0A4] to-transparent' 
                      : 'from-transparent via-[#FF5252] to-transparent'
                  } opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                </div>
              );
            })}
          </div>

          {/* Equity Curve & Asset Distribution */}
          <div className="grid grid-cols-3 gap-4">
            {/* Equity Curve */}
            <div className="col-span-2 glass-effect rounded-lg border-gradient p-4 shadow-elevated hover:shadow-elevated-hover transition-all duration-300 group relative overflow-hidden">
              {/* Ambient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#2979FF]/5 via-transparent to-[#00E0A4]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              <div className="flex items-center justify-between mb-4 relative z-10">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-[#00E0A4] drop-shadow-[0_0_6px_rgba(0,224,164,0.3)]" />
                  <h3 className="text-sm font-medium">Equity Curve</h3>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-[#A0A0A5]">Mode:</span>
                  <Badge className={`${
                    tradingMode === "paper" 
                      ? "bg-[#2979FF]/20 text-[#2979FF] border-[#2979FF]/30 shadow-[0_0_10px_rgba(41,121,255,0.2)]" 
                      : "bg-[#FF5252]/20 text-[#FF5252] border-[#FF5252]/30 shadow-[0_0_10px_rgba(255,82,82,0.2)]"
                  }`}>
                    {tradingMode.toUpperCase()}
                  </Badge>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={equityCurve}>
                  <defs>
                    <linearGradient id="colorEquity" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00E0A4" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#00E0A4" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1F1F23" />
                  <XAxis dataKey="date" stroke="#A0A0A5" tick={{ fontSize: 10 }} interval={9} />
                  <YAxis stroke="#A0A0A5" tick={{ fontSize: 10 }} tickFormatter={(val) => `$${(val / 1000).toFixed(0)}K`} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#0D0D0F", border: "1px solid #1F1F23", borderRadius: "4px", fontSize: "12px" }}
                    formatter={(value: any) => [`$${value.toLocaleString()}`, 'Equity']}
                  />
                  <Area type="monotone" dataKey="equity" stroke="#00E0A4" strokeWidth={2} fill="url(#colorEquity)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Asset Distribution Pie Chart */}
            <div className="bg-[#151519] rounded-lg border border-[#1F1F23] p-4">
              <h3 className="text-sm mb-4">Asset Distribution</h3>
              <div className="flex flex-col items-center">
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={assetDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {assetDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{ backgroundColor: "#0D0D0F", border: "1px solid #1F1F23", borderRadius: "4px", fontSize: "12px" }}
                      formatter={(value: any) => [`$${value.toLocaleString()}`, '']}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="space-y-2 w-full mt-2">
                  {assetDistribution.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: item.color }} />
                        <span className="text-[#E8E8E8]">{item.name}</span>
                      </div>
                      <span className="text-[#A0A0A5]">{item.percentage}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Exchange Distribution & Daily Performance */}
          <div className="grid grid-cols-2 gap-4">
            {/* Exchange Distribution */}
            <div className="bg-[#151519] rounded-lg border border-[#1F1F23] p-4">
              <h3 className="text-sm mb-4">Exchange Distribution</h3>
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={exchangeDistribution} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" stroke="#1F1F23" />
                  <XAxis type="number" stroke="#A0A0A5" tick={{ fontSize: 10 }} tickFormatter={(val) => `$${(val / 1000).toFixed(0)}K`} />
                  <YAxis dataKey="exchange" type="category" stroke="#A0A0A5" tick={{ fontSize: 11 }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#0D0D0F", border: "1px solid #1F1F23", borderRadius: "4px", fontSize: "12px" }}
                    formatter={(value: any) => [`$${value.toLocaleString()}`, 'Capital']}
                  />
                  <Bar dataKey="capital" fill="#2979FF" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Daily Performance */}
            <div className="bg-[#151519] rounded-lg border border-[#1F1F23] p-4">
              <h3 className="text-sm mb-4">Daily Performance (Last 7 Days)</h3>
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={dailyPerformance}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1F1F23" />
                  <XAxis dataKey="date" stroke="#A0A0A5" tick={{ fontSize: 11 }} />
                  <YAxis stroke="#A0A0A5" tick={{ fontSize: 10 }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#0D0D0F", border: "1px solid #1F1F23", borderRadius: "4px", fontSize: "12px" }}
                    formatter={(value: any) => [`$${value.toLocaleString()}`, 'PnL']}
                  />
                  <Bar dataKey="pnl" radius={[4, 4, 0, 0]}>
                    {dailyPerformance.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.pnl >= 0 ? '#00E0A4' : '#FF5252'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Performance Breakdown */}
          <div className="bg-[#151519] rounded-lg border border-[#1F1F23] p-4">
            <h3 className="text-sm mb-4">Performance Breakdown by Category</h3>
            <div className="space-y-3">
              {performanceBreakdown.map((item, idx) => (
                <div key={idx} className="p-3 bg-[#0D0D0F] rounded-lg border border-[#1F1F23] hover:border-[#2979FF]/40 transition-all">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className="text-sm">{item.category}</span>
                      <Badge className="bg-[#2979FF]/20 text-[#2979FF] border-[#2979FF]/30">
                        {item.activeCount} active
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-xs text-[#A0A0A5]">Allocation</div>
                        <div className="text-sm">{item.allocation}%</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-[#A0A0A5]">Profit</div>
                        <div className={`text-sm ${item.profit >= 0 ? 'text-[#00E0A4]' : 'text-[#FF5252]'}`}>
                          ${item.profit.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-full bg-[#1F1F23] rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-[#00E0A4] h-full rounded-full transition-all"
                      style={{ width: `${item.allocation}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : analyticsView === "detailed" ? (
        <>
          {/* Advanced Analytics View */}
          
          {/* Top Metrics Row - Compact */}
          <div className="grid grid-cols-6 gap-3">
            {portfolioMetrics.map((metric, idx) => {
              const Icon = metric.icon;
              return (
                <div key={idx} className="bg-[#151519] rounded-lg border border-[#1F1F23] p-3 hover:border-[#2979FF]/40 transition-all">
                  <div className="flex items-start justify-between mb-1">
                    <span className="text-[10px] text-[#A0A0A5]">{metric.label}</span>
                    <Icon className={`h-3 w-3 ${metric.positive ? 'text-[#00E0A4]' : 'text-[#FF5252]'}`} />
                  </div>
                  <div className="text-lg mb-0.5">{metric.value}</div>
                  <div className={`text-[10px] ${metric.positive ? 'text-[#00E0A4]' : 'text-[#A0A0A5]'}`}>
                    {metric.change}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Spread Analysis */}
          <div className="bg-[#151519] rounded-lg border border-[#1F1F23] p-4">
            <h3 className="text-sm mb-4">Multi-Asset Spread Analysis</h3>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart>
                <CartesianGrid strokeDasharray="3 3" stroke="#1F1F23" />
                <XAxis dataKey="time" stroke="#A0A0A5" tick={{ fontSize: 10 }} />
                <YAxis yAxisId="crypto" stroke="#A0A0A5" tick={{ fontSize: 10 }} />
                <YAxis yAxisId="forex" orientation="right" stroke="#A0A0A5" tick={{ fontSize: 10 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#0D0D0F", border: "1px solid #1F1F23", borderRadius: "4px", fontSize: "12px" }}
                />
                <Line yAxisId="crypto" type="monotone" data={spreadData} dataKey="btcUsd" stroke="#00E0A4" strokeWidth={2} dot={false} name="BTC/USD" />
                <Line yAxisId="crypto" type="monotone" data={spreadData} dataKey="ethUsd" stroke="#2979FF" strokeWidth={2} dot={false} name="ETH/USD" />
                <Line yAxisId="forex" type="monotone" data={spreadData} dataKey="eurUsd" stroke="#FF9800" strokeWidth={2} dot={false} name="EUR/USD" />
              </LineChart>
            </ResponsiveContainer>
            <div className="flex items-center justify-center gap-6 mt-3 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-0.5 bg-[#00E0A4]" />
                <span className="text-[#A0A0A5]">BTC/USD</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-0.5 bg-[#2979FF]" />
                <span className="text-[#A0A0A5]">ETH/USD</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-0.5 bg-[#FF9800]" />
                <span className="text-[#A0A0A5]">EUR/USD</span>
              </div>
            </div>
          </div>

          {/* Correlation Heatmap & Risk/Return Scatter */}
          <div className="grid grid-cols-2 gap-4">
            {/* Correlation Heatmap */}
            <div className="bg-[#151519] rounded-lg border border-[#1F1F23] p-4">
              <h3 className="text-sm mb-4">Asset Correlation Heatmap</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr>
                      <th className="text-left p-2 text-[#A0A0A5]"></th>
                      <th className="text-center p-2 text-[#A0A0A5]">BTC</th>
                      <th className="text-center p-2 text-[#A0A0A5]">ETH</th>
                      <th className="text-center p-2 text-[#A0A0A5]">EUR</th>
                      <th className="text-center p-2 text-[#A0A0A5]">Gold</th>
                      <th className="text-center p-2 text-[#A0A0A5]">S&P</th>
                    </tr>
                  </thead>
                  <tbody>
                    {correlationGrid.map((row, idx) => (
                      <tr key={idx}>
                        <td className="p-2 text-[#A0A0A5]">{row.name}</td>
                        <td className={`p-2 text-center ${getCorrelationColor(row.btc)}`}>
                          {row.btc.toFixed(2)}
                        </td>
                        <td className={`p-2 text-center ${getCorrelationColor(row.eth)}`}>
                          {row.eth.toFixed(2)}
                        </td>
                        <td className={`p-2 text-center ${getCorrelationColor(row.eur)}`}>
                          {row.eur.toFixed(2)}
                        </td>
                        <td className={`p-2 text-center ${getCorrelationColor(row.gold)}`}>
                          {row.gold.toFixed(2)}
                        </td>
                        <td className={`p-2 text-center ${getCorrelationColor(row.sp500)}`}>
                          {row.sp500.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex items-center justify-between mt-4 text-[10px]">
                <span className="text-[#A0A0A5]">Strong Negative</span>
                <div className="flex gap-1">
                  <div className="w-4 h-3 bg-[#FF5252]/50" />
                  <div className="w-4 h-3 bg-[#FF9800]/30" />
                  <div className="w-4 h-3 bg-[#A0A0A5]/20" />
                  <div className="w-4 h-3 bg-[#2979FF]/30" />
                  <div className="w-4 h-3 bg-[#00E0A4]/50" />
                  <div className="w-4 h-3 bg-[#00E0A4]/80" />
                </div>
                <span className="text-[#A0A0A5]">Strong Positive</span>
              </div>
            </div>

            {/* Risk/Return Scatter */}
            <div className="bg-[#151519] rounded-lg border border-[#1F1F23] p-4">
              <h3 className="text-sm mb-4">Risk/Return Analysis</h3>
              <ResponsiveContainer width="100%" height={280}>
                <ScatterChart>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1F1F23" />
                  <XAxis 
                    type="number" 
                    dataKey="risk" 
                    name="Risk Score" 
                    stroke="#A0A0A5" 
                    tick={{ fontSize: 10 }}
                    label={{ value: 'Risk Score', position: 'insideBottom', offset: -5, style: { fontSize: 10, fill: '#A0A0A5' } }}
                  />
                  <YAxis 
                    type="number" 
                    dataKey="return" 
                    name="Return %" 
                    stroke="#A0A0A5" 
                    tick={{ fontSize: 10 }}
                    label={{ value: 'Return %', angle: -90, position: 'insideLeft', style: { fontSize: 10, fill: '#A0A0A5' } }}
                  />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#0D0D0F", border: "1px solid #1F1F23", borderRadius: "4px", fontSize: "12px" }}
                    formatter={(value: any, name: string) => [
                      name === 'risk' ? `${value}/10` : `${value}%`,
                      name === 'risk' ? 'Risk' : 'Return'
                    ]}
                  />
                  <Scatter data={riskReturnData} fill="#00E0A4">
                    {riskReturnData.map((entry, index) => (
                      <circle 
                        key={index} 
                        r={entry.allocation / 2} 
                        fill={entry.return >= 0 ? '#00E0A4' : '#FF5252'} 
                        opacity={0.7}
                      />
                    ))}
                  </Scatter>
                </ScatterChart>
              </ResponsiveContainer>
              <div className="text-[10px] text-[#A0A0A5] text-center mt-2">
                Bubble size = Allocation percentage
              </div>
            </div>
          </div>

          {/* Strategy Leverage & Risk Distribution */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#151519] rounded-lg border border-[#1F1F23] p-4">
              <h3 className="text-sm mb-4">Leverage Distribution</h3>
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={riskReturnData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1F1F23" />
                  <XAxis dataKey="strategy" stroke="#A0A0A5" tick={{ fontSize: 10 }} angle={-45} textAnchor="end" height={80} />
                  <YAxis stroke="#A0A0A5" tick={{ fontSize: 10 }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#0D0D0F", border: "1px solid #1F1F23", borderRadius: "4px", fontSize: "12px" }}
                  />
                  <Bar dataKey="risk" fill="#2979FF" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-[#151519] rounded-lg border border-[#1F1F23] p-4">
              <h3 className="text-sm mb-4">Return Distribution</h3>
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={riskReturnData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1F1F23" />
                  <XAxis dataKey="strategy" stroke="#A0A0A5" tick={{ fontSize: 10 }} angle={-45} textAnchor="end" height={80} />
                  <YAxis stroke="#A0A0A5" tick={{ fontSize: 10 }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#0D0D0F", border: "1px solid #1F1F23", borderRadius: "4px", fontSize: "12px" }}
                  />
                  <Bar dataKey="return" radius={[4, 4, 0, 0]}>
                    {riskReturnData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.return >= 0 ? '#00E0A4' : '#FF5252'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Performance Breakdown */}
          <div className="bg-[#151519] rounded-lg border border-[#1F1F23] p-4">
            <h3 className="text-sm mb-4">Performance Breakdown by Category</h3>
            <div className="space-y-3">
              {performanceBreakdown.map((item, idx) => (
                <div key={idx} className="p-3 bg-[#0D0D0F] rounded-lg border border-[#1F1F23] hover:border-[#2979FF]/40 transition-all">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className="text-sm">{item.category}</span>
                      <Badge className="bg-[#2979FF]/20 text-[#2979FF] border-[#2979FF]/30">
                        {item.activeCount} active
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-xs text-[#A0A0A5]">Allocation</div>
                        <div className="text-sm">{item.allocation}%</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-[#A0A0A5]">Profit</div>
                        <div className={`text-sm ${item.profit >= 0 ? 'text-[#00E0A4]' : 'text-[#FF5252]'}`}>
                          ${item.profit.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-full bg-[#1F1F23] rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-[#00E0A4] h-full rounded-full transition-all"
                      style={{ width: `${item.allocation}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : analyticsView === "watchlist" ? (
        <>
          {/* Watchlist View */}
          <div className="space-y-4">
            {/* Search & Controls */}
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#A0A0A5]" />
                <Input
                  placeholder="Search assets..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-[#151519] border-[#1F1F23]"
                />
              </div>
              <Button className="bg-[#00E0A4] text-[#0D0D0F] hover:bg-[#00E0A4]/90">
                <Plus className="h-4 w-4 mr-2" />
                Add Asset
              </Button>
            </div>

            {/* Spread Comparison Tool */}
            {selectedPair && (
              <div className="bg-[#151519] rounded-lg border border-[#00E0A4] p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm">Spread Analysis: {selectedPair[0]} vs {selectedPair[1]}</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedPair(null)}
                    className="h-6 w-6 p-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-3 bg-[#0D0D0F] rounded">
                    <div className="text-xs text-[#A0A0A5] mb-1">{selectedPair[0]}</div>
                    <div className="text-lg">
                      ${watchlist.find(a => a.symbol === selectedPair[0])?.price.toLocaleString()}
                    </div>
                  </div>
                  <div className="p-3 bg-[#0D0D0F] rounded text-center">
                    <div className="text-xs text-[#A0A0A5] mb-1">Spread</div>
                    <div className={`text-lg ${(calculateSpread() || 0) >= 0 ? 'text-[#00E0A4]' : 'text-[#FF5252]'}`}>
                      {(calculateSpread() || 0) >= 0 ? '+' : ''}{calculateSpread()?.toFixed(2)}%
                    </div>
                  </div>
                  <div className="p-3 bg-[#0D0D0F] rounded text-right">
                    <div className="text-xs text-[#A0A0A5] mb-1">{selectedPair[1]}</div>
                    <div className="text-lg">
                      ${watchlist.find(a => a.symbol === selectedPair[1])?.price.toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Watchlist Table */}
            <div className="bg-[#151519] rounded-lg border border-[#1F1F23] overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="border-[#1F1F23] hover:bg-transparent">
                    <TableHead className="text-[#A0A0A5] text-xs w-[40px]"></TableHead>
                    <TableHead className="text-[#A0A0A5] text-xs">Symbol</TableHead>
                    <TableHead className="text-[#A0A0A5] text-xs">Name</TableHead>
                    <TableHead className="text-[#A0A0A5] text-xs text-right">Price</TableHead>
                    <TableHead className="text-[#A0A0A5] text-xs text-right">Change</TableHead>
                    <TableHead className="text-[#A0A0A5] text-xs text-right">Volume</TableHead>
                    <TableHead className="text-[#A0A0A5] text-xs text-right">Market Cap</TableHead>
                    <TableHead className="text-[#A0A0A5] text-xs">Strength</TableHead>
                    <TableHead className="text-[#A0A0A5] text-xs">Trend</TableHead>
                    <TableHead className="text-[#A0A0A5] text-xs text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredWatchlist.map((asset, idx) => {
                    const isPositive = asset.change >= 0;
                    
                    return (
                      <TableRow key={idx} className="border-[#1F1F23] hover:bg-[#1A1A1E]">
                        <TableCell>
                          <button className="text-[#A0A0A5] hover:text-[#FF9800] transition-colors">
                            <Star className="h-4 w-4" />
                          </button>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm">{asset.symbol}</span>
                        </TableCell>
                        <TableCell className="text-xs text-[#A0A0A5]">{asset.name}</TableCell>
                        <TableCell className="text-right text-sm">
                          ${asset.price.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className={`flex items-center justify-end gap-1 ${isPositive ? 'text-[#00E0A4]' : 'text-[#FF5252]'}`}>
                            {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                            <div className="text-xs">
                              <div>{isPositive ? '+' : ''}{asset.change.toFixed(2)}</div>
                              <div>({isPositive ? '+' : ''}{asset.changePercent.toFixed(2)}%)</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-right text-xs">{asset.volume}</TableCell>
                        <TableCell className="text-right text-xs">{asset.marketCap}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="w-12">
                              <div className="w-full bg-[#1F1F23] rounded-full h-1.5 overflow-hidden">
                                <div
                                  className={`h-full rounded-full ${
                                    asset.strength >= 70 ? 'bg-[#00E0A4]' :
                                    asset.strength >= 50 ? 'bg-[#FF9800]' :
                                    'bg-[#FF5252]'
                                  }`}
                                  style={{ width: `${asset.strength}%` }}
                                />
                              </div>
                            </div>
                            <span className={`text-xs ${getStrengthColor(asset.strength)}`}>
                              {getStrengthLabel(asset.strength)}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <ResponsiveContainer width={80} height={30}>
                            <LineChart data={asset.sparkline.map(val => ({ value: val }))}>
                              <Line 
                                type="monotone" 
                                dataKey="value" 
                                stroke={isPositive ? '#00E0A4' : '#FF5252'} 
                                strokeWidth={1.5} 
                                dot={false} 
                              />
                            </LineChart>
                          </ResponsiveContainer>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              if (!selectedPair) {
                                setSelectedPair([asset.symbol, watchlist[0].symbol]);
                              } else if (selectedPair[0] === asset.symbol) {
                                setSelectedPair(null);
                              } else {
                                setSelectedPair([selectedPair[0], asset.symbol]);
                              }
                            }}
                            className="h-6 text-xs bg-[#0D0D0F] border-[#1F1F23] hover:bg-[#1F1F23]"
                          >
                            Compare
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-[#151519] rounded-lg border border-[#1F1F23] p-4">
                <div className="text-xs text-[#A0A0A5] mb-1">Gainers</div>
                <div className="text-2xl text-[#00E0A4]">
                  {filteredWatchlist.filter(a => a.change > 0).length}
                </div>
              </div>
              <div className="bg-[#151519] rounded-lg border border-[#1F1F23] p-4">
                <div className="text-xs text-[#A0A0A5] mb-1">Losers</div>
                <div className="text-2xl text-[#FF5252]">
                  {filteredWatchlist.filter(a => a.change < 0).length}
                </div>
              </div>
              <div className="bg-[#151519] rounded-lg border border-[#1F1F23] p-4">
                <div className="text-xs text-[#A0A0A5] mb-1">Avg Change</div>
                <div className={`text-2xl ${
                  (filteredWatchlist.reduce((sum, a) => sum + a.changePercent, 0) / filteredWatchlist.length) >= 0 
                    ? 'text-[#00E0A4]' 
                    : 'text-[#FF5252]'
                }`}>
                  {((filteredWatchlist.reduce((sum, a) => sum + a.changePercent, 0) / filteredWatchlist.length) >= 0 ? '+' : '')}
                  {(filteredWatchlist.reduce((sum, a) => sum + a.changePercent, 0) / filteredWatchlist.length).toFixed(2)}%
                </div>
              </div>
              <div className="bg-[#151519] rounded-lg border border-[#1F1F23] p-4">
                <div className="text-xs text-[#A0A0A5] mb-1">Total Assets</div>
                <div className="text-2xl">{filteredWatchlist.length}</div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
