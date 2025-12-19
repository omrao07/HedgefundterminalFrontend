import { useState, useEffect, useRef } from "react";
import { ScrollArea } from "../ui/scroll-area";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Button } from "../ui/button";
import { Search, Pause, Play } from "lucide-react";

interface LogEntry {
  id: number;
  timestamp: string;
  level: 'INFO' | 'WARN' | 'ERROR';
  message: string;
}

export function LogsTab() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [levelFilter, setLevelFilter] = useState("all");
  const [isPaused, setIsPaused] = useState(false);

  const logMessages = {
    INFO: [
      "Strategy 'Alpha Momentum US' executed successfully",
      "Position opened: AAPL 500 shares @ $178.45",
      "Risk check passed for portfolio rebalance",
      "Market data feed connected",
      "Order filled: MSFT 300 shares @ $378.92",
      "Daily PnL calculation completed",
      "Cache refreshed for real-time pricing",
    ],
    WARN: [
      "High volatility detected in TSLA position",
      "Approaching leverage limit (90% of max)",
      "Slippage exceeded threshold on NVDA trade",
      "Market data delay: 250ms latency detected",
      "Position concentration warning: Tech sector 45%",
    ],
    ERROR: [
      "Failed to execute order: Insufficient margin",
      "Connection lost to exchange feed",
      "Risk limit breach: VaR exceeded threshold",
      "Order rejected: Invalid symbol",
      "Database connection timeout",
    ],
  };

  const generateLog = (): LogEntry => {
    const levels: Array<'INFO' | 'WARN' | 'ERROR'> = ['INFO', 'INFO', 'INFO', 'INFO', 'WARN', 'WARN', 'ERROR'];
    const level = levels[Math.floor(Math.random() * levels.length)];
    const messages = logMessages[level];
    const message = messages[Math.floor(Math.random() * messages.length)];

    return {
      id: Date.now() + Math.random(),
      timestamp: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      level,
      message,
    };
  };

  useEffect(() => {
    // Initial logs
    const initialLogs = Array.from({ length: 20 }, generateLog);
    setLogs(initialLogs);

    // Add new logs periodically
    const interval = setInterval(() => {
      if (!isPaused) {
        setLogs(prev => [generateLog(), ...prev].slice(0, 100));
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = levelFilter === "all" || log.level === levelFilter;
    return matchesSearch && matchesLevel;
  });

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'INFO': return 'text-[#A0A0A5]';
      case 'WARN': return 'text-[#FF9800]';
      case 'ERROR': return 'text-[#FF5252]';
      default: return 'text-[#E8E8E8]';
    }
  };

  const getLevelBg = (level: string) => {
    switch (level) {
      case 'INFO': return 'bg-[#A0A0A5]/10';
      case 'WARN': return 'bg-[#FF9800]/10';
      case 'ERROR': return 'bg-[#FF5252]/10';
      default: return 'bg-[#1F1F23]';
    }
  };

  return (
    <div className="space-y-4 h-[calc(100vh-120px)] flex flex-col">
      {/* Controls */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#A0A0A5]" />
          <Input
            placeholder="Search logs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-[#151519] border-[#1F1F23]"
          />
        </div>

        <Select value={levelFilter} onValueChange={setLevelFilter}>
          <SelectTrigger className="w-[180px] bg-[#151519] border-[#1F1F23]">
            <SelectValue placeholder="Filter by level" />
          </SelectTrigger>
          <SelectContent className="bg-[#151519] border-[#1F1F23]">
            <SelectItem value="all">All Levels</SelectItem>
            <SelectItem value="INFO">INFO</SelectItem>
            <SelectItem value="WARN">WARN</SelectItem>
            <SelectItem value="ERROR">ERROR</SelectItem>
          </SelectContent>
        </Select>

        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsPaused(!isPaused)}
          className="bg-[#151519] border-[#1F1F23] hover:bg-[#1F1F23]"
        >
          {isPaused ? <Play className="h-4 w-4 mr-2" /> : <Pause className="h-4 w-4 mr-2" />}
          {isPaused ? 'Resume' : 'Pause'}
        </Button>

        <div className="text-xs text-[#A0A0A5]">
          {filteredLogs.length} entries
        </div>
      </div>

      {/* Log Terminal */}
      <div className="flex-1 bg-[#0D0D0F] rounded-lg border border-[#1F1F23] overflow-hidden">
        <ScrollArea className="h-full p-4">
          <div className="font-mono text-xs space-y-1">
            {filteredLogs.map((log) => (
              <div
                key={log.id}
                className={`flex items-start gap-3 p-2 rounded ${getLevelBg(log.level)} hover:bg-[#1F1F23] transition-colors`}
              >
                <span className="text-[#A0A0A5] shrink-0">{log.timestamp}</span>
                <span className={`${getLevelColor(log.level)} shrink-0 w-12`}>{log.level}</span>
                <span className="text-[#E8E8E8]">{log.message}</span>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Status Bar */}
      <div className="bg-[#151519] rounded-lg border border-[#1F1F23] px-4 py-2 flex items-center justify-between text-xs">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${isPaused ? 'bg-[#FF9800]' : 'bg-[#00E0A4] animate-pulse'}`} />
            <span className="text-[#A0A0A5]">
              {isPaused ? 'Paused' : 'Live Feed'}
            </span>
          </div>
          <div className="text-[#A0A0A5]">
            Total Logs: <span className="text-[#E8E8E8]">{logs.length}</span>
          </div>
        </div>
        <div className="flex items-center gap-4 text-[#A0A0A5]">
          <div>
            INFO: <span className="text-[#A0A0A5]">{logs.filter(l => l.level === 'INFO').length}</span>
          </div>
          <div>
            WARN: <span className="text-[#FF9800]">{logs.filter(l => l.level === 'WARN').length}</span>
          </div>
          <div>
            ERROR: <span className="text-[#FF5252]">{logs.filter(l => l.level === 'ERROR').length}</span>
          </div>
        </div>
      </div>
    </div>
  );
}