import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Alert, AlertDescription } from "./ui/alert";
import { Progress } from "./ui/progress";
import { Switch } from "./ui/switch";
import { 
  CloudRain, 
  Thermometer, 
  Wind, 
  Eye,
  Droplets,
  Sun,
  Gauge,
  Activity,
  MapPin,
  Battery,
  Wifi,
  AlertTriangle,
  TrendingUp,
  Calendar,
  Download
} from 'lucide-react';

interface WeatherStationsProps {
  language: string;
}

export function WeatherStations({ language }: WeatherStationsProps) {
  const [selectedStation, setSelectedStation] = useState('station-1');
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [weatherData, setWeatherData] = useState({
    temperature: 28.5,
    humidity: 72,
    rainfall: 12.5,
    windSpeed: 8.2,
    pressure: 1013.2,
    uvIndex: 6.8,
    soilTemp: 26.3,
    visibility: 15
  });

  const translations = {
    'en': {
      title: 'Weather Stations Network',
      subtitle: 'Hyperlocal weather monitoring for precise agricultural decisions',
      stations: 'Active Stations',
      currentWeather: 'Current Weather',
      forecast: '24-Hour Forecast',
      alerts: 'Weather Alerts',
      battery: 'Battery Level',
      signal: 'Signal Strength',
      lastUpdate: 'Last Update',
      autoRefresh: 'Auto Refresh',
      downloadData: 'Download Data',
      calibrate: 'Calibrate',
      maintenance: 'Maintenance',
      hyperlocalForecast: 'Hyperlocal Forecast'
    },
    'hi': {
      title: 'मौसम स्टेशन नेटवर्क',
      subtitle: 'सटीक कृषि निर्णयों के लिए हाइपरलोकल मौसम निगरानी',
      stations: 'सक्रिय स्टेशन',
      currentWeather: 'वर्तमान मौसम',
      forecast: '24-घंटे पूर्वानुमान',
      alerts: 'मौसम चेतावनी',
      battery: 'बैटरी स्तर',
      signal: 'सिग्नल शक्ति',
      lastUpdate: 'अंतिम अपडेट',
      autoRefresh: 'ऑटो रिफ्रेश',
      downloadData: 'डेटा डाउनलोड करें',
      calibrate: 'कैलिब्रेट करें',
      maintenance: 'रखरखाव',
      hyperlocalForecast: 'हाइपरलोकल पूर्वानुमान'
    }
  };

  const t = translations[language as keyof typeof translations] || translations.en;

  const weatherStations = [
    {
      id: 'station-1',
      name: 'Field A - Main Station',
      location: { lat: 18.5204, lng: 73.8567 },
      battery: 92,
      signal: 95,
      status: 'online',
      lastUpdate: '1 minute ago',
      elevation: 560,
      data: {
        temperature: 28.5,
        humidity: 72,
        rainfall: 12.5,
        windSpeed: 8.2,
        pressure: 1013.2,
        uvIndex: 6.8,
        soilTemp: 26.3,
        visibility: 15
      }
    },
    {
      id: 'station-2',
      name: 'Field B - North Station',
      location: { lat: 18.5224, lng: 73.8587 },
      battery: 78,
      signal: 89,
      status: 'online',
      lastUpdate: '2 minutes ago',
      elevation: 565,
      data: {
        temperature: 27.8,
        humidity: 75,
        rainfall: 15.2,
        windSpeed: 9.1,
        pressure: 1012.8,
        uvIndex: 6.5,
        soilTemp: 25.8,
        visibility: 12
      }
    },
    {
      id: 'station-3',
      name: 'Field C - South Station',
      location: { lat: 18.5184, lng: 73.8547 },
      battery: 45,
      signal: 82,
      status: 'warning',
      lastUpdate: '8 minutes ago',
      elevation: 555,
      data: {
        temperature: 29.2,
        humidity: 68,
        rainfall: 8.7,
        windSpeed: 7.5,
        pressure: 1013.8,
        uvIndex: 7.2,
        soilTemp: 27.1,
        visibility: 18
      }
    }
  ];

  const weatherParameters = [
    {
      id: 'temperature',
      name: 'Air Temperature',
      value: weatherData.temperature,
      unit: '°C',
      icon: Thermometer,
      color: 'text-red-500',
      optimal: { min: 20, max: 35 }
    },
    {
      id: 'humidity',
      name: 'Humidity',
      value: weatherData.humidity,
      unit: '%',
      icon: Droplets,
      color: 'text-blue-500',
      optimal: { min: 40, max: 80 }
    },
    {
      id: 'rainfall',
      name: 'Rainfall (24h)',
      value: weatherData.rainfall,
      unit: 'mm',
      icon: CloudRain,
      color: 'text-indigo-500',
      optimal: { min: 0, max: 50 }
    },
    {
      id: 'windSpeed',
      name: 'Wind Speed',
      value: weatherData.windSpeed,
      unit: 'km/h',
      icon: Wind,
      color: 'text-gray-500',
      optimal: { min: 0, max: 25 }
    },
    {
      id: 'pressure',
      name: 'Atmospheric Pressure',
      value: weatherData.pressure,
      unit: 'hPa',
      icon: Gauge,
      color: 'text-purple-500',
      optimal: { min: 1000, max: 1020 }
    },
    {
      id: 'uvIndex',
      name: 'UV Index',
      value: weatherData.uvIndex,
      unit: '',
      icon: Sun,
      color: 'text-yellow-500',
      optimal: { min: 0, max: 10 }
    },
    {
      id: 'soilTemp',
      name: 'Soil Temperature',
      value: weatherData.soilTemp,
      unit: '°C',
      icon: Thermometer,
      color: 'text-orange-500',
      optimal: { min: 15, max: 30 }
    },
    {
      id: 'visibility',
      name: 'Visibility',
      value: weatherData.visibility,
      unit: 'km',
      icon: Eye,
      color: 'text-teal-500',
      optimal: { min: 5, max: 20 }
    }
  ];

  const weatherAlerts = [
    {
      id: 1,
      stationId: 'station-2',
      type: 'warning',
      severity: 'medium',
      message: 'Heavy rainfall expected (25-50mm) in next 6 hours',
      timestamp: '15 minutes ago',
      validUntil: '2024-01-30 18:00'
    },
    {
      id: 2,
      stationId: 'station-3',
      type: 'info',
      severity: 'low',
      message: 'High UV index detected - protect crops from direct sunlight',
      timestamp: '1 hour ago',
      validUntil: '2024-01-30 17:00'
    },
    {
      id: 3,
      stationId: 'station-1',
      type: 'critical',
      severity: 'high',
      message: 'Strong wind advisory (>25 km/h) - secure loose structures',
      timestamp: '2 hours ago',
      validUntil: '2024-01-30 20:00'
    }
  ];

  const hourlyForecast = [
    { time: '12:00', temp: 28, humidity: 72, rainfall: 0, windSpeed: 8 },
    { time: '13:00', temp: 29, humidity: 70, rainfall: 2, windSpeed: 9 },
    { time: '14:00', temp: 30, humidity: 68, rainfall: 5, windSpeed: 11 },
    { time: '15:00', temp: 31, humidity: 65, rainfall: 8, windSpeed: 12 },
    { time: '16:00', temp: 29, humidity: 72, rainfall: 15, windSpeed: 10 },
    { time: '17:00', temp: 27, humidity: 78, rainfall: 12, windSpeed: 8 },
    { time: '18:00', temp: 25, humidity: 82, rainfall: 5, windSpeed: 6 },
    { time: '19:00', temp: 24, humidity: 85, rainfall: 0, windSpeed: 5 }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'online': return <Badge className="bg-green-100 text-green-800">Online</Badge>;
      case 'warning': return <Badge className="bg-yellow-100 text-yellow-800">Warning</Badge>;
      case 'critical': return <Badge className="bg-red-100 text-red-800">Critical</Badge>;
      default: return <Badge variant="secondary">Offline</Badge>;
    }
  };

  const getParameterStatus = (param: any) => {
    const { value, optimal } = param;
    if (value >= optimal.min && value <= optimal.max) return 'normal';
    if (value < optimal.min * 0.5 || value > optimal.max * 1.5) return 'critical';
    return 'warning';
  };

  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      const currentStation = weatherStations.find(s => s.id === selectedStation);
      if (currentStation) {
        setWeatherData(prev => ({
          temperature: Math.max(15, Math.min(45, prev.temperature + (Math.random() - 0.5) * 0.5)),
          humidity: Math.max(30, Math.min(95, prev.humidity + (Math.random() - 0.5) * 2)),
          rainfall: Math.max(0, prev.rainfall + (Math.random() - 0.8) * 2),
          windSpeed: Math.max(0, Math.min(40, prev.windSpeed + (Math.random() - 0.5) * 1)),
          pressure: Math.max(990, Math.min(1030, prev.pressure + (Math.random() - 0.5) * 0.5)),
          uvIndex: Math.max(0, Math.min(12, prev.uvIndex + (Math.random() - 0.5) * 0.2)),
          soilTemp: Math.max(10, Math.min(40, prev.soilTemp + (Math.random() - 0.5) * 0.3)),
          visibility: Math.max(1, Math.min(25, prev.visibility + (Math.random() - 0.5) * 1))
        }));
      }
    }, 15000);

    return () => clearInterval(interval);
  }, [autoRefresh, selectedStation]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{t.title}</h1>
            <p className="text-gray-600">{t.subtitle}</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm">{t.autoRefresh}</span>
              <Switch checked={autoRefresh} onCheckedChange={setAutoRefresh} />
            </div>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              {t.downloadData}
            </Button>
          </div>
        </div>
      </div>

      {/* Station Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 p-2 rounded-lg">
                <Activity className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">{t.stations}</p>
                <p className="text-xl font-bold">3/3</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="bg-green-100 p-2 rounded-lg">
                <Thermometer className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Avg Temperature</p>
                <p className="text-xl font-bold">28.5°C</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="bg-indigo-100 p-2 rounded-lg">
                <CloudRain className="h-5 w-5 text-indigo-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Rainfall (24h)</p>
                <p className="text-xl font-bold">12.1mm</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="bg-red-100 p-2 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Active Alerts</p>
                <p className="text-xl font-bold">3</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weather Stations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MapPin className="h-5 w-5" />
              <span>{t.stations}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {weatherStations.map((station) => (
              <div 
                key={station.id}
                className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                  selectedStation === station.id 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => {
                  setSelectedStation(station.id);
                  setWeatherData(station.data);
                }}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-sm">{station.name}</h3>
                  {getStatusBadge(station.status)}
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>Elevation: {station.elevation}m</span>
                    <span>{station.data.temperature}°C</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <Battery className="h-3 w-3 text-gray-500" />
                      <span className="text-xs">{station.battery}%</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Wifi className="h-3 w-3 text-gray-500" />
                      <span className="text-xs">{station.signal}%</span>
                    </div>
                  </div>
                  
                  <Progress value={station.battery} className="h-1" />
                  
                  <p className="text-xs text-gray-500">{t.lastUpdate}: {station.lastUpdate}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Current Weather */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CloudRain className="h-5 w-5" />
              <span>{t.currentWeather}</span>
            </CardTitle>
            <CardDescription>
              {weatherStations.find(s => s.id === selectedStation)?.name}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {weatherParameters.map((param) => {
                const Icon = param.icon;
                const status = getParameterStatus(param);
                return (
                  <div key={param.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <Icon className={`h-4 w-4 ${param.color}`} />
                        <span className="font-medium text-sm">{param.name}</span>
                      </div>
                      <TrendingUp className={`h-3 w-3 ${
                        status === 'normal' ? 'text-green-500' : 
                        status === 'warning' ? 'text-yellow-500' : 'text-red-500'
                      }`} />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-end">
                        <span className="text-2xl font-bold">
                          {param.value.toFixed(param.unit === '°C' || param.unit === 'hPa' ? 1 : 0)}
                        </span>
                        <span className="text-sm text-gray-600">{param.unit}</span>
                      </div>
                      
                      <div className="text-xs text-gray-500">
                        Normal: {param.optimal.min}{param.unit} - {param.optimal.max}{param.unit}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 24-Hour Forecast */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5" />
            <span>{t.hyperlocalForecast}</span>
          </CardTitle>
          <CardDescription>Next 24 hours prediction based on local weather station data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
            {hourlyForecast.map((hour, index) => (
              <div key={index} className="text-center p-3 border rounded-lg">
                <div className="text-sm font-medium mb-2">{hour.time}</div>
                <div className="space-y-2">
                  <div className="flex items-center justify-center">
                    <Thermometer className="h-4 w-4 text-red-500 mr-1" />
                    <span className="text-sm">{hour.temp}°</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <Droplets className="h-4 w-4 text-blue-500 mr-1" />
                    <span className="text-xs">{hour.humidity}%</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <CloudRain className="h-4 w-4 text-indigo-500 mr-1" />
                    <span className="text-xs">{hour.rainfall}mm</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <Wind className="h-4 w-4 text-gray-500 mr-1" />
                    <span className="text-xs">{hour.windSpeed}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Weather Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5" />
            <span>{t.alerts}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {weatherAlerts.map((alert) => (
            <Alert key={alert.id} className={`border-l-4 ${
              alert.severity === 'high' ? 'border-l-red-500' :
              alert.severity === 'medium' ? 'border-l-yellow-500' :
              'border-l-blue-500'
            }`}>
              <AlertDescription>
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-semibold">
                      {weatherStations.find(s => s.id === alert.stationId)?.name}
                    </div>
                    <div>{alert.message}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      Valid until: {alert.validUntil}
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className={`${
                      alert.severity === 'high' ? 'bg-red-100 text-red-800' :
                      alert.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {alert.severity.toUpperCase()}
                    </Badge>
                    <div className="text-xs text-gray-500 mt-1">{alert.timestamp}</div>
                  </div>
                </div>
              </AlertDescription>
            </Alert>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}