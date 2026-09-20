import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { type Language, getTranslation } from "../translations";

// Donut chart showing the fixed/working/rolling capital split. Uses the
// same numbers already shown in text form elsewhere on the report — this
// is purely a visual layer on top of existing, already-verified data.
//
// Previously this only showed anything on hover, and never showed the
// percentage at all. Now: (1) each slice carries a permanent on-chart
// percentage label so the chart is never blank, and (2) a breakdown list
// underneath spells out name + amount + percentage for every slice,
// regardless of hover — this is the part that actually answers "how much
// money is going where."

interface CapitalSplitChartProps {
  fixedAmount: number;
  workingAmount: number;
  rollingAmount: number;
  language: Language;
}

const COLORS = ["#2F5233", "#B8862B", "#9B4A2B"];

const formatINR = (value: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(value);

export function CapitalSplitChart({ fixedAmount, workingAmount, rollingAmount, language }: CapitalSplitChartProps) {
  const t = getTranslation(language);

  const data = [
    { name: t.fixedCapitalLegend, value: fixedAmount },
    { name: t.workingCapitalLegend, value: workingAmount },
    { name: t.rollingCapitalLegend, value: rollingAmount },
  ];

  const total = fixedAmount + workingAmount + rollingAmount;

  return (
    <div>
      <div style={{ width: "100%", height: 260 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={90}
              paddingAngle={2}
              label={({ percent }) => `${((percent ?? 0) * 100).toFixed(0)}%`}
              labelLine={false}
            >
              {data.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: any, name: any) => [
                `${formatINR(Number(value))} (${total > 0 ? ((Number(value) / total) * 100).toFixed(0) : 0}%)`,
                name,
              ]}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", marginTop: "0.25rem" }}>
        {data.map((item, index) => (
          <div key={index} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "0.85rem" }}>
            <span style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "#2B2B22" }}>
              <span style={{ width: 10, height: 10, borderRadius: 2, backgroundColor: COLORS[index % COLORS.length], display: "inline-block" }} />
              {item.name}
            </span>
            <span style={{ fontWeight: 600, color: "#2B2B22" }}>
              {formatINR(item.value)}{" "}
              <span style={{ fontWeight: 400, color: "#5C5A4C" }}>
                ({total > 0 ? ((item.value / total) * 100).toFixed(0) : 0}%)
              </span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
