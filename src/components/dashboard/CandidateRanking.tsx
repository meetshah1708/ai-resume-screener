
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Candidate } from "./Dashboard";
import { Progress } from "@/components/ui/progress";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  ArrowUpDown, ChevronDown, ChevronUp, User,
  Search, Filter, ArrowRight, ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";

interface CandidateRankingProps {
  candidates: Candidate[];
}

const CandidateRanking: React.FC<CandidateRankingProps> = ({ candidates }) => {
  const [sortField, setSortField] = useState<keyof Candidate>("matchScore");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  // Get all unique skills across all candidates
  const allSkills = Array.from(
    new Set(candidates.flatMap((candidate) => candidate.skills))
  ).sort();

  const handleSortChange = (field: keyof Candidate) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  const handleSkillToggle = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill)
        ? prev.filter((s) => s !== skill)
        : [...prev, skill]
    );
  };

  const sortedAndFilteredCandidates = [...candidates]
    .filter((candidate) => {
      // Filter by search term
      if (searchTerm && !candidate.name.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }

      // Filter by selected skills
      if (selectedSkills.length > 0) {
        return selectedSkills.every((skill) =>
          candidate.skills.includes(skill)
        );
      }

      return true;
    })
    .sort((a, b) => {
      if (sortField === "matchScore") {
        return sortDirection === "asc"
          ? a.matchScore - b.matchScore
          : b.matchScore - a.matchScore;
      } else if (sortField === "name") {
        return sortDirection === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } else if (sortField === "experience") {
        return sortDirection === "asc"
          ? a.experience - b.experience
          : b.experience - a.experience;
      }
      return 0;
    });

  return (
    <Card className="bg-card">
      <CardHeader className="pb-2">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <CardTitle>Candidate Rankings</CardTitle>
          
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search candidates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 w-full md:w-[200px]"
              />
            </div>
            
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="mr-2 h-4 w-4" />
              Filter
              {showFilters ? (
                <ChevronUp className="ml-2 h-4 w-4" />
              ) : (
                <ChevronDown className="ml-2 h-4 w-4" />
              )}
            </Button>
            
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm">
                  <ArrowUpDown className="mr-2 h-4 w-4" />
                  Sort by
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-48">
                <div className="space-y-1">
                  <Button
                    variant="ghost"
                    className="w-full justify-between"
                    onClick={() => handleSortChange("matchScore")}
                  >
                    Match Score
                    {sortField === "matchScore" && (
                      sortDirection === "desc" ? <ChevronDown /> : <ChevronUp />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-between"
                    onClick={() => handleSortChange("name")}
                  >
                    Name
                    {sortField === "name" && (
                      sortDirection === "desc" ? <ChevronDown /> : <ChevronUp />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-between"
                    onClick={() => handleSortChange("experience")}
                  >
                    Experience
                    {sortField === "experience" && (
                      sortDirection === "desc" ? <ChevronDown /> : <ChevronUp />
                    )}
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </CardHeader>
      
      {showFilters && (
        <div className="px-6 py-2 border-b">
          <h4 className="text-sm font-medium mb-2">Filter by skills:</h4>
          <ScrollArea className="h-24 w-full">
            <div className="flex flex-wrap gap-2 p-1">
              {allSkills.map((skill) => (
                <div key={skill} className="flex items-center space-x-2">
                  <Checkbox
                    id={`skill-${skill}`}
                    checked={selectedSkills.includes(skill)}
                    onCheckedChange={() => handleSkillToggle(skill)}
                  />
                  <label
                    htmlFor={`skill-${skill}`}
                    className="text-sm cursor-pointer"
                  >
                    {skill}
                  </label>
                </div>
              ))}
            </div>
          </ScrollArea>
          {selectedSkills.length > 0 && (
            <div className="flex justify-end mt-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedSkills([])}
              >
                Clear filters
              </Button>
            </div>
          )}
        </div>
      )}
      
      <CardContent className="pt-4">
        {sortedAndFilteredCandidates.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No candidates match your filters</p>
          </div>
        ) : (
          <div className="space-y-4">
            {sortedAndFilteredCandidates.map((candidate) => (
              <Card key={candidate.id} className="overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  <div className="flex-grow p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                          <User className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">{candidate.name}</h3>
                          <p className="text-sm text-muted-foreground">{candidate.email}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold">{candidate.matchScore}%</div>
                        <div className="text-xs text-muted-foreground">Match Score</div>
                      </div>
                    </div>
                    
                    <div className="mt-3">
                      <Progress value={candidate.matchScore} className="h-2" />
                    </div>
                    
                    <div className="mt-4">
                      <div className="flex flex-wrap gap-1">
                        {candidate.skills.slice(0, 5).map((skill, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center rounded-full bg-secondary px-2 py-1 text-xs"
                          >
                            {skill}
                          </span>
                        ))}
                        {candidate.skills.length > 5 && (
                          <span className="inline-flex items-center rounded-full bg-secondary px-2 py-1 text-xs">
                            +{candidate.skills.length - 5} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-muted p-4 flex flex-row md:flex-col justify-between items-center md:items-stretch border-t md:border-t-0 md:border-l">
                    <div className="text-center md:mb-2">
                      <div className="text-sm font-medium">{candidate.experience} years</div>
                      <div className="text-xs text-muted-foreground">Experience</div>
                    </div>
                    
                    <Link to={`/candidate/${candidate.id}`}>
                      <Button variant="secondary" size="sm" className="mt-2 w-full">
                        View Profile
                        <ExternalLink className="ml-2 h-3 w-3" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CandidateRanking;
