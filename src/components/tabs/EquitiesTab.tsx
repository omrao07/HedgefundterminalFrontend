import { useState } from "react";
import { ScrollArea } from "../ui/scroll-area";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { Button } from "../ui/button";
import { Slider } from "../ui/slider";
import { 
  TrendingUp, 
  TrendingDown, 
  BarChart3,
  LineChart,
  PieChart,
  Activity,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  Building2,
  ChevronUp,
  ChevronDown,
  CircleDot,
  Target,
  Zap,
  Search
} from "lucide-react";

export function EquitiesTab() {
  const [activeView, setActiveView] = useState("overview");
  const [selectedSymbol, setSelectedSymbol] = useState("SPY");
  const [selectedExpiry, setSelectedExpiry] = useState("30D");
  const [selectedStrike, setSelectedStrike] = useState(450);
  const [chartTimeframe, setChartTimeframe] = useState("1D");
  const [detailedView, setDetailedView] = useState<string | null>(null);
  const [chartType, setChartType] = useState<"candle" | "line" | "area">("candle");
  const [showIndicators, setShowIndicators] = useState({
    rsi: true,
    macd: true,
    bb: false,
    volume: true
  });
  const [searchQuery, setSearchQuery] = useState("");

  // Stock & Index live prices
  const equities = [
    { 
      symbol: "SPY", 
      name: "S&P 500 ETF", 
      price: 452.34, 
      change: 5.67, 
      changePercent: 1.27,
      volume: "78.2M",
      avgVolume: "84.5M",
      iv: "12.4%",
      category: "Index ETF",
      color: "#00E0A4"
    },
    { 
      symbol: "QQQ", 
      name: "Nasdaq-100 ETF", 
      price: 384.21, 
      change: 8.45, 
      changePercent: 2.25,
      volume: "52.3M",
      avgVolume: "48.7M",
      iv: "14.8%",
      category: "Index ETF",
      color: "#2979FF"
    },
    { 
      symbol: "IWM", 
      name: "Russell 2000 ETF", 
      price: 198.76, 
      change: -2.34, 
      changePercent: -1.16,
      volume: "34.5M",
      avgVolume: "38.2M",
      iv: "18.7%",
      category: "Index ETF",
      color: "#FF9800"
    },
    { 
      symbol: "DIA", 
      name: "Dow Jones ETF", 
      price: 356.89, 
      change: 3.21, 
      changePercent: 0.91,
      volume: "5.2M",
      avgVolume: "5.8M",
      iv: "11.2%",
      category: "Index ETF",
      color: "#FFD700"
    },
    { 
      symbol: "AAPL", 
      name: "Apple Inc.", 
      price: 178.45, 
      change: 4.32, 
      changePercent: 2.48,
      volume: "67.8M",
      avgVolume: "54.3M",
      iv: "23.4%",
      category: "Tech",
      color: "#A0A0A5"
    },
    { 
      symbol: "MSFT", 
      name: "Microsoft Corp.", 
      price: 384.67, 
      change: 6.78, 
      changePercent: 1.79,
      volume: "32.4M",
      avgVolume: "28.9M",
      iv: "21.8%",
      category: "Tech",
      color: "#00E0A4"
    },
    { 
      symbol: "TSLA", 
      name: "Tesla Inc.", 
      price: 242.84, 
      change: -12.45, 
      changePercent: -4.88,
      volume: "145.2M",
      avgVolume: "112.4M",
      iv: "45.7%",
      category: "Auto",
      color: "#FF5252"
    },
    { 
      symbol: "NVDA", 
      name: "NVIDIA Corp.", 
      price: 495.23, 
      change: 18.92, 
      changePercent: 3.97,
      volume: "98.7M",
      avgVolume: "76.3M",
      iv: "38.4%",
      category: "Tech",
      color: "#76B900"
    },
    { 
      symbol: "META", 
      name: "Meta Platforms", 
      price: 334.56, 
      change: 9.87, 
      changePercent: 3.04,
      volume: "23.4M",
      avgVolume: "18.9M",
      iv: "32.1%",
      category: "Tech",
      color: "#0668E1"
    },
    { 
      symbol: "JPM", 
      name: "JPMorgan Chase", 
      price: 156.78, 
      change: 2.34, 
      changePercent: 1.52,
      volume: "12.3M",
      avgVolume: "10.8M",
      iv: "19.4%",
      category: "Finance",
      color: "#FFD700"
    },
    { 
      symbol: "XOM", 
      name: "Exxon Mobil", 
      price: 112.45, 
      change: -1.87, 
      changePercent: -1.63,
      volume: "18.7M",
      avgVolume: "16.2M",
      iv: "22.3%",
      category: "Energy",
      color: "#FF9800"
    },
    { 
      symbol: "WMT", 
      name: "Walmart Inc.", 
      price: 167.89, 
      change: 3.45, 
      changePercent: 2.10,
      volume: "8.4M",
      avgVolume: "7.2M",
      iv: "16.8%",
      category: "Retail",
      color: "#0071DC"
    },
  ];

  // Options expiration dates
  const expirationDates = [
    { label: "7D", date: "Nov 10", dte: 7, volume: "12.4M" },
    { label: "14D", date: "Nov 17", dte: 14, volume: "8.7M" },
    { label: "30D", date: "Dec 1", dte: 30, volume: "24.3M" },
    { label: "60D", date: "Jan 2", dte: 60, volume: "18.9M" },
    { label: "90D", date: "Feb 2", dte: 90, volume: "32.1M" },
    { label: "180D", date: "May 2", dte: 180, volume: "45.6M" },
    { label: "365D", date: "Nov 2", dte: 365, volume: "67.8M" },
  ];

  // Options chain data
  const optionsChain = [
    { 
      strike: 440, 
      callBid: 14.20, callAsk: 14.45, callIV: 11.8, callDelta: 0.82, callGamma: 0.012, callTheta: -0.08, callVega: 0.25, callOI: "123.4K", callVol: "45.2K",
      putBid: 1.85, putAsk: 1.95, putIV: 15.2, putDelta: -0.18, putGamma: 0.012, putTheta: -0.05, putVega: 0.25, putOI: "67.8K", putVol: "23.4K"
    },
    { 
      strike: 445, 
      callBid: 10.30, callAsk: 10.55, callIV: 11.5, callDelta: 0.74, callGamma: 0.015, callTheta: -0.10, callVega: 0.29, callOI: "187.6K", callVol: "67.9K",
      putBid: 2.85, putAsk: 2.95, putIV: 14.8, putDelta: -0.26, putGamma: 0.015, putTheta: -0.07, putVega: 0.29, putOI: "89.3K", putVol: "34.2K"
    },
    { 
      strike: 450, 
      callBid: 7.05, callAsk: 7.30, callIV: 11.2, callDelta: 0.64, callGamma: 0.018, callTheta: -0.12, callVega: 0.33, callOI: "234.8K", callVol: "98.7K",
      putBid: 4.30, putAsk: 4.40, putIV: 14.4, putDelta: -0.36, putGamma: 0.018, putTheta: -0.09, putVega: 0.33, putOI: "156.2K", putVol: "56.3K"
    },
    { 
      strike: 455, 
      callBid: 4.50, callAsk: 4.75, callIV: 10.9, callDelta: 0.52, callGamma: 0.020, callTheta: -0.14, callVega: 0.37, callOI: "298.3K", callVol: "134.5K",
      putBid: 6.50, putAsk: 6.60, putIV: 14.0, putDelta: -0.48, putGamma: 0.020, putTheta: -0.11, putVega: 0.37, putOI: "234.7K", putVol: "87.4K"
    },
    { 
      strike: 460, 
      callBid: 2.65, callAsk: 2.85, callIV: 10.6, callDelta: 0.38, callGamma: 0.021, callTheta: -0.15, callVega: 0.40, callOI: "345.6K", callVol: "187.6K",
      putBid: 9.45, putAsk: 9.55, putIV: 13.6, putDelta: -0.62, putGamma: 0.021, putTheta: -0.13, putVega: 0.40, putOI: "298.1K", putVol: "123.8K"
    },
    { 
      strike: 465, 
      callBid: 1.35, callAsk: 1.55, callIV: 10.3, callDelta: 0.24, callGamma: 0.019, callTheta: -0.13, callVega: 0.37, callOI: "267.9K", callVol: "98.2K",
      putBid: 13.20, putAsk: 13.30, putIV: 13.2, putDelta: -0.76, putGamma: 0.019, putTheta: -0.14, putVega: 0.37, putOI: "189.4K", putVol: "67.1K"
    },
    { 
      strike: 470, 
      callBid: 0.65, callAsk: 0.80, callIV: 10.0, callDelta: 0.12, callGamma: 0.015, callTheta: -0.10, callVega: 0.31, callOI: "178.3K", callVol: "45.6K",
      putBid: 17.85, putAsk: 17.95, putIV: 12.8, putDelta: -0.88, putGamma: 0.015, putTheta: -0.15, putVega: 0.31, putOI: "134.2K", putVol: "38.9K"
    },
  ];

  // Order flow / Unusual options activity
  const orderFlow = [
    { time: "15:42:33", type: "SWEEP", side: "CALL", symbol: "SPY", strike: 455, expiry: "30D", size: "12,340", premium: "$58.4M", iv: 11.2, tag: "BULLISH" },
    { time: "15:38:17", type: "BLOCK", side: "PUT", symbol: "QQQ", strike: 380, expiry: "60D", size: "8,920", premium: "$34.2M", iv: 15.8, tag: "HEDGING" },
    { time: "15:31:45", type: "DARK POOL", side: "CALL", symbol: "NVDA", strike: 500, expiry: "30D", size: "15,670", premium: "$78.9M", iv: 39.4, tag: "BULLISH" },
    { time: "15:27:22", type: "SWEEP", side: "PUT", symbol: "TSLA", strike: 240, expiry: "14D", size: "6,780", premium: "$16.3M", iv: 46.2, tag: "BEARISH" },
    { time: "15:19:08", type: "CROSS", side: "CALL", symbol: "AAPL", strike: 180, expiry: "90D", size: "23,450", premium: "$92.7M", iv: 23.8, tag: "BULLISH" },
    { time: "15:12:54", type: "SWEEP", side: "CALL", symbol: "SPY", strike: 460, expiry: "30D", size: "9,120", premium: "$24.5M", iv: 10.8, tag: "BULLISH" },
    { time: "15:04:31", type: "BLOCK", side: "PUT", symbol: "IWM", strike: 195, expiry: "60D", size: "5,340", premium: "$10.8M", iv: 19.7, tag: "BEARISH" },
  ];

  // Market breadth & sentiment indicators
  const marketBreadth = [
    { indicator: "Advance/Decline Ratio", value: "2.34", change: "+0.45", status: "bullish", severity: "MEDIUM" },
    { indicator: "New Highs/Lows", value: "467/89", change: "+128", status: "bullish", severity: "HIGH" },
    { indicator: "Put/Call Ratio", value: "0.67", change: "-0.08", status: "bullish", severity: "MEDIUM" },
    { indicator: "VIX", value: "14.23", change: "-1.45", status: "bullish", severity: "LOW" },
    { indicator: "SKEW Index", value: "143.8", change: "+2.3", status: "neutral", severity: "MEDIUM" },
    { indicator: "High Yield Spread", value: "3.42%", change: "-0.12%", status: "bullish", severity: "LOW" },
    { indicator: "Credit Spread (IG)", value: "98 bps", change: "-5 bps", status: "bullish", severity: "LOW" },
    { indicator: "Margin Debt", value: "$712B", change: "+$8.4B", status: "neutral", severity: "MEDIUM" },
  ];

  // Sector rotation data
  const sectorRotation = [
    { sector: "Technology", momentum: 85, flow: "+$2.4B", change: "+3.2%", strength: "STRONG BUY" },
    { sector: "Financials", momentum: 72, flow: "+$1.8B", change: "+1.9%", strength: "BUY" },
    { sector: "Healthcare", momentum: 58, flow: "+$890M", change: "+0.8%", strength: "NEUTRAL" },
    { sector: "Consumer Disc.", momentum: 68, flow: "+$1.3B", change: "+2.1%", strength: "BUY" },
    { sector: "Energy", momentum: 34, flow: "-$1.1B", change: "-2.4%", strength: "SELL" },
    { sector: "Utilities", momentum: 42, flow: "-$540M", change: "-1.2%", strength: "WEAK SELL" },
    { sector: "Real Estate", momentum: 48, flow: "+$320M", change: "+0.4%", strength: "NEUTRAL" },
    { sector: "Materials", momentum: 55, flow: "+$670M", change: "+1.1%", strength: "NEUTRAL" },
  ];

  // News feed
  const equityNews = [
    { time: "15:45", headline: "SPY Breaks Above 450 Resistance - Technical Breakout", impact: "HIGH", source: "BLOOMBERG" },
    { time: "14:22", headline: "NVDA Unusual Options Activity - 78M Premium in Calls", impact: "CRITICAL", source: "FLOW TRADERS" },
    { time: "13:08", headline: "Fed Minutes Signal Extended Higher Rates Policy", impact: "CRITICAL", source: "FEDERAL RESERVE" },
    { time: "12:34", headline: "Tech Sector Leads Market Rally - QQQ +2.25%", impact: "MEDIUM", source: "CNBC" },
    { time: "11:15", headline: "Dark Pool Activity Spikes in Mega Cap Tech", impact: "HIGH", source: "WHALE TRACKER" },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "CRITICAL": return "bg-[#FF5252]/20 text-[#FF5252] border-[#FF5252]/30";
      case "HIGH": return "bg-[#FF9800]/20 text-[#FF9800] border-[#FF9800]/30";
      case "MEDIUM": return "bg-[#2979FF]/20 text-[#2979FF] border-[#2979FF]/30";
      case "LOW": return "bg-[#00E0A4]/20 text-[#00E0A4] border-[#00E0A4]/30";
      default: return "bg-[#A0A0A5]/20 text-[#A0A0A5] border-[#A0A0A5]/30";
    }
  };

  const getStrengthColor = (strength: string) => {
    if (strength.includes("STRONG BUY") || strength.includes("BUY")) return "text-[#00E0A4]";
    if (strength.includes("SELL")) return "text-[#FF5252]";
    return "text-[#A0A0A5]";
  };

  const getSelectedEquityName = () => {
    const equity = equities.find(e => e.symbol === selectedSymbol);
    return equity ? equity.name : selectedSymbol;
  };

  // Generate mock price data for charts
  type PriceData = {
    time: number;
    open: string;
    high: string;
    low: string;
    close: string;
    volume: number;
  };

  const generatePriceData = (symbol: string, timeframe: string): PriceData[] => {
    const dataPoints = timeframe === "1D" ? 78 : timeframe === "1W" ? 35 : timeframe === "1M" ? 30 : timeframe === "3M" ? 90 : 252;
    const equity = equities.find(e => e.symbol === symbol);
    const basePrice = equity?.price || 450;
    
    const data: PriceData[] = [];
    for (let i = 0; i < dataPoints; i++) {
      const volatility = 0.02;
      const trend = 0.0001;
      const random = (Math.random() - 0.5) * volatility;
      const price = basePrice * (1 + trend * i + random);
      const open = price * (1 + (Math.random() - 0.5) * 0.005);
      const close = price * (1 + (Math.random() - 0.5) * 0.005);
      const high = Math.max(open, close) * (1 + Math.random() * 0.01);
      const low = Math.min(open, close) * (1 - Math.random() * 0.01);
      const volume = Math.random() * 10000000 + 5000000;
      
      data.push({
        time: i,
        open: open.toFixed(2),
        high: high.toFixed(2),
        low: low.toFixed(2),
        close: close.toFixed(2),
        volume: Math.floor(volume)
      });
    }
    return data;
  };

  // Technical indicators data
  const technicalIndicators = {
    rsi: Array.from({ length: 14 }, (_, i) => ({
      time: i,
      value: 30 + Math.random() * 40
    })),
    macd: {
      macd: Array.from({ length: 26 }, (_, i) => ({ time: i, value: (Math.random() - 0.5) * 2 })),
      signal: Array.from({ length: 26 }, (_, i) => ({ time: i, value: (Math.random() - 0.5) * 1.5 })),
      histogram: Array.from({ length: 26 }, (_, i) => ({ time: i, value: (Math.random() - 0.5) * 0.5 }))
    }
  };

  return (
    <div className="h-[calc(100vh-120px)]">
      <Tabs value={activeView} onValueChange={setActiveView} className="h-full flex flex-col">
        <TabsList className="bg-[#1F1F23] border-b-2 border-[#2979FF]/20 rounded-none w-full justify-start p-0 h-12">
          <TabsTrigger value="overview" className="data-[state=active]:bg-[#151519] data-[state=active]:text-[#00E0A4] data-[state=active]:border-[#00E0A4] bg-transparent text-[#A0A0A5] hover:text-[#E8E8E8] hover:bg-[#151519]/50 rounded-none border-b-2 border-transparent px-6 whitespace-nowrap transition-all text-xs">
            Market Overview
          </TabsTrigger>
          <TabsTrigger value="options" className="data-[state=active]:bg-[#151519] data-[state=active]:text-[#00E0A4] data-[state=active]:border-[#00E0A4] bg-transparent text-[#A0A0A5] hover:text-[#E8E8E8] hover:bg-[#151519]/50 rounded-none border-b-2 border-transparent px-6 whitespace-nowrap transition-all text-xs">
            Options Chain + Greeks
          </TabsTrigger>
          <TabsTrigger value="flow" className="data-[state=active]:bg-[#151519] data-[state=active]:text-[#00E0A4] data-[state=active]:border-[#00E0A4] bg-transparent text-[#A0A0A5] hover:text-[#E8E8E8] hover:bg-[#151519]/50 rounded-none border-b-2 border-transparent px-6 whitespace-nowrap transition-all text-xs">
            Order Flow & Whales
          </TabsTrigger>
          <TabsTrigger value="sectors" className="data-[state=active]:bg-[#151519] data-[state=active]:text-[#00E0A4] data-[state=active]:border-[#00E0A4] bg-transparent text-[#A0A0A5] hover:text-[#E8E8E8] hover:bg-[#151519]/50 rounded-none border-b-2 border-transparent px-6 whitespace-nowrap transition-all text-xs">
            Sector Rotation
          </TabsTrigger>
        </TabsList>

        <ScrollArea className="flex-1">
          <div className="p-4">
            {/* MARKET OVERVIEW */}
            <TabsContent value="overview" className="mt-0">
              <div className="space-y-4">
                {/* Tagline */}
                <div className="bg-gradient-to-r from-[#2979FF]/10 to-[#00E0A4]/10 rounded-lg border border-[#2979FF]/20 p-6 text-center">
                  <h1 className="text-2xl mb-2 bg-gradient-to-r from-[#2979FF] to-[#00E0A4] bg-clip-text text-transparent">
                    Command the Equity Markets
                  </h1>
                  <p className="text-sm text-[#A0A0A5]">
                    Real-time pricing • Options Flow • Market Breadth • Institutional Activity
                  </p>
                </div>

                {/* Market Breadth Dashboard */}
                <div className="bg-[#0D0D0F]/80 backdrop-blur-xl rounded-lg border border-[#2979FF]/20 p-4">
                  <div className="flex items-center gap-2 mb-4">
                    <Activity className="w-5 h-5 text-[#FF9800]" />
                    <h3 className="text-sm">Market Breadth & Sentiment Indicators</h3>
                  </div>
                  <div className="grid grid-cols-4 gap-4">
                    {marketBreadth.map((signal, idx) => (
                      <div key={idx} className="bg-[#151519] rounded-lg p-4 hover:bg-[#1F1F23] transition-colors">
                        <div className="flex items-center justify-between mb-2">
                          <div className="text-xs text-[#A0A0A5]">{signal.indicator}</div>
                          <Badge className={`text-xs ${getSeverityColor(signal.severity)}`}>
                            {signal.severity}
                          </Badge>
                        </div>
                        <div className="text-2xl mb-1">{signal.value}</div>
                        <div className={`text-xs flex items-center gap-1 ${
                          signal.status === "bullish" ? "text-[#00E0A4]" : 
                          signal.status === "bearish" ? "text-[#FF5252]" : "text-[#A0A0A5]"
                        }`}>
                          {signal.status === "bullish" ? <TrendingUp className="w-3 h-3" /> : 
                           signal.status === "bearish" ? <TrendingDown className="w-3 h-3" /> :
                           <CircleDot className="w-3 h-3" />}
                          {signal.change}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Stock & Index Price Matrix */}
                <div className="bg-[#0D0D0F]/80 backdrop-blur-xl rounded-lg border border-[#2979FF]/20 p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <BarChart3 className="w-5 h-5 text-[#00E0A4]" />
                      <h3 className="text-sm">Live Equity Prices</h3>
                    </div>
                    <div className="flex items-center gap-4">
                      {/* Search Input */}
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A0A0A5]" />
                        <input
                          type="text"
                          placeholder="Search stocks..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="bg-[#151519] border border-[#2979FF]/20 rounded-lg pl-10 pr-4 py-2 text-sm text-[#E8E8E8] placeholder:text-[#A0A0A5] focus:outline-none focus:border-[#2979FF]/40 w-64"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#00E0A4] animate-pulse" />
                        <span className="text-xs text-[#00E0A4]">LIVE</span>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-4">
                    {equities.filter(equity => 
                      searchQuery === "" || 
                      equity.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      equity.name.toLowerCase().includes(searchQuery.toLowerCase())
                    ).map((equity, idx) => (
                      <div 
                        key={idx} 
                        className={`bg-[#151519] rounded-lg p-4 hover:bg-[#1F1F23] transition-all cursor-pointer border ${
                          selectedSymbol === equity.symbol 
                            ? "border-[#00E0A4] shadow-lg shadow-[#00E0A4]/20" 
                            : "border-transparent hover:border-[#2979FF]/40"
                        }`}
                        onClick={() => {
                          setSelectedSymbol(equity.symbol);
                          setDetailedView(equity.symbol);
                        }}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <div className="text-sm">{equity.symbol}</div>
                            <div className="text-xs text-[#A0A0A5]">{equity.name}</div>
                          </div>
                          <Badge className={`text-xs ${
                            equity.change >= 0 ? 
                            "bg-[#00E0A4]/20 text-[#00E0A4] border-[#00E0A4]/30" : 
                            "bg-[#FF5252]/20 text-[#FF5252] border-[#FF5252]/30"
                          }`}>
                            {equity.category}
                          </Badge>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-end justify-between">
                            <div className="text-2xl">${equity.price.toFixed(2)}</div>
                            <div className={`text-sm flex items-center gap-1 ${
                              equity.change >= 0 ? "text-[#00E0A4]" : "text-[#FF5252]"
                            }`}>
                              {equity.change >= 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                              {equity.changePercent >= 0 ? "+" : ""}{equity.changePercent.toFixed(2)}%
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div>
                              <div className="text-[#A0A0A5]">Volume</div>
                              <div>{equity.volume}</div>
                            </div>
                            <div>
                              <div className="text-[#A0A0A5]">IV</div>
                              <div>{equity.iv}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    {equities.filter(equity => 
                      searchQuery === "" || 
                      equity.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      equity.name.toLowerCase().includes(searchQuery.toLowerCase())
                    ).length === 0 && (
                      <div className="col-span-4 text-center py-12 text-[#A0A0A5]">
                        No equities found matching "{searchQuery}"
                      </div>
                    )}
                  </div>
                </div>

                {/* Detailed Chart View */}
                {detailedView && (
                  <div className="bg-[#0D0D0F]/80 backdrop-blur-xl rounded-lg border border-[#00E0A4]/30 p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div>
                          <h3 className="text-lg">{detailedView}</h3>
                          <p className="text-xs text-[#A0A0A5]">
                            {equities.find(e => e.symbol === detailedView)?.name}
                          </p>
                        </div>
                        <Badge className="bg-[#00E0A4]/20 text-[#00E0A4] border-[#00E0A4]/30">
                          ${equities.find(e => e.symbol === detailedView)?.price.toFixed(2)}
                        </Badge>
                        <Badge className={`${
                          (equities.find(e => e.symbol === detailedView)?.change || 0) >= 0 
                            ? "bg-[#00E0A4]/20 text-[#00E0A4] border-[#00E0A4]/30" 
                            : "bg-[#FF5252]/20 text-[#FF5252] border-[#FF5252]/30"
                        }`}>
                          {(equities.find(e => e.symbol === detailedView)?.changePercent || 0) >= 0 ? "+" : ""}
                          {equities.find(e => e.symbol === detailedView)?.changePercent.toFixed(2)}%
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex gap-1">
                          {["1D", "1W", "1M", "3M", "1Y"].map((tf) => (
                            <button
                              key={tf}
                              onClick={() => setChartTimeframe(tf)}
                              className={`text-xs px-3 py-1 rounded transition-all ${
                                chartTimeframe === tf
                                  ? "bg-[#2979FF]/20 text-[#2979FF] border border-[#2979FF]/30"
                                  : "text-[#A0A0A5] hover:bg-[#151519] border border-transparent"
                              }`}
                            >
                              {tf}
                            </button>
                          ))}
                        </div>
                        <Button
                          onClick={() => setDetailedView(null)}
                          className="text-xs bg-[#151519] hover:bg-[#1F1F23] border border-[#2979FF]/20"
                        >
                          Close
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      {/* Main Price Chart */}
                      <div className="col-span-2 space-y-3">
                        {/* Chart Controls */}
                        <div className="flex items-center justify-between">
                          <div className="flex gap-2">
                            {[
                              { type: "candle", label: "Candlestick" },
                              { type: "line", label: "Line" },
                              { type: "area", label: "Area" }
                            ].map((ct) => (
                              <button
                                key={ct.type}
                                onClick={() => setChartType(ct.type as any)}
                                className={`text-xs px-3 py-1 rounded transition-all ${
                                  chartType === ct.type
                                    ? "bg-[#00E0A4]/20 text-[#00E0A4] border border-[#00E0A4]/30"
                                    : "text-[#A0A0A5] hover:bg-[#151519] border border-transparent"
                                }`}
                              >
                                {ct.label}
                              </button>
                            ))}
                          </div>
                          <div className="flex gap-2 text-xs">
                            <label className="flex items-center gap-1 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={showIndicators.volume}
                                onChange={(e) => setShowIndicators({...showIndicators, volume: e.target.checked})}
                                className="rounded"
                              />
                              <span className="text-[#A0A0A5]">Volume</span>
                            </label>
                            <label className="flex items-center gap-1 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={showIndicators.rsi}
                                onChange={(e) => setShowIndicators({...showIndicators, rsi: e.target.checked})}
                                className="rounded"
                              />
                              <span className="text-[#A0A0A5]">RSI</span>
                            </label>
                            <label className="flex items-center gap-1 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={showIndicators.macd}
                                onChange={(e) => setShowIndicators({...showIndicators, macd: e.target.checked})}
                                className="rounded"
                              />
                              <span className="text-[#A0A0A5]">MACD</span>
                            </label>
                            <label className="flex items-center gap-1 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={showIndicators.bb}
                                onChange={(e) => setShowIndicators({...showIndicators, bb: e.target.checked})}
                                className="rounded"
                              />
                              <span className="text-[#A0A0A5]">Bollinger</span>
                            </label>
                          </div>
                        </div>

                        {/* Price Chart */}
                        <div className="bg-[#000000] rounded-lg border border-[#1F1F23] p-4">
                          <div className="h-[300px] relative">
                            {/* Chart Grid */}
                            <div className="absolute inset-0 grid grid-rows-5 border-b border-[#1F1F23]">
                              {[0, 1, 2, 3, 4].map((i) => (
                                <div key={i} className="border-t border-[#1F1F23]/30" />
                              ))}
                            </div>
                            
                            {/* Y-axis labels */}
                            <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-xs text-[#A0A0A5] pr-2">
                              {(() => {
                                const priceData = generatePriceData(detailedView, chartTimeframe).slice(-50);
                                const allPrices = priceData.flatMap(c => [parseFloat(c.high), parseFloat(c.low)]);
                                const minPrice = Math.min(...allPrices);
                                const maxPrice = Math.max(...allPrices);
                                const priceRange = maxPrice - minPrice;
                                
                                return (
                                  <>
                                    <span>${maxPrice.toFixed(2)}</span>
                                    <span>${(maxPrice - priceRange * 0.25).toFixed(2)}</span>
                                    <span>${(maxPrice - priceRange * 0.5).toFixed(2)}</span>
                                    <span>${(maxPrice - priceRange * 0.75).toFixed(2)}</span>
                                    <span>${minPrice.toFixed(2)}</span>
                                  </>
                                );
                              })()}
                            </div>

                            {/* Candlestick Chart */}
                            <div className="ml-12 h-full flex items-end gap-[2px]">
                              {(() => {
                                const priceData = generatePriceData(detailedView, chartTimeframe).slice(-50);
                                const allPrices = priceData.flatMap(c => [parseFloat(c.high), parseFloat(c.low)]);
                                const minPrice = Math.min(...allPrices);
                                const maxPrice = Math.max(...allPrices);
                                const priceRange = maxPrice - minPrice;
                                
                                return priceData.map((candle, idx) => {
                                  const open = parseFloat(candle.open);
                                  const close = parseFloat(candle.close);
                                  const high = parseFloat(candle.high);
                                  const low = parseFloat(candle.low);
                                  const isGreen = close >= open;
                                  
                                  // Calculate percentages from bottom
                                  const lowPercent = ((low - minPrice) / priceRange) * 100;
                                  const highPercent = ((high - minPrice) / priceRange) * 100;
                                  const openPercent = ((open - minPrice) / priceRange) * 100;
                                  const closePercent = ((close - minPrice) / priceRange) * 100;
                                  
                                  const bodyBottom = Math.min(openPercent, closePercent);
                                  const bodyTop = Math.max(openPercent, closePercent);
                                  const bodyHeight = Math.max(bodyTop - bodyBottom, 0.5);
                                  
                                  return (
                                    <div key={idx} className="flex-1 relative h-full group">
                                      {chartType === "candle" ? (
                                        <>
                                          {/* Upper Wick */}
                                          <div 
                                            className={`absolute left-1/2 -translate-x-1/2 w-[1px] ${isGreen ? "bg-[#00E0A4]" : "bg-[#FF5252]"}`}
                                            style={{ 
                                              bottom: `${bodyTop}%`,
                                              height: `${highPercent - bodyTop}%`
                                            }}
                                          />
                                          
                                          {/* Body */}
                                          <div 
                                            className={`absolute left-0 right-0 ${isGreen ? "bg-[#00E0A4]" : "bg-[#FF5252]"} rounded-sm`}
                                            style={{ 
                                              bottom: `${bodyBottom}%`,
                                              height: `${bodyHeight}%`
                                            }}
                                          />
                                          
                                          {/* Lower Wick */}
                                          <div 
                                            className={`absolute left-1/2 -translate-x-1/2 w-[1px] ${isGreen ? "bg-[#00E0A4]" : "bg-[#FF5252]"}`}
                                            style={{ 
                                              bottom: `${lowPercent}%`,
                                              height: `${bodyBottom - lowPercent}%`
                                            }}
                                          />
                                        </>
                                      ) : chartType === "line" ? (
                                        <div 
                                          className="absolute left-0 right-0 bottom-0 bg-[#2979FF]"
                                          style={{ height: `${closePercent}%` }}
                                        />
                                      ) : (
                                        <div 
                                          className="absolute left-0 right-0 bottom-0 bg-gradient-to-t from-[#2979FF]/40 to-[#2979FF]"
                                          style={{ height: `${closePercent}%` }}
                                        />
                                      )}
                                      
                                      {/* Hover tooltip */}
                                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-[#0D0D0F]/95 backdrop-blur-sm border border-[#2979FF]/40 rounded-lg p-2 text-xs whitespace-nowrap z-10">
                                        <div className="text-[#A0A0A5]">O: ${candle.open}</div>
                                        <div className="text-[#A0A0A5]">H: ${candle.high}</div>
                                        <div className="text-[#A0A0A5]">L: ${candle.low}</div>
                                        <div className="text-[#A0A0A5]">C: ${candle.close}</div>
                                        <div className="text-[#2979FF]">Vol: {(candle.volume / 1000000).toFixed(2)}M</div>
                                      </div>
                                    </div>
                                  );
                                });
                              })()}
                            </div>
                          </div>
                        </div>

                        {/* Volume Chart */}
                        {showIndicators.volume && (
                          <div className="bg-[#000000] rounded-lg border border-[#1F1F23] p-4">
                            <div className="text-xs text-[#A0A0A5] mb-2">Volume</div>
                            <div className="h-[80px] flex items-end gap-[2px]">
                              {generatePriceData(detailedView, chartTimeframe).slice(-50).map((candle, idx) => {
                                const isGreen = parseFloat(candle.close) >= parseFloat(candle.open);
                                const height = (candle.volume / 20000000) * 100;
                                return (
                                  <div 
                                    key={idx} 
                                    className={`flex-1 rounded-t ${isGreen ? "bg-[#00E0A4]/50" : "bg-[#FF5252]/50"}`}
                                    style={{ height: `${Math.min(height, 100)}%` }}
                                  />
                                );
                              })}
                            </div>
                          </div>
                        )}

                        {/* RSI Indicator */}
                        {showIndicators.rsi && (
                          <div className="bg-[#000000] rounded-lg border border-[#1F1F23] p-4">
                            <div className="flex items-center justify-between mb-2">
                              <div className="text-xs text-[#A0A0A5]">RSI (14)</div>
                              <div className="text-xs text-[#00E0A4]">56.7</div>
                            </div>
                            <div className="h-[60px] relative">
                              {/* Overbought/Oversold lines */}
                              <div className="absolute top-[20%] left-0 right-0 border-t border-[#FF5252]/30 border-dashed" />
                              <div className="absolute top-[80%] left-0 right-0 border-t border-[#00E0A4]/30 border-dashed" />
                              <div className="absolute top-[20%] left-2 text-[10px] text-[#FF5252]">70</div>
                              <div className="absolute top-[80%] left-2 text-[10px] text-[#00E0A4]">30</div>
                              
                              {/* RSI Line */}
                              <div className="h-full flex items-end">
                                {Array.from({ length: 50 }, (_, i) => {
                                  const rsi = 30 + Math.random() * 40;
                                  const height = rsi;
                                  return (
                                    <div key={i} className="flex-1 flex items-end">
                                      <div 
                                        className="w-full bg-[#2979FF] rounded-t"
                                        style={{ height: `${height}%` }}
                                      />
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        )}

                        {/* MACD Indicator */}
                        {showIndicators.macd && (
                          <div className="bg-[#000000] rounded-lg border border-[#1F1F23] p-4">
                            <div className="flex items-center justify-between mb-2">
                              <div className="text-xs text-[#A0A0A5]">MACD (12, 26, 9)</div>
                              <div className="flex gap-3 text-xs">
                                <span className="text-[#2979FF]">MACD: 0.45</span>
                                <span className="text-[#FF9800]">Signal: 0.32</span>
                                <span className="text-[#00E0A4]">Hist: 0.13</span>
                              </div>
                            </div>
                            <div className="h-[60px] relative flex items-center">
                              <div className="absolute left-0 right-0 top-1/2 border-t border-[#1F1F23]" />
                              <div className="w-full h-full flex items-center gap-[2px]">
                                {Array.from({ length: 50 }, (_, i) => {
                                  const hist = (Math.random() - 0.5) * 30;
                                  return (
                                    <div key={i} className="flex-1 flex items-center justify-center">
                                      <div 
                                        className={`w-full ${hist >= 0 ? "bg-[#00E0A4]" : "bg-[#FF5252]"} rounded`}
                                        style={{ 
                                          height: `${Math.abs(hist)}%`,
                                          marginTop: hist >= 0 ? 0 : 'auto',
                                          marginBottom: hist < 0 ? 0 : 'auto'
                                        }}
                                      />
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Analysis Panel */}
                      <div className="space-y-3">
                        {/* Key Stats */}
                        <div className="bg-[#151519] rounded-lg border border-[#2979FF]/20 p-3">
                          <h4 className="text-xs text-[#A0A0A5] mb-3">Key Statistics</h4>
                          <div className="space-y-2 text-xs">
                            {[
                              { label: "Day Range", value: "$448.23 - $454.67" },
                              { label: "52W Range", value: "$380.45 - $467.89" },
                              { label: "Market Cap", value: "$412.3B" },
                              { label: "P/E Ratio", value: "28.4" },
                              { label: "Dividend Yield", value: "1.32%" },
                              { label: "Beta", value: "0.98" },
                            ].map((stat, idx) => (
                              <div key={idx} className="flex justify-between">
                                <span className="text-[#A0A0A5]">{stat.label}</span>
                                <span>{stat.value}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Support/Resistance */}
                        <div className="bg-[#151519] rounded-lg border border-[#2979FF]/20 p-3">
                          <h4 className="text-xs text-[#A0A0A5] mb-3">S/R Levels</h4>
                          <div className="space-y-2">
                            {[
                              { type: "R3", price: 465.50, distance: "+2.89%" },
                              { type: "R2", price: 458.20, distance: "+1.30%" },
                              { type: "R1", price: 454.80, distance: "+0.54%" },
                              { type: "S1", price: 448.90, distance: "-0.76%" },
                              { type: "S2", price: 443.20, distance: "-2.02%" },
                              { type: "S3", price: 438.50, distance: "-3.06%" },
                            ].map((level, idx) => (
                              <div key={idx} className="flex items-center justify-between text-xs">
                                <Badge className={`${
                                  level.type.startsWith("R") 
                                    ? "bg-[#FF5252]/20 text-[#FF5252] border-[#FF5252]/30" 
                                    : "bg-[#00E0A4]/20 text-[#00E0A4] border-[#00E0A4]/30"
                                }`}>
                                  {level.type}
                                </Badge>
                                <span>${level.price}</span>
                                <span className="text-[#A0A0A5]">{level.distance}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Analyst Ratings */}
                        <div className="bg-[#151519] rounded-lg border border-[#2979FF]/20 p-3">
                          <h4 className="text-xs text-[#A0A0A5] mb-3">Analyst Consensus</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between text-xs">
                              <span className="text-[#A0A0A5]">Rating</span>
                              <Badge className="bg-[#00E0A4]/20 text-[#00E0A4] border-[#00E0A4]/30">
                                Strong Buy
                              </Badge>
                            </div>
                            <div className="flex justify-between text-xs">
                              <span className="text-[#A0A0A5]">Price Target</span>
                              <span className="text-[#00E0A4]">$485.00</span>
                            </div>
                            <div className="flex justify-between text-xs">
                              <span className="text-[#A0A0A5]">Upside</span>
                              <span className="text-[#00E0A4]">+7.2%</span>
                            </div>
                            <div className="grid grid-cols-5 gap-1 text-xs mt-2">
                              <div>
                                <div className="text-[#00E0A4] text-center">18</div>
                                <div className="text-[#A0A0A5] text-center text-[10px]">Buy</div>
                              </div>
                              <div>
                                <div className="text-[#2979FF] text-center">5</div>
                                <div className="text-[#A0A0A5] text-center text-[10px]">Hold</div>
                              </div>
                              <div>
                                <div className="text-[#FF5252] text-center">1</div>
                                <div className="text-[#A0A0A5] text-center text-[10px]">Sell</div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Institutional Flow */}
                        <div className="bg-[#151519] rounded-lg border border-[#2979FF]/20 p-3">
                          <h4 className="text-xs text-[#A0A0A5] mb-3">Institutional Activity</h4>
                          <div className="space-y-2 text-xs">
                            <div className="flex justify-between">
                              <span className="text-[#A0A0A5]">Ownership</span>
                              <span>78.4%</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-[#A0A0A5]">Shares Held</span>
                              <span>2.34B</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-[#A0A0A5]">Q/Q Change</span>
                              <span className="text-[#00E0A4]">+2.3%</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-[#A0A0A5]">Institutions</span>
                              <span>4,567</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  {/* Top Unusual Activity */}
                  <div className="bg-[#0D0D0F]/80 backdrop-blur-xl rounded-lg border border-[#2979FF]/20 p-4">
                    <div className="flex items-center gap-2 mb-4">
                      <Zap className="w-5 h-5 text-[#FF9800]" />
                      <h3 className="text-sm">Top Unusual Options Activity</h3>
                    </div>
                    <div className="space-y-3">
                      {orderFlow.slice(0, 5).map((flow, idx) => (
                        <div key={idx} className="bg-[#151519] rounded-lg p-3 hover:bg-[#1F1F23] transition-colors">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <Badge className={`text-xs ${
                                flow.side === "CALL" ? "bg-[#00E0A4]/20 text-[#00E0A4] border-[#00E0A4]/30" : 
                                "bg-[#FF5252]/20 text-[#FF5252] border-[#FF5252]/30"
                              }`}>
                                {flow.side}
                              </Badge>
                              <span className="text-sm">{flow.symbol} ${flow.strike}</span>
                            </div>
                            <div className="text-xs text-[#A0A0A5]">{flow.time}</div>
                          </div>
                          <div className="grid grid-cols-3 gap-2 text-xs">
                            <div>
                              <div className="text-[#A0A0A5]">Premium</div>
                              <div className="text-[#2979FF]">{flow.premium}</div>
                            </div>
                            <div>
                              <div className="text-[#A0A0A5]">Size</div>
                              <div>{flow.size}</div>
                            </div>
                            <div>
                              <div className="text-[#A0A0A5]">Type</div>
                              <div>{flow.type}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Market News Feed */}
                  <div className="bg-[#0D0D0F]/80 backdrop-blur-xl rounded-lg border border-[#2979FF]/20 p-4">
                    <div className="flex items-center gap-2 mb-4">
                      <AlertTriangle className="w-5 h-5 text-[#FF5252]" />
                      <h3 className="text-sm">Market Intelligence Feed</h3>
                    </div>
                    <div className="space-y-3">
                      {equityNews.map((news, idx) => (
                        <div key={idx} className="bg-[#151519] rounded-lg p-3 hover:bg-[#1F1F23] transition-colors">
                          <div className="flex items-start justify-between mb-2">
                            <div className="text-xs text-[#A0A0A5]">{news.time}</div>
                            <Badge className={`text-xs ${getSeverityColor(news.impact)}`}>
                              {news.impact}
                            </Badge>
                          </div>
                          <div className="text-sm mb-1">{news.headline}</div>
                          <div className="text-xs text-[#2979FF]">{news.source}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* OPTIONS CHAIN VIEW */}
            <TabsContent value="options" className="mt-0">
              <div className="space-y-4">
                {/* Search Input */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#A0A0A5]" />
                  <input
                    type="text"
                    placeholder="Search by strike price..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-[#151519] border border-[#1F1F23] rounded-lg text-sm text-[#E8E8E8] placeholder-[#A0A0A5] focus:outline-none focus:ring-2 focus:ring-[#00E0A4]/50 focus:border-[#00E0A4]"
                  />
                </div>

                {/* Options Chain Header */}
                <div className="bg-[#0D0D0F]/80 backdrop-blur-xl rounded-lg border border-[#2979FF]/20 p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Target className="w-5 h-5 text-[#00E0A4]" />
                      <h3 className="text-sm">Options Chain - {selectedSymbol}</h3>
                      <div className="text-xs text-[#A0A0A5]">
                        Spot: <span className="text-[#E8E8E8]">${equities.find(e => e.symbol === selectedSymbol)?.price.toFixed(2)}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {expirationDates.map((exp) => (
                        <button
                          key={exp.label}
                          onClick={() => setSelectedExpiry(exp.label)}
                          className={`text-xs px-3 py-1 rounded transition-all ${
                            selectedExpiry === exp.label
                              ? "bg-[#2979FF]/20 text-[#2979FF] border border-[#2979FF]/30"
                              : "text-[#A0A0A5] hover:bg-[#151519] border border-transparent"
                          }`}
                        >
                          {exp.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Options Chain Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-[#1F1F23]">
                          <th colSpan={5} className="text-center text-xs text-[#00E0A4] p-3 bg-[#00E0A4]/5">CALLS</th>
                          <th className="text-center text-xs text-[#A0A0A5] p-3">STRIKE</th>
                          <th colSpan={5} className="text-center text-xs text-[#FF5252] p-3 bg-[#FF5252]/5">PUTS</th>
                        </tr>
                        <tr className="border-b border-[#1F1F23]">
                          <th className="text-right text-xs text-[#A0A0A5] p-2">Bid</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-2">Ask</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-2">IV</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-2">Δ</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-2">OI</th>
                          <th className="text-center text-xs text-[#A0A0A5] p-2">$</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-2">Bid</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-2">Ask</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-2">IV</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-2">Δ</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-2">OI</th>
                        </tr>
                      </thead>
                      <tbody>
                        {optionsChain
                          .filter(option => 
                            searchQuery === "" || 
                            option.strike.toString().includes(searchQuery) ||
                            option.callBid.toString().includes(searchQuery) ||
                            option.callAsk.toString().includes(searchQuery) ||
                            option.putBid.toString().includes(searchQuery) ||
                            option.putAsk.toString().includes(searchQuery)
                          )
                          .map((option, idx) => (
                          <tr key={idx} className="border-b border-[#1F1F23] hover:bg-[#151519] transition-colors">
                            {/* CALLS */}
                            <td className="p-2 text-sm text-right text-[#00E0A4]">${option.callBid.toFixed(2)}</td>
                            <td className="p-2 text-sm text-right text-[#00E0A4]">${option.callAsk.toFixed(2)}</td>
                            <td className="p-2 text-sm text-right">{option.callIV.toFixed(1)}%</td>
                            <td className="p-2 text-sm text-right">{option.callDelta.toFixed(2)}</td>
                            <td className="p-2 text-sm text-right text-[#2979FF]">{option.callOI}</td>
                            
                            {/* STRIKE */}
                            <td className="p-2 text-center bg-[#1F1F23]">
                              <span className="text-sm px-3 py-1 rounded bg-[#151519]">${option.strike}</span>
                            </td>
                            
                            {/* PUTS */}
                            <td className="p-2 text-sm text-right text-[#FF5252]">${option.putBid.toFixed(2)}</td>
                            <td className="p-2 text-sm text-right text-[#FF5252]">${option.putAsk.toFixed(2)}</td>
                            <td className="p-2 text-sm text-right">{option.putIV.toFixed(1)}%</td>
                            <td className="p-2 text-sm text-right">{option.putDelta.toFixed(2)}</td>
                            <td className="p-2 text-sm text-right text-[#2979FF]">{option.putOI}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Greeks Analysis */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#0D0D0F]/80 backdrop-blur-xl rounded-lg border border-[#2979FF]/20 p-4">
                    <div className="flex items-center gap-2 mb-4">
                      <LineChart className="w-5 h-5 text-[#2979FF]" />
                      <h3 className="text-sm">Portfolio Greeks - {selectedSymbol}</h3>
                    </div>
                    <div className="space-y-3">
                      {[
                        { greek: "Delta", value: "+2,340.56", exposure: "$1,056,252", risk: "MEDIUM" },
                        { greek: "Gamma", value: "+124.34", exposure: "$56,052", risk: "LOW" },
                        { greek: "Theta", value: "-$8,945", exposure: "-$8,945/day", risk: "HIGH" },
                        { greek: "Vega", value: "+567.89", exposure: "$284,472", risk: "MEDIUM" },
                      ].map((item, idx) => (
                        <div key={idx} className="bg-[#151519] rounded-lg p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div className="text-sm">{item.greek}</div>
                            <Badge className={`text-xs ${getSeverityColor(item.risk)}`}>
                              {item.risk} RISK
                            </Badge>
                          </div>
                          <div className="grid grid-cols-2 gap-3 text-xs">
                            <div>
                              <div className="text-[#A0A0A5]">Position</div>
                              <div className="text-lg">{item.value}</div>
                            </div>
                            <div>
                              <div className="text-[#A0A0A5]">$ Exposure</div>
                              <div className="text-lg">{item.exposure}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-[#0D0D0F]/80 backdrop-blur-xl rounded-lg border border-[#2979FF]/20 p-4">
                    <div className="flex items-center gap-2 mb-4">
                      <PieChart className="w-5 h-5 text-[#00E0A4]" />
                      <h3 className="text-sm">Implied Volatility Surface</h3>
                    </div>
                    <div className="space-y-3">
                      {[
                        { dte: "7D", atm: "11.2%", otm25: "13.8%", otm50: "16.4%", skew: "+5.2%" },
                        { dte: "30D", atm: "11.2%", otm25: "12.8%", otm50: "14.6%", skew: "+3.4%" },
                        { dte: "60D", atm: "12.4%", otm25: "13.6%", otm50: "15.2%", skew: "+2.8%" },
                        { dte: "90D", atm: "13.1%", otm25: "14.2%", otm50: "15.8%", skew: "+2.7%" },
                      ].map((item, idx) => (
                        <div key={idx} className="bg-[#151519] rounded-lg p-3">
                          <div className="flex items-center justify-between mb-2">
                            <div className="text-sm">{item.dte} Expiry</div>
                            <div className="text-xs text-[#00E0A4]">Skew: {item.skew}</div>
                          </div>
                          <div className="grid grid-cols-3 gap-2 text-xs">
                            <div>
                              <div className="text-[#A0A0A5]">ATM</div>
                              <div>{item.atm}</div>
                            </div>
                            <div>
                              <div className="text-[#A0A0A5]">25Δ OTM</div>
                              <div>{item.otm25}</div>
                            </div>
                            <div>
                              <div className="text-[#A0A0A5]">50Δ OTM</div>
                              <div>{item.otm50}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* ORDER FLOW & WHALES */}
            <TabsContent value="flow" className="mt-0">
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-[#FF9800]/10 to-[#2979FF]/10 rounded-lg border border-[#FF9800]/20 p-4 text-center">
                  <h2 className="text-lg mb-1 bg-gradient-to-r from-[#FF9800] to-[#2979FF] bg-clip-text text-transparent">
                    Institutional Order Flow Tracker
                  </h2>
                  <p className="text-xs text-[#A0A0A5]">
                    Real-time tracking of block trades, sweeps, and dark pool activity
                  </p>
                </div>

                {/* Order Flow Table */}
                <div className="bg-[#0D0D0F]/80 backdrop-blur-xl rounded-lg border border-[#2979FF]/20">
                  <div className="p-4 border-b border-[#1F1F23]">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm">Live Unusual Options Activity</h3>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#FF9800] animate-pulse" />
                        <span className="text-xs text-[#FF9800]">STREAMING</span>
                      </div>
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-[#1F1F23]">
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Time</th>
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Type</th>
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Symbol</th>
                          <th className="text-center text-xs text-[#A0A0A5] p-3">Side</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">Strike</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">Expiry</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">Size</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">Premium</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">IV</th>
                          <th className="text-center text-xs text-[#A0A0A5] p-3">Signal</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orderFlow.map((flow, idx) => (
                          <tr key={idx} className="border-b border-[#1F1F23] hover:bg-[#151519] transition-colors">
                            <td className="p-3 text-sm text-[#A0A0A5]">{flow.time}</td>
                            <td className="p-3">
                              <Badge className={`text-xs ${
                                flow.type === "SWEEP" ? "bg-[#FF9800]/20 text-[#FF9800] border-[#FF9800]/30" :
                                flow.type === "BLOCK" ? "bg-[#2979FF]/20 text-[#2979FF] border-[#2979FF]/30" :
                                "bg-[#A0A0A5]/20 text-[#A0A0A5] border-[#A0A0A5]/30"
                              }`}>
                                {flow.type}
                              </Badge>
                            </td>
                            <td className="p-3 text-sm">{flow.symbol}</td>
                            <td className="p-3 text-center">
                              <Badge className={`text-xs ${
                                flow.side === "CALL" ? "bg-[#00E0A4]/20 text-[#00E0A4] border-[#00E0A4]/30" : 
                                "bg-[#FF5252]/20 text-[#FF5252] border-[#FF5252]/30"
                              }`}>
                                {flow.side}
                              </Badge>
                            </td>
                            <td className="p-3 text-sm text-right">${flow.strike}</td>
                            <td className="p-3 text-sm text-right text-[#A0A0A5]">{flow.expiry}</td>
                            <td className="p-3 text-sm text-right">{flow.size}</td>
                            <td className="p-3 text-sm text-right text-[#2979FF]">{flow.premium}</td>
                            <td className="p-3 text-sm text-right">{flow.iv}%</td>
                            <td className="p-3 text-center">
                              <Badge className={`text-xs ${
                                flow.tag === "BULLISH" ? "bg-[#00E0A4]/20 text-[#00E0A4] border-[#00E0A4]/30" :
                                flow.tag === "BEARISH" ? "bg-[#FF5252]/20 text-[#FF5252] border-[#FF5252]/30" :
                                "bg-[#A0A0A5]/20 text-[#A0A0A5] border-[#A0A0A5]/30"
                              }`}>
                                {flow.tag}
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Flow Summary */}
                <div className="grid grid-cols-4 gap-4">
                  {[
                    { label: "Total Premium (1H)", value: "$324.8M", change: "+$87.4M", trend: "up" },
                    { label: "Call/Put Ratio", value: "2.34", change: "+0.56", trend: "up" },
                    { label: "Bullish Flow %", value: "67.8%", change: "+12.4%", trend: "up" },
                    { label: "Dark Pool Index", value: "142.3", change: "+8.7", trend: "up" },
                  ].map((stat, idx) => (
                    <div key={idx} className="bg-[#0D0D0F]/80 backdrop-blur-xl rounded-lg border border-[#2979FF]/20 p-4">
                      <div className="text-xs text-[#A0A0A5] mb-2">{stat.label}</div>
                      <div className="text-2xl mb-1">{stat.value}</div>
                      <div className={`text-xs flex items-center gap-1 ${
                        stat.trend === "up" ? "text-[#00E0A4]" : "text-[#FF5252]"
                      }`}>
                        {stat.trend === "up" ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                        {stat.change}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* SECTOR ROTATION */}
            <TabsContent value="sectors" className="mt-0">
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-[#00E0A4]/10 to-[#2979FF]/10 rounded-lg border border-[#00E0A4]/20 p-4 text-center">
                  <h2 className="text-lg mb-1 bg-gradient-to-r from-[#00E0A4] to-[#2979FF] bg-clip-text text-transparent">
                    Sector Rotation & Money Flow Analysis
                  </h2>
                  <p className="text-xs text-[#A0A0A5]">
                    Track institutional capital movement across market sectors
                  </p>
                </div>

                {/* Sector Analysis */}
                <div className="bg-[#0D0D0F]/80 backdrop-blur-xl rounded-lg border border-[#2979FF]/20 p-4">
                  <div className="flex items-center gap-2 mb-4">
                    <Building2 className="w-5 h-5 text-[#00E0A4]" />
                    <h3 className="text-sm">Sector Momentum & Capital Flows</h3>
                  </div>
                  <div className="space-y-3">
                    {sectorRotation.map((sector, idx) => (
                      <div key={idx} className="bg-[#151519] rounded-lg p-4 hover:bg-[#1F1F23] transition-colors">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="text-sm w-32">{sector.sector}</div>
                            <Badge className={`text-xs ${
                              sector.strength.includes("BUY") ? "bg-[#00E0A4]/20 text-[#00E0A4] border-[#00E0A4]/30" :
                              sector.strength.includes("SELL") ? "bg-[#FF5252]/20 text-[#FF5252] border-[#FF5252]/30" :
                              "bg-[#A0A0A5]/20 text-[#A0A0A5] border-[#A0A0A5]/30"
                            }`}>
                              {sector.strength}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <div className="text-xs text-[#A0A0A5]">Flow (24H)</div>
                              <div className={`text-sm ${
                                sector.flow.startsWith("+") ? "text-[#00E0A4]" : "text-[#FF5252]"
                              }`}>
                                {sector.flow}
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-xs text-[#A0A0A5]">Change</div>
                              <div className={`text-sm ${
                                sector.change.startsWith("+") ? "text-[#00E0A4]" : "text-[#FF5252]"
                              }`}>
                                {sector.change}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-[#A0A0A5]">Momentum Score</span>
                            <span>{sector.momentum}/100</span>
                          </div>
                          <div className="w-full bg-[#1F1F23] rounded-full h-2 overflow-hidden">
                            <div 
                              className={`h-full rounded-full transition-all ${
                                sector.momentum >= 70 ? "bg-[#00E0A4]" : 
                                sector.momentum >= 50 ? "bg-[#2979FF]" : 
                                sector.momentum >= 30 ? "bg-[#FF9800]" : "bg-[#FF5252]"
                              }`}
                              style={{ width: `${sector.momentum}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
          </div>
        </ScrollArea>
      </Tabs>
    </div>
  );
}
