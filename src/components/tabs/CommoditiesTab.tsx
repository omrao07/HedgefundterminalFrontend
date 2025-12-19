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
  Flame,
  Droplet,
  Zap,
  Wheat,
  Coffee,
  DollarSign,
  Activity,
  BarChart3,
  LineChart,
  PieChart,
  AlertTriangle,
  TrendingUpIcon,
  ArrowUpRight,
  ArrowDownRight,
  Waves,
  Ship,
  Globe2,
  ChevronUp,
  ChevronDown,
  Search
} from "lucide-react";

export function CommoditiesTab() {
  const [activeView, setActiveView] = useState("overview");
  const [selectedCommodity, setSelectedCommodity] = useState("WTI");
  const [selectedExpiry, setSelectedExpiry] = useState("3M");
  const [selectedStrike, setSelectedStrike] = useState(80);
  const [volSurfaceView, setVolSurfaceView] = useState("heatmap");
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

  // Commodity live prices
  const commodities = [
    { 
      symbol: "WTI", 
      name: "WTI Crude Oil", 
      price: 78.45, 
      change: 2.34, 
      changePercent: 3.07,
      volume: "423.2M",
      openInterest: "2.84M",
      spread: "4.22",
      category: "Energy",
      icon: Flame,
      color: "#FF9800"
    },
    { 
      symbol: "BRENT", 
      name: "Brent Crude", 
      price: 82.67, 
      change: 2.12, 
      changePercent: 2.63,
      volume: "387.5M",
      openInterest: "2.21M",
      spread: "0.15",
      category: "Energy",
      icon: Flame,
      color: "#FF5252"
    },
    { 
      symbol: "NG", 
      name: "Natural Gas", 
      price: 2.84, 
      change: -0.15, 
      changePercent: -5.02,
      volume: "1.2B",
      openInterest: "4.56M",
      spread: "0.08",
      category: "Energy",
      icon: Waves,
      color: "#2979FF"
    },
    { 
      symbol: "GC", 
      name: "Gold", 
      price: 2034.50, 
      change: -12.30, 
      changePercent: -0.60,
      volume: "284.7M",
      openInterest: "523K",
      spread: "0.50",
      category: "Metals",
      icon: Zap,
      color: "#FFD700"
    },
    { 
      symbol: "SI", 
      name: "Silver", 
      price: 23.67, 
      change: 0.45, 
      changePercent: 1.94,
      volume: "156.3M",
      openInterest: "178K",
      spread: "0.04",
      category: "Metals",
      icon: Zap,
      color: "#C0C0C0"
    },
    { 
      symbol: "HG", 
      name: "Copper", 
      price: 3.89, 
      change: 0.08, 
      changePercent: 2.10,
      volume: "89.4M",
      openInterest: "234K",
      spread: "0.02",
      category: "Metals",
      icon: Activity,
      color: "#FF6B35"
    },
    { 
      symbol: "ZW", 
      name: "Wheat", 
      price: 645.25, 
      change: -8.50, 
      changePercent: -1.30,
      volume: "67.8M",
      openInterest: "387K",
      spread: "2.50",
      category: "Agriculture",
      icon: Wheat,
      color: "#F4A460"
    },
    { 
      symbol: "ZC", 
      name: "Corn", 
      price: 478.75, 
      change: 5.25, 
      changePercent: 1.11,
      volume: "124.5M",
      openInterest: "1.52M",
      spread: "1.75",
      category: "Agriculture",
      icon: Wheat,
      color: "#FFA500"
    },
    { 
      symbol: "ZS", 
      name: "Soybeans", 
      price: 1289.50, 
      change: 12.75, 
      changePercent: 1.00,
      volume: "98.2M",
      openInterest: "687K",
      spread: "3.25",
      category: "Agriculture",
      icon: Wheat,
      color: "#8FBC8F"
    },
    { 
      symbol: "KC", 
      name: "Coffee", 
      price: 198.30, 
      change: -3.20, 
      changePercent: -1.59,
      volume: "45.7M",
      openInterest: "245K",
      spread: "1.15",
      category: "Softs",
      icon: Coffee,
      color: "#8B4513"
    },
    { 
      symbol: "SB", 
      name: "Sugar", 
      price: 22.45, 
      change: 0.67, 
      changePercent: 3.08,
      volume: "87.3M",
      openInterest: "892K",
      spread: "0.12",
      category: "Softs",
      icon: Droplet,
      color: "#F8F8FF"
    },
    { 
      symbol: "CT", 
      name: "Cotton", 
      price: 84.32, 
      change: -1.45, 
      changePercent: -1.69,
      volume: "34.2M",
      openInterest: "178K",
      spread: "0.45",
      category: "Softs",
      icon: Globe2,
      color: "#F5F5DC"
    },
  ];

  // Futures curve data
  const futuresCurve = [
    { month: "Nov 24", price: 78.45, openInterest: "284K", volume: "423M" },
    { month: "Dec 24", price: 79.20, openInterest: "567K", volume: "387M" },
    { month: "Jan 25", price: 79.85, openInterest: "423K", volume: "234M" },
    { month: "Feb 25", price: 80.50, openInterest: "389K", volume: "187M" },
    { month: "Mar 25", price: 81.10, openInterest: "445K", volume: "298M" },
    { month: "Apr 25", price: 81.65, openInterest: "378K", volume: "156M" },
    { month: "May 25", price: 82.15, openInterest: "334K", volume: "134M" },
    { month: "Jun 25", price: 82.60, openInterest: "412K", volume: "198M" },
    { month: "Jul 25", price: 83.00, openInterest: "356K", volume: "145M" },
    { month: "Aug 25", price: 83.35, openInterest: "289K", volume: "112M" },
    { month: "Sep 25", price: 83.65, openInterest: "267K", volume: "98M" },
    { month: "Oct 25", price: 83.90, openInterest: "234K", volume: "87M" },
  ];

  // Options chain data
  const optionsChain = [
    { 
      strike: 75, 
      callBid: 5.20, callAsk: 5.35, callIV: 28.4, callDelta: 0.78, callGamma: 0.023, callTheta: -0.12, callVega: 0.18, callOI: "45.2K", callVol: "12.3K",
      putBid: 1.85, putAsk: 1.95, putIV: 32.1, putDelta: -0.22, putGamma: 0.023, putTheta: -0.09, putVega: 0.18, putOI: "23.4K", putVol: "8.9K"
    },
    { 
      strike: 76, 
      callBid: 4.45, callAsk: 4.60, callIV: 27.8, callDelta: 0.72, callGamma: 0.028, callTheta: -0.14, callVega: 0.21, callOI: "67.8K", callVol: "18.7K",
      putBid: 2.15, putAsk: 2.25, putIV: 31.5, putDelta: -0.28, putGamma: 0.028, putTheta: -0.11, putVega: 0.21, putOI: "34.5K", putVol: "11.2K"
    },
    { 
      strike: 77, 
      callBid: 3.75, callAsk: 3.90, callIV: 27.2, callDelta: 0.65, callGamma: 0.032, callTheta: -0.16, callVega: 0.24, callOI: "89.3K", callVol: "24.5K",
      putBid: 2.50, putAsk: 2.60, putIV: 30.8, putDelta: -0.35, putGamma: 0.032, putTheta: -0.13, putVega: 0.24, putOI: "45.7K", putVol: "15.3K"
    },
    { 
      strike: 78, 
      callBid: 3.10, callAsk: 3.25, callIV: 26.5, callDelta: 0.57, callGamma: 0.035, callTheta: -0.18, callVega: 0.27, callOI: "124.5K", callVol: "42.8K",
      putBid: 2.90, putAsk: 3.00, putIV: 30.2, putDelta: -0.43, putGamma: 0.035, putTheta: -0.15, putVega: 0.27, putOI: "67.9K", putVol: "23.4K"
    },
    { 
      strike: 79, 
      callBid: 2.50, callAsk: 2.65, callIV: 25.8, callDelta: 0.48, callGamma: 0.037, callTheta: -0.19, callVega: 0.29, callOI: "156.7K", callVol: "56.3K",
      putBid: 3.35, putAsk: 3.45, putIV: 29.5, putDelta: -0.52, putGamma: 0.037, putTheta: -0.17, putVega: 0.29, putOI: "89.2K", putVol: "31.7K"
    },
    { 
      strike: 80, 
      callBid: 1.95, callAsk: 2.10, callIV: 25.0, callDelta: 0.38, callGamma: 0.038, callTheta: -0.20, callVega: 0.31, callOI: "234.8K", callVol: "87.4K",
      putBid: 3.85, putAsk: 3.95, putIV: 28.8, putDelta: -0.62, putGamma: 0.038, putTheta: -0.19, putVega: 0.31, putOI: "178.3K", putVol: "54.2K"
    },
    { 
      strike: 81, 
      callBid: 1.45, callAsk: 1.60, callIV: 24.2, callDelta: 0.28, callGamma: 0.036, callTheta: -0.18, callVega: 0.29, callOI: "187.5K", callVol: "45.6K",
      putBid: 4.40, putAsk: 4.50, putIV: 28.0, putDelta: -0.72, putGamma: 0.036, putTheta: -0.20, putVega: 0.29, putOI: "134.7K", putVol: "38.9K"
    },
    { 
      strike: 82, 
      callBid: 1.05, callAsk: 1.20, callIV: 23.5, callDelta: 0.19, callGamma: 0.032, callTheta: -0.15, callVega: 0.26, callOI: "145.2K", callVol: "32.1K",
      putBid: 5.00, putAsk: 5.10, putIV: 27.2, putDelta: -0.81, putGamma: 0.032, putTheta: -0.21, putVega: 0.26, putOI: "98.4K", putVol: "25.7K"
    },
  ];

  // Order flow / whale activity
  const orderFlow = [
    { time: "14:32:18", type: "SWEEP", side: "CALL", strike: 80, expiry: "Nov 30", size: "2,340", premium: "$4.58M", iv: 26.2, tag: "BULLISH" },
    { time: "14:28:45", type: "BLOCK", side: "PUT", strike: 75, expiry: "Dec 15", size: "5,670", premium: "$10.7M", iv: 31.8, tag: "BEARISH" },
    { time: "14:21:33", type: "DARK POOL", side: "CALL", strike: 82, expiry: "Jan 15", size: "8,920", premium: "$9.2M", iv: 24.1, tag: "NEUTRAL" },
    { time: "14:15:12", type: "SWEEP", side: "CALL", strike: 78, expiry: "Nov 22", size: "1,450", premium: "$4.1M", iv: 27.5, tag: "BULLISH" },
    { time: "14:08:47", type: "CROSS", side: "PUT", strike: 79, expiry: "Dec 8", size: "3,280", premium: "$11.0M", iv: 29.3, tag: "HEDGING" },
  ];

  // Macro signals
  const macroSignals = [
    { indicator: "Recession Probability", value: "34%", change: "+3%", status: "rising", severity: "MEDIUM" },
    { indicator: "CPI (YoY)", value: "3.4%", change: "+0.1%", status: "rising", severity: "HIGH" },
    { indicator: "PPI (YoY)", value: "2.7%", change: "-0.2%", status: "falling", severity: "LOW" },
    { indicator: "WTI Crack Spread", value: "$18.45", change: "+$2.34", status: "rising", severity: "LOW" },
    { indicator: "DXY (USD Index)", value: "105.84", change: "+0.42", status: "rising", severity: "MEDIUM" },
    { indicator: "10Y Treasury", value: "4.58%", change: "+0.08%", status: "rising", severity: "MEDIUM" },
    { indicator: "FX Vol Index", value: "8.94", change: "+0.43", status: "rising", severity: "LOW" },
    { indicator: "VIX", value: "16.23", change: "-0.87", status: "falling", severity: "LOW" },
  ];

  // Storage data
  const storageData = [
    { facility: "Cushing, OK (WTI Hub)", capacity: "91M bbl", current: "68.4M bbl", utilization: 75.2, change: "+2.4%" },
    { facility: "Strategic Petroleum Reserve", capacity: "727M bbl", current: "421M bbl", utilization: 57.9, change: "-1.2%" },
    { facility: "Gulf Coast Refineries", capacity: "8.5M bpd", current: "7.6M bpd", utilization: 89.4, change: "+0.8%" },
    { facility: "Henry Hub (Nat Gas)", capacity: "645 Bcf", current: "3,847 Bcf", utilization: 84.3, change: "+3.2%" },
  ];

  // News feed
  const commodityNews = [
    { time: "14:45", headline: "OPEC+ Extends Production Cuts Through Q2 2025", impact: "CRITICAL", source: "REUTERS" },
    { time: "13:22", headline: "EIA Reports Crude Inventories Drop 5.2M Barrels", impact: "HIGH", source: "EIA" },
    { time: "12:08", headline: "USDA Lowers Corn Yield Estimates by 3.4%", impact: "MEDIUM", source: "USDA" },
    { time: "11:34", headline: "Hurricane Threat to Gulf Production Platforms", impact: "HIGH", source: "NOAA" },
    { time: "10:15", headline: "China Increases Copper Import Quotas 18%", impact: "MEDIUM", source: "BLOOMBERG" },
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

  const getSelectedCommodityName = () => {
    const commodity = commodities.find(c => c.symbol === selectedCommodity);
    return commodity ? commodity.name : selectedCommodity;
  };

  // Generate mock price data for charts
  const generatePriceData = (symbol: string, timeframe: string) => {
    const dataPoints = timeframe === "1D" ? 78 : timeframe === "1W" ? 35 : timeframe === "1M" ? 30 : timeframe === "3M" ? 90 : 252;
    const commodity = commodities.find(c => c.symbol === symbol);
    const basePrice = commodity?.price || 78;
    
    const data = [];
    for (let i = 0; i < dataPoints; i++) {
      const volatility = 0.03;
      const trend = 0.0002;
      const random = (Math.random() - 0.5) * volatility;
      const price = basePrice * (1 + trend * i + random);
      const open = price * (1 + (Math.random() - 0.5) * 0.008);
      const close = price * (1 + (Math.random() - 0.5) * 0.008);
      const high = Math.max(open, close) * (1 + Math.random() * 0.015);
      const low = Math.min(open, close) * (1 - Math.random() * 0.015);
      const volume = Math.random() * 5000000 + 2000000;
      
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

  return (
    <div className="h-[calc(100vh-120px)]">
      <Tabs value={activeView} onValueChange={setActiveView} className="h-full flex flex-col">
        <TabsList className="bg-[#1F1F23] border-b-2 border-[#2979FF]/20 rounded-none w-full justify-start p-0 h-12">
          <TabsTrigger value="overview" className="data-[state=active]:bg-[#151519] data-[state=active]:text-[#00E0A4] data-[state=active]:border-[#00E0A4] bg-transparent text-[#A0A0A5] hover:text-[#E8E8E8] hover:bg-[#151519]/50 rounded-none border-b-2 border-transparent px-6 whitespace-nowrap transition-all text-xs">
            Commodities Overview
          </TabsTrigger>
          <TabsTrigger value="futures" className="data-[state=active]:bg-[#151519] data-[state=active]:text-[#00E0A4] data-[state=active]:border-[#00E0A4] bg-transparent text-[#A0A0A5] hover:text-[#E8E8E8] hover:bg-[#151519]/50 rounded-none border-b-2 border-transparent px-6 whitespace-nowrap transition-all text-xs">
            Futures Curve
          </TabsTrigger>
          <TabsTrigger value="options" className="data-[state=active]:bg-[#151519] data-[state=active]:text-[#00E0A4] data-[state=active]:border-[#00E0A4] bg-transparent text-[#A0A0A5] hover:text-[#E8E8E8] hover:bg-[#151519]/50 rounded-none border-b-2 border-transparent px-6 whitespace-nowrap transition-all text-xs">
            Options Chain + Greeks
          </TabsTrigger>
        </TabsList>

        <ScrollArea className="flex-1">
          <div className="p-4">
            {/* COMMODITIES OVERVIEW */}
            <TabsContent value="overview" className="mt-0">
              <div className="space-y-4">
                {/* Tagline */}
                <div className="bg-gradient-to-r from-[#2979FF]/10 to-[#00E0A4]/10 rounded-lg border border-[#2979FF]/20 p-6 text-center">
                  <h1 className="text-2xl mb-2 bg-gradient-to-r from-[#2979FF] to-[#00E0A4] bg-clip-text text-transparent">
                    Command the Global Commodity Cycle
                  </h1>
                  <p className="text-sm text-[#A0A0A5]">
                    Real-time intelligence • Futures & Options • Macro Signals • Supply Chain Data
                  </p>
                </div>

                {/* Macro Signals Dashboard */}
                <div className="bg-[#0D0D0F]/80 backdrop-blur-xl rounded-lg border border-[#2979FF]/20 p-4">
                  <div className="flex items-center gap-2 mb-4">
                    <Activity className="w-5 h-5 text-[#FF9800]" />
                    <h3 className="text-sm">Macro Signals & Economic Indicators</h3>
                  </div>
                  <div className="grid grid-cols-4 gap-4">
                    {macroSignals.map((signal, idx) => (
                      <div key={idx} className="bg-[#151519] rounded-lg p-4 hover:bg-[#1F1F23] transition-colors">
                        <div className="flex items-center justify-between mb-2">
                          <div className="text-xs text-[#A0A0A5]">{signal.indicator}</div>
                          <Badge className={`text-xs ${getSeverityColor(signal.severity)}`}>
                            {signal.severity}
                          </Badge>
                        </div>
                        <div className="text-2xl mb-1">{signal.value}</div>
                        <div className={`text-xs flex items-center gap-1 ${
                          signal.status === "rising" ? "text-[#FF9800]" : "text-[#00E0A4]"
                        }`}>
                          {signal.status === "rising" ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                          {signal.change}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Commodity Price Matrix */}
                <div className="bg-[#0D0D0F]/80 backdrop-blur-xl rounded-lg border border-[#2979FF]/20 p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <BarChart3 className="w-5 h-5 text-[#00E0A4]" />
                      <h3 className="text-sm">Live Commodity Prices</h3>
                    </div>
                    <div className="flex items-center gap-4">
                      {/* Search Input */}
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A0A0A5]" />
                        <input
                          type="text"
                          placeholder="Search commodities..."
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
                    {commodities.filter(commodity => 
                      searchQuery === "" || 
                      commodity.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      commodity.name.toLowerCase().includes(searchQuery.toLowerCase())
                    ).map((commodity, idx) => {
                      const Icon = commodity.icon;
                      return (
                        <div 
                          key={idx} 
                          className={`bg-[#151519] rounded-lg p-4 hover:bg-[#1F1F23] transition-all cursor-pointer border ${
                            selectedCommodity === commodity.symbol 
                              ? "border-[#00E0A4] shadow-lg shadow-[#00E0A4]/20" 
                              : "border-transparent hover:border-[#2979FF]/40"
                          }`}
                          onClick={() => {
                            setSelectedCommodity(commodity.symbol);
                            setDetailedView(commodity.symbol);
                          }}
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <Icon className="w-5 h-5" style={{ color: commodity.color }} />
                              <div>
                                <div className="text-sm">{commodity.symbol}</div>
                                <div className="text-xs text-[#A0A0A5]">{commodity.name}</div>
                              </div>
                            </div>
                            <Badge className={`text-xs ${
                              commodity.change >= 0 ? 
                              "bg-[#00E0A4]/20 text-[#00E0A4] border-[#00E0A4]/30" : 
                              "bg-[#FF5252]/20 text-[#FF5252] border-[#FF5252]/30"
                            }`}>
                              {commodity.category}
                            </Badge>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-end justify-between">
                              <div className="text-2xl">${commodity.price.toFixed(2)}</div>
                              <div className={`text-sm flex items-center gap-1 ${
                                commodity.change >= 0 ? "text-[#00E0A4]" : "text-[#FF5252]"
                              }`}>
                                {commodity.change >= 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                                {commodity.changePercent >= 0 ? "+" : ""}{commodity.changePercent.toFixed(2)}%
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-2 text-xs">
                              <div>
                                <div className="text-[#A0A0A5]">Volume</div>
                                <div>{commodity.volume}</div>
                              </div>
                              <div>
                                <div className="text-[#A0A0A5]">OI</div>
                                <div>{commodity.openInterest}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                    {commodities.filter(commodity => 
                      searchQuery === "" || 
                      commodity.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      commodity.name.toLowerCase().includes(searchQuery.toLowerCase())
                    ).length === 0 && (
                      <div className="col-span-4 text-center py-12 text-[#A0A0A5]">
                        No commodities found matching "{searchQuery}"
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
                            {commodities.find(c => c.symbol === detailedView)?.name}
                          </p>
                        </div>
                        <Badge className="bg-[#00E0A4]/20 text-[#00E0A4] border-[#00E0A4]/30">
                          ${commodities.find(c => c.symbol === detailedView)?.price.toFixed(2)}
                        </Badge>
                        <Badge className={`${
                          (commodities.find(c => c.symbol === detailedView)?.change || 0) >= 0 
                            ? "bg-[#00E0A4]/20 text-[#00E0A4] border-[#00E0A4]/30" 
                            : "bg-[#FF5252]/20 text-[#FF5252] border-[#FF5252]/30"
                        }`}>
                          {(commodities.find(c => c.symbol === detailedView)?.changePercent || 0) >= 0 ? "+" : ""}
                          {commodities.find(c => c.symbol === detailedView)?.changePercent.toFixed(2)}%
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
                                const height = (candle.volume / 10000000) * 100;
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
                              <div className="text-xs text-[#00E0A4]">52.3</div>
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
                                <span className="text-[#2979FF]">MACD: 0.32</span>
                                <span className="text-[#FF9800]">Signal: 0.24</span>
                                <span className="text-[#00E0A4]">Hist: 0.08</span>
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
                          <h4 className="text-xs text-[#A0A0A5] mb-3">Contract Specifications</h4>
                          <div className="space-y-2 text-xs">
                            {[
                              { label: "Contract Size", value: "1,000 bbls" },
                              { label: "Tick Size", value: "$0.01 ($10)" },
                              { label: "Trading Hours", value: "23hrs/day" },
                              { label: "Settlement", value: "Physical" },
                              { label: "Exchange", value: "NYMEX" },
                              { label: "Margin (Init)", value: "$4,850" },
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
                          <h4 className="text-xs text-[#A0A0A5] mb-3">Key Levels</h4>
                          <div className="space-y-2">
                            {[
                              { type: "R3", price: 85.50, distance: "+8.98%" },
                              { type: "R2", price: 82.20, distance: "+4.78%" },
                              { type: "R1", price: 80.80, distance: "+2.99%" },
                              { type: "S1", price: 76.90, distance: "-1.98%" },
                              { type: "S2", price: 74.20, distance: "-5.42%" },
                              { type: "S3", price: 71.50, distance: "-8.86%" },
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

                        {/* Supply/Demand Metrics */}
                        <div className="bg-[#151519] rounded-lg border border-[#2979FF]/20 p-3">
                          <h4 className="text-xs text-[#A0A0A5] mb-3">Supply & Demand</h4>
                          <div className="space-y-2 text-xs">
                            <div className="flex justify-between">
                              <span className="text-[#A0A0A5]">Global Demand</span>
                              <span>102.3M bpd</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-[#A0A0A5]">Global Supply</span>
                              <span>101.8M bpd</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-[#A0A0A5]">Balance</span>
                              <span className="text-[#FF5252]">-0.5M deficit</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-[#A0A0A5]">OPEC+ Quota</span>
                              <span>39.7M bpd</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-[#A0A0A5]">US Production</span>
                              <span>13.2M bpd</span>
                            </div>
                          </div>
                        </div>

                        {/* Seasonal Pattern */}
                        <div className="bg-[#151519] rounded-lg border border-[#2979FF]/20 p-3">
                          <h4 className="text-xs text-[#A0A0A5] mb-3">Seasonal Tendency</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between text-xs">
                              <span className="text-[#A0A0A5]">Current Month</span>
                              <Badge className="bg-[#00E0A4]/20 text-[#00E0A4] border-[#00E0A4]/30">
                                Bullish
                              </Badge>
                            </div>
                            <div className="flex justify-between text-xs">
                              <span className="text-[#A0A0A5]">Historical Avg</span>
                              <span className="text-[#00E0A4]">+4.8%</span>
                            </div>
                            <div className="flex justify-between text-xs">
                              <span className="text-[#A0A0A5]">Win Rate</span>
                              <span>68%</span>
                            </div>
                            <div className="flex justify-between text-xs">
                              <span className="text-[#A0A0A5]">Best Month</span>
                              <span>January</span>
                            </div>
                            <div className="flex justify-between text-xs">
                              <span className="text-[#A0A0A5]">Worst Month</span>
                              <span>August</span>
                            </div>
                          </div>
                        </div>

                        {/* COT Report */}
                        <div className="bg-[#151519] rounded-lg border border-[#2979FF]/20 p-3">
                          <h4 className="text-xs text-[#A0A0A5] mb-3">COT Positioning</h4>
                          <div className="space-y-2 text-xs">
                            <div className="flex justify-between">
                              <span className="text-[#A0A0A5]">Commercials</span>
                              <span className="text-[#FF5252]">-234.5K</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-[#A0A0A5]">Large Specs</span>
                              <span className="text-[#00E0A4]">+187.2K</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-[#A0A0A5]">Small Specs</span>
                              <span className="text-[#00E0A4]">+47.3K</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-[#A0A0A5]">Net Change</span>
                              <span className="text-[#00E0A4]">+12.4K</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  {/* Storage & Supply Data */}
                  <div className="bg-[#0D0D0F]/80 backdrop-blur-xl rounded-lg border border-[#2979FF]/20 p-4">
                    <div className="flex items-center gap-2 mb-4">
                      <Ship className="w-5 h-5 text-[#2979FF]" />
                      <h3 className="text-sm">Storage & Supply Infrastructure</h3>
                    </div>
                    <div className="space-y-3">
                      {storageData.map((storage, idx) => (
                        <div key={idx} className="bg-[#151519] rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="text-sm">{storage.facility}</div>
                            <div className={`text-xs ${
                              storage.change.startsWith("+") ? "text-[#FF9800]" : "text-[#00E0A4]"
                            }`}>
                              {storage.change}
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-3 mb-3 text-xs">
                            <div>
                              <div className="text-[#A0A0A5]">Capacity</div>
                              <div>{storage.capacity}</div>
                            </div>
                            <div>
                              <div className="text-[#A0A0A5]">Current</div>
                              <div>{storage.current}</div>
                            </div>
                          </div>
                          <div className="space-y-1">
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-[#A0A0A5]">Utilization</span>
                              <span>{storage.utilization.toFixed(1)}%</span>
                            </div>
                            <div className="w-full bg-[#1F1F23] rounded-full h-2 overflow-hidden">
                              <div 
                                className={`h-full rounded-full transition-all ${
                                  storage.utilization >= 80 ? "bg-[#FF5252]" : 
                                  storage.utilization >= 60 ? "bg-[#FF9800]" : "bg-[#00E0A4]"
                                }`}
                                style={{ width: `${storage.utilization}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Commodity News Feed */}
                  <div className="bg-[#0D0D0F]/80 backdrop-blur-xl rounded-lg border border-[#2979FF]/20 p-4">
                    <div className="flex items-center gap-2 mb-4">
                      <AlertTriangle className="w-5 h-5 text-[#FF5252]" />
                      <h3 className="text-sm">Commodity Intelligence Feed</h3>
                    </div>
                    <div className="space-y-3">
                      {commodityNews.map((news, idx) => (
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

            {/* FUTURES CURVE VIEW */}
            <TabsContent value="futures" className="mt-0">
              <div className="space-y-4">
                {/* Futures Curve Chart */}
                <div className="bg-[#0D0D0F]/80 backdrop-blur-xl rounded-lg border border-[#2979FF]/20 p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <LineChart className="w-5 h-5 text-[#2979FF]" />
                      <h3 className="text-sm">Futures Curve - {getSelectedCommodityName()}</h3>
                      <Badge className="bg-[#00E0A4]/20 text-[#00E0A4] border-[#00E0A4]/30 text-xs">
                        {selectedExpiry}
                      </Badge>
                    </div>
                    <div className="flex gap-2">
                      {["1M", "3M", "6M", "1Y", "2Y"].map((period) => (
                        <button
                          key={period}
                          onClick={() => setSelectedExpiry(period)}
                          className={`text-xs px-3 py-1 rounded transition-all ${
                            selectedExpiry === period
                              ? "bg-[#2979FF]/20 text-[#2979FF] border border-[#2979FF]/30"
                              : "text-[#A0A0A5] hover:bg-[#151519] border border-transparent"
                          }`}
                        >
                          {period}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Curve visualization */}
                  <div className="relative h-[300px] bg-[#000000] rounded-lg border border-[#1F1F23] p-4">
                    {/* Y-axis labels */}
                    <div className="absolute left-2 top-4 bottom-4 flex flex-col justify-between text-xs text-[#A0A0A5]">
                      <span>$84</span>
                      <span>$82</span>
                      <span>$80</span>
                      <span>$78</span>
                      <span>$76</span>
                    </div>

                    {/* Chart area */}
                    <div className="ml-8 h-full flex items-end gap-[2px]">
                      {futuresCurve.map((point, idx) => {
                        const height = ((point.price - 76) / 8) * 100;
                        return (
                          <div key={idx} className="flex-1 flex flex-col items-center gap-1 group">
                            <div className="relative w-full">
                              <div 
                                className="w-full bg-gradient-to-t from-[#2979FF] to-[#00E0A4] rounded-t hover:opacity-80 transition-opacity cursor-pointer"
                                style={{ height: `${height * 2.5}px` }}
                              >
                                {/* Tooltip */}
                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-[#0D0D0F]/95 backdrop-blur-sm border border-[#2979FF]/40 rounded-lg p-2 text-xs whitespace-nowrap z-10">
                                  <div className="text-sm mb-1">${point.price.toFixed(2)}</div>
                                  <div className="text-[#A0A0A5]">OI: {point.openInterest}</div>
                                  <div className="text-[#A0A0A5]">Vol: {point.volume}</div>
                                </div>
                              </div>
                            </div>
                            <div className="text-[10px] text-[#A0A0A5] rotate-45 origin-top-left whitespace-nowrap">
                              {point.month}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Contango/Backwardation indicator */}
                    <div className="absolute top-4 right-4 bg-[#0D0D0F]/90 backdrop-blur-sm border border-[#00E0A4]/30 rounded-lg px-3 py-2">
                      <div className="text-xs text-[#A0A0A5] mb-1">Market Structure</div>
                      <div className="text-sm text-[#00E0A4] flex items-center gap-2">
                        <ChevronUp className="w-4 h-4" />
                        CONTANGO
                      </div>
                      <div className="text-xs text-[#A0A0A5] mt-1">+$5.45 spread</div>
                    </div>
                  </div>
                </div>

                {/* Futures Contract Details */}
                <div className="bg-[#0D0D0F]/80 backdrop-blur-xl rounded-lg border border-[#2979FF]/20">
                  <div className="p-4 border-b border-[#1F1F23]">
                    <h3 className="text-sm">Contract Details & Open Interest</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-[#1F1F23]">
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Expiry</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">Price</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">Change</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">Open Interest</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">Volume</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">OI Change</th>
                        </tr>
                      </thead>
                      <tbody>
                        {futuresCurve.map((contract, idx) => (
                          <tr key={idx} className="border-b border-[#1F1F23] hover:bg-[#151519] transition-colors">
                            <td className="p-3 text-sm">{contract.month}</td>
                            <td className="p-3 text-sm text-right">${contract.price.toFixed(2)}</td>
                            <td className="p-3 text-sm text-right text-[#00E0A4]">
                              {idx > 0 ? `+$${(contract.price - futuresCurve[idx - 1].price).toFixed(2)}` : "-"}
                            </td>
                            <td className="p-3 text-sm text-right">{contract.openInterest}</td>
                            <td className="p-3 text-sm text-right text-[#2979FF]">{contract.volume}</td>
                            <td className="p-3 text-sm text-right">
                              <div className="flex items-center gap-2 justify-end">
                                <span className={Math.random() > 0.5 ? "text-[#00E0A4]" : "text-[#FF5252]"}>
                                  {Math.random() > 0.5 ? "+" : "-"}{(Math.random() * 5).toFixed(1)}%
                                </span>
                                <div className="w-16 bg-[#1F1F23] rounded-full h-2 overflow-hidden">
                                  <div 
                                    className={`h-full rounded-full ${Math.random() > 0.5 ? "bg-[#00E0A4]" : "bg-[#FF5252]"}`}
                                    style={{ width: `${Math.random() * 100}%` }}
                                  />
                                </div>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Seasonal Analysis */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#0D0D0F]/80 backdrop-blur-xl rounded-lg border border-[#2979FF]/20 p-4">
                    <div className="flex items-center gap-2 mb-4">
                      <PieChart className="w-5 h-5 text-[#00E0A4]" />
                      <h3 className="text-sm">Seasonal Pattern Analysis</h3>
                    </div>
                    <div className="space-y-3">
                      {[
                        { season: "Winter (Nov-Jan)", avg: "+8.4%", current: "+6.2%", strength: "BULLISH" },
                        { season: "Spring (Feb-Apr)", avg: "-2.1%", current: "-1.8%", strength: "NEUTRAL" },
                        { season: "Summer (May-Jul)", avg: "+12.7%", current: "+14.3%", strength: "BULLISH" },
                        { season: "Fall (Aug-Oct)", avg: "-5.3%", current: "-4.1%", strength: "BEARISH" },
                      ].map((season, idx) => (
                        <div key={idx} className="bg-[#151519] rounded-lg p-3">
                          <div className="flex items-center justify-between mb-2">
                            <div className="text-sm">{season.season}</div>
                            <Badge className={`text-xs ${
                              season.strength === "BULLISH" ? "bg-[#00E0A4]/20 text-[#00E0A4] border-[#00E0A4]/30" :
                              season.strength === "BEARISH" ? "bg-[#FF5252]/20 text-[#FF5252] border-[#FF5252]/30" :
                              "bg-[#A0A0A5]/20 text-[#A0A0A5] border-[#A0A0A5]/30"
                            }`}>
                              {season.strength}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div>
                              <div className="text-[#A0A0A5]">Historical Avg</div>
                              <div className={season.avg.startsWith("+") ? "text-[#00E0A4]" : "text-[#FF5252]"}>
                                {season.avg}
                              </div>
                            </div>
                            <div>
                              <div className="text-[#A0A0A5]">Current Year</div>
                              <div className={season.current.startsWith("+") ? "text-[#00E0A4]" : "text-[#FF5252]"}>
                                {season.current}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-[#0D0D0F]/80 backdrop-blur-xl rounded-lg border border-[#2979FF]/20 p-4">
                    <div className="flex items-center gap-2 mb-4">
                      <TrendingUpIcon className="w-5 h-5 text-[#FF9800]" />
                      <h3 className="text-sm">Roll Yield Analysis</h3>
                    </div>
                    <div className="space-y-4">
                      <div className="bg-[#151519] rounded-lg p-4">
                        <div className="text-xs text-[#A0A0A5] mb-2">Front Month vs Next Month</div>
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <div className="text-2xl">$78.45</div>
                            <div className="text-xs text-[#A0A0A5]">Nov 24</div>
                          </div>
                          <div className="text-xl text-[#2979FF]">→</div>
                          <div>
                            <div className="text-2xl">$79.20</div>
                            <div className="text-xs text-[#A0A0A5]">Dec 24</div>
                          </div>
                        </div>
                        <div className="bg-[#0D0D0F] rounded-lg p-3">
                          <div className="flex items-center justify-between text-xs mb-1">
                            <span className="text-[#A0A0A5]">Roll Cost (Premium)</span>
                            <span className="text-[#FF9800]">+$0.75 (0.96%)</span>
                          </div>
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-[#A0A0A5]">Annualized Roll Yield</span>
                            <span className="text-[#FF5252]">-11.52%</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-[#151519] rounded-lg p-4">
                        <div className="text-xs text-[#A0A0A5] mb-3">Spread Strategy Opportunities</div>
                        <div className="space-y-2 text-xs">
                          <div className="flex items-center justify-between">
                            <span>Nov/Dec Spread</span>
                            <span className="text-[#00E0A4]">-$0.75</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span>Nov/Mar Spread</span>
                            <span className="text-[#00E0A4]">-$2.65</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span>Dec/Jun Spread</span>
                            <span className="text-[#00E0A4]">-$3.40</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* OPTIONS CHAIN + GREEKS VIEW */}
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

                {/* Options Chain Table */}
                <div className="bg-[#0D0D0F]/80 backdrop-blur-xl rounded-lg border border-[#2979FF]/20">
                  <div className="p-4 border-b border-[#1F1F23]">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <BarChart3 className="w-5 h-5 text-[#00E0A4]" />
                        <h3 className="text-sm">Options Chain - {getSelectedCommodityName()} Dec 2024</h3>
                        <Badge className="bg-[#2979FF]/20 text-[#2979FF] border-[#2979FF]/30 text-xs">
                          {selectedCommodity}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-xs">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded bg-[#00E0A4]/20" />
                          <span className="text-[#A0A0A5]">In The Money</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded bg-[#1F1F23]" />
                          <span className="text-[#A0A0A5]">Out The Money</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="border-b border-[#1F1F23]">
                          <th className="text-right text-xs text-[#A0A0A5] p-2" colSpan={5}>CALLS</th>
                          <th className="text-center text-xs text-[#E8E8E8] p-2 bg-[#1F1F23]">STRIKE</th>
                          <th className="text-left text-xs text-[#A0A0A5] p-2" colSpan={5}>PUTS</th>
                        </tr>
                        <tr className="border-b border-[#1F1F23] text-[10px]">
                          <th className="text-right text-[#A0A0A5] p-2">OI</th>
                          <th className="text-right text-[#A0A0A5] p-2">Vol</th>
                          <th className="text-right text-[#A0A0A5] p-2">IV</th>
                          <th className="text-right text-[#A0A0A5] p-2">Bid</th>
                          <th className="text-right text-[#A0A0A5] p-2">Ask</th>
                          <th className="text-center text-[#A0A0A5] p-2 bg-[#1F1F23]">Price</th>
                          <th className="text-left text-[#A0A0A5] p-2">Bid</th>
                          <th className="text-left text-[#A0A0A5] p-2">Ask</th>
                          <th className="text-left text-[#A0A0A5] p-2">IV</th>
                          <th className="text-left text-[#A0A0A5] p-2">Vol</th>
                          <th className="text-left text-[#A0A0A5] p-2">OI</th>
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
                          .map((option, idx) => {
                          const spotPrice = 78.45;
                          const isITMCall = option.strike < spotPrice;
                          const isITMPut = option.strike > spotPrice;
                          const isATM = Math.abs(option.strike - spotPrice) < 1;
                          const isSelected = selectedStrike === option.strike;
                          
                          return (
                            <tr 
                              key={idx} 
                              onClick={() => setSelectedStrike(option.strike)}
                              className={`border-b border-[#1F1F23] hover:bg-[#151519] transition-colors cursor-pointer ${
                                isATM ? "bg-[#2979FF]/5" : ""
                              } ${
                                isSelected ? "ring-2 ring-[#00E0A4]/50" : ""
                              }`}
                            >
                              {/* CALLS */}
                              <td className={`p-2 text-right ${isITMCall ? "bg-[#00E0A4]/10" : ""}`}>
                                <div className={option.callOI.includes("K") && parseInt(option.callOI) > 100 ? "text-[#FF9800]" : ""}>
                                  {option.callOI}
                                </div>
                              </td>
                              <td className={`p-2 text-right ${isITMCall ? "bg-[#00E0A4]/10" : ""}`}>
                                <div className={option.callVol.includes("K") && parseInt(option.callVol) > 20 ? "text-[#2979FF]" : ""}>
                                  {option.callVol}
                                </div>
                              </td>
                              <td className={`p-2 text-right ${isITMCall ? "bg-[#00E0A4]/10" : ""}`}>
                                {option.callIV.toFixed(1)}%
                              </td>
                              <td className={`p-2 text-right text-[#00E0A4] ${isITMCall ? "bg-[#00E0A4]/10" : ""}`}>
                                ${option.callBid.toFixed(2)}
                              </td>
                              <td className={`p-2 text-right text-[#FF5252] ${isITMCall ? "bg-[#00E0A4]/10" : ""}`}>
                                ${option.callAsk.toFixed(2)}
                              </td>
                              
                              {/* STRIKE */}
                              <td className="p-2 text-center bg-[#1F1F23]">
                                <div className={isATM ? "text-[#00E0A4]" : ""}>${option.strike}</div>
                              </td>
                              
                              {/* PUTS */}
                              <td className={`p-2 text-left text-[#00E0A4] ${isITMPut ? "bg-[#00E0A4]/10" : ""}`}>
                                ${option.putBid.toFixed(2)}
                              </td>
                              <td className={`p-2 text-left text-[#FF5252] ${isITMPut ? "bg-[#00E0A4]/10" : ""}`}>
                                ${option.putAsk.toFixed(2)}
                              </td>
                              <td className={`p-2 text-left ${isITMPut ? "bg-[#00E0A4]/10" : ""}`}>
                                {option.putIV.toFixed(1)}%
                              </td>
                              <td className={`p-2 text-left ${isITMPut ? "bg-[#00E0A4]/10" : ""}`}>
                                <div className={option.putVol.includes("K") && parseInt(option.putVol) > 20 ? "text-[#2979FF]" : ""}>
                                  {option.putVol}
                                </div>
                              </td>
                              <td className={`p-2 text-left ${isITMPut ? "bg-[#00E0A4]/10" : ""}`}>
                                <div className={option.putOI.includes("K") && parseInt(option.putOI) > 100 ? "text-[#FF9800]" : ""}>
                                  {option.putOI}
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Greeks Panel */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#0D0D0F]/80 backdrop-blur-xl rounded-lg border border-[#2979FF]/20 p-4">
                    <div className="flex items-center gap-2 mb-4">
                      <Activity className="w-5 h-5 text-[#2979FF]" />
                      <h3 className="text-sm">Greeks Analysis - Strike ${selectedStrike}</h3>
                      <Badge className="bg-[#2979FF]/20 text-[#2979FF] border-[#2979FF]/30 text-xs">
                        Selected
                      </Badge>
                    </div>
                    <div className="space-y-3">
                      {(() => {
                        const selectedOption = optionsChain.find(o => o.strike === selectedStrike) || optionsChain[5];
                        return [
                          { greek: "Delta", call: selectedOption.callDelta, put: selectedOption.putDelta, desc: "Price sensitivity", color: "#2979FF" },
                          { greek: "Gamma", call: selectedOption.callGamma, put: selectedOption.putGamma, desc: "Delta change rate", color: "#00E0A4" },
                          { greek: "Theta", call: selectedOption.callTheta, put: selectedOption.putTheta, desc: "Time decay per day", color: "#FF9800" },
                          { greek: "Vega", call: selectedOption.callVega, put: selectedOption.putVega, desc: "Volatility sensitivity", color: "#FF6B9D" },
                          { greek: "Rho", call: 0.12, put: -0.15, desc: "Interest rate sensitivity", color: "#9C27B0" },
                        ];
                      })().map((greek, idx) => (
                        <div key={idx} className="bg-[#151519] rounded-lg p-3">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <div className="text-sm" style={{ color: greek.color }}>{greek.greek}</div>
                              <div className="text-xs text-[#A0A0A5]">{greek.desc}</div>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-3 text-xs">
                            <div className="bg-[#0D0D0F] rounded p-2">
                              <div className="text-[#A0A0A5] mb-1">Call</div>
                              <div className={greek.call >= 0 ? "text-[#00E0A4]" : "text-[#FF5252]"}>
                                {greek.call >= 0 ? "+" : ""}{greek.call.toFixed(3)}
                              </div>
                            </div>
                            <div className="bg-[#0D0D0F] rounded p-2">
                              <div className="text-[#A0A0A5] mb-1">Put</div>
                              <div className={greek.put >= 0 ? "text-[#00E0A4]" : "text-[#FF5252]"}>
                                {greek.put >= 0 ? "+" : ""}{greek.put.toFixed(3)}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Volatility Surface */}
                  <div className="bg-[#0D0D0F]/80 backdrop-blur-xl rounded-lg border border-[#2979FF]/20 p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <BarChart3 className="w-5 h-5 text-[#FF9800]" />
                        <h3 className="text-sm">Implied Volatility Surface</h3>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => setVolSurfaceView("heatmap")}
                          className={`h-7 text-xs bg-transparent transition-all ${
                            volSurfaceView === "heatmap" 
                              ? "border-[#2979FF] bg-[#2979FF]/20 text-[#2979FF]" 
                              : "border-[#A0A0A5]/30 text-[#A0A0A5]"
                          }`}
                        >
                          Heatmap
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => setVolSurfaceView("3d")}
                          className={`h-7 text-xs bg-transparent transition-all ${
                            volSurfaceView === "3d" 
                              ? "border-[#2979FF] bg-[#2979FF]/20 text-[#2979FF]" 
                              : "border-[#A0A0A5]/30 text-[#A0A0A5]"
                          }`}
                        >
                          3D Surface
                        </Button>
                      </div>
                    </div>
                    
                    {/* IV Heatmap or 3D Surface */}
                    {volSurfaceView === "heatmap" ? (
                      <div className="space-y-2">
                        <div className="grid grid-cols-5 gap-1 text-xs text-center text-[#A0A0A5] mb-2">
                          <div>Strike</div>
                          <div>1M</div>
                          <div>3M</div>
                          <div>6M</div>
                          <div>1Y</div>
                        </div>
                        {[75, 77, 79, 81, 83].map((strike) => (
                          <div key={strike} className="grid grid-cols-5 gap-1 text-xs">
                            <div className="bg-[#1F1F23] rounded p-2 text-center">${strike}</div>
                            {[28.4, 27.2, 26.5, 25.8].map((iv, idx) => {
                              const variance = (Math.random() - 0.5) * 4;
                              const finalIV = iv + variance;
                              const color = finalIV > 28 ? "bg-[#FF5252]/30" : 
                                           finalIV > 26 ? "bg-[#FF9800]/30" : 
                                           finalIV > 24 ? "bg-[#2979FF]/30" : "bg-[#00E0A4]/30";
                              return (
                                <div key={idx} className={`${color} rounded p-2 text-center hover:opacity-80 transition-opacity cursor-pointer`}>
                                  {finalIV.toFixed(1)}%
                                </div>
                              );
                            })}
                          </div>
                        ))}
                        
                        {/* IV Skew Chart */}
                        <div className="bg-[#151519] rounded-lg p-3 mt-4">
                          <div className="text-xs text-[#A0A0A5] mb-2">IV Skew (3M Expiry)</div>
                          <div className="h-24 flex items-end gap-1">
                            {[32.1, 30.8, 28.4, 26.5, 25.0, 24.2, 23.5, 23.0].map((iv, idx) => {
                              const height = (iv / 35) * 100;
                              return (
                                <div key={idx} className="flex-1 flex flex-col items-center">
                                  <div 
                                    className="w-full bg-gradient-to-t from-[#FF9800] to-[#2979FF] rounded-t"
                                    style={{ height: `${height}%` }}
                                  />
                                  <div className="text-[10px] text-[#A0A0A5] mt-1">{75 + idx}</div>
                                </div>
                              );
                            })}
                          </div>
                          <div className="flex items-center justify-between mt-2 text-xs">
                            <span className="text-[#FF9800]">Put Skew</span>
                            <span className="text-[#2979FF]">Call Skew</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-[#151519] rounded-lg p-6 h-[400px] flex items-center justify-center">
                        <div className="text-center space-y-3">
                          <BarChart3 className="w-12 h-12 mx-auto text-[#2979FF]" />
                          <div className="text-sm text-[#E8E8E8]">3D Volatility Surface</div>
                          <div className="text-xs text-[#A0A0A5]">Interactive 3D visualization coming soon</div>
                          <div className="grid grid-cols-3 gap-2 mt-4">
                            {['X: Strike', 'Y: Expiry', 'Z: IV'].map((axis, idx) => (
                              <div key={idx} className="bg-[#0D0D0F] rounded p-2 text-xs text-[#A0A0A5]">
                                {axis}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Order Flow & Whale Activity */}
                <div className="bg-[#0D0D0F]/80 backdrop-blur-xl rounded-lg border border-[#2979FF]/20">
                  <div className="p-4 border-b border-[#1F1F23]">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Zap className="w-5 h-5 text-[#FFD700]" />
                        <h3 className="text-sm">Options Flow - Whale Activity Detection</h3>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#00E0A4] animate-pulse" />
                        <span className="text-xs text-[#00E0A4]">LIVE STREAM</span>
                      </div>
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-[#1F1F23]">
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Time</th>
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Type</th>
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Side</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">Strike</th>
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Expiry</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">Size</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">Premium</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">IV</th>
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Signal</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orderFlow.map((flow, idx) => (
                          <tr key={idx} className="border-b border-[#1F1F23] hover:bg-[#151519] transition-colors">
                            <td className="p-3 text-sm text-[#A0A0A5]">{flow.time}</td>
                            <td className="p-3">
                              <Badge className={`text-xs ${
                                flow.type === "SWEEP" ? "bg-[#FF9800]/20 text-[#FF9800] border-[#FF9800]/30" :
                                flow.type === "BLOCK" ? "bg-[#FF5252]/20 text-[#FF5252] border-[#FF5252]/30" :
                                flow.type === "DARK POOL" ? "bg-[#9C27B0]/20 text-[#9C27B0] border-[#9C27B0]/30" :
                                "bg-[#2979FF]/20 text-[#2979FF] border-[#2979FF]/30"
                              }`}>
                                {flow.type}
                              </Badge>
                            </td>
                            <td className="p-3">
                              <Badge className={`text-xs ${
                                flow.side === "CALL" ? 
                                "bg-[#00E0A4]/20 text-[#00E0A4] border-[#00E0A4]/30" : 
                                "bg-[#FF5252]/20 text-[#FF5252] border-[#FF5252]/30"
                              }`}>
                                {flow.side}
                              </Badge>
                            </td>
                            <td className="p-3 text-sm text-right">${flow.strike}</td>
                            <td className="p-3 text-sm">{flow.expiry}</td>
                            <td className="p-3 text-sm text-right text-[#2979FF]">{flow.size}</td>
                            <td className="p-3 text-sm text-right">{flow.premium}</td>
                            <td className="p-3 text-sm text-right">{flow.iv.toFixed(1)}%</td>
                            <td className="p-3">
                              <Badge className={`text-xs ${
                                flow.tag === "BULLISH" ? "bg-[#00E0A4]/20 text-[#00E0A4] border-[#00E0A4]/30" :
                                flow.tag === "BEARISH" ? "bg-[#FF5252]/20 text-[#FF5252] border-[#FF5252]/30" :
                                flow.tag === "HEDGING" ? "bg-[#FF9800]/20 text-[#FF9800] border-[#FF9800]/30" :
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

                {/* Risk Metrics */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-[#0D0D0F]/80 backdrop-blur-xl rounded-lg border border-[#2979FF]/20 p-4">
                    <div className="text-xs text-[#A0A0A5] mb-2">IV Rank (30D)</div>
                    <div className="text-2xl mb-2">68.4%</div>
                    <Progress value={68.4} className="h-2 mb-2" />
                    <div className="text-xs text-[#FF9800]">High volatility environment</div>
                  </div>
                  <div className="bg-[#0D0D0F]/80 backdrop-blur-xl rounded-lg border border-[#2979FF]/20 p-4">
                    <div className="text-xs text-[#A0A0A5] mb-2">HV vs IV Spread</div>
                    <div className="text-2xl mb-2">+4.2%</div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <div className="text-[#A0A0A5]">HV 30D</div>
                        <div>21.3%</div>
                      </div>
                      <div>
                        <div className="text-[#A0A0A5]">IV ATM</div>
                        <div>25.5%</div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-[#0D0D0F]/80 backdrop-blur-xl rounded-lg border border-[#2979FF]/20 p-4">
                    <div className="text-xs text-[#A0A0A5] mb-2">Put/Call Ratio</div>
                    <div className="text-2xl mb-2">0.82</div>
                    <div className="text-xs">
                      <span className="text-[#00E0A4]">Volume: </span>
                      <span>1.24M / 1.51M</span>
                    </div>
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
