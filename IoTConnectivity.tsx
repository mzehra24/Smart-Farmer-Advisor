import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Alert, AlertDescription } from "./ui/alert";
import { Progress } from "./ui/progress";
import { Switch } from "./ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { 
  Wifi, 
  Radio, 
  Antenna, 
  Smartphone,
  Router,
  Activity,
  Signal,
  Battery,
  MapPin,
  Settings,
  Zap,
  Globe,
  Satellite,
  Camera,
  Bug,
  Droplets
} from 'lucide-react';

interface IoTConnectivityProps {
  language: string;
}

export function IoTConnectivity({ language }: IoTConnectivityProps) {
  const [selectedNetwork, setSelectedNetwork] = useState('lorawan');
  const [networkStatus, setNetworkStatus] = useState({
    lorawan: { status: 'active', quality: 85, devices: 12 },
    nbiot: { status: 'active', quality: 78, devices: 8 },
    wifi: { status: 'limited', quality: 45, devices: 5 },
    cellular: { status: 'active', quality: 92, devices: 15 }
  });

  const translations = {
    'en': {
      title: 'IoT Connectivity Management',
      subtitle: 'Low-power, long-range communication for remote agricultural monitoring',
      networks: 'Network Status',
      devices: 'Connected Devices',
      coverage: 'Coverage Map',
      dataUsage: 'Data Usage',
      gateway: 'Gateway Status',
      configuration: 'Network Configuration',
      optimize: 'Optimize Network',
      addDevice: 'Add Device',
      networkHealth: 'Network Health',
      powerConsumption: 'Power Consumption',
      signalStrength: 'Signal Strength',
      lastSeen: 'Last Seen'
    },
    'hi': {
      title: 'IoT कनेक्टिविटी प्रबंधन',
      subtitle: 'दूरदराज के कृषि निगरानी के लिए कम-शक्ति, लंबी दूरी की संचार',
      networks: 'नेटवर्क स्थिति',
      devices: 'जुड़े उपकरण',
      coverage: 'कवरेज मैप',
      dataUsage: 'डेटा उपयोग',
      gateway: 'गेटवे स्थिति',
      configuration: 'नेटवर्क कॉन्फ़िगरेशन',
      optimize: 'नेटवर्क अनुकूलित करें',
      addDevice: 'डिवाइस जोड़ें',
      networkHealth: 'नेटवर्क स्वास्थ्य',
      powerConsumption: 'बिजली की खपत',
      signalStrength: 'सिग्नल शक्ति',
      lastSeen: 'अंतिम बार देखा गया'
    }
  };

  const t = translations[language as keyof typeof translations] || translations.en;

  const networkTypes = [
    {
      id: 'lorawan',
      name: 'LoRaWAN',
      description: 'Long Range Wide Area Network',
      range: '15 km',
      power: 'Ultra Low',
      bandwidth: '50 kbps',
      icon: Radio,
      color: 'bg-blue-500'
    },
    {
      id: 'nbiot',
      name: 'NB-IoT',
      description: 'Narrowband Internet of Things',
      range: '10 km',
      power: 'Low',
      bandwidth: '200 kbps',
      icon: Antenna,
      color: 'bg-green-500'
    },
    {
      id: 'wifi',
      name: 'Wi-Fi',
      description: 'Wireless Local Area Network',
      range: '100 m',
      power: 'Medium',
      bandwidth: '100 Mbps',
      icon: Wifi,
      color: 'bg-purple-500'
    },
    {
      id: 'cellular',
      name: '4G/5G',
      description: 'Cellular Network',
      range: '5 km',
      power: 'High',
      bandwidth: '100 Mbps',
      icon: Smartphone,
      color: 'bg-orange-500'
    }
  ];

  const connectedDevices = [
    {
      id: 'dev-001',
      name: 'Soil Sensor A1',
      type: 'soil-sensor',
      network: 'lorawan',
      battery: 87,
      signal: 92,
      status: 'online',
      location: 'Field A, Zone 1',
      lastSeen: '2 min ago',
      dataRate: '1 msg/10min',
      powerConsumption: '5 mW'
    },
    {
      id: 'dev-002',
      name: 'Weather Station B1',
      type: 'weather-station',
      network: 'nbiot',
      battery: 73,
      signal: 78,
      status: 'online',
      location: 'Field B, Center',
      lastSeen: '5 min ago',
      dataRate: '1 msg/5min',
      powerConsumption: '15 mW'
    },
    {
      id: 'dev-003',
      name: 'Irrigation Controller C1',
      type: 'irrigation',
      network: 'wifi',
      battery: 45,
      signal: 45,
      status: 'warning',
      location: 'Field C, North',
      lastSeen: '20 min ago',
      dataRate: '1 msg/min',
      powerConsumption: '50 mW'
    },
    {
      id: 'dev-004',
      name: 'Camera Feed D1',
      type: 'camera',
      network: 'cellular',
      battery: 92,
      signal: 88,
      status: 'online',
      location: 'Field D, Gate',
      lastSeen: '1 min ago',
      dataRate: '24/7 stream',
      powerConsumption: '500 mW'
    },
    {
      id: 'dev-005',
      name: 'Pest Trap E1',
      type: 'pest-trap',
      network: 'lorawan',
      battery: 65,
      signal: 85,
      status: 'online',
      location: 'Field E, Corner',
      lastSeen: '8 min ago',
      dataRate: '1 msg/hour',
      powerConsumption: '3 mW'
    }
  ];

  const gateways = [
    {
      id: 'gw-001',
      name: 'Main Gateway',
      type: 'lorawan',
      status: 'online',
      connectedDevices: 8,
      signalRange: '15 km',
      location: 'Farm Center',
      uptime: '99.8%',
      dataThroughput: '145 KB/day'
    },
    {
      id: 'gw-002',
      name: 'NB-IoT Base Station',
      type: 'nbiot',
      status: 'online',
      connectedDevices: 5,
      signalRange: '10 km',
      location: 'Tower Hill',
      uptime: '99.5%',
      dataThroughput: '2.3 MB/day'
    },
    {
      id: 'gw-003',
      name: 'Wi-Fi Access Point',
      type: 'wifi',
      status: 'limited',
      connectedDevices: 3,
      signalRange: '200 m',
      location: 'Farm House',
      uptime: '97.2%',
      dataThroughput: '50 MB/day'
    }
  ];

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case 'soil-sensor': return Zap;
      case 'weather-station': return Activity;
      case 'irrigation': return Droplets;
      case 'camera': return Camera;
      case 'pest-trap': return Bug;
      default: return Settings;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'online': return <Badge className="bg-green-100 text-green-800">Online</Badge>;
      case 'warning': return <Badge className="bg-yellow-100 text-yellow-800">Warning</Badge>;
      case 'offline': return <Badge className="bg-red-100 text-red-800">Offline</Badge>;
      case 'limited': return <Badge className="bg-orange-100 text-orange-800">Limited</Badge>;
      default: return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getNetworkIcon = (networkType: string) => {
    const network = networkTypes.find(n => n.id === networkType);
    return network ? network.icon : Radio;
  };

  useEffect(() => {
    // Simulate real-time network status updates
    const interval = setInterval(() => {
      setNetworkStatus(prev => ({
        ...prev,
        lorawan: {
          ...prev.lorawan,
          quality: Math.max(70, Math.min(95, prev.lorawan.quality + (Math.random() - 0.5) * 5))
        },
        nbiot: {
          ...prev.nbiot,
          quality: Math.max(65, Math.min(90, prev.nbiot.quality + (Math.random() - 0.5) * 4))
        },
        wifi: {
          ...prev.wifi,
          quality: Math.max(30, Math.min(80, prev.wifi.quality + (Math.random() - 0.5) * 8))
        },
        cellular: {
          ...prev.cellular,
          quality: Math.max(80, Math.min(98, prev.cellular.quality + (Math.random() - 0.5) * 3))
        }
      }));
    }, 20000);

    return () => clearInterval(interval);
  }, []);

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
              <Settings className="h-4 w-4 mr-2" />
              {t.configuration}
            </Button>
            <Button>
              <Zap className="h-4 w-4 mr-2" />
              {t.optimize}
            </Button>
          </div>
        </div>
      </div>

      {/* Network Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {networkTypes.map((network) => {
          const Icon = network.icon;
          const status = networkStatus[network.id as keyof typeof networkStatus];
          return (
            <Card key={network.id} className={`cursor-pointer transition-colors ${
              selectedNetwork === network.id ? 'ring-2 ring-blue-500' : ''
            }`} onClick={() => setSelectedNetwork(network.id)}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2 rounded-lg ${network.color} bg-opacity-20`}>
                    <Icon className={`h-5 w-5 ${network.color.replace('bg-', 'text-')}`} />
                  </div>
                  {getStatusBadge(status.status)}
                </div>
                <h3 className="font-semibold">{network.name}</h3>
                <p className="text-sm text-gray-600 mb-3">{network.description}</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span>Quality</span>
                    <span>{status.quality}%</span>
                  </div>
                  <Progress value={status.quality} className="h-1" />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Range: {network.range}</span>
                    <span>{status.devices} devices</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Connected Devices */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center space-x-2">
                <Router className="h-5 w-5" />
                <span>{t.devices}</span>
              </CardTitle>
              <div className="flex items-center space-x-2">
                <Select value={selectedNetwork} onValueChange={setSelectedNetwork}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Networks</SelectItem>
                    {networkTypes.map((network) => (
                      <SelectItem key={network.id} value={network.id}>
                        {network.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button size="sm">
                  {t.addDevice}
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {connectedDevices
              .filter(device => selectedNetwork === 'all' || device.network === selectedNetwork)
              .map((device) => {
                const DeviceIcon = getDeviceIcon(device.type);
                const NetworkIcon = getNetworkIcon(device.network);
                return (
                  <div key={device.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <DeviceIcon className="h-5 w-5 text-gray-600" />
                        <div>
                          <h3 className="font-semibold text-sm">{device.name}</h3>
                          <p className="text-xs text-gray-500">{device.location}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <NetworkIcon className="h-4 w-4 text-gray-500" />
                        {getStatusBadge(device.status)}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <div className="flex items-center space-x-1 mb-1">
                          <Battery className="h-3 w-3 text-gray-500" />
                          <span className="text-xs text-gray-600">Battery</span>
                        </div>
                        <div className="font-semibold">{device.battery}%</div>
                        <Progress value={device.battery} className="h-1 mt-1" />
                      </div>
                      
                      <div>
                        <div className="flex items-center space-x-1 mb-1">
                          <Signal className="h-3 w-3 text-gray-500" />
                          <span className="text-xs text-gray-600">{t.signalStrength}</span>
                        </div>
                        <div className="font-semibold">{device.signal}%</div>
                        <Progress value={device.signal} className="h-1 mt-1" />
                      </div>
                      
                      <div>
                        <div className="text-xs text-gray-600 mb-1">{t.powerConsumption}</div>
                        <div className="font-semibold">{device.powerConsumption}</div>
                      </div>
                      
                      <div>
                        <div className="text-xs text-gray-600 mb-1">{t.lastSeen}</div>
                        <div className="font-semibold">{device.lastSeen}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </CardContent>
        </Card>

        {/* Gateways */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Antenna className="h-5 w-5" />
              <span>{t.gateway}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {gateways.map((gateway) => {
              const GatewayIcon = getNetworkIcon(gateway.type);
              return (
                <div key={gateway.id} className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <GatewayIcon className="h-4 w-4 text-gray-600" />
                      <h3 className="font-semibold text-sm">{gateway.name}</h3>
                    </div>
                    {getStatusBadge(gateway.status)}
                  </div>
                  
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Connected Devices</span>
                      <span className="font-semibold">{gateway.connectedDevices}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Signal Range</span>
                      <span className="font-semibold">{gateway.signalRange}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Uptime</span>
                      <span className="font-semibold">{gateway.uptime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Data Throughput</span>
                      <span className="font-semibold">{gateway.dataThroughput}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>

      {/* Network Health & Coverage */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-5 w-5" />
              <span>{t.networkHealth}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(networkStatus).map(([networkId, status]) => {
                const network = networkTypes.find(n => n.id === networkId);
                const Icon = network?.icon || Radio;
                return (
                  <div key={networkId} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Icon className="h-5 w-5 text-gray-600" />
                      <div>
                        <div className="font-semibold">{network?.name}</div>
                        <div className="text-sm text-gray-600">{status.devices} devices connected</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{status.quality}%</div>
                      <Progress value={status.quality} className="w-20 h-2 mt-1" />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MapPin className="h-5 w-5" />
              <span>{t.coverage}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-square bg-gradient-to-br from-green-100 to-blue-100 rounded-lg flex items-center justify-center relative overflow-hidden">
              {/* Simulated coverage map */}
              <div className="absolute inset-0">
                <div className="absolute top-1/3 left-1/3 w-24 h-24 bg-blue-300 rounded-full opacity-60"></div>
                <div className="absolute top-1/2 right-1/4 w-20 h-20 bg-green-300 rounded-full opacity-60"></div>
                <div className="absolute bottom-1/3 left-1/2 w-16 h-16 bg-purple-300 rounded-full opacity-60"></div>
                <div className="absolute top-1/4 right-1/3 w-32 h-32 bg-orange-300 rounded-full opacity-40"></div>
              </div>
              <div className="text-center z-10">
                <Globe className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Network Coverage Map</p>
                <p className="text-xs text-gray-500">95% Farm Coverage</p>
              </div>
            </div>
            
            <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-300 rounded-full"></div>
                <span>LoRaWAN Coverage</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-300 rounded-full"></div>
                <span>NB-IoT Coverage</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-purple-300 rounded-full"></div>
                <span>Wi-Fi Coverage</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-orange-300 rounded-full"></div>
                <span>Cellular Coverage</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}