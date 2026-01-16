import { useState } from "react";

import { Sidebar } from "./Sidebar";
import { Topbar, TradingMode } from "./Topbar";

import { DashboardTab } from "./tabs/DashboardTab";
import { PortfolioBuilderTab } from "./tabs/PortfolioBuilderTab";
import { IntelligenceTab } from "./tabs/IntelligenceTab";
import { EquitiesTab } from "./tabs/EquitiesTab";
import { CommoditiesTab } from "./tabs/CommoditiesTab";
import { StrategiesTab } from "./tabs/StrategiesTab";
import { ExecutionTab } from "./tabs/ExecutionTab";
import { NewsTab } from "./tabs/NewsTab";
import { MarketsTab } from "./tabs/MarketsTab";
import { ResearchFundamentalsTab } from "./tabs/ResearchFundamentalsTab";
import { CalendarsTab } from "./tabs/CalendarsTab";
import { FixedIncomeTab } from "./tabs/FixedIncomeTab";
import { AIOptimizationTab } from "./tabs/AIOptimizationTab";
import { ValuationTab } from "./tabs/ValuationTab";
import { QuantModelsTab } from "./tabs/QuantModelsTab";
import { WizardModeTab } from "./tabs/GodModeTab";

export function TerminalLayout() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [tradingMode, setTradingMode] = useState<TradingMode>("paper");
  const [capital, setCapital] = useState(100_000);

  const renderTab = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardTab tradingMode={tradingMode} dummyCapital={capital} />;
      case "portfoliobuilder":
        return <PortfolioBuilderTab />;
      case "intelligence":
        return <IntelligenceTab />;
      case "equities":
        return <EquitiesTab />;
      case "commodities":
        return <CommoditiesTab />;
      case "strategies":
        return <StrategiesTab tradingMode={tradingMode} />;
      case "execution":
        return <ExecutionTab tradingMode={tradingMode} />;
      case "news":
        return <NewsTab />;
      case "markets":
        return <MarketsTab />;
      case "research":
        return <ResearchFundamentalsTab />;
      case "calendars":
        return <CalendarsTab />;
      case "fixedincome":
        return <FixedIncomeTab />;
      case "ai":
        return <AIOptimizationTab />;
      case "valuation":
        return <ValuationTab />;
      case "quant":
        return <QuantModelsTab />;
      case "wizardmode":
        return <WizardModeTab />;
      default:
        return <DashboardTab tradingMode={tradingMode} dummyCapital={capital} />;
    }
  };

  return (
    <div className="h-screen w-screen flex overflow-hidden bg-[#0B0D10] text-[#E8E8E8]">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar
          tradingMode={tradingMode}
          onModeChange={setTradingMode}
          dummyCapital={capital}
          onCapitalChange={setCapital}
          onCommand={() => {}}
        />

        <main className="flex-1 overflow-auto">
          {renderTab()}
        </main>
      </div>
    </div>
  );
}