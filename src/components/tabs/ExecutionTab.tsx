import { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { TrendingUp, TrendingDown, Activity, Clock, Zap, CheckCircle2, XCircle } from "lucide-react";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import type { TradingMode } from "../../App";

interface ExecutionTabProps {
  tradingMode: TradingMode;
}

interface Trade {
  id: number;
  timestamp: string;
  symbol: string;
  action: "BUY" | "SELL";
  qty: number;
  price: string;
  pnlImpact: string;
  status: "filled" | "pending" | "rejected";
  strategy: string;
}

export function ExecutionTab({ tradingMode }: ExecutionTabProps) {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [flashingTrade, setFlashingTrade] = useState<number | null>(null);
  const [tradeIdCounter, setTradeIdCounter] = useState(0);

  // Open orders
  const [openOrders] = useState([
    { id: 1, symbol: "BTC/USD", action: "BUY", qty: 0.5, limitPrice: 41500, currentPrice: 42150, pnl: 325 },
    { id: 2, symbol: "ETH/USD", action: "SELL", qty: 5, limitPrice: 2250, currentPrice: 2204, pnl: -230 },
    { id: 3, symbol: "AAPL", action: "BUY", qty: 100, limitPrice: 175.00, currentPrice: 178.45, pnl: 345 },
  ]);

  const strategies = ["M&A Arb", "Momentum", "Carry Trade", "Vol Arb", "Mean Rev"];

  // Mock real-time trade feed
  const generateTrade = (): Trade => {
    const newId = Date.now() + (tradeIdCounter * 100000) + Math.floor(Math.random() * 10000);
    setTradeIdCounter(prev => prev + 1);
    
    const statuses: Array<"filled" | "pending" | "rejected"> = ["filled", "filled", "filled", "filled", "pending", "rejected"];
    
    return {
      id: newId,
      timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
      symbol: ['BTC/USD', 'ETH/USD', 'EUR/USD', 'AAPL', 'TSLA', 'GC'][Math.floor(Math.random() * 6)],
      action: Math.random() > 0.5 ? 'BUY' : 'SELL',
      qty: Math.floor(Math.random() * 1000) + 100,
      price: (Math.random() * 500 + 100).toFixed(2),
      pnlImpact: (Math.random() * 10000 - 5000).toFixed(2),
      status: statuses[Math.floor(Math.random() * statuses.length)],
      strategy: strategies[Math.floor(Math.random() * strategies.length)],
    };
  };

  useEffect(() => {
    // Initial trades
    const baseTime = Date.now();
    const initialTrades = Array.from({ length: 8 }, (_, i) => {
      const statuses: Array<"filled" | "pending" | "rejected"> = ["filled", "filled", "filled", "filled", "pending", "rejected"];
      return {
        id: baseTime + (i * 10000) + Math.floor(Math.random() * 1000),
        timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
        symbol: ['BTC/USD', 'ETH/USD', 'EUR/USD', 'AAPL', 'TSLA', 'GC'][Math.floor(Math.random() * 6)],
        action: (Math.random() > 0.5 ? 'BUY' : 'SELL') as "BUY" | "SELL",
        qty: Math.floor(Math.random() * 1000) + 100,
        price: (Math.random() * 500 + 100).toFixed(2),
        pnlImpact: (Math.random() * 10000 - 5000).toFixed(2),
        status: statuses[Math.floor(Math.random() * statuses.length)],
        strategy: strategies[Math.floor(Math.random() * strategies.length)],
      };
    });
    setTrades(initialTrades);

    // Add new trades periodically
    const interval = setInterval(() => {
      const newTrade = generateTrade();
      setTrades(prev => [newTrade, ...prev].slice(0, 20));
      setFlashingTrade(newTrade.id);
      setTimeout(() => setFlashingTrade(null), 500);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const volumeData = Array.from({ length: 24 }, (_, i) => ({
    hour: `${i}:00`,
    volume: Math.random() * 500000 + 100000,
  }));

  const executionStats = [
    { label: "Orders Executed", value: "1,247", icon: Activity, subtext: "Today" },
    { label: "Avg Latency", value: tradingMode === "paper" ? "N/A" : "2.3ms", icon: Zap, subtext: "Real-time" },
    { label: "Success Rate", value: "96.8%", icon: CheckCircle2, subtext: "Fill rate" },
    { label: "Rejected", value: "42", icon: XCircle, subtext: "Failed orders" },
  ];

  const filledTrades = trades.filter(t => t.status === "filled").length;
  const pendingTrades = trades.filter(t => t.status === "pending").length;
  const rejectedTrades = trades.filter(t => t.status === "rejected").length;

  const getStatusBadge = (status: "filled" | "pending" | "rejected") => {
    switch (status) {
      case "filled":
        return "bg-[#00E0A4]/20 text-[#00E0A4]";
      case "pending":
        return "bg-[#FF9800]/20 text-[#FF9800]";
      case "rejected":
        return "bg-[#FF5252]/20 text-[#FF5252]";
    }
  };

  return (
    <div className="space-y-4">
      {/* Mode Indicator */}
      <div className="bg-[#151519] rounded-lg border border-[#1F1F23] p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`px-3 py-1.5 rounded ${
              tradingMode === "paper" 
                ? "bg-[#2979FF]/20 text-[#2979FF] border border-[#2979FF]/30" 
                : "bg-[#FF5252]/20 text-[#FF5252] border border-[#FF5252]/30"
            }`}>
              <span className="text-sm">{tradingMode.toUpperCase()} MODE</span>
            </div>
            <span className="text-sm text-[#A0A0A5]">
              {tradingMode === "paper" ? "Simulated execution - No real money at risk" : "Live trading with real capital"}
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <div>
              <span className="text-[#A0A0A5]">Filled:</span> <span className="text-[#00E0A4]">{filledTrades}</span>
            </div>
            <div>
              <span className="text-[#A0A0A5]">Pending:</span> <span className="text-[#FF9800]">{pendingTrades}</span>
            </div>
            <div>
              <span className="text-[#A0A0A5]">Rejected:</span> <span className="text-[#FF5252]">{rejectedTrades}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {executionStats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-[#151519] rounded-lg border border-[#1F1F23] p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-[#A0A0A5]">{stat.label}</span>
                <Icon className="h-4 w-4 text-[#00E0A4]" />
              </div>
              <div className="text-2xl mb-1">{stat.value}</div>
              <div className="text-xs text-[#A0A0A5]">{stat.subtext}</div>
            </div>
          );
        })}
      </div>

      <Tabs defaultValue="live" className="space-y-4">
        <TabsList className="bg-[#1F1F23] border-b-2 border-[#2979FF]/20">
          <TabsTrigger value="live">Live Feed</TabsTrigger>
          <TabsTrigger value="open">Open Orders ({openOrders.length})</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="live" className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            {/* Trade Feed Table */}
            <div className="col-span-2 bg-[#151519] rounded-lg border border-[#1F1F23] overflow-hidden">
              <div className="p-4 border-b border-[#1F1F23] flex items-center justify-between">
                <h3 className="text-sm">Live Trade Feed</h3>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#00E0A4] rounded-full animate-pulse" />
                  <span className="text-xs text-[#A0A0A5]">Live</span>
                </div>
              </div>
              <div className="overflow-auto max-h-[500px]">
                <Table>
                  <TableHeader className="sticky top-0 bg-[#151519]">
                    <TableRow className="border-[#1F1F23] hover:bg-transparent">
                      <TableHead className="text-[#A0A0A5] text-xs">Time</TableHead>
                      <TableHead className="text-[#A0A0A5] text-xs">Symbol</TableHead>
                      <TableHead className="text-[#A0A0A5] text-xs">Action</TableHead>
                      <TableHead className="text-[#A0A0A5] text-xs text-right">Qty</TableHead>
                      <TableHead className="text-[#A0A0A5] text-xs text-right">Price</TableHead>
                      <TableHead className="text-[#A0A0A5] text-xs">Strategy</TableHead>
                      <TableHead className="text-[#A0A0A5] text-xs">Status</TableHead>
                      <TableHead className="text-[#A0A0A5] text-xs text-right">PnL</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {trades.map((trade) => {
                      const isBuy = trade.action === 'BUY';
                      const isPnlPositive = parseFloat(trade.pnlImpact) >= 0;
                      const isFlashing = flashingTrade === trade.id;

                      return (
                        <TableRow
                          key={trade.id}
                          className={`border-[#1F1F23] transition-all ${
                            isFlashing 
                              ? isBuy 
                                ? 'bg-[#00E0A4]/20 animate-pulse' 
                                : 'bg-[#FF5252]/20 animate-pulse'
                              : 'hover:bg-[#1A1A1E]'
                          }`}
                        >
                          <TableCell className="text-xs text-[#A0A0A5] font-mono">{trade.timestamp}</TableCell>
                          <TableCell className="text-sm">{trade.symbol}</TableCell>
                          <TableCell>
                            <span className={`text-xs px-2 py-1 rounded ${
                              isBuy ? 'bg-[#00E0A4]/20 text-[#00E0A4]' : 'bg-[#FF5252]/20 text-[#FF5252]'
                            }`}>
                              {trade.action}
                            </span>
                          </TableCell>
                          <TableCell className="text-right text-sm">{trade.qty.toLocaleString()}</TableCell>
                          <TableCell className="text-right text-sm">${trade.price}</TableCell>
                          <TableCell className="text-xs text-[#A0A0A5]">{trade.strategy}</TableCell>
                          <TableCell>
                            <Badge className={`text-[10px] px-2 py-0.5 ${getStatusBadge(trade.status)}`}>
                              {trade.status}
                            </Badge>
                          </TableCell>
                          <TableCell className={`text-right text-sm ${
                            isPnlPositive ? 'text-[#00E0A4]' : 'text-[#FF5252]'
                          }`}>
                            {isPnlPositive ? '+' : ''}${parseFloat(trade.pnlImpact).toLocaleString()}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </div>

            {/* Volume Chart */}
            <div className="bg-[#151519] rounded-lg border border-[#1F1F23] p-4">
              <h3 className="text-sm mb-4">Daily Volume</h3>
              <ResponsiveContainer width="100%" height={450}>
                <AreaChart data={volumeData}>
                  <defs>
                    <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2979FF" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#2979FF" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1F1F23" />
                  <XAxis dataKey="hour" stroke="#A0A0A5" tick={{ fontSize: 10 }} interval={3} />
                  <YAxis stroke="#A0A0A5" tick={{ fontSize: 10 }} tickFormatter={(val) => `${(val / 1000).toFixed(0)}K`} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#0D0D0F", border: "1px solid #1F1F23", borderRadius: "4px", fontSize: "12px" }}
                    formatter={(value: any) => [`${(value / 1000).toFixed(1)}K`, 'Volume']}
                  />
                  <Area type="monotone" dataKey="volume" stroke="#2979FF" strokeWidth={2} fill="url(#colorVolume)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="open">
          <div className="bg-[#151519] rounded-lg border border-[#1F1F23] overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="border-[#1F1F23] hover:bg-transparent">
                  <TableHead className="text-[#A0A0A5] text-xs">Symbol</TableHead>
                  <TableHead className="text-[#A0A0A5] text-xs">Action</TableHead>
                  <TableHead className="text-[#A0A0A5] text-xs text-right">Quantity</TableHead>
                  <TableHead className="text-[#A0A0A5] text-xs text-right">Limit Price</TableHead>
                  <TableHead className="text-[#A0A0A5] text-xs text-right">Current Price</TableHead>
                  <TableHead className="text-[#A0A0A5] text-xs text-right">Unrealized PnL</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {openOrders.map((order) => (
                  <TableRow key={order.id} className="border-[#1F1F23] hover:bg-[#1A1A1E]">
                    <TableCell className="text-sm">{order.symbol}</TableCell>
                    <TableCell>
                      <span className={`text-xs px-2 py-1 rounded ${
                        order.action === 'BUY' ? 'bg-[#00E0A4]/20 text-[#00E0A4]' : 'bg-[#FF5252]/20 text-[#FF5252]'
                      }`}>
                        {order.action}
                      </span>
                    </TableCell>
                    <TableCell className="text-right text-sm">{order.qty}</TableCell>
                    <TableCell className="text-right text-sm">${order.limitPrice.toLocaleString()}</TableCell>
                    <TableCell className="text-right text-sm">${order.currentPrice.toLocaleString()}</TableCell>
                    <TableCell className={`text-right text-sm ${order.pnl >= 0 ? 'text-[#00E0A4]' : 'text-[#FF5252]'}`}>
                      {order.pnl >= 0 ? '+' : ''}${order.pnl}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="history">
          <div className="bg-[#151519] rounded-lg border border-[#1F1F23] p-6 text-center">
            <Activity className="h-12 w-12 mx-auto mb-3 text-[#A0A0A5]" />
            <p className="text-sm text-[#A0A0A5]">Historical trade data will appear here</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
