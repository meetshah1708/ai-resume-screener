
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/Card";
import { JobDescription } from "./Dashboard";

interface JobDescriptionInputProps {
  jobDescription: JobDescription;
  onChange: (jd: JobDescription) => void;
}

const JobDescriptionInput: React.FC<JobDescriptionInputProps> = ({
  jobDescription,
  onChange,
}) => {
  const [currentRequirement, setCurrentRequirement] = useState("");
  const [currentResponsibility, setCurrentResponsibility] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    onChange({
      ...jobDescription,
      [name]: value,
    });
  };

  const addRequirement = () => {
    if (currentRequirement.trim()) {
      onChange({
        ...jobDescription,
        requirements: [...jobDescription.requirements, currentRequirement.trim()],
      });
      setCurrentRequirement("");
    }
  };

  const removeRequirement = (index: number) => {
    const updatedRequirements = [...jobDescription.requirements];
    updatedRequirements.splice(index, 1);
    onChange({
      ...jobDescription,
      requirements: updatedRequirements,
    });
  };

  const addResponsibility = () => {
    if (currentResponsibility.trim()) {
      onChange({
        ...jobDescription,
        responsibilities: [...jobDescription.responsibilities, currentResponsibility.trim()],
      });
      setCurrentResponsibility("");
    }
  };

  const removeResponsibility = (index: number) => {
    const updatedResponsibilities = [...jobDescription.responsibilities];
    updatedResponsibilities.splice(index, 1);
    onChange({
      ...jobDescription,
      responsibilities: updatedResponsibilities,
    });
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Job Description</CardTitle>
        <CardDescription>
          Define the job details to match with candidate resumes
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">
              Job Title <span className="text-destructive">*</span>
            </label>
            <input
              id="title"
              name="title"
              type="text"
              value={jobDescription.title}
              onChange={handleChange}
              placeholder="e.g. Frontend Developer"
              className="w-full px-3 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="department" className="text-sm font-medium">
                Department
              </label>
              <input
                id="department"
                name="department"
                type="text"
                value={jobDescription.department}
                onChange={handleChange}
                placeholder="e.g. Engineering"
                className="w-full px-3 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="location" className="text-sm font-medium">
                Location
              </label>
              <input
                id="location"
                name="location"
                type="text"
                value={jobDescription.location}
                onChange={handleChange}
                placeholder="e.g. Remote, US"
                className="w-full px-3 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">
              Job Overview
            </label>
            <textarea
              id="description"
              name="description"
              value={jobDescription.description}
              onChange={handleChange}
              placeholder="Brief description of the role"
              rows={2}
              className="w-full px-3 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all resize-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Requirements</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={currentRequirement}
                onChange={(e) => setCurrentRequirement(e.target.value)}
                placeholder="Add a requirement"
                className="flex-1 px-3 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addRequirement();
                  }
                }}
              />
              <button
                onClick={addRequirement}
                type="button"
                className="px-3 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Add
              </button>
            </div>
            {jobDescription.requirements.length > 0 && (
              <div className="mt-2 space-y-2 max-h-24 overflow-y-auto pr-2">
                {jobDescription.requirements.map((req, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between px-3 py-2 rounded-lg bg-secondary animate-fade-in"
                  >
                    <span className="text-sm truncate">{req}</span>
                    <button
                      onClick={() => removeRequirement(index)}
                      className="ml-2 h-5 w-5 rounded-full hover:bg-white transition-colors flex items-center justify-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3 text-muted-foreground"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Responsibilities</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={currentResponsibility}
                onChange={(e) => setCurrentResponsibility(e.target.value)}
                placeholder="Add a responsibility"
                className="flex-1 px-3 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addResponsibility();
                  }
                }}
              />
              <button
                onClick={addResponsibility}
                type="button"
                className="px-3 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Add
              </button>
            </div>
            {jobDescription.responsibilities.length > 0 && (
              <div className="mt-2 space-y-2 max-h-24 overflow-y-auto pr-2">
                {jobDescription.responsibilities.map((resp, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between px-3 py-2 rounded-lg bg-secondary animate-fade-in"
                  >
                    <span className="text-sm truncate">{resp}</span>
                    <button
                      onClick={() => removeResponsibility(index)}
                      className="ml-2 h-5 w-5 rounded-full hover:bg-white transition-colors flex items-center justify-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3 text-muted-foreground"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default JobDescriptionInput;
