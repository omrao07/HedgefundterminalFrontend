import { useState } from "react";
import { SimpleScrollArea as ScrollArea } from "../ui/simple-scroll-area";
import { SimpleTabs as Tabs, SimpleTabsList as TabsList, SimpleTabsTrigger as TabsTrigger, SimpleTabsContent as TabsContent } from "../ui/simple-tabs";
import { Badge } from "../ui/badge";
import { SimpleProgress as Progress } from "../ui/simple-progress";
import { Button } from "../ui/button";
import { 
  Satellite, 
  TrendingUp, 
  TrendingDown, 
  MapPin, 
  Ship, 
  Droplet, 
  Flame, 
  Wind,
  AlertTriangle,
  Activity,
  Globe2,
  Target,
  Radio,
  Waves,
  Zap,
  Cloud,
  CloudRain,
  Sun,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";

export function IntelligenceTab() {
  const [activeView, setActiveView] = useState("command");
  const [selectedTimeframe, setSelectedTimeframe] = useState("1D");
  const [mapOverlays, setMapOverlays] = useState({
    ports: true,
    satellites: true,
    shipping: true,
    weather: false,
    crops: false,
    oilFields: false
  });

  // Commodity data
  const commodities = [
    { name: "WTI Crude", price: 78.45, change: 2.34, changePercent: 3.07, unit: "/bbl", status: "up" },
    { name: "Brent Crude", price: 82.67, change: 2.12, changePercent: 2.63, unit: "/bbl", status: "up" },
    { name: "Natural Gas", price: 2.84, change: -0.15, changePercent: -5.02, unit: "/MMBtu", status: "down" },
    { name: "Gold", price: 2034.50, change: -12.30, changePercent: -0.60, unit: "/oz", status: "down" },
    { name: "Silver", price: 23.67, change: 0.45, changePercent: 1.94, unit: "/oz", status: "up" },
    { name: "Copper", price: 3.89, change: 0.08, changePercent: 2.10, unit: "/lb", status: "up" },
    { name: "Wheat", price: 645.25, change: -8.50, changePercent: -1.30, unit: "/bu", status: "down" },
    { name: "Corn", price: 478.75, change: 5.25, changePercent: 1.11, unit: "/bu", status: "up" },
    { name: "Soybeans", price: 1289.50, change: 12.75, changePercent: 1.00, unit: "/bu", status: "up" },
    { name: "Coffee", price: 198.30, change: -3.20, changePercent: -1.59, unit: "/lb", status: "down" },
  ];

  // AI Trade Signals
  const tradeSignals = [
    { 
      timestamp: "14:32:18", 
      signal: "LONG", 
      asset: "WTI/Brent Spread", 
      conviction: 87, 
      entry: "$-4.22", 
      target: "$-3.80", 
      rationale: "Refinery maintenance + weather disruption",
      status: "active"
    },
    { 
      timestamp: "14:28:45", 
      signal: "SHORT", 
      asset: "Natural Gas", 
      conviction: 92, 
      entry: "$2.84", 
      target: "$2.65", 
      rationale: "Warm winter forecast + oversupply",
      status: "active"
    },
    { 
      timestamp: "14:15:23", 
      signal: "LONG", 
      asset: "Copper", 
      conviction: 78, 
      entry: "$3.81", 
      target: "$4.05", 
      rationale: "China stimulus + supply disruption",
      status: "filled"
    },
    { 
      timestamp: "14:02:56", 
      signal: "SHORT", 
      asset: "Wheat", 
      conviction: 84, 
      entry: "$653.75", 
      target: "$635.00", 
      rationale: "Record harvest + low demand",
      status: "filled"
    },
    { 
      timestamp: "13:48:12", 
      signal: "LONG", 
      asset: "Gold", 
      conviction: 73, 
      entry: "$2046.80", 
      target: "$2080.00", 
      rationale: "Fed pivot signals + geopolitical risk",
      status: "stopped"
    },
  ];

  // Satellite anomalies
  const satelliteAlerts = [
    { 
      location: "Port of Shanghai", 
      type: "Congestion", 
      severity: "HIGH", 
      vessels: 147, 
      change: "+23%", 
      impact: "Copper delays",
      lat: 31.2304,
      lng: 121.4737
    },
    { 
      location: "US Midwest Crops", 
      type: "Drought", 
      severity: "CRITICAL", 
      coverage: "34%", 
      change: "+8%", 
      impact: "Corn yield ↓15%",
      lat: 41.8781,
      lng: -93.0977
    },
    { 
      location: "Strait of Hormuz", 
      type: "Traffic Spike", 
      severity: "MEDIUM", 
      vessels: 89, 
      change: "+12%", 
      impact: "Oil transit risk",
      lat: 26.5667,
      lng: 56.2500
    },
    { 
      location: "Black Sea Routes", 
      type: "Disruption", 
      severity: "HIGH", 
      vessels: 12, 
      change: "-67%", 
      impact: "Wheat exports ↓",
      lat: 44.0000,
      lng: 35.0000
    },
    { 
      location: "Brazilian Mines", 
      type: "Weather", 
      severity: "MEDIUM", 
      coverage: "Heavy rain", 
      change: "72hr", 
      impact: "Iron ore delay",
      lat: -19.9167,
      lng: -43.9345
    },
  ];

  // KPI Metrics
  const kpiMetrics = [
    { label: "CPI (YoY)", value: "3.4%", change: "+0.1%", status: "neutral" },
    { label: "PMI Manuf.", value: "48.7", change: "-1.2", status: "down" },
    { label: "FX Vol Index", value: "8.94", change: "+0.43", status: "up" },
    { label: "Baltic Dry", value: "1,847", change: "+127", status: "up" },
    { label: "WTI-Brent", value: "$4.22", change: "+$0.22", status: "up" },
    { label: "Oil Inventories", value: "421M bbl", change: "-2.4M", status: "down" },
  ];

  // Geopolitical events
  const geoEvents = [
    { time: "14:45", event: "OPEC+ Emergency Meeting Announced", impact: "HIGH", category: "Energy" },
    { time: "13:22", event: "China PMI Beats Expectations", impact: "MEDIUM", category: "Macro" },
    { time: "12:08", event: "Ukraine Grain Corridor Extended", impact: "LOW", category: "Agriculture" },
    { time: "11:34", event: "Hurricane Track Shifts to Oil Region", impact: "CRITICAL", category: "Weather" },
    { time: "10:15", event: "Fed Speaker: Rate Cut Possible Q2", impact: "HIGH", category: "Monetary" },
  ];

  // Port traffic data
  const portTraffic = [
    { port: "Shanghai", vessels: 147, wait_days: 8.4, volume_change: "+23%", status: "congested" },
    { port: "Singapore", vessels: 89, wait_days: 3.2, volume_change: "+8%", status: "normal" },
    { port: "Rotterdam", vessels: 67, wait_days: 4.1, volume_change: "-5%", status: "normal" },
    { port: "Houston", vessels: 54, wait_days: 2.8, volume_change: "+12%", status: "busy" },
    { port: "Los Angeles", vessels: 43, wait_days: 6.7, volume_change: "-18%", status: "clearing" },
  ];

  // Supply chain metrics
  const supplyChainMetrics = [
    { metric: "Container Rates (Asia-US)", value: "$3,847", change: "+12.4%", trend: "up" },
    { metric: "Global Ship Capacity Util.", value: "87.3%", change: "+2.1%", trend: "up" },
    { metric: "Air Freight Index", value: "2.84", change: "-5.6%", trend: "down" },
    { metric: "Rail Car Loadings", value: "234K", change: "+3.8%", trend: "up" },
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

  return (
    <div className="h-[calc(100vh-120px)]">
      <Tabs value={activeView} onValueChange={setActiveView} className="h-full flex flex-col">
        {/* Enhanced Tab Bar with glassmorphism and gradient effects */}
        <div className="relative border-b border-[#2979FF]/20 bg-gradient-to-r from-[#0D0D0F] via-[#151519] to-[#0D0D0F]">
          {/* Animated gradient line */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#00E0A4] to-transparent opacity-50" />
          
          <TabsList className="bg-transparent backdrop-blur-xl rounded-none w-full justify-start p-0 h-16 relative">
            {/* Glow effect behind active tab */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#00E0A4]/5 via-transparent to-transparent pointer-events-none" />
            
            <TabsTrigger 
              value="command" 
              className="relative group data-[state=active]:bg-gradient-to-b data-[state=active]:from-[#00E0A4]/10 data-[state=active]:to-transparent data-[state=active]:text-[#00E0A4] bg-transparent text-[#A0A0A5] hover:text-[#E8E8E8] hover:bg-[#151519]/50 rounded-none border-b-2 border-transparent data-[state=active]:border-[#00E0A4] px-8 h-full transition-all duration-300"
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Target className="w-5 h-5 relative z-10 group-data-[state=active]:drop-shadow-[0_0_8px_rgba(0,224,164,0.5)]" />
                  <div className="absolute inset-0 bg-[#00E0A4] blur-md opacity-0 group-data-[state=active]:opacity-30 transition-opacity" />
                </div>
                <span className="tracking-wide">Command Center</span>
              </div>
              {/* Active indicator glow */}
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00E0A4] to-transparent opacity-0 group-data-[state=active]:opacity-100 transition-opacity shadow-[0_0_12px_rgba(0,224,164,0.5)]" />
            </TabsTrigger>

            <TabsTrigger 
              value="macro" 
              className="relative group data-[state=active]:bg-gradient-to-b data-[state=active]:from-[#00E0A4]/10 data-[state=active]:to-transparent data-[state=active]:text-[#00E0A4] bg-transparent text-[#A0A0A5] hover:text-[#E8E8E8] hover:bg-[#151519]/50 rounded-none border-b-2 border-transparent data-[state=active]:border-[#00E0A4] px-8 h-full transition-all duration-300"
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Activity className="w-5 h-5 relative z-10 group-data-[state=active]:drop-shadow-[0_0_8px_rgba(0,224,164,0.5)]" />
                  <div className="absolute inset-0 bg-[#00E0A4] blur-md opacity-0 group-data-[state=active]:opacity-30 transition-opacity" />
                </div>
                <span className="tracking-wide">Macro Trading Desk</span>
              </div>
              {/* Active indicator glow */}
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00E0A4] to-transparent opacity-0 group-data-[state=active]:opacity-100 transition-opacity shadow-[0_0_12px_rgba(0,224,164,0.5)]" />
            </TabsTrigger>

            <TabsTrigger 
              value="satellite" 
              className="relative group data-[state=active]:bg-gradient-to-b data-[state=active]:from-[#00E0A4]/10 data-[state=active]:to-transparent data-[state=active]:text-[#00E0A4] bg-transparent text-[#A0A0A5] hover:text-[#E8E8E8] hover:bg-[#151519]/50 rounded-none border-b-2 border-transparent data-[state=active]:border-[#00E0A4] px-8 h-full transition-all duration-300"
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Satellite className="w-5 h-5 relative z-10 group-data-[state=active]:drop-shadow-[0_0_8px_rgba(0,224,164,0.5)]" />
                  <div className="absolute inset-0 bg-[#00E0A4] blur-md opacity-0 group-data-[state=active]:opacity-30 transition-opacity" />
                </div>
                <span className="tracking-wide">Satellite Intelligence</span>
              </div>
              {/* Active indicator glow */}
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00E0A4] to-transparent opacity-0 group-data-[state=active]:opacity-100 transition-opacity shadow-[0_0_12px_rgba(0,224,164,0.5)]" />
            </TabsTrigger>
          </TabsList>

          {/* Bottom gradient border */}
          <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#2979FF]/40 to-transparent" />
        </div>

        <ScrollArea className="flex-1">
          <div className="p-4">
            {/* COMMAND CENTER VIEW */}
            <TabsContent value="command" className="mt-0">
              <div className="space-y-4">
                {/* Top KPI Cards */}
                <div className="grid grid-cols-6 gap-4">
                  {kpiMetrics.map((kpi, idx) => (
                    <div key={idx} className="bg-[#0D0D0F]/80 backdrop-blur-xl rounded-lg border border-[#2979FF]/20 p-4 hover:border-[#2979FF]/40 transition-all">
                      <div className="text-xs text-[#A0A0A5] mb-1">{kpi.label}</div>
                      <div className="text-2xl mb-1">{kpi.value}</div>
                      <div className={`text-xs flex items-center gap-1 ${
                        kpi.status === "up" ? "text-[#00E0A4]" : 
                        kpi.status === "down" ? "text-[#FF5252]" : "text-[#A0A0A5]"
                      }`}>
                        {kpi.status === "up" ? <TrendingUp className="w-3 h-3" /> : 
                         kpi.status === "down" ? <TrendingDown className="w-3 h-3" /> : null}
                        {kpi.change}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-3 gap-4">
                  {/* Global Map */}
                  <div className="col-span-2 bg-[#0D0D0F]/80 backdrop-blur-xl rounded-lg border border-[#2979FF]/20 p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <Globe2 className="w-5 h-5 text-[#2979FF]" />
                        <h3 className="text-sm">Global Intelligence Map</h3>
                        <Badge className="bg-[#2979FF]/20 text-[#2979FF] border-[#2979FF]/30 text-xs">
                          {Object.values(mapOverlays).filter(Boolean).length} Layers
                        </Badge>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => setMapOverlays({...mapOverlays, ports: !mapOverlays.ports})}
                          className={`h-7 text-xs bg-transparent transition-all ${
                            mapOverlays.ports 
                              ? "border-[#2979FF] bg-[#2979FF]/20 text-[#2979FF]" 
                              : "border-[#2979FF]/30 text-[#A0A0A5]"
                          }`}
                        >
                          <MapPin className="w-3 h-3 mr-1" />
                          Ports
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => setMapOverlays({...mapOverlays, satellites: !mapOverlays.satellites})}
                          className={`h-7 text-xs bg-transparent transition-all ${
                            mapOverlays.satellites 
                              ? "border-[#00E0A4] bg-[#00E0A4]/20 text-[#00E0A4]" 
                              : "border-[#00E0A4]/30 text-[#A0A0A5]"
                          }`}
                        >
                          <Satellite className="w-3 h-3 mr-1" />
                          Satellites
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => setMapOverlays({...mapOverlays, shipping: !mapOverlays.shipping})}
                          className={`h-7 text-xs bg-transparent transition-all ${
                            mapOverlays.shipping 
                              ? "border-[#FF9800] bg-[#FF9800]/20 text-[#FF9800]" 
                              : "border-[#FF9800]/30 text-[#A0A0A5]"
                          }`}
                        >
                          <Ship className="w-3 h-3 mr-1" />
                          Shipping
                        </Button>
                      </div>
                    </div>
                    
                    {/* Map visualization area */}
                    <div className="relative h-[400px] bg-[#000000] rounded-lg border border-[#1F1F23] overflow-hidden">
                      {/* Simulated map with grid overlay */}
                      <div className="absolute inset-0 opacity-20">
                        <div className="w-full h-full grid grid-cols-12 grid-rows-8">
                          {Array.from({ length: 96 }).map((_, i) => (
                            <div key={i} className="border border-[#2979FF]/10" />
                          ))}
                        </div>
                      </div>
                      
                      {/* Map markers */}
                      <div className="absolute inset-0">
                        {mapOverlays.satellites && satelliteAlerts.map((alert, idx) => (
                          <div 
                            key={idx}
                            className="absolute w-3 h-3 rounded-full animate-pulse cursor-pointer group transition-opacity"
                            style={{
                              left: `${20 + idx * 15}%`,
                              top: `${30 + (idx % 3) * 20}%`,
                              backgroundColor: alert.severity === "CRITICAL" ? "#FF5252" : 
                                             alert.severity === "HIGH" ? "#FF9800" : "#2979FF"
                            }}
                          >
                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 hidden group-hover:block bg-[#0D0D0F] border border-[#2979FF]/40 rounded px-2 py-1 text-xs whitespace-nowrap z-10">
                              {alert.location}
                            </div>
                            <div className="absolute inset-0 rounded-full animate-ping opacity-50"
                              style={{
                                backgroundColor: alert.severity === "CRITICAL" ? "#FF5252" : 
                                               alert.severity === "HIGH" ? "#FF9800" : "#2979FF"
                              }}
                            />
                          </div>
                        ))}
                      </div>

                      {/* Map legend */}
                      <div className="absolute bottom-4 left-4 bg-[#0D0D0F]/90 backdrop-blur-sm border border-[#1F1F23] rounded-lg p-3 text-xs">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-[#FF5252]" />
                            <span>Critical Alert</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-[#FF9800]" />
                            <span>High Priority</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-[#2979FF]" />
                            <span>Monitoring</span>
                          </div>
                        </div>
                      </div>

                      {/* Live counter */}
                      <div className="absolute top-4 right-4 bg-[#0D0D0F]/90 backdrop-blur-sm border border-[#00E0A4]/30 rounded-lg px-3 py-2">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-[#00E0A4] animate-pulse" />
                          <span className="text-xs text-[#00E0A4]">LIVE</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Live Commodities */}
                  <div className="bg-[#0D0D0F]/80 backdrop-blur-xl rounded-lg border border-[#2979FF]/20 p-4">
                    <div className="flex items-center gap-2 mb-4">
                      <BarChart3 className="w-5 h-5 text-[#00E0A4]" />
                      <h3 className="text-sm">Live Commodities</h3>
                    </div>
                    <ScrollArea className="h-[400px]">
                      <div className="space-y-2">
                        {commodities.map((commodity, idx) => (
                          <div key={idx} className="bg-[#151519] rounded-lg p-3 hover:bg-[#1F1F23] transition-colors cursor-pointer">
                            <div className="flex items-start justify-between mb-1">
                              <div>
                                <div className="text-sm">{commodity.name}</div>
                                <div className="text-xs text-[#A0A0A5]">{commodity.unit}</div>
                              </div>
                              <div className={`text-xs px-2 py-1 rounded ${
                                commodity.status === "up" ? "bg-[#00E0A4]/20 text-[#00E0A4]" : "bg-[#FF5252]/20 text-[#FF5252]"
                              }`}>
                                {commodity.status === "up" ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                              </div>
                            </div>
                            <div className="flex items-end justify-between">
                              <div className="text-lg">${commodity.price.toFixed(2)}</div>
                              <div className={commodity.status === "up" ? "text-[#00E0A4] text-xs" : "text-[#FF5252] text-xs"}>
                                {commodity.changePercent > 0 ? "+" : ""}{commodity.changePercent.toFixed(2)}%
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>
                </div>

                {/* AI Trade Signals */}
                <div className="bg-[#0D0D0F]/80 backdrop-blur-xl rounded-lg border border-[#2979FF]/20">
                  <div className="p-4 border-b border-[#1F1F23]">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Zap className="w-5 h-5 text-[#FFD700]" />
                        <h3 className="text-sm">AI Trade Signals - Real-Time Arbitrage Engine</h3>
                      </div>
                      <Badge className="bg-[#00E0A4]/20 text-[#00E0A4] border-[#00E0A4]/30">
                        {tradeSignals.filter(s => s.status === "active").length} Active
                      </Badge>
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-[#1F1F23]">
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Timestamp</th>
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Signal</th>
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Asset</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">Conviction</th>
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Entry</th>
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Target</th>
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Rationale</th>
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tradeSignals.map((signal, idx) => (
                          <tr key={idx} className="border-b border-[#1F1F23] hover:bg-[#151519] transition-colors">
                            <td className="p-3 text-sm text-[#A0A0A5]">{signal.timestamp}</td>
                            <td className="p-3">
                              <Badge className={`text-xs ${
                                signal.signal === "LONG" ? 
                                "bg-[#00E0A4]/20 text-[#00E0A4] border-[#00E0A4]/30" : 
                                "bg-[#FF5252]/20 text-[#FF5252] border-[#FF5252]/30"
                              }`}>
                                {signal.signal}
                              </Badge>
                            </td>
                            <td className="p-3 text-sm">{signal.asset}</td>
                            <td className="p-3 text-sm text-right">
                              <div className="flex items-center gap-2 justify-end">
                                <span className={signal.conviction >= 80 ? "text-[#00E0A4]" : "text-[#FF9800]"}>
                                  {signal.conviction}%
                                </span>
                                <Progress value={signal.conviction} className="w-16 h-2" />
                              </div>
                            </td>
                            <td className="p-3 text-sm text-[#2979FF]">{signal.entry}</td>
                            <td className="p-3 text-sm text-[#00E0A4]">{signal.target}</td>
                            <td className="p-3 text-xs text-[#A0A0A5] max-w-[200px]">{signal.rationale}</td>
                            <td className="p-3">
                              <Badge className={`text-xs ${
                                signal.status === "active" ? "bg-[#2979FF]/20 text-[#2979FF] border-[#2979FF]/30" :
                                signal.status === "filled" ? "bg-[#00E0A4]/20 text-[#00E0A4] border-[#00E0A4]/30" :
                                "bg-[#FF5252]/20 text-[#FF5252] border-[#FF5252]/30"
                              }`}>
                                {signal.status.toUpperCase()}
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Satellite Alerts */}
                <div className="bg-[#0D0D0F]/80 backdrop-blur-xl rounded-lg border border-[#2979FF]/20">
                  <div className="p-4 border-b border-[#1F1F23]">
                    <div className="flex items-center gap-2">
                      <Satellite className="w-5 h-5 text-[#2979FF]" />
                      <h3 className="text-sm">Satellite Anomaly Detection</h3>
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-[#1F1F23]">
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Location</th>
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Type</th>
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Severity</th>
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Metric</th>
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Change</th>
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Market Impact</th>
                        </tr>
                      </thead>
                      <tbody>
                        {satelliteAlerts.map((alert, idx) => (
                          <tr key={idx} className="border-b border-[#1F1F23] hover:bg-[#151519] transition-colors">
                            <td className="p-3 text-sm flex items-center gap-2">
                              <MapPin className="w-4 h-4 text-[#2979FF]" />
                              {alert.location}
                            </td>
                            <td className="p-3 text-sm">{alert.type}</td>
                            <td className="p-3">
                              <Badge className={`text-xs ${getSeverityColor(alert.severity)}`}>
                                {alert.severity}
                              </Badge>
                            </td>
                            <td className="p-3 text-sm">{alert.vessels || alert.coverage}</td>
                            <td className="p-3 text-sm text-[#FF9800]">{alert.change}</td>
                            <td className="p-3 text-sm text-[#00E0A4]">{alert.impact}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* MACRO TRADING DESK VIEW */}
            <TabsContent value="macro" className="mt-0">
              <div className="space-y-4">
                {/* Geopolitical Events Feed */}
                <div className="bg-[#0D0D0F]/80 backdrop-blur-xl rounded-lg border border-[#2979FF]/20">
                  <div className="p-4 border-b border-[#1F1F23]">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Radio className="w-5 h-5 text-[#FF5252]" />
                        <h3 className="text-sm">Real-Time Event Feed - Macro & Geopolitical</h3>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#00E0A4] animate-pulse" />
                        <span className="text-xs text-[#00E0A4]">LIVE MONITORING</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="space-y-3">
                      {geoEvents.map((event, idx) => (
                        <div key={idx} className="flex items-start gap-4 bg-[#151519] rounded-lg p-3 hover:bg-[#1F1F23] transition-colors">
                          <div className="text-xs text-[#A0A0A5] w-16">{event.time}</div>
                          <div className="flex-1">
                            <div className="text-sm mb-1">{event.event}</div>
                            <div className="flex items-center gap-2">
                              <Badge className="text-xs bg-[#2979FF]/20 text-[#2979FF] border-[#2979FF]/30">
                                {event.category}
                              </Badge>
                              <Badge className={`text-xs ${getSeverityColor(event.impact)}`}>
                                {event.impact}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Port Traffic */}
                  <div className="bg-[#0D0D0F]/80 backdrop-blur-xl rounded-lg border border-[#2979FF]/20">
                    <div className="p-4 border-b border-[#1F1F23]">
                      <div className="flex items-center gap-2">
                        <Ship className="w-5 h-5 text-[#2979FF]" />
                        <h3 className="text-sm">Global Port Traffic Analysis</h3>
                      </div>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-[#1F1F23]">
                            <th className="text-left text-xs text-[#A0A0A5] p-3">Port</th>
                            <th className="text-right text-xs text-[#A0A0A5] p-3">Vessels</th>
                            <th className="text-right text-xs text-[#A0A0A5] p-3">Wait Time</th>
                            <th className="text-right text-xs text-[#A0A0A5] p-3">Volume Δ</th>
                            <th className="text-left text-xs text-[#A0A0A5] p-3">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {portTraffic.map((port, idx) => (
                            <tr key={idx} className="border-b border-[#1F1F23] hover:bg-[#151519] transition-colors">
                              <td className="p-3 text-sm">{port.port}</td>
                              <td className="p-3 text-sm text-right">{port.vessels}</td>
                              <td className="p-3 text-sm text-right">{port.wait_days} days</td>
                              <td className={`p-3 text-sm text-right ${
                                port.volume_change.startsWith("+") ? "text-[#FF9800]" : "text-[#00E0A4]"
                              }`}>
                                {port.volume_change}
                              </td>
                              <td className="p-3">
                                <Badge className={`text-xs ${
                                  port.status === "congested" ? "bg-[#FF5252]/20 text-[#FF5252] border-[#FF5252]/30" :
                                  port.status === "busy" ? "bg-[#FF9800]/20 text-[#FF9800] border-[#FF9800]/30" :
                                  "bg-[#00E0A4]/20 text-[#00E0A4] border-[#00E0A4]/30"
                                }`}>
                                  {port.status}
                                </Badge>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Supply Chain Metrics */}
                  <div className="bg-[#0D0D0F]/80 backdrop-blur-xl rounded-lg border border-[#2979FF]/20">
                    <div className="p-4 border-b border-[#1F1F23]">
                      <div className="flex items-center gap-2">
                        <Waves className="w-5 h-5 text-[#00E0A4]" />
                        <h3 className="text-sm">Supply Chain Indicators</h3>
                      </div>
                    </div>
                    <div className="p-4 space-y-4">
                      {supplyChainMetrics.map((metric, idx) => (
                        <div key={idx} className="bg-[#151519] rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="text-sm text-[#A0A0A5]">{metric.metric}</div>
                            <div className={`text-xs flex items-center gap-1 ${
                              metric.trend === "up" ? "text-[#00E0A4]" : "text-[#FF5252]"
                            }`}>
                              {metric.trend === "up" ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                              {metric.change}
                            </div>
                          </div>
                          <div className="text-2xl">{metric.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Commodity Price Charts */}
                <div className="grid grid-cols-3 gap-4">
                  {["WTI Crude", "Natural Gas", "Gold"].map((commodity, idx) => (
                    <div key={idx} className="bg-[#0D0D0F]/80 backdrop-blur-xl rounded-lg border border-[#2979FF]/20 p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm">{commodity}</h3>
                        <div className="flex gap-1">
                          {["1D", "1W", "1M", "YTD"].map((tf) => (
                            <button
                              key={tf}
                              onClick={() => setSelectedTimeframe(tf)}
                              className={`text-xs px-2 py-1 rounded ${
                                selectedTimeframe === tf
                                  ? "bg-[#2979FF]/20 text-[#2979FF]"
                                  : "text-[#A0A0A5] hover:bg-[#151519]"
                              }`}
                            >
                              {tf}
                            </button>
                          ))}
                        </div>
                      </div>
                      {/* Simulated chart */}
                      <div className="h-32 bg-[#000000] rounded-lg border border-[#1F1F23] flex items-end p-2 gap-1">
                        {Array.from({ length: 40 }).map((_, i) => (
                          <div
                            key={i}
                            className="flex-1 bg-gradient-to-t from-[#2979FF] to-[#00E0A4] rounded-t opacity-70 hover:opacity-100 transition-opacity"
                            style={{ height: `${20 + Math.random() * 80}%` }}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* SATELLITE INTELLIGENCE VIEW */}
            <TabsContent value="satellite" className="mt-0">
              <div className="space-y-4">
                {/* Large Map View */}
                <div className="bg-[#0D0D0F]/80 backdrop-blur-xl rounded-lg border border-[#2979FF]/20 p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Satellite className="w-5 h-5 text-[#2979FF]" />
                      <h3 className="text-sm">Satellite Intelligence - Global Overview</h3>
                      <Badge className="bg-[#00E0A4]/20 text-[#00E0A4] border-[#00E0A4]/30 text-xs">
                        {Object.values(mapOverlays).filter(Boolean).length} Active Overlays
                      </Badge>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => setMapOverlays({...mapOverlays, weather: !mapOverlays.weather})}
                        className={`h-7 text-xs bg-transparent transition-all ${
                          mapOverlays.weather 
                            ? "border-[#2979FF] bg-[#2979FF]/20 text-[#2979FF]" 
                            : "border-[#2979FF]/30 text-[#A0A0A5]"
                        }`}
                      >
                        <Cloud className="w-3 h-3 mr-1" />
                        Weather
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => setMapOverlays({...mapOverlays, crops: !mapOverlays.crops})}
                        className={`h-7 text-xs bg-transparent transition-all ${
                          mapOverlays.crops 
                            ? "border-[#00E0A4] bg-[#00E0A4]/20 text-[#00E0A4]" 
                            : "border-[#00E0A4]/30 text-[#A0A0A5]"
                        }`}
                      >
                        <Droplet className="w-3 h-3 mr-1" />
                        Crops
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => setMapOverlays({...mapOverlays, oilFields: !mapOverlays.oilFields})}
                        className={`h-7 text-xs bg-transparent transition-all ${
                          mapOverlays.oilFields 
                            ? "border-[#FF9800] bg-[#FF9800]/20 text-[#FF9800]" 
                            : "border-[#FF9800]/30 text-[#A0A0A5]"
                        }`}
                      >
                        <Flame className="w-3 h-3 mr-1" />
                        Oil Fields
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => setMapOverlays({...mapOverlays, shipping: !mapOverlays.shipping})}
                        className={`h-7 text-xs bg-transparent transition-all ${
                          mapOverlays.shipping 
                            ? "border-[#2979FF] bg-[#2979FF]/20 text-[#2979FF]" 
                            : "border-[#2979FF]/30 text-[#A0A0A5]"
                        }`}
                      >
                        <Ship className="w-3 h-3 mr-1" />
                        Shipping
                      </Button>
                    </div>
                  </div>
                  
                  {/* Large Map */}
                  <div className="relative h-[600px] bg-[#000000] rounded-lg border border-[#1F1F23] overflow-hidden">
                    {/* Grid overlay */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="w-full h-full grid grid-cols-20 grid-rows-12">
                        {Array.from({ length: 240 }).map((_, i) => (
                          <div key={i} className="border border-[#2979FF]" />
                        ))}
                      </div>
                    </div>

                    {/* Enhanced map markers with connections */}
                    <div className="absolute inset-0">
                      {/* Shipping routes */}
                      <svg className="absolute inset-0 w-full h-full">
                        <defs>
                          <linearGradient id="route-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#2979FF" stopOpacity="0.5" />
                            <stop offset="100%" stopColor="#00E0A4" stopOpacity="0.5" />
                          </linearGradient>
                        </defs>
                        <path 
                          d="M 100 200 Q 300 100 500 250" 
                          stroke="url(#route-gradient)" 
                          strokeWidth="2" 
                          fill="none"
                          className="animate-pulse"
                        />
                        <path 
                          d="M 200 400 Q 400 350 600 450" 
                          stroke="url(#route-gradient)" 
                          strokeWidth="2" 
                          fill="none"
                          className="animate-pulse"
                        />
                      </svg>

                      {satelliteAlerts.map((alert, idx) => (
                        <div 
                          key={idx}
                          className="absolute group cursor-pointer"
                          style={{
                            left: `${15 + idx * 18}%`,
                            top: `${25 + (idx % 4) * 15}%`,
                          }}
                        >
                          {/* Radar effect */}
                          <div className="absolute inset-0 w-20 h-20 -translate-x-1/2 -translate-y-1/2">
                            <div className="absolute inset-0 rounded-full border border-[#2979FF]/30 animate-ping" />
                            <div className="absolute inset-2 rounded-full border border-[#00E0A4]/30 animate-ping animation-delay-75" />
                          </div>

                          {/* Marker */}
                          <div 
                            className="w-4 h-4 rounded-full relative z-10"
                            style={{
                              backgroundColor: alert.severity === "CRITICAL" ? "#FF5252" : 
                                             alert.severity === "HIGH" ? "#FF9800" : "#2979FF",
                              boxShadow: `0 0 20px ${
                                alert.severity === "CRITICAL" ? "#FF5252" : 
                                alert.severity === "HIGH" ? "#FF9800" : "#2979FF"
                              }`
                            }}
                          >
                            <div className="absolute inset-0 rounded-full animate-pulse opacity-75"
                              style={{
                                backgroundColor: alert.severity === "CRITICAL" ? "#FF5252" : 
                                               alert.severity === "HIGH" ? "#FF9800" : "#2979FF"
                              }}
                            />
                          </div>

                          {/* Tooltip */}
                          <div className="absolute top-8 left-1/2 -translate-x-1/2 hidden group-hover:block bg-[#0D0D0F]/95 backdrop-blur-sm border border-[#2979FF]/40 rounded-lg p-3 text-xs whitespace-nowrap z-20 shadow-2xl">
                            <div className="text-sm mb-2">{alert.location}</div>
                            <div className="space-y-1 text-[#A0A0A5]">
                              <div>Type: <span className="text-[#E8E8E8]">{alert.type}</span></div>
                              <div>Severity: <span className={
                                alert.severity === "CRITICAL" ? "text-[#FF5252]" :
                                alert.severity === "HIGH" ? "text-[#FF9800]" : "text-[#2979FF]"
                              }>{alert.severity}</span></div>
                              <div>Change: <span className="text-[#FF9800]">{alert.change}</span></div>
                              <div>Impact: <span className="text-[#00E0A4]">{alert.impact}</span></div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Enhanced Legend */}
                    <div className="absolute bottom-6 left-6 bg-[#0D0D0F]/95 backdrop-blur-sm border border-[#1F1F23] rounded-lg p-4 text-xs">
                      <div className="mb-3 text-sm">Satellite Monitoring</div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-[#FF5252] shadow-[0_0_10px_#FF5252]" />
                          <span>Critical Alert - Immediate Action</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-[#FF9800] shadow-[0_0_10px_#FF9800]" />
                          <span>High Priority - Monitor Closely</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-[#2979FF] shadow-[0_0_10px_#2979FF]" />
                          <span>Normal - Tracking</span>
                        </div>
                      </div>
                    </div>

                    {/* Status Panel */}
                    <div className="absolute top-6 right-6 bg-[#0D0D0F]/95 backdrop-blur-sm border border-[#00E0A4]/30 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-3 h-3 rounded-full bg-[#00E0A4] animate-pulse" />
                        <span className="text-xs text-[#00E0A4]">SATELLITE ACTIVE</span>
                      </div>
                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between gap-4">
                          <span className="text-[#A0A0A5]">Coverage:</span>
                          <span>Global</span>
                        </div>
                        <div className="flex justify-between gap-4">
                          <span className="text-[#A0A0A5]">Resolution:</span>
                          <span>10m</span>
                        </div>
                        <div className="flex justify-between gap-4">
                          <span className="text-[#A0A0A5]">Update:</span>
                          <span className="text-[#00E0A4]">Real-time</span>
                        </div>
                        <div className="flex justify-between gap-4">
                          <span className="text-[#A0A0A5]">Alerts:</span>
                          <span className="text-[#FF5252]">{satelliteAlerts.length}</span>
                        </div>
                      </div>
                    </div>

                    {/* Coordinates */}
                    <div className="absolute bottom-6 right-6 bg-[#0D0D0F]/95 backdrop-blur-sm border border-[#1F1F23] rounded-lg px-3 py-2 text-xs text-[#A0A0A5] font-mono">
                      LAT: 40.7128°N | LON: 74.0060°W
                    </div>
                  </div>
                </div>

                {/* Satellite Imagery Analysis */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#0D0D0F]/80 backdrop-blur-xl rounded-lg border border-[#2979FF]/20 p-4">
                    <div className="flex items-center gap-2 mb-4">
                      <CloudRain className="w-5 h-5 text-[#2979FF]" />
                      <h3 className="text-sm">Weather Pattern Analysis</h3>
                    </div>
                    <div className="space-y-3">
                      {[
                        { region: "US Midwest", condition: "Drought", severity: "CRITICAL", impact: "Corn -15%, Soy -12%" },
                        { region: "Brazil Mines", condition: "Heavy Rain", severity: "HIGH", impact: "Iron ore delays" },
                        { region: "Gulf of Mexico", condition: "Hurricane Path", severity: "HIGH", impact: "Oil production risk" },
                        { region: "Black Sea", condition: "Clear", severity: "LOW", impact: "Normal operations" },
                      ].map((weather, idx) => (
                        <div key={idx} className="bg-[#151519] rounded-lg p-3">
                          <div className="flex items-center justify-between mb-2">
                            <div className="text-sm">{weather.region}</div>
                            <Badge className={`text-xs ${getSeverityColor(weather.severity)}`}>
                              {weather.severity}
                            </Badge>
                          </div>
                          <div className="text-xs text-[#A0A0A5] mb-1">{weather.condition}</div>
                          <div className="text-xs text-[#00E0A4]">{weather.impact}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-[#0D0D0F]/80 backdrop-blur-xl rounded-lg border border-[#2979FF]/20 p-4">
                    <div className="flex items-center gap-2 mb-4">
                      <Sun className="w-5 h-5 text-[#FFD700]" />
                      <h3 className="text-sm">Crop Yield Estimates</h3>
                    </div>
                    <div className="space-y-3">
                      {[
                        { crop: "Corn (US)", current: "15.2B bu", forecast: "14.8B bu", change: "-2.6%", status: "down" },
                        { crop: "Wheat (Ukraine)", current: "21.5M mt", forecast: "18.2M mt", change: "-15.3%", status: "down" },
                        { crop: "Soybeans (Brazil)", current: "158M mt", forecast: "162M mt", change: "+2.5%", status: "up" },
                        { crop: "Rice (Asia)", current: "512M mt", forecast: "508M mt", change: "-0.8%", status: "down" },
                      ].map((crop, idx) => (
                        <div key={idx} className="bg-[#151519] rounded-lg p-3">
                          <div className="flex items-center justify-between mb-2">
                            <div className="text-sm">{crop.crop}</div>
                            <div className={`text-xs ${
                              crop.status === "up" ? "text-[#00E0A4]" : "text-[#FF5252]"
                            }`}>
                              {crop.change}
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div>
                              <div className="text-[#A0A0A5]">Current</div>
                              <div>{crop.current}</div>
                            </div>
                            <div>
                              <div className="text-[#A0A0A5]">Forecast</div>
                              <div>{crop.forecast}</div>
                            </div>
                          </div>
                        </div>
                      ))}
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