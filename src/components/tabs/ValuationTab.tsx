import { useState } from "react";
import { ScrollArea } from "../ui/scroll-area";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Progress } from "../ui/progress";
import { TrendingUp, TrendingDown, Calculator, Search, Target, BarChart2, Globe2, Sparkles, ArrowUpRight, ArrowDownRight, Activity } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area, Cell } from "recharts";

export function ValuationTab() {
  const [activeSubTab, setActiveSubTab] = useState("dcf");
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

  // Damodaran-style valuations
  const valuations = [
    { 
      symbol: "AAPL", 
      currentPrice: 186.50, 
      fairValue: 195.20, 
      upside: 4.7,
      method: "DCF",
      wacc: 8.2,
      terminalGrowth: 3.0,
      confidence: 87
    },
    { 
      symbol: "MSFT", 
      currentPrice: 405.30, 
      fairValue: 428.60, 
      upside: 5.7,
      method: "DCF",
      wacc: 7.8,
      terminalGrowth: 3.5,
      confidence: 89
    },
    { 
      symbol: "GOOGL", 
      currentPrice: 142.80, 
      fairValue: 168.40, 
      upside: 17.9,
      method: "DCF",
      wacc: 8.5,
      terminalGrowth: 4.0,
      confidence: 82
    },
    { 
      symbol: "TSLA", 
      currentPrice: 218.50, 
      fairValue: 185.30, 
      upside: -15.2,
      method: "DCF",
      wacc: 12.5,
      terminalGrowth: 2.5,
      confidence: 65
    },
  ];

  // Relative valuation
  const relativeValuation = [
    { symbol: "AAPL", pe: 28.5, pegRatio: 2.1, sector: "Technology", sectorPE: 32.4, discount: 12.0 },
    { symbol: "MSFT", pe: 35.2, pegRatio: 2.8, sector: "Technology", sectorPE: 32.4, discount: -8.6 },
    { symbol: "JPM", pe: 11.8, pegRatio: 1.4, sector: "Financials", sectorPE: 13.2, discount: 10.6 },
    { symbol: "JNJ", pe: 15.6, pegRatio: 2.9, sector: "Healthcare", sectorPE: 18.7, discount: 16.6 },
  ];

  // Damodaran risk premium data
  const countryRiskPremiums = [
    { country: "United States", equityRisk: 5.5, defaultSpread: 0.0, rating: "AAA" },
    { country: "Germany", equityRisk: 6.2, defaultSpread: 0.3, rating: "AAA" },
    { country: "China", equityRisk: 7.8, defaultSpread: 1.5, rating: "A+" },
    { country: "India", equityRisk: 8.5, defaultSpread: 2.2, rating: "BBB-" },
    { country: "Brazil", equityRisk: 9.2, defaultSpread: 2.8, rating: "BB-" },
  ];

  // Monte Carlo simulation results
  const monteCarloResults = {
    symbol: selectedSecurity,
    simulations: 10000,
    mean: 195.20,
    median: 193.80,
    std: 24.50,
    percentile5: 158.30,
    percentile95: 238.70,
    probUpside: 72.4,
  };

  // DCF assumptions
  const dcfAssumptions = [
    { year: "2025E", revenue: 402.5, growthRate: 5.2, ebitMargin: 32.4, fcf: 98.2 },
    { year: "2026E", revenue: 423.8, growthRate: 5.3, ebitMargin: 32.8, fcf: 104.5 },
    { year: "2027E", revenue: 445.2, growthRate: 5.1, ebitMargin: 33.1, fcf: 110.8 },
    { year: "2028E", revenue: 466.9, growthRate: 4.9, ebitMargin: 33.4, fcf: 117.2 },
    { year: "2029E", revenue: 487.8, growthRate: 4.5, ebitMargin: 33.6, fcf: 123.1 },
    { year: "Terminal", revenue: 502.4, growthRate: 3.0, ebitMargin: 33.8, fcf: 2847.5 },
  ];

  // Chart data for visualizations
  const fcfChartData = dcfAssumptions.slice(0, 5).map(d => ({
    year: d.year,
    fcf: d.fcf,
  }));

  const revenueChartData = dcfAssumptions.slice(0, 5).map(d => ({
    year: d.year,
    revenue: d.revenue,
  }));

  const peComparisonData = relativeValuation.map(v => ({
    symbol: v.symbol,
    pe: v.pe,
    sectorPE: v.sectorPE,
  }));

  const riskPremiumChart = countryRiskPremiums.map(c => ({
    country: c.country.substring(0, 3).toUpperCase(),
    risk: c.equityRisk,
  }));

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
              className="px-4 py-2 bg-[#00E0A4] text-[#0D0D0F] rounded-md hover:bg-[#00E0A4]/90 transition-colors text-sm"
            >
              Search
            </button>
          </form>
          <div className="text-xs text-[#A0A0A5]">
            Current: <span className="text-[#00E0A4]">{selectedSecurity}</span>
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
                    ? "bg-[#00E0A4] text-[#0D0D0F]"
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
          <TabsTrigger value="dcf" className="data-[state=active]:bg-[#151519] data-[state=active]:text-[#00E0A4] data-[state=active]:border-[#00E0A4] bg-transparent text-[#A0A0A5] hover:text-[#E8E8E8] hover:bg-[#151519]/50 rounded-none border-b-2 border-transparent px-6 transition-all">
            DCF Valuation
          </TabsTrigger>
          <TabsTrigger value="relative" className="data-[state=active]:bg-[#151519] data-[state=active]:text-[#00E0A4] data-[state=active]:border-[#00E0A4] bg-transparent text-[#A0A0A5] hover:text-[#E8E8E8] hover:bg-[#151519]/50 rounded-none border-b-2 border-transparent px-6 transition-all">
            Relative Valuation
          </TabsTrigger>
          <TabsTrigger value="risk" className="data-[state=active]:bg-[#151519] data-[state=active]:text-[#00E0A4] data-[state=active]:border-[#00E0A4] bg-transparent text-[#A0A0A5] hover:text-[#E8E8E8] hover:bg-[#151519]/50 rounded-none border-b-2 border-transparent px-6 transition-all">
            Country Risk Premiums
          </TabsTrigger>
          <TabsTrigger value="monte" className="data-[state=active]:bg-[#151519] data-[state=active]:text-[#00E0A4] data-[state=active]:border-[#00E0A4] bg-transparent text-[#A0A0A5] hover:text-[#E8E8E8] hover:bg-[#151519]/50 rounded-none border-b-2 border-transparent px-6 transition-all">
            Monte Carlo
          </TabsTrigger>
        </TabsList>

        <ScrollArea className="flex-1">
          <div className="p-4">
            {/* DCF Valuation Tab */}
            <TabsContent value="dcf" className="mt-0">
              <div className="space-y-4">
                {/* Hero Stats */}
                <div className="grid grid-cols-4 gap-4">
                  <div className="bg-gradient-to-br from-[#151519] to-[#0D0D0F] rounded-lg border border-[#2979FF]/30 p-4 hover:border-[#2979FF]/50 transition-all group">
                    <div className="flex items-center justify-between mb-2">
                      <Calculator className="w-5 h-5 text-[#2979FF]" />
                      <Badge className="bg-[#2979FF]/20 text-[#2979FF] border-[#2979FF]/30 text-xs">Active</Badge>
                    </div>
                    <div className="text-2xl mb-1">2,847</div>
                    <div className="text-xs text-[#A0A0A5]">Companies Analyzed</div>
                    <div className="mt-2 text-xs text-[#00E0A4] flex items-center gap-1">
                      <ArrowUpRight className="w-3 h-3" />
                      +127 this week
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-[#151519] to-[#0D0D0F] rounded-lg border border-[#00E0A4]/30 p-4 hover:border-[#00E0A4]/50 transition-all group">
                    <div className="flex items-center justify-between mb-2">
                      <Target className="w-5 h-5 text-[#00E0A4]" />
                      <div className="text-xs text-[#00E0A4]">High</div>
                    </div>
                    <div className="text-2xl mb-1 text-[#00E0A4]">81%</div>
                    <div className="text-xs text-[#A0A0A5]">Avg Confidence Score</div>
                    <Progress value={81} className="mt-2 h-1.5" />
                  </div>
                  <div className="bg-gradient-to-br from-[#151519] to-[#0D0D0F] rounded-lg border border-[#00E0A4]/30 p-4 hover:border-[#00E0A4]/50 transition-all group">
                    <div className="flex items-center justify-between mb-2">
                      <TrendingUp className="w-5 h-5 text-[#00E0A4]" />
                      <Badge className="bg-[#00E0A4]/20 text-[#00E0A4] border-[#00E0A4]/30 text-xs">Buy</Badge>
                    </div>
                    <div className="text-2xl mb-1 text-[#00E0A4]">1,245</div>
                    <div className="text-xs text-[#A0A0A5]">Undervalued Securities</div>
                    <div className="mt-2 text-xs text-[#00E0A4]">43.7% of universe</div>
                  </div>
                  <div className="bg-gradient-to-br from-[#151519] to-[#0D0D0F] rounded-lg border border-[#FF5252]/30 p-4 hover:border-[#FF5252]/50 transition-all group">
                    <div className="flex items-center justify-between mb-2">
                      <TrendingDown className="w-5 h-5 text-[#FF5252]" />
                      <Badge className="bg-[#FF5252]/20 text-[#FF5252] border-[#FF5252]/30 text-xs">Sell</Badge>
                    </div>
                    <div className="text-2xl mb-1 text-[#FF5252]">892</div>
                    <div className="text-xs text-[#A0A0A5]">Overvalued Securities</div>
                    <div className="mt-2 text-xs text-[#FF5252]">31.3% of universe</div>
                  </div>
                </div>

                {/* Damodaran Framework Info */}
                <div className="bg-gradient-to-r from-[#151519] via-[#151519] to-[#0D0D0F] rounded-lg border border-[#2979FF]/20 p-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-[#2979FF]/10 rounded-lg">
                      <Sparkles className="w-5 h-5 text-[#2979FF]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm mb-1 flex items-center gap-2">
                        Damodaran Valuation Framework
                        <Badge className="bg-[#2979FF]/20 text-[#2979FF] border-[#2979FF]/30 text-xs">NYU Stern</Badge>
                      </h3>
                      <p className="text-xs text-[#A0A0A5] leading-relaxed">
                        Based on Professor Aswath Damodaran's industry-leading methodologies. 
                        Incorporates intrinsic DCF analysis, country risk premiums, and fundamental value drivers.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Intrinsic DCF Valuations - Enhanced */}
                <div className="bg-[#151519] rounded-lg border border-[#1F1F23] overflow-hidden">
                  <div className="p-4 border-b border-[#1F1F23] bg-gradient-to-r from-[#151519] to-[#0D0D0F]">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <BarChart2 className="w-4 h-4 text-[#2979FF]" />
                        <h3 className="text-sm">Intrinsic DCF Valuations</h3>
                      </div>
                      <Badge className="bg-[#0D0D0F] text-[#A0A0A5] border-[#1F1F23] text-xs">
                        {valuations.length} Securities
                      </Badge>
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-[#1F1F23] bg-[#0D0D0F]">
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Symbol</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">Current Price</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">Fair Value</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">Upside %</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">WACC %</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">Terminal Growth %</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">Confidence</th>
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Rating</th>
                        </tr>
                      </thead>
                      <tbody>
                        {valuations.map((val, idx) => (
                          <tr key={idx} className="border-b border-[#1F1F23] hover:bg-[#0D0D0F]/50 transition-all group">
                            <td className="p-3">
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-[#2979FF]/10 rounded flex items-center justify-center text-xs text-[#2979FF]">
                                  {val.symbol.charAt(0)}
                                </div>
                                <span className="text-sm text-[#2979FF]">{val.symbol}</span>
                              </div>
                            </td>
                            <td className="p-3 text-sm text-right">${val.currentPrice.toFixed(2)}</td>
                            <td className="p-3 text-sm text-right font-medium">${val.fairValue.toFixed(2)}</td>
                            <td className="p-3 text-right">
                              <div className="flex items-center justify-end gap-1">
                                {val.upside >= 0 ? (
                                  <ArrowUpRight className="w-3 h-3 text-[#00E0A4]" />
                                ) : (
                                  <ArrowDownRight className="w-3 h-3 text-[#FF5252]" />
                                )}
                                <span className={`text-sm ${val.upside >= 0 ? 'text-[#00E0A4]' : 'text-[#FF5252]'}`}>
                                  {val.upside >= 0 ? '+' : ''}{val.upside.toFixed(1)}%
                                </span>
                              </div>
                            </td>
                            <td className="p-3 text-sm text-right">{val.wacc.toFixed(1)}%</td>
                            <td className="p-3 text-sm text-right">{val.terminalGrowth.toFixed(1)}%</td>
                            <td className="p-3">
                              <div className="flex items-center justify-end gap-2">
                                <Progress value={val.confidence} className="h-1.5 w-16" />
                                <span className="text-sm w-8 text-right">{val.confidence}%</span>
                              </div>
                            </td>
                            <td className="p-3">
                              <Badge className={`text-xs ${
                                val.upside >= 10 ? 'bg-[#00E0A4]/20 text-[#00E0A4] border-[#00E0A4]/30' :
                                val.upside >= 0 ? 'bg-[#2979FF]/20 text-[#2979FF] border-[#2979FF]/30' :
                                'bg-[#FF5252]/20 text-[#FF5252] border-[#FF5252]/30'
                              }`}>
                                {val.upside >= 10 ? 'Strong Buy' : val.upside >= 0 ? 'Buy' : 'Sell'}
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* DCF Model Projections with Charts */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Revenue Chart */}
                  <div className="bg-[#151519] rounded-lg border border-[#1F1F23] p-4">
                    <div className="flex items-center gap-2 mb-4">
                      <Activity className="w-4 h-4 text-[#2979FF]" />
                      <h3 className="text-sm">Revenue Projections - {selectedSecurity}</h3>
                    </div>
                    <ResponsiveContainer width="100%" height={200}>
                      <AreaChart data={revenueChartData}>
                        <defs>
                          <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#2979FF" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#2979FF" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1F1F23" />
                        <XAxis dataKey="year" stroke="#A0A0A5" tick={{ fill: '#A0A0A5', fontSize: 10 }} />
                        <YAxis stroke="#A0A0A5" tick={{ fill: '#A0A0A5', fontSize: 10 }} />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: '#0D0D0F', 
                            border: '1px solid #1F1F23',
                            borderRadius: '6px',
                            fontSize: '12px'
                          }}
                        />
                        <Area type="monotone" dataKey="revenue" stroke="#2979FF" strokeWidth={2} fill="url(#revenueGradient)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>

                  {/* FCF Chart */}
                  <div className="bg-[#151519] rounded-lg border border-[#1F1F23] p-4">
                    <div className="flex items-center gap-2 mb-4">
                      <TrendingUp className="w-4 h-4 text-[#00E0A4]" />
                      <h3 className="text-sm">Free Cash Flow Projections</h3>
                    </div>
                    <ResponsiveContainer width="100%" height={200}>
                      <BarChart data={fcfChartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1F1F23" />
                        <XAxis dataKey="year" stroke="#A0A0A5" tick={{ fill: '#A0A0A5', fontSize: 10 }} />
                        <YAxis stroke="#A0A0A5" tick={{ fill: '#A0A0A5', fontSize: 10 }} />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: '#0D0D0F', 
                            border: '1px solid #1F1F23',
                            borderRadius: '6px',
                            fontSize: '12px'
                          }}
                        />
                        <Bar dataKey="fcf" radius={[4, 4, 0, 0]}>
                          {fcfChartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill="#00E0A4" opacity={0.8 + (index * 0.04)} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* DCF Assumptions Table */}
                <div className="bg-[#151519] rounded-lg border border-[#1F1F23] overflow-hidden">
                  <div className="p-4 border-b border-[#1F1F23] bg-gradient-to-r from-[#151519] to-[#0D0D0F]">
                    <h3 className="text-sm flex items-center gap-2">
                      DCF Model - {selectedSecurity} Detailed Projections
                      <Badge className="bg-[#00E0A4]/20 text-[#00E0A4] border-[#00E0A4]/30 text-xs">5Y Forecast</Badge>
                    </h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-[#1F1F23] bg-[#0D0D0F]">
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Year</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">Revenue ($B)</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">Growth %</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">EBIT Margin %</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">FCF ($B)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {dcfAssumptions.map((year, idx) => (
                          <tr key={idx} className={`border-b border-[#1F1F23] hover:bg-[#0D0D0F]/50 transition-colors ${year.year === 'Terminal' ? 'bg-[#2979FF]/5' : ''}`}>
                            <td className="p-3">
                              <span className={`text-sm ${year.year === 'Terminal' ? 'text-[#2979FF]' : ''}`}>
                                {year.year}
                              </span>
                            </td>
                            <td className="p-3 text-sm text-right">${year.revenue.toFixed(1)}</td>
                            <td className="p-3 text-sm text-right">{year.growthRate.toFixed(1)}%</td>
                            <td className="p-3 text-sm text-right">
                              <div className="flex items-center justify-end gap-2">
                                <Progress value={year.ebitMargin} className="h-1 w-12" />
                                <span>{year.ebitMargin.toFixed(1)}%</span>
                              </div>
                            </td>
                            <td className="p-3 text-sm text-right">
                              <span className={year.year === 'Terminal' ? 'text-[#2979FF]' : 'text-[#00E0A4]'}>
                                ${year.fcf.toFixed(1)}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Relative Valuation Tab */}
            <TabsContent value="relative" className="mt-0">
              <div className="space-y-4">
                {/* P/E Comparison Chart */}
                <div className="bg-[#151519] rounded-lg border border-[#1F1F23] p-4">
                  <div className="flex items-center gap-2 mb-4">
                    <BarChart2 className="w-4 h-4 text-[#2979FF]" />
                    <h3 className="text-sm">P/E Ratio Comparison - Company vs Sector</h3>
                  </div>
                  <ResponsiveContainer width="100%" height={240}>
                    <BarChart data={peComparisonData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1F1F23" />
                      <XAxis dataKey="symbol" stroke="#A0A0A5" tick={{ fill: '#A0A0A5', fontSize: 11 }} />
                      <YAxis stroke="#A0A0A5" tick={{ fill: '#A0A0A5', fontSize: 11 }} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#0D0D0F', 
                          border: '1px solid #1F1F23',
                          borderRadius: '6px',
                          fontSize: '12px'
                        }}
                      />
                      <Bar dataKey="pe" fill="#00E0A4" radius={[4, 4, 0, 0]} name="Company P/E" />
                      <Bar dataKey="sectorPE" fill="#2979FF" radius={[4, 4, 0, 0]} name="Sector P/E" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Relative Valuation Table */}
                <div className="bg-[#151519] rounded-lg border border-[#1F1F23] overflow-hidden">
                  <div className="p-4 border-b border-[#1F1F23] bg-gradient-to-r from-[#151519] to-[#0D0D0F]">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm">Relative Valuation - Peer Comparison</h3>
                      <Badge className="bg-[#0D0D0F] text-[#A0A0A5] border-[#1F1F23] text-xs">
                        Multiple Analysis
                      </Badge>
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-[#1F1F23] bg-[#0D0D0F]">
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Symbol</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">P/E Ratio</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">PEG Ratio</th>
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Sector</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">Sector P/E</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">Premium/Discount %</th>
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Valuation</th>
                        </tr>
                      </thead>
                      <tbody>
                        {relativeValuation.map((val, idx) => (
                          <tr key={idx} className="border-b border-[#1F1F23] hover:bg-[#0D0D0F]/50 transition-all">
                            <td className="p-3">
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-[#2979FF]/10 rounded flex items-center justify-center text-xs text-[#2979FF]">
                                  {val.symbol.charAt(0)}
                                </div>
                                <span className="text-sm text-[#2979FF]">{val.symbol}</span>
                              </div>
                            </td>
                            <td className="p-3 text-sm text-right">{val.pe.toFixed(1)}x</td>
                            <td className="p-3 text-sm text-right">{val.pegRatio.toFixed(1)}x</td>
                            <td className="p-3">
                              <Badge className="bg-[#0D0D0F] text-[#A0A0A5] border-[#1F1F23] text-xs">
                                {val.sector}
                              </Badge>
                            </td>
                            <td className="p-3 text-sm text-right text-[#A0A0A5]">{val.sectorPE.toFixed(1)}x</td>
                            <td className="p-3 text-right">
                              <div className="flex items-center justify-end gap-1">
                                {val.discount >= 0 ? (
                                  <TrendingDown className="w-3 h-3 text-[#00E0A4]" />
                                ) : (
                                  <TrendingUp className="w-3 h-3 text-[#FF5252]" />
                                )}
                                <span className={`text-sm ${val.discount >= 0 ? 'text-[#00E0A4]' : 'text-[#FF5252]'}`}>
                                  {val.discount >= 0 ? '+' : ''}{val.discount.toFixed(1)}%
                                </span>
                              </div>
                            </td>
                            <td className="p-3">
                              <Badge className={`text-xs ${
                                val.discount >= 10 ? 'bg-[#00E0A4]/20 text-[#00E0A4] border-[#00E0A4]/30' :
                                val.discount >= 0 ? 'bg-[#2979FF]/20 text-[#2979FF] border-[#2979FF]/30' :
                                'bg-[#FF5252]/20 text-[#FF5252] border-[#FF5252]/30'
                              }`}>
                                {val.discount >= 10 ? 'Undervalued' : val.discount >= 0 ? 'Fair' : 'Overvalued'}
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

            {/* Country Risk Premiums Tab */}
            <TabsContent value="risk" className="mt-0">
              <div className="space-y-4">
                {/* Risk Premium Chart */}
                <div className="bg-[#151519] rounded-lg border border-[#1F1F23] p-4">
                  <div className="flex items-center gap-2 mb-4">
                    <Globe2 className="w-4 h-4 text-[#2979FF]" />
                    <h3 className="text-sm">Equity Risk Premium by Country</h3>
                  </div>
                  <ResponsiveContainer width="100%" height={240}>
                    <BarChart data={riskPremiumChart} layout="horizontal">
                      <CartesianGrid strokeDasharray="3 3" stroke="#1F1F23" />
                      <XAxis type="number" stroke="#A0A0A5" tick={{ fill: '#A0A0A5', fontSize: 11 }} />
                      <YAxis type="category" dataKey="country" stroke="#A0A0A5" tick={{ fill: '#A0A0A5', fontSize: 11 }} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#0D0D0F', 
                          border: '1px solid #1F1F23',
                          borderRadius: '6px',
                          fontSize: '12px'
                        }}
                      />
                      <Bar dataKey="risk" radius={[0, 4, 4, 0]}>
                        {riskPremiumChart.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={entry.risk < 6 ? '#00E0A4' : entry.risk < 8 ? '#2979FF' : '#FF9800'} 
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Country Risk Table */}
                <div className="bg-[#151519] rounded-lg border border-[#1F1F23] overflow-hidden">
                  <div className="p-4 border-b border-[#1F1F23] bg-gradient-to-r from-[#151519] to-[#0D0D0F]">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm">Damodaran Country Risk Premiums (2025)</h3>
                      <Badge className="bg-[#2979FF]/20 text-[#2979FF] border-[#2979FF]/30 text-xs">
                        NYU Stern Data
                      </Badge>
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-[#1F1F23] bg-[#0D0D0F]">
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Country</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">Equity Risk Premium %</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">Default Spread %</th>
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Credit Rating</th>
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Risk Level</th>
                        </tr>
                      </thead>
                      <tbody>
                        {countryRiskPremiums.map((country, idx) => (
                          <tr key={idx} className="border-b border-[#1F1F23] hover:bg-[#0D0D0F]/50 transition-all">
                            <td className="p-3">
                              <div className="flex items-center gap-2">
                                <div className={`w-2 h-2 rounded-full ${
                                  country.equityRisk < 6 ? 'bg-[#00E0A4]' :
                                  country.equityRisk < 8 ? 'bg-[#2979FF]' :
                                  'bg-[#FF9800]'
                                }`} />
                                <span className="text-sm">{country.country}</span>
                              </div>
                            </td>
                            <td className="p-3">
                              <div className="flex items-center justify-end gap-2">
                                <Progress 
                                  value={(country.equityRisk / 10) * 100} 
                                  className="h-1.5 w-20" 
                                />
                                <span className="text-sm w-12 text-right">{country.equityRisk.toFixed(1)}%</span>
                              </div>
                            </td>
                            <td className="p-3 text-sm text-right">{country.defaultSpread.toFixed(1)}%</td>
                            <td className="p-3">
                              <Badge className={`text-xs ${
                                country.rating.includes('AAA') || country.rating.includes('AA') ? 'bg-[#00E0A4]/20 text-[#00E0A4] border-[#00E0A4]/30' :
                                country.rating.includes('A') || country.rating.includes('BBB') ? 'bg-[#2979FF]/20 text-[#2979FF] border-[#2979FF]/30' :
                                'bg-[#FF9800]/20 text-[#FF9800] border-[#FF9800]/30'
                              }`}>
                                {country.rating}
                              </Badge>
                            </td>
                            <td className="p-3">
                              <Badge className={`text-xs ${
                                country.equityRisk < 6 ? 'bg-[#00E0A4]/20 text-[#00E0A4] border-[#00E0A4]/30' :
                                country.equityRisk < 8 ? 'bg-[#2979FF]/20 text-[#2979FF] border-[#2979FF]/30' :
                                'bg-[#FF9800]/20 text-[#FF9800] border-[#FF9800]/30'
                              }`}>
                                {country.equityRisk < 6 ? 'Low Risk' : country.equityRisk < 8 ? 'Medium Risk' : 'High Risk'}
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

            {/* Monte Carlo Tab */}
            <TabsContent value="monte" className="mt-0">
              <div className="space-y-4">
                {/* Monte Carlo Header */}
                <div className="bg-gradient-to-r from-[#151519] via-[#151519] to-[#0D0D0F] rounded-lg border border-[#2979FF]/20 p-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-[#2979FF]/10 rounded-lg">
                      <Sparkles className="w-5 h-5 text-[#2979FF]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm mb-1 flex items-center gap-2">
                        Monte Carlo Valuation Simulation - {monteCarloResults.symbol}
                        <Badge className="bg-[#2979FF]/20 text-[#2979FF] border-[#2979FF]/30 text-xs">
                          {monteCarloResults.simulations.toLocaleString()} Runs
                        </Badge>
                      </h3>
                      <p className="text-xs text-[#A0A0A5] leading-relaxed">
                        Probabilistic valuation using stochastic modeling to simulate thousands of scenarios and determine fair value distribution.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Simulation Stats */}
                <div className="grid grid-cols-4 gap-4">
                  <div className="bg-gradient-to-br from-[#151519] to-[#0D0D0F] rounded-lg border border-[#2979FF]/30 p-4 hover:border-[#2979FF]/50 transition-all">
                    <div className="flex items-center gap-2 mb-2">
                      <Activity className="w-4 h-4 text-[#2979FF]" />
                      <div className="text-xs text-[#A0A0A5]">Simulations</div>
                    </div>
                    <div className="text-2xl mb-1">{monteCarloResults.simulations.toLocaleString()}</div>
                    <div className="text-xs text-[#2979FF]">Iterations</div>
                  </div>
                  <div className="bg-gradient-to-br from-[#151519] to-[#0D0D0F] rounded-lg border border-[#00E0A4]/30 p-4 hover:border-[#00E0A4]/50 transition-all">
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="w-4 h-4 text-[#00E0A4]" />
                      <div className="text-xs text-[#A0A0A5]">Mean Value</div>
                    </div>
                    <div className="text-2xl mb-1 text-[#00E0A4]">${monteCarloResults.mean.toFixed(2)}</div>
                    <div className="text-xs text-[#00E0A4]">Expected Price</div>
                  </div>
                  <div className="bg-gradient-to-br from-[#151519] to-[#0D0D0F] rounded-lg border border-[#FF9800]/30 p-4 hover:border-[#FF9800]/50 transition-all">
                    <div className="flex items-center gap-2 mb-2">
                      <Activity className="w-4 h-4 text-[#FF9800]" />
                      <div className="text-xs text-[#A0A0A5]">Std Deviation</div>
                    </div>
                    <div className="text-2xl mb-1 text-[#FF9800]">${monteCarloResults.std.toFixed(2)}</div>
                    <div className="text-xs text-[#FF9800]">Volatility</div>
                  </div>
                  <div className="bg-gradient-to-br from-[#151519] to-[#0D0D0F] rounded-lg border border-[#00E0A4]/30 p-4 hover:border-[#00E0A4]/50 transition-all">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-4 h-4 text-[#00E0A4]" />
                      <div className="text-xs text-[#A0A0A5]">Prob of Upside</div>
                    </div>
                    <div className="text-2xl mb-1 text-[#00E0A4]">{monteCarloResults.probUpside.toFixed(1)}%</div>
                    <Progress value={monteCarloResults.probUpside} className="mt-2 h-1.5" />
                  </div>
                </div>

                {/* Distribution Scenarios */}
                <div className="grid grid-cols-3 gap-4">
                  {/* Bear Case */}
                  <div className="bg-[#151519] rounded-lg border border-[#FF5252]/30 p-4 hover:border-[#FF5252]/50 transition-all">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <TrendingDown className="w-4 h-4 text-[#FF5252]" />
                        <h3 className="text-sm">Bear Case</h3>
                      </div>
                      <Badge className="bg-[#FF5252]/20 text-[#FF5252] border-[#FF5252]/30 text-xs">
                        5th %ile
                      </Badge>
                    </div>
                    <div className="text-2xl text-[#FF5252] mb-1">${monteCarloResults.percentile5.toFixed(2)}</div>
                    <div className="text-xs text-[#A0A0A5]">Downside scenario valuation</div>
                    <div className="mt-3 pt-3 border-t border-[#1F1F23]">
                      <div className="text-xs text-[#A0A0A5]">Probability</div>
                      <div className="text-sm text-[#FF5252]">5% chance of lower value</div>
                    </div>
                  </div>

                  {/* Base Case */}
                  <div className="bg-[#151519] rounded-lg border border-[#2979FF]/30 p-4 hover:border-[#2979FF]/50 transition-all">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Activity className="w-4 h-4 text-[#2979FF]" />
                        <h3 className="text-sm">Base Case</h3>
                      </div>
                      <Badge className="bg-[#2979FF]/20 text-[#2979FF] border-[#2979FF]/30 text-xs">
                        50th %ile
                      </Badge>
                    </div>
                    <div className="text-2xl text-[#2979FF] mb-1">${monteCarloResults.median.toFixed(2)}</div>
                    <div className="text-xs text-[#A0A0A5]">Median scenario valuation</div>
                    <div className="mt-3 pt-3 border-t border-[#1F1F23]">
                      <div className="text-xs text-[#A0A0A5]">Probability</div>
                      <div className="text-sm text-[#2979FF]">Most likely outcome</div>
                    </div>
                  </div>

                  {/* Bull Case */}
                  <div className="bg-[#151519] rounded-lg border border-[#00E0A4]/30 p-4 hover:border-[#00E0A4]/50 transition-all">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-[#00E0A4]" />
                        <h3 className="text-sm">Bull Case</h3>
                      </div>
                      <Badge className="bg-[#00E0A4]/20 text-[#00E0A4] border-[#00E0A4]/30 text-xs">
                        95th %ile
                      </Badge>
                    </div>
                    <div className="text-2xl text-[#00E0A4] mb-1">${monteCarloResults.percentile95.toFixed(2)}</div>
                    <div className="text-xs text-[#A0A0A5]">Upside scenario valuation</div>
                    <div className="mt-3 pt-3 border-t border-[#1F1F23]">
                      <div className="text-xs text-[#A0A0A5]">Probability</div>
                      <div className="text-sm text-[#00E0A4]">5% chance of higher value</div>
                    </div>
                  </div>
                </div>

                {/* Summary Insights */}
                <div className="bg-[#151519] rounded-lg border border-[#1F1F23] p-4">
                  <h3 className="text-sm mb-3">Valuation Range Analysis</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-[#A0A0A5]">Expected Range (5th-95th percentile)</span>
                        <span className="text-sm">${monteCarloResults.percentile5.toFixed(2)} - ${monteCarloResults.percentile95.toFixed(2)}</span>
                      </div>
                      <Progress value={90} className="h-1.5" />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-[#A0A0A5]">Confidence Interval Width</span>
                        <span className="text-sm text-[#2979FF]">${(monteCarloResults.percentile95 - monteCarloResults.percentile5).toFixed(2)}</span>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-[#A0A0A5]">Coefficient of Variation</span>
                        <span className="text-sm">{((monteCarloResults.std / monteCarloResults.mean) * 100).toFixed(1)}%</span>
                      </div>
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
