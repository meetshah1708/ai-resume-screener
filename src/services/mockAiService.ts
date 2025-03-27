
import { Candidate, JobDescription } from "@/components/dashboard/Dashboard";
import { generateMockCandidates } from "@/utils/mockData";

// Mock function to simulate AI-based resume screening
export const mockScreenResumes = async (
  resumes: File[],
  jobDescription: JobDescription
): Promise<Candidate[]> => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Generate mock candidates based on the number of uploaded resumes
  const candidates = generateMockCandidates(resumes.length);

  // In a real application, we would extract text from resumes,
  // analyze them using NLP, and match against the job description
  
  return candidates;
};

// Mock function to analyze bias in a candidate's resume
export const mockAnalyzeBias = async (
  candidate: Candidate
): Promise<{
  gender: number;
  ethnicity: number;
  age: number;
  overall: number;
}> => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // In a real application, we would use AI/ML to analyze text for bias indicators
  // For now, return the mock bias metrics already in the candidate
  
  return candidate.biasMetrics;
};

// Mock function to extract skills from a resume
export const mockExtractSkills = async (
  resumeText: string
): Promise<string[]> => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  // In a real application, we would use NLP to extract skills from resume text
  // For now, return a subset of the skills pool from mockData
  
  return [];
};

// Mock function to match job description with candidate's resume
export const mockMatchJobWithResume = async (
  resumeText: string,
  jobDescription: JobDescription
): Promise<{
  matchScore: number;
  matchedSkills: string[];
  missingSkills: string[];
}> => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // In a real application, we would use NLP to match the resume with job description
  // For now, return mock data
  
  return {
    matchScore: 0,
    matchedSkills: [],
    missingSkills: []
  };
};
