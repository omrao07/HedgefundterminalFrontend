import { useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { Topbar } from "./components/Topbar";
import { DashboardTab } from "./components/tabs/DashboardTab";
import { StrategiesTab } from "./components/tabs/StrategiesTab";
import { MarketsTab } from "./components/tabs/MarketsTab";
import { ResearchFundamentalsTab } from "./components/tabs/ResearchFundamentalsTab";
import { ExecutionTab } from "./components/tabs/ExecutionTab";
import { NewsTab } from "./components/tabs/NewsTab";
import { AIOptimizationTab } from "./components/tabs/AIOptimizationTab";
import { ValuationTab } from "./components/tabs/ValuationTab";
import { QuantModelsTab } from "./components/tabs/QuantModelsTab";
import { WizardModeTab } from "./components/tabs/GodModeTab";
import { FixedIncomeTab } from "./components/tabs/FixedIncomeTab";
import { IntelligenceTab } from "./components/tabs/IntelligenceTab";
import { CommoditiesTab } from "./components/tabs/CommoditiesTab";
import { EquitiesTab } from "./components/tabs/EquitiesTab";
import { CalendarsTab } from "./components/tabs/CalendarsTab";
import { PortfolioBuilderTab } from "./components/tabs/PortfolioBuilderTab";
import { PortfolioJarvis } from "./components/PortfolioJarvis";

export type TradingMode = "paper" | "live";

export default function App() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [tradingMode, setTradingMode] = useState<TradingMode>("paper");
  const [dummyCapital, setDummyCapital] = useState(100000);

  const handleCommand = (command: string) => {
    // Map Bloomberg-style commands to tabs
    const commandMap: { [key: string]: string } = {
      "DES": "research",
      "FA": "research",
      "YAS": "fixedincome",
      "LQA": "fixedincome",
      "TRACE": "fixedincome",
      "WCDS": "fixedincome",
      "YCRV": "fixedincome",
      "BVAL": "fixedincome",
      "FIHY": "fixedincome",
      "IGOV": "fixedincome",
      "DDP": "fixedincome",
      "HDS": "research",
      "ANR": "research",
      "MOST": "research",
      "WEI": "markets",
      "RISK": "dashboard",
      "VAR": "dashboard",
      "NEWS": "news",
      "N": "news",
      "NH": "news",
      "COMP": "research",
      "RV": "research",
      "BETA": "dashboard",
      "MODL": "quant",
      "QMOD": "quant",
      "DAMO": "valuation",
      "STRAT": "strategies",
      "ML": "ai",
      "WIZ": "wizardmode",
      "WIZARD": "wizardmode",
      "PARL": "wizardmode",
      "MULTI": "wizardmode",
      "GENOME": "wizardmode",
      "EMO": "strategies",
      "WAR": "strategies",
      "SYN": "strategies",
      "SAT": "intelligence",
      "INTEL": "intelligence",
      "COMM": "commodities",
      "GEO": "intelligence",
      "OPT": "equities",
      "FUT": "commodities",
      "GREEKS": "equities",
      "JARVIS": "dashboard",
      "EQT": "equities",
      "OMON": "equities",
      "WATCH": "dashboard",
      "WL": "dashboard",
      "PORT": "portfoliobuilder",
      "BUILDER": "portfoliobuilder",
      "ALLOC": "portfoliobuilder",
    };
    
    if (commandMap[command]) {
      setActiveTab(commandMap[command]);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardTab tradingMode={tradingMode} dummyCapital={dummyCapital} />;
      case "strategies":
        return <StrategiesTab tradingMode={tradingMode} />;
      case "portfoliobuilder":
        return <PortfolioBuilderTab />;
      case "markets":
        return <MarketsTab />;
      case "research":
        return <ResearchFundamentalsTab />;
      case "valuation":
        return <ValuationTab />;
      case "quant":
        return <QuantModelsTab />;
      case "wizardmode":
        return <WizardModeTab />;
      case "fixedincome":
        return <FixedIncomeTab />;
      case "intelligence":
        return <IntelligenceTab />;
      case "commodities":
        return <CommoditiesTab />;
      case "equities":
        return <EquitiesTab />;
      case "calendars":
        return <CalendarsTab />;
      case "analytics":
        return <DashboardTab tradingMode={tradingMode} dummyCapital={dummyCapital} />;
      case "execution":
        return <ExecutionTab tradingMode={tradingMode} />;
      case "news":
        return <NewsTab />;
      case "ai":
        return <AIOptimizationTab />;
      default:
        return <DashboardTab tradingMode={tradingMode} dummyCapital={dummyCapital} />;
    }
  };

  return (
    <div className="h-screen bg-[#0D0D0F] text-[#E8E8E8] flex overflow-hidden">
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <Topbar 
          tradingMode={tradingMode} 
          onModeChange={setTradingMode}
          dummyCapital={dummyCapital}
          onCapitalChange={setDummyCapital}
          onCommand={handleCommand}
        />
        
        {/* Content Area */}
        <main className="flex-1 overflow-auto p-4">
          {renderContent()}
        </main>
      </div>

      {/* Portfolio Jarvis AI - Floating Assistant */}
      <PortfolioJarvis />
    </div>
  );
}