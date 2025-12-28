import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Activity,
  Zap,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { Badge } from "../ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../ui/tabs";

/* ======================
   DOMAIN TYPES (FIX)
   ====================== */

export type TradingMode = "paper" | "live";

interface ExecutionTabProps {
  tradingMode: TradingMode;
}

type TradeStatus = "filled" | "pending" | "rejected";
type TradeAction = "BUY" | "SELL";

interface Trade {
  id: number;
  timestamp: string;
  symbol: string;
  action: TradeAction;
  qty: number;
  price: string;
  pnlImpact: string;
  status: TradeStatus;
  strategy: string;
}

/* ======================
   COMPONENT
   ====================== */

export function ExecutionTab({ tradingMode }: ExecutionTabProps) {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [flashId, setFlashId] = useState<number | null>(null);

  const strategies = ["M&A Arb", "Momentum", "Carry Trade", "Vol Arb", "Mean Rev"];

  const openOrders = [
    { id: 1, symbol: "BTC/USD", action: "BUY", qty: 0.5, limit: 41500, market: 42150, pnl: 325 },
    { id: 2, symbol: "ETH/USD", action: "SELL", qty: 5, limit: 2250, market: 2204, pnl: -230 },
    { id: 3, symbol: "AAPL", action: "BUY", qty: 100, limit: 175, market: 178.45, pnl: 345 },
  ];

  const volumeData = Array.from({ length: 24 }, (_, i) => ({
    hour: `${i}:00`,
    volume: Math.random() * 500000 + 100000,
  }));

  /* ======================
     MOCK FEED
     ====================== */

  useEffect(() => {
    const seed = Array.from({ length: 8 }, (_, i) => createTrade());
    setTrades(seed);

    const interval = setInterval(() => {
      const t = createTrade();
      setTrades((prev) => [t, ...prev].slice(0, 25));
      setFlashId(t.id);
      setTimeout(() => setFlashId(null), 400);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  function createTrade(): Trade {
    const statusPool: TradeStatus[] = [
      "filled",
      "filled",
      "filled",
      "pending",
      "rejected",
    ];

    return {
      id: Date.now() + Math.floor(Math.random() * 10000),
      timestamp: new Date().toLocaleTimeString("en-US", { hour12: false }),
      symbol: ["BTC/USD", "ETH/USD", "EUR/USD", "AAPL", "TSLA"][Math.floor(Math.random() * 5)],
      action: Math.random() > 0.5 ? "BUY" : "SELL",
      qty: Math.floor(Math.random() * 900) + 100,
      price: (Math.random() * 500 + 100).toFixed(2),
      pnlImpact: (Math.random() * 10000 - 5000).toFixed(2),
      status: statusPool[Math.floor(Math.random() * statusPool.length)],
      strategy: strategies[Math.floor(Math.random() * strategies.length)],
    };
  }

  const counts = {
    filled: trades.filter(t => t.status === "filled").length,
    pending: trades.filter(t => t.status === "pending").length,
    rejected: trades.filter(t => t.status === "rejected").length,
  };

  const statusStyle = (s: TradeStatus) =>
    s === "filled"
      ? "bg-[#00E0A4]/20 text-[#00E0A4]"
      : s === "pending"
      ? "bg-[#FF9800]/20 text-[#FF9800]"
      : "bg-[#FF5252]/20 text-[#FF5252]";

  /* ======================
     RENDER
     ====================== */

  return (
    <div className="space-y-4">
      {/* MODE */}
      <div className="border rounded-lg p-4 flex justify-between items-center">
        <div className="flex gap-3 items-center">
          <Badge
            className={
              tradingMode === "paper"
                ? "bg-blue-500/20 text-blue-400"
                : "bg-red-500/20 text-red-400"
            }
          >
            {tradingMode.toUpperCase()} MODE
          </Badge>
          <span className="text-xs text-gray-400">
            {tradingMode === "paper"
              ? "Simulated execution"
              : "Live trading"}
          </span>
        </div>
        <div className="flex gap-4 text-xs">
          <span>Filled: <b className="text-green-400">{counts.filled}</b></span>
          <span>Pending: <b className="text-yellow-400">{counts.pending}</b></span>
          <span>Rejected: <b className="text-red-400">{counts.rejected}</b></span>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Executed", value: counts.filled, icon: Activity },
          { label: "Latency", value: tradingMode === "paper" ? "N/A" : "2.3ms", icon: Zap },
          { label: "Success", value: "96.8%", icon: CheckCircle2 },
          { label: "Rejected", value: counts.rejected, icon: XCircle },
        ].map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={i} className="border rounded p-4">
              <div className="flex justify-between mb-1">
                <span className="text-xs text-gray-400">{s.label}</span>
                <Icon className="h-4 w-4 text-[#00E0A4]" />
              </div>
              <div className="text-xl">{s.value}</div>
            </div>
          );
        })}
      </div>

      {/* TABS */}
      <Tabs defaultValue="live">
        <TabsList>
          <TabsTrigger value="live">Live</TabsTrigger>
          <TabsTrigger value="open">Open Orders</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        {/* LIVE */}
        <TabsContent value="live">
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2 border rounded overflow-auto max-h-[500px]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Time</TableHead>
                    <TableHead>Symbol</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead className="text-right">Qty</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">PnL</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {trades.map(t => (
                    <TableRow
                      key={t.id}
                      className={flashId === t.id ? "bg-white/5" : ""}
                    >
                      <TableCell className="font-mono text-xs">{t.timestamp}</TableCell>
                      <TableCell>{t.symbol}</TableCell>
                      <TableCell>
                        <Badge className={t.action === "BUY"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-red-500/20 text-red-400"}>
                          {t.action}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">{t.qty}</TableCell>
                      <TableCell>
                        <Badge className={statusStyle(t.status)}>
                          {t.status}
                        </Badge>
                      </TableCell>
                      <TableCell
                        className={`text-right ${
                          parseFloat(t.pnlImpact) >= 0
                            ? "text-green-400"
                            : "text-red-400"
                        }`}
                      >
                        {parseFloat(t.pnlImpact) >= 0 ? "+" : ""}
                        ${Number(t.pnlImpact).toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* VOLUME */}
            <div className="border rounded p-4">
              <h3 className="text-sm mb-2">Daily Volume</h3>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={volumeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hour" />
                  <YAxis />
                  <Tooltip />
                  <Area dataKey="volume" stroke="#2979FF" fill="#2979FF" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </TabsContent>

        {/* OPEN */}
        <TabsContent value="open">
          <div className="border rounded overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Symbol</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead className="text-right">Qty</TableHead>
                  <TableHead className="text-right">Limit</TableHead>
                  <TableHead className="text-right">Market</TableHead>
                  <TableHead className="text-right">PnL</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {openOrders.map(o => (
                  <TableRow key={o.id}>
                    <TableCell>{o.symbol}</TableCell>
                    <TableCell>{o.action}</TableCell>
                    <TableCell className="text-right">{o.qty}</TableCell>
                    <TableCell className="text-right">${o.limit}</TableCell>
                    <TableCell className="text-right">${o.market}</TableCell>
                    <TableCell
                      className={`text-right ${
                        o.pnl >= 0 ? "text-green-400" : "text-red-400"
                      }`}
                    >
                      {o.pnl >= 0 ? "+" : ""}${o.pnl}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        {/* HISTORY */}
        <TabsContent value="history">
          <div className="border rounded p-6 text-center text-gray-400">
            Historical trades will appear here
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}