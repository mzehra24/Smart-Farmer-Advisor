import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { 
  Leaf, 
  Droplets, 
  TestTube, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle,
  Activity,
  Beaker,
  Lightbulb,
  FileText,
  Calendar,
  MapPin
} from 'lucide-react';
import { RadialBarChart, RadialBar, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

interface SoilHealthProps {
  language: string;
}

interface SoilTest {
  id: string;
  date: string;
  location: string;
  pH: number;
  nitrogen: 'low' | 'medium' | 'high';
  phosphorus: 'low' | 'medium' | 'high';
  potassium: 'low' | 'medium' | 'high';
  organicMatter: number;
  moisture: number;
  overallScore: number;
  recommendations: string[];
}

export function SoilHealth({ language }: SoilHealthProps) {
  const [selectedField, setSelectedField] = useState('field1');
  const [testResults, setTestResults] = useState<SoilTest[]>([]);
  const [showNewTest, setShowNewTest] = useState(false);

  const translations = {
    'en': {
      title: 'Soil Health Management',
      subtitle: 'Monitor and improve your soil health with scientific guidance',
      currentHealth: 'Current Soil Health',
      testHistory: 'Test History',
      recommendations: 'Recommendations',
      scheduleTest: 'Schedule New Test',
      quickTest: 'Quick DIY Test',
      labTest: 'Laboratory Test',
      nutrients: 'Nutrient Levels',
      pH: 'pH Level',
      nitrogen: 'Nitrogen',
      phosphorus: 'Phosphorus',
      potassium: 'Potassium',
      organicMatter: 'Organic Matter',
      moisture: 'Soil Moisture',
      overallScore: 'Overall Health Score',
      excellent: 'Excellent',
      good: 'Good',
      fair: 'Fair',
      poor: 'Poor',
      low: 'Low',
      medium: 'Medium',
      high: 'High',
      addAmendments: 'Add Soil Amendments',
      irrigation: 'Adjust Irrigation',
      fertilizer: 'Apply Fertilizer',
      organicMatter: 'Add Organic Matter',
      selectField: 'Select Field',
      testDate: 'Test Date',
      location: 'Field Location',
      viewDetails: 'View Details',
      improvement: 'Improvement Tips'
    },
    'hi': {
      title: 'मिट्टी स्वास्थ्य प्रबंधन',
      subtitle: 'वैज्ञानिक मार्गदर्शन के साथ अपनी मिट्टी के स्वास्थ्य की निगरानी और सुधार करें',
      currentHealth: 'वर्तमान मिट्टी स्वास्थ्य',
      testHistory: 'परीक्षण इतिहास',
      recommendations: 'सिफारिशें',
      scheduleTest: 'नया परीक्षण निर्धारित करें',
      quickTest: 'त्वरित DIY परीक्षण',
      labTest: 'प्रयोगशाला परीक्षण',
      nutrients: 'पोषक तत्व स्तर',
      pH: 'पीएच स्तर',
      nitrogen: 'नाइट्रोजन',
      phosphorus: 'फास्फोरस',
      potassium: 'पोटेशियम',
      organicMatter: 'जैविक पदार्थ',
      moisture: 'मिट्टी की नमी',
      overallScore: 'समग्र स्वास्थ्य स्कोर',
      excellent: 'उत्कृष्ट',
      good: 'अच्छा',
      fair: 'साधारण',
      poor: 'खराब',
      low: 'कम',
      medium: 'मध्यम',
      high: 'उच्च',
      addAmendments: 'मिट्टी सुधारक जोड़ें',
      irrigation: 'सिंचाई समायोजित करें',
      fertilizer: 'उर्वरक डालें',
      organicMatter: 'जैविक पदार्थ जोड़ें',
      selectField: 'खेत चुनें',
      testDate: 'परीक्षण दिनांक',
      location: 'खेत का स्थान',
      viewDetails: 'विवरण देखें',
      improvement: 'सुधार के तरीके'
    }
  };

  const t = translations[language as keyof typeof translations] || translations['en'];

  const currentSoilData: SoilTest = {
    id: '1',
    date: '2024-01-10',
    location: 'Field 1 - North Section',
    pH: 6.8,
    nitrogen: 'medium',
    phosphorus: 'high',
    potassium: 'low',
    organicMatter: 3.2,
    moisture: 68,
    overallScore: 78,
    recommendations: [
      language === 'hi' ? 'पोटेशियम सल्फेट 50 किलो प्रति एकड़ डालें' : 'Apply 50kg Potassium Sulphate per acre',
      language === 'hi' ? 'जैविक खाद 2 टन प्रति एकड़ मिलाएं' : 'Mix 2 tons organic compost per acre',
      language === 'hi' ? 'सिंचाई में 20% कमी करें' : 'Reduce irrigation by 20%',
      language === 'hi' ? 'हरी खाद की फसल उगाएं' : 'Grow green manure crops'
    ]
  };

  const fields = [
    { value: 'field1', label: language === 'hi' ? 'खेत 1 - उत्तरी भाग' : 'Field 1 - North Section' },
    { value: 'field2', label: language === 'hi' ? 'खेत 2 - दक्षिणी भाग' : 'Field 2 - South Section' },
    { value: 'field3', label: language === 'hi' ? 'खेत 3 - पूर्वी भाग' : 'Field 3 - East Section' }
  ];

  const nutrientData = [
    { name: t.nitrogen, value: 65, level: 'medium', color: '#10b981' },
    { name: t.phosphorus, value: 85, level: 'high', color: '#3b82f6' },
    { name: t.potassium, value: 35, level: 'low', color: '#ef4444' }
  ];

  const testHistory = [
    {
      date: '2024-01-10',
      score: 78,
      pH: 6.8,
      nitrogen: 'medium',
      phosphorus: 'high',
      potassium: 'low'
    },
    {
      date: '2023-10-15',
      score: 72,
      pH: 6.5,
      nitrogen: 'low',
      phosphorus: 'medium',
      potassium: 'low'
    },
    {
      date: '2023-07-20',
      score: 68,
      pH: 6.3,
      nitrogen: 'low',
      phosphorus: 'medium',
      potassium: 'medium'
    }
  ];

  const getHealthColor = (score: number) => {
    if (score >= 85) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    if (score >= 55) return 'text-orange-600';
    return 'text-red-600';
  };

  const getHealthStatus = (score: number) => {
    if (score >= 85) return t.excellent;
    if (score >= 70) return t.good;
    if (score >= 55) return t.fair;
    return t.poor;
  };

  const getNutrientLevel = (level: string) => {
    return t[level as keyof typeof t] || level;
  };

  const getNutrientColor = (level: string) => {
    switch (level) {
      case 'high': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const radialData = [
    { name: 'Score', value: currentSoilData.overallScore, fill: '#10b981' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">{t.title}</h2>
        <p className="text-gray-600">{t.subtitle}</p>
      </div>

      {/* Field Selection */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Select value={selectedField} onValueChange={setSelectedField}>
                <SelectTrigger className="w-[250px]">
                  <SelectValue placeholder={t.selectField} />
                </SelectTrigger>
                <SelectContent>
                  {fields.map((field) => (
                    <SelectItem key={field.value} value={field.value}>
                      {field.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <MapPin className="h-4 w-4" />
                <span>{currentSoilData.location}</span>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline">
                <TestTube className="h-4 w-4 mr-2" />
                {t.quickTest}
              </Button>
              <Button>
                <Beaker className="h-4 w-4 mr-2" />
                {t.scheduleTest}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Current Health Overview */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-5 w-5 text-green-600" />
              <span>{t.currentHealth}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Overall Score */}
            <div className="text-center">
              <div className="h-40 w-40 mx-auto mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <RadialBarChart cx="50%" cy="50%" innerRadius="60%" outerRadius="90%" data={radialData}>
                    <RadialBar dataKey="value" cornerRadius={10} fill="#10b981" />
                  </RadialBarChart>
                </ResponsiveContainer>
                <div className="relative -mt-20 text-center">
                  <div className={`text-3xl font-bold ${getHealthColor(currentSoilData.overallScore)}`}>
                    {currentSoilData.overallScore}
                  </div>
                  <div className="text-sm text-gray-600">{getHealthStatus(currentSoilData.overallScore)}</div>
                </div>
              </div>
            </div>

            {/* Key Metrics */}
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <TestTube className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium">{t.pH}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="font-bold">{currentSoilData.pH}</span>
                  <Badge variant={currentSoilData.pH >= 6.0 && currentSoilData.pH <= 7.5 ? 'default' : 'destructive'}>
                    {currentSoilData.pH >= 6.0 && currentSoilData.pH <= 7.5 ? 'Optimal' : 'Adjust'}
                  </Badge>
                </div>
              </div>

              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Droplets className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium">{t.moisture}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="font-bold">{currentSoilData.moisture}%</span>
                  <Badge variant={currentSoilData.moisture >= 60 && currentSoilData.moisture <= 80 ? 'default' : 'secondary'}>
                    {currentSoilData.moisture >= 60 && currentSoilData.moisture <= 80 ? 'Good' : 'Monitor'}
                  </Badge>
                </div>
              </div>

              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Leaf className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium">{t.organicMatter}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="font-bold">{currentSoilData.organicMatter}%</span>
                  <Badge variant={currentSoilData.organicMatter >= 3.0 ? 'default' : 'destructive'}>
                    {currentSoilData.organicMatter >= 3.0 ? 'Good' : 'Low'}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="text-xs text-gray-500 text-center">
              {t.testDate}: {currentSoilData.date}
            </div>
          </CardContent>
        </Card>

        {/* Detailed Analysis */}
        <div className="lg:col-span-2 space-y-6">
          {/* Nutrient Levels */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Beaker className="h-5 w-5 text-blue-600" />
                <span>{t.nutrients}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {nutrientData.map((nutrient, index) => (
                  <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="h-20 w-20 mx-auto mb-3">
                      <ResponsiveContainer width="100%" height="100%">
                        <RadialBarChart cx="50%" cy="50%" innerRadius="50%" outerRadius="80%" data={[{ value: nutrient.value, fill: nutrient.color }]}>
                          <RadialBar dataKey="value" cornerRadius={5} />
                        </RadialBarChart>
                      </ResponsiveContainer>
                      <div className="relative -mt-16 text-center">
                        <div className="text-lg font-bold">{nutrient.value}</div>
                      </div>
                    </div>
                    <p className="font-medium text-sm mb-1">{nutrient.name}</p>
                    <Badge className={getNutrientColor(nutrient.level)}>
                      {getNutrientLevel(nutrient.level)}
                    </Badge>
                  </div>
                ))}
              </div>

              {/* Progress Bars */}
              <div className="space-y-4">
                {nutrientData.map((nutrient, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{nutrient.name}</span>
                      <span className="text-sm text-gray-600">{nutrient.value}%</span>
                    </div>
                    <Progress value={nutrient.value} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Lightbulb className="h-5 w-5 text-yellow-600" />
                <span>{t.recommendations}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentSoilData.recommendations.map((recommendation, index) => (
                  <div key={index} className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                    <div className="flex items-start space-x-3">
                      <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                        {index + 1}
                      </div>
                      <p className="text-sm text-blue-800">{recommendation}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="flex items-center space-x-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-600" />
                  <span className="font-medium text-yellow-800">{t.improvement}</span>
                </div>
                <div className="text-sm text-yellow-800 space-y-1">
                  <p>• {language === 'hi' ? 'नियमित मिट्टी परीक्षण कराएं (6 महीने में एक बार)' : 'Regular soil testing (every 6 months)'}</p>
                  <p>• {language === 'hi' ? 'फसल चक्र अपनाएं' : 'Implement crop rotation'}</p>
                  <p>• {language === 'hi' ? 'जैविक खाद का अधिक उपयोग करें' : 'Increase organic matter usage'}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Test History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5 text-gray-600" />
            <span>{t.testHistory}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* History Chart */}
            <div>
              <h4 className="font-medium mb-4">{t.overallScore} Trend</h4>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={testHistory}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="score" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* History Details */}
            <div>
              <h4 className="font-medium mb-4">Recent Tests</h4>
              <div className="space-y-3">
                {testHistory.map((test, index) => (
                  <div key={index} className="p-3 border rounded-lg hover:bg-gray-50">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-medium">{test.date}</p>
                        <p className="text-sm text-gray-600">pH: {test.pH}</p>
                      </div>
                      <div className="text-right">
                        <div className={`text-lg font-bold ${getHealthColor(test.score)}`}>
                          {test.score}
                        </div>
                        <div className="text-xs text-gray-500">{getHealthStatus(test.score)}</div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Badge className={getNutrientColor(test.nitrogen)} size="sm">N: {getNutrientLevel(test.nitrogen)}</Badge>
                      <Badge className={getNutrientColor(test.phosphorus)} size="sm">P: {getNutrientLevel(test.phosphorus)}</Badge>
                      <Badge className={getNutrientColor(test.potassium)} size="sm">K: {getNutrientLevel(test.potassium)}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}