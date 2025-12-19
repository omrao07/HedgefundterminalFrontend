import { useState } from "react";
import { ScrollArea } from "../ui/scroll-area";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Progress } from "../ui/progress";
import { 
  Building2, Users, TrendingUp, TrendingDown, Activity, Search, 
  Target, BarChart2, DollarSign, 
  ArrowUpRight, ArrowDownRight, Sparkles, Briefcase
} from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export function ResearchFundamentalsTab() {
  const [activeSubTab, setActiveSubTab] = useState("overview");
  const [selectedSecurity, setSelectedSecurity] = useState("AAPL");
  const [searchInput, setSearchInput] = useState("AAPL");

  // Quick access tickers
  const quickTickers = ["AAPL", "MSFT", "GOOGL", "AMZN", "NVDA", "TSLA", "META", "JPM", "V", "WMT"];

  const handleSearch = (value: string) => {
    setSearchInput(value.toUpperCase());
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setSelectedSecurity(searchInput.trim());
    }
  };

  const handleQuickSelect = (ticker: string) => {
    setSearchInput(ticker);
    setSelectedSecurity(ticker);
  };

  // Overview Data
  const companyOverview = {
    symbol: selectedSecurity,
    name: "Apple Inc",
    sector: "Technology",
    industry: "Consumer Electronics",
    marketCap: "$2.87T",
    price: 186.50,
    change: +1.27,
    pe: 28.5,
    eps: 6.54,
    dividend: 0.96,
    beta: 1.24,
    volume: "52.4M",
    avgVolume: "48.2M"
  };

  // Top Holders
  const topHolders = [
    { rank: 1, holder: "Vanguard Group Inc", shares: 1289456234, percent: 8.42, value: "$240.2B", change: +0.2, type: "Institutional" },
    { rank: 2, holder: "BlackRock Inc", shares: 1156789123, percent: 7.56, value: "$215.8B", change: +0.1, type: "Institutional" },
    { rank: 3, holder: "Berkshire Hathaway Inc", shares: 915678234, percent: 5.98, value: "$170.8B", change: 0.0, type: "Institutional" },
    { rank: 4, holder: "State Street Corp", shares: 678923456, percent: 4.44, value: "$126.6B", change: -0.1, type: "Institutional" },
    { rank: 5, holder: "Fidelity Investments", shares: 567234123, percent: 3.71, value: "$105.8B", change: +0.3, type: "Institutional" },
  ];

  // Ownership Breakdown
  const ownershipBreakdown = [
    { category: "Institutional", percent: 62.4, holders: 3847, shares: "9.5B", color: "#2979FF" },
    { category: "Insider", percent: 0.07, holders: 14, shares: "10.7M", color: "#00E0A4" },
    { category: "Public/Retail", percent: 37.53, holders: "Millions", shares: "5.7B", color: "#FF9800" },
  ];

  // Analyst Recommendations
  const analystRecs = [
    { firm: "Goldman Sachs", analyst: "Michael Ng", rating: "Buy", priceTarget: 210, date: "Jan 25, 2025", change: "Upgrade" },
    { firm: "Morgan Stanley", analyst: "Erik Woodring", rating: "Overweight", priceTarget: 205, date: "Jan 22, 2025", change: "Maintain" },
    { firm: "J.P. Morgan", analyst: "Samik Chatterjee", rating: "Overweight", priceTarget: 215, date: "Jan 20, 2025", change: "Maintain" },
    { firm: "Bank of America", analyst: "Wamsi Mohan", rating: "Buy", priceTarget: 208, date: "Jan 18, 2025", change: "Upgrade" },
    { firm: "Barclays", analyst: "Tim Long", rating: "Equal Weight", priceTarget: 190, date: "Jan 15, 2025", change: "Downgrade" },
  ];

  // Consensus Rating Summary
  const consensusSummary = {
    strongBuy: 12,
    buy: 18,
    hold: 8,
    sell: 2,
    strongSell: 0,
    avgPriceTarget: 207.50,
    currentPrice: 186.50,
    upside: 11.3
  };

  // Financial Statements
  const financialStatements = [
    { quarter: "Q4 2023", revenue: 119.6, grossProfit: 54.9, opIncome: 40.3, netIncome: 33.9, eps: 2.18, margin: 28.4 },
    { quarter: "Q1 2024", revenue: 90.8, grossProfit: 41.2, opIncome: 28.6, netIncome: 23.6, eps: 1.53, margin: 26.0 },
    { quarter: "Q2 2024", revenue: 85.8, grossProfit: 38.9, opIncome: 26.4, netIncome: 21.4, eps: 1.40, margin: 24.9 },
    { quarter: "Q3 2024", revenue: 94.9, grossProfit: 44.3, opIncome: 31.2, netIncome: 25.0, eps: 1.64, margin: 26.3 },
  ];

  // Supply Chain
  const supplyChain = [
    { company: "Taiwan Semiconductor", relationship: "Chip Supplier", revenue: "$42.5B", dependence: "Critical", risk: "Medium" },
    { company: "Foxconn (Hon Hai)", relationship: "Assembly", revenue: "$38.2B", dependence: "High", risk: "Medium" },
    { company: "Samsung Electronics", relationship: "Displays/Memory", revenue: "$12.8B", dependence: "Medium", risk: "Low" },
    { company: "SK Hynix", relationship: "Memory Chips", revenue: "$8.4B", dependence: "Medium", risk: "Low" },
  ];

  const getRatingColor = (rating: string) => {
    if (rating.includes("Buy") || rating.includes("Overweight")) return "bg-[#00E0A4]/20 text-[#00E0A4] border-[#00E0A4]/30";
    if (rating.includes("Sell") || rating.includes("Underweight")) return "bg-[#FF5252]/20 text-[#FF5252] border-[#FF5252]/30";
    return "bg-[#2979FF]/20 text-[#2979FF] border-[#2979FF]/30";
  };

  return (
    <div className="h-[calc(100vh-120px)]">
      {/* Search Bar */}
      <div className="bg-[#151519] border-b border-[#1F1F23] p-4">
        <div className="flex items-center gap-4">
          <form onSubmit={handleSearchSubmit} className="flex-1 flex items-center gap-2">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#A0A0A5]" />
              <Input
                value={searchInput}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Enter ticker symbol (e.g., AAPL, MSFT, TSLA)..."
                className="bg-[#0D0D0F] border-[#1F1F23] pl-10 text-sm focus:border-[#00E0A4] transition-colors"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-[#00E0A4] text-[#0D0D0F] rounded-md hover:bg-[#00E0A4]/90 transition-colors text-sm font-medium"
            >
              Search
            </button>
          </form>
          <div className="text-xs text-[#A0A0A5]">
            Current: <span className="text-[#00E0A4] font-medium">{selectedSecurity}</span>
          </div>
        </div>
        {/* Quick Access Tickers */}
        <div className="flex items-center gap-2 mt-3">
          <span className="text-xs text-[#A0A0A5]">Quick:</span>
          <div className="flex flex-wrap gap-2">
            {quickTickers.map((ticker) => (
              <button
                key={ticker}
                onClick={() => handleQuickSelect(ticker)}
                className={`px-3 py-1 rounded text-xs transition-all ${
                  selectedSecurity === ticker
                    ? "bg-[#00E0A4] text-[#0D0D0F] font-medium"
                    : "bg-[#0D0D0F] text-[#A0A0A5] hover:bg-[#1F1F23] hover:text-[#E8E8E8] border border-[#1F1F23]"
                }`}
              >
                {ticker}
              </button>
            ))}
          </div>
        </div>
      </div>

      <Tabs value={activeSubTab} onValueChange={setActiveSubTab} className="h-full flex flex-col">
        <TabsList className="bg-[#1F1F23] border-b-2 border-[#2979FF]/20 rounded-none w-full justify-start p-0 h-12">
          <TabsTrigger value="overview" className="data-[state=active]:bg-[#151519] data-[state=active]:text-[#00E0A4] data-[state=active]:border-[#00E0A4] bg-transparent text-[#A0A0A5] hover:text-[#E8E8E8] hover:bg-[#151519]/50 rounded-none border-b-2 border-transparent px-4 transition-all whitespace-nowrap">
            Company Overview
          </TabsTrigger>
          <TabsTrigger value="analysts" className="data-[state=active]:bg-[#151519] data-[state=active]:text-[#00E0A4] data-[state=active]:border-[#00E0A4] bg-transparent text-[#A0A0A5] hover:text-[#E8E8E8] hover:bg-[#151519]/50 rounded-none border-b-2 border-transparent px-4 transition-all whitespace-nowrap">
            Analysts & Ratings
          </TabsTrigger>
          <TabsTrigger value="ownership" className="data-[state=active]:bg-[#151519] data-[state=active]:text-[#00E0A4] data-[state=active]:border-[#00E0A4] bg-transparent text-[#A0A0A5] hover:text-[#E8E8E8] hover:bg-[#151519]/50 rounded-none border-b-2 border-transparent px-4 transition-all whitespace-nowrap">
            Ownership & Holders
          </TabsTrigger>
          <TabsTrigger value="financials" className="data-[state=active]:bg-[#151519] data-[state=active]:text-[#00E0A4] data-[state=active]:border-[#00E0A4] bg-transparent text-[#A0A0A5] hover:text-[#E8E8E8] hover:bg-[#151519]/50 rounded-none border-b-2 border-transparent px-4 transition-all whitespace-nowrap">
            Financials
          </TabsTrigger>
        </TabsList>

        {/* Company Overview Tab */}
        <TabsContent value="overview" className="mt-0 flex-1 overflow-hidden">
          <ScrollArea className="h-full">
            <div className="p-4">
              <div className="space-y-4">
                {/* Company Header Card */}
                <div className="bg-gradient-to-r from-[#151519] via-[#151519] to-[#0D0D0F] rounded-lg border border-[#2979FF]/20 p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 bg-[#2979FF]/10 rounded-lg flex items-center justify-center">
                        <Building2 className="w-8 h-8 text-[#2979FF]" />
                      </div>
                      <div>
                        <h2 className="text-2xl mb-1">{companyOverview.name}</h2>
                        <div className="flex items-center gap-3 mb-2">
                          <Badge className="bg-[#2979FF]/20 text-[#2979FF] border-[#2979FF]/30">
                            {companyOverview.symbol}
                          </Badge>
                          <span className="text-sm text-[#A0A0A5]">{companyOverview.sector}</span>
                          <span className="text-sm text-[#A0A0A5]">•</span>
                          <span className="text-sm text-[#A0A0A5]">{companyOverview.industry}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-3xl">${companyOverview.price.toFixed(2)}</span>
                          <div className={`flex items-center gap-1 ${companyOverview.change >= 0 ? 'text-[#00E0A4]' : 'text-[#FF5252]'}`}>
                            {companyOverview.change >= 0 ? <ArrowUpRight className="w-5 h-5" /> : <ArrowDownRight className="w-5 h-5" />}
                            <span className="text-lg">{companyOverview.change >= 0 ? '+' : ''}{companyOverview.change}%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Key Metrics Grid */}
                <div className="grid grid-cols-4 gap-4">
                  <div className="bg-gradient-to-br from-[#151519] to-[#0D0D0F] rounded-lg border border-[#1F1F23] p-4 hover:border-[#2979FF]/30 transition-all">
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="w-4 h-4 text-[#2979FF]" />
                      <div className="text-xs text-[#A0A0A5]">Market Cap</div>
                    </div>
                    <div className="text-2xl mb-1">{companyOverview.marketCap}</div>
                    <div className="text-xs text-[#2979FF]">Large Cap</div>
                  </div>
                  <div className="bg-gradient-to-br from-[#151519] to-[#0D0D0F] rounded-lg border border-[#1F1F23] p-4 hover:border-[#00E0A4]/30 transition-all">
                    <div className="flex items-center gap-2 mb-2">
                      <Activity className="w-4 h-4 text-[#00E0A4]" />
                      <div className="text-xs text-[#A0A0A5]">P/E Ratio</div>
                    </div>
                    <div className="text-2xl mb-1 text-[#00E0A4]">{companyOverview.pe}</div>
                    <div className="text-xs text-[#00E0A4]">Premium valuation</div>
                  </div>
                  <div className="bg-gradient-to-br from-[#151519] to-[#0D0D0F] rounded-lg border border-[#1F1F23] p-4 hover:border-[#FF9800]/30 transition-all">
                    <div className="flex items-center gap-2 mb-2">
                      <DollarSign className="w-4 h-4 text-[#FF9800]" />
                      <div className="text-xs text-[#A0A0A5]">EPS (TTM)</div>
                    </div>
                    <div className="text-2xl mb-1 text-[#FF9800]">${companyOverview.eps}</div>
                    <div className="text-xs text-[#FF9800]">Strong earnings</div>
                  </div>
                  <div className="bg-gradient-to-br from-[#151519] to-[#0D0D0F] rounded-lg border border-[#1F1F23] p-4 hover:border-[#2979FF]/30 transition-all">
                    <div className="flex items-center gap-2 mb-2">
                      <BarChart2 className="w-4 h-4 text-[#2979FF]" />
                      <div className="text-xs text-[#A0A0A5]">Beta</div>
                    </div>
                    <div className="text-2xl mb-1">{companyOverview.beta}</div>
                    <div className="text-xs text-[#A0A0A5]">Moderate volatility</div>
                  </div>
                </div>

                {/* Supply Chain Analysis */}
                <div className="bg-[#151519] rounded-lg border border-[#1F1F23] overflow-hidden">
                  <div className="p-4 border-b border-[#1F1F23] bg-gradient-to-r from-[#151519] to-[#0D0D0F]">
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-[#2979FF]" />
                      <h3 className="text-sm">Supply Chain Analysis</h3>
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-[#1F1F23] bg-[#0D0D0F]">
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Company</th>
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Relationship</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">Revenue Impact</th>
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Dependence</th>
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Risk Level</th>
                        </tr>
                      </thead>
                      <tbody>
                        {supplyChain.map((item, idx) => (
                          <tr key={idx} className="border-b border-[#1F1F23] hover:bg-[#0D0D0F]/50 transition-all">
                            <td className="p-3 text-sm">{item.company}</td>
                            <td className="p-3">
                              <Badge className="bg-[#2979FF]/20 text-[#2979FF] border-[#2979FF]/30 text-xs">
                                {item.relationship}
                              </Badge>
                            </td>
                            <td className="p-3 text-sm text-right text-[#00E0A4]">{item.revenue}</td>
                            <td className="p-3">
                              <Badge className={`text-xs ${
                                item.dependence === 'Critical' ? 'bg-[#FF5252]/20 text-[#FF5252] border-[#FF5252]/30' :
                                item.dependence === 'High' ? 'bg-[#FF9800]/20 text-[#FF9800] border-[#FF9800]/30' :
                                'bg-[#2979FF]/20 text-[#2979FF] border-[#2979FF]/30'
                              }`}>
                                {item.dependence}
                              </Badge>
                            </td>
                            <td className="p-3">
                              <Badge className={`text-xs ${
                                item.risk === 'High' ? 'bg-[#FF5252]/20 text-[#FF5252] border-[#FF5252]/30' :
                                item.risk === 'Medium' ? 'bg-[#FF9800]/20 text-[#FF9800] border-[#FF9800]/30' :
                                'bg-[#00E0A4]/20 text-[#00E0A4] border-[#00E0A4]/30'
                              }`}>
                                {item.risk}
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </ScrollArea>
        </TabsContent>

        {/* Analysts & Ratings Tab */}
        <TabsContent value="analysts" className="mt-0 flex-1 overflow-hidden">
          <ScrollArea className="h-full">
            <div className="p-4">
              <div className="space-y-4">
                {/* Consensus Summary */}
                <div className="bg-gradient-to-r from-[#151519] via-[#151519] to-[#0D0D0F] rounded-lg border border-[#2979FF]/20 p-6">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="p-2 bg-[#2979FF]/10 rounded-lg">
                      <Sparkles className="w-5 h-5 text-[#2979FF]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm mb-1">Analyst Consensus</h3>
                      <p className="text-xs text-[#A0A0A5]">
                        {consensusSummary.strongBuy + consensusSummary.buy + consensusSummary.hold + consensusSummary.sell + consensusSummary.strongSell} analysts covering {selectedSecurity}
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <div className="text-xs text-[#A0A0A5] mb-2">Rating Distribution</div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-[#00E0A4]">Strong Buy</span>
                          <span>{consensusSummary.strongBuy}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-[#00E0A4]">Buy</span>
                          <span>{consensusSummary.buy}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-[#2979FF]">Hold</span>
                          <span>{consensusSummary.hold}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-[#FF5252]">Sell</span>
                          <span>{consensusSummary.sell}</span>
                        </div>
                      </div>
                    </div>
                    <div className="border-l border-[#1F1F23] pl-4">
                      <div className="text-xs text-[#A0A0A5] mb-2">Price Targets</div>
                      <div className="space-y-3">
                        <div>
                          <div className="text-xs text-[#A0A0A5] mb-1">Avg Target</div>
                          <div className="text-2xl text-[#00E0A4]">${consensusSummary.avgPriceTarget.toFixed(2)}</div>
                        </div>
                        <div>
                          <div className="text-xs text-[#A0A0A5] mb-1">Current Price</div>
                          <div className="text-xl">${consensusSummary.currentPrice.toFixed(2)}</div>
                        </div>
                      </div>
                    </div>
                    <div className="border-l border-[#1F1F23] pl-4">
                      <div className="text-xs text-[#A0A0A5] mb-2">Upside Potential</div>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="text-3xl text-[#00E0A4]">+{consensusSummary.upside.toFixed(1)}%</div>
                        <TrendingUp className="w-6 h-6 text-[#00E0A4]" />
                      </div>
                      <Progress value={consensusSummary.upside * 5} className="h-2" />
                      <div className="text-xs text-[#A0A0A5] mt-2">Based on {consensusSummary.strongBuy + consensusSummary.buy + consensusSummary.hold + consensusSummary.sell} analysts</div>
                    </div>
                  </div>
                </div>

                {/* Recent Analyst Actions */}
                <div className="bg-[#151519] rounded-lg border border-[#1F1F23] overflow-hidden">
                  <div className="p-4 border-b border-[#1F1F23] bg-gradient-to-r from-[#151519] to-[#0D0D0F]">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm">Recent Analyst Actions</h3>
                      <Badge className="bg-[#0D0D0F] text-[#A0A0A5] border-[#1F1F23] text-xs">
                        Last 7 Days
                      </Badge>
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-[#1F1F23] bg-[#0D0D0F]">
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Firm</th>
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Analyst</th>
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Rating</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">Price Target</th>
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Action</th>
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {analystRecs.map((rec, idx) => (
                          <tr key={idx} className="border-b border-[#1F1F23] hover:bg-[#0D0D0F]/50 transition-all">
                            <td className="p-3 text-sm font-medium">{rec.firm}</td>
                            <td className="p-3 text-sm text-[#A0A0A5]">{rec.analyst}</td>
                            <td className="p-3">
                              <Badge className={getRatingColor(rec.rating) + " text-xs"}>
                                {rec.rating}
                              </Badge>
                            </td>
                            <td className="p-3 text-sm text-right text-[#00E0A4]">${rec.priceTarget}</td>
                            <td className="p-3">
                              <Badge className={`text-xs ${
                                rec.change === 'Upgrade' ? 'bg-[#00E0A4]/20 text-[#00E0A4] border-[#00E0A4]/30' :
                                rec.change === 'Downgrade' ? 'bg-[#FF5252]/20 text-[#FF5252] border-[#FF5252]/30' :
                                'bg-[#2979FF]/20 text-[#2979FF] border-[#2979FF]/30'
                              }`}>
                                {rec.change}
                              </Badge>
                            </td>
                            <td className="p-3 text-sm text-[#A0A0A5]">{rec.date}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </ScrollArea>
        </TabsContent>

        {/* Ownership & Holders Tab */}
        <TabsContent value="ownership" className="mt-0 flex-1 overflow-hidden">
          <ScrollArea className="h-full">
            <div className="p-4">
              <div className="space-y-4">
                {/* Ownership Breakdown */}
                <div className="grid grid-cols-3 gap-4">
                  {ownershipBreakdown.map((item, idx) => (
                    <div key={idx} className="bg-gradient-to-br from-[#151519] to-[#0D0D0F] rounded-lg border border-[#1F1F23] p-4 hover:border-[#2979FF]/30 transition-all">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-[#2979FF]" />
                          <span className="text-sm">{item.category}</span>
                        </div>
                        <Badge className="bg-[#2979FF]/20 text-[#2979FF] border-[#2979FF]/30 text-xs">
                          {typeof item.holders === 'number' ? item.holders.toLocaleString() : item.holders}
                        </Badge>
                      </div>
                      <div className="text-3xl mb-2" style={{ color: item.color }}>
                        {item.percent.toFixed(2)}%
                      </div>
                      <div className="text-xs text-[#A0A0A5] mb-2">{item.shares} shares</div>
                      <Progress value={item.percent} className="h-1.5" />
                    </div>
                  ))}
                </div>

                {/* Top Institutional Holders */}
                <div className="bg-[#151519] rounded-lg border border-[#1F1F23] overflow-hidden">
                  <div className="p-4 border-b border-[#1F1F23] bg-gradient-to-r from-[#151519] to-[#0D0D0F]">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-[#2979FF]" />
                      <h3 className="text-sm">Top Institutional Holders</h3>
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-[#1F1F23] bg-[#0D0D0F]">
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Rank</th>
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Holder</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">Shares</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">% Outstanding</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">Value</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">Change</th>
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Type</th>
                        </tr>
                      </thead>
                      <tbody>
                        {topHolders.map((holder, idx) => (
                          <tr key={idx} className="border-b border-[#1F1F23] hover:bg-[#0D0D0F]/50 transition-all">
                            <td className="p-3">
                              <div className="w-6 h-6 bg-[#2979FF]/10 rounded flex items-center justify-center text-xs text-[#2979FF]">
                                {holder.rank}
                              </div>
                            </td>
                            <td className="p-3 text-sm font-medium">{holder.holder}</td>
                            <td className="p-3 text-sm text-right">{holder.shares.toLocaleString()}</td>
                            <td className="p-3 text-sm text-right">{holder.percent.toFixed(2)}%</td>
                            <td className="p-3 text-sm text-right text-[#00E0A4]">{holder.value}</td>
                            <td className="p-3 text-right">
                              <span className={`text-sm ${holder.change >= 0 ? 'text-[#00E0A4]' : 'text-[#FF5252]'}`}>
                                {holder.change >= 0 ? '+' : ''}{holder.change}%
                              </span>
                            </td>
                            <td className="p-3">
                              <Badge className="bg-[#2979FF]/20 text-[#2979FF] border-[#2979FF]/30 text-xs">
                                {holder.type}
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </ScrollArea>
        </TabsContent>

        {/* Financials Tab */}
        <TabsContent value="financials" className="mt-0 flex-1 overflow-hidden">
          <ScrollArea className="h-full">
            <div className="p-4">
              <div className="space-y-4">
                {/* Revenue Chart */}
                <div className="bg-[#151519] rounded-lg border border-[#1F1F23] p-4">
                  <div className="flex items-center gap-2 mb-4">
                    <BarChart2 className="w-4 h-4 text-[#2979FF]" />
                    <h3 className="text-sm">Quarterly Revenue Trend</h3>
                  </div>
                  <ResponsiveContainer width="100%" height={240}>
                    <AreaChart data={financialStatements}>
                      <defs>
                        <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#2979FF" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#2979FF" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1F1F23" />
                      <XAxis dataKey="quarter" stroke="#A0A0A5" tick={{ fill: '#A0A0A5', fontSize: 10 }} />
                      <YAxis stroke="#A0A0A5" tick={{ fill: '#A0A0A5', fontSize: 10 }} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#0D0D0F', 
                          border: '1px solid #1F1F23',
                          borderRadius: '6px',
                          fontSize: '12px'
                        }}
                      />
                      <Area type="monotone" dataKey="revenue" stroke="#2979FF" strokeWidth={2} fill="url(#revenueGrad)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                {/* Financial Statements Table */}
                <div className="bg-[#151519] rounded-lg border border-[#1F1F23] overflow-hidden">
                  <div className="p-4 border-b border-[#1F1F23] bg-gradient-to-r from-[#151519] to-[#0D0D0F]">
                    <h3 className="text-sm">Quarterly Financial Statements ($B)</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-[#1F1F23] bg-[#0D0D0F]">
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Quarter</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">Revenue</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">Gross Profit</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">Operating Income</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">Net Income</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">EPS</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">Net Margin %</th>
                        </tr>
                      </thead>
                      <tbody>
                        {financialStatements.map((statement, idx) => (
                          <tr key={idx} className="border-b border-[#1F1F23] hover:bg-[#0D0D0F]/50 transition-all">
                            <td className="p-3 text-sm font-medium">{statement.quarter}</td>
                            <td className="p-3 text-sm text-right">${statement.revenue.toFixed(1)}B</td>
                            <td className="p-3 text-sm text-right text-[#00E0A4]">${statement.grossProfit.toFixed(1)}B</td>
                            <td className="p-3 text-sm text-right">${statement.opIncome.toFixed(1)}B</td>
                            <td className="p-3 text-sm text-right text-[#00E0A4]">${statement.netIncome.toFixed(1)}B</td>
                            <td className="p-3 text-sm text-right">${statement.eps.toFixed(2)}</td>
                            <td className="p-3">
                              <div className="flex items-center justify-end gap-2">
                                <Progress value={statement.margin * 3} className="h-1.5 w-16" />
                                <span className="text-sm w-12 text-right">{statement.margin.toFixed(1)}%</span>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
}
