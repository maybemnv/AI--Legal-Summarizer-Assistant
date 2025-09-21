import React, { useState } from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { 
  FileText, 
  Check, 
  X,
  Star,
  Users,
  Shield,
  Zap,
  Phone,
  Mail,
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(true);

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
              <Link to="/how-it-works" className="text-gray-300 hover:text-white transition-colors">
                How It Works
              </Link>
              <Link to="/pricing" className="text-brand-400 font-medium">
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
          <Badge variant="outline" className="mb-4">Pricing</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Choose the perfect plan for your
            <span className="text-brand-800 dark:text-brand-400"> legal practice</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-200 mb-8 max-w-3xl mx-auto">
            Start free, scale as you grow. All plans include our core AI analysis features 
            with varying limits and advanced capabilities.
          </p>
          
          {/* Toggle */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            <span className={`text-gray-700 dark:text-gray-200 ${!isAnnual ? 'font-medium' : ''}`}>Monthly</span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isAnnual ? 'bg-brand-800' : 'bg-gray-300'}`}
            >
              <span className="sr-only">Toggle annual billing</span>
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isAnnual ? 'translate-x-6' : 'translate-x-1'}`}></span>
            </button>
            <span className={`text-gray-700 dark:text-gray-200 ${isAnnual ? 'font-medium' : ''}`}>Annual</span>
            {isAnnual && <Badge className="bg-green-100 text-green-800 ml-2">Save 20%</Badge>}
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Starter Plan */}
            <Card className="relative p-8 border-2 border-gray-200 hover:border-gray-300 transition-colors">
              <CardHeader className="p-0 mb-8">
                <CardTitle className="text-2xl">Starter</CardTitle>
                <CardDescription className="text-lg">
                  Perfect for solo practitioners and small firms getting started
                </CardDescription>
                <div className="mt-6">
                  {isAnnual && (
                    <span className="text-lg text-gray-500 dark:text-gray-400 line-through mr-2">$29</span>
                  )}
                  <span className="text-4xl font-bold text-gray-900 dark:text-white">
                    ${isAnnual ? '23' : '29'}
                  </span>
                  <span className="text-gray-600 dark:text-gray-200 ml-2">/month</span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-200 mt-2">
                  {isAnnual ? 'Billed annually ($276/year) - Save $72!' : 'Billed monthly'}
                </p>
              </CardHeader>
              <CardContent className="p-0">
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-200">50 documents per month</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-200">AI-powered summaries</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-200">Key points extraction</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-200">Basic search functionality</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-200">PDF, Word, Text file support</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-200">Email support</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <X className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-400">Team collaboration</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <X className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-400">API access</span>
                  </li>
                </ul>
                <Link to="/dashboard">
                  <Button className="w-full" variant="outline">
                    Start Free Trial
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Professional Plan */}
            <Card className="relative p-8 border-2 border-brand-800 shadow-lg scale-105">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-brand-800 text-white px-4 py-1">
                  <Star className="w-4 h-4 mr-1" />
                  Most Popular
                </Badge>
              </div>
              <CardHeader className="p-0 mb-8">
                <CardTitle className="text-2xl">Professional</CardTitle>
                <CardDescription className="text-lg">
                  Ideal for growing law firms and legal departments
                </CardDescription>
                <div className="mt-6">
                  {isAnnual && (
                    <span className="text-lg text-gray-500 dark:text-gray-400 line-through mr-2">$99</span>
                  )}
                  <span className="text-4xl font-bold text-gray-900 dark:text-white">
                    ${isAnnual ? '79' : '99'}
                  </span>
                  <span className="text-gray-600 dark:text-gray-200 ml-2">/month</span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-200 mt-2">
                  {isAnnual ? 'Billed annually ($948/year) - Save $240!' : 'Billed monthly'}
                </p>
              </CardHeader>
              <CardContent className="p-0">
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-200">500 documents per month</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-200">Advanced AI analysis</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-200">Risk assessment & compliance</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-200">Team collaboration (up to 10 users)</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-200">Smart search & filtering</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-200">Custom export templates</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-200">Priority support</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-200">Basic API access</span>
                  </li>
                </ul>
                <Link to="/dashboard">
                  <Button className="w-full">
                    Start Free Trial
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Enterprise Plan */}
            <Card className="relative p-8 border-2 border-gray-200 hover:border-gray-300 transition-colors">
              <CardHeader className="p-0 mb-8">
                <CardTitle className="text-2xl">Enterprise</CardTitle>
                <CardDescription className="text-lg">
                  For large firms and organizations with advanced requirements
                </CardDescription>
                <div className="mt-6">
                  <span className="text-4xl font-bold text-gray-900 dark:text-white">Custom</span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-200 mt-2">
                  Contact us for pricing
                </p>
              </CardHeader>
              <CardContent className="p-0">
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-200">Unlimited documents</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-200">Custom AI model training</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-200">Advanced analytics & reporting</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-200">Unlimited team members</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-200">On-premise deployment</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-200">Full API access & webhooks</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-200">24/7 dedicated support</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-200">SLA guarantees</span>
                  </li>
                </ul>
                <Button className="w-full" variant="outline">
                  Contact Sales
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Free Trial Info */}
          <div className="text-center mt-12">
            <div className="inline-flex items-center px-4 py-2 bg-green-50 rounded-full text-green-800 text-sm font-medium">
              <Zap className="w-4 h-4 mr-2" />
              14-day free trial • No credit card required • Cancel anytime
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600 dark:text-gray-200">
              Everything you need to know about our pricing and plans
            </p>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Can I change plans anytime?
              </h3>
              <p className="text-gray-600 dark:text-gray-200">
                Yes, you can upgrade or downgrade your plan at any time. Changes take effect 
                immediately, and we'll prorate any billing differences.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                What happens if I exceed my document limit?
              </h3>
              <p className="text-gray-600 dark:text-gray-200">
                You'll receive notifications as you approach your limit. You can either upgrade 
                your plan or purchase additional document credits for the current month.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Is my data secure and confidential?
              </h3>
              <p className="text-gray-600 dark:text-gray-200">
                Absolutely. We use enterprise-grade security with end-to-end encryption. Your 
                documents are processed securely and never stored permanently on our servers 
                without your explicit consent.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Do you offer discounts for annual billing?
              </h3>
              <p className="text-gray-600 dark:text-gray-200">
                Yes, all plans include a 20% discount when billed annually. You can switch 
                between monthly and annual billing in your account settings.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                What file formats do you support?
              </h3>
              <p className="text-gray-600 dark:text-gray-200">
                We support PDF, Word documents (DOC/DOCX), text files (TXT), RTF, and email 
                files (MSG/EML). Our OCR technology also processes scanned documents and images.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Can I cancel my subscription?
              </h3>
              <p className="text-gray-600 dark:text-gray-200">
                Yes, you can cancel your subscription at any time. Your access will continue 
                until the end of your current billing period, and no future charges will occur.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Need a custom solution?
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-200 mb-8">
                Our enterprise team can create a tailored plan that fits your organization's 
                specific needs, including custom integrations, specialized training, and 
                dedicated support.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Users className="w-5 h-5 text-brand-800" />
                  <span className="text-gray-700 dark:text-gray-200">Volume discounts for large teams</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Shield className="w-5 h-5 text-brand-800" />
                  <span className="text-gray-700 dark:text-gray-200">Enhanced security and compliance</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Zap className="w-5 h-5 text-brand-800" />
                  <span className="text-gray-700 dark:text-gray-200">Custom AI model training</span>
                </div>
              </div>
            </div>

            <Card className="p-8">
              <CardContent className="p-0">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Get in touch</h3>
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center">
                      <Mail className="w-6 h-6 text-brand-800" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Email Sales</p>
                      <p className="text-gray-600 dark:text-gray-200">sales@legaldocs.ai</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center">
                      <Phone className="w-6 h-6 text-brand-800" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Call Sales</p>
                      <p className="text-gray-600 dark:text-gray-200">+1 (555) 123-4567</p>
                    </div>
                  </div>
                </div>
                <Button className="w-full mt-6">
                  Schedule a Demo
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-brand-800 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to revolutionize your legal workflow?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Start your 14-day free trial today. No credit card required.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/dashboard">
              <Button size="lg" className="bg-white text-brand-800 hover:bg-gray-100 px-8 py-3">
                Start Free Trial
              </Button>
            </Link>
            <Link to="/features">
              <Button variant="outline" size="lg" className="border-2 border-white text-white bg-white/10 hover:bg-white hover:text-brand-800 px-8 py-3">
                View All Features
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
