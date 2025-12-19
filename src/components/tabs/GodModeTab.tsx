import { useState } from "react";
import { ScrollArea } from "../ui/scroll-area";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { Brain, Skull, Globe2, MessageSquare, GitBranch, Dna } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export function WizardModeTab() {
  const [activeSubTab, setActiveSubTab] = useState("macro");

  // Wizard-Mode Macro Brain - AI Central Bank Predictions
  const centralBankPredictions = [
    { bank: "Federal Reserve (Fed)", nextDecision: "HOLD", probability: 78, ratePrediction: "5.25-5.50%", timing: "Mar 2025", rationale: "Inflation cooling but labor strong" },
    { bank: "European Central Bank (ECB)", nextDecision: "CUT -25bps", probability: 65, ratePrediction: "3.75%", timing: "Mar 2025", rationale: "Eurozone recession risk" },
    { bank: "Bank of Japan (BoJ)", nextDecision: "HIKE +10bps", probability: 82, ratePrediction: "0.10%", timing: "Apr 2025", rationale: "Sustained inflation target" },
    { bank: "Bank of England (BoE)", nextDecision: "HOLD", probability: 71, ratePrediction: "5.25%", timing: "Mar 2025", rationale: "Sticky core inflation" },
    { bank: "People's Bank of China (PBOC)", nextDecision: "CUT -15bps", probability: 88, ratePrediction: "3.30%", timing: "Feb 2025", rationale: "Stimulus for growth" },
  ];

  // Adaptive Civilization Hedge Fund
  const civilizationTrends = [
    { trend: "AI Revolution", exposure: 28, confidence: 94, impact: "Massive tech disruption", allocation: "$2.8B", sectors: ["Tech", "Semiconductors", "Cloud"] },
    { trend: "Climate Transition", exposure: 22, confidence: 87, impact: "Energy infrastructure shift", allocation: "$2.2B", sectors: ["Renewables", "EV", "Carbon Credits"] },
    { trend: "Aging Demographics", exposure: 18, confidence: 91, impact: "Healthcare & automation", allocation: "$1.8B", sectors: ["Healthcare", "Robotics", "Insurance"] },
    { trend: "De-Globalization", exposure: 15, confidence: 79, impact: "Supply chain reshoring", allocation: "$1.5B", sectors: ["Manufacturing", "Defense", "Logistics"] },
    { trend: "Digital Currency", exposure: 12, confidence: 72, impact: "Financial system overhaul", allocation: "$1.2B", sectors: ["FinTech", "Crypto", "Payments"] },
    { trend: "Space Economy", exposure: 5, confidence: 68, impact: "New frontier markets", allocation: "$500M", sectors: ["Aerospace", "Satellites", "Mining"] },
  ];

  // AI Negotiation Parliament - 3000 Strategies Compete
  const parliamentSessions = [
    { session: "Morning Allocation", timestamp: "09:30", participants: 847, consensus: "Risk-On", outcome: "Equity strategies +15%, Bond -8%", votes: "512-335" },
    { session: "Mid-Day Rebalance", timestamp: "12:00", participants: 623, consensus: "Neutral", outcome: "No major changes", votes: "342-281" },
    { session: "Afternoon Review", timestamp: "15:00", participants: 891, consensus: "Risk-Off", outcome: "Vol strategies +22%, Growth -12%", votes: "589-302" },
  ];

  const topNegotiators = [
    { strategy: "Momentum King", winRate: 78.4, capitalWon: "$145M", votingPower: 2.8, status: "Alpha" },
    { strategy: "Vol Wizard", winRate: 71.2, capitalWon: "$98M", votingPower: 2.1, status: "Alpha" },
    { strategy: "Carry Master", winRate: 68.9, capitalWon: "$87M", votingPower: 1.9, status: "Beta" },
    { strategy: "Arb Hunter", winRate: 64.5, capitalWon: "$72M", votingPower: 1.6, status: "Beta" },
  ];

  // Self-Destructing Alpha
  const selfDestructStrategies = [
    { 
      name: "HFT Latency Arb #42", 
      alphaDecay: 92, 
      timeLeft: "3 days", 
      status: "CRITICAL", 
      reason: "Competition detected", 
      action: "Auto-shutdown scheduled",
      pnlExtracted: "$12.4M"
    },
    { 
      name: "Crypto Spread #127", 
      alphaDecay: 67, 
      timeLeft: "2 weeks", 
      status: "WARNING", 
      reason: "Shrinking edge", 
      action: "Reducing allocation",
      pnlExtracted: "$8.9M"
    },
    { 
      name: "Merger Arb #89", 
      alphaDecay: 45, 
      timeLeft: "6 weeks", 
      status: "MONITORING", 
      reason: "Market efficiency increasing", 
      action: "Watchlist",
      pnlExtracted: "$15.2M"
    },
    { 
      name: "Vol Surface #203", 
      alphaDecay: 23, 
      timeLeft: "4 months", 
      status: "HEALTHY", 
      reason: "Strong edge maintained", 
      action: "None",
      pnlExtracted: "$22.1M"
    },
  ];

  // Financial Multiverse Backtester - Parallel Timelines
  const multiverseScenarios = [
    { 
      universe: "Universe Alpha", 
      scenario: "COVID Never Happened", 
      spyReturn: 145.2, 
      portfolioReturn: 218.4,
      sharpe: 2.8,
      probability: 0.15,
      divergencePoint: "Jan 2020"
    },
    { 
      universe: "Universe Beta", 
      scenario: "Fed Hawkish 2021", 
      spyReturn: -12.3, 
      portfolioReturn: 34.2,
      sharpe: 1.9,
      probability: 0.28,
      divergencePoint: "Mar 2021"
    },
    { 
      universe: "Universe Gamma", 
      scenario: "China Taiwan 2023", 
      spyReturn: -45.8, 
      portfolioReturn: -18.5,
      sharpe: 0.8,
      probability: 0.05,
      divergencePoint: "Aug 2023"
    },
    { 
      universe: "Universe Delta", 
      scenario: "AI Boom Accelerated", 
      spyReturn: 198.7, 
      portfolioReturn: 342.1,
      sharpe: 3.4,
      probability: 0.22,
      divergencePoint: "Nov 2022"
    },
    { 
      universe: "Universe Epsilon", 
      scenario: "Crypto Mass Adoption", 
      spyReturn: 67.4, 
      portfolioReturn: 456.8,
      sharpe: 2.2,
      probability: 0.12,
      divergencePoint: "Jun 2024"
    },
    { 
      universe: "Universe Zeta", 
      scenario: "Actual Reality (Baseline)", 
      spyReturn: 52.3, 
      portfolioReturn: 87.6,
      sharpe: 1.7,
      probability: 1.00,
      divergencePoint: "N/A"
    },
  ];

  const parallelTimelineData = [
    { month: "Jan 20", alpha: 100, beta: 100, gamma: 100, delta: 100, epsilon: 100, reality: 100 },
    { month: "Jul 20", alpha: 125, beta: 95, gamma: 92, delta: 110, epsilon: 105, reality: 98 },
    { month: "Jan 21", alpha: 148, beta: 88, gamma: 85, delta: 135, epsilon: 118, reality: 112 },
    { month: "Jul 21", alpha: 172, beta: 82, gamma: 78, delta: 168, epsilon: 145, reality: 128 },
    { month: "Jan 22", alpha: 195, beta: 75, gamma: 68, delta: 198, epsilon: 178, reality: 135 },
    { month: "Jul 22", alpha: 218, beta: 72, gamma: 62, delta: 245, epsilon: 224, reality: 142 },
    { month: "Jan 23", alpha: 238, beta: 68, gamma: 52, delta: 288, epsilon: 287, reality: 156 },
    { month: "Jul 23", alpha: 245, beta: 65, gamma: 48, delta: 324, epsilon: 345, reality: 168 },
    { month: "Jan 24", alpha: 252, beta: 62, gamma: 45, delta: 365, epsilon: 412, reality: 175 },
    { month: "Oct 24", alpha: 245, beta: 58, gamma: 42, delta: 398, epsilon: 457, reality: 188 },
  ];

  // Market Evolution Genome Project
  const genomeGenerations = [
    { generation: "Gen 1", strategies: 500, avgFitness: 1.2, bestSharpe: 2.1, mutations: 0, survivors: 250 },
    { generation: "Gen 5", strategies: 500, avgFitness: 1.8, bestSharpe: 2.8, mutations: 1240, survivors: 250 },
    { generation: "Gen 10", strategies: 500, avgFitness: 2.4, bestSharpe: 3.4, mutations: 2480, survivors: 250 },
    { generation: "Gen 25", strategies: 500, avgFitness: 3.1, bestSharpe: 4.2, mutations: 6200, survivors: 250 },
    { generation: "Gen 50", strategies: 500, avgFitness: 3.8, bestSharpe: 5.1, mutations: 12400, survivors: 250 },
    { generation: "Gen 100", strategies: 500, avgFitness: 4.5, bestSharpe: 6.3, mutations: 24800, survivors: 250 },
  ];

  const eliteStrategies = [
    { 
      name: "Evolved Alpha #1247", 
      generation: 100, 
      parentage: "Momentum × Vol Arb", 
      sharpe: 6.3, 
      genes: ["Fast-Adapt", "Risk-Aware", "Mean-Revert", "Trend-Follow"],
      fitness: 98.4
    },
    { 
      name: "Evolved Beta #892", 
      generation: 94, 
      parentage: "Pairs × ML Signal", 
      sharpe: 5.8, 
      genes: ["Correlation-Seek", "Regime-Detect", "Auto-Hedge"],
      fitness: 96.2
    },
    { 
      name: "Evolved Gamma #1563", 
      generation: 87, 
      parentage: "Carry × Momentum", 
      sharpe: 5.4, 
      genes: ["Interest-Sense", "Currency-Flow", "Macro-Filter"],
      fitness: 94.7
    },
    { 
      name: "Evolved Delta #2104", 
      generation: 78, 
      parentage: "Arb × Options", 
      sharpe: 5.1, 
      genes: ["Vol-Surface", "Greeks-Optimize", "Skew-Exploit"],
      fitness: 93.1
    },
  ];

  const mutationLog = [
    { timestamp: "14:32:18", mutation: "Risk-Tolerance Gene +0.15", strategy: "Evolved #2456", outcome: "Improved +2.3% fitness" },
    { timestamp: "14:31:45", mutation: "Exit-Speed Gene ×1.5", strategy: "Evolved #2455", outcome: "Failed -5.1% fitness" },
    { timestamp: "14:30:12", mutation: "Correlation-Threshold -0.08", strategy: "Evolved #2454", outcome: "Improved +1.8% fitness" },
    { timestamp: "14:28:39", mutation: "Position-Size Gene ×0.8", strategy: "Evolved #2453", outcome: "Neutral 0.0% fitness" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "CRITICAL": return "bg-[#FF5252]/20 text-[#FF5252] border-[#FF5252]/30";
      case "WARNING": return "bg-[#FF9800]/20 text-[#FF9800] border-[#FF9800]/30";
      case "MONITORING": return "bg-[#2979FF]/20 text-[#2979FF] border-[#2979FF]/30";
      case "HEALTHY": return "bg-[#00E0A4]/20 text-[#00E0A4] border-[#00E0A4]/30";
      default: return "bg-[#A0A0A5]/20 text-[#A0A0A5] border-[#A0A0A5]/30";
    }
  };

  return (
    <div className="h-[calc(100vh-120px)]">
      <Tabs value={activeSubTab} onValueChange={setActiveSubTab} className="h-full flex flex-col">
        <TabsList className="bg-[#1F1F23] border-b-2 border-[#2979FF]/20 rounded-none w-full justify-start p-0 h-12">
          <TabsTrigger value="macro" className="data-[state=active]:bg-[#151519] data-[state=active]:text-[#00E0A4] data-[state=active]:border-[#00E0A4] bg-transparent text-[#A0A0A5] hover:text-[#E8E8E8] hover:bg-[#151519]/50 rounded-none border-b-2 border-transparent px-3 whitespace-nowrap transition-all text-xs">
            Macro Brain
          </TabsTrigger>
          <TabsTrigger value="civilization" className="data-[state=active]:bg-[#151519] data-[state=active]:text-[#00E0A4] data-[state=active]:border-[#00E0A4] bg-transparent text-[#A0A0A5] hover:text-[#E8E8E8] hover:bg-[#151519]/50 rounded-none border-b-2 border-transparent px-3 whitespace-nowrap transition-all text-xs">
            Civilization
          </TabsTrigger>
          <TabsTrigger value="parliament" className="data-[state=active]:bg-[#151519] data-[state=active]:text-[#00E0A4] data-[state=active]:border-[#00E0A4] bg-transparent text-[#A0A0A5] hover:text-[#E8E8E8] hover:bg-[#151519]/50 rounded-none border-b-2 border-transparent px-3 whitespace-nowrap transition-all text-xs">
            Parliament
          </TabsTrigger>
          <TabsTrigger value="selfdestruct" className="data-[state=active]:bg-[#151519] data-[state=active]:text-[#00E0A4] data-[state=active]:border-[#00E0A4] bg-transparent text-[#A0A0A5] hover:text-[#E8E8E8] hover:bg-[#151519]/50 rounded-none border-b-2 border-transparent px-3 whitespace-nowrap transition-all text-xs">
            Self-Destruct
          </TabsTrigger>
          <TabsTrigger value="multiverse" className="data-[state=active]:bg-[#151519] data-[state=active]:text-[#00E0A4] data-[state=active]:border-[#00E0A4] bg-transparent text-[#A0A0A5] hover:text-[#E8E8E8] hover:bg-[#151519]/50 rounded-none border-b-2 border-transparent px-3 whitespace-nowrap transition-all text-xs">
            Multiverse
          </TabsTrigger>
          <TabsTrigger value="genome" className="data-[state=active]:bg-[#151519] data-[state=active]:text-[#00E0A4] data-[state=active]:border-[#00E0A4] bg-transparent text-[#A0A0A5] hover:text-[#E8E8E8] hover:bg-[#151519]/50 rounded-none border-b-2 border-transparent px-3 whitespace-nowrap transition-all text-xs">
            Genome
          </TabsTrigger>
        </TabsList>

        <ScrollArea className="flex-1">
          <div className="p-4">
            {/* Wizard-Mode Macro Brain */}
            <TabsContent value="macro" className="mt-0">
              <div className="space-y-4">
                <div className="bg-[#151519] rounded-lg border border-[#1F1F23] p-4">
                  <div className="flex items-center gap-2 mb-4">
                    <Brain className="w-6 h-6 text-[#2979FF]" />
                    <div>
                      <h3 className="text-sm">AI Central Bank Prediction Engine</h3>
                      <p className="text-xs text-[#A0A0A5]">Neural network trained on 50+ years of monetary policy decisions</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-4">
                    <div className="bg-[#0D0D0F] rounded-lg border border-[#1F1F23] p-3">
                      <div className="text-xs text-[#A0A0A5] mb-1">Prediction Accuracy</div>
                      <div className="text-xl text-[#00E0A4]">87.3%</div>
                    </div>
                    <div className="bg-[#0D0D0F] rounded-lg border border-[#1F1F23] p-3">
                      <div className="text-xs text-[#A0A0A5] mb-1">Decisions Analyzed</div>
                      <div className="text-xl">2,847</div>
                    </div>
                    <div className="bg-[#0D0D0F] rounded-lg border border-[#1F1F23] p-3">
                      <div className="text-xs text-[#A0A0A5] mb-1">Models Running</div>
                      <div className="text-xl text-[#2979FF]">42</div>
                    </div>
                    <div className="bg-[#0D0D0F] rounded-lg border border-[#1F1F23] p-3">
                      <div className="text-xs text-[#A0A0A5] mb-1">Next Update</div>
                      <div className="text-xl">4h 23m</div>
                    </div>
                  </div>
                </div>

                <div className="bg-[#151519] rounded-lg border border-[#1F1F23]">
                  <div className="p-4 border-b border-[#1F1F23]">
                    <h3 className="text-sm">Central Bank Decision Forecasts</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-[#1F1F23]">
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Central Bank</th>
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Next Decision</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">Probability</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">Rate Forecast</th>
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Timing</th>
                          <th className="text-left text-xs text-[#A0A0A5] p-3">AI Rationale</th>
                        </tr>
                      </thead>
                      <tbody>
                        {centralBankPredictions.map((pred, idx) => (
                          <tr key={idx} className="border-b border-[#1F1F23] hover:bg-[#0D0D0F] transition-colors">
                            <td className="p-3 text-sm">{pred.bank}</td>
                            <td className="p-3">
                              <Badge className={`text-xs ${
                                pred.nextDecision.includes('HIKE') ? 'bg-[#FF5252]/20 text-[#FF5252] border-[#FF5252]/30' :
                                pred.nextDecision.includes('CUT') ? 'bg-[#00E0A4]/20 text-[#00E0A4] border-[#00E0A4]/30' :
                                'bg-[#2979FF]/20 text-[#2979FF] border-[#2979FF]/30'
                              }`}>
                                {pred.nextDecision}
                              </Badge>
                            </td>
                            <td className="p-3 text-sm text-right">
                              <div className="flex items-center gap-2 justify-end">
                                <span className="text-[#00E0A4]">{pred.probability}%</span>
                                <Progress value={pred.probability} className="w-16 h-2" />
                              </div>
                            </td>
                            <td className="p-3 text-sm text-right text-[#2979FF]">{pred.ratePrediction}</td>
                            <td className="p-3 text-sm text-[#A0A0A5]">{pred.timing}</td>
                            <td className="p-3 text-xs text-[#A0A0A5]">{pred.rationale}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Civilization Hedge Fund */}
            <TabsContent value="civilization" className="mt-0">
              <div className="space-y-4">
                <div className="bg-[#151519] rounded-lg border border-[#1F1F23] p-4">
                  <div className="flex items-center gap-2 mb-4">
                    <Globe2 className="w-6 h-6 text-[#00E0A4]" />
                    <div>
                      <h3 className="text-sm">Adaptive Civilization Hedge Fund</h3>
                      <p className="text-xs text-[#A0A0A5]">Long-term macro trends reshaping human civilization</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-4">
                    <div className="bg-[#0D0D0F] rounded-lg border border-[#1F1F23] p-3">
                      <div className="text-xs text-[#A0A0A5] mb-1">Total AUM</div>
                      <div className="text-xl">$10.0B</div>
                    </div>
                    <div className="bg-[#0D0D0F] rounded-lg border border-[#1F1F23] p-3">
                      <div className="text-xs text-[#A0A0A5] mb-1">Trend Categories</div>
                      <div className="text-xl text-[#2979FF]">6</div>
                    </div>
                    <div className="bg-[#0D0D0F] rounded-lg border border-[#1F1F23] p-3">
                      <div className="text-xs text-[#A0A0A5] mb-1">Horizon</div>
                      <div className="text-xl">10-30 Years</div>
                    </div>
                    <div className="bg-[#0D0D0F] rounded-lg border border-[#1F1F23] p-3">
                      <div className="text-xs text-[#A0A0A5] mb-1">Annual Return</div>
                      <div className="text-xl text-[#00E0A4]">+18.7%</div>
                    </div>
                  </div>
                </div>

                <div className="bg-[#151519] rounded-lg border border-[#1F1F23]">
                  <div className="p-4 border-b border-[#1F1F23]">
                    <h3 className="text-sm">Civilization Trend Allocations</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-[#1F1F23]">
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Trend</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">Exposure %</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">Confidence</th>
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Impact Assessment</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">Capital Allocated</th>
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Key Sectors</th>
                        </tr>
                      </thead>
                      <tbody>
                        {civilizationTrends.map((trend, idx) => (
                          <tr key={idx} className="border-b border-[#1F1F23] hover:bg-[#0D0D0F] transition-colors">
                            <td className="p-3 text-sm">{trend.trend}</td>
                            <td className="p-3 text-sm text-right">
                              <div className="flex items-center gap-2 justify-end">
                                <span>{trend.exposure}%</span>
                                <div className="w-16 bg-[#1F1F23] rounded-full h-2 overflow-hidden">
                                  <div className="bg-[#00E0A4] h-full rounded-full" style={{ width: `${trend.exposure * 3.33}%` }} />
                                </div>
                              </div>
                            </td>
                            <td className="p-3 text-sm text-right text-[#00E0A4]">{trend.confidence}%</td>
                            <td className="p-3 text-xs text-[#A0A0A5]">{trend.impact}</td>
                            <td className="p-3 text-sm text-right text-[#2979FF]">{trend.allocation}</td>
                            <td className="p-3 text-xs text-[#A0A0A5]">{trend.sectors.join(", ")}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Strategy Parliament */}
            <TabsContent value="parliament" className="mt-0">
              <div className="space-y-4">
                <div className="bg-[#151519] rounded-lg border border-[#1F1F23] p-4">
                  <div className="flex items-center gap-2 mb-4">
                    <MessageSquare className="w-6 h-6 text-[#2979FF]" />
                    <div>
                      <h3 className="text-sm">AI Negotiation Parliament - 3000 Strategies Compete</h3>
                      <p className="text-xs text-[#A0A0A5]">Strategies negotiate for capital allocation via voting and performance-based consensus</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-4">
                    <div className="bg-[#0D0D0F] rounded-lg border border-[#1F1F23] p-3">
                      <div className="text-xs text-[#A0A0A5] mb-1">Active Participants</div>
                      <div className="text-xl">3,055</div>
                    </div>
                    <div className="bg-[#0D0D0F] rounded-lg border border-[#1F1F23] p-3">
                      <div className="text-xs text-[#A0A0A5] mb-1">Sessions Today</div>
                      <div className="text-xl text-[#2979FF]">3</div>
                    </div>
                    <div className="bg-[#0D0D0F] rounded-lg border border-[#1F1F23] p-3">
                      <div className="text-xs text-[#A0A0A5] mb-1">Capital Contested</div>
                      <div className="text-xl">$4.2B</div>
                    </div>
                    <div className="bg-[#0D0D0F] rounded-lg border border-[#1F1F23] p-3">
                      <div className="text-xs text-[#A0A0A5] mb-1">Consensus Rate</div>
                      <div className="text-xl text-[#00E0A4]">73%</div>
                    </div>
                  </div>
                </div>

                <div className="bg-[#151519] rounded-lg border border-[#1F1F23]">
                  <div className="p-4 border-b border-[#1F1F23]">
                    <h3 className="text-sm">Today's Parliament Sessions</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-[#1F1F23]">
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Session</th>
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Time</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">Participants</th>
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Consensus</th>
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Outcome</th>
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Vote Split</th>
                        </tr>
                      </thead>
                      <tbody>
                        {parliamentSessions.map((session, idx) => (
                          <tr key={idx} className="border-b border-[#1F1F23] hover:bg-[#0D0D0F] transition-colors">
                            <td className="p-3 text-sm">{session.session}</td>
                            <td className="p-3 text-sm text-[#A0A0A5]">{session.timestamp}</td>
                            <td className="p-3 text-sm text-right">{session.participants}</td>
                            <td className="p-3">
                              <Badge className={`text-xs ${
                                session.consensus === "Risk-On" ? 'bg-[#00E0A4]/20 text-[#00E0A4] border-[#00E0A4]/30' :
                                session.consensus === "Risk-Off" ? 'bg-[#FF5252]/20 text-[#FF5252] border-[#FF5252]/30' :
                                'bg-[#2979FF]/20 text-[#2979FF] border-[#2979FF]/30'
                              }`}>
                                {session.consensus}
                              </Badge>
                            </td>
                            <td className="p-3 text-sm">{session.outcome}</td>
                            <td className="p-3 text-sm text-[#A0A0A5]">{session.votes}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="bg-[#151519] rounded-lg border border-[#1F1F23]">
                  <div className="p-4 border-b border-[#1F1F23]">
                    <h3 className="text-sm">Top Negotiators - Highest Voting Power</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-[#1F1F23]">
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Strategy Name</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">Win Rate %</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">Capital Won</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">Voting Power</th>
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {topNegotiators.map((strat, idx) => (
                          <tr key={idx} className="border-b border-[#1F1F23] hover:bg-[#0D0D0F] transition-colors">
                            <td className="p-3 text-sm text-[#2979FF]">{strat.strategy}</td>
                            <td className="p-3 text-sm text-right text-[#00E0A4]">{strat.winRate.toFixed(1)}%</td>
                            <td className="p-3 text-sm text-right">{strat.capitalWon}</td>
                            <td className="p-3 text-sm text-right">{strat.votingPower.toFixed(1)}x</td>
                            <td className="p-3">
                              <Badge className={`text-xs ${
                                strat.status === "Alpha" ? 'bg-[#00E0A4]/20 text-[#00E0A4] border-[#00E0A4]/30' :
                                'bg-[#2979FF]/20 text-[#2979FF] border-[#2979FF]/30'
                              }`}>
                                {strat.status}
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

            {/* Self-Destructing Alpha */}
            <TabsContent value="selfdestruct" className="mt-0">
              <div className="space-y-4">
                <div className="bg-[#151519] rounded-lg border border-[#1F1F23] p-4">
                  <div className="flex items-center gap-2 mb-4">
                    <Skull className="w-6 h-6 text-[#FF5252]" />
                    <div>
                      <h3 className="text-sm">Self-Destructing Alpha Detection</h3>
                      <p className="text-xs text-[#A0A0A5]">AI monitors strategy edge decay and auto-shutdowns before losses</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-4">
                    <div className="bg-[#0D0D0F] rounded-lg border border-[#1F1F23] p-3">
                      <div className="text-xs text-[#A0A0A5] mb-1">Strategies Monitored</div>
                      <div className="text-xl">3,055</div>
                    </div>
                    <div className="bg-[#0D0D0F] rounded-lg border border-[#1F1F23] p-3">
                      <div className="text-xs text-[#A0A0A5] mb-1">Auto-Terminated</div>
                      <div className="text-xl text-[#FF5252]">127</div>
                    </div>
                    <div className="bg-[#0D0D0F] rounded-lg border border-[#1F1F23] p-3">
                      <div className="text-xs text-[#A0A0A5] mb-1">Losses Prevented</div>
                      <div className="text-xl text-[#00E0A4]">$48.2M</div>
                    </div>
                    <div className="bg-[#0D0D0F] rounded-lg border border-[#1F1F23] p-3">
                      <div className="text-xs text-[#A0A0A5] mb-1">Detection Accuracy</div>
                      <div className="text-xl">94.3%</div>
                    </div>
                  </div>
                </div>

                <div className="bg-[#151519] rounded-lg border border-[#1F1F23]">
                  <div className="p-4 border-b border-[#1F1F23]">
                    <h3 className="text-sm">Alpha Decay Monitor - Critical Strategies</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-[#1F1F23]">
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Strategy Name</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">Alpha Decay %</th>
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Time Left</th>
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Status</th>
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Reason</th>
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Action</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">P&L Extracted</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selfDestructStrategies.map((strat, idx) => (
                          <tr key={idx} className="border-b border-[#1F1F23] hover:bg-[#0D0D0F] transition-colors">
                            <td className="p-3 text-sm">{strat.name}</td>
                            <td className="p-3 text-sm text-right">
                              <div className="flex items-center gap-2 justify-end">
                                <span className={strat.alphaDecay >= 70 ? 'text-[#FF5252]' : strat.alphaDecay >= 50 ? 'text-[#FF9800]' : 'text-[#00E0A4]'}>
                                  {strat.alphaDecay}%
                                </span>
                                <Progress value={strat.alphaDecay} className="w-16 h-2" />
                              </div>
                            </td>
                            <td className="p-3 text-sm text-[#A0A0A5]">{strat.timeLeft}</td>
                            <td className="p-3">
                              <Badge className={`text-xs ${getStatusColor(strat.status)}`}>
                                {strat.status}
                              </Badge>
                            </td>
                            <td className="p-3 text-xs text-[#A0A0A5]">{strat.reason}</td>
                            <td className="p-3 text-sm">{strat.action}</td>
                            <td className="p-3 text-sm text-right text-[#00E0A4]">{strat.pnlExtracted}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Financial Multiverse */}
            <TabsContent value="multiverse" className="mt-0">
              <div className="space-y-4">
                <div className="bg-[#151519] rounded-lg border border-[#1F1F23] p-4">
                  <div className="flex items-center gap-2 mb-4">
                    <GitBranch className="w-6 h-6 text-[#2979FF]" />
                    <div>
                      <h3 className="text-sm">Financial Multiverse Backtester</h3>
                      <p className="text-xs text-[#A0A0A5]">Test strategies across parallel timeline scenarios with alternate histories</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-4">
                    <div className="bg-[#0D0D0F] rounded-lg border border-[#1F1F23] p-3">
                      <div className="text-xs text-[#A0A0A5] mb-1">Parallel Universes</div>
                      <div className="text-xl">6</div>
                    </div>
                    <div className="bg-[#0D0D0F] rounded-lg border border-[#1F1F23] p-3">
                      <div className="text-xs text-[#A0A0A5] mb-1">Scenarios Tested</div>
                      <div className="text-xl text-[#2979FF]">847</div>
                    </div>
                    <div className="bg-[#0D0D0F] rounded-lg border border-[#1F1F23] p-3">
                      <div className="text-xs text-[#A0A0A5] mb-1">Best Universe</div>
                      <div className="text-xl text-[#00E0A4]">Delta</div>
                    </div>
                    <div className="bg-[#0D0D0F] rounded-lg border border-[#1F1F23] p-3">
                      <div className="text-xs text-[#A0A0A5] mb-1">Worst Universe</div>
                      <div className="text-xl text-[#FF5252]">Gamma</div>
                    </div>
                  </div>
                </div>

                <div className="bg-[#151519] rounded-lg border border-[#1F1F23]">
                  <div className="p-4 border-b border-[#1F1F23]">
                    <h3 className="text-sm">Parallel Timeline Comparison</h3>
                  </div>
                  <div className="p-4">
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={parallelTimelineData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1F1F23" />
                        <XAxis dataKey="month" stroke="#A0A0A5" style={{ fontSize: '12px' }} />
                        <YAxis stroke="#A0A0A5" style={{ fontSize: '12px' }} />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#151519', border: '1px solid #1F1F23', borderRadius: '8px' }}
                          labelStyle={{ color: '#E8E8E8' }}
                        />
                        <Line type="monotone" dataKey="alpha" stroke="#FF6B9D" strokeWidth={2} dot={false} />
                        <Line type="monotone" dataKey="beta" stroke="#FF5252" strokeWidth={2} dot={false} />
                        <Line type="monotone" dataKey="gamma" stroke="#FF9800" strokeWidth={2} dot={false} />
                        <Line type="monotone" dataKey="delta" stroke="#00E0A4" strokeWidth={2} dot={false} />
                        <Line type="monotone" dataKey="epsilon" stroke="#2979FF" strokeWidth={2} dot={false} />
                        <Line type="monotone" dataKey="reality" stroke="#FFFFFF" strokeWidth={3} dot={false} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="bg-[#151519] rounded-lg border border-[#1F1F23]">
                  <div className="p-4 border-b border-[#1F1F23]">
                    <h3 className="text-sm">Alternate Universe Performance</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-[#1F1F23]">
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Universe</th>
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Scenario</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">SPY Return %</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">Portfolio Return %</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">Sharpe Ratio</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">Probability</th>
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Divergence Point</th>
                        </tr>
                      </thead>
                      <tbody>
                        {multiverseScenarios.map((scenario, idx) => (
                          <tr key={idx} className="border-b border-[#1F1F23] hover:bg-[#0D0D0F] transition-colors">
                            <td className="p-3 text-sm text-[#2979FF]">{scenario.universe}</td>
                            <td className="p-3 text-sm">{scenario.scenario}</td>
                            <td className={`p-3 text-sm text-right ${scenario.spyReturn >= 0 ? 'text-[#00E0A4]' : 'text-[#FF5252]'}`}>
                              {scenario.spyReturn >= 0 ? '+' : ''}{scenario.spyReturn.toFixed(1)}%
                            </td>
                            <td className={`p-3 text-sm text-right ${scenario.portfolioReturn >= 0 ? 'text-[#00E0A4]' : 'text-[#FF5252]'}`}>
                              {scenario.portfolioReturn >= 0 ? '+' : ''}{scenario.portfolioReturn.toFixed(1)}%
                            </td>
                            <td className="p-3 text-sm text-right">{scenario.sharpe.toFixed(1)}</td>
                            <td className="p-3 text-sm text-right text-[#A0A0A5]">{(scenario.probability * 100).toFixed(0)}%</td>
                            <td className="p-3 text-sm text-[#A0A0A5]">{scenario.divergencePoint}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Genome Project */}
            <TabsContent value="genome" className="mt-0">
              <div className="space-y-4">
                <div className="bg-[#151519] rounded-lg border border-[#1F1F23] p-4">
                  <div className="flex items-center gap-2 mb-4">
                    <Dna className="w-6 h-6 text-[#00E0A4]" />
                    <div>
                      <h3 className="text-sm">Market Evolution Genome Project</h3>
                      <p className="text-xs text-[#A0A0A5]">Genetic algorithms breed superior trading strategies through natural selection</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-4">
                    <div className="bg-[#0D0D0F] rounded-lg border border-[#1F1F23] p-3">
                      <div className="text-xs text-[#A0A0A5] mb-1">Current Generation</div>
                      <div className="text-xl">100</div>
                    </div>
                    <div className="bg-[#0D0D0F] rounded-lg border border-[#1F1F23] p-3">
                      <div className="text-xs text-[#A0A0A5] mb-1">Population Size</div>
                      <div className="text-xl text-[#2979FF]">500</div>
                    </div>
                    <div className="bg-[#0D0D0F] rounded-lg border border-[#1F1F23] p-3">
                      <div className="text-xs text-[#A0A0A5] mb-1">Best Fitness</div>
                      <div className="text-xl text-[#00E0A4]">98.4</div>
                    </div>
                    <div className="bg-[#0D0D0F] rounded-lg border border-[#1F1F23] p-3">
                      <div className="text-xs text-[#A0A0A5] mb-1">Total Mutations</div>
                      <div className="text-xl">24,800</div>
                    </div>
                  </div>
                </div>

                <div className="bg-[#151519] rounded-lg border border-[#1F1F23]">
                  <div className="p-4 border-b border-[#1F1F23]">
                    <h3 className="text-sm">Evolution Progress by Generation</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-[#1F1F23]">
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Generation</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">Population</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">Avg Fitness</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">Best Sharpe</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">Total Mutations</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">Survivors</th>
                        </tr>
                      </thead>
                      <tbody>
                        {genomeGenerations.map((gen, idx) => (
                          <tr key={idx} className="border-b border-[#1F1F23] hover:bg-[#0D0D0F] transition-colors">
                            <td className="p-3 text-sm text-[#2979FF]">{gen.generation}</td>
                            <td className="p-3 text-sm text-right">{gen.strategies}</td>
                            <td className="p-3 text-sm text-right text-[#00E0A4]">{gen.avgFitness.toFixed(1)}</td>
                            <td className="p-3 text-sm text-right">{gen.bestSharpe.toFixed(1)}</td>
                            <td className="p-3 text-sm text-right">{gen.mutations.toLocaleString()}</td>
                            <td className="p-3 text-sm text-right text-[#A0A0A5]">{gen.survivors}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="bg-[#151519] rounded-lg border border-[#1F1F23]">
                  <div className="p-4 border-b border-[#1F1F23]">
                    <h3 className="text-sm">Elite Evolved Strategies</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-[#1F1F23]">
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Strategy Name</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">Generation</th>
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Parentage</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">Sharpe Ratio</th>
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Genetic Traits</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">Fitness Score</th>
                        </tr>
                      </thead>
                      <tbody>
                        {eliteStrategies.map((strat, idx) => (
                          <tr key={idx} className="border-b border-[#1F1F23] hover:bg-[#0D0D0F] transition-colors">
                            <td className="p-3 text-sm text-[#00E0A4]">{strat.name}</td>
                            <td className="p-3 text-sm text-right">{strat.generation}</td>
                            <td className="p-3 text-sm text-[#A0A0A5]">{strat.parentage}</td>
                            <td className="p-3 text-sm text-right text-[#2979FF]">{strat.sharpe.toFixed(1)}</td>
                            <td className="p-3">
                              <div className="flex flex-wrap gap-1">
                                {strat.genes.map((gene, i) => (
                                  <Badge key={i} className="text-xs bg-[#2979FF]/20 text-[#2979FF] border-[#2979FF]/30">
                                    {gene}
                                  </Badge>
                                ))}
                              </div>
                            </td>
                            <td className="p-3 text-sm text-right text-[#00E0A4]">{strat.fitness.toFixed(1)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="bg-[#151519] rounded-lg border border-[#1F1F23]">
                  <div className="p-4 border-b border-[#1F1F23]">
                    <h3 className="text-sm">Live Mutation Log</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-[#1F1F23]">
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Timestamp</th>
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Mutation Applied</th>
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Strategy</th>
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Outcome</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mutationLog.map((log, idx) => (
                          <tr key={idx} className="border-b border-[#1F1F23] hover:bg-[#0D0D0F] transition-colors">
                            <td className="p-3 text-sm text-[#A0A0A5]">{log.timestamp}</td>
                            <td className="p-3 text-sm">{log.mutation}</td>
                            <td className="p-3 text-sm text-[#2979FF]">{log.strategy}</td>
                            <td className={`p-3 text-sm ${
                              log.outcome.includes('Improved') ? 'text-[#00E0A4]' :
                              log.outcome.includes('Failed') ? 'text-[#FF5252]' :
                              'text-[#A0A0A5]'
                            }`}>
                              {log.outcome}
                            </td>
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
