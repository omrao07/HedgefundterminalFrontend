import { useState } from "react";
import { ScrollArea } from "../ui/scroll-area";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { TrendingUp, TrendingDown, DollarSign, Search } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";

export function FixedIncomeTab() {
  const [activeSubTab, setActiveSubTab] = useState("lqa");
  const [searchLQA, setSearchLQA] = useState("");
  const [searchTRACE, setSearchTRACE] = useState("");
  const [searchWCDS, setSearchWCDS] = useState("");
  const [searchFIHY, setSearchFIHY] = useState("");
  const [searchIGOV, setSearchIGOV] = useState("");
  const [searchBVAL, setSearchBVAL] = useState("");
  const [searchDDP, setSearchDDP] = useState("");

  // LQA - Liquidity Assessment
  const bondLiquidity = [
    { issuer: "Apple Inc", cusip: "037833100", maturity: "2033", coupon: 4.65, bid: 98.5, ask: 98.7, spread: 0.2, volume: "12.5M", liquidity: "High" },
    { issuer: "Microsoft Corp", cusip: "594918104", maturity: "2035", coupon: 3.95, bid: 92.3, ask: 92.6, spread: 0.3, volume: "8.2M", liquidity: "High" },
    { issuer: "Tesla Inc", cusip: "88160R101", maturity: "2028", coupon: 5.30, bid: 89.2, ask: 89.8, spread: 0.6, volume: "3.1M", liquidity: "Medium" },
  ];

  // WCDS - CDS Spreads Monitor
  const cdsSpreads = [
    { entity: "United States", rating: "AA+", y1: 15, y3: 22, y5: 28, y10: 35, change5y: -2 },
    { entity: "Germany", rating: "AAA", y1: 8, y3: 12, y5: 18, y10: 24, change5y: -1 },
    { entity: "Italy", rating: "BBB", y1: 85, y3: 125, y5: 145, y10: 168, change5y: +12 },
    { entity: "Tesla Inc", rating: "BBB-", y1: 120, y3: 185, y5: 225, y10: 280, change5y: -15 },
    { entity: "Ford Motor", rating: "BB+", y1: 245, y3: 325, y5: 385, y10: 450, change5y: +8 },
  ];

  // YCRV - Yield Curve Viewer
  const yieldCurves = [
    { maturity: "3M", us: 5.38, germany: 3.65, uk: 5.15, japan: 0.12 },
    { maturity: "6M", us: 5.35, germany: 3.58, uk: 5.08, japan: 0.15 },
    { maturity: "2Y", us: 4.42, germany: 2.85, uk: 4.65, japan: 0.25 },
    { maturity: "5Y", us: 4.12, germany: 2.42, uk: 4.28, japan: 0.38 },
    { maturity: "10Y", us: 4.18, germany: 2.52, uk: 4.35, japan: 0.72 },
    { maturity: "30Y", us: 4.35, germany: 2.68, uk: 4.58, japan: 1.82 },
  ];

  // FIHY - High Yield Bond Monitor
  const highYieldBonds = [
    { issuer: "Carnival Corp", rating: "B", yield: 7.85, spread: 485, duration: 5.2, price: 94.5, volume: "4.2M" },
    { issuer: "Occidental Petroleum", rating: "BB+", yield: 6.25, spread: 325, duration: 6.8, price: 97.8, volume: "8.5M" },
    { issuer: "Ford Motor", rating: "BB+", yield: 6.15, spread: 315, duration: 4.9, price: 96.2, volume: "12.3M" },
    { issuer: "American Airlines", rating: "B-", yield: 9.45, spread: 645, duration: 3.5, price: 88.5, volume: "2.8M" },
  ];

  // IGOV - Government Bond Dashboard
  const govBonds = [
    { country: "United States", y10: 4.18, change: -0.03, yield10yChange: -8, debt_gdp: 122.5 },
    { country: "Germany", y10: 2.52, change: +0.02, yield10yChange: +4, debt_gdp: 68.2 },
    { country: "United Kingdom", y10: 4.35, change: -0.01, yield10yChange: -2, debt_gdp: 102.8 },
    { country: "Japan", y10: 0.72, change: +0.04, yield10yChange: +12, debt_gdp: 264.3 },
    { country: "Italy", y10: 4.12, change: +0.08, yield10yChange: +15, debt_gdp: 145.2 },
  ];

  // BVAL - Bloomberg Valuation
  const valuationPricing = [
    { cusip: "037833100", issuer: "Apple Inc", bval: 98.65, market: 98.52, diff: +0.13, confidence: "High" },
    { cusip: "594918104", issuer: "Microsoft", bval: 92.48, market: 92.45, diff: +0.03, confidence: "High" },
    { cusip: "88160R101", issuer: "Tesla", bval: 89.52, market: 89.75, diff: -0.23, confidence: "Medium" },
  ];

  // DDP - Default Probability
  const defaultProb = [
    { issuer: "Apple Inc", rating: "AA+", prob1y: 0.05, prob3y: 0.18, prob5y: 0.32, trend: "Stable" },
    { issuer: "Tesla Inc", rating: "BBB-", prob1y: 1.25, prob3y: 3.85, prob5y: 6.45, trend: "Improving" },
    { issuer: "Ford Motor", rating: "BB+", prob1y: 2.85, prob3y: 7.42, prob5y: 11.85, trend: "Stable" },
  ];

  // TRACE - Bond Trade Data
  const traceTrades = [
    { time: "15:42:32", cusip: "037833100", price: 98.52, yield: 4.68, size: "500K", side: "Buy" },
    { time: "15:41:18", cusip: "594918104", price: 92.45, yield: 4.12, size: "1M", side: "Sell" },
    { time: "15:39:45", cusip: "88160R101", price: 89.75, yield: 6.35, size: "250K", side: "Buy" },
    { time: "15:38:22", cusip: "037833100", price: 98.48, yield: 4.69, size: "750K", side: "Sell" },
  ];

  return (
    <div className="h-[calc(100vh-120px)]">
      <Tabs value={activeSubTab} onValueChange={setActiveSubTab} className="h-full flex flex-col">
        <TabsList className="bg-[#1F1F23] border-b-2 border-[#2979FF]/20 rounded-none w-full justify-start p-0 h-12">
          <TabsTrigger value="lqa" className="data-[state=active]:bg-[#151519] data-[state=active]:text-[#00E0A4] data-[state=active]:border-[#00E0A4] bg-transparent text-[#A0A0A5] hover:text-[#E8E8E8] hover:bg-[#151519]/50 rounded-none border-b-2 border-transparent px-3 whitespace-nowrap transition-all text-xs">
            LQA
          </TabsTrigger>
          <TabsTrigger value="trace" className="data-[state=active]:bg-[#151519] data-[state=active]:text-[#00E0A4] data-[state=active]:border-[#00E0A4] bg-transparent text-[#A0A0A5] hover:text-[#E8E8E8] hover:bg-[#151519]/50 rounded-none border-b-2 border-transparent px-3 whitespace-nowrap transition-all text-xs">
            TRACE
          </TabsTrigger>
          <TabsTrigger value="wcds" className="data-[state=active]:bg-[#151519] data-[state=active]:text-[#00E0A4] data-[state=active]:border-[#00E0A4] bg-transparent text-[#A0A0A5] hover:text-[#E8E8E8] hover:bg-[#151519]/50 rounded-none border-b-2 border-transparent px-3 whitespace-nowrap transition-all text-xs">
            WCDS
          </TabsTrigger>
          <TabsTrigger value="ycrv" className="data-[state=active]:bg-[#151519] data-[state=active]:text-[#00E0A4] data-[state=active]:border-[#00E0A4] bg-transparent text-[#A0A0A5] hover:text-[#E8E8E8] hover:bg-[#151519]/50 rounded-none border-b-2 border-transparent px-3 whitespace-nowrap transition-all text-xs">
            YCRV
          </TabsTrigger>
          <TabsTrigger value="fihy" className="data-[state=active]:bg-[#151519] data-[state=active]:text-[#00E0A4] data-[state=active]:border-[#00E0A4] bg-transparent text-[#A0A0A5] hover:text-[#E8E8E8] hover:bg-[#151519]/50 rounded-none border-b-2 border-transparent px-3 whitespace-nowrap transition-all text-xs">
            FIHY
          </TabsTrigger>
          <TabsTrigger value="igov" className="data-[state=active]:bg-[#151519] data-[state=active]:text-[#00E0A4] data-[state=active]:border-[#00E0A4] bg-transparent text-[#A0A0A5] hover:text-[#E8E8E8] hover:bg-[#151519]/50 rounded-none border-b-2 border-transparent px-3 whitespace-nowrap transition-all text-xs">
            IGOV
          </TabsTrigger>
          <TabsTrigger value="bval" className="data-[state=active]:bg-[#151519] data-[state=active]:text-[#00E0A4] data-[state=active]:border-[#00E0A4] bg-transparent text-[#A0A0A5] hover:text-[#E8E8E8] hover:bg-[#151519]/50 rounded-none border-b-2 border-transparent px-3 whitespace-nowrap transition-all text-xs">
            BVAL
          </TabsTrigger>
          <TabsTrigger value="ddp" className="data-[state=active]:bg-[#151519] data-[state=active]:text-[#00E0A4] data-[state=active]:border-[#00E0A4] bg-transparent text-[#A0A0A5] hover:text-[#E8E8E8] hover:bg-[#151519]/50 rounded-none border-b-2 border-transparent px-3 whitespace-nowrap transition-all text-xs">
            DDP
          </TabsTrigger>
        </TabsList>

        <ScrollArea className="flex-1">
          <div className="p-4">
            {/* LQA - Liquidity Assessment */}
            <TabsContent value="lqa" className="mt-0">
              <div className="space-y-4">
                {/* Search Input */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#A0A0A5]" />
                  <Input
                    placeholder="Search by issuer, CUSIP, or liquidity..."
                    value={searchLQA}
                    onChange={(e) => setSearchLQA(e.target.value)}
                    className="pl-10 bg-[#151519] border-[#1F1F23] text-sm"
                  />
                </div>
                
                <div className="bg-[#151519] rounded-lg border border-[#1F1F23] p-4">
                  <h3 className="text-sm mb-4">Corporate Bond Liquidity Assessment</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-[#1F1F23]">
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Issuer</th>
                          <th className="text-left text-xs text-[#A0A0A5] p-3">CUSIP</th>
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Maturity</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">Coupon %</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">Bid</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">Ask</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">Spread</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">Volume</th>
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Liquidity</th>
                        </tr>
                      </thead>
                      <tbody>
                        {bondLiquidity
                          .filter(bond => 
                            bond.issuer.toLowerCase().includes(searchLQA.toLowerCase()) ||
                            bond.cusip.toLowerCase().includes(searchLQA.toLowerCase()) ||
                            bond.liquidity.toLowerCase().includes(searchLQA.toLowerCase())
                          )
                          .map((bond, idx) => (
                            <tr key={idx} className="border-b border-[#1F1F23] hover:bg-[#0D0D0F] transition-colors">
                              <td className="p-3 text-sm">{bond.issuer}</td>
                              <td className="p-3 text-sm text-[#2979FF]">{bond.cusip}</td>
                              <td className="p-3 text-sm text-[#A0A0A5]">{bond.maturity}</td>
                              <td className="p-3 text-sm text-right">{bond.coupon.toFixed(2)}%</td>
                              <td className="p-3 text-sm text-right">{bond.bid.toFixed(2)}</td>
                              <td className="p-3 text-sm text-right">{bond.ask.toFixed(2)}</td>
                              <td className="p-3 text-sm text-right text-[#00E0A4]">{bond.spread.toFixed(2)}</td>
                              <td className="p-3 text-sm text-right">{bond.volume}</td>
                              <td className="p-3">
                                <Badge className={`text-xs ${
                                  bond.liquidity === "High" ? 'bg-[#00E0A4]/20 text-[#00E0A4] border-[#00E0A4]/30' :
                                  bond.liquidity === "Medium" ? 'bg-[#FF9800]/20 text-[#FF9800] border-[#FF9800]/30' :
                                  'bg-[#FF5252]/20 text-[#FF5252] border-[#FF5252]/30'
                                }`}>
                                  {bond.liquidity}
                                </Badge>
                              </td>
                            </tr>
                          ))
                        }
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* TRACE - Bond Trades */}
            <TabsContent value="trace" className="mt-0">
              <div className="space-y-4">
                {/* Search Input */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#A0A0A5]" />
                  <Input
                    placeholder="Search by CUSIP or side..."
                    value={searchTRACE}
                    onChange={(e) => setSearchTRACE(e.target.value)}
                    className="pl-10 bg-[#151519] border-[#1F1F23] text-sm"
                  />
                </div>
                
                <div className="bg-[#151519] rounded-lg border border-[#1F1F23] p-4">
                  <h3 className="text-sm mb-4">TRACE - Real-time Corporate Bond Trades</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-[#1F1F23]">
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Time</th>
                          <th className="text-left text-xs text-[#A0A0A5] p-3">CUSIP</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">Price</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">Yield %</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">Size</th>
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Side</th>
                        </tr>
                      </thead>
                      <tbody>
                        {traceTrades
                          .filter(trade => 
                            trade.cusip.toLowerCase().includes(searchTRACE.toLowerCase()) ||
                            trade.side.toLowerCase().includes(searchTRACE.toLowerCase())
                          )
                          .map((trade, idx) => (
                            <tr key={idx} className="border-b border-[#1F1F23] hover:bg-[#0D0D0F] transition-colors">
                              <td className="p-3 text-sm text-[#2979FF]">{trade.time}</td>
                              <td className="p-3 text-sm">{trade.cusip}</td>
                              <td className="p-3 text-sm text-right">{trade.price.toFixed(2)}</td>
                              <td className="p-3 text-sm text-right">{trade.yield.toFixed(2)}%</td>
                              <td className="p-3 text-sm text-right text-[#00E0A4]">{trade.size}</td>
                              <td className="p-3">
                                <Badge className={`text-xs ${
                                  trade.side === "Buy" ? 'bg-[#00E0A4]/20 text-[#00E0A4] border-[#00E0A4]/30' :
                                  'bg-[#FF5252]/20 text-[#FF5252] border-[#FF5252]/30'
                                }`}>
                                  {trade.side}
                                </Badge>
                              </td>
                            </tr>
                          ))
                        }
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* WCDS - CDS Spreads */}
            <TabsContent value="wcds" className="mt-0">
              <div className="space-y-4">
                {/* Search Input */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#A0A0A5]" />
                  <Input
                    placeholder="Search by entity or rating..."
                    value={searchWCDS}
                    onChange={(e) => setSearchWCDS(e.target.value)}
                    className="pl-10 bg-[#151519] border-[#1F1F23] text-sm"
                  />
                </div>
                
                <div className="bg-[#151519] rounded-lg border border-[#1F1F23] p-4">
                  <h3 className="text-sm mb-4">Credit Default Swap Spreads Monitor (bps)</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-[#1F1F23]">
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Entity</th>
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Rating</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">1Y</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">3Y</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">5Y</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">10Y</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">5Y Change</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cdsSpreads
                          .filter(entity => 
                            entity.entity.toLowerCase().includes(searchWCDS.toLowerCase()) ||
                            entity.rating.toLowerCase().includes(searchWCDS.toLowerCase())
                          )
                          .map((entity, idx) => (
                            <tr key={idx} className="border-b border-[#1F1F23] hover:bg-[#0D0D0F] transition-colors">
                              <td className="p-3 text-sm">{entity.entity}</td>
                              <td className="p-3 text-sm text-[#A0A0A5]">{entity.rating}</td>
                              <td className="p-3 text-sm text-right">{entity.y1}</td>
                              <td className="p-3 text-sm text-right">{entity.y3}</td>
                              <td className="p-3 text-sm text-right text-[#2979FF]">{entity.y5}</td>
                              <td className="p-3 text-sm text-right">{entity.y10}</td>
                              <td className={`p-3 text-sm text-right ${entity.change5y >= 0 ? 'text-[#FF5252]' : 'text-[#00E0A4]'}`}>
                                {entity.change5y >= 0 ? '+' : ''}{entity.change5y}
                              </td>
                            </tr>
                          ))
                        }
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* YCRV - Yield Curves */}
            <TabsContent value="ycrv" className="mt-0">
              <div className="space-y-4">
                <div className="bg-[#151519] rounded-lg border border-[#1F1F23] p-4">
                  <h3 className="text-sm mb-4">Global Government Bond Yield Curves</h3>
                  <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={yieldCurves}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1F1F23" />
                      <XAxis dataKey="maturity" stroke="#A0A0A5" />
                      <YAxis stroke="#A0A0A5" />
                      <Tooltip
                        contentStyle={{ backgroundColor: "#151519", border: "1px solid #1F1F23", borderRadius: "8px" }}
                      />
                      <Line type="monotone" dataKey="us" stroke="#00E0A4" strokeWidth={3} name="United States" />
                      <Line type="monotone" dataKey="germany" stroke="#2979FF" strokeWidth={2} name="Germany" />
                      <Line type="monotone" dataKey="uk" stroke="#FF9800" strokeWidth={2} name="UK" />
                      <Line type="monotone" dataKey="japan" stroke="#FF5252" strokeWidth={2} name="Japan" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </TabsContent>

            {/* FIHY - High Yield */}
            <TabsContent value="fihy" className="mt-0">
              <div className="space-y-4">
                {/* Search Input */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#A0A0A5]" />
                  <Input
                    placeholder="Search by issuer or rating..."
                    value={searchFIHY}
                    onChange={(e) => setSearchFIHY(e.target.value)}
                    className="pl-10 bg-[#151519] border-[#1F1F23] text-sm"
                  />
                </div>
                
                <div className="bg-[#151519] rounded-lg border border-[#1F1F23] p-4">
                  <h3 className="text-sm mb-4">High-Yield (Junk) Bond Monitor</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-[#1F1F23]">
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Issuer</th>
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Rating</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">Yield %</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">Spread (bps)</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">Duration</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">Price</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">Volume</th>
                        </tr>
                      </thead>
                      <tbody>
                        {highYieldBonds
                          .filter(bond => 
                            bond.issuer.toLowerCase().includes(searchFIHY.toLowerCase()) ||
                            bond.rating.toLowerCase().includes(searchFIHY.toLowerCase())
                          )
                          .map((bond, idx) => (
                            <tr key={idx} className="border-b border-[#1F1F23] hover:bg-[#0D0D0F] transition-colors">
                              <td className="p-3 text-sm">{bond.issuer}</td>
                              <td className="p-3 text-sm text-[#FF9800]">{bond.rating}</td>
                              <td className="p-3 text-sm text-right text-[#00E0A4]">{bond.yield.toFixed(2)}%</td>
                              <td className="p-3 text-sm text-right">{bond.spread}</td>
                              <td className="p-3 text-sm text-right">{bond.duration.toFixed(1)}</td>
                              <td className="p-3 text-sm text-right">{bond.price.toFixed(2)}</td>
                              <td className="p-3 text-sm text-right text-[#A0A0A5]">{bond.volume}</td>
                            </tr>
                          ))
                        }
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* IGOV - Government Bonds */}
            <TabsContent value="igov" className="mt-0">
              <div className="space-y-4">
                {/* Search Input */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#A0A0A5]" />
                  <Input
                    placeholder="Search by country..."
                    value={searchIGOV}
                    onChange={(e) => setSearchIGOV(e.target.value)}
                    className="pl-10 bg-[#151519] border-[#1F1F23] text-sm"
                  />
                </div>
                
                <div className="bg-[#151519] rounded-lg border border-[#1F1F23] p-4">
                  <h3 className="text-sm mb-4">Government Bond Dashboard - 10Y Benchmarks</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-[#1F1F23]">
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Country</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">10Y Yield %</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">Daily Change</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">YTD Change (bps)</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">Debt/GDP %</th>
                        </tr>
                      </thead>
                      <tbody>
                        {govBonds
                          .filter(bond => 
                            bond.country.toLowerCase().includes(searchIGOV.toLowerCase())
                          )
                          .map((bond, idx) => (
                            <tr key={idx} className="border-b border-[#1F1F23] hover:bg-[#0D0D0F] transition-colors">
                              <td className="p-3 text-sm">{bond.country}</td>
                              <td className="p-3 text-sm text-right text-[#2979FF]">{bond.y10.toFixed(2)}%</td>
                              <td className={`p-3 text-sm text-right ${bond.change >= 0 ? 'text-[#FF5252]' : 'text-[#00E0A4]'}`}>
                                {bond.change >= 0 ? '+' : ''}{bond.change.toFixed(2)}
                              </td>
                              <td className={`p-3 text-sm text-right ${bond.yield10yChange >= 0 ? 'text-[#FF5252]' : 'text-[#00E0A4]'}`}>
                                {bond.yield10yChange >= 0 ? '+' : ''}{bond.yield10yChange}
                              </td>
                              <td className="p-3 text-sm text-right text-[#A0A0A5]">{bond.debt_gdp.toFixed(1)}%</td>
                            </tr>
                          ))
                        }
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* BVAL - Valuation */}
            <TabsContent value="bval" className="mt-0">
              <div className="space-y-4">
                {/* Search Input */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#A0A0A5]" />
                  <Input
                    placeholder="Search by CUSIP, issuer, or confidence..."
                    value={searchBVAL}
                    onChange={(e) => setSearchBVAL(e.target.value)}
                    className="pl-10 bg-[#151519] border-[#1F1F23] text-sm"
                  />
                </div>
                
                <div className="bg-[#151519] rounded-lg border border-[#1F1F23] p-4">
                  <h3 className="text-sm mb-4">Bloomberg Valuation (BVAL) Pricing Service</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-[#1F1F23]">
                          <th className="text-left text-xs text-[#A0A0A5] p-3">CUSIP</th>
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Issuer</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">BVAL Price</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">Market Price</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">Difference</th>
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Confidence</th>
                        </tr>
                      </thead>
                      <tbody>
                        {valuationPricing
                          .filter(item => 
                            item.cusip.toLowerCase().includes(searchBVAL.toLowerCase()) ||
                            item.issuer.toLowerCase().includes(searchBVAL.toLowerCase()) ||
                            item.confidence.toLowerCase().includes(searchBVAL.toLowerCase())
                          )
                          .map((item, idx) => (
                            <tr key={idx} className="border-b border-[#1F1F23] hover:bg-[#0D0D0F] transition-colors">
                              <td className="p-3 text-sm text-[#2979FF]">{item.cusip}</td>
                              <td className="p-3 text-sm">{item.issuer}</td>
                              <td className="p-3 text-sm text-right">{item.bval.toFixed(2)}</td>
                              <td className="p-3 text-sm text-right">{item.market.toFixed(2)}</td>
                              <td className={`p-3 text-sm text-right ${item.diff >= 0 ? 'text-[#00E0A4]' : 'text-[#FF5252]'}`}>
                                {item.diff >= 0 ? '+' : ''}{item.diff.toFixed(2)}
                              </td>
                              <td className="p-3">
                                <Badge className={`text-xs ${
                                  item.confidence === "High" ? 'bg-[#00E0A4]/20 text-[#00E0A4] border-[#00E0A4]/30' :
                                  'bg-[#FF9800]/20 text-[#FF9800] border-[#FF9800]/30'
                                }`}>
                                  {item.confidence}
                                </Badge>
                              </td>
                            </tr>
                          ))
                        }
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* DDP - Default Probability */}
            <TabsContent value="ddp" className="mt-0">
              <div className="space-y-4">
                {/* Search Input */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#A0A0A5]" />
                  <Input
                    placeholder="Search by issuer, rating, or trend..."
                    value={searchDDP}
                    onChange={(e) => setSearchDDP(e.target.value)}
                    className="pl-10 bg-[#151519] border-[#1F1F23] text-sm"
                  />
                </div>
                
                <div className="bg-[#151519] rounded-lg border border-[#1F1F23] p-4">
                  <h3 className="text-sm mb-4">Default Probability Models (%)</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-[#1F1F23]">
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Issuer</th>
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Rating</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">1-Year</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">3-Year</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">5-Year</th>
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Trend</th>
                        </tr>
                      </thead>
                      <tbody>
                        {defaultProb
                          .filter(item => 
                            item.issuer.toLowerCase().includes(searchDDP.toLowerCase()) ||
                            item.rating.toLowerCase().includes(searchDDP.toLowerCase()) ||
                            item.trend.toLowerCase().includes(searchDDP.toLowerCase())
                          )
                          .map((item, idx) => (
                            <tr key={idx} className="border-b border-[#1F1F23] hover:bg-[#0D0D0F] transition-colors">
                              <td className="p-3 text-sm">{item.issuer}</td>
                              <td className="p-3 text-sm text-[#A0A0A5]">{item.rating}</td>
                              <td className="p-3 text-sm text-right">{item.prob1y.toFixed(2)}%</td>
                              <td className="p-3 text-sm text-right">{item.prob3y.toFixed(2)}%</td>
                              <td className="p-3 text-sm text-right text-[#FF9800]">{item.prob5y.toFixed(2)}%</td>
                              <td className="p-3">
                                <Badge className={`text-xs ${
                                  item.trend === "Improving" ? 'bg-[#00E0A4]/20 text-[#00E0A4] border-[#00E0A4]/30' :
                                  'bg-[#2979FF]/20 text-[#2979FF] border-[#2979FF]/30'
                                }`}>
                                  {item.trend}
                                </Badge>
                              </td>
                            </tr>
                          ))
                        }
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
  );
}
