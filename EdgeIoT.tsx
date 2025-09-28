import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Alert, AlertDescription } from "./ui/alert";
import { Progress } from "./ui/progress";
import { Switch } from "./ui/switch";
import { Textarea } from "./ui/textarea";
import { 
  Cpu, 
  HardDrive, 
  MemoryStick, 
  Thermometer,
  Zap,
  Activity,
  Settings,
  Code,
  Download,
  Upload,
  PlayCircle,
  StopCircle,
  RefreshCw,
  Wifi,
  WifiOff,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';

interface EdgeIoTProps {
  language: string;
}

export function EdgeIoT({ language }: EdgeIoTProps) {
  const [selectedDevice, setSelectedDevice] = useState('esp32-001');
  const [isCodeRunning, setIsCodeRunning] = useState(true);
  const [deviceCode, setDeviceCode] = useState(`
// Smart Irrigation Controller
#include <WiFi.h>
#include <DHT.h>

DHT dht(2, DHT22);
int soilMoisture = A0;
int pumpRelay = 5;

void setup() {
  Serial.begin(115200);
  dht.begin();
  pinMode(pumpRelay, OUTPUT);
}

void loop() {
  float humidity = dht.readHumidity();
  float temperature = dht.readTemperature();
  int moisture = analogRead(soilMoisture);
  
  if (moisture < 300) {
    digitalWrite(pumpRelay, HIGH);
    Serial.println("Irrigation ON");
  } else {
    digitalWrite(pumpRelay, LOW);
    Serial.println("Irrigation OFF");
  }
  
  delay(30000);
}
  `.trim());

  const translations = {
    'en': {
      title: 'Edge IoT & Microcontrollers',
      subtitle: 'Local processing power for reduced internet dependency',
      devices: 'Edge Devices',
      monitoring: 'Device Monitoring',
      programming: 'Device Programming',
      localProcessing: 'Local Processing',
      connectivity: 'Connectivity Status',
      performance: 'Performance Metrics',
      uploadCode: 'Upload Code',
      runCode: 'Run Code',
      stopCode: 'Stop Code',
      restart: 'Restart Device',
      syncData: 'Sync Data',
      offlineMode: 'Offline Mode',
      dataProcessed: 'Data Processed',
      uptime: 'Uptime',
      memoryUsage: 'Memory Usage',
      cpuUsage: 'CPU Usage',
      temperature: 'Temperature',
      storage: 'Storage',
      lastSync: 'Last Sync'
    },
    'hi': {
      title: 'एज IoT और माइक्रोकंट्रोलर',
      subtitle: 'इंटरनेट निर्भरता कम करने के लिए स्थानीय प्रसंस्करण शक्ति',
      devices: 'एज डिवाइस',
      monitoring: 'डिवाइस निगरानी',
      programming: 'डिवाइस प्रोग्रामिंग',
      localProcessing: 'स्थानीय प्रसंस्करण',
      connectivity: 'कनेक्टिविटी स्थिति',
      performance: 'प्रदर्शन मेट्रिक्स',
      uploadCode: 'कोड अपलोड करें',
      runCode: 'कोड चलाएं',
      stopCode: 'कोड रोकें',
      restart: 'डिवाइस रीस्टार्ट करें',
      syncData: 'डेटा सिंक करें',
      offlineMode: 'ऑफलाइन मोड',
      dataProcessed: 'डेटा प्रोसेस किया गया',
      uptime: 'अपटाइम',
      memoryUsage: 'मेमोरी उपयोग',
      cpuUsage: 'CPU उपयोग',
      temperature: 'तापमान',
      storage: 'स्टोरेज',
      lastSync: 'अंतिम सिंक'
    }
  };

  const t = translations[language as keyof typeof translations] || translations.en;

  const edgeDevices = [
    {
      id: 'esp32-001',
      name: 'ESP32 - Irrigation Controller',
      type: 'ESP32',
      location: 'Field A, Zone 1',
      status: 'online',
      connectivity: 'wifi',
      lastSync: '2 min ago',
      uptime: '72 hours',
      performance: {
        cpuUsage: 45,
        memoryUsage: 67,
        temperature: 42,
        storage: 23,
        dataProcessed: '1.2 MB',
        batteryLevel: 87
      },
      capabilities: ['WiFi', 'Bluetooth', 'GPIO', 'ADC', 'PWM'],
      currentTask: 'Monitoring soil moisture and controlling irrigation'
    },
    {
      id: 'rpi-002',
      name: 'Raspberry Pi - Data Gateway',
      type: 'Raspberry Pi 4',
      location: 'Farm Center',
      status: 'online',
      connectivity: 'ethernet',
      lastSync: '30 sec ago',
      uptime: '168 hours',
      performance: {
        cpuUsage: 28,
        memoryUsage: 52,
        temperature: 38,
        storage: 78,
        dataProcessed: '45 GB',
        batteryLevel: 100
      },
      capabilities: ['Ethernet', 'WiFi', 'USB', 'GPIO', 'Camera', 'AI Processing'],
      currentTask: 'Edge AI processing and data aggregation'
    },
    {
      id: 'arduino-003',
      name: 'Arduino - Weather Station',
      type: 'Arduino Uno',
      location: 'Field B, Corner',
      status: 'warning',
      connectivity: 'offline',
      lastSync: '45 min ago',
      uptime: '24 hours',
      performance: {
        cpuUsage: 78,
        memoryUsage: 89,
        temperature: 55,
        storage: 12,
        dataProcessed: '125 KB',
        batteryLevel: 23
      },
      capabilities: ['Digital I/O', 'Analog Input', 'PWM', 'Serial'],
      currentTask: 'Local weather data collection and storage'
    },
    {
      id: 'esp32-004',
      name: 'ESP32 - Pest Monitor',
      type: 'ESP32-CAM',
      location: 'Field C, South',
      status: 'online',
      connectivity: 'wifi',
      lastSync: '5 min ago',
      uptime: '96 hours',
      performance: {
        cpuUsage: 62,
        memoryUsage: 73,
        temperature: 48,
        storage: 56,
        dataProcessed: '8.5 MB',
        batteryLevel: 65
      },
      capabilities: ['WiFi', 'Camera', 'GPIO', 'SD Card', 'AI Inference'],
      currentTask: 'Image capture and local pest detection'
    }
  ];

  const processingTasks = [
    {
      id: 'task-001',
      name: 'Soil Moisture Analysis',
      device: 'esp32-001',
      status: 'running',
      progress: 75,
      lastRun: '5 min ago',
      nextRun: '25 min',
      description: 'Analyzing soil moisture patterns and triggering irrigation'
    },
    {
      id: 'task-002',
      name: 'Weather Data Processing',
      device: 'rpi-002',
      status: 'running',
      progress: 90,
      lastRun: '2 min ago',
      nextRun: '28 min',
      description: 'Processing meteorological data for local forecasting'
    },
    {
      id: 'task-003',
      name: 'Pest Detection AI',
      device: 'esp32-004',
      status: 'completed',
      progress: 100,
      lastRun: '1 hour ago',
      nextRun: '2 hours',
      description: 'Running TensorFlow Lite model for pest identification'
    },
    {
      id: 'task-004',
      name: 'Data Aggregation',
      device: 'rpi-002',
      status: 'paused',
      progress: 45,
      lastRun: '30 min ago',
      nextRun: 'Manual',
      description: 'Collecting and preprocessing sensor data for cloud sync'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'online': return <Badge className="bg-green-100 text-green-800">Online</Badge>;
      case 'warning': return <Badge className="bg-yellow-100 text-yellow-800">Warning</Badge>;
      case 'offline': return <Badge className="bg-red-100 text-red-800">Offline</Badge>;
      default: return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getTaskStatusBadge = (status: string) => {
    switch (status) {
      case 'running': return <Badge className="bg-blue-100 text-blue-800">Running</Badge>;
      case 'completed': return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
      case 'paused': return <Badge className="bg-yellow-100 text-yellow-800">Paused</Badge>;
      case 'failed': return <Badge className="bg-red-100 text-red-800">Failed</Badge>;
      default: return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getConnectivityIcon = (connectivity: string) => {
    switch (connectivity) {
      case 'wifi': return <Wifi className="h-4 w-4 text-green-600" />;
      case 'ethernet': return <Activity className="h-4 w-4 text-blue-600" />;
      case 'offline': return <WifiOff className="h-4 w-4 text-red-600" />;
      default: return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
    }
  };

  const handleCodeUpload = () => {
    alert('Code uploaded successfully to ' + selectedDevice);
  };

  const handleDeviceRestart = () => {
    alert('Device restart initiated for ' + selectedDevice);
  };

  const toggleCodeExecution = () => {
    setIsCodeRunning(!isCodeRunning);
  };

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
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              {t.syncData}
            </Button>
            <Button>
              <Settings className="h-4 w-4 mr-2" />
              Configure
            </Button>
          </div>
        </div>
      </div>

      {/* Device Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 p-2 rounded-lg">
                <Cpu className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Active Devices</p>
                <p className="text-xl font-bold">4</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="bg-green-100 p-2 rounded-lg">
                <Activity className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Running Tasks</p>
                <p className="text-xl font-bold">3</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="bg-purple-100 p-2 rounded-lg">
                <HardDrive className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">{t.dataProcessed}</p>
                <p className="text-xl font-bold">55GB</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="bg-yellow-100 p-2 rounded-lg">
                <Wifi className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Avg Uptime</p>
                <p className="text-xl font-bold">89h</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Edge Devices */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Cpu className="h-5 w-5" />
              <span>{t.devices}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {edgeDevices.map((device) => (
              <div 
                key={device.id}
                className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                  selectedDevice === device.id 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setSelectedDevice(device.id)}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-sm">{device.name}</h3>
                    <p className="text-xs text-gray-600">{device.type} • {device.location}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getConnectivityIcon(device.connectivity)}
                    {getStatusBadge(device.status)}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-gray-600">CPU: </span>
                      <span className="font-semibold">{device.performance.cpuUsage}%</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Memory: </span>
                      <span className="font-semibold">{device.performance.memoryUsage}%</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Temp: </span>
                      <span className="font-semibold">{device.performance.temperature}°C</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Battery: </span>
                      <span className="font-semibold">{device.performance.batteryLevel}%</span>
                    </div>
                  </div>
                  
                  <Progress value={device.performance.cpuUsage} className="h-1" />
                  
                  <p className="text-xs text-gray-500">{t.uptime}: {device.uptime}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Device Monitoring */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-5 w-5" />
              <span>{t.monitoring}</span>
            </CardTitle>
            <CardDescription>
              {edgeDevices.find(d => d.id === selectedDevice)?.name}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {(() => {
              const device = edgeDevices.find(d => d.id === selectedDevice);
              if (!device) return null;
              
              return (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="p-3 border rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          <Cpu className="h-4 w-4 text-blue-500" />
                          <span className="font-medium text-sm">{t.cpuUsage}</span>
                        </div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>{device.performance.cpuUsage}%</span>
                          <span className="text-gray-500">100%</span>
                        </div>
                        <Progress value={device.performance.cpuUsage} className="h-2" />
                      </div>
                      
                      <div className="p-3 border rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          <MemoryStick className="h-4 w-4 text-purple-500" />
                          <span className="font-medium text-sm">{t.memoryUsage}</span>
                        </div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>{device.performance.memoryUsage}%</span>
                          <span className="text-gray-500">100%</span>
                        </div>
                        <Progress value={device.performance.memoryUsage} className="h-2" />
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="p-3 border rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          <Thermometer className="h-4 w-4 text-red-500" />
                          <span className="font-medium text-sm">{t.temperature}</span>
                        </div>
                        <div className="text-2xl font-bold">{device.performance.temperature}°C</div>
                        <div className="text-xs text-gray-500">Normal: &lt;50°C</div>
                      </div>
                      
                      <div className="p-3 border rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          <HardDrive className="h-4 w-4 text-green-500" />
                          <span className="font-medium text-sm">{t.storage}</span>
                        </div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>{device.performance.storage}%</span>
                          <span className="text-gray-500">100%</span>
                        </div>
                        <Progress value={device.performance.storage} className="h-2" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="text-center p-2 bg-gray-50 rounded">
                      <div className="font-semibold">{device.uptime}</div>
                      <div className="text-gray-600">{t.uptime}</div>
                    </div>
                    <div className="text-center p-2 bg-gray-50 rounded">
                      <div className="font-semibold">{device.performance.dataProcessed}</div>
                      <div className="text-gray-600">{t.dataProcessed}</div>
                    </div>
                    <div className="text-center p-2 bg-gray-50 rounded">
                      <div className="font-semibold">{device.lastSync}</div>
                      <div className="text-gray-600">{t.lastSync}</div>
                    </div>
                    <div className="text-center p-2 bg-gray-50 rounded">
                      <div className="font-semibold">{device.performance.batteryLevel}%</div>
                      <div className="text-gray-600">Battery</div>
                    </div>
                  </div>
                  
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="text-sm font-medium text-blue-800 mb-1">Current Task:</div>
                    <div className="text-sm text-blue-700">{device.currentTask}</div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button size="sm" onClick={handleDeviceRestart}>
                      <RefreshCw className="h-4 w-4 mr-1" />
                      {t.restart}
                    </Button>
                    <Button size="sm" variant="outline">
                      <Upload className="h-4 w-4 mr-1" />
                      {t.syncData}
                    </Button>
                  </div>
                </div>
              );
            })()}
          </CardContent>
        </Card>
      </div>

      {/* Programming Interface */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Code className="h-5 w-5" />
            <span>{t.programming}</span>
          </CardTitle>
          <CardDescription>Upload and manage code for edge devices</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">Target Device:</span>
                  <Badge>{edgeDevices.find(d => d.id === selectedDevice)?.name}</Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">Status:</span>
                  {isCodeRunning ? (
                    <Badge className="bg-green-100 text-green-800">
                      <PlayCircle className="h-3 w-3 mr-1" />
                      Running
                    </Badge>
                  ) : (
                    <Badge className="bg-gray-100 text-gray-800">
                      <StopCircle className="h-3 w-3 mr-1" />
                      Stopped
                    </Badge>
                  )}
                </div>
              </div>
              
              <div className="flex space-x-2">
                <Button size="sm" onClick={toggleCodeExecution}>
                  {isCodeRunning ? (
                    <>
                      <StopCircle className="h-4 w-4 mr-1" />
                      {t.stopCode}
                    </>
                  ) : (
                    <>
                      <PlayCircle className="h-4 w-4 mr-1" />
                      {t.runCode}
                    </>
                  )}
                </Button>
                <Button size="sm" onClick={handleCodeUpload}>
                  <Upload className="h-4 w-4 mr-1" />
                  {t.uploadCode}
                </Button>
              </div>
            </div>
            
            <Textarea
              value={deviceCode}
              onChange={(e) => setDeviceCode(e.target.value)}
              className="font-mono text-sm h-64"
              placeholder="Enter device code here..."
            />
          </div>
        </CardContent>
      </Card>

      {/* Local Processing Tasks */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Zap className="h-5 w-5" />
            <span>{t.localProcessing}</span>
          </CardTitle>
          <CardDescription>Running tasks on edge devices</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {processingTasks.map((task) => (
              <div key={task.id} className="p-4 border rounded-lg">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold">{task.name}</h3>
                    <p className="text-sm text-gray-600">{task.description}</p>
                    <p className="text-xs text-gray-500">
                      Device: {edgeDevices.find(d => d.id === task.device)?.name}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getTaskStatusBadge(task.status)}
                    {task.status === 'running' && <Activity className="h-4 w-4 text-blue-500 animate-pulse" />}
                    {task.status === 'completed' && <CheckCircle className="h-4 w-4 text-green-500" />}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{task.progress}%</span>
                  </div>
                  <Progress value={task.progress} className="h-2" />
                  
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Last run: {task.lastRun}</span>
                    <span>Next run: {task.nextRun}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}