
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

  // Add job-specific match scores based on requirements
  return candidates.map(candidate => {
    // Calculate match score based on skills overlap with job requirements
    const matchedSkills = candidate.skills.filter(skill => 
      jobDescription.requirements.some(req => 
        req.toLowerCase().includes(skill.toLowerCase())
      )
    );
    
    const matchScore = Math.min(
      95,
      Math.max(
        30,
        Math.round((matchedSkills.length / Math.max(1, jobDescription.requirements.length)) * 100) + 
        Math.floor(Math.random() * 30)
      )
    );
    
    return {
      ...candidate,
      matchScore
    };
  });
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
  // For now, generate random bias metrics
  const gender = Math.floor(Math.random() * 40) + 10;
  const ethnicity = Math.floor(Math.random() * 30) + 5;
  const age = Math.floor(Math.random() * 50) + 20;
  const overall = Math.floor((gender + ethnicity + age) / 3);
  
  return {
    gender,
    ethnicity,
    age,
    overall
  };
};

// Mock function to extract skills from a resume
export const mockExtractSkills = async (
  resumeText: string
): Promise<string[]> => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  // Common tech skills to randomly select from
  const skillsPool = [
    "JavaScript", "TypeScript", "React", "Next.js", "Node.js", "Express", 
    "MongoDB", "SQL", "PostgreSQL", "AWS", "Docker", "Kubernetes", 
    "Python", "Java", "C#", "Ruby", "Go", "PHP", "HTML", "CSS",
    "TailwindCSS", "Redux", "GraphQL", "RESTful API", "Git", "CI/CD",
    "Agile", "Scrum", "Test Driven Development", "Machine Learning",
    "Data Analysis", "Cybersecurity", "Cloud Computing", "DevOps"
  ];

  // Randomly select 5-10 skills
  const numSkills = Math.floor(Math.random() * 6) + 5;
  const skills = [];
  
  for (let i = 0; i < numSkills; i++) {
    const randomSkill = skillsPool[Math.floor(Math.random() * skillsPool.length)];
    if (!skills.includes(randomSkill)) {
      skills.push(randomSkill);
    }
  }
  
  return skills;
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

  // Extract skills from the resume (in a real app, this would be NLP-based)
  const candidateSkills = await mockExtractSkills(resumeText);
  
  // Parse requirements into skills (simplified for mock)
  const requiredSkills = jobDescription.requirements.flatMap(req => {
    // Extract potential skills from requirement text
    const words = req.split(/\s+/);
    return words.filter(word => word.length > 3 && /^[A-Z]/.test(word));
  });
  
  // Find matching skills
  const matchedSkills = candidateSkills.filter(skill => 
    requiredSkills.some(req => req.toLowerCase().includes(skill.toLowerCase()))
  );
  
  // Find missing skills
  const missingSkills = requiredSkills.filter(skill => 
    !candidateSkills.some(cSkill => cSkill.toLowerCase().includes(skill.toLowerCase()))
  ).slice(0, 5); // Limit to 5 missing skills
  
  // Calculate match score
  const matchScore = Math.min(
    100,
    Math.round((matchedSkills.length / Math.max(1, requiredSkills.length)) * 100)
  );
  
  return {
    matchScore,
    matchedSkills,
    missingSkills
  };
};
