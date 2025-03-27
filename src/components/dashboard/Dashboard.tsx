
import React, { useState } from "react";
import ResumeUploader from "./ResumeUploader";
import JobDescriptionInput from "./JobDescriptionInput";
import CandidateRanking from "./CandidateRanking";
import BiasDetectionResults from "./BiasDetectionResults";
import { mockScreenResumes, mockAnalyzeBias } from "@/services/mockAiService";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Upload, FileText, List, AlertTriangle, BarChart } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

export interface Candidate {
  id: string;
  name: string;
  email: string;
  resumeUrl: string;
  matchScore: number;
  skills: string[];
  experience: number;
  education: string;
  biasMetrics: {
    gender: number;
    ethnicity: number;
    age: number;
    overall: number;
  };
}

export interface JobDescription {
  title: string;
  department: string;
  location: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
}

const Dashboard: React.FC = () => {
  const [resumes, setResumes] = useState<File[]>([]);
  const [jobDescription, setJobDescription] = useState<JobDescription>({
    title: "",
    department: "",
    location: "",
    description: "",
    requirements: [],
    responsibilities: []
  });
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeTab, setActiveTab] = useState<"upload" | "rankings" | "bias" | "analytics">("upload");
  const { toast } = useToast();

  const handleResumeUpload = (files: File[]) => {
    setResumes([...resumes, ...files]);
    toast({
      title: "Resumes uploaded",
      description: `Successfully added ${files.length} resume${files.length > 1 ? 's' : ''}`,
    });
  };

  const handleJobDescriptionChange = (jd: JobDescription) => {
    setJobDescription(jd);
  };

  const handleScreenResumes = async () => {
    if (resumes.length === 0 || !jobDescription.title) {
      toast({
        title: "Missing information",
        description: "Please upload resumes and complete the job description",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    // Simulate progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) {
          clearInterval(progressInterval);
          return prev;
        }
        return prev + 5;
      });
    }, 150);

    try {
      // In a real app, we would upload the resumes and job description to a server
      // Here we'll use a mock service to simulate the AI processing
      const results = await mockScreenResumes(resumes, jobDescription);
      setCandidates(results);
      
      // Get detailed bias analysis for each candidate
      const candidatesWithDetailedBias = await Promise.all(
        results.map(async (candidate) => {
          const biasAnalysis = await mockAnalyzeBias(candidate);
          return {
            ...candidate,
            biasMetrics: biasAnalysis
          };
        })
      );
      
      setCandidates(candidatesWithDetailedBias);
      setActiveTab("rankings");
      toast({
        title: "Analysis complete",
        description: `Successfully analyzed ${results.length} candidates`,
      });
    } catch (error) {
      console.error("Error screening resumes:", error);
      toast({
        title: "Analysis failed",
        description: "There was an error processing the resumes. Please try again.",
        variant: "destructive",
      });
    } finally {
      clearInterval(progressInterval);
      setProgress(100);
      setTimeout(() => {
        setIsLoading(false);
        setProgress(0);
      }, 500);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "upload":
        return (
          <div className="animate-fade-in space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ResumeUploader onUpload={handleResumeUpload} uploadedFiles={resumes} />
              <JobDescriptionInput
                jobDescription={jobDescription}
                onChange={handleJobDescriptionChange}
              />
            </div>
            <div className="flex justify-center mt-8">
              {isLoading ? (
                <div className="w-full max-w-md">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Analyzing resumes...</span>
                    <span className="text-sm font-medium">{progress}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
              ) : (
                <Button
                  onClick={handleScreenResumes}
                  disabled={resumes.length === 0 || !jobDescription.title}
                  className="px-8 py-6 text-lg rounded-lg"
                  size="lg"
                >
                  <Upload className="mr-2 h-5 w-5" />
                  Screen Resumes
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              )}
            </div>
          </div>
        );
      case "rankings":
        return (
          <div className="animate-fade-in">
            <CandidateRanking candidates={candidates} />
          </div>
        );
      case "bias":
        return (
          <div className="animate-fade-in">
            <BiasDetectionResults candidates={candidates} />
          </div>
        );
      case "analytics":
        return (
          <div className="animate-fade-in">
            <Card>
              <CardHeader>
                <CardTitle>Analytics Dashboard</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold">{candidates.length}</div>
                        <div className="text-xs text-muted-foreground">Total Candidates</div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold">
                          {candidates.length > 0
                            ? Math.round(
                                candidates.reduce((sum, c) => sum + c.matchScore, 0) /
                                  candidates.length
                              )
                            : 0}
                          %
                        </div>
                        <div className="text-xs text-muted-foreground">Average Match Score</div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold">
                          {candidates.length > 0
                            ? Math.round(
                                candidates.reduce((sum, c) => sum + c.biasMetrics.overall, 0) /
                                  candidates.length
                              )
                            : 0}
                          %
                        </div>
                        <div className="text-xs text-muted-foreground">Average Bias Score</div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="flex flex-col gap-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">AI Resume Screening Dashboard</h1>
            <p className="text-muted-foreground">
              Upload resumes, define job requirements, and get AI-powered insights
            </p>
          </div>
          
          <div className="flex items-center">
            <Card className="bg-secondary border-0">
              <CardContent className="p-1">
                <div className="flex rounded-lg overflow-hidden">
                  <Button
                    onClick={() => setActiveTab("upload")}
                    variant={activeTab === "upload" ? "default" : "ghost"}
                    className="rounded-none"
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Upload
                  </Button>
                  <Button
                    onClick={() => setActiveTab("rankings")}
                    variant={activeTab === "rankings" ? "default" : "ghost"}
                    className="rounded-none"
                    disabled={candidates.length === 0}
                  >
                    <List className="mr-2 h-4 w-4" />
                    Rankings
                  </Button>
                  <Button
                    onClick={() => setActiveTab("bias")}
                    variant={activeTab === "bias" ? "default" : "ghost"}
                    className="rounded-none"
                    disabled={candidates.length === 0}
                  >
                    <AlertTriangle className="mr-2 h-4 w-4" />
                    Bias
                  </Button>
                  <Button
                    onClick={() => setActiveTab("analytics")}
                    variant={activeTab === "analytics" ? "default" : "ghost"}
                    className="rounded-none"
                    disabled={candidates.length === 0}
                  >
                    <BarChart className="mr-2 h-4 w-4" />
                    Analytics
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {renderTabContent()}
      </div>
    </div>
  );
};

export default Dashboard;
