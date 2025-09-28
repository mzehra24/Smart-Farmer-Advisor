import React, { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Alert, AlertDescription } from "./ui/alert";
import { 
  Camera, 
  Upload, 
  X, 
  Bug, 
  Leaf, 
  Shield, 
  AlertTriangle,
  CheckCircle,
  Eye,
  BookOpen,
  Zap
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface PestDetectionProps {
  language: string;
}

interface DetectionResult {
  pest: string;
  confidence: number;
  severity: 'low' | 'medium' | 'high';
  description: string;
  treatment: string[];
  prevention: string[];
}

export function PestDetection({ language }: PestDetectionProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [detectionResult, setDetectionResult] = useState<DetectionResult | null>(null);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const translations = {
    'en': {
      title: 'AI Pest & Disease Detection',
      subtitle: 'Upload crop images for instant pest and disease identification',
      uploadImage: 'Upload Image',
      takePicture: 'Take Picture',
      analyzing: 'Analyzing Image...',
      detected: 'Detection Results',
      confidence: 'Confidence',
      severity: 'Severity Level',
      description: 'Description',
      treatment: 'Treatment Options',
      prevention: 'Prevention Methods',
      tryAnother: 'Analyze Another Image',
      recentDetections: 'Recent Detections',
      commonPests: 'Common Pests in Your Area',
      natural: 'Natural',
      chemical: 'Chemical',
      integrated: 'Integrated',
      low: 'Low',
      medium: 'Medium',
      high: 'High',
      emergency: 'Emergency',
      dragDrop: 'Drag and drop an image here, or click to select',
      supportedFormats: 'Supported formats: JPG, PNG, WebP',
      maxSize: 'Maximum size: 10MB'
    },
    'hi': {
      title: 'AI कीट और रोग पहचान',
      subtitle: 'तुरंत कीट और रोग की पहचान के लिए फसल की तस्वीरें अपलोड करें',
      uploadImage: 'तस्वीर अपलोड करें',
      takePicture: 'तस्वीर लें',
      analyzing: 'तस्वीर का विश्लेषण कर रहे हैं...',
      detected: 'पहचान परिणाम',
      confidence: 'विश्वसनीयता',
      severity: 'गंभीरता स्तर',
      description: 'विवरण',
      treatment: 'उपचार विकल्प',
      prevention: 'रोकथाम के तरीके',
      tryAnother: 'दूसरी तस्वीर का विश्लेषण करें',
      recentDetections: 'हाल की पहचान',
      commonPests: 'आपके क्षेत्र में आम कीट',
      natural: 'प्राकृतिक',
      chemical: 'रासायनिक',
      integrated: 'एकीकृत',
      low: 'कम',
      medium: 'मध्यम',
      high: 'उच्च',
      emergency: 'आपातकाल',
      dragDrop: 'यहाँ एक तस्वीर खींचें और छोड़ें, या चुनने के लिए क्लिक करें',
      supportedFormats: 'समर्थित प्रारूप: JPG, PNG, WebP',
      maxSize: 'अधिकतम आकार: 10MB'
    }
  };

  const t = translations[language as keyof typeof translations] || translations['en'];

  const commonPests = [
    {
      name: language === 'hi' ? 'भूरा प्लांटहॉपर' : 'Brown Planthopper',
      crop: language === 'hi' ? 'धान' : 'Rice',
      severity: 'high',
      season: language === 'hi' ? 'मानसून' : 'Monsoon'
    },
    {
      name: language === 'hi' ? 'पत्ती लपेटने वाला कीड़ा' : 'Leaf Folder',
      crop: language === 'hi' ? 'धान' : 'Rice',
      severity: 'medium',
      season: language === 'hi' ? 'खरीफ' : 'Kharif'
    },
    {
      name: language === 'hi' ? 'तना बेधक' : 'Stem Borer',
      crop: language === 'hi' ? 'गन्ना' : 'Sugarcane',
      severity: 'high',
      season: language === 'hi' ? 'साल भर' : 'Year-round'
    },
    {
      name: language === 'hi' ? 'अमेरिकी सुंडी' : 'American Bollworm',
      crop: language === 'hi' ? 'कपास' : 'Cotton',
      severity: 'high',
      season: language === 'hi' ? 'रबी' : 'Rabi'
    }
  ];

  const recentDetections = [
    {
      pest: language === 'hi' ? 'भूरा प्लांटहॉपर' : 'Brown Planthopper',
      date: '2024-01-15',
      confidence: 94,
      severity: 'high' as const
    },
    {
      pest: language === 'hi' ? 'बैक्टीरियल ब्लाइट' : 'Bacterial Blight',
      date: '2024-01-14',
      confidence: 88,
      severity: 'medium' as const
    },
    {
      pest: language === 'hi' ? 'पत्ती लपेटने वाला कीड़ा' : 'Leaf Folder',
      date: '2024-01-13',
      confidence: 76,
      severity: 'low' as const
    }
  ];

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        analyzeImage();
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = async () => {
    setIsAnalyzing(true);
    setAnalysisProgress(0);
    setDetectionResult(null);

    // Simulate analysis progress
    const progressInterval = setInterval(() => {
      setAnalysisProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    // Simulate detection result after 2 seconds
    setTimeout(() => {
      setIsAnalyzing(false);
      setDetectionResult({
        pest: language === 'hi' ? 'भूरा प्लांटहॉपर (Brown Planthopper)' : 'Brown Planthopper',
        confidence: 92,
        severity: 'high',
        description: language === 'hi' 
          ? 'यह एक गंभीर कीट है जो धान की फसल को नुकसान पहुंचाता है। यह पौधे का रस चूसता है और वायरस फैलाता है।'
          : 'A serious pest that damages rice crops by sucking plant sap and transmitting viruses.',
        treatment: language === 'hi' 
          ? [
              'नीम तेल का छिड़काव (10ml प्रति लीटर पानी)',
              'इमिडाक्लोप्रिड 17.8% SL @ 0.3ml प्रति लीटर',
              'जैविक नियंत्रण - ट्राइकोग्रामा कार्ड का उपयोग'
            ]
          : [
              'Spray neem oil (10ml per liter of water)',
              'Imidacloprid 17.8% SL @ 0.3ml per liter',
              'Biological control - Use Trichogramma cards'
            ],
        prevention: language === 'hi'
          ? [
              'नर्सरी में जाली का उपयोग करें',
              'प्रतिरोधी किस्मों का चयन करें',
              'खेत की नियमित निगरानी करें',
              'पानी का प्रबंधन सही रखें'
            ]
          : [
              'Use nets in nursery',
              'Choose resistant varieties',
              'Regular field monitoring',
              'Proper water management'
            ]
      });
    }, 2000);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        analyzeImage();
      };
      reader.readAsDataURL(file);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'high': return <AlertTriangle className="h-4 w-4" />;
      case 'medium': return <Eye className="h-4 w-4" />;
      case 'low': return <CheckCircle className="h-4 w-4" />;
      default: return <Bug className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">{t.title}</h2>
        <p className="text-gray-600">{t.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Detection Area */}
        <div className="lg:col-span-2 space-y-6">
          {/* Image Upload */}
          <Card>
            <CardContent className="p-6">
              {!selectedImage ? (
                <div
                  className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors cursor-pointer"
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Camera className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-lg font-medium text-gray-700 mb-2">{t.dragDrop}</p>
                  <p className="text-sm text-gray-500 mb-4">{t.supportedFormats}</p>
                  <p className="text-xs text-gray-400">{t.maxSize}</p>
                
                  <div className="flex justify-center space-x-4 mt-6">
                    <Button onClick={() => fileInputRef.current?.click()}>
                      <Upload className="h-4 w-4 mr-2" />
                      {t.uploadImage}
                    </Button>
                    <Button variant="outline">
                      <Camera className="h-4 w-4 mr-2" />
                      {t.takePicture}
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="relative">
                    <ImageWithFallback
                      src={selectedImage}
                      alt="Uploaded crop image"
                      className="w-full h-64 object-cover rounded-lg"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() => {
                        setSelectedImage(null);
                        setDetectionResult(null);
                        setIsAnalyzing(false);
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  {isAnalyzing && (
                    <div className="space-y-3">
                      <p className="text-center font-medium">{t.analyzing}</p>
                      <Progress value={analysisProgress} className="w-full" />
                    </div>
                  )}
                </div>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </CardContent>
          </Card>

          {/* Detection Results */}
          {detectionResult && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bug className="h-5 w-5 text-red-600" />
                  <span>{t.detected}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Pest/Disease</p>
                    <p className="font-bold text-lg">{detectionResult.pest}</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">{t.confidence}</p>
                    <p className="font-bold text-lg text-green-600">{detectionResult.confidence}%</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">{t.severity}</p>
                    <Badge className={getSeverityColor(detectionResult.severity)}>
                      {getSeverityIcon(detectionResult.severity)}
                      <span className="ml-1">{t[detectionResult.severity as keyof typeof t]}</span>
                    </Badge>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2 flex items-center">
                    <BookOpen className="h-4 w-4 mr-2" />
                    {t.description}
                  </h4>
                  <p className="text-gray-700">{detectionResult.description}</p>
                </div>

                <div>
                  <h4 className="font-semibold mb-3 flex items-center">
                    <Zap className="h-4 w-4 mr-2" />
                    {t.treatment}
                  </h4>
                  <div className="space-y-2">
                    {detectionResult.treatment.map((treatment, index) => (
                      <div key={index} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                        <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">
                          {index + 1}
                        </div>
                        <p className="text-sm">{treatment}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3 flex items-center">
                    <Shield className="h-4 w-4 mr-2" />
                    {t.prevention}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {detectionResult.prevention.map((prevention, index) => (
                      <div key={index} className="flex items-center space-x-2 p-2 bg-green-50 rounded">
                        <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                        <p className="text-sm">{prevention}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <Button onClick={() => {
                  setSelectedImage(null);
                  setDetectionResult(null);
                }} className="w-full">
                  {t.tryAnother}
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Recent Detections */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{t.recentDetections}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentDetections.map((detection, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <p className="font-medium text-sm">{detection.pest}</p>
                    <Badge className={getSeverityColor(detection.severity)} size="sm">
                      {getSeverityIcon(detection.severity)}
                    </Badge>
                  </div>
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>{detection.date}</span>
                    <span>{detection.confidence}% {t.confidence}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Common Pests */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{t.commonPests}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {commonPests.map((pest, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-medium text-sm">{pest.name}</p>
                      <p className="text-xs text-gray-600">{pest.crop}</p>
                    </div>
                    <Badge className={getSeverityColor(pest.severity)} size="sm">
                      {getSeverityIcon(pest.severity)}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-500">{pest.season}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Emergency Alert */}
          <Alert className="border-red-200 bg-red-50">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              {language === 'hi' 
                ? 'गंभीर संक्रमण के मामले में तुरंत स्थानीय कृषि अधिकारी से संपर्क करें।'
                : 'Contact your local agricultural officer immediately for severe infestations.'
              }
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </div>
  );
}