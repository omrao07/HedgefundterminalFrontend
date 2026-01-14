import { useMemo, useState } from "react";

/* =========================
   Types
========================= */

export type TradingMode = "paper" | "live";

export type TabKey =
  | "dashboard"
  | "strategies"
  | "markets"
  | "research"
  | "execution"
  | "news";

/* =========================
   Sidebar
========================= */

interface SidebarProps {
  activeTab: TabKey;
  onTabChange: (tab: TabKey) => void;
}

function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  const tabs: { key: TabKey; label: string }[] = [
    { key: "dashboard", label: "Dashboard" },
    { key: "strategies", label: "Strategies" },
    { key: "markets", label: "Markets" },
    { key: "research", label: "Research" },
    { key: "execution", label: "Execution" },
    { key: "news", label: "News" },
  ];

  return (
    <aside className="w-64 bg-[#111113] p-4">
      <nav className="flex flex-col gap-2">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key;

          return (
            <button
              key={tab.key}
              onClick={() => onTabChange(tab.key)}
              className={`text-left px-3 py-2 rounded transition ${
                isActive
                  ? "bg-[#1F1F23] text-white"
                  : "text-gray-400 hover:text-white hover:bg-[#1A1A1E]"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}

/* =========================
   Topbar
========================= */

interface TopbarProps {
  tradingMode: TradingMode;
  capital: number;
  onModeChange: (mode: TradingMode) => void;
  onCapitalChange: (value: number) => void;
}

function Topbar({
  tradingMode,
  capital,
  onModeChange,
  onCapitalChange,
}: TopbarProps) {
  return (
    <header className="h-12 flex items-center justify-between px-4 bg-[#0F0F12] border-b border-[#1F1F23]">
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-400">Mode:</span>
        <button
          onClick={() =>
            onModeChange(tradingMode === "paper" ? "live" : "paper")
          }
          className="px-2 py-1 text-xs bg-[#1F1F23] rounded"
        >
          {tradingMode.toUpperCase()}
        </button>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-400">Capital:</span>
        <input
          type="number"
          value={capital}
          onChange={(e) => onCapitalChange(Number(e.target.value))}
          className="w-32 bg-[#1F1F23] px-2 py-1 text-sm rounded"
        />
      </div>
    </header>
  );
}

/* =========================
   Tabs (temporary stubs)
========================= */

interface DashboardProps {
  tradingMode: TradingMode;
  capital: number;
}

function DashboardTab({ tradingMode, capital }: DashboardProps) {
  return (
    <div>
      <h1 className="text-xl font-bold">Dashboard</h1>
      <p>Mode: {tradingMode}</p>
      <p>Capital: {capital.toLocaleString()}</p>
    </div>
  );
}

const StrategiesTab = () => <h1 className="text-xl font-bold">Strategies</h1>;
const MarketsTab = () => <h1 className="text-xl font-bold">Markets</h1>;
const ResearchTab = () => <h1 className="text-xl font-bold">Research</h1>;

function ExecutionTab({ tradingMode }: { tradingMode: TradingMode }) {
  return (
    <div>
      <h1 className="text-xl font-bold">Execution</h1>
      <p>Mode: {tradingMode}</p>
    </div>
  );
}

const NewsTab = () => <h1 className="text-xl font-bold">News</h1>;

/* =========================
   App Root
========================= */

export default function App() {
  const [activeTab, setActiveTab] = useState<TabKey>("dashboard");
  const [tradingMode, setTradingMode] = useState<TradingMode>("paper");
  const [capital, setCapital] = useState<number>(100_000);

  const content = useMemo(() => {
    switch (activeTab) {
      case "dashboard":
        return (
          <DashboardTab tradingMode={tradingMode} capital={capital} />
        );
      case "strategies":
        return <StrategiesTab />;
      case "markets":
        return <MarketsTab />;
      case "research":
        return <ResearchTab />;
      case "execution":
        return <ExecutionTab tradingMode={tradingMode} />;
      case "news":
        return <NewsTab />;
      default:
        return null;
    }
  }, [activeTab, tradingMode, capital]);

  return (
    <div className="h-screen bg-[#0D0D0F] text-[#E8E8E8] flex overflow-hidden">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar
          tradingMode={tradingMode}
          capital={capital}
          onModeChange={setTradingMode}
          onCapitalChange={setCapital}
        />

        <main className="flex-1 overflow-auto p-4">
          {content}
        </main>
      </div>
    </div>
  );
}