import { useState } from "react";
import { ScrollArea } from "../ui/scroll-area";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { Badge } from "../ui/badge";
import { Brain, Zap, Activity, AlertTriangle, TrendingUp, Target } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ScatterChart, Scatter, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";

export function AIOptimizationTab() {
  const [activeSubTab, setActiveSubTab] = useState("signals");

  // AI Signal Models
  const aiModels = [
    { name: "XGBoost Momentum", type: "XGBoost", status: "active", accuracy: 87.3, signals: 245, latency: 12, sharpe: 2.8 },
    { name: "LightGBM Mean Reversion", type: "LightGBM", status: "active", accuracy: 82.1, signals: 189, latency: 8, sharpe: 2.3 },
    { name: "LSTM Price Predictor", type: "LSTM", status: "active", accuracy: 79.5, signals: 412, latency: 45, sharpe: 2.1 },
    { name: "RL Policy Agent", type: "Reinforcement Learning", status: "active", accuracy: 84.7, signals: 156, latency: 23, sharpe: 2.6 },
    { name: "Transformer Sentiment", type: "Transformer", status: "active", accuracy: 91.2, signals: 523, latency: 65, sharpe: 1.9 },
    { name: "GRU Volatility", type: "GRU", status: "active", accuracy: 76.8, signals: 298, latency: 38, sharpe: 1.7 },
  ];

  // RL Agent Performance
  const rlAgents = [
    { agent: "Strategy Switcher", algorithm: "PPO", reward: 2456, episodes: 12450, winRate: 68.4, status: "learning" },
    { agent: "Position Sizer", algorithm: "DQN", reward: 1892, episodes: 8920, winRate: 72.1, status: "deployed" },
    { agent: "Exit Optimizer", algorithm: "A3C", reward: 2134, episodes: 10230, winRate: 65.8, status: "deployed" },
    { agent: "Market Regime Detector", algorithm: "TD3", reward: 1678, episodes: 7850, winRate: 70.5, status: "learning" },
  ];

  // News to Trade LLM
  const llmParsing = [
    { headline: "Fed signals dovish stance on rates", sentiment: 0.82, symbols: ["SPY", "TLT", "GLD"], tradeSignal: "BUY", confidence: 89, latency: 0.8 },
    { headline: "Tech earnings beat expectations", sentiment: 0.91, symbols: ["AAPL", "MSFT", "GOOGL"], tradeSignal: "BUY", confidence: 92, latency: 0.6 },
    { headline: "Oil supply concerns escalate", sentiment: -0.65, symbols: ["USO", "XLE", "XOM"], tradeSignal: "SELL", confidence: 78, latency: 0.9 },
    { headline: "Merger talks confirmed between A&B", sentiment: 0.75, symbols: ["ABC", "XYZ"], tradeSignal: "BUY", confidence: 85, latency: 0.7 },
  ];

  // AI Shock Detector
  const shockEvents = [
    { time: "14:23:45", event: "Correlation break: SPY-TLT", severity: "high", region: "US", action: "Flash arbitrage triggered", pnl: "+$12,450" },
    { time: "12:15:32", event: "Volume spike: BTC/USD", severity: "medium", region: "Global", action: "Monitoring", pnl: "$0" },
    { time: "09:45:18", event: "Volatility surge: EUR/USD", severity: "high", region: "EU", action: "Hedge deployed", pnl: "+$8,230" },
    { time: "08:12:05", event: "Liquidity drop: TSLA", severity: "low", region: "US", action: "Reduced position", pnl: "-$1,120" },
  ];

  // Quantum-inspired Optimization
  const quantumOptimization = {
    algorithm: "QAOA (Quantum Approximate Optimization Algorithm)",
    problem: "Multi-asset portfolio optimization",
    assets: 250,
    constraints: 42,
    classicalTime: "4.2 hours",
    quantumTime: "12.3 minutes",
    speedup: "20.5x",
    optimalReturn: 18.7,
    optimalRisk: 12.3,
  };

  // Order Book Prediction
  const orderBookPredictions = [
    { symbol: "AAPL", horizon: "5s", bidPressure: 0.68, askPressure: 0.32, predictedMove: "+0.08", confidence: 84 },
    { symbol: "TSLA", horizon: "10s", bidPressure: 0.45, askPressure: 0.55, predictedMove: "-0.12", confidence: 76 },
    { symbol: "SPY", horizon: "5s", bidPressure: 0.72, askPressure: 0.28, predictedMove: "+0.04", confidence: 91 },
    { symbol: "BTC/USD", horizon: "10s", bidPressure: 0.38, askPressure: 0.62, predictedMove: "-15.50", confidence: 79 },
  ];

  // Alternative Data Sources
  const altDataSources = [
    { source: "Satellite Imagery", provider: "Planet Labs", coverage: "Global", dataPoints: "2.4M/day", signals: 34, status: "active" },
    { source: "Supply Chain Sensors", provider: "Tive", coverage: "US/EU/Asia", dataPoints: "850K/day", signals: 28, status: "active" },
    { source: "Social Sentiment", provider: "Stocktwits/Reddit", coverage: "Global", dataPoints: "12.5M/day", signals: 156, status: "active" },
    { source: "Web Traffic", provider: "SimilarWeb", coverage: "Global", dataPoints: "4.2M/day", signals: 42, status: "active" },
    { source: "Credit Card Data", provider: "Second Measure", coverage: "US", dataPoints: "1.8M/day", signals: 67, status: "active" },
  ];

  // Macro Regime Detection
  const macroRegimes = [
    { region: "US", currentRegime: "Risk-On", confidence: 87, previousRegime: "Neutral", changeTime: "2 days ago", strategy: "Momentum + Growth" },
    { region: "EU", currentRegime: "Deflation", confidence: 72, previousRegime: "Inflation", changeTime: "5 days ago", strategy: "Bonds + Defensive" },
    { region: "Asia", currentRegime: "Risk-Off", confidence: 81, previousRegime: "Risk-On", changeTime: "1 day ago", strategy: "Quality + Cash" },
    { region: "LatAm", currentRegime: "Inflation", confidence: 93, previousRegime: "Inflation", changeTime: "14 days ago", strategy: "Real Assets + Commodities" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": case "deployed": return "bg-[#00E0A4]/20 text-[#00E0A4] border-[#00E0A4]/30";
      case "learning": return "bg-[#2979FF]/20 text-[#2979FF] border-[#2979FF]/30";
      case "high": return "bg-[#FF5252]/20 text-[#FF5252] border-[#FF5252]/30";
      case "medium": return "bg-[#FF9800]/20 text-[#FF9800] border-[#FF9800]/30";
      case "low": return "bg-[#A0A0A5]/20 text-[#A0A0A5] border-[#A0A0A5]/30";
      default: return "bg-[#A0A0A5]/20 text-[#A0A0A5] border-[#A0A0A5]/30";
    }
  };

  return (
    <div className="h-[calc(100vh-120px)]">
      <Tabs value={activeSubTab} onValueChange={setActiveSubTab} className="h-full flex flex-col">
        <TabsList className="bg-[#1F1F23] border-b-2 border-[#2979FF]/20 rounded-none w-full justify-start p-0 h-12">
          <TabsTrigger value="signals" className="data-[state=active]:bg-[#151519] data-[state=active]:text-[#00E0A4] data-[state=active]:border-[#00E0A4] bg-transparent text-[#A0A0A5] hover:text-[#E8E8E8] hover:bg-[#151519]/50 rounded-none border-b-2 border-transparent px-3 whitespace-nowrap transition-all text-xs">
            Signals
          </TabsTrigger>
          <TabsTrigger value="rl" className="data-[state=active]:bg-[#151519] data-[state=active]:text-[#00E0A4] data-[state=active]:border-[#00E0A4] bg-transparent text-[#A0A0A5] hover:text-[#E8E8E8] hover:bg-[#151519]/50 rounded-none border-b-2 border-transparent px-3 whitespace-nowrap transition-all text-xs">
            RL
          </TabsTrigger>
          <TabsTrigger value="llm" className="data-[state=active]:bg-[#151519] data-[state=active]:text-[#00E0A4] data-[state=active]:border-[#00E0A4] bg-transparent text-[#A0A0A5] hover:text-[#E8E8E8] hover:bg-[#151519]/50 rounded-none border-b-2 border-transparent px-3 whitespace-nowrap transition-all text-xs">
            LLM
          </TabsTrigger>
          <TabsTrigger value="shock" className="data-[state=active]:bg-[#151519] data-[state=active]:text-[#00E0A4] data-[state=active]:border-[#00E0A4] bg-transparent text-[#A0A0A5] hover:text-[#E8E8E8] hover:bg-[#151519]/50 rounded-none border-b-2 border-transparent px-3 whitespace-nowrap transition-all text-xs">
            Shock
          </TabsTrigger>
          <TabsTrigger value="quantum" className="data-[state=active]:bg-[#151519] data-[state=active]:text-[#00E0A4] data-[state=active]:border-[#00E0A4] bg-transparent text-[#A0A0A5] hover:text-[#E8E8E8] hover:bg-[#151519]/50 rounded-none border-b-2 border-transparent px-3 whitespace-nowrap transition-all text-xs">
            Quantum
          </TabsTrigger>
          <TabsTrigger value="orderbook" className="data-[state=active]:bg-[#151519] data-[state=active]:text-[#00E0A4] data-[state=active]:border-[#00E0A4] bg-transparent text-[#A0A0A5] hover:text-[#E8E8E8] hover:bg-[#151519]/50 rounded-none border-b-2 border-transparent px-3 whitespace-nowrap transition-all text-xs">
            OrderBook
          </TabsTrigger>
          <TabsTrigger value="altdata" className="data-[state=active]:bg-[#151519] data-[state=active]:text-[#00E0A4] data-[state=active]:border-[#00E0A4] bg-transparent text-[#A0A0A5] hover:text-[#E8E8E8] hover:bg-[#151519]/50 rounded-none border-b-2 border-transparent px-3 whitespace-nowrap transition-all text-xs">
            AltData
          </TabsTrigger>
          <TabsTrigger value="macro" className="data-[state=active]:bg-[#151519] data-[state=active]:text-[#00E0A4] data-[state=active]:border-[#00E0A4] bg-transparent text-[#A0A0A5] hover:text-[#E8E8E8] hover:bg-[#151519]/50 rounded-none border-b-2 border-transparent px-3 whitespace-nowrap transition-all text-xs">
            Macro
          </TabsTrigger>
        </TabsList>

        <ScrollArea className="flex-1">
          <div className="p-4">
            {/* AI Signal Models Tab */}
            <TabsContent value="signals" className="mt-0">
              <div className="space-y-4">
                <div className="grid grid-cols-4 gap-4">
                  <div className="bg-[#151519] rounded-lg border border-[#1F1F23] p-4">
                    <div className="text-xs text-[#A0A0A5] mb-1">Active Models</div>
                    <div className="text-2xl">{aiModels.filter(m => m.status === "active").length}</div>
                    <div className="text-xs text-[#00E0A4]">All operational</div>
                  </div>
                  <div className="bg-[#151519] rounded-lg border border-[#1F1F23] p-4">
                    <div className="text-xs text-[#A0A0A5] mb-1">Avg Accuracy</div>
                    <div className="text-2xl">{(aiModels.reduce((sum, m) => sum + m.accuracy, 0) / aiModels.length).toFixed(1)}%</div>
                    <div className="text-xs text-[#00E0A4]">Excellent</div>
                  </div>
                  <div className="bg-[#151519] rounded-lg border border-[#1F1F23] p-4">
                    <div className="text-xs text-[#A0A0A5] mb-1">Signals Today</div>
                    <div className="text-2xl">{aiModels.reduce((sum, m) => sum + m.signals, 0)}</div>
                    <div className="text-xs text-[#A0A0A5]">Across all models</div>
                  </div>
                  <div className="bg-[#151519] rounded-lg border border-[#1F1F23] p-4">
                    <div className="text-xs text-[#A0A0A5] mb-1">Avg Sharpe</div>
                    <div className="text-2xl">{(aiModels.reduce((sum, m) => sum + m.sharpe, 0) / aiModels.length).toFixed(1)}</div>
                    <div className="text-xs text-[#00E0A4]">Strong</div>
                  </div>
                </div>

                <div className="bg-[#151519] rounded-lg border border-[#1F1F23]">
                  <div className="p-4 border-b border-[#1F1F23]">
                    <h3 className="text-sm">AI Signal Refinement - XGBoost, LightGBM, LSTM Models</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-[#1F1F23]">
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Model Name</th>
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Type</th>
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Status</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">Accuracy %</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">Signals</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">Latency (ms)</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">Sharpe</th>
                        </tr>
                      </thead>
                      <tbody>
                        {aiModels.map((model, idx) => (
                          <tr key={idx} className="border-b border-[#1F1F23] hover:bg-[#0D0D0F] transition-colors">
                            <td className="p-3 text-sm">{model.name}</td>
                            <td className="p-3 text-sm text-[#2979FF]">{model.type}</td>
                            <td className="p-3">
                              <Badge className={`text-xs ${getStatusColor(model.status)}`}>
                                {model.status}
                              </Badge>
                            </td>
                            <td className="p-3 text-sm text-right text-[#00E0A4]">{model.accuracy.toFixed(1)}%</td>
                            <td className="p-3 text-sm text-right">{model.signals}</td>
                            <td className="p-3 text-sm text-right text-[#A0A0A5]">{model.latency}</td>
                            <td className="p-3 text-sm text-right">{model.sharpe.toFixed(1)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* RL Agents Tab */}
            <TabsContent value="rl" className="mt-0">
              <div className="space-y-4">
                <div className="bg-[#151519] rounded-lg border border-[#1F1F23]">
                  <div className="p-4 border-b border-[#1F1F23]">
                    <h3 className="text-sm">Reinforcement Learning Agents - Adaptive Strategy Switching</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-[#1F1F23]">
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Agent</th>
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Algorithm</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">Cumulative Reward</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">Episodes</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">Win Rate %</th>
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {rlAgents.map((agent, idx) => (
                          <tr key={idx} className="border-b border-[#1F1F23] hover:bg-[#0D0D0F] transition-colors">
                            <td className="p-3 text-sm">{agent.agent}</td>
                            <td className="p-3 text-sm text-[#2979FF]">{agent.algorithm}</td>
                            <td className="p-3 text-sm text-right text-[#00E0A4]">{agent.reward.toLocaleString()}</td>
                            <td className="p-3 text-sm text-right">{agent.episodes.toLocaleString()}</td>
                            <td className="p-3 text-sm text-right">{agent.winRate.toFixed(1)}%</td>
                            <td className="p-3">
                              <Badge className={`text-xs ${getStatusColor(agent.status)}`}>
                                {agent.status}
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="bg-[#151519] rounded-lg border border-[#1F1F23] p-4">
                  <h3 className="text-sm mb-4">Self-Healing Strategy Orchestrator</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-[#0D0D0F] rounded-lg border border-[#1F1F23] p-3">
                      <div className="text-xs text-[#A0A0A5] mb-1">Auto-Killed Today</div>
                      <div className="text-xl text-[#FF5252]">3 strategies</div>
                      <div className="text-xs text-[#A0A0A5] mt-1">Due to underperformance</div>
                    </div>
                    <div className="bg-[#0D0D0F] rounded-lg border border-[#1F1F23] p-3">
                      <div className="text-xs text-[#A0A0A5] mb-1">Replacements Deployed</div>
                      <div className="text-xl text-[#00E0A4]">3 strategies</div>
                      <div className="text-xs text-[#A0A0A5] mt-1">From strategy pool</div>
                    </div>
                    <div className="bg-[#0D0D0F] rounded-lg border border-[#1F1F23] p-3">
                      <div className="text-xs text-[#A0A0A5] mb-1">Orchestrator Status</div>
                      <div className="text-xl text-[#00E0A4]">Active</div>
                      <div className="text-xs text-[#A0A0A5] mt-1">Continuous monitoring</div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* News-to-Trade LLM Tab */}
            <TabsContent value="llm" className="mt-0">
              <div className="space-y-4">
                <div className="grid grid-cols-4 gap-4">
                  <div className="bg-[#151519] rounded-lg border border-[#1F1F23] p-4">
                    <div className="text-xs text-[#A0A0A5] mb-1">Avg Parse Time</div>
                    <div className="text-2xl">0.75s</div>
                    <div className="text-xs text-[#00E0A4]">Ultra-fast</div>
                  </div>
                  <div className="bg-[#151519] rounded-lg border border-[#1F1F23] p-4">
                    <div className="text-xs text-[#A0A0A5] mb-1">Headlines Today</div>
                    <div className="text-2xl">2,847</div>
                    <div className="text-xs text-[#A0A0A5]">Parsed & analyzed</div>
                  </div>
                  <div className="bg-[#151519] rounded-lg border border-[#1F1F23] p-4">
                    <div className="text-xs text-[#A0A0A5] mb-1">Trade Signals</div>
                    <div className="text-2xl">142</div>
                    <div className="text-xs text-[#00E0A4]">High confidence</div>
                  </div>
                  <div className="bg-[#151519] rounded-lg border border-[#1F1F23] p-4">
                    <div className="text-xs text-[#A0A0A5] mb-1">Avg Confidence</div>
                    <div className="text-2xl">86%</div>
                    <div className="text-xs text-[#00E0A4]">Strong</div>
                  </div>
                </div>

                <div className="bg-[#151519] rounded-lg border border-[#1F1F23]">
                  <div className="p-4 border-b border-[#1F1F23]">
                    <h3 className="text-sm">News-to-Trade LLM Layer - Real-Time Parsing ({"<"}1s)</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-[#1F1F23]">
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Headline</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">Sentiment</th>
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Symbols</th>
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Signal</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">Confidence</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">Latency (s)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {llmParsing.map((item, idx) => (
                          <tr key={idx} className="border-b border-[#1F1F23] hover:bg-[#0D0D0F] transition-colors">
                            <td className="p-3 text-sm max-w-md">{item.headline}</td>
                            <td className={`p-3 text-sm text-right ${item.sentiment >= 0 ? 'text-[#00E0A4]' : 'text-[#FF5252]'}`}>
                              {item.sentiment >= 0 ? '+' : ''}{item.sentiment.toFixed(2)}
                            </td>
                            <td className="p-3 text-sm text-[#2979FF]">{item.symbols.join(", ")}</td>
                            <td className="p-3">
                              <Badge className={`text-xs ${item.tradeSignal === 'BUY' ? 'bg-[#00E0A4]/20 text-[#00E0A4] border-[#00E0A4]/30' : 'bg-[#FF5252]/20 text-[#FF5252] border-[#FF5252]/30'}`}>
                                {item.tradeSignal}
                              </Badge>
                            </td>
                            <td className="p-3 text-sm text-right">{item.confidence}%</td>
                            <td className="p-3 text-sm text-right text-[#00E0A4]">{item.latency.toFixed(1)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* AI Shock Detector Tab */}
            <TabsContent value="shock" className="mt-0">
              <div className="space-y-4">
                <div className="bg-[#151519] rounded-lg border border-[#1F1F23]">
                  <div className="p-4 border-b border-[#1F1F23] flex items-center justify-between">
                    <h3 className="text-sm">Real-Time AI Shock Detector - Abnormal Correlation Breaks</h3>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#00E0A4] rounded-full animate-pulse" />
                      <span className="text-xs text-[#00E0A5]">Scanning</span>
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-[#1F1F23]">
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Time</th>
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Event</th>
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Severity</th>
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Region</th>
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Action Taken</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">P&L Impact</th>
                        </tr>
                      </thead>
                      <tbody>
                        {shockEvents.map((event, idx) => (
                          <tr key={idx} className="border-b border-[#1F1F23] hover:bg-[#0D0D0F] transition-colors">
                            <td className="p-3 text-sm text-[#A0A0A5]">{event.time}</td>
                            <td className="p-3 text-sm">{event.event}</td>
                            <td className="p-3">
                              <Badge className={`text-xs ${getStatusColor(event.severity)}`}>
                                {event.severity}
                              </Badge>
                            </td>
                            <td className="p-3 text-sm">{event.region}</td>
                            <td className="p-3 text-sm text-[#2979FF]">{event.action}</td>
                            <td className={`p-3 text-sm text-right ${event.pnl.startsWith('+') ? 'text-[#00E0A4]' : event.pnl === '$0' ? 'text-[#A0A0A5]' : 'text-[#FF5252]'}`}>
                              {event.pnl}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Quantum Optimization Tab */}
            <TabsContent value="quantum" className="mt-0">
              <div className="space-y-4">
                <div className="bg-[#151519] rounded-lg border border-[#1F1F23] p-4">
                  <h3 className="text-sm mb-4">Quantum-Inspired Optimization Engine</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-[#A0A0A5]">Algorithm</span>
                        <span className="text-[#2979FF]">{quantumOptimization.algorithm}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-[#A0A0A5]">Problem Type</span>
                        <span>{quantumOptimization.problem}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-[#A0A0A5]">Assets Optimized</span>
                        <span>{quantumOptimization.assets}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-[#A0A0A5]">Constraints</span>
                        <span>{quantumOptimization.constraints}</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-[#A0A0A5]">Classical Time</span>
                        <span className="text-[#FF5252]">{quantumOptimization.classicalTime}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-[#A0A0A5]">Quantum Time</span>
                        <span className="text-[#00E0A4]">{quantumOptimization.quantumTime}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-[#A0A0A5]">Speed-up Factor</span>
                        <span className="text-[#00E0A4]">{quantumOptimization.speedup}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-[#A0A0A5]">Optimal Return/Risk</span>
                        <span>{quantumOptimization.optimalReturn}% / {quantumOptimization.optimalRisk}%</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-[#151519] rounded-lg border border-[#1F1F23] p-4">
                  <h3 className="text-sm mb-4">Benefits vs Classical Optimization</h3>
                  <div className="space-y-2">
                    {[
                      { metric: "Computation Speed", classical: 100, quantum: 490 },
                      { metric: "Solution Quality", classical: 82, quantum: 95 },
                      { metric: "Constraint Handling", classical: 78, quantum: 92 },
                      { metric: "Scalability", classical: 65, quantum: 88 },
                    ].map((item, idx) => (
                      <div key={idx}>
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="text-[#A0A0A5]">{item.metric}</span>
                          <div className="flex items-center gap-4">
                            <span className="text-[#FF5252]">Classical: {item.classical}%</span>
                            <span className="text-[#00E0A4]">Quantum: {item.quantum}%</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <div className="flex-1 bg-[#1F1F23] rounded-full h-2 overflow-hidden">
                            <div className="bg-[#FF5252] h-full rounded-full" style={{ width: `${item.classical}%` }} />
                          </div>
                          <div className="flex-1 bg-[#1F1F23] rounded-full h-2 overflow-hidden">
                            <div className="bg-[#00E0A4] h-full rounded-full" style={{ width: `${item.quantum}%` }} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Order Book Prediction Tab */}
            <TabsContent value="orderbook" className="mt-0">
              <div className="space-y-4">
                <div className="bg-[#151519] rounded-lg border border-[#1F1F23]">
                  <div className="p-4 border-b border-[#1F1F23]">
                    <h3 className="text-sm">Predictive Order Book Simulation - ML-Powered Microstructure</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-[#1F1F23]">
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Symbol</th>
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Horizon</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">Bid Pressure</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">Ask Pressure</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">Predicted Move</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">Confidence %</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orderBookPredictions.map((pred, idx) => (
                          <tr key={idx} className="border-b border-[#1F1F23] hover:bg-[#0D0D0F] transition-colors">
                            <td className="p-3 text-sm text-[#2979FF]">{pred.symbol}</td>
                            <td className="p-3 text-sm text-[#A0A0A5]">{pred.horizon}</td>
                            <td className="p-3 text-sm text-right">{(pred.bidPressure * 100).toFixed(0)}%</td>
                            <td className="p-3 text-sm text-right">{(pred.askPressure * 100).toFixed(0)}%</td>
                            <td className={`p-3 text-sm text-right ${pred.predictedMove.startsWith('+') ? 'text-[#00E0A4]' : 'text-[#FF5252]'}`}>
                              {pred.predictedMove}
                            </td>
                            <td className="p-3 text-sm text-right">{pred.confidence}%</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Alternative Data Tab */}
            <TabsContent value="altdata" className="mt-0">
              <div className="space-y-4">
                <div className="grid grid-cols-4 gap-4">
                  <div className="bg-[#151519] rounded-lg border border-[#1F1F23] p-4">
                    <div className="text-xs text-[#A0A0A5] mb-1">Data Sources</div>
                    <div className="text-2xl">{altDataSources.length}</div>
                    <div className="text-xs text-[#00E0A4]">All active</div>
                  </div>
                  <div className="bg-[#151519] rounded-lg border border-[#1F1F23] p-4">
                    <div className="text-xs text-[#A0A0A5] mb-1">Daily Data Points</div>
                    <div className="text-2xl">21.7M</div>
                    <div className="text-xs text-[#A0A0A5]">Aggregated</div>
                  </div>
                  <div className="bg-[#151519] rounded-lg border border-[#1F1F23] p-4">
                    <div className="text-xs text-[#A0A0A5] mb-1">Signals Generated</div>
                    <div className="text-2xl">{altDataSources.reduce((sum, s) => sum + s.signals, 0)}</div>
                    <div className="text-xs text-[#00E0A4]">Today</div>
                  </div>
                  <div className="bg-[#151519] rounded-lg border border-[#1F1F23] p-4">
                    <div className="text-xs text-[#A0A0A5] mb-1">Coverage</div>
                    <div className="text-2xl">Global</div>
                    <div className="text-xs text-[#A0A0A5]">Multi-region</div>
                  </div>
                </div>

                <div className="bg-[#151519] rounded-lg border border-[#1F1F23]">
                  <div className="p-4 border-b border-[#1F1F23]">
                    <h3 className="text-sm">Alternative Data Arbitrage - Multi-Source Intelligence</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-[#1F1F23]">
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Data Source</th>
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Provider</th>
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Coverage</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">Data Points/Day</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">Signals Today</th>
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {altDataSources.map((source, idx) => (
                          <tr key={idx} className="border-b border-[#1F1F23] hover:bg-[#0D0D0F] transition-colors">
                            <td className="p-3 text-sm">{source.source}</td>
                            <td className="p-3 text-sm text-[#A0A0A5]">{source.provider}</td>
                            <td className="p-3 text-sm">{source.coverage}</td>
                            <td className="p-3 text-sm text-right">{source.dataPoints}</td>
                            <td className="p-3 text-sm text-right">{source.signals}</td>
                            <td className="p-3">
                              <Badge className={`text-xs ${getStatusColor(source.status)}`}>
                                {source.status}
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

            {/* Macro Regime Tab */}
            <TabsContent value="macro" className="mt-0">
              <div className="space-y-4">
                <div className="bg-[#151519] rounded-lg border border-[#1F1F23]">
                  <div className="p-4 border-b border-[#1F1F23]">
                    <h3 className="text-sm">Regional Macro Regime Switcher - AI-Detected Shifts</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-[#1F1F23]">
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Region</th>
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Current Regime</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">Confidence %</th>
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Previous Regime</th>
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Changed</th>
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Recommended Strategy</th>
                        </tr>
                      </thead>
                      <tbody>
                        {macroRegimes.map((regime, idx) => (
                          <tr key={idx} className="border-b border-[#1F1F23] hover:bg-[#0D0D0F] transition-colors">
                            <td className="p-3">
                              <Badge className="bg-[#2979FF]/20 text-[#2979FF] border-[#2979FF]/30 text-xs">
                                {regime.region}
                              </Badge>
                            </td>
                            <td className="p-3 text-sm">{regime.currentRegime}</td>
                            <td className="p-3 text-sm text-right text-[#00E0A4]">{regime.confidence}%</td>
                            <td className="p-3 text-sm text-[#A0A0A5]">{regime.previousRegime}</td>
                            <td className="p-3 text-sm text-[#A0A0A5]">{regime.changeTime}</td>
                            <td className="p-3 text-sm text-[#2979FF]">{regime.strategy}</td>
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
