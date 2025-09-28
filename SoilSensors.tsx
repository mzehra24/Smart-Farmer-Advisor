import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Alert, AlertDescription } from "./ui/alert";
import { Progress } from "./ui/progress";
import { Switch } from "./ui/switch";
import { 
  Thermometer, 
  Droplets, 
  Zap, 
  Beaker,
  Gauge,
  Activity,
  MapPin,
  Battery,
  Wifi,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Download
} from 'lucide-react';

interface SoilSensorsProps {
  language: string;
}

export function SoilSensors({ language }: SoilSensorsProps) {
  const [selectedSensor, setSelectedSensor] = useState('sensor-1');
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [sensorData, setSensorData] = useState({
    pH: 6.8,
    nitrogen: 45,
    phosphorus: 32,
    potassium: 180,
    moisture: 68,
    temperature: 24.5,
    salinity: 0.3,
    conductivity: 1.2
  });

  const translations = {
    'en': {
      title: 'Soil Sensors Network',
      subtitle: 'Real-time monitoring of soil parameters across your fields',
      sensors: 'Active Sensors',
      realTimeData: 'Real-time Data',
      parameters: 'Soil Parameters',
      alerts: 'Sensor Alerts',
      trends: 'Historical Trends',
      battery: 'Battery Level',
      signal: 'Signal Strength',
      lastUpdate: 'Last Update',
      autoRefresh: 'Auto Refresh',
      downloadData: 'Download Data',
      calibrate: 'Calibrate',
      maintenance: 'Maintenance',
      fieldMap: 'Field Map'
    },
    'hi': {
      title: 'मिट्टी सेंसर नेटवर्क',
      subtitle: 'आपके खेतों में मिट्टी के मापदंडों की वास्तविक समय निगरानी',
      sensors: 'सक्रिय सेंसर',
      realTimeData: 'रियल-टाइम डेटा',
      parameters: 'मिट्टी के मापदंड',
      alerts: 'सेंसर अलर्ट',
      trends: 'ऐतिहासिक रुझान',
      battery: 'बैटरी स्तर',
      signal: 'सिग्नल शक्ति',
      lastUpdate: 'अंतिम अपडेट',
      autoRefresh: 'ऑटो रिफ्रेश',
      downloadData: 'डेटा डाउनलोड करें',
      calibrate: 'कैलिब्रेट करें',
      maintenance: 'रखरखाव',
      fieldMap: 'फील्ड मैप'
    }
  };

  const t = translations[language as keyof typeof translations] || translations.en;

  const soilSensors = [
    {
      id: 'sensor-1',
      name: 'Field A - Zone 1',
      location: { lat: 18.5204, lng: 73.8567 },
      battery: 87,
      signal: 92,
      status: 'online',
      lastUpdate: '2 minutes ago',
      data: {
        pH: 6.8,
        nitrogen: 45,
        phosphorus: 32,
        potassium: 180,
        moisture: 68,
        temperature: 24.5,
        salinity: 0.3,
        conductivity: 1.2
      }
    },
    {
      id: 'sensor-2',
      name: 'Field A - Zone 2',
      location: { lat: 18.5214, lng: 73.8577 },
      battery: 72,
      signal: 88,
      status: 'online',
      lastUpdate: '3 minutes ago',
      data: {
        pH: 6.5,
        nitrogen: 38,
        phosphorus: 28,
        potassium: 165,
        moisture: 72,
        temperature: 25.1,
        salinity: 0.4,
        conductivity: 1.3
      }
    },
    {
      id: 'sensor-3',
      name: 'Field B - Zone 1',
      location: { lat: 18.5224, lng: 73.8587 },
      battery: 45,
      signal: 76,
      status: 'warning',
      lastUpdate: '15 minutes ago',
      data: {
        pH: 7.2,
        nitrogen: 52,
        phosphorus: 35,
        potassium: 195,
        moisture: 58,
        temperature: 23.8,
        salinity: 0.2,
        conductivity: 1.0
      }
    },
    {
      id: 'sensor-4',
      name: 'Field C - Zone 1',
      location: { lat: 18.5234, lng: 73.8597 },
      battery: 15,
      signal: 45,
      status: 'critical',
      lastUpdate: '45 minutes ago',
      data: {
        pH: 6.9,
        nitrogen: 41,
        phosphorus: 30,
        potassium: 175,
        moisture: 65,
        temperature: 24.8,
        salinity: 0.35,
        conductivity: 1.15
      }
    }
  ];

  const soilParameters = [
    {
      id: 'pH',
      name: 'pH Level',
      value: sensorData.pH,
      unit: '',
      optimal: { min: 6.0, max: 7.5 },
      icon: Beaker,
      color: 'text-purple-600'
    },
    {
      id: 'nitrogen',
      name: 'Nitrogen (N)',
      value: sensorData.nitrogen,
      unit: 'ppm',
      optimal: { min: 40, max: 60 },
      icon: Zap,
      color: 'text-blue-600'
    },
    {
      id: 'phosphorus',
      name: 'Phosphorus (P)',
      value: sensorData.phosphorus,
      unit: 'ppm',
      optimal: { min: 30, max: 50 },
      icon: Zap,
      color: 'text-orange-600'
    },
    {
      id: 'potassium',
      name: 'Potassium (K)',
      value: sensorData.potassium,
      unit: 'ppm',
      optimal: { min: 150, max: 200 },
      icon: Zap,
      color: 'text-green-600'
    },
    {
      id: 'moisture',
      name: 'Soil Moisture',
      value: sensorData.moisture,
      unit: '%',
      optimal: { min: 60, max: 80 },
      icon: Droplets,
      color: 'text-blue-500'
    },
    {
      id: 'temperature',
      name: 'Soil Temperature',
      value: sensorData.temperature,
      unit: '°C',
      optimal: { min: 20, max: 30 },
      icon: Thermometer,
      color: 'text-red-500'
    },
    {
      id: 'salinity',
      name: 'Salinity',
      value: sensorData.salinity,
      unit: 'dS/m',
      optimal: { min: 0, max: 0.5 },
      icon: Gauge,
      color: 'text-yellow-600'
    },
    {
      id: 'conductivity',
      name: 'Electrical Conductivity',
      value: sensorData.conductivity,
      unit: 'mS/cm',
      optimal: { min: 0.8, max: 1.5 },
      icon: Activity,
      color: 'text-indigo-600'
    }
  ];

  const sensorAlerts = [
    {
      id: 1,
      sensorId: 'sensor-4',
      type: 'critical',
      message: 'Low battery level (15%) - Replace battery soon',
      timestamp: '30 minutes ago'
    },
    {
      id: 2,
      sensorId: 'sensor-3',
      type: 'warning',
      message: 'Low soil moisture detected (58%)',
      timestamp: '1 hour ago'
    },
    {
      id: 3,
      sensorId: 'sensor-2',
      type: 'info',
      message: 'Nitrogen levels slightly below optimal range',
      timestamp: '2 hours ago'
    }
  ];

  const getParameterStatus = (param: any) => {
    const { value, optimal } = param;
    if (value >= optimal.min && value <= optimal.max) return 'optimal';
    if (value < optimal.min * 0.8 || value > optimal.max * 1.2) return 'critical';
    return 'warning';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'optimal': return 'text-green-600';
      case 'warning': return 'text-yellow-600';
      case 'critical': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'online': return <Badge className="bg-green-100 text-green-800">Online</Badge>;
      case 'warning': return <Badge className="bg-yellow-100 text-yellow-800">Warning</Badge>;
      case 'critical': return <Badge className="bg-red-100 text-red-800">Critical</Badge>;
      default: return <Badge variant="secondary">Offline</Badge>;
    }
  };

  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      const currentSensor = soilSensors.find(s => s.id === selectedSensor);
      if (currentSensor) {
        setSensorData(prev => ({
          pH: Math.max(5.5, Math.min(8.0, prev.pH + (Math.random() - 0.5) * 0.1)),
          nitrogen: Math.max(20, Math.min(80, prev.nitrogen + (Math.random() - 0.5) * 2)),
          phosphorus: Math.max(15, Math.min(60, prev.phosphorus + (Math.random() - 0.5) * 1.5)),
          potassium: Math.max(100, Math.min(250, prev.potassium + (Math.random() - 0.5) * 5)),
          moisture: Math.max(30, Math.min(90, prev.moisture + (Math.random() - 0.5) * 3)),
          temperature: Math.max(15, Math.min(35, prev.temperature + (Math.random() - 0.5) * 0.5)),
          salinity: Math.max(0, Math.min(1, prev.salinity + (Math.random() - 0.5) * 0.05)),
          conductivity: Math.max(0.5, Math.min(2, prev.conductivity + (Math.random() - 0.5) * 0.1))
        }));
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [autoRefresh, selectedSensor]);

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

      {/* Sensor Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="bg-green-100 p-2 rounded-lg">
                <Activity className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">{t.sensors}</p>
                <p className="text-xl font-bold">4/4</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 p-2 rounded-lg">
                <Wifi className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Avg Signal</p>
                <p className="text-xl font-bold">75%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="bg-yellow-100 p-2 rounded-lg">
                <Battery className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Avg Battery</p>
                <p className="text-xl font-bold">55%</p>
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
                <p className="text-sm text-gray-600">Alerts</p>
                <p className="text-xl font-bold">3</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sensor List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MapPin className="h-5 w-5" />
              <span>{t.sensors}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {soilSensors.map((sensor) => (
              <div 
                key={sensor.id}
                className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                  selectedSensor === sensor.id 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => {
                  setSelectedSensor(sensor.id);
                  setSensorData(sensor.data);
                }}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-sm">{sensor.name}</h3>
                  {getStatusBadge(sensor.status)}
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <Battery className="h-3 w-3 text-gray-500" />
                      <span className="text-xs">{sensor.battery}%</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Wifi className="h-3 w-3 text-gray-500" />
                      <span className="text-xs">{sensor.signal}%</span>
                    </div>
                  </div>
                  
                  <Progress value={sensor.battery} className="h-1" />
                  
                  <p className="text-xs text-gray-500">{t.lastUpdate}: {sensor.lastUpdate}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Real-time Parameters */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Gauge className="h-5 w-5" />
              <span>{t.realTimeData}</span>
            </CardTitle>
            <CardDescription>
              {soilSensors.find(s => s.id === selectedSensor)?.name}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {soilParameters.map((param) => {
                const Icon = param.icon;
                const status = getParameterStatus(param);
                return (
                  <div key={param.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <Icon className={`h-4 w-4 ${param.color}`} />
                        <span className="font-medium text-sm">{param.name}</span>
                      </div>
                      <div className={`flex items-center space-x-1 ${getStatusColor(status)}`}>
                        {status === 'optimal' && <TrendingUp className="h-3 w-3" />}
                        {status === 'critical' && <TrendingDown className="h-3 w-3" />}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-end">
                        <span className="text-2xl font-bold">
                          {param.value.toFixed(param.unit === '°C' ? 1 : 0)}
                        </span>
                        <span className="text-sm text-gray-600">{param.unit}</span>
                      </div>
                      
                      <Progress 
                        value={Math.min(100, (param.value / param.optimal.max) * 100)} 
                        className="h-2"
                      />
                      
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Optimal: {param.optimal.min}-{param.optimal.max}</span>
                        <span className={getStatusColor(status)}>
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5" />
            <span>{t.alerts}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {sensorAlerts.map((alert) => (
            <Alert key={alert.id} className={`border-l-4 ${
              alert.type === 'critical' ? 'border-l-red-500' :
              alert.type === 'warning' ? 'border-l-yellow-500' :
              'border-l-blue-500'
            }`}>
              <AlertDescription>
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-semibold">
                      {soilSensors.find(s => s.id === alert.sensorId)?.name}
                    </div>
                    <div>{alert.message}</div>
                  </div>
                  <span className="text-xs text-gray-500">{alert.timestamp}</span>
                </div>
              </AlertDescription>
            </Alert>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}