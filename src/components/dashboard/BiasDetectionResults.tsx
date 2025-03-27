
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/Card";
import { Candidate } from "./Dashboard";
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar } from "recharts";

interface BiasDetectionResultsProps {
  candidates: Candidate[];
}

const BiasDetectionResults: React.FC<BiasDetectionResultsProps> = ({ candidates }) => {
  const [selectedMetric, setSelectedMetric] = useState<"gender" | "ethnicity" | "age" | "overall">("overall");

  // Calculate average bias metrics
  const averageBias = {
    gender: candidates.reduce((sum, c) => sum + c.biasMetrics.gender, 0) / candidates.length,
    ethnicity: candidates.reduce((sum, c) => sum + c.biasMetrics.ethnicity, 0) / candidates.length,
    age: candidates.reduce((sum, c) => sum + c.biasMetrics.age, 0) / candidates.length,
    overall: candidates.reduce((sum, c) => sum + c.biasMetrics.overall, 0) / candidates.length,
  };

  // Prepare data for pie chart
  const pieData = [
    { name: "Gender Bias", value: averageBias.gender },
    { name: "No Gender Bias", value: 100 - averageBias.gender },
  ];

  // Prepare data for bias distribution chart
  const distributionData = candidates.map((c) => ({
    name: c.name.split(" ")[0],
    gender: c.biasMetrics.gender,
    ethnicity: c.biasMetrics.ethnicity,
    age: c.biasMetrics.age,
    overall: c.biasMetrics.overall,
  }));

  // Prepare data for bar chart
  const barData = [
    {
      name: "Gender",
      value: averageBias.gender,
      neutrality: 100 - averageBias.gender,
    },
    {
      name: "Ethnicity",
      value: averageBias.ethnicity,
      neutrality: 100 - averageBias.ethnicity,
    },
    {
      name: "Age",
      value: averageBias.age,
      neutrality: 100 - averageBias.age,
    },
  ];

  const COLORS = ["#ef4444", "#22c55e"];

  const renderBiasScore = (score: number) => {
    const biasPercent = score;
    const neutralityPercent = 100 - biasPercent;
    let color = "#10b981"; // Green
    let message = "Excellent";

    if (biasPercent > 20) {
      color = "#0ea5e9"; // Blue
      message = "Good";
    }
    if (biasPercent > 40) {
      color = "#f59e0b"; // Amber
      message = "Fair";
    }
    if (biasPercent > 60) {
      color = "#ef4444"; // Red
      message = "Poor";
    }

    return (
      <div className="flex flex-col items-center justify-center p-6">
        <div className="relative w-40 h-40">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="10"
            />
            {/* Progress circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke={color}
              strokeWidth="10"
              strokeDasharray={`${neutralityPercent * 2.83} ${
                biasPercent * 2.83
              }`}
              strokeLinecap="round"
              transform="rotate(-90 50 50)"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold">{neutralityPercent}%</span>
            <span className="text-sm text-muted-foreground">Neutrality</span>
          </div>
        </div>
        <div className="mt-4 text-center">
          <h3 className="text-lg font-medium" style={{ color }}>
            {message}
          </h3>
          <p className="text-sm text-muted-foreground">
            {message === "Excellent"
              ? "Your screening process shows excellent fairness."
              : message === "Good"
              ? "Your screening shows good fairness with some room for improvement."
              : message === "Fair"
              ? "Your screening shows moderate fairness with significant room for improvement."
              : "Your screening shows poor fairness and needs attention."}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle>Bias Detection Score</CardTitle>
          <CardDescription>
            Overall neutrality score for your candidate screening
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col">
            {renderBiasScore(averageBias[selectedMetric])}

            <div className="mt-6">
              <div className="flex justify-between mb-2">
                <h4 className="text-sm font-medium">Bias Metrics</h4>
              </div>
              <div className="space-y-1">
                <button
                  onClick={() => setSelectedMetric("overall")}
                  className={`w-full py-2 px-3 text-left text-sm rounded-lg transition-colors ${
                    selectedMetric === "overall"
                      ? "bg-secondary font-medium"
                      : "hover:bg-secondary/50"
                  }`}
                >
                  Overall Bias
                </button>
                <button
                  onClick={() => setSelectedMetric("gender")}
                  className={`w-full py-2 px-3 text-left text-sm rounded-lg transition-colors ${
                    selectedMetric === "gender"
                      ? "bg-secondary font-medium"
                      : "hover:bg-secondary/50"
                  }`}
                >
                  Gender Bias
                </button>
                <button
                  onClick={() => setSelectedMetric("ethnicity")}
                  className={`w-full py-2 px-3 text-left text-sm rounded-lg transition-colors ${
                    selectedMetric === "ethnicity"
                      ? "bg-secondary font-medium"
                      : "hover:bg-secondary/50"
                  }`}
                >
                  Ethnicity Bias
                </button>
                <button
                  onClick={() => setSelectedMetric("age")}
                  className={`w-full py-2 px-3 text-left text-sm rounded-lg transition-colors ${
                    selectedMetric === "age"
                      ? "bg-secondary font-medium"
                      : "hover:bg-secondary/50"
                  }`}
                >
                  Age Bias
                </button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Bias Distribution</CardTitle>
          <CardDescription>
            Bias detection metrics across all candidates
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={distributionData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey={selectedMetric}
                  name={`${selectedMetric.charAt(0).toUpperCase() + selectedMetric.slice(1)} Bias`}
                  stroke="#0ea5e9"
                  strokeWidth={2}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="lg:col-span-3">
        <CardHeader>
          <CardTitle>Bias Analysis by Category</CardTitle>
          <CardDescription>
            Breakdown of bias detection across different categories
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={barData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="value"
                  name="Bias Detected"
                  stackId="a"
                  fill="#ef4444"
                />
                <Bar
                  dataKey="neutrality"
                  name="Neutrality Score"
                  stackId="a"
                  fill="#22c55e"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-secondary/50 p-4 rounded-lg">
              <h4 className="font-medium mb-1">Gender Bias</h4>
              <p className="text-sm text-muted-foreground mb-3">
                {averageBias.gender <= 20
                  ? "Excellent gender neutrality in selection."
                  : averageBias.gender <= 40
                  ? "Good gender balance with minor bias."
                  : "Significant gender bias detected."}
              </p>
              <div className="flex items-center">
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${100 - averageBias.gender}%`,
                      backgroundColor: getColorForScore(100 - averageBias.gender),
                    }}
                  ></div>
                </div>
                <span className="ml-3 text-sm font-medium">
                  {Math.round(100 - averageBias.gender)}%
                </span>
              </div>
            </div>

            <div className="bg-secondary/50 p-4 rounded-lg">
              <h4 className="font-medium mb-1">Ethnicity Bias</h4>
              <p className="text-sm text-muted-foreground mb-3">
                {averageBias.ethnicity <= 20
                  ? "Excellent ethnic diversity in selection."
                  : averageBias.ethnicity <= 40
                  ? "Good ethnic diversity with minor bias."
                  : "Significant ethnic bias detected."}
              </p>
              <div className="flex items-center">
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${100 - averageBias.ethnicity}%`,
                      backgroundColor: getColorForScore(100 - averageBias.ethnicity),
                    }}
                  ></div>
                </div>
                <span className="ml-3 text-sm font-medium">
                  {Math.round(100 - averageBias.ethnicity)}%
                </span>
              </div>
            </div>

            <div className="bg-secondary/50 p-4 rounded-lg">
              <h4 className="font-medium mb-1">Age Bias</h4>
              <p className="text-sm text-muted-foreground mb-3">
                {averageBias.age <= 20
                  ? "Excellent age diversity in selection."
                  : averageBias.age <= 40
                  ? "Good age diversity with minor bias."
                  : "Significant age-related bias detected."}
              </p>
              <div className="flex items-center">
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${100 - averageBias.age}%`,
                      backgroundColor: getColorForScore(100 - averageBias.age),
                    }}
                  ></div>
                </div>
                <span className="ml-3 text-sm font-medium">
                  {Math.round(100 - averageBias.age)}%
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const getColorForScore = (score: number): string => {
  if (score >= 80) return "#10b981"; // green
  if (score >= 60) return "#0ea5e9"; // blue
  if (score >= 40) return "#f59e0b"; // amber
  return "#ef4444"; // red
};

export default BiasDetectionResults;
