
import React from "react";
import { Link } from "react-router-dom";
import { ThemeToggle } from "../theme/ThemeToggle";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border dark:border-border-dark bg-background/80 dark:bg-background-dark/80 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="text-lg font-semibold tracking-tight">
              ResumeAI
            </Link>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-sm font-medium hover:text-primary/80 transition-colors">
              Home
            </Link>
            <Link to="/dashboard" className="text-sm font-medium hover:text-primary/80 transition-colors">
              Dashboard
            </Link>
            <a href="#features" className="text-sm font-medium hover:text-primary/80 transition-colors">
              Features
            </a>
            <a href="#" className="text-sm font-medium hover:text-primary/80 transition-colors">
              Pricing
            </a>
            <div className="ml-3">
              <ThemeToggle />
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <ThemeToggle className="mr-2" />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 border-t border-border dark:border-border-dark">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-accent dark:hover:bg-accent-dark"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/dashboard"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-accent dark:hover:bg-accent-dark"
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </Link>
            <a
              href="#features"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-accent dark:hover:bg-accent-dark"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </a>
            <a
              href="#"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-accent dark:hover:bg-accent-dark"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
