
import React, { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Dashboard from "@/components/dashboard/Dashboard";
import { Card } from "@/components/ui/card";

const DashboardPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow pt-24 pb-16 bg-gradient-to-b from-secondary/30 to-background">
        <div className="container mx-auto px-4">
          <Card className="shadow-lg border-0 bg-card/95 backdrop-blur-sm">
            <Dashboard />
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DashboardPage;
