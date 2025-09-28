import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { 
  TrendingUp, 
  TrendingDown, 
  Droplets, 
  Thermometer, 
  Wind,
  Sun,
  CloudRain,
  Sprout,
  Bug,
  DollarSign,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';

interface DashboardProps {
  language: string;
}

export function Dashboard({ language }: DashboardProps) {
  const translations = {
    'en': {
      title: 'Farm Dashboard',
      subtitle: 'Overview of your farm status and recommendations',
      currentCrops: 'Current Crops',
      weatherToday: "Today's Weather",
      soilHealth: 'Soil Health Score',
      recentAlerts: 'Recent Alerts',
      marketTrends: 'Market Trends',
      quickStats: 'Quick Stats',
      temperature: 'Temperature',
      humidity: 'Humidity',
      rainfall: 'Rainfall',
      windSpeed: 'Wind Speed',
      excellent: 'Excellent',
      good: 'Good',
      fair: 'Fair',
      poor: 'Poor',
      resolved: 'Resolved',
      pending: 'Pending',
      urgent: 'Urgent'
    },
    'hi': {
      title: 'कृषि डैशबोर्ड',
      subtitle: 'आपके खेत की स्थिति और सिफारिशों का अवलोकन',
      currentCrops: 'वर्तमान फसलें',
      weatherToday: 'आज का मौसम',
      soilHealth: 'मिट्टी स्वास्थ्य स्कोर',
      recentAlerts: 'हाल की अलर्ट',
      marketTrends: 'बाजार रुझान',
      quickStats: 'त्वरित आंकड़े',
      temperature: 'तापमान',
      humidity: 'नमी',
      rainfall: 'वर्षा',
      windSpeed: 'हवा की गति',
      excellent: 'उत्कृष्ट',
      good: 'अच्छा',
      fair: 'साधारण',
      poor: 'खराब',
      resolved: 'हल हो गया',
      pending: 'लंबित',
      urgent: 'तत्काल'
    }
  };

  const t = translations[language as keyof typeof translations] || translations['en'];

  const currentCrops = [
    { name: 'Rice', stage: 'Flowering', health: 85, daysToHarvest: 45 },
    { name: 'Wheat', stage: 'Germination', health: 92, daysToHarvest: 120 },
    { name: 'Sugarcane', stage: 'Vegetative', health: 78, daysToHarvest: 280 }
  ];

  const weatherData = {
    temperature: 28,
    humidity: 65,
    rainfall: 2.5,
    windSpeed: 12,
    condition: 'Partly Cloudy'
  };

  const soilHealthScore = 82;

  const recentAlerts = [
    { id: 1, type: 'pest', message: 'Brown planthopper detected', status: 'pending', severity: 'urgent' },
    { id: 2, type: 'weather', message: 'Heavy rainfall expected', status: 'resolved', severity: 'pending' },
    { id: 3, type: 'nutrition', message: 'Nitrogen deficiency in field 2', status: 'pending', severity: 'pending' }
  ];

  const marketPrices = [
    { crop: 'Rice', price: 2800, change: 5.2, trend: 'up' },
    { crop: 'Wheat', price: 2200, change: -2.1, trend: 'down' },
    { crop: 'Sugarcane', price: 350, change: 1.8, trend: 'up' }
  ];

  const getHealthColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 75) return 'text-yellow-600';
    if (score >= 60) return 'text-orange-600';
    return 'text-red-600';
  };

  const getHealthStatus = (score: number) => {
    if (score >= 90) return t.excellent;
    if (score >= 75) return t.good;
    if (score >= 60) return t.fair;
    return t.poor;
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">{t.title}</h2>
        <p className="text-gray-600">{t.subtitle}</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{t.temperature}</p>
                <p className="text-2xl font-bold">{weatherData.temperature}°C</p>
              </div>
              <Thermometer className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{t.humidity}</p>
                <p className="text-2xl font-bold">{weatherData.humidity}%</p>
              </div>
              <Droplets className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{t.rainfall}</p>
                <p className="text-2xl font-bold">{weatherData.rainfall}mm</p>
              </div>
              <CloudRain className="h-8 w-8 text-indigo-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{t.windSpeed}</p>
                <p className="text-2xl font-bold">{weatherData.windSpeed} km/h</p>
              </div>
              <Wind className="h-8 w-8 text-gray-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Current Crops */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Sprout className="h-5 w-5 text-green-600" />
              <span>{t.currentCrops}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {currentCrops.map((crop, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{crop.name}</p>
                    <p className="text-sm text-gray-600">{crop.stage} • {crop.daysToHarvest} days to harvest</p>
                  </div>
                  <Badge variant={crop.health >= 85 ? 'default' : crop.health >= 70 ? 'secondary' : 'destructive'}>
                    {crop.health}% Health
                  </Badge>
                </div>
                <Progress value={crop.health} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Soil Health */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <div className="h-5 w-5 bg-brown-600 rounded-full"></div>
              <span>{t.soilHealth}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <div className={`text-4xl font-bold ${getHealthColor(soilHealthScore)}`}>
                  {soilHealthScore}
                </div>
                <p className="text-sm text-gray-600">{getHealthStatus(soilHealthScore)}</p>
              </div>
              <Progress value={soilHealthScore} className="h-3" />
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-sm text-gray-600">pH Level</p>
                  <p className="font-medium">6.8</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Nitrogen</p>
                  <p className="font-medium">Medium</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Phosphorus</p>
                  <p className="font-medium">High</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
              <span>{t.recentAlerts}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentAlerts.map((alert) => (
              <div key={alert.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  {alert.type === 'pest' && <Bug className="h-4 w-4 text-red-500" />}
                  {alert.type === 'weather' && <CloudRain className="h-4 w-4 text-blue-500" />}
                  {alert.type === 'nutrition' && <Sprout className="h-4 w-4 text-green-500" />}
                  <div>
                    <p className="text-sm font-medium">{alert.message}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge 
                        variant={alert.severity === 'urgent' ? 'destructive' : 'secondary'}
                        className="text-xs h-5"
                      >
                        {alert.severity === 'urgent' ? t.urgent : t.pending}
                      </Badge>
                      {alert.status === 'resolved' && (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Market Trends */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              <span>{t.marketTrends}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {marketPrices.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">{item.crop}</p>
                  <p className="text-lg font-bold">₹{item.price}/quintal</p>
                </div>
                <div className="flex items-center space-x-2">
                  {item.trend === 'up' ? (
                    <TrendingUp className="h-4 w-4 text-green-500" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-500" />
                  )}
                  <span className={`text-sm font-medium ${
                    item.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {item.change > 0 ? '+' : ''}{item.change}%
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}