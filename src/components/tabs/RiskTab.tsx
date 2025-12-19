import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";
import { AlertTriangle, TrendingDown, Activity } from "lucide-react";

export function RiskTab() {
  // Mock data
  const varData = Array.from({ length: 30 }, (_, i) => ({
    day: `D${i + 1}`,
    var: 40 + Math.random() * 15,
    upperBound: 55,
    lowerBound: 35,
  }));

  const stressTests = [
    { scenario: "Market Crash (-20%)", pnlImpact: -15.2, severity: "high" },
    { scenario: "Interest Rate Spike (+2%)", pnlImpact: -8.4, severity: "medium" },
    { scenario: "Oil Price Shock (+50%)", pnlImpact: -5.6, severity: "medium" },
    { scenario: "Currency Crisis", pnlImpact: -12.3, severity: "high" },
    { scenario: "Tech Sector Collapse", pnlImpact: -18.7, severity: "high" },
    { scenario: "Credit Crunch", pnlImpact: -6.8, severity: "medium" },
  ];

  const riskMetrics = [
    { label: "VaR (95%)", value: "$42.3M", sublabel: "95% confidence", icon: AlertTriangle, color: "text-[#FF9800]" },
    { label: "CVaR (95%)", value: "$58.7M", sublabel: "Conditional VaR", icon: TrendingDown, color: "text-[#FF5252]" },
    { label: "Max Drawdown", value: "-8.2%", sublabel: "Last 30 days", icon: Activity, color: "text-[#FF5252]" },
  ];

  // Gauge data for volatility
  const targetVolatility = 12;
  const actualVolatility = 11.3;
  const volatilityPercentage = (actualVolatility / targetVolatility) * 100;

  return (
    <div className="space-y-4">
      {/* Top Row: Risk Metrics */}
      <div className="grid grid-cols-3 gap-4">
        {riskMetrics.map((metric, idx) => {
          const Icon = metric.icon;
          return (
            <div key={idx} className="bg-[#151519] rounded-lg border border-[#1F1F23] p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="text-xs text-[#A0A0A5] mb-1">{metric.label}</div>
                  <div className="text-3xl mb-1">{metric.value}</div>
                  <div className="text-xs text-[#A0A0A5]">{metric.sublabel}</div>
                </div>
                <Icon className={`h-6 w-6 ${metric.color}`} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Middle Row: VaR Chart & Volatility Gauge */}
      <div className="grid grid-cols-3 gap-4">
        {/* Rolling VaR Chart */}
        <div className="col-span-2 bg-[#151519] rounded-lg border border-[#1F1F23] p-4">
          <h3 className="text-sm mb-4">Rolling VaR (30 days)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={varData}>
              <defs>
                <linearGradient id="colorVar" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FF9800" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#FF9800" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1F1F23" />
              <XAxis dataKey="day" stroke="#A0A0A5" tick={{ fontSize: 10 }} interval={4} />
              <YAxis stroke="#A0A0A5" tick={{ fontSize: 10 }} domain={[30, 60]} />
              <Tooltip
                contentStyle={{ backgroundColor: "#0D0D0F", border: "1px solid #1F1F23", borderRadius: "4px", fontSize: "12px" }}
              />
              <Line type="monotone" dataKey="upperBound" stroke="#FF5252" strokeWidth={1} strokeDasharray="3 3" dot={false} />
              <Line type="monotone" dataKey="lowerBound" stroke="#00E0A4" strokeWidth={1} strokeDasharray="3 3" dot={false} />
              <Area type="monotone" dataKey="var" stroke="#FF9800" strokeWidth={2} fill="url(#colorVar)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Volatility Gauge */}
        <div className="bg-[#151519] rounded-lg border border-[#1F1F23] p-4">
          <h3 className="text-sm mb-4">Volatility vs Target</h3>
          <div className="flex flex-col items-center justify-center h-[280px]">
            {/* Circular Gauge */}
            <div className="relative w-48 h-48 mb-4">
              <svg className="w-full h-full transform -rotate-90">
                {/* Background Circle */}
                <circle
                  cx="96"
                  cy="96"
                  r="80"
                  stroke="#1F1F23"
                  strokeWidth="16"
                  fill="none"
                />
                {/* Progress Circle */}
                <circle
                  cx="96"
                  cy="96"
                  r="80"
                  stroke={volatilityPercentage > 100 ? "#FF5252" : "#00E0A4"}
                  strokeWidth="16"
                  fill="none"
                  strokeDasharray={`${(volatilityPercentage / 100) * 502.4} 502.4`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-3xl">{actualVolatility}%</div>
                <div className="text-xs text-[#A0A0A5]">Actual</div>
              </div>
            </div>
            
            <div className="space-y-2 w-full">
              <div className="flex items-center justify-between px-4">
                <span className="text-xs text-[#A0A0A5]">Target:</span>
                <span className="text-sm">{targetVolatility}%</span>
              </div>
              <div className="flex items-center justify-between px-4">
                <span className="text-xs text-[#A0A0A5]">Status:</span>
                <span className={`text-sm ${volatilityPercentage > 100 ? 'text-[#FF5252]' : 'text-[#00E0A4]'}`}>
                  {volatilityPercentage > 100 ? 'Above Target' : 'Within Target'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row: Stress Test Summary */}
      <div className="bg-[#151519] rounded-lg border border-[#1F1F23] p-4">
        <h3 className="text-sm mb-4">Stress Test Summary</h3>
        <div className="grid grid-cols-3 gap-4">
          {stressTests.map((test, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-lg border ${
                test.severity === 'high' 
                  ? 'bg-[#FF5252]/10 border-[#FF5252]/30' 
                  : 'bg-[#FF9800]/10 border-[#FF9800]/30'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="text-sm">{test.scenario}</h4>
                <span className={`text-xs px-2 py-0.5 rounded ${
                  test.severity === 'high' 
                    ? 'bg-[#FF5252]/20 text-[#FF5252]' 
                    : 'bg-[#FF9800]/20 text-[#FF9800]'
                }`}>
                  {test.severity.toUpperCase()}
                </span>
              </div>
              <div className="text-2xl text-[#FF5252]">{test.pnlImpact}%</div>
              <div className="text-xs text-[#A0A0A5] mt-1">PnL Impact</div>
              
              {/* Impact Bar */}
              <div className="mt-3 bg-[#1F1F23] rounded-full h-2 overflow-hidden">
                <div
                  className={`h-full ${
                    test.severity === 'high' ? 'bg-[#FF5252]' : 'bg-[#FF9800]'
                  }`}
                  style={{ width: `${Math.abs(test.pnlImpact) * 5}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
