import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Alert, AlertDescription } from "./ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Progress } from "./ui/progress";
import { 
  Satellite, 
  Eye, 
  Layers, 
  TrendingUp,
  Droplets,
  Thermometer,
  Leaf,
  Camera,
  Download,
  Calendar,
  MapPin,
  Activity
} from 'lucide-react';

interface SatelliteDataProps {
  language: string;
}

export function SatelliteData({ language }: SatelliteDataProps) {
  const [selectedLayer, setSelectedLayer] = useState('ndvi');
  const [timeRange, setTimeRange] = useState('7days');
  const [analysisData, setAnalysisData] = useState({
    ndvi: 0.75,
    moisture: 0.68,
    temperature: 28.5,
    cloudCover: 15
  });

  const translations = {
    'en': {
      title: 'Satellite & Remote Sensing',
      subtitle: 'Monitor crop health and field conditions from space',
      currentView: 'Current View',
      layers: 'Satellite Layers',
      analysis: 'Field Analysis',
      timeRange: 'Time Range',
      download: 'Download Report',
      fieldMonitoring: 'Field Monitoring',
      cropHealth: 'Crop Health Index',
      soilMoisture: 'Soil Moisture',
      surfaceTemp: 'Surface Temperature',
      cloudCover: 'Cloud Coverage',
      lastUpdate: 'Last Updated',
      resolution: 'Resolution',
      satellite: 'Satellite Source',
      alerts: 'Satellite Alerts',
      historicalData: 'Historical Trends'
    },
    'hi': {
      title: 'सैटेलाइट और रिमोट सेंसिंग',
      subtitle: 'अंतरिक्ष से फसल की स्वास्थ्य और खेत की स्थिति की निगरानी करें',
      currentView: 'वर्तमान दृश्य',
      layers: 'सैटेलाइट लेयर्स',
      analysis: 'खेत विश्लेषण',
      timeRange: 'समय सीमा',
      download: 'रिपोर्ट डाउनलोड करें',
      fieldMonitoring: 'खेत निगरानी',
      cropHealth: 'फसल स्वास्थ्य सूचकांक',
      soilMoisture: 'मिट्टी की नमी',
      surfaceTemp: 'सतह का तापमान',
      cloudCover: 'बादल कवरेज',
      lastUpdate: 'अंतिम अपडेट',
      resolution: 'रिज़ॉल्यूशन',
      satellite: 'सैटेलाइट स्रोत',
      alerts: 'सैटेलाइट अलर्ट',
      historicalData: 'ऐतिहासिक रुझान'
    }
  };

  const t = translations[language as keyof typeof translations] || translations.en;

  const satelliteLayers = [
    {
      id: 'ndvi',
      name: 'NDVI (Crop Health)',
      description: 'Normalized Difference Vegetation Index',
      source: 'Sentinel-2',
      resolution: '10m',
      icon: Leaf,
      color: 'bg-green-500'
    },
    {
      id: 'moisture',
      name: 'Soil Moisture',
      description: 'Surface soil moisture content',
      source: 'SMAP',
      resolution: '1km',
      icon: Droplets,
      color: 'bg-blue-500'
    },
    {
      id: 'temperature',
      name: 'Land Surface Temperature',
      description: 'Surface temperature mapping',
      source: 'MODIS',
      resolution: '250m',
      icon: Thermometer,
      color: 'bg-red-500'
    },
    {
      id: 'optical',
      name: 'True Color',
      description: 'Natural color satellite imagery',
      source: 'Sentinel-2',
      resolution: '10m',
      icon: Camera,
      color: 'bg-purple-500'
    }
  ];

  const fieldAnalytics = [
    {
      metric: 'Crop Health (NDVI)',
      value: analysisData.ndvi,
      status: analysisData.ndvi > 0.7 ? 'Excellent' : analysisData.ndvi > 0.5 ? 'Good' : 'Poor',
      change: '+5.2%',
      icon: Leaf,
      color: analysisData.ndvi > 0.7 ? 'text-green-600' : 'text-yellow-600'
    },
    {
      metric: 'Soil Moisture',
      value: analysisData.moisture,
      status: analysisData.moisture > 0.6 ? 'Adequate' : 'Low',
      change: '-2.1%',
      icon: Droplets,
      color: analysisData.moisture > 0.6 ? 'text-blue-600' : 'text-red-600'
    },
    {
      metric: 'Surface Temperature',
      value: analysisData.temperature,
      status: 'Normal',
      change: '+1.5°C',
      icon: Thermometer,
      color: 'text-orange-600'
    },
    {
      metric: 'Cloud Coverage',
      value: analysisData.cloudCover / 100,
      status: analysisData.cloudCover < 20 ? 'Clear' : 'Cloudy',
      change: '-8%',
      icon: Eye,
      color: 'text-gray-600'
    }
  ];

  const satelliteAlerts = [
    {
      id: 1,
      type: 'warning',
      message: 'Decreased vegetation in Field A-3 detected',
      timestamp: '2 hours ago',
      severity: 'medium'
    },
    {
      id: 2,
      type: 'info',
      message: 'New Sentinel-2 imagery available for your region',
      timestamp: '6 hours ago',
      severity: 'low'
    },
    {
      id: 3,
      type: 'success',
      message: 'Soil moisture levels showing improvement',
      timestamp: '1 day ago',
      severity: 'low'
    }
  ];

  const historicalTrends = [
    { date: '2024-01-01', ndvi: 0.45, moisture: 0.72 },
    { date: '2024-01-08', ndvi: 0.52, moisture: 0.69 },
    { date: '2024-01-15', ndvi: 0.61, moisture: 0.65 },
    { date: '2024-01-22', ndvi: 0.68, moisture: 0.63 },
    { date: '2024-01-29', ndvi: 0.75, moisture: 0.68 }
  ];

  useEffect(() => {
    // Simulate real-time data updates
    const interval = setInterval(() => {
      setAnalysisData(prev => ({
        ...prev,
        ndvi: Math.max(0, Math.min(1, prev.ndvi + (Math.random() - 0.5) * 0.02)),
        moisture: Math.max(0, Math.min(1, prev.moisture + (Math.random() - 0.5) * 0.03)),
        temperature: Math.max(15, Math.min(45, prev.temperature + (Math.random() - 0.5) * 0.5)),
        cloudCover: Math.max(0, Math.min(100, prev.cloudCover + (Math.random() - 0.5) * 2))
      }));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{t.title}</h1>
        <p className="text-gray-600">{t.subtitle}</p>
      </div>

      {/* Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Satellite className="h-5 w-5" />
            <span>{t.currentView}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">{t.layers}</label>
              <Select value={selectedLayer} onValueChange={setSelectedLayer}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {satelliteLayers.map((layer) => (
                    <SelectItem key={layer.id} value={layer.id}>
                      {layer.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">{t.timeRange}</label>
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="24hours">Last 24 Hours</SelectItem>
                  <SelectItem value="7days">Last 7 Days</SelectItem>
                  <SelectItem value="30days">Last 30 Days</SelectItem>
                  <SelectItem value="season">Current Season</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button className="w-full">
                <Download className="h-4 w-4 mr-2" />
                {t.download}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Satellite Layers */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Layers className="h-5 w-5" />
              <span>{t.layers}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {satelliteLayers.map((layer) => {
              const Icon = layer.icon;
              return (
                <div 
                  key={layer.id}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                    selectedLayer === layer.id 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedLayer(layer.id)}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${layer.color} bg-opacity-20`}>
                      <Icon className={`h-4 w-4 ${layer.color.replace('bg-', 'text-')}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm">{layer.name}</h3>
                      <p className="text-xs text-gray-600">{layer.description}</p>
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>{layer.source}</span>
                        <span>{layer.resolution}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Map Viewer */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Field View - {satelliteLayers.find(l => l.id === selectedLayer)?.name}</CardTitle>
            <CardDescription>
              {t.lastUpdate}: 2 hours ago | {t.resolution}: {satelliteLayers.find(l => l.id === selectedLayer)?.resolution}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="aspect-video bg-gradient-to-br from-green-100 to-green-300 rounded-lg flex items-center justify-center relative overflow-hidden">
              {/* Simulated satellite map */}
              <div className="absolute inset-0 bg-gradient-to-r from-green-200 via-green-400 to-green-600 opacity-70"></div>
              <div className="absolute top-4 left-4 bg-white rounded-lg p-2 shadow-sm">
                <div className="flex items-center space-x-2 text-sm">
                  <MapPin className="h-4 w-4" />
                  <span>Field Location: 18.5204° N, 73.8567° E</span>
                </div>
              </div>
              <div className="absolute bottom-4 right-4 bg-white rounded-lg p-2 shadow-sm">
                <div className="flex items-center space-x-2 text-sm">
                  <Activity className="h-4 w-4" />
                  <span>Live Data</span>
                </div>
              </div>
              <div className="text-6xl text-white/50">
                <Satellite />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Field Analytics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5" />
            <span>{t.analysis}</span>
          </CardTitle>
          <CardDescription>Real-time satellite-derived field metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {fieldAnalytics.map((metric) => {
              const Icon = metric.icon;
              return (
                <div key={metric.metric} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <Icon className={`h-5 w-5 ${metric.color}`} />
                    <Badge variant="outline">{metric.change}</Badge>
                  </div>
                  <h3 className="font-semibold text-sm mb-2">{metric.metric}</h3>
                  <div className="space-y-2">
                    <Progress 
                      value={metric.value * 100} 
                      className="h-2"
                    />
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">{metric.status}</span>
                      <span className="font-semibold">
                        {metric.metric.includes('Temperature') ? 
                          `${metric.value}°C` : 
                          `${(metric.value * 100).toFixed(1)}%`
                        }
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Satellite Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Eye className="h-5 w-5" />
              <span>{t.alerts}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {satelliteAlerts.map((alert) => (
              <Alert key={alert.id} className={`border-l-4 ${
                alert.severity === 'high' ? 'border-l-red-500' :
                alert.severity === 'medium' ? 'border-l-yellow-500' :
                'border-l-blue-500'
              }`}>
                <AlertDescription>
                  <div className="flex justify-between items-start">
                    <span>{alert.message}</span>
                    <span className="text-xs text-gray-500">{alert.timestamp}</span>
                  </div>
                </AlertDescription>
              </Alert>
            ))}
          </CardContent>
        </Card>

        {/* Historical Trends */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5" />
              <span>{t.historicalData}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {historicalTrends.map((trend, index) => (
                <div key={trend.date} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium">{new Date(trend.date).toLocaleDateString()}</span>
                  <div className="flex space-x-4">
                    <div className="text-center">
                      <div className="text-xs text-gray-600">NDVI</div>
                      <div className="font-semibold">{trend.ndvi.toFixed(2)}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-gray-600">Moisture</div>
                      <div className="font-semibold">{(trend.moisture * 100).toFixed(0)}%</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}