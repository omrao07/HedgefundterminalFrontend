import { useState, useEffect } from "react";
import { 
  MessageSquare, 
  X, 
  Send, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle,
  BarChart3,
  Activity,
  Target,
  Zap,
  Brain,
  Shield,
  Clock,
  DollarSign,
  Percent,
  TrendingUp as TrendingUpIcon,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
  Mic,
  MicOff,
  RefreshCw,
  Settings,
  Maximize2,
  Minimize2,
  PieChart,
  LineChart,
  Eye,
  EyeOff,
  Bell,
  BellOff,
  Database,
  ChevronRight,
  Play,
  Pause
} from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { SimpleTabs as Tabs, SimpleTabsList as TabsList, SimpleTabsTrigger as TabsTrigger, SimpleTabsContent as TabsContent } from "./ui/simple-tabs";
import { SimpleProgress as Progress } from "./ui/simple-progress";

interface Message {
  role: "jarvis" | "user";
  content: string;
  timestamp: Date;
  type?: "text" | "alert" | "insight" | "trade";
}

interface Position {
  symbol: string;
  shares: number;
  avgCost: number;
  currentPrice: number;
  plDollar: number;
  plPercent: number;
  allocation: number;
  dayChange: number;
}

interface StrategyPerformance {
  name: string;
  pnl: number;
  sharpe: number;
  winRate: number;
  trades: number;
  status: "active" | "paused" | "stopped";
}

interface Alert {
  id: string;
  time: string;
  type: "risk" | "opportunity" | "execution" | "market";
  severity: "low" | "medium" | "high" | "critical";
  message: string;
  action?: string;
}

