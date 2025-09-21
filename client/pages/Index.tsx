import { useState } from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { ThemeToggle } from "../components/ui/theme-toggle";
import {
  FileText,
  Upload,
  Sparkles,
  Shield,
  Search,
  Users,
  CheckCircle2,
  BarChart3,
  Lock,
  Zap,
  Play,
  Menu,
  X,
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";
import UploadCourtCase from "./UploadCourtCase";

export default function Index() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showDemoVideo, setShowDemoVideo] = useState(false);


  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Header */}
      <header className="border-b border-gray-100 dark:border-gray-800 sticky top-0 bg-[#f1f5f9]/95 dark:bg-gray-900/95 backdrop-blur-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-brand-800 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">LegalDocs AI</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/features" className="text-gray-600 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-colors">
                Features
              </Link>
              <Link to="/how-it-works" className="text-gray-600 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-colors">
                How It Works
              </Link>
              <Link to="/pricing" className="text-gray-600 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-colors">
                Pricing
              </Link>
              <Link to="/signin" className="text-gray-600 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-colors">
                Sign In
              </Link>
              <ThemeToggle />
              <Link to="/dashboard">
                <Button size="sm">
                  Get Started
                </Button>
              </Link>
            </nav>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-100">
              <div className="flex flex-col space-y-3">
                <Link to="/features" className="text-gray-600 hover:text-gray-900 px-3 py-2">
                  Features
                </Link>
                <Link to="/how-it-works" className="text-gray-600 hover:text-gray-900 px-3 py-2">
                  How It Works
                </Link>
                <Link to="/pricing" className="text-gray-600 hover:text-gray-900 px-3 py-2">
                  Pricing
                </Link>
                <Link to="/signin" className="text-gray-600 hover:text-gray-900 px-3 py-2">
                  Sign In
                </Link>
                <div className="px-3 pt-2">
                  <Button size="sm" className="w-full">
                    Get Started
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            Transform Legal Documents with{" "}
            <span className="text-brand-800 dark:text-brand-400">AI-Powered Summaries</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
            Upload, manage, and instantly summarize legal documents with our advanced AI
            platform. Save hours of reading time and never miss critical details again.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/dashboard">
              <Button size="lg" className="px-8 py-3 text-lg">
                <Sparkles className="w-5 h-5 mr-2" />
                Start Summarizing
              </Button>
            </Link>

            <Button
              variant="outline"
              size="lg"
              className="px-8 py-3 text-lg"
              onClick={() => setShowDemoVideo(true)}
            >
              <Play className="w-5 h-5 mr-2" />
              Watch Demo
            </Button>
          </div>

        </div>
      </section>
      {showDemoVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden max-w-3xl w-full relative">
            <button
              onClick={() => setShowDemoVideo(false)}
              className="absolute top-3 right-3 z-50 text-gray-700 dark:text-gray-200 hover:text-red-500"
            >
              <X className="w-6 h-6" />
            </button>
            <video
              src="/demo-video.mp4"
              controls
              autoPlay
              className="w-full h-auto"
            />
          </div>
        </div>
      )}


      {/* Features Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Everything you need for legal document management
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-200 max-w-3xl mx-auto">
              Streamline your workflow with powerful tools designed specifically for legal
              professionals.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <Card className="p-6 border-0 shadow-sm hover:shadow-md transition-shadow dark:bg-gray-700 dark:border-gray-600">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-brand-100 dark:bg-brand-900/30 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  Instant AI Summaries
                </h3>
                <p className="text-gray-600 dark:text-gray-200">
                  Get comprehensive document summaries in seconds. Our advanced AI
                  extracts key information and insights instantly.
                </p>
              </CardContent>
            </Card>

            {/* Feature 2 */}
            <Card className="p-6 border-0 shadow-sm hover:shadow-md transition-shadow dark:bg-gray-700 dark:border-gray-600">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-4">
                  <Upload className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  Easy Document Upload
                </h3>
                <p className="text-gray-600 dark:text-gray-200">
                  Simple drag-and-drop interface that accepts multiple file formats
                  including PDF, DOC, and more.
                </p>
              </CardContent>
            </Card>

            {/* Feature 3 */}
            <Card className="p-6 border-0 shadow-sm hover:shadow-md transition-shadow dark:bg-gray-700 dark:border-gray-600">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  Bank-Level Security
                </h3>
                <p className="text-gray-600 dark:text-gray-200">
                  Your sensitive legal documents are protected with enterprise-grade
                  encryption and security measures.
                </p>
              </CardContent>
            </Card>

            {/* Feature 4 */}
            <Card className="p-6 border-0 shadow-sm hover:shadow-md transition-shadow dark:bg-gray-700 dark:border-gray-600">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center mb-4">
                  <Search className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  Smart Search
                </h3>
                <p className="text-gray-600 dark:text-gray-200">
                  Find specific clauses, terms, or information across all
                  your documents instantly.
                </p>
              </CardContent>
            </Card>

            {/* Feature 5 */}
            <Card className="p-6 border-0 shadow-sm hover:shadow-md transition-shadow dark:bg-gray-700 dark:border-gray-600">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900/30 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-teal-600 dark:text-teal-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  Team Collaboration
                </h3>
                <p className="text-gray-600 dark:text-gray-200">
                  Share documents and summaries with your team. Leave
                  comments and notes for seamless collaboration.
                </p>
              </CardContent>
            </Card>

            {/* Feature 6 */}
            <Card className="p-6 border-0 shadow-sm hover:shadow-md transition-shadow dark:bg-gray-700 dark:border-gray-600">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-6 h-6 text-red-600 dark:text-red-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  Compliance Ready
                </h3>
                <p className="text-gray-600 dark:text-gray-200">
                  Built to meet legal industry compliance standards and
                  regulatory requirements.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              How it works
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-200 max-w-2xl mx-auto">
              Get started in three simple steps and transform your document workflow
              today.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-800 text-white rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                01
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Upload Documents
              </h3>
              <p className="text-gray-600 dark:text-gray-200">
                Securely upload your legal documents to our platform. Our
                system supports 50+ file types and handles documents of any size.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-800 text-white rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                02
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                AI Analysis
              </h3>
              <p className="text-gray-600 dark:text-gray-200">
                Our advanced AI analyzes your documents, identifying
                key clauses, terms, and important information.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-800 text-white rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                03
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Get Summaries
              </h3>
              <p className="text-gray-600 dark:text-gray-200">
                Receive comprehensive, accurate summaries that
                highlight the most critical aspects of your documents.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PDF Upload Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-10">
            Try It Out: Upload a Court Case PDF
          </h2>
          <UploadCourtCase />
        </div>
      </section>


      {/* CTA Section */}
      <section className="py-16 bg-slate-800 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to revolutionize your legal workflow?
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            Join thousands of legal professionals who trust LegalDocs AI for their document management needs.
          </p>
          <Link to="/dashboard">
            <Button size="lg" className="bg-white text-slate-800 hover:bg-gray-100 px-6 py-3 rounded-md font-medium">
              Start Free Trial
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Logo and Description */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-6 h-6 bg-white rounded flex items-center justify-center">
                  <FileText className="w-4 h-4 text-slate-900" />
                </div>
                <span className="text-lg font-semibold">LegalDocs AI</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Transforming legal document management with AI-powered intelligence.
              </p>
            </div>

            {/* Product */}
            <div>
              <h3 className="text-white font-medium mb-4">Product</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/features" className="text-gray-400 hover:text-white transition-colors text-sm">
                    Features
                  </Link>
                </li>
                <li>
                  <Link to="/pricing" className="text-gray-400 hover:text-white transition-colors text-sm">
                    Pricing
                  </Link>
                </li>
                <li>
                  <a href="/api" className="text-gray-400 hover:text-white transition-colors text-sm">
                    API
                  </a>
                </li>
                <li>
                  <a href="/security" className="text-gray-400 hover:text-white transition-colors text-sm">
                    Security
                  </a>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-white font-medium mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <a href="/about" className="text-gray-400 hover:text-white transition-colors text-sm">
                    About
                  </a>
                </li>
                <li>
                  <a href="/contact" className="text-gray-400 hover:text-white transition-colors text-sm">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="/careers" className="text-gray-400 hover:text-white transition-colors text-sm">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="/blog" className="text-gray-400 hover:text-white transition-colors text-sm">
                    Blog
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-white font-medium mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <a href="/privacy" className="text-gray-400 hover:text-white transition-colors text-sm">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="/terms" className="text-gray-400 hover:text-white transition-colors text-sm">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="/compliance" className="text-gray-400 hover:text-white transition-colors text-sm">
                    Compliance
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="pt-6 border-t border-slate-700">
            <div className="text-center text-gray-400 text-sm">
              <p>&copy; 2025 LegalDocs AI. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
