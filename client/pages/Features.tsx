import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { ThemeToggle } from "../components/ui/theme-toggle";
import { 
  FileText, 
  Zap, 
  Upload, 
  Shield, 
  Search, 
  Users, 
  CheckCircle2,
  BarChart3,
  Lock,
  Clock,
  Globe,
  Download,
  Eye,
  AlertTriangle,
  Brain,
  Layers,
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Features() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Header */}
      <header className="border-b border-gray-800 sticky top-0 bg-gray-900/95 backdrop-blur-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-brand-800 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">LegalDocs AI</span>
            </Link>
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/features" className="text-brand-400 font-medium">
                Features
              </Link>
              <Link to="/how-it-works" className="text-gray-300 hover:text-white transition-colors">
                How It Works
              </Link>
              <Link to="/pricing" className="text-gray-300 hover:text-white transition-colors">
                Pricing
              </Link>
              <Link to="/signin" className="text-gray-300 hover:text-white transition-colors">
                Sign In
              </Link>
              <Link to="/dashboard">
                <Button size="sm">
                  Get Started
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <Badge variant="outline" className="mb-4">Features</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Everything you need for
            <span className="text-brand-800 dark:text-brand-400"> legal document management</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-200 mb-8 max-w-3xl mx-auto">
            Powerful AI-driven tools designed specifically for legal professionals to streamline
            document analysis, collaboration, and compliance.
          </p>
        </div>
      </section>

      {/* Core Features */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Core Features</h2>
            <p className="text-xl text-gray-600 dark:text-gray-200">The essential tools for modern legal practice</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* AI Document Analysis */}
            <Card className="p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="p-0 mb-6">
                <div className="w-14 h-14 bg-brand-100 rounded-2xl flex items-center justify-center mb-4">
                  <Brain className="w-7 h-7 text-brand-800" />
                </div>
                <CardTitle className="text-2xl">AI Document Analysis</CardTitle>
                <CardDescription className="text-lg">
                  Advanced natural language processing extracts key information from any legal document.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Extract key clauses and terms automatically</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Identify critical dates and deadlines</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Generate comprehensive summaries</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Flag potential risks and obligations</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Document Management */}
            <Card className="p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="p-0 mb-6">
                <div className="w-14 h-14 bg-brand-100 rounded-2xl flex items-center justify-center mb-4">
                  <Layers className="w-7 h-7 text-brand-800" />
                </div>
                <CardTitle className="text-2xl">Document Management</CardTitle>
                <CardDescription className="text-lg">
                  Organize, categorize, and manage all your legal documents in one secure location.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Drag-and-drop file upload</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Automatic categorization and tagging</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Version control and history tracking</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Bulk operations and batch processing</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Security & Compliance */}
            <Card className="p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="p-0 mb-6">
                <div className="w-14 h-14 bg-brand-100 rounded-2xl flex items-center justify-center mb-4">
                  <Shield className="w-7 h-7 text-brand-800" />
                </div>
                <CardTitle className="text-2xl">Security & Compliance</CardTitle>
                <CardDescription className="text-lg">
                  Enterprise-grade security with full compliance for legal industry standards.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>End-to-end encryption (AES-256)</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>HIPAA, SOC 2, and GDPR compliant</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Audit trails and access logging</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Multi-factor authentication</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Advanced Features */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Advanced Capabilities</h2>
            <p className="text-xl text-gray-600 dark:text-gray-200">Power features for professional workflows</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Smart Search */}
            <Card className="p-6">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
                  <Search className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Smart Search</h3>
                <p className="text-gray-600 dark:text-gray-200 mb-4">
                  Find specific clauses, terms, or information across all your documents with
                  natural language queries.
                </p>
                <ul className="text-sm text-gray-600 dark:text-gray-200 space-y-1">
                  <li>• Semantic search capabilities</li>
                  <li>• Boolean and wildcard operators</li>
                  <li>• Search within document annotations</li>
                </ul>
              </CardContent>
            </Card>

            {/* Team Collaboration */}
            <Card className="p-6">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Team Collaboration</h3>
                <p className="text-gray-600 dark:text-gray-200 mb-4">
                  Share documents, leave comments, and collaborate with your team in real-time.
                </p>
                <ul className="text-sm text-gray-600 dark:text-gray-200 space-y-1">
                  <li>• Real-time document sharing</li>
                  <li>• Annotations and comments</li>
                  <li>• Role-based access control</li>
                </ul>
              </CardContent>
            </Card>

            {/* Analytics & Insights */}
            <Card className="p-6">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                  <BarChart3 className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Analytics & Insights</h3>
                <p className="text-gray-600 dark:text-gray-200 mb-4">
                  Get detailed analytics on document processing times, team productivity,
                  and more.
                </p>
                <ul className="text-sm text-gray-600 dark:text-gray-200 space-y-1">
                  <li>• Processing time analytics</li>
                  <li>• Team performance metrics</li>
                  <li>• Custom report generation</li>
                </ul>
              </CardContent>
            </Card>

            {/* API Integration */}
            <Card className="p-6">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                  <Globe className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">API Integration</h3>
                <p className="text-gray-600 dark:text-gray-200 mb-4">
                  Integrate with your existing tools and workflows using our comprehensive API.
                </p>
                <ul className="text-sm text-gray-600 dark:text-gray-200 space-y-1">
                  <li>• RESTful API with webhooks</li>
                  <li>• SDK for popular languages</li>
                  <li>• Third-party app integrations</li>
                </ul>
              </CardContent>
            </Card>

            {/* Export & Reports */}
            <Card className="p-6">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4">
                  <Download className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Export & Reports</h3>
                <p className="text-gray-600 dark:text-gray-200 mb-4">
                  Export summaries and generate professional reports in multiple formats.
                </p>
                <ul className="text-sm text-gray-600 dark:text-gray-200 space-y-1">
                  <li>• PDF, Word, and HTML exports</li>
                  <li>• Customizable report templates</li>
                  <li>• Automated report scheduling</li>
                </ul>
              </CardContent>
            </Card>

            {/* Risk Assessment */}
            <Card className="p-6">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-4">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Risk Assessment</h3>
                <p className="text-gray-600 dark:text-gray-200 mb-4">
                  Automatically identify potential legal risks and compliance issues in
                  your documents.
                </p>
                <ul className="text-sm text-gray-600 dark:text-gray-200 space-y-1">
                  <li>• Automated risk flagging</li>
                  <li>• Compliance checklist generation</li>
                  <li>• Risk scoring and prioritization</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Supported File Types */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Supported File Types</h2>
            <p className="text-xl text-gray-600 dark:text-gray-200">
              Process documents in all major formats with high accuracy
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">PDF Documents</h3>
              <p className="text-sm text-gray-600 dark:text-gray-200">
                Native PDF processing with OCR for scanned documents
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Word Documents</h3>
              <p className="text-sm text-gray-600 dark:text-gray-200">
                DOC, DOCX files with full formatting preservation
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Text Files</h3>
              <p className="text-sm text-gray-600 dark:text-gray-200">
                Plain text, RTF, and other text-based formats
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Email Files</h3>
              <p className="text-sm text-gray-600 dark:text-gray-200">
                MSG, EML files with attachment processing
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-brand-800 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to transform your legal workflow?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Start your free trial today and experience the power of AI-driven document analysis.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/dashboard">
              <Button size="lg" className="bg-white text-brand-800 hover:bg-gray-100 px-8 py-3">
                Start Free Trial
              </Button>
            </Link>
            <Link to="/pricing">
              <Button variant="outline" size="lg" className="border-2 border-white text-white bg-white/10 hover:bg-white hover:text-brand-800 px-8 py-3">
                View Pricing
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-brand-800 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">LegalDocs AI</span>
            </div>
          </div>
          <div className="mt-8 text-center text-gray-400">
            <p>&copy; 2024 LegalDocs AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
