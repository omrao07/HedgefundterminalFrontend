import { useState } from "react";
import { ScrollArea } from "../ui/scroll-area";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Search, TrendingUp, TrendingDown, Globe2, DollarSign, Calendar } from "lucide-react";

export function MarketsTab() {
  const [activeSubTab, setActiveSubTab] = useState("indices");
  const [searchTerm, setSearchTerm] = useState("");

  // 1. World Equity Indices (WEI)
  const worldIndices = [
    { name: "S&P 500", symbol: "SPX", price: 4783.45, change: +28.34, changePct: +0.60, volume: "3.2B", region: "US", pe: 21.4 },
    { name: "Dow Jones", symbol: "DJI", price: 37440.34, change: +156.78, changePct: +0.42, volume: "284M", region: "US", pe: 19.8 },
    { name: "NASDAQ", symbol: "COMP", price: 14879.96, change: +89.45, changePct: +0.60, volume: "4.8B", region: "US", pe: 28.2 },
    { name: "FTSE 100", symbol: "UKX", price: 7512.89, change: -12.34, changePct: -0.16, volume: "1.2B", region: "UK", pe: 14.6 },
    { name: "DAX", symbol: "DAX", price: 16345.23, change: +45.67, changePct: +0.28, volume: "3.4B", region: "Germany", pe: 16.2 },
    { name: "CAC 40", symbol: "CAC", price: 7289.45, change: +18.90, changePct: +0.26, volume: "2.1B", region: "France", pe: 15.8 },
    { name: "Nikkei 225", symbol: "NKY", price: 33245.12, change: +234.56, changePct: +0.71, volume: "1.8B", region: "Japan", pe: 18.4 },
    { name: "Hang Seng", symbol: "HSI", price: 17234.67, change: -89.23, changePct: -0.52, volume: "2.3B", region: "Hong Kong", pe: 11.2 },
    { name: "Shanghai Comp", symbol: "SHCOMP", price: 2978.45, change: +12.34, changePct: +0.42, volume: "3.7B", region: "China", pe: 13.5 },
    { name: "TSX Composite", symbol: "SPTSX", price: 21456.78, change: +34.56, changePct: +0.16, volume: "245M", region: "Canada", pe: 17.2 },
  ];

  // 2. World P/E Ratios
  const peAnalysis = [
    { index: "S&P 500", pe: 21.4, historicalAvg: 19.2, premium: +11.5, earnings: 223.4, yield: 4.67 },
    { index: "NASDAQ", pe: 28.2, historicalAvg: 24.8, premium: +13.7, earnings: 527.3, yield: 3.55 },
    { index: "FTSE 100", pe: 14.6, historicalAvg: 15.2, premium: -3.9, earnings: 514.8, yield: 6.85 },
    { index: "DAX", pe: 16.2, historicalAvg: 15.8, premium: +2.5, earnings: 1008.7, yield: 6.17 },
    { index: "Nikkei 225", pe: 18.4, historicalAvg: 17.1, premium: +7.6, earnings: 1806.8, yield: 5.43 },
  ];

  // 3. Economic Releases Calendar
  const economicReleases = [
    { time: "08:30", event: "US Non-Farm Payrolls", previous: "216K", forecast: "185K", actual: "—", impact: "HIGH", country: "US" },
    { time: "08:30", event: "US Unemployment Rate", previous: "3.7%", forecast: "3.7%", actual: "—", impact: "HIGH", country: "US" },
    { time: "10:00", event: "ISM Manufacturing PMI", previous: "47.4", forecast: "47.9", actual: "—", impact: "MEDIUM", country: "US" },
    { time: "14:00", event: "Fed Chair Powell Speech", previous: "—", forecast: "—", actual: "—", impact: "HIGH", country: "US" },
    { time: "09:00", event: "Eurozone GDP (QoQ)", previous: "0.0%", forecast: "+0.1%", actual: "—", impact: "HIGH", country: "EU" },
    { time: "19:00", event: "China CPI (YoY)", previous: "-0.5%", forecast: "-0.4%", actual: "—", impact: "MEDIUM", country: "China" },
  ];

  // 4. Index Movers
  const indexMovers = [
    { ticker: "NVDA", name: "NVIDIA Corp", price: 495.22, change: +18.45, changePct: +3.87, contribution: +12.4, weight: 2.8 },
    { ticker: "AAPL", name: "Apple Inc", price: 186.50, change: +2.34, changePct: +1.27, contribution: +8.2, weight: 7.1 },
    { ticker: "MSFT", name: "Microsoft Corp", price: 372.89, change: +4.56, changePct: +1.24, contribution: +7.8, weight: 6.8 },
    { ticker: "TSLA", name: "Tesla Inc", price: 218.34, change: -8.90, changePct: -3.92, contribution: -5.6, weight: 1.9 },
    { ticker: "META", name: "Meta Platforms", price: 353.12, change: +6.78, changePct: +1.96, contribution: +4.2, weight: 2.3 },
  ];

  // 5. Mergers & Acquisitions Database
  const maDeals = [
    { target: "Activision Blizzard", acquirer: "Microsoft", value: "$68.7B", status: "Pending", announced: "Jan 2022", type: "Cash", sector: "Technology" },
    { target: "VMware", acquirer: "Broadcom", value: "$61.0B", status: "Pending", announced: "May 2022", type: "Cash+Stock", sector: "Technology" },
    { target: "Horizon Therapeutics", acquirer: "Amgen", value: "$27.8B", status: "Closed", announced: "Dec 2022", type: "Cash", sector: "Healthcare" },
    { target: "Seagen", acquirer: "Pfizer", value: "$43.0B", status: "Pending", announced: "Mar 2023", type: "Cash", sector: "Healthcare" },
    { target: "Splunk", acquirer: "Cisco", value: "$28.0B", status: "Pending", announced: "Sep 2023", type: "Cash", sector: "Technology" },
  ];

  // 6. Cross-Currency Rates
  const currencyRates = [
    { pair: "EUR/USD", bid: 1.0845, ask: 1.0847, change: +0.0012, changePct: +0.11, high: 1.0860, low: 1.0832 },
    { pair: "GBP/USD", bid: 1.2678, ask: 1.2680, change: -0.0023, changePct: -0.18, high: 1.2701, low: 1.2665 },
    { pair: "USD/JPY", bid: 149.34, ask: 149.36, change: +0.45, changePct: +0.30, high: 149.78, low: 148.92 },
    { pair: "USD/CAD", bid: 1.3456, ask: 1.3458, change: +0.0034, changePct: +0.25, high: 1.3471, low: 1.3442 },
    { pair: "AUD/USD", bid: 0.6723, ask: 0.6725, change: +0.0015, changePct: +0.22, high: 0.6738, low: 0.6710 },
  ];

  // 7. Credit Rating Revisions
  const ratingRevisions = [
    { issuer: "Tesla Inc", agency: "S&P", oldRating: "BB+", newRating: "BBB-", action: "UPGRADE", date: "2024-01-15", outlook: "Stable" },
    { issuer: "Ford Motor", agency: "Moody's", oldRating: "Ba1", newRating: "Baa3", action: "UPGRADE", date: "2024-01-12", outlook: "Positive" },
    { issuer: "AT&T Inc", agency: "Fitch", oldRating: "BBB", newRating: "BBB-", action: "DOWNGRADE", date: "2024-01-10", outlook: "Negative" },
    { issuer: "Meta Platforms", agency: "S&P", oldRating: "AA-", newRating: "AA", action: "UPGRADE", date: "2024-01-08", outlook: "Stable" },
  ];

  // 8. Interest Rates & Bond Market
  const bondRates = [
    { maturity: "3 Month", rate: 5.38, change: +0.02, yield: 5.38, country: "US" },
    { maturity: "2 Year", rate: 4.42, change: -0.05, yield: 4.42, country: "US" },
    { maturity: "10 Year", rate: 4.18, change: -0.03, yield: 4.18, country: "US" },
    { maturity: "30 Year", rate: 4.35, change: -0.02, yield: 4.35, country: "US" },
  ];

  // 9. Market Calendars
  const marketHours = [
    { market: "NYSE", status: "OPEN", open: "09:30 EST", close: "16:00 EST", nextClose: "5h 23m" },
    { market: "NASDAQ", status: "OPEN", open: "09:30 EST", close: "16:00 EST", nextClose: "5h 23m" },
    { market: "LSE", status: "CLOSED", open: "08:00 GMT", close: "16:30 GMT", nextClose: "14h 12m" },
    { market: "TSX", status: "OPEN", open: "09:30 EST", close: "16:00 EST", nextClose: "5h 23m" },
    { market: "Tokyo", status: "CLOSED", open: "09:00 JST", close: "15:00 JST", nextClose: "20h 45m" },
  ];

  // 10. Money Market/LIBOR Rates
  const moneyMarketRates = [
    { instrument: "SOFR", rate: 5.34, change: +0.01, term: "Overnight" },
    { instrument: "SOFR 1M", rate: 5.36, change: +0.02, term: "1 Month" },
    { instrument: "SOFR 3M", rate: 5.38, change: +0.01, term: "3 Month" },
    { instrument: "Fed Funds", rate: 5.33, change: 0.00, term: "Effective" },
    { instrument: "Prime Rate", rate: 8.50, change: 0.00, term: "—" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "OPEN": return "text-[#00E0A4]";
      case "CLOSED": return "text-[#FF5252]";
      case "UPGRADE": return "text-[#00E0A4]";
      case "DOWNGRADE": return "text-[#FF5252]";
      case "Pending": return "text-[#FF9800]";
      case "Closed": return "text-[#A0A0A5]";
      default: return "text-[#A0A0A5]";
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "HIGH": return "bg-[#FF5252]/20 text-[#FF5252] border-[#FF5252]/30";
      case "MEDIUM": return "bg-[#FF9800]/20 text-[#FF9800] border-[#FF9800]/30";
      case "LOW": return "bg-[#2979FF]/20 text-[#2979FF] border-[#2979FF]/30";
      default: return "bg-[#A0A0A5]/20 text-[#A0A0A5] border-[#A0A0A5]/30";
    }
  };

  return (
    <div className="h-[calc(100vh-120px)]">
      <Tabs value={activeSubTab} onValueChange={setActiveSubTab} className="h-full flex flex-col">
        <TabsList className="bg-[#1F1F23] border-b-2 border-[#2979FF]/20 rounded-none w-full justify-start p-0 h-12">
          <TabsTrigger value="indices" className="data-[state=active]:bg-[#151519] data-[state=active]:text-[#00E0A4] data-[state=active]:border-[#00E0A4] bg-transparent text-[#A0A0A5] hover:text-[#E8E8E8] hover:bg-[#151519]/50 rounded-none border-b-2 border-transparent px-3 whitespace-nowrap transition-all text-xs">
            WEI
          </TabsTrigger>
          <TabsTrigger value="search" className="data-[state=active]:bg-[#151519] data-[state=active]:text-[#00E0A4] data-[state=active]:border-[#00E0A4] bg-transparent text-[#A0A0A5] hover:text-[#E8E8E8] hover:bg-[#151519]/50 rounded-none border-b-2 border-transparent px-3 whitespace-nowrap transition-all text-xs">
            Search
          </TabsTrigger>
          <TabsTrigger value="pe" className="data-[state=active]:bg-[#151519] data-[state=active]:text-[#00E0A4] data-[state=active]:border-[#00E0A4] bg-transparent text-[#A0A0A5] hover:text-[#E8E8E8] hover:bg-[#151519]/50 rounded-none border-b-2 border-transparent px-3 whitespace-nowrap transition-all text-xs">
            P/E
          </TabsTrigger>
          <TabsTrigger value="economic" className="data-[state=active]:bg-[#151519] data-[state=active]:text-[#00E0A4] data-[state=active]:border-[#00E0A4] bg-transparent text-[#A0A0A5] hover:text-[#E8E8E8] hover:bg-[#151519]/50 rounded-none border-b-2 border-transparent px-3 whitespace-nowrap transition-all text-xs">
            Economic
          </TabsTrigger>
          <TabsTrigger value="movers" className="data-[state=active]:bg-[#151519] data-[state=active]:text-[#00E0A4] data-[state=active]:border-[#00E0A4] bg-transparent text-[#A0A0A5] hover:text-[#E8E8E8] hover:bg-[#151519]/50 rounded-none border-b-2 border-transparent px-3 whitespace-nowrap transition-all text-xs">
            Movers
          </TabsTrigger>
          <TabsTrigger value="ma" className="data-[state=active]:bg-[#151519] data-[state=active]:text-[#00E0A4] data-[state=active]:border-[#00E0A4] bg-transparent text-[#A0A0A5] hover:text-[#E8E8E8] hover:bg-[#151519]/50 rounded-none border-b-2 border-transparent px-3 whitespace-nowrap transition-all text-xs">
            M&A
          </TabsTrigger>
          <TabsTrigger value="fx" className="data-[state=active]:bg-[#151519] data-[state=active]:text-[#00E0A4] data-[state=active]:border-[#00E0A4] bg-transparent text-[#A0A0A5] hover:text-[#E8E8E8] hover:bg-[#151519]/50 rounded-none border-b-2 border-transparent px-3 whitespace-nowrap transition-all text-xs">
            FX
          </TabsTrigger>
          <TabsTrigger value="ratings" className="data-[state=active]:bg-[#151519] data-[state=active]:text-[#00E0A4] data-[state=active]:border-[#00E0A4] bg-transparent text-[#A0A0A5] hover:text-[#E8E8E8] hover:bg-[#151519]/50 rounded-none border-b-2 border-transparent px-3 whitespace-nowrap transition-all text-xs">
            Ratings
          </TabsTrigger>
          <TabsTrigger value="bonds" className="data-[state=active]:bg-[#151519] data-[state=active]:text-[#00E0A4] data-[state=active]:border-[#00E0A4] bg-transparent text-[#A0A0A5] hover:text-[#E8E8E8] hover:bg-[#151519]/50 rounded-none border-b-2 border-transparent px-3 whitespace-nowrap transition-all text-xs">
            Bonds
          </TabsTrigger>
          <TabsTrigger value="calendar" className="data-[state=active]:bg-[#151519] data-[state=active]:text-[#00E0A4] data-[state=active]:border-[#00E0A4] bg-transparent text-[#A0A0A5] hover:text-[#E8E8E8] hover:bg-[#151519]/50 rounded-none border-b-2 border-transparent px-3 whitespace-nowrap transition-all text-xs">
            Calendar
          </TabsTrigger>
          <TabsTrigger value="money" className="data-[state=active]:bg-[#151519] data-[state=active]:text-[#00E0A4] data-[state=active]:border-[#00E0A4] bg-transparent text-[#A0A0A5] hover:text-[#E8E8E8] hover:bg-[#151519]/50 rounded-none border-b-2 border-transparent px-3 whitespace-nowrap transition-all text-xs">
            Money
          </TabsTrigger>
        </TabsList>

        <ScrollArea className="flex-1">
          <div className="p-4">
            {/* World Equity Indices */}
            <TabsContent value="indices" className="mt-0">
              <div className="space-y-4">
                <div className="bg-[#151519] rounded-lg border border-[#1F1F23] p-4">
                  <div className="flex items-center gap-2 mb-4">
                    <Globe2 className="w-5 h-5 text-[#2979FF]" />
                    <h3 className="text-sm">World Equity Indices Monitor</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-[#1F1F23]">
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Index</th>
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Symbol</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">Price</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">Change</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">Change %</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">Volume</th>
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Region</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">P/E</th>
                        </tr>
                      </thead>
                      <tbody>
                        {worldIndices.map((index, idx) => (
                          <tr key={idx} className="border-b border-[#1F1F23] hover:bg-[#0D0D0F] transition-colors">
                            <td className="p-3 text-sm">{index.name}</td>
                            <td className="p-3 text-sm text-[#2979FF]">{index.symbol}</td>
                            <td className="p-3 text-sm text-right">{index.price.toLocaleString()}</td>
                            <td className={`p-3 text-sm text-right ${index.change >= 0 ? 'text-[#00E0A4]' : 'text-[#FF5252]'}`}>
                              {index.change >= 0 ? '+' : ''}{index.change.toFixed(2)}
                            </td>
                            <td className={`p-3 text-sm text-right ${index.changePct >= 0 ? 'text-[#00E0A4]' : 'text-[#FF5252]'}`}>
                              {index.changePct >= 0 ? '+' : ''}{index.changePct.toFixed(2)}%
                            </td>
                            <td className="p-3 text-sm text-right text-[#A0A0A5]">{index.volume}</td>
                            <td className="p-3 text-sm text-[#A0A0A5]">{index.region}</td>
                            <td className="p-3 text-sm text-right">{index.pe.toFixed(1)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Search Tab */}
            <TabsContent value="search" className="mt-0">
              <div className="space-y-4">
                {/* Search Input */}
                <div className="glass-effect rounded-lg border border-[#1F1F23] p-4 shadow-elevated">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#A0A0A5]" />
                    <Input 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search across all markets data..." 
                      className="pl-10 bg-[#0D0D0F] border-[#1F1F23]" 
                    />
                  </div>
                  {searchTerm && (
                    <div className="mt-2 text-xs text-[#A0A0A5]">
                      Searching across indices, P/E ratios, economic events, movers, M&A deals, FX rates, ratings, bonds, and money markets...
                    </div>
                  )}
                </div>

                {searchTerm ? (
                  <>
                    {/* Filtered World Indices */}
                    {worldIndices.filter(item => 
                      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      item.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      item.region.toLowerCase().includes(searchTerm.toLowerCase())
                    ).length > 0 && (
                      <div className="glass-effect rounded-lg border border-[#1F1F23] p-4 shadow-elevated">
                        <h3 className="text-sm mb-4 flex items-center gap-2">
                          <Globe2 className="w-4 h-4 text-[#2979FF]" />
                          World Equity Indices ({worldIndices.filter(item => 
                            item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            item.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            item.region.toLowerCase().includes(searchTerm.toLowerCase())
                          ).length})
                        </h3>
                        <div className="overflow-x-auto">
                          <table className="w-full">
                            <thead>
                              <tr className="border-b border-[#1F1F23]">
                                <th className="text-left text-xs text-[#A0A0A5] p-3">Index</th>
                                <th className="text-left text-xs text-[#A0A0A5] p-3">Symbol</th>
                                <th className="text-right text-xs text-[#A0A0A5] p-3">Price</th>
                                <th className="text-right text-xs text-[#A0A0A5] p-3">Change %</th>
                                <th className="text-left text-xs text-[#A0A0A5] p-3">Region</th>
                              </tr>
                            </thead>
                            <tbody>
                              {worldIndices.filter(item => 
                                item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                item.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                item.region.toLowerCase().includes(searchTerm.toLowerCase())
                              ).map((index, idx) => (
                                <tr key={idx} className="table-row-hover border-b border-[#1F1F23] hover:bg-[#0D0D0F] transition-colors">
                                  <td className="p-3 text-sm">{index.name}</td>
                                  <td className="p-3 text-sm text-[#2979FF]">{index.symbol}</td>
                                  <td className="p-3 text-sm text-right">{index.price.toLocaleString()}</td>
                                  <td className={`p-3 text-sm text-right ${index.changePct >= 0 ? 'text-[#00E0A4]' : 'text-[#FF5252]'}`}>
                                    {index.changePct >= 0 ? '+' : ''}{index.changePct.toFixed(2)}%
                                  </td>
                                  <td className="p-3 text-sm text-[#A0A0A5]">{index.region}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}

                    {/* Filtered Economic Events */}
                    {economicReleases.filter(item => 
                      item.event.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      item.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      item.impact.toLowerCase().includes(searchTerm.toLowerCase())
                    ).length > 0 && (
                      <div className="glass-effect rounded-lg border border-[#1F1F23] p-4 shadow-elevated">
                        <h3 className="text-sm mb-4 flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-[#2979FF]" />
                          Economic Events ({economicReleases.filter(item => 
                            item.event.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            item.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            item.impact.toLowerCase().includes(searchTerm.toLowerCase())
                          ).length})
                        </h3>
                        <div className="overflow-x-auto">
                          <table className="w-full">
                            <thead>
                              <tr className="border-b border-[#1F1F23]">
                                <th className="text-left text-xs text-[#A0A0A5] p-3">Time</th>
                                <th className="text-left text-xs text-[#A0A0A5] p-3">Event</th>
                                <th className="text-left text-xs text-[#A0A0A5] p-3">Country</th>
                                <th className="text-left text-xs text-[#A0A0A5] p-3">Impact</th>
                              </tr>
                            </thead>
                            <tbody>
                              {economicReleases.filter(item => 
                                item.event.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                item.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                item.impact.toLowerCase().includes(searchTerm.toLowerCase())
                              ).map((event, idx) => (
                                <tr key={idx} className="table-row-hover border-b border-[#1F1F23] hover:bg-[#0D0D0F] transition-colors">
                                  <td className="p-3 text-sm text-[#2979FF]">{event.time}</td>
                                  <td className="p-3 text-sm">{event.event}</td>
                                  <td className="p-3 text-sm text-[#A0A0A5]">{event.country}</td>
                                  <td className="p-3">
                                    <Badge className={`text-xs ${getImpactColor(event.impact)}`}>
                                      {event.impact}
                                    </Badge>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}

                    {/* Filtered Index Movers */}
                    {indexMovers.filter(item => 
                      item.ticker.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      item.name.toLowerCase().includes(searchTerm.toLowerCase())
                    ).length > 0 && (
                      <div className="glass-effect rounded-lg border border-[#1F1F23] p-4 shadow-elevated">
                        <h3 className="text-sm mb-4 flex items-center gap-2">
                          <TrendingUp className="w-4 h-4 text-[#00E0A4]" />
                          Index Movers ({indexMovers.filter(item => 
                            item.ticker.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            item.name.toLowerCase().includes(searchTerm.toLowerCase())
                          ).length})
                        </h3>
                        <div className="overflow-x-auto">
                          <table className="w-full">
                            <thead>
                              <tr className="border-b border-[#1F1F23]">
                                <th className="text-left text-xs text-[#A0A0A5] p-3">Ticker</th>
                                <th className="text-left text-xs text-[#A0A0A5] p-3">Company</th>
                                <th className="text-right text-xs text-[#A0A0A5] p-3">Price</th>
                                <th className="text-right text-xs text-[#A0A0A5] p-3">Change %</th>
                              </tr>
                            </thead>
                            <tbody>
                              {indexMovers.filter(item => 
                                item.ticker.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                item.name.toLowerCase().includes(searchTerm.toLowerCase())
                              ).map((stock, idx) => (
                                <tr key={idx} className="table-row-hover border-b border-[#1F1F23] hover:bg-[#0D0D0F] transition-colors">
                                  <td className="p-3 text-sm text-[#2979FF]">{stock.ticker}</td>
                                  <td className="p-3 text-sm">{stock.name}</td>
                                  <td className="p-3 text-sm text-right">${stock.price.toFixed(2)}</td>
                                  <td className={`p-3 text-sm text-right ${stock.changePct >= 0 ? 'text-[#00E0A4]' : 'text-[#FF5252]'}`}>
                                    {stock.changePct >= 0 ? '+' : ''}{stock.changePct.toFixed(2)}%
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}

                    {/* Filtered M&A Deals */}
                    {maDeals.filter(item => 
                      item.target.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      item.acquirer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      item.sector.toLowerCase().includes(searchTerm.toLowerCase())
                    ).length > 0 && (
                      <div className="glass-effect rounded-lg border border-[#1F1F23] p-4 shadow-elevated">
                        <h3 className="text-sm mb-4">M&A Deals ({maDeals.filter(item => 
                          item.target.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.acquirer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.sector.toLowerCase().includes(searchTerm.toLowerCase())
                        ).length})</h3>
                        <div className="overflow-x-auto">
                          <table className="w-full">
                            <thead>
                              <tr className="border-b border-[#1F1F23]">
                                <th className="text-left text-xs text-[#A0A0A5] p-3">Target</th>
                                <th className="text-left text-xs text-[#A0A0A5] p-3">Acquirer</th>
                                <th className="text-right text-xs text-[#A0A0A5] p-3">Value</th>
                                <th className="text-left text-xs text-[#A0A0A5] p-3">Status</th>
                                <th className="text-left text-xs text-[#A0A0A5] p-3">Sector</th>
                              </tr>
                            </thead>
                            <tbody>
                              {maDeals.filter(item => 
                                item.target.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                item.acquirer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                item.sector.toLowerCase().includes(searchTerm.toLowerCase())
                              ).map((deal, idx) => (
                                <tr key={idx} className="table-row-hover border-b border-[#1F1F23] hover:bg-[#0D0D0F] transition-colors">
                                  <td className="p-3 text-sm">{deal.target}</td>
                                  <td className="p-3 text-sm text-[#2979FF]">{deal.acquirer}</td>
                                  <td className="p-3 text-sm text-right text-[#00E0A4]">{deal.value}</td>
                                  <td className="p-3">
                                    <Badge className={`text-xs ${getStatusColor(deal.status)}`}>
                                      {deal.status}
                                    </Badge>
                                  </td>
                                  <td className="p-3 text-sm">{deal.sector}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}

                    {/* Filtered Currency Rates */}
                    {currencyRates.filter(item => 
                      item.pair.toLowerCase().includes(searchTerm.toLowerCase())
                    ).length > 0 && (
                      <div className="glass-effect rounded-lg border border-[#1F1F23] p-4 shadow-elevated">
                        <h3 className="text-sm mb-4 flex items-center gap-2">
                          <DollarSign className="w-4 h-4 text-[#00E0A4]" />
                          Currency Rates ({currencyRates.filter(item => 
                            item.pair.toLowerCase().includes(searchTerm.toLowerCase())
                          ).length})
                        </h3>
                        <div className="overflow-x-auto">
                          <table className="w-full">
                            <thead>
                              <tr className="border-b border-[#1F1F23]">
                                <th className="text-left text-xs text-[#A0A0A5] p-3">Pair</th>
                                <th className="text-right text-xs text-[#A0A0A5] p-3">Bid</th>
                                <th className="text-right text-xs text-[#A0A0A5] p-3">Ask</th>
                                <th className="text-right text-xs text-[#A0A0A5] p-3">Change %</th>
                              </tr>
                            </thead>
                            <tbody>
                              {currencyRates.filter(item => 
                                item.pair.toLowerCase().includes(searchTerm.toLowerCase())
                              ).map((fx, idx) => (
                                <tr key={idx} className="table-row-hover border-b border-[#1F1F23] hover:bg-[#0D0D0F] transition-colors">
                                  <td className="p-3 text-sm text-[#2979FF]">{fx.pair}</td>
                                  <td className="p-3 text-sm text-right">{fx.bid.toFixed(4)}</td>
                                  <td className="p-3 text-sm text-right">{fx.ask.toFixed(4)}</td>
                                  <td className={`p-3 text-sm text-right ${fx.changePct >= 0 ? 'text-[#00E0A4]' : 'text-[#FF5252]'}`}>
                                    {fx.changePct >= 0 ? '+' : ''}{fx.changePct.toFixed(2)}%
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}

                    {/* Filtered Credit Ratings */}
                    {ratingRevisions.filter(item => 
                      item.issuer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      item.agency.toLowerCase().includes(searchTerm.toLowerCase())
                    ).length > 0 && (
                      <div className="glass-effect rounded-lg border border-[#1F1F23] p-4 shadow-elevated">
                        <h3 className="text-sm mb-4">Credit Rating Revisions ({ratingRevisions.filter(item => 
                          item.issuer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.agency.toLowerCase().includes(searchTerm.toLowerCase())
                        ).length})</h3>
                        <div className="overflow-x-auto">
                          <table className="w-full">
                            <thead>
                              <tr className="border-b border-[#1F1F23]">
                                <th className="text-left text-xs text-[#A0A0A5] p-3">Issuer</th>
                                <th className="text-left text-xs text-[#A0A0A5] p-3">Agency</th>
                                <th className="text-left text-xs text-[#A0A0A5] p-3">New Rating</th>
                                <th className="text-left text-xs text-[#A0A0A5] p-3">Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {ratingRevisions.filter(item => 
                                item.issuer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                item.agency.toLowerCase().includes(searchTerm.toLowerCase())
                              ).map((rating, idx) => (
                                <tr key={idx} className="table-row-hover border-b border-[#1F1F23] hover:bg-[#0D0D0F] transition-colors">
                                  <td className="p-3 text-sm">{rating.issuer}</td>
                                  <td className="p-3 text-sm text-[#A0A0A5]">{rating.agency}</td>
                                  <td className="p-3 text-sm text-[#2979FF]">{rating.newRating}</td>
                                  <td className="p-3">
                                    <Badge className={`text-xs ${getStatusColor(rating.action)}`}>
                                      {rating.action}
                                    </Badge>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}

                    {/* No Results */}
                    {worldIndices.filter(item => 
                      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      item.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      item.region.toLowerCase().includes(searchTerm.toLowerCase())
                    ).length === 0 &&
                    economicReleases.filter(item => 
                      item.event.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      item.country.toLowerCase().includes(searchTerm.toLowerCase())
                    ).length === 0 &&
                    indexMovers.filter(item => 
                      item.ticker.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      item.name.toLowerCase().includes(searchTerm.toLowerCase())
                    ).length === 0 &&
                    maDeals.filter(item => 
                      item.target.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      item.acquirer.toLowerCase().includes(searchTerm.toLowerCase())
                    ).length === 0 &&
                    currencyRates.filter(item => 
                      item.pair.toLowerCase().includes(searchTerm.toLowerCase())
                    ).length === 0 &&
                    ratingRevisions.filter(item => 
                      item.issuer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      item.agency.toLowerCase().includes(searchTerm.toLowerCase())
                    ).length === 0 && (
                      <div className="glass-effect rounded-lg border border-[#1F1F23] p-8 text-center">
                        <Search className="w-12 h-12 text-[#A0A0A5] mx-auto mb-4 opacity-50" />
                        <h3 className="text-sm mb-2">No results found</h3>
                        <p className="text-xs text-[#A0A0A5]">
                          No matches found for "{searchTerm}". Try searching for indices, companies, currencies, or events.
                        </p>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="glass-effect rounded-lg border border-[#1F1F23] p-8 text-center">
                    <Search className="w-12 h-12 text-[#A0A0A5] mx-auto mb-4" />
                    <h3 className="text-sm mb-2">Search Markets Data</h3>
                    <p className="text-xs text-[#A0A0A5]">
                      Enter a search term to find indices, companies, currencies, economic events, M&A deals, and more across all markets data.
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>

            {/* World P/E Analysis */}
            <TabsContent value="pe" className="mt-0">
              <div className="space-y-4">
                <div className="bg-[#151519] rounded-lg border border-[#1F1F23] p-4">
                  <h3 className="text-sm mb-4">Global P/E Ratio Comparison</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-[#1F1F23]">
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Index</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">Current P/E</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">Historical Avg</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">Premium/Discount</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">Earnings</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">Earnings Yield %</th>
                        </tr>
                      </thead>
                      <tbody>
                        {peAnalysis.map((item, idx) => (
                          <tr key={idx} className="border-b border-[#1F1F23] hover:bg-[#0D0D0F] transition-colors">
                            <td className="p-3 text-sm">{item.index}</td>
                            <td className="p-3 text-sm text-right">{item.pe.toFixed(1)}</td>
                            <td className="p-3 text-sm text-right text-[#A0A0A5]">{item.historicalAvg.toFixed(1)}</td>
                            <td className={`p-3 text-sm text-right ${item.premium >= 0 ? 'text-[#FF9800]' : 'text-[#00E0A4]'}`}>
                              {item.premium >= 0 ? '+' : ''}{item.premium.toFixed(1)}%
                            </td>
                            <td className="p-3 text-sm text-right">{item.earnings.toFixed(1)}</td>
                            <td className="p-3 text-sm text-right text-[#2979FF]">{item.yield.toFixed(2)}%</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Economic Releases */}
            <TabsContent value="economic" className="mt-0">
              <div className="space-y-4">
                <div className="bg-[#151519] rounded-lg border border-[#1F1F23] p-4">
                  <div className="flex items-center gap-2 mb-4">
                    <Calendar className="w-5 h-5 text-[#2979FF]" />
                    <h3 className="text-sm">Today's Economic Calendar</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-[#1F1F23]">
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Time</th>
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Event</th>
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Country</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">Previous</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">Forecast</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">Actual</th>
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Impact</th>
                        </tr>
                      </thead>
                      <tbody>
                        {economicReleases.map((event, idx) => (
                          <tr key={idx} className="border-b border-[#1F1F23] hover:bg-[#0D0D0F] transition-colors">
                            <td className="p-3 text-sm text-[#2979FF]">{event.time}</td>
                            <td className="p-3 text-sm">{event.event}</td>
                            <td className="p-3 text-sm text-[#A0A0A5]">{event.country}</td>
                            <td className="p-3 text-sm text-right">{event.previous}</td>
                            <td className="p-3 text-sm text-right">{event.forecast}</td>
                            <td className="p-3 text-sm text-right">{event.actual}</td>
                            <td className="p-3">
                              <Badge className={`text-xs ${getImpactColor(event.impact)}`}>
                                {event.impact}
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

            {/* Index Movers */}
            <TabsContent value="movers" className="mt-0">
              <div className="space-y-4">
                <div className="bg-[#151519] rounded-lg border border-[#1F1F23] p-4">
                  <h3 className="text-sm mb-4">S&P 500 Index Movers</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-[#1F1F23]">
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Ticker</th>
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Company</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">Price</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">Change</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">Change %</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">Index Contribution</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">Weight %</th>
                        </tr>
                      </thead>
                      <tbody>
                        {indexMovers.map((stock, idx) => (
                          <tr key={idx} className="border-b border-[#1F1F23] hover:bg-[#0D0D0F] transition-colors">
                            <td className="p-3 text-sm text-[#2979FF]">{stock.ticker}</td>
                            <td className="p-3 text-sm">{stock.name}</td>
                            <td className="p-3 text-sm text-right">${stock.price.toFixed(2)}</td>
                            <td className={`p-3 text-sm text-right ${stock.change >= 0 ? 'text-[#00E0A4]' : 'text-[#FF5252]'}`}>
                              {stock.change >= 0 ? '+' : ''}${stock.change.toFixed(2)}
                            </td>
                            <td className={`p-3 text-sm text-right ${stock.changePct >= 0 ? 'text-[#00E0A4]' : 'text-[#FF5252]'}`}>
                              {stock.changePct >= 0 ? '+' : ''}{stock.changePct.toFixed(2)}%
                            </td>
                            <td className={`p-3 text-sm text-right ${stock.contribution >= 0 ? 'text-[#00E0A4]' : 'text-[#FF5252]'}`}>
                              {stock.contribution >= 0 ? '+' : ''}{stock.contribution.toFixed(1)}
                            </td>
                            <td className="p-3 text-sm text-right text-[#A0A0A5]">{stock.weight.toFixed(1)}%</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* M&A Database */}
            <TabsContent value="ma" className="mt-0">
              <div className="space-y-4">
                <div className="bg-[#151519] rounded-lg border border-[#1F1F23] p-4">
                  <h3 className="text-sm mb-4">Mergers & Acquisitions Database</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-[#1F1F23]">
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Target</th>
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Acquirer</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">Deal Value</th>
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Status</th>
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Announced</th>
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Type</th>
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Sector</th>
                        </tr>
                      </thead>
                      <tbody>
                        {maDeals.map((deal, idx) => (
                          <tr key={idx} className="border-b border-[#1F1F23] hover:bg-[#0D0D0F] transition-colors">
                            <td className="p-3 text-sm">{deal.target}</td>
                            <td className="p-3 text-sm text-[#2979FF]">{deal.acquirer}</td>
                            <td className="p-3 text-sm text-right text-[#00E0A4]">{deal.value}</td>
                            <td className="p-3">
                              <Badge className={`text-xs ${getStatusColor(deal.status)}`}>
                                {deal.status}
                              </Badge>
                            </td>
                            <td className="p-3 text-sm text-[#A0A0A5]">{deal.announced}</td>
                            <td className="p-3 text-sm text-[#A0A0A5]">{deal.type}</td>
                            <td className="p-3 text-sm">{deal.sector}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Currency Rates */}
            <TabsContent value="fx" className="mt-0">
              <div className="space-y-4">
                <div className="bg-[#151519] rounded-lg border border-[#1F1F23] p-4">
                  <div className="flex items-center gap-2 mb-4">
                    <DollarSign className="w-5 h-5 text-[#00E0A4]" />
                    <h3 className="text-sm">Cross-Currency Rate Monitor</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-[#1F1F23]">
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Pair</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">Bid</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">Ask</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">Change</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">Change %</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">High</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">Low</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currencyRates.map((fx, idx) => (
                          <tr key={idx} className="border-b border-[#1F1F23] hover:bg-[#0D0D0F] transition-colors">
                            <td className="p-3 text-sm text-[#2979FF]">{fx.pair}</td>
                            <td className="p-3 text-sm text-right">{fx.bid.toFixed(4)}</td>
                            <td className="p-3 text-sm text-right">{fx.ask.toFixed(4)}</td>
                            <td className={`p-3 text-sm text-right ${fx.change >= 0 ? 'text-[#00E0A4]' : 'text-[#FF5252]'}`}>
                              {fx.change >= 0 ? '+' : ''}{fx.change.toFixed(4)}
                            </td>
                            <td className={`p-3 text-sm text-right ${fx.changePct >= 0 ? 'text-[#00E0A4]' : 'text-[#FF5252]'}`}>
                              {fx.changePct >= 0 ? '+' : ''}{fx.changePct.toFixed(2)}%
                            </td>
                            <td className="p-3 text-sm text-right text-[#A0A0A5]">{fx.high.toFixed(4)}</td>
                            <td className="p-3 text-sm text-right text-[#A0A0A5]">{fx.low.toFixed(4)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Credit Ratings */}
            <TabsContent value="ratings" className="mt-0">
              <div className="space-y-4">
                <div className="bg-[#151519] rounded-lg border border-[#1F1F23] p-4">
                  <h3 className="text-sm mb-4">Recent Rating Revisions</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-[#1F1F23]">
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Issuer</th>
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Agency</th>
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Old Rating</th>
                          <th className="text-left text-xs text-[#A0A0A5] p-3">New Rating</th>
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Action</th>
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Date</th>
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Outlook</th>
                        </tr>
                      </thead>
                      <tbody>
                        {ratingRevisions.map((rating, idx) => (
                          <tr key={idx} className="border-b border-[#1F1F23] hover:bg-[#0D0D0F] transition-colors">
                            <td className="p-3 text-sm">{rating.issuer}</td>
                            <td className="p-3 text-sm text-[#A0A0A5]">{rating.agency}</td>
                            <td className="p-3 text-sm">{rating.oldRating}</td>
                            <td className="p-3 text-sm text-[#2979FF]">{rating.newRating}</td>
                            <td className="p-3">
                              <Badge className={`text-xs ${getStatusColor(rating.action)}`}>
                                {rating.action}
                              </Badge>
                            </td>
                            <td className="p-3 text-sm text-[#A0A0A5]">{rating.date}</td>
                            <td className="p-3 text-sm">{rating.outlook}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Bond Market */}
            <TabsContent value="bonds" className="mt-0">
              <div className="space-y-4">
                <div className="bg-[#151519] rounded-lg border border-[#1F1F23] p-4">
                  <h3 className="text-sm mb-4">US Treasury Yield Curve</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-[#1F1F23]">
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Maturity</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">Rate %</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">Change (bps)</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">Yield %</th>
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Country</th>
                        </tr>
                      </thead>
                      <tbody>
                        {bondRates.map((bond, idx) => (
                          <tr key={idx} className="border-b border-[#1F1F23] hover:bg-[#0D0D0F] transition-colors">
                            <td className="p-3 text-sm text-[#2979FF]">{bond.maturity}</td>
                            <td className="p-3 text-sm text-right">{bond.rate.toFixed(2)}%</td>
                            <td className={`p-3 text-sm text-right ${bond.change >= 0 ? 'text-[#FF5252]' : 'text-[#00E0A4]'}`}>
                              {bond.change >= 0 ? '+' : ''}{bond.change.toFixed(2)}
                            </td>
                            <td className="p-3 text-sm text-right">{bond.yield.toFixed(2)}%</td>
                            <td className="p-3 text-sm text-[#A0A0A5]">{bond.country}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Market Calendar */}
            <TabsContent value="calendar" className="mt-0">
              <div className="space-y-4">
                <div className="bg-[#151519] rounded-lg border border-[#1F1F23] p-4">
                  <h3 className="text-sm mb-4">Global Market Hours</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-[#1F1F23]">
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Market</th>
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Status</th>
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Open Time</th>
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Close Time</th>
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Next Close/Open</th>
                        </tr>
                      </thead>
                      <tbody>
                        {marketHours.map((market, idx) => (
                          <tr key={idx} className="border-b border-[#1F1F23] hover:bg-[#0D0D0F] transition-colors">
                            <td className="p-3 text-sm">{market.market}</td>
                            <td className="p-3">
                              <div className="flex items-center gap-2">
                                <div className={`w-2 h-2 rounded-full ${market.status === "OPEN" ? 'bg-[#00E0A4]' : 'bg-[#FF5252]'}`} />
                                <span className={`text-sm ${getStatusColor(market.status)}`}>{market.status}</span>
                              </div>
                            </td>
                            <td className="p-3 text-sm text-[#A0A0A5]">{market.open}</td>
                            <td className="p-3 text-sm text-[#A0A0A5]">{market.close}</td>
                            <td className="p-3 text-sm">{market.nextClose}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Money Market */}
            <TabsContent value="money" className="mt-0">
              <div className="space-y-4">
                <div className="bg-[#151519] rounded-lg border border-[#1F1F23] p-4">
                  <h3 className="text-sm mb-4">Money Market / SOFR Rates</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-[#1F1F23]">
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Instrument</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">Rate %</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">Change (bps)</th>
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Term</th>
                        </tr>
                      </thead>
                      <tbody>
                        {moneyMarketRates.map((rate, idx) => (
                          <tr key={idx} className="border-b border-[#1F1F23] hover:bg-[#0D0D0F] transition-colors">
                            <td className="p-3 text-sm text-[#2979FF]">{rate.instrument}</td>
                            <td className="p-3 text-sm text-right">{rate.rate.toFixed(2)}%</td>
                            <td className={`p-3 text-sm text-right ${rate.change >= 0 ? 'text-[#FF5252]' : 'text-[#00E0A4]'}`}>
                              {rate.change >= 0 ? '+' : ''}{rate.change.toFixed(2)}
                            </td>
                            <td className="p-3 text-sm text-[#A0A0A5]">{rate.term}</td>
                          </tr>
                        ))}
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
