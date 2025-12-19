import { useState } from "react";
import { ScrollArea } from "../ui/scroll-area";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { 
  Briefcase, Calendar, PieChart, TrendingUp, TrendingDown,
  ArrowUpRight, ArrowDownRight, Activity
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

export function CalendarsTab() {
  const [activeSubTab, setActiveSubTab] = useState("ma");

  // M&A Database
  const mergersData = [
    { acquirer: "Microsoft Corp", target: "Activision Blizzard", value: "$68.7B", status: "Completed", announced: "Jan 2022", sector: "Technology", dealType: "Acquisition" },
    { acquirer: "Broadcom Inc", target: "VMware Inc", value: "$61.0B", status: "Completed", announced: "May 2022", sector: "Technology", dealType: "Acquisition" },
    { acquirer: "Pfizer Inc", target: "Seagen Inc", value: "$43.0B", status: "Pending", announced: "Mar 2023", sector: "Healthcare", dealType: "Acquisition" },
    { acquirer: "Chevron Corp", target: "Hess Corp", value: "$53.0B", status: "Pending", announced: "Oct 2023", sector: "Energy", dealType: "Acquisition" },
    { acquirer: "Exxon Mobil", target: "Pioneer Natural Resources", value: "$59.5B", status: "Completed", announced: "Oct 2023", sector: "Energy", dealType: "Acquisition" },
  ];

  // IPO Calendar
  const ipoCalendar = [
    { company: "Stripe Inc", ticker: "STRP", sector: "Fintech", priceRange: "$45-52", shares: "120M", expectedDate: "Feb 15, 2025", status: "Filed" },
    { company: "SpaceX", ticker: "SPCE", sector: "Aerospace", priceRange: "$85-95", shares: "80M", expectedDate: "Mar 1, 2025", status: "Confidential" },
    { company: "Discord Inc", ticker: "DISC", sector: "Technology", priceRange: "$28-32", shares: "150M", expectedDate: "Feb 28, 2025", status: "Filed" },
    { company: "Databricks Inc", ticker: "DATA", sector: "Cloud", priceRange: "$62-70", shares: "90M", expectedDate: "Apr 10, 2025", status: "Planning" },
  ];

  // Sector Performance
  const sectorPerformance = [
    { sector: "Technology", ytd: +28.4, oneMonth: +5.2, oneYear: +42.8, marketCap: "$14.2T", companies: 1247 },
    { sector: "Healthcare", ytd: +12.8, oneMonth: +2.1, oneYear: +18.4, marketCap: "$7.8T", companies: 892 },
    { sector: "Financials", ytd: +8.4, oneMonth: +1.8, oneYear: +15.2, marketCap: "$9.2T", companies: 1456 },
    { sector: "Consumer Discretionary", ytd: +18.9, oneMonth: +3.4, oneYear: +24.6, marketCap: "$6.4T", companies: 784 },
    { sector: "Energy", ytd: -2.4, oneMonth: -1.2, oneYear: +8.4, marketCap: "$4.1T", companies: 456 },
  ];

  // Most Active Securities
  const mostActive = [
    { symbol: "AAPL", name: "Apple Inc", volume: "52.4M", value: "$9.8B", trades: 234567, price: 186.50, change: +1.27 },
    { symbol: "NVDA", name: "NVIDIA Corp", volume: "48.2M", value: "$25.3B", trades: 189234, price: 523.45, change: +3.09 },
    { symbol: "TSLA", name: "Tesla Inc", volume: "156.8M", value: "$34.2B", trades: 412567, price: 218.34, change: -1.47 },
    { symbol: "MSFT", name: "Microsoft Corp", volume: "28.9M", value: "$11.0B", trades: 178234, price: 378.92, change: +2.22 },
    { symbol: "AMZN", name: "Amazon.com Inc", volume: "42.1M", value: "$6.6B", trades: 156789, price: 156.78, change: +0.84 },
  ];

  return (
    <div className="h-[calc(100vh-120px)]">
      <Tabs value={activeSubTab} onValueChange={setActiveSubTab} className="h-full flex flex-col">
        <TabsList className="bg-[#1F1F23] border-b-2 border-[#2979FF]/20 rounded-none w-full justify-start p-0 h-12">
          <TabsTrigger value="ma" className="data-[state=active]:bg-[#151519] data-[state=active]:text-[#00E0A4] data-[state=active]:border-[#00E0A4] bg-transparent text-[#A0A0A5] hover:text-[#E8E8E8] hover:bg-[#151519]/50 rounded-none border-b-2 border-transparent px-4 transition-all whitespace-nowrap">
            M&A Database
          </TabsTrigger>
          <TabsTrigger value="ipo" className="data-[state=active]:bg-[#151519] data-[state=active]:text-[#00E0A4] data-[state=active]:border-[#00E0A4] bg-transparent text-[#A0A0A5] hover:text-[#E8E8E8] hover:bg-[#151519]/50 rounded-none border-b-2 border-transparent px-4 transition-all whitespace-nowrap">
            IPO Calendar
          </TabsTrigger>
          <TabsTrigger value="sectors" className="data-[state=active]:bg-[#151519] data-[state=active]:text-[#00E0A4] data-[state=active]:border-[#00E0A4] bg-transparent text-[#A0A0A5] hover:text-[#E8E8E8] hover:bg-[#151519]/50 rounded-none border-b-2 border-transparent px-4 transition-all whitespace-nowrap">
            Sector Analysis
          </TabsTrigger>
          <TabsTrigger value="movers" className="data-[state=active]:bg-[#151519] data-[state=active]:text-[#00E0A4] data-[state=active]:border-[#00E0A4] bg-transparent text-[#A0A0A5] hover:text-[#E8E8E8] hover:bg-[#151519]/50 rounded-none border-b-2 border-transparent px-4 transition-all whitespace-nowrap">
            Most Active
          </TabsTrigger>
        </TabsList>

        {/* M&A Database Tab */}
        <TabsContent value="ma" className="mt-0 flex-1 overflow-hidden">
          <ScrollArea className="h-full">
            <div className="p-4">
              <div className="space-y-4">
                {/* Filters */}
                <div className="bg-[#151519] rounded-lg border border-[#1F1F23] p-4">
                  <div className="flex items-center gap-4">
                    <Input placeholder="Search deals, companies..." className="flex-1 bg-[#0D0D0F] border-[#1F1F23]" />
                    <Select>
                      <SelectTrigger className="w-48 bg-[#0D0D0F] border-[#1F1F23]">
                        <SelectValue placeholder="Deal Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="acquisition">Acquisition</SelectItem>
                        <SelectItem value="merger">Merger</SelectItem>
                        <SelectItem value="lbo">LBO</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select>
                      <SelectTrigger className="w-48 bg-[#0D0D0F] border-[#1F1F23]">
                        <SelectValue placeholder="Sector" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Sectors</SelectItem>
                        <SelectItem value="tech">Technology</SelectItem>
                        <SelectItem value="healthcare">Healthcare</SelectItem>
                        <SelectItem value="energy">Energy</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* M&A Table */}
                <div className="bg-[#151519] rounded-lg border border-[#1F1F23] overflow-hidden">
                  <div className="p-4 border-b border-[#1F1F23] bg-gradient-to-r from-[#151519] to-[#0D0D0F]">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm">Mergers & Acquisitions Database</h3>
                      <Badge className="bg-[#0D0D0F] text-[#A0A0A5] border-[#1F1F23] text-xs">
                        {mergersData.length} Deals
                      </Badge>
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-[#1F1F23] bg-[#0D0D0F]">
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Acquirer</th>
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Target</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">Deal Value</th>
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Status</th>
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Announced</th>
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Sector</th>
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Type</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mergersData.map((deal, idx) => (
                          <tr key={idx} className="border-b border-[#1F1F23] hover:bg-[#0D0D0F]/50 transition-all">
                            <td className="p-3 text-sm font-medium">{deal.acquirer}</td>
                            <td className="p-3 text-sm text-[#2979FF]">{deal.target}</td>
                            <td className="p-3 text-sm text-right text-[#00E0A4]">{deal.value}</td>
                            <td className="p-3">
                              <Badge className={`text-xs ${
                                deal.status === 'Completed'
                                  ? 'bg-[#00E0A4]/20 text-[#00E0A4] border-[#00E0A4]/30'
                                  : 'bg-[#FF9800]/20 text-[#FF9800] border-[#FF9800]/30'
                              }`}>
                                {deal.status}
                              </Badge>
                            </td>
                            <td className="p-3 text-sm text-[#A0A0A5]">{deal.announced}</td>
                            <td className="p-3 text-sm">{deal.sector}</td>
                            <td className="p-3">
                              <Badge className="bg-[#2979FF]/20 text-[#2979FF] border-[#2979FF]/30 text-xs">
                                {deal.dealType}
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

        {/* IPO Calendar Tab */}
        <TabsContent value="ipo" className="mt-0 flex-1 overflow-hidden">
          <ScrollArea className="h-full">
            <div className="p-4">
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-[#151519] via-[#151519] to-[#0D0D0F] rounded-lg border border-[#2979FF]/20 p-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-[#2979FF]/10 rounded-lg">
                      <Calendar className="w-5 h-5 text-[#2979FF]" />
                    </div>
                    <div>
                      <h3 className="text-sm mb-1">Upcoming IPO Calendar</h3>
                      <p className="text-xs text-[#A0A0A5]">
                        Track upcoming initial public offerings and market debuts
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-[#151519] rounded-lg border border-[#1F1F23] overflow-hidden">
                  <div className="p-4 border-b border-[#1F1F23] bg-gradient-to-r from-[#151519] to-[#0D0D0F]">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm">Expected IPOs - Q1 2025</h3>
                      <Badge className="bg-[#0D0D0F] text-[#A0A0A5] border-[#1F1F23] text-xs">
                        {ipoCalendar.length} Companies
                      </Badge>
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-[#1F1F23] bg-[#0D0D0F]">
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Company</th>
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Ticker</th>
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Sector</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">Price Range</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">Shares</th>
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Expected Date</th>
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {ipoCalendar.map((ipo, idx) => (
                          <tr key={idx} className="border-b border-[#1F1F23] hover:bg-[#0D0D0F]/50 transition-all">
                            <td className="p-3 text-sm font-medium">{ipo.company}</td>
                            <td className="p-3">
                              <Badge className="bg-[#2979FF]/20 text-[#2979FF] border-[#2979FF]/30 text-xs">
                                {ipo.ticker}
                              </Badge>
                            </td>
                            <td className="p-3 text-sm">{ipo.sector}</td>
                            <td className="p-3 text-sm text-right text-[#00E0A4]">{ipo.priceRange}</td>
                            <td className="p-3 text-sm text-right">{ipo.shares}</td>
                            <td className="p-3 text-sm text-[#A0A0A5]">{ipo.expectedDate}</td>
                            <td className="p-3">
                              <Badge className={`text-xs ${
                                ipo.status === 'Filed'
                                  ? 'bg-[#00E0A4]/20 text-[#00E0A4] border-[#00E0A4]/30'
                                  : ipo.status === 'Confidential'
                                  ? 'bg-[#FF9800]/20 text-[#FF9800] border-[#FF9800]/30'
                                  : 'bg-[#2979FF]/20 text-[#2979FF] border-[#2979FF]/30'
                              }`}>
                                {ipo.status}
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

        {/* Sector Analysis Tab */}
        <TabsContent value="sectors" className="mt-0 flex-1 overflow-hidden">
          <ScrollArea className="h-full">
            <div className="p-4">
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-[#151519] via-[#151519] to-[#0D0D0F] rounded-lg border border-[#2979FF]/20 p-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-[#2979FF]/10 rounded-lg">
                      <PieChart className="w-5 h-5 text-[#2979FF]" />
                    </div>
                    <div>
                      <h3 className="text-sm mb-1">Sector Performance Analysis</h3>
                      <p className="text-xs text-[#A0A0A5]">
                        Comprehensive performance metrics across market sectors
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-[#151519] rounded-lg border border-[#1F1F23] overflow-hidden">
                  <div className="p-4 border-b border-[#1F1F23] bg-gradient-to-r from-[#151519] to-[#0D0D0F]">
                    <h3 className="text-sm">Sector Performance Metrics</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-[#1F1F23] bg-[#0D0D0F]">
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Sector</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">YTD %</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">1M %</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">1Y %</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">Market Cap</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">Companies</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sectorPerformance.map((sector, idx) => (
                          <tr key={idx} className="border-b border-[#1F1F23] hover:bg-[#0D0D0F]/50 transition-all">
                            <td className="p-3 text-sm font-medium">{sector.sector}</td>
                            <td className="p-3 text-right">
                              <div className="flex items-center justify-end gap-1">
                                {sector.ytd >= 0 ? (
                                  <TrendingUp className="w-3 h-3 text-[#00E0A4]" />
                                ) : (
                                  <TrendingDown className="w-3 h-3 text-[#FF5252]" />
                                )}
                                <span className={`text-sm ${sector.ytd >= 0 ? 'text-[#00E0A4]' : 'text-[#FF5252]'}`}>
                                  {sector.ytd >= 0 ? '+' : ''}{sector.ytd.toFixed(1)}%
                                </span>
                              </div>
                            </td>
                            <td className="p-3 text-right">
                              <span className={`text-sm ${sector.oneMonth >= 0 ? 'text-[#00E0A4]' : 'text-[#FF5252]'}`}>
                                {sector.oneMonth >= 0 ? '+' : ''}{sector.oneMonth.toFixed(1)}%
                              </span>
                            </td>
                            <td className="p-3 text-right">
                              <span className={`text-sm ${sector.oneYear >= 0 ? 'text-[#00E0A4]' : 'text-[#FF5252]'}`}>
                                {sector.oneYear >= 0 ? '+' : ''}{sector.oneYear.toFixed(1)}%
                              </span>
                            </td>
                            <td className="p-3 text-sm text-right text-[#00E0A4]">{sector.marketCap}</td>
                            <td className="p-3 text-sm text-right">{sector.companies.toLocaleString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="bg-[#151519] rounded-lg border border-[#1F1F23] p-4">
                  <h3 className="text-sm mb-4">YTD Performance Comparison</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={sectorPerformance}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1F1F23" />
                      <XAxis dataKey="sector" stroke="#A0A0A5" tick={{ fill: '#A0A0A5', fontSize: 10 }} angle={-45} textAnchor="end" height={80} />
                      <YAxis stroke="#A0A0A5" tick={{ fill: '#A0A0A5', fontSize: 10 }} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#0D0D0F', 
                          border: '1px solid #1F1F23',
                          borderRadius: '6px',
                          fontSize: '12px'
                        }}
                      />
                      <Bar dataKey="ytd" radius={[4, 4, 0, 0]}>
                        {sectorPerformance.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.ytd >= 0 ? '#00E0A4' : '#FF5252'} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </ScrollArea>
        </TabsContent>

        {/* Most Active Tab */}
        <TabsContent value="movers" className="mt-0 flex-1 overflow-hidden">
          <ScrollArea className="h-full">
            <div className="p-4">
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-[#151519] via-[#151519] to-[#0D0D0F] rounded-lg border border-[#2979FF]/20 p-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-[#2979FF]/10 rounded-lg">
                      <Activity className="w-5 h-5 text-[#2979FF]" />
                    </div>
                    <div>
                      <h3 className="text-sm mb-1">Most Active Securities</h3>
                      <p className="text-xs text-[#A0A0A5]">
                        Real-time tracking of highest volume securities
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-[#151519] rounded-lg border border-[#1F1F23] overflow-hidden">
                  <div className="p-4 border-b border-[#1F1F23] bg-gradient-to-r from-[#151519] to-[#0D0D0F]">
                    <h3 className="text-sm">Most Active Securities</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-[#1F1F23] bg-[#0D0D0F]">
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Symbol</th>
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Name</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">Volume</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">Value</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">Trades</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">Price</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">Change %</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mostActive.map((stock, idx) => (
                          <tr key={idx} className="border-b border-[#1F1F23] hover:bg-[#0D0D0F]/50 transition-all">
                            <td className="p-3">
                              <Badge className="bg-[#2979FF]/20 text-[#2979FF] border-[#2979FF]/30 text-xs">
                                {stock.symbol}
                              </Badge>
                            </td>
                            <td className="p-3 text-sm">{stock.name}</td>
                            <td className="p-3 text-sm text-right">{stock.volume}</td>
                            <td className="p-3 text-sm text-right text-[#00E0A4]">{stock.value}</td>
                            <td className="p-3 text-sm text-right">{stock.trades.toLocaleString()}</td>
                            <td className="p-3 text-sm text-right">${stock.price.toFixed(2)}</td>
                            <td className="p-3 text-right">
                              <div className="flex items-center justify-end gap-1">
                                {stock.change >= 0 ? (
                                  <ArrowUpRight className="w-3 h-3 text-[#00E0A4]" />
                                ) : (
                                  <ArrowDownRight className="w-3 h-3 text-[#FF5252]" />
                                )}
                                <span className={`text-sm ${stock.change >= 0 ? 'text-[#00E0A4]' : 'text-[#FF5252]'}`}>
                                  {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)}%
                                </span>
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