export function PortfolioJarvis() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState("chat");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "jarvis",
      content: "Good afternoon. Jarvis AI Portfolio Assistant online. Your portfolio is +2.34% today with $12,456 in realized gains. Markets showing elevated volatility. How may I assist you?",
      timestamp: new Date(),
      type: "text"
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [autoExecute, setAutoExecute] = useState(false);
  const [showAlerts, setShowAlerts] = useState(true);

  // Portfolio state
  const [portfolioValue, setPortfolioValue] = useState(10450000);
  const [dayPnL, setDayPnL] = useState(244450);
  const [dayPnLPercent, setDayPnLPercent] = useState(2.34);
  
  // Real-time updates
  const [updates, setUpdates] = useState<string[]>([]);
  const [liveMetrics, setLiveMetrics] = useState({
    sharpe: 2.34,
    sortino: 3.12,
    maxDD: -4.2,
    beta: 1.05,
    alpha: 0.42,
    var95: 38450
  });

  // Top positions
  const [positions, setPositions] = useState<Position[]>([
    { symbol: "AAPL", shares: 4400, avgCost: 178.30, currentPrice: 186.50, plDollar: 36080, plPercent: 4.6, allocation: 8.2, dayChange: 2.1 },
    { symbol: "MSFT", shares: 2800, avgCost: 368.20, currentPrice: 378.45, plDollar: 28700, plPercent: 2.8, allocation: 10.6, dayChange: 1.5 },
    { symbol: "NVDA", shares: 1600, avgCost: 485.60, currentPrice: 512.30, plDollar: 42720, plPercent: 5.5, allocation: 8.2, dayChange: 3.8 },
    { symbol: "GOOGL", shares: 5200, avgCost: 138.90, currentPrice: 142.15, plDollar: 16900, plPercent: 2.3, allocation: 7.4, dayChange: 0.9 },
    { symbol: "TSLA", shares: 3100, avgCost: 242.80, currentPrice: 218.50, plDollar: -75330, plPercent: -10.0, allocation: 6.8, dayChange: -2.4 },
  ]);

  // Strategy performance
  const [strategies, setStrategies] = useState<StrategyPerformance[]>([
    { name: "Volatility Arbitrage", pnl: 8920, sharpe: 3.2, winRate: 68.4, trades: 47, status: "active" },
    { name: "Pairs Trading", pnl: 6730, sharpe: 2.8, winRate: 62.1, trades: 89, status: "active" },
    { name: "Momentum Alpha", pnl: 5240, sharpe: 2.3, winRate: 58.9, trades: 124, status: "active" },
    { name: "Carry Trades", pnl: 4560, sharpe: 2.1, winRate: 71.2, trades: 34, status: "active" },
    { name: "Statistical Arb", pnl: -1240, sharpe: 1.2, winRate: 45.8, trades: 156, status: "paused" },
  ]);

  // Alerts
  const [alerts, setAlerts] = useState<Alert[]>([
    { id: "1", time: "14:32", type: "risk", severity: "high", message: "Portfolio risk exposure at 85% (threshold: 90%)", action: "Review positions" },
    { id: "2", time: "14:28", type: "opportunity", severity: "medium", message: "EUR/USD carry trade setup detected - 78% conviction", action: "Execute trade" },
    { id: "3", time: "14:15", type: "execution", severity: "low", message: "TSLA stop loss triggered at $218.00, -$2,450 realized", action: "View details" },
    { id: "4", time: "14:08", type: "market", severity: "critical", message: "VIX spike +12% - tail risk hedges recommended", action: "Add hedges" },
    { id: "5", time: "13:52", type: "opportunity", severity: "medium", message: "Merger arb spread widened to 3.2% on MSFT-ATVI", action: "Analyze" },
  ]);

  // AI Insights
  const [insights, setInsights] = useState([
    { type: "positive", text: "Portfolio outperforming SPY by +1.2% today", confidence: 92 },
    { type: "warning", text: "Tech sector concentration at 34% - diversification opportunity", confidence: 87 },
    { type: "action", text: "Optimal rebalancing window in next 15 minutes based on liquidity", confidence: 78 },
    { type: "positive", text: "3 strategies showing alpha decay < 5% - sustainable edge maintained", confidence: 84 },
  ]);

  useEffect(() => {
    // Simulate real-time portfolio updates
    const updateInterval = setInterval(() => {
      const randomUpdates = [
        "AAPL position +1.2% → $186.50 | +$4,320 unrealized",
        "Vol Arb Strategy #12 closed → +$8,920 profit (Sharpe: 3.2)",
        "EUR/USD carry entered @ 1.0845 | Target: 1.0920",
        "SPY correlation breakdown detected | Beta shift: 1.05 → 1.12",
        "New momentum signal: QQQ LONG @ 397.50 | 82% conviction",
        "TSLA stop loss triggered @ $218.00 | -$2,450 realized",
        "Portfolio VaR increased +$1,240 | Current: $39,690",
        "Merger arb: MSFT-ATVI spread → 2.1% (narrowing)",
        "⚠️ Risk threshold breach imminent | Exposure: 87%",
        "Gold hedge activated | Geopolitical risk +15%",
        "Pairs trade: GOOGL/META → Correlation 0.89 (entry signal)",
        "AI Model #47 detected regime change → Risk-Off mode",
        "Crypto correlation spike: BTC tracking NDX @ 0.76",
        "Options flow: Unusual call activity in NVDA 520C",
        "Macro signal: Fed speakers dovish → Rate cut odds +8%"
      ];
      
      const randomUpdate = randomUpdates[Math.floor(Math.random() * randomUpdates.length)];
      setUpdates(prev => [randomUpdate, ...prev].slice(0, 15));

      // Randomly update metrics slightly
      setLiveMetrics(prev => ({
        sharpe: +(prev.sharpe + (Math.random() - 0.5) * 0.05).toFixed(2),
        sortino: +(prev.sortino + (Math.random() - 0.5) * 0.08).toFixed(2),
        maxDD: +(prev.maxDD + (Math.random() - 0.5) * 0.1).toFixed(1),
        beta: +(prev.beta + (Math.random() - 0.5) * 0.02).toFixed(2),
        alpha: +(prev.alpha + (Math.random() - 0.5) * 0.01).toFixed(2),
        var95: Math.floor(prev.var95 + (Math.random() - 0.5) * 500)
      }));

    }, 12000); // Update every 12 seconds

    return () => clearInterval(updateInterval);
  }, []);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      role: "user",
      content: inputValue,
      timestamp: new Date(),
      type: "text"
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const response = generateJarvisResponse(inputValue);
      const jarvisMessage: Message = {
        role: "jarvis",
        content: response.content,
        timestamp: new Date(),
        type: response.type
      };
      setMessages(prev => [...prev, jarvisMessage]);
      setIsTyping(false);
    }, 1200 + Math.random() * 800);
  };

  const generateJarvisResponse = (query: string): { content: string; type: Message["type"] } => {
    const lowerQuery = query.toLowerCase();

    if (lowerQuery.includes("portfolio") || lowerQuery.includes("positions") || lowerQuery.includes("holdings")) {
      return {
        content: "Portfolio Analysis: 47 positions across 12 strategies totaling $10.45M. Top performers: NVDA (+$42.7K, +5.5%), AAPL (+$36.1K, +4.6%), MSFT (+$28.7K, +2.8%). Largest drawdown: TSLA (-$75.3K, -10%). Sector allocation: Tech 34%, Finance 18%, Healthcare 12%, Energy 9%, Other 27%. Portfolio beta: 1.05 | Sharpe: 2.34 | Max DD: -4.2%. Correlation with SPY: 0.78. Current exposure: 82% long, 18% hedged.",
        type: "text"
      };
    }
    
    if (lowerQuery.includes("risk")) {
      return {
        content: "Risk Dashboard: VaR (95%, 1-day): $38,450 | CVaR: $52,340 | Max Drawdown: -4.2% | Current DD: -1.8%. Exposure breakdown: 82% long, 18% hedged. Portfolio beta: 1.05 | Volatility: 18.4% annualized. Concentration risk: Top 5 positions = 41.2% of portfolio. Correlation with SPY: 0.78 | VIX exposure: 0.34. ⚠️ ALERT: Risk utilization at 85% (threshold 90%). Recommendation: Add tail-risk protection via VIX calls or reduce position sizes by 8%.",
        type: "alert"
      };
    }
    
    if (lowerQuery.includes("changes") || lowerQuery.includes("happened") || lowerQuery.includes("update") || lowerQuery.includes("today")) {
      return {
        content: "Today's Activity Summary: 3 new positions opened (QQQ momentum long @ 397.50, EUR/USD carry @ 1.0845, GLD hedge @ 189.30), 2 positions closed (TSLA stop loss @ $218 [-$2.45K], Vol Arb #12 closed [+$8.92K]), 1 strategy rebalanced (Stat Arb reduced 12% → 9%). Net P&L: +$12,456 (+0.12%). Best strategy: Volatility Arbitrage +$8,920 (Sharpe 3.2). Worst: TSLA stop loss -$2,450. Market regime: Transitioning Risk-On → Neutral. Portfolio value: $10.45M → $10.462M.",
        type: "insight"
      };
    }
    
    if (lowerQuery.includes("aapl") || lowerQuery.includes("apple")) {
      return {
        content: "AAPL Deep Dive: Position: 4,400 shares @ avg $178.30 | Current: $186.50 (+$8.20, +4.6%) | Unrealized P&L: +$36,080 | Portfolio weight: 8.2%. Day change: +2.1% | 52-week range: $164.08 - $199.62. AI Valuation (Damodaran DCF): Fair value $195.20 (+4.7% upside). Technical: RSI 58.4, MACD bullish crossover, trading above 50/200 MA. Options flow: Calls/Puts ratio 1.8 (bullish). Analyst consensus: 18 BUY, 4 HOLD, 1 SELL. Avg target: $198. Recommendation: HOLD, trim if > $195, add if < $175.",
        type: "insight"
      };
    }
    
    if (lowerQuery.includes("strategies") || lowerQuery.includes("performance") || lowerQuery.includes("alpha")) {
      return {
        content: "Strategy Performance Analysis: (1) Vol Arb: +$8,920 (Sharpe 3.2, Win 68.4%, 47 trades) - STRONG ✓, (2) Pairs Trading: +$6,730 (Sharpe 2.8, Win 62.1%, 89 trades) - GOOD ✓, (3) Momentum: +$5,240 (Sharpe 2.3, Win 58.9%, 124 trades) - MODERATE ✓, (4) Carry Trades: +$4,560 (Sharpe 2.1, Win 71.2%, 34 trades) - GOOD ✓, (5) Stat Arb: -$1,240 (Sharpe 1.2, Win 45.8%, 156 trades) - PAUSED ⚠️. Total: 28 active strategies, 23 profitable (82.1%). Alpha decay detected in HFT Latency Arb #42 - auto-shutdown in 72 hours. Aggregate Sharpe: 2.34.",
        type: "text"
      };
    }
    
    if (lowerQuery.includes("alerts") || lowerQuery.includes("warnings") || lowerQuery.includes("notifications")) {
      return {
        content: "Active Alerts (5): [CRITICAL] VIX spike +12% - tail risk hedges recommended | [HIGH] Portfolio risk at 85% (threshold 90%) - reduce exposure | [MEDIUM] EUR/USD carry setup detected - 78% conviction entry signal | [MEDIUM] MSFT-ATVI merger arb spread widened to 3.2% | [LOW] TSLA stop loss executed @ $218.00 [-$2.45K]. Parliament AI consensus vote (3:00 PM): Reduce equity exposure by 8%, add VIX hedges, increase cash to 12%. Market regime change detected: Risk-On → Neutral.",
        type: "alert"
      };
    }
    
    if (lowerQuery.includes("best") || lowerQuery.includes("top") || lowerQuery.includes("opportunities") || lowerQuery.includes("ideas")) {
      return {
        content: "Top Opportunities (AI-Ranked): (1) Taiwan Defense Play: 70% Defense stocks + 30% Gold hedge | Expected return: +18.4% | Conviction: 87% | War game probability: 18%, (2) Fear Contrarian: Market fear index @ 78% - BUY SPY 485P (7 DTE) | Expected return: +24% | Conviction: 82%, (3) Evolved Strategy #1247 (Gen 100): ML-optimized multi-factor model | Sharpe: 6.3 | Capacity: $2.5M | Conviction: 94%, (4) EUR/USD Carry+Momentum: Composite signal alignment @ 1.0845 | Target: 1.0920 | R/R: 3.2 | Conviction: 78%, (5) NVDA post-earnings consolidation breakout: Entry $512, Target $545 | Conviction: 71%.",
        type: "insight"
      };
    }

    if (lowerQuery.includes("macro") || lowerQuery.includes("economy") || lowerQuery.includes("fed") || lowerQuery.includes("rates")) {
      return {
        content: "Macro Intelligence (Wizard Mode Brain): Fed HOLD March (78% probability) → First cut June (62%), ECB CUT -25bps April (65%), BoJ HIKE +10bps March (82%). Central bank divergence creates FX carry opportunities. US CPI next week: Consensus +3.2% YoY (risks skewed higher +15bps). PMI data: Manufacturing 48.7 (contraction), Services 52.3 (expansion). Geopolitical risk index: +18% (Taiwan scenario 18% probability, Middle East 12%). Civilization Macro Themes: AI Revolution 28% allocation ($2.8B AUM), Climate Transition 22% ($2.2B), Deglobalization 15% ($1.5B).",
        type: "insight"
      };
    }

    if (lowerQuery.includes("execute") || lowerQuery.includes("trade") || lowerQuery.includes("buy") || lowerQuery.includes("sell")) {
      return {
        content: "Trade Execution Request Received. Auto-execution is currently " + (autoExecute ? "ENABLED" : "DISABLED") + ". To execute trades, please: (1) Specify instrument, direction, quantity, and limit price, (2) Enable auto-execution mode in settings, or (3) Route through Execution tab for manual confirmation. Example: 'Buy 500 shares AAPL @ $185.50 limit' or 'Sell 200 TSLA @ market'. Current buying power: $1,240,000 | Margin utilization: 34% | Available leverage: 2.5x.",
        type: "trade"
      };
    }

    if (lowerQuery.includes("nvda") || lowerQuery.includes("nvidia")) {
      return {
        content: "NVDA Analysis: Position: 1,600 shares @ avg $485.60 | Current: $512.30 (+$26.70, +5.5%) | Unrealized P&L: +$42,720 | Weight: 8.2%. Day: +3.8% | Volume: 48.2M (120% avg). Technical: Breaking out of consolidation, RSI 64.2, strong momentum. AI Valuation: $575 target (+12.2% upside). Options: Heavy call flow in 520C, 530C expiring next Friday. Catalyst: Blackwell launch in 2 weeks. Insider: CEO bought $2M shares. Risk: Overbought short-term, potential profit-taking. Recommendation: HOLD current, add on dip to $495-500 range.",
        type: "insight"
      };
    }

    if (lowerQuery.includes("diversif") || lowerQuery.includes("allocation") || lowerQuery.includes("sectors")) {
      return {
        content: "Portfolio Allocation Analysis: Sectors - Tech 34.2% (⚠️ overweight vs SPY 28%), Financials 18.4%, Healthcare 12.1%, Energy 8.9%, Consumer 7.8%, Industrials 6.2%, Materials 4.8%, Utilities 3.4%, RE 2.1%, Telecom 2.1%. Geographic: US 78%, EU 12%, Asia 7%, EM 3%. Asset Class: Equities 82%, FX 9%, Commodities 5%, Crypto 2%, Cash 2%. Risk concentration: Top 5 positions = 41.2% of NAV. Recommendation: Reduce Tech to 28%, increase Healthcare to 15%, add EM exposure to 8% for better diversification. Target correlation reduction: 0.78 → 0.68.",
        type: "insight"
      };
    }

    // Default response
    return {
      content: "Query acknowledged. I'm your AI Portfolio Assistant. Portfolio status: $10.45M total value | +$12.5K today (+0.12%) | 47 active positions | 28 strategies deployed | Risk: 85% utilization. I can help with: portfolio analysis, risk metrics, position details, strategy performance, trade execution, market opportunities, macro outlook, alerts management, and optimization recommendations. What would you like to explore?",
      type: "text"
    };
  };

  const toggleVoice = () => {
    setIsVoiceActive(!isVoiceActive);
    if (!isVoiceActive) {
      // Simulate voice activation
      const voiceMessage: Message = {
        role: "jarvis",
        content: "Voice interface activated. Listening for commands...",
        timestamp: new Date(),
        type: "text"
      };
      setMessages(prev => [...prev, voiceMessage]);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "bg-[#FF5252]/20 text-[#FF5252] border-[#FF5252]/30";
      case "high": return "bg-[#FF9800]/20 text-[#FF9800] border-[#FF9800]/30";
      case "medium": return "bg-[#2979FF]/20 text-[#2979FF] border-[#2979FF]/30";
      case "low": return "bg-[#00E0A4]/20 text-[#00E0A4] border-[#00E0A4]/30";
      default: return "bg-[#A0A0A5]/20 text-[#A0A0A5] border-[#A0A0A5]/30";
    }
  };

  const getMessageTypeStyle = (type?: Message["type"]) => {
    switch (type) {
      case "alert": return "border-l-4 border-[#FF9800] bg-[#FF9800]/5";
      case "insight": return "border-l-4 border-[#00E0A4] bg-[#00E0A4]/5";
      case "trade": return "border-l-4 border-[#2979FF] bg-[#2979FF]/5";
      default: return "";
    }
  };

  return (
    <>
      {/* Floating Chat Button with Glow */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 bg-gradient-to-br from-[#00E0A4] via-[#00E0A4] to-[#2979FF] rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-all duration-300 group relative"
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            zIndex: 99999,
            boxShadow: "0 0 40px rgba(0, 224, 164, 0.4), 0 0 80px rgba(41, 121, 255, 0.2)"
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#00E0A4] to-[#2979FF] rounded-full blur-xl opacity-50 group-hover:opacity-70 transition-opacity animate-pulse" />
          <MessageSquare className="w-7 h-7 text-[#0D0D0F] relative z-10" />
          {updates.length > 0 && (
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#FF5252] rounded-full flex items-center justify-center text-[10px] font-bold text-white border-2 border-[#0D0D0F] z-20 animate-bounce">
              {Math.min(updates.length, 9)}
            </div>
          )}
        </button>
      )}

      {/* Enhanced Chat Window with Glassmorphism */}
      {isOpen && (
        <div 
          className={`bg-[#0D0D0F]/95 backdrop-blur-2xl border border-[#2979FF]/30 rounded-2xl shadow-2xl flex flex-col transition-all duration-500 ${
            isExpanded ? "w-[750px] h-[600px]" : "w-[500px] h-[480px]"
          }`}
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            zIndex: 99999,
            boxShadow: "0 0 60px rgba(41, 121, 255, 0.3), 0 0 100px rgba(0, 224, 164, 0.15)"
          }}
        >
          {/* Enhanced Header with Gradient */}
          <div className="relative bg-gradient-to-r from-[#0D0D0F] via-[#151519] to-[#0D0D0F] border-b border-[#2979FF]/30">
            {/* Top gradient line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00E0A4] to-transparent opacity-70" />
            
            <div className="p-5 flex items-center justify-between relative">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#00E0A4] to-[#2979FF] rounded-xl flex items-center justify-center relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#00E0A4] to-[#2979FF] blur-md opacity-50 group-hover:opacity-70 transition-opacity" />
                    <Brain className="w-6 h-6 text-[#0D0D0F] relative z-10" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#00E0A4] rounded-full border-2 border-[#0D0D0F] animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base tracking-wide">Jarvis AI Portfolio Assistant</h3>
                    <Badge className="bg-[#00E0A4]/20 text-[#00E0A4] border-[#00E0A4]/30 text-[10px] px-2">
                      ONLINE
                    </Badge>
                  </div>
                  <p className="text-xs text-[#A0A0A5] mt-0.5">Real-time analysis • Multi-strategy intelligence</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleVoice}
                  className={`p-2 rounded-lg transition-all ${
                    isVoiceActive 
                      ? "bg-[#00E0A4]/20 text-[#00E0A4] border border-[#00E0A4]/30" 
                      : "bg-[#151519] text-[#A0A0A5] hover:bg-[#1F1F23] border border-[#2979FF]/20"
                  }`}
                  title="Voice Commands"
                >
                  {isVoiceActive ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="p-2 rounded-lg bg-[#151519] text-[#A0A0A5] hover:bg-[#1F1F23] border border-[#2979FF]/20 transition-all"
                  title={isExpanded ? "Minimize" : "Maximize"}
                >
                  {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg bg-[#151519] text-[#A0A0A5] hover:bg-[#FF5252]/20 hover:text-[#FF5252] border border-[#2979FF]/20 hover:border-[#FF5252]/30 transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Bottom gradient line */}
            <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#2979FF]/40 to-transparent" />
          </div>

          {/* Live Metrics Bar */}
          <div className="bg-[#151519]/80 backdrop-blur-xl border-b border-[#2979FF]/20 px-5 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#00E0A4] rounded-full animate-pulse shadow-[0_0_8px_rgba(0,224,164,0.6)]" />
                  <span className="text-xs text-[#A0A0A5]">Live Data</span>
                </div>
                <div className="text-xs">
                  <span className="text-[#A0A0A5]">Portfolio:</span>
                  <span className="ml-1.5 text-[#E8E8E8]">${(portfolioValue / 1000000).toFixed(2)}M</span>
                </div>
                <div className="text-xs">
                  <span className="text-[#A0A0A5]">P&L:</span>
                  <span className={`ml-1.5 ${dayPnL >= 0 ? "text-[#00E0A4]" : "text-[#FF5252]"}`}>
                    {dayPnL >= 0 ? "+" : ""}${(dayPnL / 1000).toFixed(1)}K ({dayPnL >= 0 ? "+" : ""}{dayPnLPercent.toFixed(2)}%)
                  </span>
                </div>
                <div className="text-xs">
                  <span className="text-[#A0A0A5]">Sharpe:</span>
                  <span className="ml-1.5 text-[#E8E8E8]">{liveMetrics.sharpe}</span>
                </div>
                <div className="text-xs">
                  <span className="text-[#A0A0A5]">VaR₉₅:</span>
                  <span className="ml-1.5 text-[#FF9800]">${(liveMetrics.var95 / 1000).toFixed(1)}K</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-xs text-[#A0A0A5] truncate max-w-[300px]">
                  {updates[0] || "Monitoring markets..."}
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col overflow-hidden">
            <div className="relative border-b border-[#2979FF]/20 bg-gradient-to-r from-[#0D0D0F] via-[#151519] to-[#0D0D0F]">
              <TabsList className="bg-transparent backdrop-blur-xl rounded-none w-full justify-start p-0 h-14 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#00E0A4]/5 via-transparent to-transparent pointer-events-none" />
                
                <TabsTrigger 
                  value="chat" 
                  className="relative group data-[state=active]:bg-gradient-to-b data-[state=active]:from-[#00E0A4]/10 data-[state=active]:to-transparent data-[state=active]:text-[#00E0A4] bg-transparent text-[#A0A0A5] hover:text-[#E8E8E8] hover:bg-[#151519]/50 rounded-none border-b-2 border-transparent data-[state=active]:border-[#00E0A4] px-6 h-full transition-all duration-300"
                >
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 group-data-[state=active]:drop-shadow-[0_0_8px_rgba(0,224,164,0.5)]" />
                    <span className="text-sm tracking-wide">Chat</span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00E0A4] to-transparent opacity-0 group-data-[state=active]:opacity-100 transition-opacity shadow-[0_0_12px_rgba(0,224,164,0.5)]" />
                </TabsTrigger>

                <TabsTrigger 
                  value="portfolio" 
                  className="relative group data-[state=active]:bg-gradient-to-b data-[state=active]:from-[#00E0A4]/10 data-[state=active]:to-transparent data-[state=active]:text-[#00E0A4] bg-transparent text-[#A0A0A5] hover:text-[#E8E8E8] hover:bg-[#151519]/50 rounded-none border-b-2 border-transparent data-[state=active]:border-[#00E0A4] px-6 h-full transition-all duration-300"
                >
                  <div className="flex items-center gap-2">
                    <PieChart className="w-4 h-4 group-data-[state=active]:drop-shadow-[0_0_8px_rgba(0,224,164,0.5)]" />
                    <span className="text-sm tracking-wide">Positions</span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00E0A4] to-transparent opacity-0 group-data-[state=active]:opacity-100 transition-opacity shadow-[0_0_12px_rgba(0,224,164,0.5)]" />
                </TabsTrigger>

                <TabsTrigger 
                  value="strategies" 
                  className="relative group data-[state=active]:bg-gradient-to-b data-[state=active]:from-[#00E0A4]/10 data-[state=active]:to-transparent data-[state=active]:text-[#00E0A4] bg-transparent text-[#A0A0A5] hover:text-[#E8E8E8] hover:bg-[#151519]/50 rounded-none border-b-2 border-transparent data-[state=active]:border-[#00E0A4] px-6 h-full transition-all duration-300"
                >
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 group-data-[state=active]:drop-shadow-[0_0_8px_rgba(0,224,164,0.5)]" />
                    <span className="text-sm tracking-wide">Strategies</span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00E0A4] to-transparent opacity-0 group-data-[state=active]:opacity-100 transition-opacity shadow-[0_0_12px_rgba(0,224,164,0.5)]" />
                </TabsTrigger>

                <TabsTrigger 
                  value="alerts" 
                  className="relative group data-[state=active]:bg-gradient-to-b data-[state=active]:from-[#00E0A4]/10 data-[state=active]:to-transparent data-[state=active]:text-[#00E0A4] bg-transparent text-[#A0A0A5] hover:text-[#E8E8E8] hover:bg-[#151519]/50 rounded-none border-b-2 border-transparent data-[state=active]:border-[#00E0A4] px-6 h-full transition-all duration-300"
                >
                  <div className="flex items-center gap-2">
                    <Bell className="w-4 h-4 group-data-[state=active]:drop-shadow-[0_0_8px_rgba(0,224,164,0.5)]" />
                    <span className="text-sm tracking-wide">Alerts</span>
                    {alerts.length > 0 && (
                      <Badge className="bg-[#FF5252]/20 text-[#FF5252] border-[#FF5252]/30 text-[10px] h-4 px-1.5 ml-1">
                        {alerts.length}
                      </Badge>
                    )}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00E0A4] to-transparent opacity-0 group-data-[state=active]:opacity-100 transition-opacity shadow-[0_0_12px_rgba(0,224,164,0.5)]" />
                </TabsTrigger>

                <TabsTrigger 
                  value="insights" 
                  className="relative group data-[state=active]:bg-gradient-to-b data-[state=active]:from-[#00E0A4]/10 data-[state=active]:to-transparent data-[state=active]:text-[#00E0A4] bg-transparent text-[#A0A0A5] hover:text-[#E8E8E8] hover:bg-[#151519]/50 rounded-none border-b-2 border-transparent data-[state=active]:border-[#00E0A4] px-6 h-full transition-all duration-300"
                >
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 group-data-[state=active]:drop-shadow-[0_0_8px_rgba(0,224,164,0.5)]" />
                    <span className="text-sm tracking-wide">AI Insights</span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00E0A4] to-transparent opacity-0 group-data-[state=active]:opacity-100 transition-opacity shadow-[0_0_12px_rgba(0,224,164,0.5)]" />
                </TabsTrigger>
              </TabsList>
              
              <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#2979FF]/40 to-transparent" />
            </div>

            {/* Tab Content */}
            <div className="flex-1 overflow-hidden">
              {/* CHAT TAB */}
              <TabsContent value="chat" className="h-full mt-0 flex flex-col">
                <ScrollArea className="flex-1 p-5">
                  <div className="space-y-4">
                    {messages.map((message, idx) => (
                      <div
                        key={idx}
                        className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[85%] rounded-xl p-4 ${
                            message.role === "user"
                              ? "bg-gradient-to-br from-[#2979FF] to-[#2979FF]/80 text-white shadow-lg"
                              : `bg-[#151519]/90 backdrop-blur-xl text-[#E8E8E8] border border-[#2979FF]/20 ${getMessageTypeStyle(message.type)}`
                          }`}
                        >
                          {message.role === "jarvis" && message.type && message.type !== "text" && (
                            <div className="flex items-center gap-2 mb-2 pb-2 border-b border-[#2979FF]/20">
                              {message.type === "alert" && <AlertTriangle className="w-4 h-4 text-[#FF9800]" />}
                              {message.type === "insight" && <Sparkles className="w-4 h-4 text-[#00E0A4]" />}
                              {message.type === "trade" && <Target className="w-4 h-4 text-[#2979FF]" />}
                              <span className="text-xs uppercase tracking-wider opacity-70">
                                {message.type}
                              </span>
                            </div>
                          )}
                          <p className="text-sm leading-relaxed">{message.content}</p>
                          <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/10">
                            <p className="text-xs opacity-60">
                              {message.timestamp.toLocaleTimeString()}
                            </p>
                            {message.role === "jarvis" && (
                              <div className="flex items-center gap-1 text-xs opacity-60">
                                <Brain className="w-3 h-3" />
                                <span>AI</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="bg-[#151519]/90 backdrop-blur-xl rounded-xl p-4 border border-[#2979FF]/20">
                          <div className="flex gap-1.5">
                            <div className="w-2 h-2 bg-[#00E0A4] rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                            <div className="w-2 h-2 bg-[#00E0A4] rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                            <div className="w-2 h-2 bg-[#00E0A4] rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </ScrollArea>

                {/* Quick Actions */}
                <div className="border-t border-[#2979FF]/20 px-5 py-3 bg-[#151519]/50 backdrop-blur-xl">
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setInputValue("What happened to my portfolio today?")}
                      className="text-xs px-3 py-1.5 bg-[#0D0D0F]/80 backdrop-blur-xl rounded-lg border border-[#2979FF]/20 hover:border-[#00E0A4]/40 hover:bg-[#00E0A4]/10 transition-all"
                    >
                      Portfolio Update
                    </button>
                    <button
                      onClick={() => setInputValue("Show me risk metrics")}
                      className="text-xs px-3 py-1.5 bg-[#0D0D0F]/80 backdrop-blur-xl rounded-lg border border-[#2979FF]/20 hover:border-[#00E0A4]/40 hover:bg-[#00E0A4]/10 transition-all"
                    >
                      Risk Analysis
                    </button>
                    <button
                      onClick={() => setInputValue("Top opportunities?")}
                      className="text-xs px-3 py-1.5 bg-[#0D0D0F]/80 backdrop-blur-xl rounded-lg border border-[#2979FF]/20 hover:border-[#00E0A4]/40 hover:bg-[#00E0A4]/10 transition-all"
                    >
                      Opportunities
                    </button>
                    <button
                      onClick={() => setInputValue("Strategy performance analysis")}
                      className="text-xs px-3 py-1.5 bg-[#0D0D0F]/80 backdrop-blur-xl rounded-lg border border-[#2979FF]/20 hover:border-[#00E0A4]/40 hover:bg-[#00E0A4]/10 transition-all"
                    >
                      Strategies
                    </button>
                    <button
                      onClick={() => setInputValue("Macro outlook and Fed analysis")}
                      className="text-xs px-3 py-1.5 bg-[#0D0D0F]/80 backdrop-blur-xl rounded-lg border border-[#2979FF]/20 hover:border-[#00E0A4]/40 hover:bg-[#00E0A4]/10 transition-all"
                    >
                      Macro Intel
                    </button>
                  </div>
                </div>

                {/* Input Area */}
                <div className="border-t border-[#2979FF]/20 px-5 py-4 flex gap-3 bg-[#0D0D0F]/50 backdrop-blur-xl">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSend()}
                    placeholder="Ask Jarvis anything about your portfolio..."
                    className="flex-1 bg-[#151519] border-[#2979FF]/30 focus:border-[#00E0A4]/50 transition-all text-sm"
                  />
                  <button
                    onClick={handleSend}
                    className="px-5 py-2.5 bg-gradient-to-r from-[#00E0A4] to-[#2979FF] rounded-lg hover:opacity-90 transition-all shadow-lg relative group overflow-hidden"
                    disabled={!inputValue.trim()}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-[#00E0A4] to-[#2979FF] blur-md opacity-50 group-hover:opacity-70 transition-opacity" />
                    <Send className="w-4 h-4 text-[#0D0D0F] relative z-10" />
                  </button>
                </div>
              </TabsContent>

              {/* PORTFOLIO TAB */}
              <TabsContent value="portfolio" className="h-full mt-0">
                <ScrollArea className="h-full">
                  <div className="p-5 space-y-4">
                    {/* Summary Cards */}
                    <div className="grid grid-cols-4 gap-4">
                      <div className="bg-[#151519]/90 backdrop-blur-xl rounded-lg border border-[#2979FF]/20 p-4 hover:border-[#2979FF]/40 transition-all">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-[#A0A0A5]">Total Value</span>
                          <DollarSign className="w-4 h-4 text-[#00E0A4]" />
                        </div>
                        <div className="text-2xl">${(portfolioValue / 1000000).toFixed(2)}M</div>
                        <div className="text-xs text-[#00E0A4] mt-1 flex items-center gap-1">
                          <ArrowUpRight className="w-3 h-3" />
                          +2.34%
                        </div>
                      </div>
                      <div className="bg-[#151519]/90 backdrop-blur-xl rounded-lg border border-[#2979FF]/20 p-4 hover:border-[#2979FF]/40 transition-all">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-[#A0A0A5]">Day P&L</span>
                          <TrendingUp className="w-4 h-4 text-[#00E0A4]" />
                        </div>
                        <div className="text-2xl text-[#00E0A4]">+${(dayPnL / 1000).toFixed(1)}K</div>
                        <div className="text-xs text-[#A0A0A5] mt-1">
                          {positions.filter(p => p.plDollar > 0).length} winners
                        </div>
                      </div>
                      <div className="bg-[#151519]/90 backdrop-blur-xl rounded-lg border border-[#2979FF]/20 p-4 hover:border-[#2979FF]/40 transition-all">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-[#A0A0A5]">Positions</span>
                          <Target className="w-4 h-4 text-[#2979FF]" />
                        </div>
                        <div className="text-2xl">{positions.length}</div>
                        <div className="text-xs text-[#A0A0A5] mt-1">
                          {positions.filter(p => p.plDollar < 0).length} losers
                        </div>
                      </div>
                      <div className="bg-[#151519]/90 backdrop-blur-xl rounded-lg border border-[#2979FF]/20 p-4 hover:border-[#2979FF]/40 transition-all">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-[#A0A0A5]">Sharpe Ratio</span>
                          <BarChart3 className="w-4 h-4 text-[#00E0A4]" />
                        </div>
                        <div className="text-2xl">{liveMetrics.sharpe}</div>
                        <div className="text-xs text-[#A0A0A5] mt-1">
                          Sortino: {liveMetrics.sortino}
                        </div>
                      </div>
                    </div>

                    {/* Positions Table */}
                    <div className="bg-[#151519]/90 backdrop-blur-xl rounded-lg border border-[#2979FF]/20 overflow-hidden">
                      <div className="p-4 border-b border-[#2979FF]/20">
                        <h3 className="text-sm flex items-center gap-2">
                          <PieChart className="w-4 h-4 text-[#00E0A4]" />
                          Top Positions
                        </h3>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead className="bg-[#0D0D0F]/50">
                            <tr className="text-xs text-[#A0A0A5]">
                              <th className="text-left p-3">Symbol</th>
                              <th className="text-right p-3">Shares</th>
                              <th className="text-right p-3">Avg Cost</th>
                              <th className="text-right p-3">Current</th>
                              <th className="text-right p-3">P&L</th>
                              <th className="text-right p-3">P&L %</th>
                              <th className="text-right p-3">Day</th>
                              <th className="text-right p-3">Weight</th>
                            </tr>
                          </thead>
                          <tbody>
                            {positions.map((pos, idx) => (
                              <tr key={idx} className="border-t border-[#2979FF]/10 hover:bg-[#0D0D0F]/30 transition-colors">
                                <td className="p-3">
                                  <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00E0A4]/20 to-[#2979FF]/20 flex items-center justify-center border border-[#2979FF]/20">
                                      <span className="text-xs">{pos.symbol.substring(0, 2)}</span>
                                    </div>
                                    <span>{pos.symbol}</span>
                                  </div>
                                </td>
                                <td className="text-right p-3 text-sm text-[#A0A0A5]">{pos.shares.toLocaleString()}</td>
                                <td className="text-right p-3 text-sm">${pos.avgCost.toFixed(2)}</td>
                                <td className="text-right p-3 text-sm">${pos.currentPrice.toFixed(2)}</td>
                                <td className={`text-right p-3 text-sm ${pos.plDollar >= 0 ? "text-[#00E0A4]" : "text-[#FF5252]"}`}>
                                  {pos.plDollar >= 0 ? "+" : ""}${(pos.plDollar / 1000).toFixed(1)}K
                                </td>
                                <td className={`text-right p-3 text-sm ${pos.plPercent >= 0 ? "text-[#00E0A4]" : "text-[#FF5252]"}`}>
                                  {pos.plPercent >= 0 ? "+" : ""}{pos.plPercent.toFixed(1)}%
                                </td>
                                <td className={`text-right p-3 text-sm ${pos.dayChange >= 0 ? "text-[#00E0A4]" : "text-[#FF5252]"}`}>
                                  {pos.dayChange >= 0 ? "+" : ""}{pos.dayChange.toFixed(1)}%
                                </td>
                                <td className="text-right p-3">
                                  <div className="flex items-center justify-end gap-2">
                                    <div className="w-16 h-1.5 bg-[#0D0D0F] rounded-full overflow-hidden">
                                      <div 
                                        className="h-full bg-gradient-to-r from-[#00E0A4] to-[#2979FF]"
                                        style={{ width: `${pos.allocation * 10}%` }}
                                      />
                                    </div>
                                    <span className="text-xs text-[#A0A0A5] w-10 text-right">{pos.allocation}%</span>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Risk Metrics */}
                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-[#151519]/90 backdrop-blur-xl rounded-lg border border-[#2979FF]/20 p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <Shield className="w-4 h-4 text-[#2979FF]" />
                          <span className="text-sm">Risk Metrics</span>
                        </div>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-[#A0A0A5]">Beta:</span>
                            <span>{liveMetrics.beta}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[#A0A0A5]">Alpha:</span>
                            <span className="text-[#00E0A4]">{liveMetrics.alpha}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[#A0A0A5]">Max DD:</span>
                            <span className="text-[#FF5252]">{liveMetrics.maxDD}%</span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-[#151519]/90 backdrop-blur-xl rounded-lg border border-[#2979FF]/20 p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <Activity className="w-4 h-4 text-[#00E0A4]" />
                          <span className="text-sm">Performance</span>
                        </div>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-[#A0A0A5]">Sharpe:</span>
                            <span className="text-[#00E0A4]">{liveMetrics.sharpe}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[#A0A0A5]">Sortino:</span>
                            <span className="text-[#00E0A4]">{liveMetrics.sortino}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[#A0A0A5]">Win Rate:</span>
                            <span>64.2%</span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-[#151519]/90 backdrop-blur-xl rounded-lg border border-[#2979FF]/20 p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <AlertTriangle className="w-4 h-4 text-[#FF9800]" />
                          <span className="text-sm">Value at Risk</span>
                        </div>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-[#A0A0A5]">VaR 95%:</span>
                            <span className="text-[#FF9800]">${(liveMetrics.var95 / 1000).toFixed(1)}K</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[#A0A0A5]">CVaR:</span>
                            <span className="text-[#FF5252]">$52.3K</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[#A0A0A5]">Exposure:</span>
                            <span>85%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollArea>
              </TabsContent>

              {/* STRATEGIES TAB */}
              <TabsContent value="strategies" className="h-full mt-0">
                <ScrollArea className="h-full">
                  <div className="p-5 space-y-4">
                    {/* Strategy Summary */}
                    <div className="grid grid-cols-4 gap-4">
                      <div className="bg-[#151519]/90 backdrop-blur-xl rounded-lg border border-[#2979FF]/20 p-4">
                        <div className="text-xs text-[#A0A0A5] mb-1">Active Strategies</div>
                        <div className="text-2xl">{strategies.filter(s => s.status === "active").length}</div>
                        <div className="text-xs text-[#00E0A4] mt-1">
                          {strategies.filter(s => s.pnl > 0).length} profitable
                        </div>
                      </div>
                      <div className="bg-[#151519]/90 backdrop-blur-xl rounded-lg border border-[#2979FF]/20 p-4">
                        <div className="text-xs text-[#A0A0A5] mb-1">Total P&L</div>
                        <div className="text-2xl text-[#00E0A4]">
                          +${(strategies.reduce((sum, s) => sum + s.pnl, 0) / 1000).toFixed(1)}K
                        </div>
                        <div className="text-xs text-[#A0A0A5] mt-1">Today</div>
                      </div>
                      <div className="bg-[#151519]/90 backdrop-blur-xl rounded-lg border border-[#2979FF]/20 p-4">
                        <div className="text-xs text-[#A0A0A5] mb-1">Avg Sharpe</div>
                        <div className="text-2xl">
                          {(strategies.reduce((sum, s) => sum + s.sharpe, 0) / strategies.length).toFixed(2)}
                        </div>
                        <div className="text-xs text-[#00E0A4] mt-1">Excellent</div>
                      </div>
                      <div className="bg-[#151519]/90 backdrop-blur-xl rounded-lg border border-[#2979FF]/20 p-4">
                        <div className="text-xs text-[#A0A0A5] mb-1">Total Trades</div>
                        <div className="text-2xl">
                          {strategies.reduce((sum, s) => sum + s.trades, 0)}
                        </div>
                        <div className="text-xs text-[#A0A0A5] mt-1">Executed</div>
                      </div>
                    </div>

                    {/* Strategy Cards */}
                    <div className="space-y-3">
                      {strategies.map((strategy, idx) => (
                        <div 
                          key={idx}
                          className="bg-[#151519]/90 backdrop-blur-xl rounded-lg border border-[#2979FF]/20 p-4 hover:border-[#00E0A4]/40 transition-all"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#00E0A4]/20 to-[#2979FF]/20 flex items-center justify-center border border-[#2979FF]/30">
                                <Activity className="w-5 h-5 text-[#00E0A4]" />
                              </div>
                              <div>
                                <h4>{strategy.name}</h4>
                                <div className="flex items-center gap-2 mt-1">
                                  <Badge className={`text-[10px] px-2 ${
                                    strategy.status === "active" 
                                      ? "bg-[#00E0A4]/20 text-[#00E0A4] border-[#00E0A4]/30" 
                                      : strategy.status === "paused"
                                      ? "bg-[#FF9800]/20 text-[#FF9800] border-[#FF9800]/30"
                                      : "bg-[#FF5252]/20 text-[#FF5252] border-[#FF5252]/30"
                                  }`}>
                                    {strategy.status.toUpperCase()}
                                  </Badge>
                                  <span className="text-xs text-[#A0A0A5]">{strategy.trades} trades</span>
                                </div>
                              </div>
                            </div>
                            <div className={`text-right ${strategy.pnl >= 0 ? "text-[#00E0A4]" : "text-[#FF5252]"}`}>
                              <div className="text-xl">
                                {strategy.pnl >= 0 ? "+" : ""}${(strategy.pnl / 1000).toFixed(1)}K
                              </div>
                              <div className="text-xs opacity-70">P&L Today</div>
                            </div>
                          </div>

                          <div className="grid grid-cols-3 gap-4 pt-3 border-t border-[#2979FF]/10">
                            <div>
                              <div className="text-xs text-[#A0A0A5] mb-1">Sharpe Ratio</div>
                              <div className="flex items-center gap-2">
                                <div className="text-sm text-[#00E0A4]">{strategy.sharpe}</div>
                                <Progress value={(strategy.sharpe / 5) * 100} className="h-1 flex-1" />
                              </div>
                            </div>
                            <div>
                              <div className="text-xs text-[#A0A0A5] mb-1">Win Rate</div>
                              <div className="flex items-center gap-2">
                                <div className="text-sm">{strategy.winRate}%</div>
                                <Progress value={strategy.winRate} className="h-1 flex-1" />
                              </div>
                            </div>
                            <div>
                              <div className="text-xs text-[#A0A0A5] mb-1">Status</div>
                              <div className="flex items-center gap-2">
                                {strategy.status === "active" ? (
                                  <Play className="w-4 h-4 text-[#00E0A4]" />
                                ) : (
                                  <Pause className="w-4 h-4 text-[#FF9800]" />
                                )}
                                <span className="text-sm capitalize">{strategy.status}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </ScrollArea>
              </TabsContent>

              {/* ALERTS TAB */}
              <TabsContent value="alerts" className="h-full mt-0">
                <ScrollArea className="h-full">
                  <div className="p-5 space-y-3">
                    {alerts.map((alert) => (
                      <div 
                        key={alert.id}
                        className={`bg-[#151519]/90 backdrop-blur-xl rounded-lg border p-4 hover:border-opacity-60 transition-all ${
                          getSeverityColor(alert.severity)
                        }`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-start gap-3 flex-1">
                            <div className="mt-0.5">
                              {alert.type === "risk" && <Shield className="w-5 h-5" />}
                              {alert.type === "opportunity" && <Target className="w-5 h-5" />}
                              {alert.type === "execution" && <Activity className="w-5 h-5" />}
                              {alert.type === "market" && <TrendingUp className="w-5 h-5" />}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <Badge className={`text-[10px] px-2 ${getSeverityColor(alert.severity)}`}>
                                  {alert.severity.toUpperCase()}
                                </Badge>
                                <span className="text-xs text-[#A0A0A5]">{alert.time}</span>
                              </div>
                              <p className="text-sm">{alert.message}</p>
                              {alert.action && (
                                <button className="text-xs text-[#2979FF] hover:text-[#00E0A4] mt-2 flex items-center gap-1 transition-colors">
                                  {alert.action}
                                  <ChevronRight className="w-3 h-3" />
                                </button>
                              )}
                            </div>
                          </div>
                          <button className="text-[#A0A0A5] hover:text-[#FF5252] transition-colors p-1">
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>

              {/* AI INSIGHTS TAB */}
              <TabsContent value="insights" className="h-full mt-0">
                <ScrollArea className="h-full">
                  <div className="p-5 space-y-4">
                    {/* Live Updates Feed */}
                    <div className="bg-[#151519]/90 backdrop-blur-xl rounded-lg border border-[#2979FF]/20 p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <Database className="w-4 h-4 text-[#00E0A4]" />
                          <h3 className="text-sm">Live Activity Stream</h3>
                        </div>
                        <Badge className="bg-[#00E0A4]/20 text-[#00E0A4] border-[#00E0A4]/30 text-[10px]">
                          REAL-TIME
                        </Badge>
                      </div>
                      <div className="space-y-2 max-h-64 overflow-y-auto">
                        {updates.slice(0, 10).map((update, idx) => (
                          <div 
                            key={idx}
                            className="text-xs p-2 bg-[#0D0D0F]/50 rounded border border-[#2979FF]/10 hover:border-[#2979FF]/30 transition-colors flex items-start gap-2"
                          >
                            <Clock className="w-3 h-3 text-[#A0A0A5] mt-0.5 flex-shrink-0" />
                            <span className="text-[#E8E8E8]">{update}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* AI Insights */}
                    <div className="space-y-3">
                      {insights.map((insight, idx) => (
                        <div 
                          key={idx}
                          className={`bg-[#151519]/90 backdrop-blur-xl rounded-lg border p-4 ${
                            insight.type === "positive" 
                              ? "border-[#00E0A4]/30" 
                              : insight.type === "warning"
                              ? "border-[#FF9800]/30"
                              : "border-[#2979FF]/30"
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                              insight.type === "positive" 
                                ? "bg-[#00E0A4]/20" 
                                : insight.type === "warning"
                                ? "bg-[#FF9800]/20"
                                : "bg-[#2979FF]/20"
                            }`}>
                              {insight.type === "positive" && <TrendingUp className="w-5 h-5 text-[#00E0A4]" />}
                              {insight.type === "warning" && <AlertTriangle className="w-5 h-5 text-[#FF9800]" />}
                              {insight.type === "action" && <Zap className="w-5 h-5 text-[#2979FF]" />}
                            </div>
                            <div className="flex-1">
                              <p className="text-sm mb-2">{insight.text}</p>
                              <div className="flex items-center gap-2">
                                <div className="flex-1">
                                  <div className="flex items-center justify-between text-xs mb-1">
                                    <span className="text-[#A0A0A5]">AI Confidence</span>
                                    <span className={
                                      insight.confidence >= 85 
                                        ? "text-[#00E0A4]" 
                                        : insight.confidence >= 70
                                        ? "text-[#2979FF]"
                                        : "text-[#FF9800]"
                                    }>{insight.confidence}%</span>
                                  </div>
                                  <Progress value={insight.confidence} className="h-1.5" />
                                </div>
                                <Sparkles className="w-4 h-4 text-[#00E0A4]" />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Performance Metrics */}
                    <div className="bg-[#151519]/90 backdrop-blur-xl rounded-lg border border-[#2979FF]/20 p-4">
                      <div className="flex items-center gap-2 mb-4">
                        <BarChart3 className="w-4 h-4 text-[#2979FF]" />
                        <h3 className="text-sm">Portfolio Health Score</h3>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-xs mb-1.5">
                            <span className="text-[#A0A0A5]">Risk-Adjusted Returns</span>
                            <span className="text-[#00E0A4]">92/100</span>
                          </div>
                          <Progress value={92} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between text-xs mb-1.5">
                            <span className="text-[#A0A0A5]">Diversification</span>
                            <span className="text-[#2979FF]">78/100</span>
                          </div>
                          <Progress value={78} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between text-xs mb-1.5">
                            <span className="text-[#A0A0A5]">Strategy Alignment</span>
                            <span className="text-[#00E0A4]">88/100</span>
                          </div>
                          <Progress value={88} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between text-xs mb-1.5">
                            <span className="text-[#A0A0A5]">Risk Management</span>
                            <span className="text-[#FF9800]">85/100</span>
                          </div>
                          <Progress value={85} className="h-2" />
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollArea>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      )}
    </>
  );
}
