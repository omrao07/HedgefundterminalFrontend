import { useState } from "react";
import { TrendingUp, TrendingDown, Activity } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export function RegionsTab() {
  const [expandedRegion, setExpandedRegion] = useState<string | null>(null);

  const regions = [
    {
      name: "US",
      pnl: 12.4,
      strategies: 15,
      exposure: 45.2,
      leverage: 2.1,
      volatility: 11.3,
      sparkline: Array.from({ length: 20 }, () => Math.random() * 100 + 50),
    },
    {
      name: "India",
      pnl: 8.7,
      strategies: 8,
      exposure: 22.8,
      leverage: 1.8,
      volatility: 14.2,
      sparkline: Array.from({ length: 20 }, () => Math.random() * 100 + 40),
    },
    {
      name: "China",
      pnl: -2.3,
      strategies: 6,
      exposure: 15.4,
      leverage: 1.5,
      volatility: 16.8,
      sparkline: Array.from({ length: 20 }, () => Math.random() * 100 + 30),
    },
    {
      name: "Europe",
      pnl: 5.6,
      strategies: 9,
      exposure: 10.3,
      leverage: 1.9,
      volatility: 9.8,
      sparkline: Array.from({ length: 20 }, () => Math.random() * 100 + 45),
    },
    {
      name: "Japan",
      pnl: 3.2,
      strategies: 5,
      exposure: 6.3,
      leverage: 1.4,
      volatility: 8.5,
      sparkline: Array.from({ length: 20 }, () => Math.random() * 100 + 35),
    },
  ];

  // Mock sub-region data
  const subRegionData = [
    { name: "Northeast", exposure: 35, pnl: 15.2 },
    { name: "West Coast", exposure: 28, pnl: 12.8 },
    { name: "Midwest", exposure: 20, pnl: 9.4 },
    { name: "Southeast", exposure: 17, pnl: 11.1 },
  ];

  const handleRegionClick = (regionName: string) => {
    setExpandedRegion(expandedRegion === regionName ? null : regionName);
  };

  return (
    <div className="space-y-4">
      {!expandedRegion ? (
        /* Region Cards Grid */
        <div className="grid grid-cols-5 gap-4">
          {regions.map((region, idx) => (
            <button
              key={idx}
              onClick={() => handleRegionClick(region.name)}
              className="bg-[#151519] rounded-lg border border-[#1F1F23] p-4 hover:border-[#00E0A4] transition-all text-left"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm">{region.name}</h3>
                <div className={`flex items-center gap-1 text-xs ${
                  region.pnl >= 0 ? 'text-[#00E0A4]' : 'text-[#FF5252]'
                }`}>
                  {region.pnl >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                  {region.pnl >= 0 ? '+' : ''}{region.pnl}%
                </div>
              </div>

              {/* Sparkline */}
              <div className="h-12 mb-3">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={region.sparkline.map((val, i) => ({ value: val }))}>
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke={region.pnl >= 0 ? '#00E0A4' : '#FF5252'} 
                      strokeWidth={1.5} 
                      dot={false} 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Metrics */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#A0A0A5]">Strategies</span>
                  <span className="text-[#E8E8E8]">{region.strategies}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#A0A0A5]">Exposure</span>
                  <span className="text-[#E8E8E8]">{region.exposure}%</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#A0A0A5]">Leverage</span>
                  <span className="text-[#E8E8E8]">{region.leverage}x</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#A0A0A5]">Volatility</span>
                  <span className="text-[#E8E8E8]">{region.volatility}%</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      ) : (
        /* Expanded Region View */
        <div className="space-y-4">
          {/* Back Button */}
          <button
            onClick={() => setExpandedRegion(null)}
            className="text-xs text-[#00E0A4] hover:text-[#00E0A4]/80"
          >
            ← Back to All Regions
          </button>

          {/* Region Overview */}
          <div className="bg-[#151519] rounded-lg border border-[#1F1F23] p-6">
            <h2 className="text-lg mb-6">{expandedRegion} - Detailed View</h2>
            
            <div className="grid grid-cols-4 gap-4 mb-6">
              {[
                { label: "Total PnL", value: "+12.4%", icon: TrendingUp },
                { label: "Active Strategies", value: "15", icon: Activity },
                { label: "Total Exposure", value: "45.2%", icon: Activity },
                { label: "Avg Volatility", value: "11.3%", icon: Activity },
              ].map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <div key={idx} className="bg-[#0D0D0F] rounded-lg border border-[#1F1F23] p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-[#A0A0A5]">{stat.label}</span>
                      <Icon className="h-4 w-4 text-[#00E0A4]" />
                    </div>
                    <div className="text-xl">{stat.value}</div>
                  </div>
                );
              })}
            </div>

            {/* Sub-region Charts */}
            <div className="grid grid-cols-2 gap-4">
              {/* Exposure by Sub-region */}
              <div>
                <h3 className="text-sm mb-3 text-[#A0A0A5]">Exposure by Sub-region</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={subRegionData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1F1F23" />
                    <XAxis dataKey="name" stroke="#A0A0A5" tick={{ fontSize: 11 }} />
                    <YAxis stroke="#A0A0A5" tick={{ fontSize: 11 }} />
                    <Tooltip
                      contentStyle={{ backgroundColor: "#0D0D0F", border: "1px solid #1F1F23", borderRadius: "4px", fontSize: "12px" }}
                    />
                    <Bar dataKey="exposure" fill="#2979FF" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* PnL by Sub-region */}
              <div>
                <h3 className="text-sm mb-3 text-[#A0A0A5]">PnL by Sub-region</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={subRegionData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1F1F23" />
                    <XAxis dataKey="name" stroke="#A0A0A5" tick={{ fontSize: 11 }} />
                    <YAxis stroke="#A0A0A5" tick={{ fontSize: 11 }} />
                    <Tooltip
                      contentStyle={{ backgroundColor: "#0D0D0F", border: "1px solid #1F1F23", borderRadius: "4px", fontSize: "12px" }}
                    />
                    <Bar dataKey="pnl" fill="#00E0A4" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
