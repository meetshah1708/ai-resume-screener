
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Briefcase, Mail, User, Calendar, Award, BookOpen } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { generateMockCandidates } from "@/utils/mockData";

const CandidateProfilePage = () => {
  const { id = "1" } = useParams();
  const navigate = useNavigate();
  const [candidate, setCandidate] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, fetch the candidate from an API
    const fetchCandidate = async () => {
      setLoading(true);
      // Mock delay to simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Get mock candidates and find the one with matching ID
      const mockCandidates = generateMockCandidates(10);
      const foundCandidate = mockCandidates.find(c => c.id === id) || mockCandidates[0];
      
      setCandidate(foundCandidate);
      setLoading(false);
    };
    
    fetchCandidate();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow pt-24 pb-16 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
            <p>Loading candidate profile...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!candidate) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow pt-24 pb-16 flex items-center justify-center">
          <Card className="max-w-md mx-auto">
            <CardContent className="pt-6">
              <p className="text-center mb-4">Candidate not found</p>
              <Button onClick={() => navigate("/dashboard")} className="w-full">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
              </Button>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow pt-24 pb-16 bg-gradient-to-b from-secondary/30 to-background">
        <div className="container mx-auto px-4">
          <Button 
            variant="outline" 
            className="mb-6"
            onClick={() => navigate("/dashboard")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
          </Button>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle>Candidate Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center mb-6">
                  <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <User className="h-12 w-12 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold">{candidate.name}</h2>
                  <div className="flex items-center text-muted-foreground mt-1">
                    <Mail className="h-4 w-4 mr-1" />
                    <span>{candidate.email}</span>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Match Score</h3>
                    <div className="flex items-center gap-2">
                      <Progress value={candidate.matchScore} className="h-2 flex-grow" />
                      <span className="text-sm font-medium">{candidate.matchScore}%</span>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Experience</h3>
                    <div className="flex items-center gap-2">
                      <Briefcase className="h-4 w-4 text-muted-foreground" />
                      <span>{candidate.experience} years</span>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Education</h3>
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-muted-foreground" />
                      <span>{candidate.education}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Skills & Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-3">Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {candidate.skills.map((skill: string, index: number) => (
                        <div 
                          key={index}
                          className="bg-secondary rounded-full px-3 py-1 text-sm"
                        >
                          {skill}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-3">Bias Analysis</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <BiasCard 
                        title="Gender Bias" 
                        value={candidate.biasMetrics.gender} 
                        description="Measures language patterns that may indicate gender bias in evaluation."
                      />
                      <BiasCard 
                        title="Ethnicity Bias" 
                        value={candidate.biasMetrics.ethnicity} 
                        description="Detects potential ethnic or cultural bias in language use."
                      />
                      <BiasCard 
                        title="Age Bias" 
                        value={candidate.biasMetrics.age} 
                        description="Identifies age-related terminology that may indicate bias."
                      />
                    </div>
                  </div>
                  
                  <Collapsible className="border rounded-lg p-4">
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" className="flex w-full justify-between">
                        <span>Advanced Analysis</span>
                        <span className="text-xs text-muted-foreground">Click to expand</span>
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="pt-4 space-y-4">
                        <div>
                          <h4 className="text-sm font-medium mb-2">Interview Recommendations</h4>
                          <ul className="list-disc pl-5 space-y-1 text-sm">
                            <li>Ask about their experience with {candidate.skills[0]} projects</li>
                            <li>Discuss their approach to problem-solving in {candidate.skills[1]} environments</li>
                            <li>Explore their knowledge of {candidate.skills[2]} best practices</li>
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium mb-2">Strengths</h4>
                          <ul className="list-disc pl-5 space-y-1 text-sm">
                            <li>Strong background in {candidate.skills[0]}</li>
                            <li>{candidate.experience} years of relevant experience</li>
                            <li>Qualified education from {candidate.education}</li>
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium mb-2">Areas for Growth</h4>
                          <ul className="list-disc pl-5 space-y-1 text-sm">
                            <li>Limited experience with enterprise-scale applications</li>
                            <li>Could benefit from more exposure to team leadership</li>
                            <li>Consider additional training in emerging technologies</li>
                          </ul>
                        </div>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const BiasCard = ({ title, value, description }: { title: string; value: number; description: string }) => {
  // Determine color based on value (lower is better)
  const getColorClass = (val: number) => {
    if (val < 30) return "text-green-600";
    if (val < 60) return "text-amber-600";
    return "text-red-600";
  };
  
  return (
    <HoverCard openDelay={200}>
      <HoverCardTrigger asChild>
        <Card className="hover:border-primary/50 transition-colors cursor-help">
          <CardContent className="p-4">
            <h4 className="text-sm font-medium mb-2">{title}</h4>
            <div className="flex items-center justify-between">
              <Progress value={value} className="h-2 flex-grow" />
              <span className={`ml-2 text-sm font-bold ${getColorClass(value)}`}>{value}%</span>
            </div>
          </CardContent>
        </Card>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="text-sm">
          <p className="font-medium mb-1">{title}</p>
          <p className="text-muted-foreground">{description}</p>
          <div className="mt-2">
            <p className="text-xs text-muted-foreground">
              Lower scores indicate less potential bias detected.
            </p>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default CandidateProfilePage;
