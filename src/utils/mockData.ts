
import { Candidate } from "@/components/dashboard/Dashboard";

// Function to generate a random integer between min and max (inclusive)
export const getRandomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Function to generate a random decimal between min and max with specified precision
export const getRandomDecimal = (min: number, max: number, precision: number = 2): number => {
  const value = Math.random() * (max - min) + min;
  const multiplier = Math.pow(10, precision);
  return Math.floor(value * multiplier) / multiplier;
};

// Sample skills pool for generating random candidate skills
export const skillsPool = [
  "JavaScript", "TypeScript", "React", "Vue", "Angular", 
  "Node.js", "Express", "Python", "Django", "Flask",
  "Java", "Spring", "C#", ".NET", "PHP", 
  "Laravel", "Ruby", "Rails", "Go", "Rust",
  "AWS", "Azure", "GCP", "Docker", "Kubernetes",
  "CI/CD", "Git", "MongoDB", "PostgreSQL", "MySQL",
  "Redis", "GraphQL", "REST API", "Microservices", "TDD",
  "Agile", "Scrum", "DevOps", "Data Science", "Machine Learning"
];

// Sample education backgrounds
export const educationBackgrounds = [
  "B.S. Computer Science, Stanford University",
  "M.S. Computer Engineering, MIT",
  "B.A. Information Systems, UC Berkeley",
  "Ph.D. Computer Science, Carnegie Mellon University",
  "B.S. Software Engineering, Georgia Tech",
  "M.S. Data Science, Harvard University",
  "B.S. Mathematics, Princeton University",
  "B.S. Electrical Engineering, Caltech",
  "M.S. Artificial Intelligence, University of Washington",
  "B.S. Information Technology, NYU"
];

// Generate a random set of skills
export const getRandomSkills = (count: number): string[] => {
  const shuffled = [...skillsPool].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// Generate random first and last names
export const firstNames = [
  "James", "Mary", "John", "Patricia", "Robert", 
  "Jennifer", "Michael", "Linda", "William", "Elizabeth",
  "David", "Barbara", "Richard", "Susan", "Joseph",
  "Jessica", "Thomas", "Sarah", "Charles", "Karen",
  "Christopher", "Nancy", "Daniel", "Lisa", "Matthew",
  "Sophia", "Anthony", "Emma", "Mark", "Olivia",
  "Amir", "Fatima", "Wei", "Mei", "Carlos",
  "Elena", "Jamal", "Aisha", "Raj", "Priya"
];

export const lastNames = [
  "Smith", "Johnson", "Williams", "Jones", "Brown",
  "Davis", "Miller", "Wilson", "Moore", "Taylor",
  "Anderson", "Thomas", "Jackson", "White", "Harris",
  "Martin", "Thompson", "Garcia", "Martinez", "Robinson",
  "Clark", "Rodriguez", "Lewis", "Lee", "Walker",
  "Hall", "Allen", "Young", "Hernandez", "King",
  "Patel", "Kim", "Chen", "Singh", "Lopez",
  "Gonzalez", "Nguyen", "Khan", "Shah", "Ali"
];

// Generate a random full name
export const getRandomName = (): string => {
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  return `${firstName} ${lastName}`;
};

// Generate a random email based on a name
export const getRandomEmail = (name: string): string => {
  const [firstName, lastName] = name.split(" ");
  const domains = ["gmail.com", "yahoo.com", "outlook.com", "hotmail.com", "company.com"];
  const randomDomain = domains[Math.floor(Math.random() * domains.length)];
  
  return `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${randomDomain}`;
};

// Generate a mock candidate with random values
export const generateMockCandidate = (): Candidate => {
  const name = getRandomName();
  const matchScore = getRandomInt(30, 98);
  
  // Generate bias metrics with some correlation to match score to make it realistic
  // Higher scoring candidates tend to have lower bias scores (higher neutrality)
  const baseBias = Math.max(5, 50 - matchScore / 2);
  
  return {
    id: Math.random().toString(36).substr(2, 9),
    name,
    email: getRandomEmail(name),
    resumeUrl: `https://example.com/resumes/${Math.random().toString(36).substr(2, 9)}.pdf`,
    matchScore,
    skills: getRandomSkills(getRandomInt(4, 8)),
    experience: getRandomInt(1, 15),
    education: educationBackgrounds[Math.floor(Math.random() * educationBackgrounds.length)],
    biasMetrics: {
      gender: Math.round(baseBias + getRandomInt(-10, 10)),
      ethnicity: Math.round(baseBias + getRandomInt(-10, 10)),
      age: Math.round(baseBias + getRandomInt(-10, 10)),
      overall: Math.round(baseBias)
    }
  };
};

// Generate a list of mock candidates
export const generateMockCandidates = (count: number): Candidate[] => {
  return Array(count)
    .fill(null)
    .map(() => generateMockCandidate())
    .sort((a, b) => b.matchScore - a.matchScore);
};
