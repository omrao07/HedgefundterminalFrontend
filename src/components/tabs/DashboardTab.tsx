import { useState, useMemo } from "react";
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
  ScatterChart,
  Scatter,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  Activity,
  DollarSign,
  Target,
  Award,
  BarChart3,
  Search,
  Star,
  Plus,
  X,
} from "lucide-react";

import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

/* =======================
   DOMAIN TYPES (FIX)
   ======================= */

export type TradingMode = "paper" | "live";

/* =======================
   PROPS
   ======================= */

interface DashboardTabProps {
  tradingMode: TradingMode;
  dummyCapital: number;
}

/* =======================
   COMPONENT
   ======================= */

export function DashboardTab({
  tradingMode,
  dummyCapital,
}: DashboardTabProps) {
  const [analyticsView, setAnalyticsView] = useState<
    "overview" | "detailed" | "watchlist"
  >("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPair, setSelectedPair] = useState<[string, string] | null>(null);

  /* =======================
     DATA
     ======================= */

  const equityCurve = useMemo(
    () =>
      Array.from({ length: 60 }, (_, i) => ({
        date: `Day ${i + 1}`,
        equity: dummyCapital + (Math.random() - 0.3) * 5000 + i * 200,
      })),
    [dummyCapital]
  );

  const assetDistribution = [
    { name: "Equities", value: 45000, color: "#00E0A4" },
    { name: "Forex", value: 25000, color: "#2979FF" },
    { name: "Crypto", value: 15000, color: "#9C27B0" },
    { name: "Commodities", value: 10000, color: "#FF9800" },
    { name: "Cash", value: 5000, color: "#A0A0A5" },
  ];

  const exchangeDistribution = useMemo(
    () => [
      { exchange: "NYSE", capital: 35000 },
      { exchange: "NASDAQ", capital: 25000 },
      { exchange: "Binance", capital: 15000 },
      { exchange: "Forex.com", capital: 20000 },
      { exchange: "CME", capital: 5000 },
    ],
    []
  );

  const portfolioMetrics = [
    {
      label: "Portfolio Value",
      value: `$${(dummyCapital + 12456).toLocaleString()}`,
      icon: DollarSign,
    },
    { label: "Daily PnL", value: "+$2,340", icon: TrendingUp },
    { label: "Total Return", value: "+18.5%", icon: Target },
    { label: "Sharpe", value: "2.45", icon: Award },
    { label: "Strategies", value: "8", icon: Activity },
    { label: "Win Rate", value: "68.5%", icon: TrendingUp },
  ];

  const watchlist = [
    { symbol: "BTC/USD", name: "Bitcoin", price: 42150, change: 2.1 },
    { symbol: "ETH/USD", name: "Ethereum", price: 2204, change: -1.8 },
    { symbol: "EUR/USD", name: "Euro", price: 1.084, change: 0.3 },
    { symbol: "AAPL", name: "Apple", price: 178, change: 1.2 },
    { symbol: "TSLA", name: "Tesla", price: 242, change: -3.3 },
  ];

  const filteredWatchlist = watchlist.filter(
    (a) =>
      a.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  /* =======================
     RENDER
     ======================= */

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between rounded-lg border p-4">
        <div className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-[#00E0A4]" />
          <h2 className="text-lg">Portfolio Dashboard</h2>
        </div>

        <div className="flex gap-2">
          {(["overview", "detailed", "watchlist"] as const).map((v) => (
            <button
              key={v}
              onClick={() => setAnalyticsView(v)}
              className={`px-3 py-1 text-xs rounded ${
                analyticsView === v
                  ? "bg-[#00E0A4]/20 text-[#00E0A4]"
                  : "text-gray-400"
              }`}
            >
              {v.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* OVERVIEW */}
      {analyticsView === "overview" && (
        <>
          <div className="grid grid-cols-6 gap-4">
            {portfolioMetrics.map((m, i) => {
              const Icon = m.icon;
              return (
                <div key={i} className="border rounded p-4">
                  <div className="flex justify-between mb-1">
                    <span className="text-xs text-gray-400">{m.label}</span>
                    <Icon className="h-4 w-4 text-[#00E0A4]" />
                  </div>
                  <div className="text-lg">{m.value}</div>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2 border rounded p-4">
              <h3 className="text-sm mb-2">Equity Curve</h3>
              <ResponsiveContainer width="100%" height={260}>
                <AreaChart data={equityCurve}>
                  <XAxis dataKey="date" hide />
                  <YAxis />
                  <Tooltip />
                  <Area dataKey="equity" stroke="#00E0A4" fill="#00E0A4" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="border rounded p-4">
              <h3 className="text-sm mb-2">Assets</h3>
              <ResponsiveContainer width="100%" height={260}>
                <PieChart>
                  <Pie
                    data={assetDistribution}
                    dataKey="value"
                    innerRadius={50}
                    outerRadius={80}
                  >
                    {assetDistribution.map((e, i) => (
                      <Cell key={i} fill={e.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}

      {/* WATCHLIST */}
      {analyticsView === "watchlist" && (
        <>
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                className="pl-10"
                placeholder="Search assets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-1" />
              Add
            </Button>
          </div>

          <div className="border rounded overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead />
                  <TableHead>Symbol</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  <TableHead className="text-right">Change</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredWatchlist.map((a, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <Star className="h-4 w-4 text-gray-400" />
                    </TableCell>
                    <TableCell>{a.symbol}</TableCell>
                    <TableCell className="text-gray-400 text-xs">
                      {a.name}
                    </TableCell>
                    <TableCell className="text-right">
                      ${a.price}
                    </TableCell>
                    <TableCell
                      className={`text-right ${
                        a.change >= 0 ? "text-green-400" : "text-red-400"
                      }`}
                    >
                      {a.change >= 0 ? "+" : ""}
                      {a.change}%
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </>
      )}
    </div>
  );
}