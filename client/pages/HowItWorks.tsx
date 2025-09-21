import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { 
  FileText, 
  Upload, 
  Brain, 
  CheckCircle2,
  ArrowRight,
  Clock,
  Shield,
  Users,
  Download,
  Eye,
  Search,
  Zap
} from "lucide-react";
import { Link } from "react-router-dom";

export default function HowItWorks() {
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
              <Link to="/features" className="text-gray-300 hover:text-white transition-colors">
                Features
              </Link>
              <Link to="/how-it-works" className="text-brand-400 font-medium">
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
          <Badge variant="outline" className="mb-4">How It Works</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Transform your legal workflow in
            <span className="text-brand-800 dark:text-brand-400"> three simple steps</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-200 mb-8 max-w-3xl mx-auto">
            Our AI-powered platform makes document analysis faster, more accurate, and 
            more efficient than traditional methods.
          </p>
        </div>
      </section>

      {/* Main Process */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Step 1 */}
            <div className="text-center lg:text-left">
              <div className="relative">
                <div className="w-20 h-20 bg-brand-800 text-white rounded-2xl flex items-center justify-center mx-auto lg:mx-0 mb-6 text-2xl font-bold">
                  01
                </div>
                <div className="hidden lg:block absolute top-10 left-20 w-32 h-0.5 bg-gray-200"></div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Upload Your Documents</h3>
              <p className="text-gray-600 dark:text-gray-200 mb-6 text-lg leading-relaxed">
                Securely upload your legal documents through our intuitive drag-and-drop interface.
                We support over 50 file formats including PDF, Word, and scanned documents.
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 justify-center lg:justify-start">
                  <Upload className="w-5 h-5 text-brand-800" />
                  <span className="text-gray-700 dark:text-gray-200">Drag & drop or browse to upload</span>
                </div>
                <div className="flex items-center space-x-3 justify-center lg:justify-start">
                  <Shield className="w-5 h-5 text-brand-800" />
                  <span className="text-gray-700 dark:text-gray-200">256-bit encryption ensures security</span>
                </div>
                <div className="flex items-center space-x-3 justify-center lg:justify-start">
                  <Zap className="w-5 h-5 text-brand-800" />
                  <span className="text-gray-700 dark:text-gray-200">Instant file validation and processing</span>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="text-center lg:text-left">
              <div className="relative">
                <div className="w-20 h-20 bg-brand-800 text-white rounded-2xl flex items-center justify-center mx-auto lg:mx-0 mb-6 text-2xl font-bold">
                  02
                </div>
                <div className="hidden lg:block absolute top-10 left-20 w-32 h-0.5 bg-gray-200"></div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">AI Analysis</h3>
              <p className="text-gray-600 dark:text-gray-200 mb-6 text-lg leading-relaxed">
                Our advanced AI engine analyzes your documents using natural language processing
                to extract key information, identify important clauses, and understand context.
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 justify-center lg:justify-start">
                  <Brain className="w-5 h-5 text-brand-800" />
                  <span className="text-gray-700 dark:text-gray-200">Advanced NLP and machine learning</span>
                </div>
                <div className="flex items-center space-x-3 justify-center lg:justify-start">
                  <Search className="w-5 h-5 text-brand-800" />
                  <span className="text-gray-700 dark:text-gray-200">Key clause and term extraction</span>
                </div>
                <div className="flex items-center space-x-3 justify-center lg:justify-start">
                  <Eye className="w-5 h-5 text-brand-800" />
                  <span className="text-gray-700 dark:text-gray-200">Risk and compliance identification</span>
                </div>
              </div>
            </div>

            {/* Step 3 */}
              <div className="text-center lg:text-left">
              <div className="relative">
                <div className="w-20 h-20 bg-brand-800 text-white rounded-2xl flex items-center justify-center mx-auto lg:mx-0 mb-6 text-2xl font-bold">
                  03
                </div>
                <div className="hidden lg:block absolute top-10 left-20 w-32 h-0.5 bg-gray-200"></div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Get Results</h3>
              <p className="text-gray-600 dark:text-gray-200 mb-6 text-lg leading-relaxed">
                Receive comprehensive summaries, key point extractions, and actionable insights.
                Share, export, or collaborate with your team on the results.
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 justify-center lg:justify-start">
                  <CheckCircle2 className="w-5 h-5 text-brand-800" />
                  <span className="text-gray-700 dark:text-gray-200">Detailed summaries and insights</span>
                </div>
                <div className="flex items-center space-x-3 justify-center lg:justify-start">
                  <Users className="w-5 h-5 text-brand-800" />
                  <span className="text-gray-700 dark:text-gray-200">Team collaboration and sharing</span>
                </div>
                <div className="flex items-center space-x-3 justify-center lg:justify-start">
                  <Download className="w-5 h-5 text-brand-800" />
                  <span className="text-gray-700 dark:text-gray-200">Export in multiple formats</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Process */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Behind the Scenes</h2>
            <p className="text-xl text-gray-600 dark:text-gray-200">
              Understanding our AI-powered document analysis process
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Document Processing Pipeline</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-brand-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-brand-800 font-semibold text-sm">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Document Ingestion</h4>
                    <p className="text-gray-600 dark:text-gray-200">
                      Files are securely uploaded and processed through our OCR system for
                      scanned documents and text extraction pipeline.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-brand-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-brand-800 font-semibold text-sm">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Content Analysis</h4>
                    <p className="text-gray-600 dark:text-gray-200">
                      Our NLP models analyze document structure, identify sections, and
                      understand legal terminology and context.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-brand-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-brand-800 font-semibold text-sm">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Information Extraction</h4>
                    <p className="text-gray-600 dark:text-gray-200">
                      Key clauses, dates, parties, and legal concepts are identified and
                      extracted using specialized legal AI models.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-brand-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-brand-800 font-semibold text-sm">4</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Summary Generation</h4>
                    <p className="text-gray-600 dark:text-gray-200">
                      Comprehensive summaries are generated with key points, risks, and 
                      actionable insights tailored for legal professionals.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg">
              <div className="space-y-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-brand-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Clock className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Processing Time</h4>
                  <p className="text-3xl font-bold text-white mb-2">~30 seconds</p>
                  <p className="text-gray-600 dark:text-gray-200">Average processing time for a 20-page document</p>
                </div>

                <div className="border-t pt-6">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-4">What You Get:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center space-x-3">
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                      <span className="text-gray-700 dark:text-gray-200">Executive summary</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                      <span className="text-gray-700 dark:text-gray-200">Key points extraction</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                      <span className="text-gray-700 dark:text-gray-200">Important dates and deadlines</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                      <span className="text-gray-700 dark:text-gray-200">Risk assessment</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                      <span className="text-gray-700 dark:text-gray-200">Compliance checklist</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Integration Options */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Integration Options</h2>
            <p className="text-xl text-gray-600 dark:text-gray-200">
              Seamlessly integrate with your existing workflow
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 text-center">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Upload className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Web Platform</h3>
                <p className="text-gray-600 dark:text-gray-200 mb-6">
                  Use our intuitive web interface for quick document uploads and analysis.
                </p>
                <ul className="text-sm text-gray-600 dark:text-gray-200 space-y-2">
                  <li>• Drag-and-drop interface</li>
                  <li>• Real-time collaboration</li>
                  <li>• Cloud storage integration</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="p-8 text-center">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Brain className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">API Integration</h3>
                <p className="text-gray-600 dark:text-gray-200 mb-6">
                  Integrate our AI capabilities directly into your existing systems.
                </p>
                <ul className="text-sm text-gray-600 dark:text-gray-200 space-y-2">
                  <li>• RESTful API endpoints</li>
                  <li>• Webhook notifications</li>
                  <li>• SDKs for popular languages</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="p-8 text-center">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Users className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Enterprise Solution</h3>
                <p className="text-gray-600 dark:text-gray-200 mb-6">
                  Custom deployment options for large organizations and law firms.
                </p>
                <ul className="text-sm text-gray-600 dark:text-gray-200 space-y-2">
                  <li>• On-premise deployment</li>
                  <li>• Custom training models</li>
                  <li>• Dedicated support</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-brand-800 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to streamline your document workflow?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of legal professionals who trust LegalDocs AI for their document analysis needs.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/dashboard">
              <Button size="lg" className="bg-white text-brand-800 hover:bg-gray-100 px-8 py-3">
                Start Free Trial
              </Button>
            </Link>
            <Link to="/features">
              <Button variant="outline" size="lg" className="border-2 border-white text-white bg-white/10 hover:bg-white hover:text-brand-800 px-8 py-3">
                Explore Features
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
