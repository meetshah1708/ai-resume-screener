
import React, { useState } from "react";
import ResumeUploader from "./ResumeUploader";
import JobDescriptionInput from "./JobDescriptionInput";
import CandidateRanking from "./CandidateRanking";
import BiasDetectionResults from "./BiasDetectionResults";
import { mockScreenResumes } from "@/services/mockAiService";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";

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
  const [activeTab, setActiveTab] = useState<"upload" | "rankings" | "bias">("upload");

  const handleResumeUpload = (files: File[]) => {
    setResumes([...resumes, ...files]);
  };

  const handleJobDescriptionChange = (jd: JobDescription) => {
    setJobDescription(jd);
  };

  const handleScreenResumes = async () => {
    if (resumes.length === 0 || !jobDescription.title) {
      // Show error message
      return;
    }

    setIsLoading(true);

    try {
      // In a real app, we would upload the resumes and job description to a server
      // Here we'll use a mock service to simulate the AI processing
      const results = await mockScreenResumes(resumes, jobDescription);
      setCandidates(results);
      setActiveTab("rankings");
    } catch (error) {
      console.error("Error screening resumes:", error);
      // Show error message
    } finally {
      setIsLoading(false);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "upload":
        return (
          <div className="animate-fade-in-up">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <ResumeUploader onUpload={handleResumeUpload} uploadedFiles={resumes} />
              <JobDescriptionInput
                jobDescription={jobDescription}
                onChange={handleJobDescriptionChange}
              />
            </div>
            <div className="flex justify-center mt-8">
              <button
                onClick={handleScreenResumes}
                disabled={isLoading || resumes.length === 0 || !jobDescription.title}
                className="px-8 py-3 text-lg rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Processing..." : "Screen Resumes"}
              </button>
            </div>
          </div>
        );
      case "rankings":
        return (
          <div className="animate-fade-in-up">
            <CandidateRanking candidates={candidates} />
          </div>
        );
      case "bias":
        return (
          <div className="animate-fade-in-up">
            <BiasDetectionResults candidates={candidates} />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="flex flex-wrap items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Resume Screening Dashboard</h1>
          <p className="text-muted-foreground">
            Upload resumes, define job requirements, and get AI-powered screening results
          </p>
        </div>
        
        {candidates.length > 0 && (
          <div className="flex items-center mt-4 md:mt-0">
            <Card className="bg-secondary border-0">
              <CardContent className="p-1">
                <div className="flex rounded-lg overflow-hidden">
                  <button
                    onClick={() => setActiveTab("upload")}
                    className={`px-4 py-2 transition-colors ${
                      activeTab === "upload"
                        ? "bg-white shadow-sm"
                        : "hover:bg-white/50"
                    }`}
                  >
                    Upload
                  </button>
                  <button
                    onClick={() => setActiveTab("rankings")}
                    className={`px-4 py-2 transition-colors ${
                      activeTab === "rankings"
                        ? "bg-white shadow-sm"
                        : "hover:bg-white/50"
                    }`}
                  >
                    Rankings
                  </button>
                  <button
                    onClick={() => setActiveTab("bias")}
                    className={`px-4 py-2 transition-colors ${
                      activeTab === "bias"
                        ? "bg-white shadow-sm"
                        : "hover:bg-white/50"
                    }`}
                  >
                    Bias Analysis
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {renderTabContent()}
    </div>
  );
};

export default Dashboard;
