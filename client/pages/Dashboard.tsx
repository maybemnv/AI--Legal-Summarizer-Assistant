import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import {
  FileText,
  Upload,
  Sparkles,
  Shield,
  Clock,
  CheckCircle,
  Download,
  Eye,
  Search,
  Filter,
  MoreVertical,
  Calendar,
  User,
  LogOut,
  Settings,
  Bell,
  Plus
} from "lucide-react";
import { Link } from "react-router-dom";
import { DocumentSummaryResponse } from "@shared/api";

interface DocumentHistory {
  id: string;
  name: string;
  uploadDate: string;
  status: 'completed' | 'processing' | 'failed';
  summary?: DocumentSummaryResponse;
  fileSize: string;
  fileType: string;
}

export default function Dashboard() {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Document history data - empty initially, will be populated when documents are processed
  const [documentHistory, setDocumentHistory] = useState<DocumentHistory[]>([]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0]);
    }
  };

  const handleFileUpload = (file: File) => {
    const allowedTypes = ['.pdf', '.doc', '.docx', '.txt'];
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();

    if (!allowedTypes.includes(fileExtension)) {
      setError('Please upload a PDF, DOC, DOCX, or TXT file.');
      return;
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      setError('File size must be less than 10MB.');
      return;
    }

    setError(null);
    setUploadedFile(file);
  };

  const generateSummary = async () => {
    if (!uploadedFile) return;

    setIsProcessing(true);
    setProgress(0);

    try {
      // Simulate processing progress
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + Math.random() * 15;
        });
      }, 500);

      // Create form data for file upload
      const formData = new FormData();
      // formData.append('document', uploadedFile);
      formData.append('file', uploadedFile);

      // Call the API endpoint
      // const response = await fetch('/api/process-document', {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Please log in first.");
        return;
      }
      console.log("Using token:", token);  // Add this line

      const response = await fetch('http://127.0.0.1:8000/summarize', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`, // ✅ FIXED: Correct template literal
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to process document');
      }

      const result: DocumentSummaryResponse = await response.json();

      clearInterval(progressInterval);
      setProgress(100);

      console.log("Full summary response from backend:", result);

      // Add the processed document to history
      const newDocument: DocumentHistory = {
        id: Date.now().toString(),
        name: uploadedFile.name,
        uploadDate: new Date().toISOString(),
        status: 'completed',
        summary: result,
        fileSize: (uploadedFile.size / 1024 / 1024).toFixed(2) + ' MB',
        fileType: uploadedFile.name.split('.').pop()?.toUpperCase() || 'Unknown'
      };

      setDocumentHistory(prev => [newDocument, ...prev]);

      // Reset upload state
      setUploadedFile(null);
      setProgress(0);
      setIsProcessing(false);

      // Success message
      alert('Document processed successfully! You can view it in the Recent Documents section below.');

    } catch (err) {
      setError('Failed to process document. Please try again.');
      setIsProcessing(false);
      setProgress(0);
    }
  };

  const resetUpload = () => {
    setUploadedFile(null);
    setError(null);
    setProgress(0);
  };

  const filteredDocuments = documentHistory.filter(doc =>
    doc.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
      case 'processing':
        return <Badge className="bg-yellow-100 text-yellow-800">Processing</Badge>;
      case 'failed':
        return <Badge className="bg-red-100 text-red-800">Failed</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-brand-800 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900 dark:text-white">LegalDocs AI</span>
              </Link>
              <div className="hidden md:block">
                <Badge variant="outline" className="ml-4">Dashboard</Badge>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Bell className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
              <ThemeToggle />
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-gray-600 dark:text-gray-200" />
                </div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">User</span>
              </div>
              <Link to="/">
                <Button variant="ghost" size="sm">
                  <LogOut className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Welcome back, User!</h1>
          <p className="text-gray-600 dark:text-gray-200">Analyze legal documents with AI-powered insights</p>
        </div>

        <Tabs defaultValue="upload" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
            <TabsTrigger value="upload" className="flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>New Document</span>
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span>Recent Documents</span>
            </TabsTrigger>
          </TabsList>

          {/* Upload Tab */}
          <TabsContent value="upload" className="space-y-6">
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 dark:text-white">
                  <Upload className="w-5 h-5 text-brand-800" />
                  <span>Upload Legal Document</span>
                </CardTitle>
                <CardDescription className="dark:text-gray-200">
                  Upload your legal document to get AI-powered analysis and summaries
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!uploadedFile ? (
                  <div
                    className={`border-2 border-dashed rounded-xl p-12 text-center transition-all duration-200 ${isDragging
                      ? 'border-brand-400 bg-brand-50 dark:bg-brand-900/20'
                      : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                      }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                  >
                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <FileText className="w-8 h-8 text-gray-600 dark:text-gray-200" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      Drag and drop your document
                    </h3>
                    <p className="text-gray-600 dark:text-gray-200 mb-6">
                      Or click to browse and select a file from your computer
                    </p>
                    <input
                      type="file"
                      onChange={handleFileSelect}
                      accept=".pdf,.doc,.docx,.txt"
                      className="hidden"
                      id="file-upload"
                    />
                    <label htmlFor="file-upload" className="inline-block cursor-pointer">
                      <div className="inline-flex items-center justify-center px-6 py-3 text-lg font-medium text-white bg-brand-800 rounded-lg hover:bg-brand-700 transition-colors">
                        <Upload className="w-5 h-5 mr-2" />
                        Choose File
                      </div>
                    </label>
                    <p className="text-sm text-gray-500 dark:text-gray-200 mt-4">
                      Supports PDF, DOC, DOCX, TXT (max 10MB)
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                          <CheckCircle className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium text-green-900">{uploadedFile.name}</p>
                          <p className="text-sm text-green-700">
                            {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB • Ready to process
                          </p>
                        </div>
                      </div>
                      <Button variant="ghost" onClick={resetUpload}>
                        <span className="sr-only">Remove file</span>
                        ×
                      </Button>
                    </div>

                    {isProcessing ? (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Processing document...</span>
                          <span className="text-sm text-gray-500 dark:text-gray-200">{Math.round(progress)}%</span>
                        </div>
                        <Progress value={progress} className="w-full" />
                        <p className="text-sm text-gray-600 dark:text-gray-200 text-center">
                          This usually takes 30-60 seconds depending on document size
                        </p>
                      </div>
                    ) : (
                      <div className="flex justify-center">
                        <Button onClick={generateSummary} size="lg" className="px-8">
                          <Sparkles className="w-5 h-5 mr-2" />
                          Generate Summary
                        </Button>
                      </div>
                    )}
                  </div>
                )}

                {error && (
                  <Alert className="mt-4">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-brand-100 dark:bg-brand-900/30 rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-brand-800 dark:text-brand-400" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">Endless</p>
                      <p className="text-sm text-gray-600 dark:text-gray-200">Document Processing</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                      <Shield className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">100%</p>
                      <p className="text-sm text-gray-600 dark:text-gray-200">Secure Processing</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Documents History */}
            <Card className="dark:bg-gray-800 dark:border-gray-700" />
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history" className="space-y-6">
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="dark:text-white">Document History</CardTitle>
                    <CardDescription className="dark:text-gray-200">
                      View and manage your previously processed documents
                    </CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <input
                        type="text"
                        placeholder="Search documents..."
                        className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent dark:placeholder-gray-400"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <Button variant="outline" size="sm">
                      <Filter className="w-4 h-4 mr-2" />
                      Filter
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {filteredDocuments.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <FileText className="w-8 h-8 text-gray-400 dark:text-gray-500" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No documents yet</h3>
                    <p className="text-gray-600 dark:text-gray-200">
                      Upload and process your first document to see it here
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredDocuments.map((doc) => (
                      <div key={doc.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex items-start space-x-4 flex-1">
                            <div className="w-10 h-10 bg-brand-100 dark:bg-brand-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                              <FileText className="w-5 h-5 text-brand-800 dark:text-brand-400" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center space-x-3 mb-2">
                                <h3 className="font-medium text-gray-900 dark:text-white truncate">{doc.name}</h3>
                                {getStatusBadge(doc.status)}
                              </div>
                              <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-200">
                                <span className="flex items-center space-x-1">
                                  <Calendar className="w-4 h-4" />
                                  <span>{formatDate(doc.uploadDate)}</span>
                                </span>
                                <span>{doc.fileSize}</span>
                                <span>{doc.fileType}</span>
                                <span>{doc.summary?.metadata?.pages ?? 'N/A'} pages</span>

                              </div>
                              {doc.summary && (
                                <p className="mt-2 text-sm text-gray-600 dark:text-gray-200 line-clamp-2">
                                  {doc.summary.summary}
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center space-x-2 ml-4">
                            {doc.status === 'completed' && (
                              <>
                                <Button variant="ghost" size="sm">
                                  <Eye className="w-4 h-4" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <Download className="w-4 h-4" />
                                </Button>
                              </>
                            )}
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>

                        {doc.summary && (
                          <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                            <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Summary:</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-200">{doc.summary.summary}</p>

                            <h4 className="text-sm font-medium text-gray-900 dark:text-white mt-4 mb-2">Sources:</h4>
                            <ul className="space-y-2">
                              {doc.summary.sources?.slice(0, 3).map((source, index) => (
                                <li key={index} className="text-sm text-gray-600 dark:text-gray-200">
                                  <span className="font-semibold">Page {source.page}:</span> {source.text}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
