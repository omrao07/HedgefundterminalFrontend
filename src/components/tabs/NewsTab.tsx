import { useState, useEffect } from "react";
import { ScrollArea } from "../ui/scroll-area";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { Input } from "../ui/input";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";
import { TrendingUp, TrendingDown, Clock, AlertCircle, Search } from "lucide-react";
import { Badge } from "../ui/badge";

interface NewsItem {
  id: number;
  title: string;
  source: string;
  time: string;
  sentiment: "bullish" | "bearish" | "neutral";
  impact: "high" | "medium" | "low";
  category: string;
  region?: string;
}

export function NewsTab() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [sentimentScore, setSentimentScore] = useState(65);
  const [activeSubTab, setActiveSubTab] = useState("main");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Mock news data
    const mockNews: NewsItem[] = [
      {
        id: 1,
        title: "Federal Reserve Signals Potential Rate Cuts in Q2",
        source: "Bloomberg",
        time: "5m ago",
        sentiment: "bullish",
        impact: "high",
        category: "Monetary Policy"
      },
      {
        id: 2,
        title: "Tech Giants Report Strong Q4 Earnings, Beat Estimates",
        source: "Reuters",
        time: "12m ago",
        sentiment: "bullish",
        impact: "high",
        category: "Earnings"
      },
      {
        id: 3,
        title: "Oil Prices Drop 3% on Supply Surplus Concerns",
        source: "CNBC",
        time: "25m ago",
        sentiment: "bearish",
        impact: "medium",
        category: "Commodities"
      },
      {
        id: 4,
        title: "European Markets Mixed Ahead of ECB Meeting",
        source: "Financial Times",
        time: "1h ago",
        sentiment: "neutral",
        impact: "medium",
        category: "Markets"
      },
      {
        id: 5,
        title: "Merger Activity Picks Up in Healthcare Sector",
        source: "WSJ",
        time: "1h ago",
        sentiment: "bullish",
        impact: "medium",
        category: "M&A",
        region: "US"
      },
      {
        id: 6,
        title: "Volatility Index Spikes to 3-Month High",
        source: "MarketWatch",
        time: "2h ago",
        sentiment: "bearish",
        impact: "high",
        category: "Volatility"
      },
      {
        id: 7,
        title: "Bitcoin Holds Above $42K Despite Regulatory Concerns",
        source: "CoinDesk",
        time: "2h ago",
        sentiment: "neutral",
        impact: "medium",
        category: "Crypto"
      },
      {
        id: 8,
        title: "Employment Data Exceeds Expectations",
        source: "Bloomberg",
        time: "3h ago",
        sentiment: "bullish",
        impact: "high",
        category: "Economic Data"
      },
    ];
    
    setNews(mockNews);
  }, []);

  // Sentiment history data
  const sentimentHistory = Array.from({ length: 24 }, (_, i) => ({
    hour: `${i}h`,
    bullish: 50 + Math.random() * 30,
    bearish: 30 + Math.random() * 20,
  }));

  // Market sentiment breakdown
  const sentimentBreakdown = [
    { category: "Equities", sentiment: 72, change: +5 },
    { category: "Forex", sentiment: 58, change: -2 },
    { category: "Crypto", sentiment: 45, change: -8 },
    { category: "Commodities", sentiment: 38, change: -12 },
  ];

  const getSentimentColor = (sentiment: "bullish" | "bearish" | "neutral") => {
    switch (sentiment) {
      case "bullish": return "bg-[#00E0A4]/20 text-[#00E0A4] border-[#00E0A4]/30";
      case "bearish": return "bg-[#FF5252]/20 text-[#FF5252] border-[#FF5252]/30";
      case "neutral": return "bg-[#A0A0A5]/20 text-[#A0A0A5] border-[#A0A0A5]/30";
    }
  };

  const getImpactColor = (impact: "high" | "medium" | "low") => {
    switch (impact) {
      case "high": return "text-[#FF5252]";
      case "medium": return "text-[#FF9800]";
      case "low": return "text-[#A0A0A5]";
    }
  };

  // Filter news based on active tab and search
  const filteredNews = news.filter(item => {
    const matchesSearch = searchTerm === "" || 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.source.toLowerCase().includes(searchTerm.toLowerCase());
    
    switch(activeSubTab) {
      case "top":
        return matchesSearch && item.impact === "high";
      case "ma":
        return matchesSearch && item.category === "M&A";
      case "opening":
        return matchesSearch && item.category.includes("Markets");
      case "corporate":
        return matchesSearch && (item.category === "Corporate" || item.category.includes("Earnings"));
      case "earnings":
        return matchesSearch && item.category === "Earnings";
      default:
        return matchesSearch;
    }
  });

  return (
    <div className="h-[calc(100vh-120px)]">
      <Tabs value={activeSubTab} onValueChange={setActiveSubTab} className="h-full flex flex-col">
        <TabsList className="bg-[#1F1F23] border-b-2 border-[#2979FF]/20 rounded-none w-full justify-start p-0 h-12">
          <TabsTrigger value="main" className="data-[state=active]:bg-[#151519] data-[state=active]:text-[#00E0A4] data-[state=active]:border-[#00E0A4] bg-transparent text-[#A0A0A5] hover:text-[#E8E8E8] hover:bg-[#151519]/50 rounded-none border-b-2 border-transparent px-3 whitespace-nowrap transition-all text-xs">
            Main
          </TabsTrigger>
          <TabsTrigger value="top" className="data-[state=active]:bg-[#151519] data-[state=active]:text-[#00E0A4] data-[state=active]:border-[#00E0A4] bg-transparent text-[#A0A0A5] hover:text-[#E8E8E8] hover:bg-[#151519]/50 rounded-none border-b-2 border-transparent px-3 whitespace-nowrap transition-all text-xs">
            Top
          </TabsTrigger>
          <TabsTrigger value="search" className="data-[state=active]:bg-[#151519] data-[state=active]:text-[#00E0A4] data-[state=active]:border-[#00E0A4] bg-transparent text-[#A0A0A5] hover:text-[#E8E8E8] hover:bg-[#151519]/50 rounded-none border-b-2 border-transparent px-3 whitespace-nowrap transition-all text-xs">
            Search
          </TabsTrigger>
          <TabsTrigger value="ma" className="data-[state=active]:bg-[#151519] data-[state=active]:text-[#00E0A4] data-[state=active]:border-[#00E0A4] bg-transparent text-[#A0A0A5] hover:text-[#E8E8E8] hover:bg-[#151519]/50 rounded-none border-b-2 border-transparent px-3 whitespace-nowrap transition-all text-xs">
            M&A
          </TabsTrigger>
          <TabsTrigger value="opening" className="data-[state=active]:bg-[#151519] data-[state=active]:text-[#00E0A4] data-[state=active]:border-[#00E0A4] bg-transparent text-[#A0A0A5] hover:text-[#E8E8E8] hover:bg-[#151519]/50 rounded-none border-b-2 border-transparent px-3 whitespace-nowrap transition-all text-xs">
            Opening
          </TabsTrigger>
          <TabsTrigger value="corporate" className="data-[state=active]:bg-[#151519] data-[state=active]:text-[#00E0A4] data-[state=active]:border-[#00E0A4] bg-transparent text-[#A0A0A5] hover:text-[#E8E8E8] hover:bg-[#151519]/50 rounded-none border-b-2 border-transparent px-3 whitespace-nowrap transition-all text-xs">
            Corporate
          </TabsTrigger>
          <TabsTrigger value="earnings" className="data-[state=active]:bg-[#151519] data-[state=active]:text-[#00E0A4] data-[state=active]:border-[#00E0A4] bg-transparent text-[#A0A0A5] hover:text-[#E8E8E8] hover:bg-[#151519]/50 rounded-none border-b-2 border-transparent px-3 whitespace-nowrap transition-all text-xs">
            Earnings
          </TabsTrigger>
        </TabsList>

        <ScrollArea className="flex-1">
          <div className="p-4">
            <TabsContent value="main" className="mt-0">
              <div className="grid grid-cols-3 gap-4">
      {/* Left: News Feed */}
      <div className="col-span-2 space-y-4">
        {/* Sentiment Overview */}
        <div className="grid grid-cols-2 gap-4">
          {/* Overall Sentiment Gauge */}
          <div className="bg-[#151519] rounded-lg border border-[#1F1F23] p-4">
            <h3 className="text-sm mb-4">Overall Market Sentiment</h3>
            <div className="flex items-center justify-center mb-4">
              <div className="relative w-40 h-40">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    stroke="#1F1F23"
                    strokeWidth="12"
                    fill="none"
                  />
                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    stroke={sentimentScore >= 50 ? "#00E0A4" : "#FF5252"}
                    strokeWidth="12"
                    fill="none"
                    strokeDasharray={`${(sentimentScore / 100) * 439.6} 439.6`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="text-3xl">{sentimentScore}</div>
                  <div className="text-xs text-[#A0A0A5]">Bullish</div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1 text-[#FF5252]">
                <TrendingDown className="h-3 w-3" />
                <span>Bearish (0-49)</span>
              </div>
              <div className="flex items-center gap-1 text-[#00E0A4]">
                <TrendingUp className="h-3 w-3" />
                <span>Bullish (50-100)</span>
              </div>
            </div>
          </div>

          {/* Sentiment by Category */}
          <div className="bg-[#151519] rounded-lg border border-[#1F1F23] p-4">
            <h3 className="text-sm mb-4">Sentiment by Asset Class</h3>
            <div className="space-y-3">
              {sentimentBreakdown.map((item, idx) => (
                <div key={idx}>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-[#A0A0A5]">{item.category}</span>
                    <div className="flex items-center gap-2">
                      <span>{item.sentiment}</span>
                      <span className={item.change >= 0 ? 'text-[#00E0A4]' : 'text-[#FF5252]'}>
                        {item.change >= 0 ? '+' : ''}{item.change}
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-[#1F1F23] rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${item.sentiment >= 50 ? 'bg-[#00E0A4]' : 'bg-[#FF5252]'}`}
                      style={{ width: `${item.sentiment}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sentiment History Chart */}
        <div className="bg-[#151519] rounded-lg border border-[#1F1F23] p-4">
          <h3 className="text-sm mb-4">24-Hour Sentiment Trend</h3>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={sentimentHistory}>
              <defs>
                <linearGradient id="colorBullish" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00E0A4" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#00E0A4" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorBearish" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FF5252" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#FF5252" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1F1F23" />
              <XAxis dataKey="hour" stroke="#A0A0A5" tick={{ fontSize: 10 }} />
              <YAxis stroke="#A0A0A5" tick={{ fontSize: 10 }} />
              <Tooltip
                contentStyle={{ backgroundColor: "#0D0D0F", border: "1px solid #1F1F23", borderRadius: "4px", fontSize: "12px" }}
              />
              <Area type="monotone" dataKey="bullish" stroke="#00E0A4" fill="url(#colorBullish)" strokeWidth={2} />
              <Area type="monotone" dataKey="bearish" stroke="#FF5252" fill="url(#colorBearish)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* News Feed */}
        <div className="bg-[#151519] rounded-lg border border-[#1F1F23] flex-1">
          <div className="p-4 border-b border-[#1F1F23] flex items-center justify-between">
            <h3 className="text-sm">Live News Feed</h3>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#00E0A4] rounded-full animate-pulse" />
              <span className="text-xs text-[#A0A0A5]">Live</span>
            </div>
          </div>
          <ScrollArea className="h-[400px]">
            <div className="p-4 space-y-3">
              {news.map((item) => (
                <div
                  key={item.id}
                  className="p-3 rounded-lg border-l-2 bg-[#0D0D0F] hover:bg-[#1A1A1E] transition-colors"
                  style={{
                    borderLeftColor: 
                      item.sentiment === 'bullish' ? '#00E0A4' : 
                      item.sentiment === 'bearish' ? '#FF5252' : '#A0A0A5'
                  }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-sm leading-tight flex-1">{item.title}</h4>
                    <AlertCircle className={`h-4 w-4 ml-2 shrink-0 ${getImpactColor(item.impact)}`} />
                  </div>
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-xs text-[#A0A0A5]">{item.source}</span>
                    <div className="flex items-center gap-1 text-xs text-[#A0A0A5]">
                      <Clock className="h-3 w-3" />
                      <span>{item.time}</span>
                    </div>
                    <Badge className={`text-[10px] px-2 py-0.5 border ${getSentimentColor(item.sentiment)}`}>
                      {item.sentiment}
                    </Badge>
                    <span className="text-[10px] text-[#A0A0A5]">{item.category}</span>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>

      {/* Right: Impact Analysis */}
      <div className="space-y-4">
        {/* High Impact Events */}
        <div className="bg-[#151519] rounded-lg border border-[#1F1F23] p-4">
          <h3 className="text-sm mb-4">High Impact Events Today</h3>
          <div className="space-y-3">
            {news.filter(n => n.impact === "high").map((item) => (
              <div key={item.id} className="p-2 bg-[#0D0D0F] rounded border border-[#1F1F23]">
                <div className="text-xs mb-1 leading-tight">{item.title}</div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-[#A0A0A5]">{item.time}</span>
                  <Badge className={`text-[10px] px-1.5 py-0 border ${getSentimentColor(item.sentiment)}`}>
                    {item.sentiment}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Distribution */}
        <div className="bg-[#151519] rounded-lg border border-[#1F1F23] p-4">
          <h3 className="text-sm mb-4">News by Category</h3>
          <div className="space-y-2">
            {Array.from(new Set(news.map(n => n.category))).map((category) => {
              const count = news.filter(n => n.category === category).length;
              const percentage = (count / news.length) * 100;
              
              return (
                <div key={category}>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-[#A0A0A5]">{category}</span>
                    <span>{count}</span>
                  </div>
                  <div className="w-full bg-[#1F1F23] rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-[#2979FF] h-full rounded-full"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sentiment Summary */}
        <div className="bg-[#151519] rounded-lg border border-[#1F1F23] p-4">
          <h3 className="text-sm mb-4">Sentiment Summary</h3>
          <div className="space-y-3">
            {['bullish', 'neutral', 'bearish'].map((sentiment) => {
              const count = news.filter(n => n.sentiment === sentiment).length;
              const percentage = (count / news.length) * 100;
              
              return (
                <div key={sentiment} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-sm ${
                      sentiment === 'bullish' ? 'bg-[#00E0A4]' :
                      sentiment === 'bearish' ? 'bg-[#FF5252]' :
                      'bg-[#A0A0A5]'
                    }`} />
                    <span className="text-xs capitalize">{sentiment}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[#A0A0A5]">{count}</span>
                    <span className="text-xs">({percentage.toFixed(0)}%)</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
            </TabsContent>

            {/* Other News Tabs */}
            {["top", "search", "ma", "opening", "corporate", "earnings"].map((tabValue) => (
              <TabsContent key={tabValue} value={tabValue} className="mt-0">
                <div className="space-y-4">
                  {tabValue === "search" && (
                    <div className="bg-[#151519] rounded-lg border border-[#1F1F23] p-4">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#A0A0A5]" />
                        <Input 
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          placeholder="Search news..." 
                          className="pl-10 bg-[#0D0D0F] border-[#1F1F23]" 
                        />
                      </div>
                    </div>
                  )}

                  <div className="bg-[#151519] rounded-lg border border-[#1F1F23]">
                    <div className="p-4 border-b border-[#1F1F23] flex items-center justify-between">
                      <h3 className="text-sm">
                        {tabValue === "top" && "Top Stories - High Impact"}
                        {tabValue === "search" && `Search Results (${filteredNews.length})`}
                        {tabValue === "ma" && "Mergers & Acquisitions"}
                        {tabValue === "opening" && "Opening Market Commentary"}
                        {tabValue === "corporate" && "Corporate News"}
                        {tabValue === "earnings" && "Earnings & Upgrades/Downgrades"}
                      </h3>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-[#00E0A4] rounded-full animate-pulse" />
                        <span className="text-xs text-[#A0A0A5]">Live</span>
                      </div>
                    </div>
                    <ScrollArea className="h-[calc(100vh-280px)]">
                      <div className="p-4 space-y-3">
                        {filteredNews.length > 0 ? filteredNews.map((item) => (
                          <div
                            key={item.id}
                            className="p-3 rounded-lg border-l-2 bg-[#0D0D0F] hover:bg-[#1A1A1E] transition-colors"
                            style={{
                              borderLeftColor: 
                                item.sentiment === 'bullish' ? '#00E0A4' : 
                                item.sentiment === 'bearish' ? '#FF5252' : '#A0A0A5'
                            }}
                          >
                            <div className="flex items-start justify-between mb-2">
                              <h4 className="text-sm leading-tight flex-1">{item.title}</h4>
                              <AlertCircle className={`h-4 w-4 ml-2 shrink-0 ${getImpactColor(item.impact)}`} />
                            </div>
                            <div className="flex items-center gap-3 flex-wrap">
                              <span className="text-xs text-[#A0A0A5]">{item.source}</span>
                              <div className="flex items-center gap-1 text-xs text-[#A0A0A5]">
                                <Clock className="h-3 w-3" />
                                <span>{item.time}</span>
                              </div>
                              <Badge className={`text-[10px] px-2 py-0.5 border ${getSentimentColor(item.sentiment)}`}>
                                {item.sentiment}
                              </Badge>
                              <span className="text-[10px] text-[#A0A0A5]">{item.category}</span>
                            </div>
                          </div>
                        )) : (
                          <div className="text-center py-12 text-[#A0A0A5]">
                            <p>No news items found</p>
                            {searchTerm && <p className="text-xs mt-2">Try a different search term</p>}
                          </div>
                        )}
                      </div>
                    </ScrollArea>
                  </div>
                </div>
              </TabsContent>
            ))}
          </div>
        </ScrollArea>
      </Tabs>
    </div>
  );
}
