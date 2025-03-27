
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/Card";
import { Candidate } from "./Dashboard";

interface CandidateRankingProps {
  candidates: Candidate[];
}

const CandidateRanking: React.FC<CandidateRankingProps> = ({ candidates }) => {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"matchScore" | "experience" | "name">("matchScore");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const toggleExpand = (id: string) => {
    setExpanded(expanded === id ? null : id);
  };

  const handleSort = (field: "matchScore" | "experience" | "name") => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder(field === "name" ? "asc" : "desc");
    }
  };

  const sortedCandidates = [...candidates].sort((a, b) => {
    if (sortBy === "name") {
      return sortOrder === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    } else {
      return sortOrder === "asc"
        ? a[sortBy] - b[sortBy]
        : b[sortBy] - a[sortBy];
    }
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Candidate Rankings</CardTitle>
        <CardDescription>
          Top candidates ranked by AI-based matching algorithm
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-hidden">
          <div className="grid grid-cols-12 py-3 px-4 bg-secondary rounded-t-lg">
            <div className="col-span-4 flex items-center">
              <button
                onClick={() => handleSort("name")}
                className="flex items-center font-medium text-sm"
              >
                Name
                {sortBy === "name" && (
                  <span className="ml-1">
                    {sortOrder === "asc" ? "↑" : "↓"}
                  </span>
                )}
              </button>
            </div>
            <div className="col-span-4 flex items-center justify-center">
              <button
                onClick={() => handleSort("matchScore")}
                className="flex items-center font-medium text-sm"
              >
                Match Score
                {sortBy === "matchScore" && (
                  <span className="ml-1">
                    {sortOrder === "asc" ? "↑" : "↓"}
                  </span>
                )}
              </button>
            </div>
            <div className="col-span-3 flex items-center justify-center">
              <button
                onClick={() => handleSort("experience")}
                className="flex items-center font-medium text-sm"
              >
                Experience
                {sortBy === "experience" && (
                  <span className="ml-1">
                    {sortOrder === "asc" ? "↑" : "↓"}
                  </span>
                )}
              </button>
            </div>
            <div className="col-span-1"></div>
          </div>

          <div className="divide-y divide-border">
            {sortedCandidates.map((candidate, index) => (
              <div
                key={candidate.id}
                className={`animate-fade-in transition-all duration-300 ${
                  index % 2 === 0 ? "bg-white" : "bg-secondary/30"
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="grid grid-cols-12 py-4 px-4 items-center">
                  <div className="col-span-4">
                    <h3 className="font-medium">{candidate.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {candidate.email}
                    </p>
                  </div>
                  <div className="col-span-4 flex justify-center">
                    <div className="flex items-center">
                      <div className="w-32 h-3 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${candidate.matchScore}%`,
                            backgroundColor: getScoreColor(candidate.matchScore),
                          }}
                        ></div>
                      </div>
                      <span className="ml-3 font-mono font-medium">
                        {candidate.matchScore}%
                      </span>
                    </div>
                  </div>
                  <div className="col-span-3 text-center">
                    <span className="font-medium">
                      {candidate.experience} {candidate.experience === 1 ? "year" : "years"}
                    </span>
                  </div>
                  <div className="col-span-1 flex justify-end">
                    <button
                      onClick={() => toggleExpand(candidate.id)}
                      className="h-8 w-8 rounded-full hover:bg-secondary flex items-center justify-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-5 w-5 transition-transform duration-200 ${
                          expanded === candidate.id ? "rotate-180" : ""
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                {expanded === candidate.id && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-3 px-6 border-t border-border bg-secondary/20 animate-fade-in-up">
                    <div>
                      <h4 className="text-sm font-medium mb-2">Education</h4>
                      <p className="text-sm">{candidate.education}</p>

                      <h4 className="text-sm font-medium mt-4 mb-2">
                        Matching Skills
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {candidate.skills.map((skill, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium mb-2">
                        Bias Analysis
                      </h4>
                      <div className="space-y-2">
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span>Gender Neutrality</span>
                            <span>{100 - candidate.biasMetrics.gender}%</span>
                          </div>
                          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-green-500 rounded-full"
                              style={{
                                width: `${100 - candidate.biasMetrics.gender}%`,
                              }}
                            ></div>
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span>Ethnicity Neutrality</span>
                            <span>
                              {100 - candidate.biasMetrics.ethnicity}%
                            </span>
                          </div>
                          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-green-500 rounded-full"
                              style={{
                                width: `${100 - candidate.biasMetrics.ethnicity}%`,
                              }}
                            ></div>
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span>Age Neutrality</span>
                            <span>{100 - candidate.biasMetrics.age}%</span>
                          </div>
                          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-green-500 rounded-full"
                              style={{
                                width: `${100 - candidate.biasMetrics.age}%`,
                              }}
                            ></div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 flex justify-between">
                        <button className="px-3 py-1 text-sm rounded-md border border-primary text-primary hover:bg-primary/5 transition-colors">
                          View Resume
                        </button>
                        <button className="px-3 py-1 text-sm rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                          Contact
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const getScoreColor = (score: number): string => {
  if (score >= 80) return "#10b981"; // green
  if (score >= 60) return "#0ea5e9"; // blue
  if (score >= 40) return "#f59e0b"; // amber
  return "#ef4444"; // red
};

export default CandidateRanking;
