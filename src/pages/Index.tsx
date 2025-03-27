
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/Card";

const Index = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-32 px-6">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-3 py-1 mb-5 text-sm font-medium rounded-full bg-primary/10 text-primary animate-fade-in">
              AI-Powered Resume Screening
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-slide-up">
              Hire Smarter with <br /> Unbiased AI Screening
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 animate-slide-up animate-delay-100">
              Find the perfect candidates faster, using advanced AI that eliminates bias and matches skills with precision.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up animate-delay-200">
              <Link
                to="/dashboard"
                className="px-6 py-3 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors"
              >
                Try Dashboard
              </Link>
              <button className="px-6 py-3 rounded-lg border border-input hover:border-primary/50 transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 md:py-24 px-6 bg-secondary">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="inline-block px-3 py-1 mb-5 text-sm font-medium rounded-full bg-primary/10 text-primary">
              Features
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Recruiting Redefined
            </h2>
            <p className="text-lg text-muted-foreground">
              Our AI-powered platform transforms how you screen resumes, making your hiring process faster, smarter, and completely unbiased.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              title="Resume Parsing"
              description="Automatically extract structured information from resumes in seconds, saving hours of manual review."
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              }
              delay={0}
            />
            <FeatureCard
              title="Skill Matching"
              description="Advanced NLP algorithms match candidate skills and experience with your job requirements."
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              }
              delay={100}
            />
            <FeatureCard
              title="Bias Detection"
              description="Proprietary algorithms identify and neutralize potential bias in your hiring process."
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              }
              delay={200}
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-24 px-6">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="inline-block px-3 py-1 mb-5 text-sm font-medium rounded-full bg-primary/10 text-primary">
              How It Works
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Effortless Implementation
            </h2>
            <p className="text-lg text-muted-foreground">
              Get started in minutes with our intuitive platform. No complex setup required.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <StepCard
              number="01"
              title="Upload Resumes"
              description="Simply drag and drop candidate resumes in any format."
            />
            <StepCard
              number="02"
              title="Define Your Job"
              description="Input your job description and key requirements."
            />
            <StepCard
              number="03"
              title="Review Results"
              description="Get ranked candidates with detailed analysis and bias detection."
            />
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 md:py-24 px-6 bg-primary text-primary-foreground">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Transform Your Hiring?
            </h2>
            <p className="text-xl opacity-90 mb-8">
              Join thousands of companies making better hiring decisions with AI.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/dashboard"
                className="px-6 py-3 rounded-lg bg-white text-primary hover:bg-white/90 transition-colors"
              >
                Try Dashboard
              </Link>
              <button className="px-6 py-3 rounded-lg border border-white/30 hover:bg-white/10 transition-colors">
                Schedule Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  delay: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon,
  delay,
}) => (
  <Card className="glass-dark hover:shadow-lg transition-all duration-300 animate-fade-in-up" style={{ animationDelay: `${delay}ms` }}>
    <CardContent className="p-6">
      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
        <div className="text-primary">{icon}</div>
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
);

interface StepCardProps {
  number: string;
  title: string;
  description: string;
}

const StepCard: React.FC<StepCardProps> = ({ number, title, description }) => (
  <div className="flex flex-col items-center text-center animate-fade-in-up">
    <div className="h-16 w-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4 text-2xl font-bold">
      {number}
    </div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </div>
);

export default Index;
