import { useState } from "react";
import { ScrollArea } from "../ui/scroll-area";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Activity, BarChart3, Search } from "lucide-react";
import { 
  LineChart, 
  Line, 
  ScatterChart, 
  Scatter, 
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend,
  Cell
} from "recharts";

export function QuantModelsTab() {
  const [activeSubTab, setActiveSubTab] = useState("regression");
  const [searchRegression, setSearchRegression] = useState("");
  const [searchTrees, setSearchTrees] = useState("");
  const [searchMonteCarlo, setSearchMonteCarlo] = useState("");
  const [searchMarkov, setSearchMarkov] = useState("");
  const [searchTimeSeries, setSearchTimeSeries] = useState("");
  const [searchFactors, setSearchFactors] = useState("");

  // Regression models
  const regressionModels = [
    { model: "Linear Regression", target: "AAPL Returns", r2: 0.68, mse: 0.024, features: ["SPY", "QQQ", "VIX", "Volume"], prediction: 2.4 },
    { model: "Ridge Regression", target: "TSLA Returns", r2: 0.52, mse: 0.048, features: ["Market", "Sector", "Momentum"], prediction: -1.2 },
    { model: "Lasso Regression", target: "Portfolio Returns", r2: 0.74, mse: 0.018, features: ["Factor1", "Factor2", "Factor3"], prediction: 3.1 },
    { model: "Elastic Net", target: "Sector Rotation", r2: 0.61, mse: 0.032, features: ["Macro", "Sentiment", "Flow"], prediction: 1.8 },
  ];

  // Decision tree models
  const decisionTreeModels = [
    { model: "Classification Tree", task: "Trade Signal", accuracy: 82.4, depth: 8, nodes: 127, prediction: "BUY" },
    { model: "Regression Tree", task: "Price Forecast", r2: 0.69, depth: 10, nodes: 255, prediction: "$186.50" },
    { model: "Random Forest", task: "Multi-Asset", accuracy: 87.6, trees: 500, features: 42, prediction: "LONG" },
    { model: "Gradient Boosting", task: "Risk Score", accuracy: 91.2, estimators: 200, features: 35, prediction: "LOW" },
  ];

  // Monte Carlo simulations
  const monteCarloSims = [
    { simulation: "Portfolio VaR", runs: 100000, confidence: 95, var: 3.8, cvar: 5.2, horizon: "1-day" },
    { simulation: "Option Pricing", runs: 50000, confidence: 99, value: 12.45, std: 2.34, horizon: "30-day" },
    { simulation: "Path Dependency", runs: 75000, confidence: 95, expected: 892.5, range: "±145", horizon: "90-day" },
    { simulation: "Credit Risk", runs: 100000, confidence: 99, probability: 2.4, loss: 1.2, horizon: "1-year" },
  ];

  // Markov models
  const markovModels = [
    { model: "2-State Regime", states: ["Bull", "Bear"], current: "Bull", probability: 0.78, transition: 0.12 },
    { model: "3-State Regime", states: ["High Vol", "Normal", "Low Vol"], current: "Normal", probability: 0.65, transition: 0.22 },
    { model: "4-State Market", states: ["Expansion", "Peak", "Contraction", "Trough"], current: "Expansion", probability: 0.82, transition: 0.08 },
    { model: "Credit States", states: ["AAA", "AA", "A", "BBB", "Default"], current: "AA", probability: 0.91, transition: 0.05 },
  ];

  // Time series forecasts
  const timeSeriesForecasts = [
    { symbol: "AAPL", model: "ARIMA(2,1,2)", forecast: 188.50, confidence: 85, mae: 2.34, horizon: "5-day" },
    { symbol: "SPY", model: "GARCH(1,1)", forecast: 487.20, confidence: 89, mae: 3.45, horizon: "5-day" },
    { symbol: "BTC/USD", model: "Prophet", forecast: 48250, confidence: 72, mae: 1245, horizon: "7-day" },
    { symbol: "EUR/USD", model: "VAR", forecast: 1.0845, confidence: 91, mae: 0.0023, horizon: "3-day" },
  ];

  // Factor models
  const factorModels = [
    { factor: "Market", beta: 1.05, tStat: 12.4, pValue: 0.001, contribution: 45.2 },
    { factor: "Size (SMB)", beta: 0.32, tStat: 4.2, pValue: 0.012, contribution: 12.5 },
    { factor: "Value (HML)", beta: -0.18, tStat: -2.1, pValue: 0.045, contribution: -5.8 },
    { factor: "Momentum", beta: 0.58, tStat: 6.8, pValue: 0.003, contribution: 22.1 },
    { factor: "Quality", beta: 0.41, tStat: 5.1, pValue: 0.008, contribution: 15.6 },
  ];

  // REGRESSION CHARTS - Actual Quant Model Visualizations
  
  // 1. Actual vs Predicted (Scatter with 45-degree line for perfect prediction)
  const regressionScatterData = [
    { actual: 2.1, predicted: 2.3 }, { actual: -1.5, predicted: -1.2 }, { actual: 3.4, predicted: 3.1 },
    { actual: 0.8, predicted: 1.1 }, { actual: 2.9, predicted: 2.7 }, { actual: -0.5, predicted: -0.3 },
    { actual: 1.8, predicted: 2.0 }, { actual: 4.2, predicted: 3.9 }, { actual: -2.1, predicted: -1.8 },
    { actual: 1.5, predicted: 1.7 }, { actual: 3.8, predicted: 3.5 }, { actual: 0.2, predicted: 0.5 },
    { actual: -1.8, predicted: -1.5 }, { actual: 2.5, predicted: 2.4 }, { actual: 1.2, predicted: 1.4 },
  ];

  // 2. Residuals Plot (for regression diagnostics)
  const residualsData = [
    { fitted: 180, residual: 0.5 }, { fitted: 182, residual: -0.8 }, { fitted: 184, residual: 1.2 },
    { fitted: 186, residual: -0.3 }, { fitted: 188, residual: 0.7 }, { fitted: 190, residual: -1.1 },
    { fitted: 192, residual: 0.4 }, { fitted: 194, residual: -0.6 }, { fitted: 196, residual: 0.9 },
    { fitted: 198, residual: -0.2 }, { fitted: 200, residual: 0.3 }, { fitted: 202, residual: -0.5 },
  ];

  // 3. Feature Importance (standardized coefficients)
  const featureImportanceData = [
    { feature: "SPY Beta", importance: 0.82 },
    { feature: "QQQ Beta", importance: 0.68 },
    { feature: "VIX", importance: -0.45 },
    { feature: "Volume", importance: 0.34 },
    { feature: "Momentum", importance: 0.58 },
    { feature: "RSI", importance: 0.41 },
  ];

  // TREE MODELS - Classification & Ensemble Visualizations
  
  // 1. Feature Importance (Gini/Entropy)
  const treeFeatureImportance = [
    { feature: "Price/Volume", importance: 0.28 },
    { feature: "RSI", importance: 0.22 },
    { feature: "MACD", importance: 0.18 },
    { feature: "Bollinger", importance: 0.15 },
    { feature: "ATR", importance: 0.10 },
    { feature: "OBV", importance: 0.07 },
  ];

  // 2. ROC Curve Data (for classification models)
  const rocCurveData = [
    { fpr: 0.0, tpr: 0.0 }, { fpr: 0.05, tpr: 0.42 }, { fpr: 0.10, tpr: 0.68 },
    { fpr: 0.15, tpr: 0.79 }, { fpr: 0.20, tpr: 0.86 }, { fpr: 0.30, tpr: 0.91 },
    { fpr: 0.40, tpr: 0.94 }, { fpr: 0.60, tpr: 0.97 }, { fpr: 0.80, tpr: 0.99 },
    { fpr: 1.0, tpr: 1.0 },
  ];

  // MONTE CARLO - Portfolio Risk Simulations
  
  // 1. Simulated Price Paths (showing multiple trajectories)
  const monteCarloPathsData = [
    { day: 0, p5: 100, p25: 100, p50: 100, p75: 100, p95: 100 },
    { day: 20, p5: 96, p25: 99, p50: 102, p75: 105, p95: 108 },
    { day: 40, p5: 92, p25: 98, p50: 104, p75: 110, p95: 118 },
    { day: 60, p5: 88, p25: 97, p50: 107, p75: 116, p95: 128 },
    { day: 80, p5: 85, p25: 96, p50: 110, p75: 122, p95: 138 },
    { day: 100, p5: 82, p25: 95, p50: 113, p75: 129, p95: 149 },
  ];

  // 2. VaR Distribution (Value at Risk)
  const varDistribution = [
    { loss: -15, freq: 1 }, { loss: -12, freq: 3 }, { loss: -10, freq: 8 }, { loss: -8, freq: 18 },
    { loss: -6, freq: 35 }, { loss: -4, freq: 58 }, { loss: -2, freq: 85 }, { loss: 0, freq: 100 },
    { loss: 2, freq: 88 }, { loss: 4, freq: 62 }, { loss: 6, freq: 38 }, { loss: 8, freq: 20 },
    { loss: 10, freq: 9 }, { loss: 12, freq: 4 }, { loss: 15, freq: 1 },
  ];

  // MARKOV CHAINS - Regime Switching Models
  
  // 1. State Probability Evolution
  const markovStateData = [
    { time: "T-10", bull: 0.65, bear: 0.20, neutral: 0.15 },
    { time: "T-8", bull: 0.70, bear: 0.18, neutral: 0.12 },
    { time: "T-6", bull: 0.74, bear: 0.15, neutral: 0.11 },
    { time: "T-4", bull: 0.77, bear: 0.13, neutral: 0.10 },
    { time: "T-2", bull: 0.79, bear: 0.12, neutral: 0.09 },
    { time: "T", bull: 0.82, bear: 0.10, neutral: 0.08 },
  ];

  // TIME SERIES - ARIMA, GARCH Forecasting
  
  // 1. Forecast with Confidence Intervals
  const forecastData = [
    { date: "D-20", actual: 178.5, forecast: null, upper: null, lower: null },
    { date: "D-15", actual: 180.2, forecast: null, upper: null, lower: null },
    { date: "D-10", actual: 182.5, forecast: null, upper: null, lower: null },
    { date: "D-5", actual: 184.8, forecast: null, upper: null, lower: null },
    { date: "D0", actual: 187.5, forecast: 187.5, upper: 187.5, lower: 187.5 },
    { date: "D+5", actual: null, forecast: 189.8, upper: 192.5, lower: 187.1 },
    { date: "D+10", actual: null, forecast: 191.5, upper: 195.8, lower: 187.2 },
    { date: "D+15", actual: null, forecast: 193.2, upper: 199.2, lower: 187.2 },
    { date: "D+20", actual: null, forecast: 194.5, upper: 202.8, lower: 186.2 },
  ];

  // 2. ACF Plot (Autocorrelation Function)
  const acfData = [
    { lag: 0, acf: 1.0 }, { lag: 1, acf: 0.82 }, { lag: 2, acf: 0.68 }, { lag: 3, acf: 0.52 },
    { lag: 4, acf: 0.38 }, { lag: 5, acf: 0.24 }, { lag: 6, acf: 0.12 }, { lag: 7, acf: 0.05 },
    { lag: 8, acf: -0.02 }, { lag: 9, acf: -0.06 }, { lag: 10, acf: -0.04 },
  ];

  // FACTOR MODELS - Fama-French, PCA
  
  // 1. Factor Returns Over Time
  const factorReturnsData = [
    { date: "Jan", market: 2.5, size: 0.8, value: -0.5, momentum: 1.2 },
    { date: "Feb", market: -1.2, size: 0.3, value: 0.8, momentum: -0.6 },
    { date: "Mar", market: 3.8, size: 1.1, value: 0.2, momentum: 2.1 },
    { date: "Apr", market: 1.5, size: -0.4, value: 1.2, momentum: 0.8 },
    { date: "May", market: -2.1, size: -0.8, value: 1.5, momentum: -1.2 },
    { date: "Jun", market: 2.8, size: 0.6, value: -0.3, momentum: 1.8 },
  ];

  // 2. Factor Contribution (attribution)
  const factorContributionData = factorModels.map(f => ({
    name: f.factor.split(' ')[0],
    contribution: f.contribution,
    beta: f.beta
  }));

  return (
    <div className="h-[calc(100vh-120px)]">
      <Tabs value={activeSubTab} onValueChange={setActiveSubTab} className="h-full flex flex-col">
        <TabsList className="bg-[#1F1F23] border-b-2 border-[#2979FF]/20 rounded-none w-full justify-start p-0 h-12">
          <TabsTrigger value="regression" className="data-[state=active]:bg-[#151519] data-[state=active]:text-[#00E0A4] data-[state=active]:border-[#00E0A4] bg-transparent text-[#A0A0A5] hover:text-[#E8E8E8] hover:bg-[#151519]/50 rounded-none border-b-2 border-transparent px-4 whitespace-nowrap transition-all text-xs">
            Regression
          </TabsTrigger>
          <TabsTrigger value="trees" className="data-[state=active]:bg-[#151519] data-[state=active]:text-[#00E0A4] data-[state=active]:border-[#00E0A4] bg-transparent text-[#A0A0A5] hover:text-[#E8E8E8] hover:bg-[#151519]/50 rounded-none border-b-2 border-transparent px-4 whitespace-nowrap transition-all text-xs">
            Trees
          </TabsTrigger>
          <TabsTrigger value="montecarlo" className="data-[state=active]:bg-[#151519] data-[state=active]:text-[#00E0A4] data-[state=active]:border-[#00E0A4] bg-transparent text-[#A0A0A5] hover:text-[#E8E8E8] hover:bg-[#151519]/50 rounded-none border-b-2 border-transparent px-4 whitespace-nowrap transition-all text-xs">
            MonteCarlo
          </TabsTrigger>
          <TabsTrigger value="markov" className="data-[state=active]:bg-[#151519] data-[state=active]:text-[#00E0A4] data-[state=active]:border-[#00E0A4] bg-transparent text-[#A0A0A5] hover:text-[#E8E8E8] hover:bg-[#151519]/50 rounded-none border-b-2 border-transparent px-4 whitespace-nowrap transition-all text-xs">
            Markov
          </TabsTrigger>
          <TabsTrigger value="timeseries" className="data-[state=active]:bg-[#151519] data-[state=active]:text-[#00E0A4] data-[state=active]:border-[#00E0A4] bg-transparent text-[#A0A0A5] hover:text-[#E8E8E8] hover:bg-[#151519]/50 rounded-none border-b-2 border-transparent px-4 whitespace-nowrap transition-all text-xs">
            TimeSeries
          </TabsTrigger>
          <TabsTrigger value="factors" className="data-[state=active]:bg-[#151519] data-[state=active]:text-[#00E0A4] data-[state=active]:border-[#00E0A4] bg-transparent text-[#A0A0A5] hover:text-[#E8E8E8] hover:bg-[#151519]/50 rounded-none border-b-2 border-transparent px-4 whitespace-nowrap transition-all text-xs">
            Factors
          </TabsTrigger>
        </TabsList>

        <ScrollArea className="flex-1">
          <div className="p-4">
            {/* Regression Models Tab */}
            <TabsContent value="regression" className="mt-0">
              <div className="space-y-4">
                <div className="bg-[#151519] rounded-lg border border-[#1F1F23] p-4">
                  <h3 className="text-sm mb-4">Linear & Non-Linear Regression Models</h3>
                  <p className="text-xs text-[#A0A0A5] mb-4">
                    Predictive regression models for returns forecasting, factor exposure analysis, and risk attribution.
                  </p>
                </div>

                {/* Search Input */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#A0A0A5]" />
                  <Input
                    placeholder="Search by model type or target variable..."
                    value={searchRegression}
                    onChange={(e) => setSearchRegression(e.target.value)}
                    className="pl-10 bg-[#151519] border-[#1F1F23] text-sm"
                  />
                </div>

                {/* Regression Model Visualizations */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#151519] rounded-lg border border-[#1F1F23] p-4">
                    <h3 className="text-sm mb-2">Actual vs Predicted (Regression Fit)</h3>
                    <p className="text-xs text-[#A0A0A5] mb-3">Scatter plot with 45° reference line - ideal predictions fall on the line</p>
                    <ResponsiveContainer width="100%" height={280}>
                      <ScatterChart>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1F1F23" />
                        <XAxis 
                          dataKey="actual" 
                          stroke="#A0A0A5" 
                          label={{ value: 'Actual Returns (%)', position: 'insideBottom', offset: -5, fill: '#A0A0A5', fontSize: 10 }} 
                          domain={[-3, 5]}
                        />
                        <YAxis 
                          dataKey="predicted" 
                          stroke="#A0A0A5" 
                          label={{ value: 'Predicted Returns (%)', angle: -90, position: 'insideLeft', fill: '#A0A0A5', fontSize: 10 }} 
                          domain={[-3, 5]}
                        />
                        <Tooltip
                          contentStyle={{ backgroundColor: "#151519", border: "1px solid #1F1F23", borderRadius: "8px", fontSize: "12px" }}
                          labelStyle={{ color: "#E8E8E8" }}
                        />
                        <Scatter name="Predictions" data={regressionScatterData} fill="#00E0A4" />
                        <Line 
                          type="monotone" 
                          dataKey="actual" 
                          data={[{actual: -3, predicted: -3}, {actual: 5, predicted: 5}]} 
                          stroke="#2979FF" 
                          strokeWidth={2} 
                          dot={false} 
                          name="Perfect Fit"
                        />
                      </ScatterChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="bg-[#151519] rounded-lg border border-[#1F1F23] p-4">
                    <h3 className="text-sm mb-2">Residual Plot (Error Analysis)</h3>
                    <p className="text-xs text-[#A0A0A5] mb-3">Residuals should be randomly scattered around zero for good fit</p>
                    <ResponsiveContainer width="100%" height={280}>
                      <ScatterChart>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1F1F23" />
                        <XAxis 
                          dataKey="fitted" 
                          stroke="#A0A0A5" 
                          label={{ value: 'Fitted Values', position: 'insideBottom', offset: -5, fill: '#A0A0A5', fontSize: 10 }} 
                        />
                        <YAxis 
                          dataKey="residual" 
                          stroke="#A0A0A5" 
                          label={{ value: 'Residuals', angle: -90, position: 'insideLeft', fill: '#A0A0A5', fontSize: 10 }} 
                        />
                        <Tooltip
                          contentStyle={{ backgroundColor: "#151519", border: "1px solid #1F1F23", borderRadius: "8px", fontSize: "12px" }}
                        />
                        <Scatter name="Residuals" data={residualsData} fill="#2979FF" />
                        <Line 
                          data={[{fitted: 180, residual: 0}, {fitted: 202, residual: 0}]} 
                          dataKey="residual" 
                          stroke="#FF5252" 
                          strokeWidth={1} 
                          strokeDasharray="5 5" 
                          dot={false}
                        />
                      </ScatterChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="bg-[#151519] rounded-lg border border-[#1F1F23] p-4">
                  <h3 className="text-sm mb-2">Feature Importance (Standardized Coefficients)</h3>
                  <p className="text-xs text-[#A0A0A5] mb-3">Higher absolute values indicate stronger predictive power</p>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={featureImportanceData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="#1F1F23" />
                      <XAxis type="number" stroke="#A0A0A5" domain={[-1, 1]} />
                      <YAxis type="category" dataKey="feature" stroke="#A0A0A5" width={100} />
                      <Tooltip
                        contentStyle={{ backgroundColor: "#151519", border: "1px solid #1F1F23", borderRadius: "8px", fontSize: "12px" }}
                      />
                      <Bar dataKey="importance">
                        {featureImportanceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.importance >= 0 ? '#00E0A4' : '#FF5252'} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="bg-[#151519] rounded-lg border border-[#1F1F23]">
                  <div className="p-4 border-b border-[#1F1F23]">
                    <h3 className="text-sm">Active Regression Models</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-[#1F1F23]">
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Model Type</th>
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Target Variable</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">R²</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">MSE</th>
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Features</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">Prediction</th>
                        </tr>
                      </thead>
                      <tbody>
                        {regressionModels
                          .filter(model => 
                            model.model.toLowerCase().includes(searchRegression.toLowerCase()) ||
                            model.target.toLowerCase().includes(searchRegression.toLowerCase())
                          )
                          .map((model, idx) => (
                            <tr key={idx} className="border-b border-[#1F1F23] hover:bg-[#0D0D0F] transition-colors">
                              <td className="p-3 text-sm">{model.model}</td>
                              <td className="p-3 text-sm text-[#2979FF]">{model.target}</td>
                              <td className="p-3 text-sm text-right text-[#00E0A4]">{model.r2.toFixed(2)}</td>
                              <td className="p-3 text-sm text-right">{model.mse.toFixed(3)}</td>
                              <td className="p-3 text-sm text-[#A0A0A5]">{model.features.join(", ")}</td>
                              <td className={`p-3 text-sm text-right ${model.prediction >= 0 ? 'text-[#00E0A4]' : 'text-[#FF5252]'}`}>
                                {model.prediction >= 0 ? '+' : ''}{model.prediction.toFixed(1)}%
                              </td>
                            </tr>
                          ))
                        }
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Decision Trees Tab */}
            <TabsContent value="trees" className="mt-0">
              <div className="space-y-4">
                <div className="bg-[#151519] rounded-lg border border-[#1F1F23] p-4">
                  <h3 className="text-sm mb-4">Decision Tree & Ensemble Methods</h3>
                  <p className="text-xs text-[#A0A0A5] mb-4">
                    Classification and regression trees including Random Forests and Gradient Boosting for complex pattern recognition.
                  </p>
                </div>

                {/* Search Input */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#A0A0A5]" />
                  <Input
                    placeholder="Search by model, task, or prediction..."
                    value={searchTrees}
                    onChange={(e) => setSearchTrees(e.target.value)}
                    className="pl-10 bg-[#151519] border-[#1F1F23] text-sm"
                  />
                </div>

                {/* Tree Model Visualizations */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#151519] rounded-lg border border-[#1F1F23] p-4">
                    <h3 className="text-sm mb-2">Feature Importance (Gini Impurity)</h3>
                    <p className="text-xs text-[#A0A0A5] mb-3">Most important features for tree split decisions</p>
                    <ResponsiveContainer width="100%" height={280}>
                      <BarChart data={treeFeatureImportance} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" stroke="#1F1F23" />
                        <XAxis type="number" stroke="#A0A0A5" domain={[0, 0.3]} />
                        <YAxis type="category" dataKey="feature" stroke="#A0A0A5" width={90} />
                        <Tooltip
                          contentStyle={{ backgroundColor: "#151519", border: "1px solid #1F1F23", borderRadius: "8px", fontSize: "12px" }}
                        />
                        <Bar dataKey="importance" fill="#00E0A4" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="bg-[#151519] rounded-lg border border-[#1F1F23] p-4">
                    <h3 className="text-sm mb-2">ROC Curve (AUC: 0.94)</h3>
                    <p className="text-xs text-[#A0A0A5] mb-3">Receiver Operating Characteristic for classification performance</p>
                    <ResponsiveContainer width="100%" height={280}>
                      <LineChart data={rocCurveData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1F1F23" />
                        <XAxis 
                          dataKey="fpr" 
                          stroke="#A0A0A5" 
                          label={{ value: 'False Positive Rate', position: 'insideBottom', offset: -5, fill: '#A0A0A5', fontSize: 10 }}
                          domain={[0, 1]}
                        />
                        <YAxis 
                          dataKey="tpr" 
                          stroke="#A0A0A5" 
                          label={{ value: 'True Positive Rate', angle: -90, position: 'insideLeft', fill: '#A0A0A5', fontSize: 10 }}
                          domain={[0, 1]}
                        />
                        <Tooltip
                          contentStyle={{ backgroundColor: "#151519", border: "1px solid #1F1F23", borderRadius: "8px", fontSize: "12px" }}
                        />
                        <Line type="monotone" dataKey="tpr" stroke="#00E0A4" strokeWidth={3} dot={false} name="Model ROC" />
                        <Line 
                          data={[{fpr: 0, tpr: 0}, {fpr: 1, tpr: 1}]} 
                          dataKey="tpr" 
                          stroke="#A0A0A5" 
                          strokeWidth={1} 
                          strokeDasharray="5 5" 
                          dot={false} 
                          name="Random Guess"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="bg-[#151519] rounded-lg border border-[#1F1F23]">
                  <div className="p-4 border-b border-[#1F1F23]">
                    <h3 className="text-sm">Tree-Based Models</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-[#1F1F23]">
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Model</th>
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Task</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">Accuracy / R²</th>
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Structure</th>
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Prediction</th>
                        </tr>
                      </thead>
                      <tbody>
                        {decisionTreeModels
                          .filter(model => 
                            model.model.toLowerCase().includes(searchTrees.toLowerCase()) ||
                            model.task.toLowerCase().includes(searchTrees.toLowerCase()) ||
                            model.prediction.toLowerCase().includes(searchTrees.toLowerCase())
                          )
                          .map((model, idx) => (
                            <tr key={idx} className="border-b border-[#1F1F23] hover:bg-[#0D0D0F] transition-colors">
                              <td className="p-3 text-sm">{model.model}</td>
                              <td className="p-3 text-sm text-[#2979FF]">{model.task}</td>
                              <td className="p-3 text-sm text-right text-[#00E0A4]">
                                {model.accuracy ? `${model.accuracy.toFixed(1)}%` : model.r2?.toFixed(2)}
                              </td>
                              <td className="p-3 text-sm text-[#A0A0A5]">
                                {model.depth && `Depth: ${model.depth}`}
                                {model.trees && `Trees: ${model.trees}`}
                                {model.estimators && `Est: ${model.estimators}`}
                              </td>
                              <td className="p-3">
                                <Badge className="bg-[#00E0A4]/20 text-[#00E0A4] border-[#00E0A4]/30 text-xs">
                                  {model.prediction}
                                </Badge>
                              </td>
                            </tr>
                          ))
                        }
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Monte Carlo Tab */}
            <TabsContent value="montecarlo" className="mt-0">
              <div className="space-y-4">
                <div className="bg-[#151519] rounded-lg border border-[#1F1F23] p-4">
                  <h3 className="text-sm mb-4">Monte Carlo Simulations</h3>
                  <p className="text-xs text-[#A0A0A5] mb-4">
                    Stochastic simulations for portfolio risk, option pricing, path dependency, and scenario analysis.
                  </p>
                </div>

                {/* Search Input */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#A0A0A5]" />
                  <Input
                    placeholder="Search by simulation type or horizon..."
                    value={searchMonteCarlo}
                    onChange={(e) => setSearchMonteCarlo(e.target.value)}
                    className="pl-10 bg-[#151519] border-[#1F1F23] text-sm"
                  />
                </div>

                {/* Monte Carlo Visualizations */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#151519] rounded-lg border border-[#1F1F23] p-4">
                    <h3 className="text-sm mb-2">Simulated Price Paths (10,000 runs)</h3>
                    <p className="text-xs text-[#A0A0A5] mb-3">Percentile bands showing range of possible outcomes</p>
                    <ResponsiveContainer width="100%" height={280}>
                      <AreaChart data={monteCarloPathsData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1F1F23" />
                        <XAxis 
                          dataKey="day" 
                          stroke="#A0A0A5" 
                          label={{ value: 'Trading Days', position: 'insideBottom', offset: -5, fill: '#A0A0A5', fontSize: 10 }} 
                        />
                        <YAxis 
                          stroke="#A0A0A5" 
                          label={{ value: 'Portfolio Value ($)', angle: -90, position: 'insideLeft', fill: '#A0A0A5', fontSize: 10 }}
                          domain={[75, 155]}
                        />
                        <Tooltip
                          contentStyle={{ backgroundColor: "#151519", border: "1px solid #1F1F23", borderRadius: "8px", fontSize: "12px" }}
                        />
                        <Legend />
                        <Area type="monotone" dataKey="p95" stroke="#FF5252" fill="#FF5252" fillOpacity={0.1} name="95th %ile" />
                        <Area type="monotone" dataKey="p75" stroke="#FF9800" fill="#FF9800" fillOpacity={0.1} name="75th %ile" />
                        <Area type="monotone" dataKey="p25" stroke="#00E0A4" fill="#00E0A4" fillOpacity={0.1} name="25th %ile" />
                        <Area type="monotone" dataKey="p5" stroke="#2979FF" fill="#2979FF" fillOpacity={0.1} name="5th %ile" />
                        <Line type="monotone" dataKey="p50" stroke="#00E0A4" strokeWidth={2} dot={false} name="Median" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="bg-[#151519] rounded-lg border border-[#1F1F23] p-4">
                    <h3 className="text-sm mb-2">VaR Distribution (95% Confidence)</h3>
                    <p className="text-xs text-[#A0A0A5] mb-3">Frequency of losses - VaR cutoff at -4.2% (left tail)</p>
                    <ResponsiveContainer width="100%" height={280}>
                      <AreaChart data={varDistribution}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1F1F23" />
                        <XAxis 
                          dataKey="loss" 
                          stroke="#A0A0A5" 
                          label={{ value: 'Returns (%)', position: 'insideBottom', offset: -5, fill: '#A0A0A5', fontSize: 10 }} 
                        />
                        <YAxis 
                          stroke="#A0A0A5" 
                          label={{ value: 'Frequency', angle: -90, position: 'insideLeft', fill: '#A0A0A5', fontSize: 10 }} 
                        />
                        <Tooltip
                          contentStyle={{ backgroundColor: "#151519", border: "1px solid #1F1F23", borderRadius: "8px", fontSize: "12px" }}
                        />
                        <Area type="monotone" dataKey="freq" stroke="#00E0A4" fill="#00E0A4" fillOpacity={0.4} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="bg-[#151519] rounded-lg border border-[#1F1F23]">
                  <div className="p-4 border-b border-[#1F1F23]">
                    <h3 className="text-sm">Active Simulations</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-[#1F1F23]">
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Simulation Type</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">Runs</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">Confidence</th>
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Result</th>
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Horizon</th>
                        </tr>
                      </thead>
                      <tbody>
                        {monteCarloSims
                          .filter(sim => 
                            sim.simulation.toLowerCase().includes(searchMonteCarlo.toLowerCase()) ||
                            sim.horizon.toLowerCase().includes(searchMonteCarlo.toLowerCase())
                          )
                          .map((sim, idx) => (
                            <tr key={idx} className="border-b border-[#1F1F23] hover:bg-[#0D0D0F] transition-colors">
                              <td className="p-3 text-sm">{sim.simulation}</td>
                              <td className="p-3 text-sm text-right">{sim.runs.toLocaleString()}</td>
                              <td className="p-3 text-sm text-right">{sim.confidence}%</td>
                              <td className="p-3 text-sm">
                                {sim.var && `VaR: $${sim.var}M, CVaR: $${sim.cvar}M`}
                                {sim.value && `Value: $${sim.value}, σ: ${sim.std}`}
                                {sim.expected && `E[X]: ${sim.expected}, Range: ${sim.range}`}
                                {sim.probability && `PD: ${sim.probability}%, LGD: ${sim.loss}M`}
                              </td>
                              <td className="p-3 text-sm text-[#A0A0A5]">{sim.horizon}</td>
                            </tr>
                          ))
                        }
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Markov Models Tab */}
            <TabsContent value="markov" className="mt-0">
              <div className="space-y-4">
                <div className="bg-[#151519] rounded-lg border border-[#1F1F23] p-4">
                  <h3 className="text-sm mb-4">Markov Chain Models</h3>
                  <p className="text-xs text-[#A0A0A5] mb-4">
                    State-based models for regime detection, credit transitions, and market state forecasting.
                  </p>
                </div>

                {/* Search Input */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#A0A0A5]" />
                  <Input
                    placeholder="Search by model or current state..."
                    value={searchMarkov}
                    onChange={(e) => setSearchMarkov(e.target.value)}
                    className="pl-10 bg-[#151519] border-[#1F1F23] text-sm"
                  />
                </div>

                {/* Markov Chain Visualizations */}
                <div className="bg-[#151519] rounded-lg border border-[#1F1F23] p-4">
                  <h3 className="text-sm mb-2">Regime State Probabilities Over Time</h3>
                  <p className="text-xs text-[#A0A0A5] mb-3">Hidden Markov Model showing market regime transitions</p>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={markovStateData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1F1F23" />
                      <XAxis 
                        dataKey="time" 
                        stroke="#A0A0A5"
                        label={{ value: 'Time Period', position: 'insideBottom', offset: -5, fill: '#A0A0A5', fontSize: 10 }}
                      />
                      <YAxis 
                        stroke="#A0A0A5" 
                        domain={[0, 1]} 
                        label={{ value: 'State Probability', angle: -90, position: 'insideLeft', fill: '#A0A0A5', fontSize: 10 }} 
                      />
                      <Tooltip
                        contentStyle={{ backgroundColor: "#151519", border: "1px solid #1F1F23", borderRadius: "8px", fontSize: "12px" }}
                      />
                      <Legend />
                      <Line type="monotone" dataKey="bull" stroke="#00E0A4" strokeWidth={3} name="Bull Market" dot={{ r: 4 }} />
                      <Line type="monotone" dataKey="bear" stroke="#FF5252" strokeWidth={3} name="Bear Market" dot={{ r: 4 }} />
                      <Line type="monotone" dataKey="neutral" stroke="#2979FF" strokeWidth={3} name="Neutral" dot={{ r: 4 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* Transition Matrix Visualization */}
                <div className="bg-[#151519] rounded-lg border border-[#1F1F23] p-4">
                  <h3 className="text-sm mb-2">Transition Matrix (Current State: Bull)</h3>
                  <p className="text-xs text-[#A0A0A5] mb-3">Probabilities of moving from current state to next state</p>
                  <div className="grid grid-cols-4 gap-2">
                    <div className="text-xs text-[#A0A0A5] text-center"></div>
                    <div className="text-xs text-[#A0A0A5] text-center">→ Bull</div>
                    <div className="text-xs text-[#A0A0A5] text-center">→ Bear</div>
                    <div className="text-xs text-[#A0A0A5] text-center">→ Neutral</div>
                    
                    <div className="text-xs text-[#A0A0A5]">Bull →</div>
                    <div className="bg-[#00E0A4]/20 border border-[#00E0A4]/40 rounded p-2 text-center text-xs text-[#00E0A4]">0.88</div>
                    <div className="bg-[#FF5252]/20 border border-[#FF5252]/40 rounded p-2 text-center text-xs text-[#FF5252]">0.05</div>
                    <div className="bg-[#2979FF]/20 border border-[#2979FF]/40 rounded p-2 text-center text-xs text-[#2979FF]">0.07</div>
                    
                    <div className="text-xs text-[#A0A0A5]">Bear →</div>
                    <div className="bg-[#00E0A4]/20 border border-[#00E0A4]/40 rounded p-2 text-center text-xs text-[#00E0A4]">0.12</div>
                    <div className="bg-[#FF5252]/20 border border-[#FF5252]/40 rounded p-2 text-center text-xs text-[#FF5252]">0.75</div>
                    <div className="bg-[#2979FF]/20 border border-[#2979FF]/40 rounded p-2 text-center text-xs text-[#2979FF]">0.13</div>
                    
                    <div className="text-xs text-[#A0A0A5]">Neutral →</div>
                    <div className="bg-[#00E0A4]/20 border border-[#00E0A4]/40 rounded p-2 text-center text-xs text-[#00E0A4]">0.20</div>
                    <div className="bg-[#FF5252]/20 border border-[#FF5252]/40 rounded p-2 text-center text-xs text-[#FF5252]">0.15</div>
                    <div className="bg-[#2979FF]/20 border border-[#2979FF]/40 rounded p-2 text-center text-xs text-[#2979FF]">0.65</div>
                  </div>
                </div>

                <div className="bg-[#151519] rounded-lg border border-[#1F1F23]">
                  <div className="p-4 border-b border-[#1F1F23]">
                    <h3 className="text-sm">Markov Models - Current States</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-[#1F1F23]">
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Model</th>
                          <th className="text-left text-xs text-[#A0A0A5] p-3">States</th>
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Current State</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">State Probability</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">Transition Risk</th>
                        </tr>
                      </thead>
                      <tbody>
                        {markovModels
                          .filter(model => 
                            model.model.toLowerCase().includes(searchMarkov.toLowerCase()) ||
                            model.current.toLowerCase().includes(searchMarkov.toLowerCase())
                          )
                          .map((model, idx) => (
                            <tr key={idx} className="border-b border-[#1F1F23] hover:bg-[#0D0D0F] transition-colors">
                              <td className="p-3 text-sm">{model.model}</td>
                              <td className="p-3 text-sm text-[#A0A0A5]">{model.states.join(", ")}</td>
                              <td className="p-3">
                                <Badge className="bg-[#2979FF]/20 text-[#2979FF] border-[#2979FF]/30 text-xs">
                                  {model.current}
                                </Badge>
                              </td>
                              <td className="p-3 text-sm text-right text-[#00E0A4]">{(model.probability * 100).toFixed(0)}%</td>
                              <td className="p-3 text-sm text-right">{(model.transition * 100).toFixed(0)}%</td>
                            </tr>
                          ))
                        }
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Time Series Tab */}
            <TabsContent value="timeseries" className="mt-0">
              <div className="space-y-4">
                <div className="bg-[#151519] rounded-lg border border-[#1F1F23] p-4">
                  <h3 className="text-sm mb-4">Time Series Forecasting Models</h3>
                  <p className="text-xs text-[#A0A0A5] mb-4">
                    ARIMA, GARCH, Prophet, and VAR models for price and volatility forecasting.
                  </p>
                </div>

                {/* Search Input */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#A0A0A5]" />
                  <Input
                    placeholder="Search by symbol or model..."
                    value={searchTimeSeries}
                    onChange={(e) => setSearchTimeSeries(e.target.value)}
                    className="pl-10 bg-[#151519] border-[#1F1F23] text-sm"
                  />
                </div>

                {/* Time Series Visualizations */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#151519] rounded-lg border border-[#1F1F23] p-4">
                    <h3 className="text-sm mb-2">ARIMA Forecast with 95% Confidence Intervals</h3>
                    <p className="text-xs text-[#A0A0A5] mb-3">Historical data + 20-day ahead prediction with uncertainty bands</p>
                    <ResponsiveContainer width="100%" height={280}>
                      <LineChart data={forecastData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1F1F23" />
                        <XAxis 
                          dataKey="date" 
                          stroke="#A0A0A5"
                          label={{ value: 'Date', position: 'insideBottom', offset: -5, fill: '#A0A0A5', fontSize: 10 }}
                        />
                        <YAxis 
                          stroke="#A0A0A5" 
                          domain={[175, 205]} 
                          label={{ value: 'Price ($)', angle: -90, position: 'insideLeft', fill: '#A0A0A5', fontSize: 10 }} 
                        />
                        <Tooltip
                          contentStyle={{ backgroundColor: "#151519", border: "1px solid #1F1F23", borderRadius: "8px", fontSize: "12px" }}
                        />
                        <Legend />
                        <Area type="monotone" dataKey="upper" stroke="none" fill="#2979FF" fillOpacity={0.1} name="Upper CI" />
                        <Area type="monotone" dataKey="lower" stroke="none" fill="#2979FF" fillOpacity={0.1} name="Lower CI" />
                        <Line type="monotone" dataKey="actual" stroke="#00E0A4" strokeWidth={2} name="Actual Price" connectNulls={false} dot={{ r: 3 }} />
                        <Line type="monotone" dataKey="forecast" stroke="#2979FF" strokeWidth={2} strokeDasharray="5 5" name="Forecast" connectNulls dot={{ r: 3 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="bg-[#151519] rounded-lg border border-[#1F1F23] p-4">
                    <h3 className="text-sm mb-2">Autocorrelation Function (ACF)</h3>
                    <p className="text-xs text-[#A0A0A5] mb-3">Correlation of series with its own lagged values (AR order selection)</p>
                    <ResponsiveContainer width="100%" height={280}>
                      <BarChart data={acfData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1F1F23" />
                        <XAxis 
                          dataKey="lag" 
                          stroke="#A0A0A5"
                          label={{ value: 'Lag', position: 'insideBottom', offset: -5, fill: '#A0A0A5', fontSize: 10 }}
                        />
                        <YAxis 
                          stroke="#A0A0A5" 
                          domain={[-0.2, 1]} 
                          label={{ value: 'Correlation', angle: -90, position: 'insideLeft', fill: '#A0A0A5', fontSize: 10 }} 
                        />
                        <Tooltip
                          contentStyle={{ backgroundColor: "#151519", border: "1px solid #1F1F23", borderRadius: "8px", fontSize: "12px" }}
                        />
                        <Bar dataKey="acf">
                          {acfData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.acf >= 0 ? '#00E0A4' : '#FF5252'} />
                          ))}
                        </Bar>
                        <Line 
                          data={[{lag: 0, acf: 0.2}, {lag: 10, acf: 0.2}]} 
                          dataKey="acf" 
                          stroke="#A0A0A5" 
                          strokeWidth={1} 
                          strokeDasharray="3 3" 
                          dot={false}
                        />
                        <Line 
                          data={[{lag: 0, acf: -0.2}, {lag: 10, acf: -0.2}]} 
                          dataKey="acf" 
                          stroke="#A0A0A5" 
                          strokeWidth={1} 
                          strokeDasharray="3 3" 
                          dot={false}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="bg-[#151519] rounded-lg border border-[#1F1F23]">
                  <div className="p-4 border-b border-[#1F1F23]">
                    <h3 className="text-sm">Active Forecasts</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-[#1F1F23]">
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Symbol</th>
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Model</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">Forecast</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">Confidence %</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">MAE</th>
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Horizon</th>
                        </tr>
                      </thead>
                      <tbody>
                        {timeSeriesForecasts
                          .filter(forecast => 
                            forecast.symbol.toLowerCase().includes(searchTimeSeries.toLowerCase()) ||
                            forecast.model.toLowerCase().includes(searchTimeSeries.toLowerCase())
                          )
                          .map((forecast, idx) => (
                            <tr key={idx} className="border-b border-[#1F1F23] hover:bg-[#0D0D0F] transition-colors">
                              <td className="p-3 text-sm text-[#2979FF]">{forecast.symbol}</td>
                              <td className="p-3 text-sm text-[#A0A0A5]">{forecast.model}</td>
                              <td className="p-3 text-sm text-right text-[#00E0A4]">
                                {typeof forecast.forecast === 'string' ? forecast.forecast : forecast.forecast.toLocaleString()}
                              </td>
                              <td className="p-3 text-sm text-right">{forecast.confidence}%</td>
                              <td className="p-3 text-sm text-right">{forecast.mae.toLocaleString()}</td>
                              <td className="p-3 text-sm text-[#A0A0A5]">{forecast.horizon}</td>
                            </tr>
                          ))
                        }
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Factor Models Tab */}
            <TabsContent value="factors" className="mt-0">
              <div className="space-y-4">
                <div className="bg-[#151519] rounded-lg border border-[#1F1F23] p-4">
                  <h3 className="text-sm mb-4">Multi-Factor Models (Fama-French, Carhart)</h3>
                  <p className="text-xs text-[#A0A0A5] mb-4">
                    Factor attribution analysis for portfolio returns decomposition and risk management.
                  </p>
                </div>

                {/* Search Input */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#A0A0A5]" />
                  <Input
                    placeholder="Search by factor name..."
                    value={searchFactors}
                    onChange={(e) => setSearchFactors(e.target.value)}
                    className="pl-10 bg-[#151519] border-[#1F1F23] text-sm"
                  />
                </div>

                {/* Factor Model Visualizations */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#151519] rounded-lg border border-[#1F1F23] p-4">
                    <h3 className="text-sm mb-2">Factor Returns Performance (YTD)</h3>
                    <p className="text-xs text-[#A0A0A5] mb-3">Monthly returns for each Fama-French factor</p>
                    <ResponsiveContainer width="100%" height={280}>
                      <LineChart data={factorReturnsData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1F1F23" />
                        <XAxis 
                          dataKey="date" 
                          stroke="#A0A0A5"
                          label={{ value: 'Month', position: 'insideBottom', offset: -5, fill: '#A0A0A5', fontSize: 10 }}
                        />
                        <YAxis 
                          stroke="#A0A0A5" 
                          label={{ value: 'Returns (%)', angle: -90, position: 'insideLeft', fill: '#A0A0A5', fontSize: 10 }} 
                        />
                        <Tooltip
                          contentStyle={{ backgroundColor: "#151519", border: "1px solid #1F1F23", borderRadius: "8px", fontSize: "12px" }}
                        />
                        <Legend />
                        <Line type="monotone" dataKey="market" stroke="#00E0A4" strokeWidth={2} name="Market" dot={{ r: 3 }} />
                        <Line type="monotone" dataKey="size" stroke="#2979FF" strokeWidth={2} name="Size (SMB)" dot={{ r: 3 }} />
                        <Line type="monotone" dataKey="value" stroke="#FF9800" strokeWidth={2} name="Value (HML)" dot={{ r: 3 }} />
                        <Line type="monotone" dataKey="momentum" stroke="#9C27B0" strokeWidth={2} name="Momentum" dot={{ r: 3 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="bg-[#151519] rounded-lg border border-[#1F1F23] p-4">
                    <h3 className="text-sm mb-2">Factor Attribution (Portfolio Return Decomposition)</h3>
                    <p className="text-xs text-[#A0A0A5] mb-3">Contribution of each factor to total portfolio return</p>
                    <ResponsiveContainer width="100%" height={280}>
                      <BarChart data={factorContributionData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1F1F23" />
                        <XAxis 
                          dataKey="name" 
                          stroke="#A0A0A5"
                          label={{ value: 'Factor', position: 'insideBottom', offset: -5, fill: '#A0A0A5', fontSize: 10 }}
                        />
                        <YAxis 
                          stroke="#A0A0A5" 
                          label={{ value: 'Contribution (%)', angle: -90, position: 'insideLeft', fill: '#A0A0A5', fontSize: 10 }} 
                        />
                        <Tooltip
                          contentStyle={{ backgroundColor: "#151519", border: "1px solid #1F1F23", borderRadius: "8px", fontSize: "12px" }}
                        />
                        <Bar dataKey="contribution">
                          {factorContributionData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.contribution >= 0 ? '#00E0A4' : '#FF5252'} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Beta Exposures */}
                <div className="bg-[#151519] rounded-lg border border-[#1F1F23] p-4">
                  <h3 className="text-sm mb-2">Factor Loadings (Beta Exposures)</h3>
                  <p className="text-xs text-[#A0A0A5] mb-3">Sensitivity of portfolio to each systematic factor</p>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={factorContributionData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="#1F1F23" />
                      <XAxis type="number" stroke="#A0A0A5" domain={[-0.5, 1.5]} />
                      <YAxis type="category" dataKey="name" stroke="#A0A0A5" width={80} />
                      <Tooltip
                        contentStyle={{ backgroundColor: "#151519", border: "1px solid #1F1F23", borderRadius: "8px", fontSize: "12px" }}
                      />
                      <Bar dataKey="beta">
                        {factorContributionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={Math.abs(entry.beta) > 0.5 ? '#00E0A4' : '#2979FF'} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="bg-[#151519] rounded-lg border border-[#1F1F23]">
                  <div className="p-4 border-b border-[#1F1F23]">
                    <h3 className="text-sm">Factor Exposures & Attribution</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-[#1F1F23]">
                          <th className="text-left text-xs text-[#A0A0A5] p-3">Factor</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">Beta</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">t-Statistic</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">p-Value</th>
                          <th className="text-right text-xs text-[#A0A0A5] p-3">Contribution %</th>
                        </tr>
                      </thead>
                      <tbody>
                        {factorModels
                          .filter(factor => 
                            factor.factor.toLowerCase().includes(searchFactors.toLowerCase())
                          )
                          .map((factor, idx) => (
                            <tr key={idx} className="border-b border-[#1F1F23] hover:bg-[#0D0D0F] transition-colors">
                              <td className="p-3 text-sm">{factor.factor}</td>
                              <td className={`p-3 text-sm text-right ${factor.beta >= 0 ? 'text-[#00E0A4]' : 'text-[#FF5252]'}`}>
                                {factor.beta.toFixed(2)}
                              </td>
                              <td className="p-3 text-sm text-right">{factor.tStat.toFixed(1)}</td>
                              <td className="p-3 text-sm text-right text-[#A0A0A5]">{factor.pValue.toFixed(3)}</td>
                              <td className={`p-3 text-sm text-right ${factor.contribution >= 0 ? 'text-[#00E0A4]' : 'text-[#FF5252]'}`}>
                                {factor.contribution >= 0 ? '+' : ''}{factor.contribution.toFixed(1)}%
                              </td>
                            </tr>
                          ))
                        }
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
