import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from "recharts";
import { type Language, getTranslation } from "../translations";

// Bar chart of the quarterly EMI schedule — principal and interest stacked
// per quarter. Same data already shown in the report's financial plan
// section, just visualized. Moratorium quarters naturally show as
// interest-only (no principal bar) since that's what the backend computes.
// Legend labels are now localized via `language`.

interface InstallmentRow {
  period_label: string;
  interest_component: number;
  principal_component: number;
}

interface EMIScheduleChartProps {
  schedule: InstallmentRow[];
  language: Language;
}

export function EMIScheduleChart({ schedule, language }: EMIScheduleChartProps) {
  const t = getTranslation(language);

  const formatINR = (value: number) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(value);

  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <BarChart data={schedule} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E2DCC9" />
          <XAxis dataKey="period_label" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
          <Tooltip formatter={(value: any) => formatINR(Number(value))} />
          <Legend />
          <Bar dataKey="interest_component" stackId="a" name={t.interestLegend} fill="#B8862B" />
          <Bar dataKey="principal_component" stackId="a" name={t.principalLegend} fill="#2F5233" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
