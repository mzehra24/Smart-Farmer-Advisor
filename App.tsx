import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Badge } from "./components/ui/badge";
import { Alert, AlertDescription } from "./components/ui/alert";
import { 
  Sprout, 
  Bug, 
  CloudRain, 
  TrendingUp, 
  Users, 
  Mic, 
  Camera,
  MapPin,
  Bell,
  MessageCircle,
  Leaf,
  Droplets,
  Shield,
  Coins,
  Menu,
  X,
  Building2,
  Satellite,
  Thermometer,
  WifiIcon,
  Cpu
} from 'lucide-react';

import { CropAdvisory } from './components/CropAdvisory';
import { PestDetection } from './components/PestDetection';
import { WeatherAlerts } from './components/WeatherAlerts';
import { MarketPrices } from './components/MarketPrices';
import { SoilHealth } from './components/SoilHealth';
import { FarmerNetwork } from './components/FarmerNetwork';
import { VoiceAssistant } from './components/VoiceAssistant';
import { Traceability } from './components/Traceability';
import { Dashboard } from './components/Dashboard';
import { LanguageSelector } from './components/LanguageSelector';
import { GovernmentNGOs } from './components/GovernmentNGOs';
import { SatelliteData } from './components/SatelliteData';
import { SoilSensors } from './components/SoilSensors';
import { WeatherStations } from './components/WeatherStations';
import { IoTConnectivity } from './components/IoTConnectivity';
import { EdgeIoT } from './components/EdgeIoT';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'weather', message: 'Heavy rainfall expected in 2 days', urgent: true },
    { id: 2, type: 'pest', message: 'Brown planthopper activity detected in nearby areas', urgent: false },
    { id: 3, type: 'market', message: 'Rice prices increased by 5% in local mandi', urgent: false }
  ]);

  const translations = {
    'en': {
      title: 'Smart Farm Advisory',
      subtitle: 'AI-powered farming guidance for better yields',
      dashboard: 'Dashboard',
      cropAdvisory: 'Crop Advisory',
      pestDetection: 'Pest Detection',
      weather: 'Weather',
      market: 'Market Prices',
      soilHealth: 'Soil Health',
      network: 'Farmer Network',
      voice: 'Voice Assistant',
      traceability: 'Traceability',
      government: 'Govt & NGOs',
      satellite: 'Satellite Data',
      soilSensors: 'Soil Sensors',
      weatherStations: 'Weather Stations',
      iotConnectivity: 'IoT Connectivity',
      edgeIot: 'Edge IoT'
    },
    'hi': {
      title: 'स्मार्ट कृषि सलाहकार',
      subtitle: 'बेहतर उत्पादन के लिए AI-संचालित कृषि मार्गदर्शन',
      dashboard: 'डैशबोर्ड',
      cropAdvisory: 'फसल सलाह',
      pestDetection: 'कीट पहचान',
      weather: 'मौसम',
      market: 'बाजार भाव',
      soilHealth: 'मिट्टी स्वास्थ्य',
      network: 'किसान नेटवर्क',
      voice: 'आवाज सहायक',
      traceability: 'ट्रेसेबिलिटी',
      government: 'सरकार और NGO',
      satellite: 'सैटेलाइट डेटा',
      soilSensors: 'मिट्टी सेंसर',
      weatherStations: 'मौसम स्टेशन',
      iotConnectivity: 'IoT कनेक्टिविटी',
      edgeIot: 'एज IoT'
    }
  };

  const t = translations[currentLanguage as keyof typeof translations];

  const navigationItems = [
    { id: 'dashboard', label: t.dashboard, icon: TrendingUp },
    { id: 'crop-advisory', label: t.cropAdvisory, icon: Sprout },
    { id: 'pest-detection', label: t.pestDetection, icon: Bug },
    { id: 'weather', label: t.weather, icon: CloudRain },
    { id: 'market', label: t.market, icon: Coins },
    { id: 'soil', label: t.soilHealth, icon: Leaf },
    { id: 'network', label: t.network, icon: Users },
    { id: 'voice', label: t.voice, icon: Mic },
    { id: 'traceability', label: t.traceability, icon: Shield },
    { id: 'government', label: t.government, icon: Building2 },
    { id: 'satellite', label: t.satellite, icon: Satellite },
    { id: 'soil-sensors', label: t.soilSensors, icon: Thermometer },
    { id: 'weather-stations', label: t.weatherStations, icon: CloudRain },
    { id: 'iot-connectivity', label: t.iotConnectivity, icon: WifiIcon },
    { id: 'edge-iot', label: t.edgeIot, icon: Cpu },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard language={currentLanguage} />;
      case 'crop-advisory':
        return <CropAdvisory language={currentLanguage} />;
      case 'pest-detection':
        return <PestDetection language={currentLanguage} />;
      case 'weather':
        return <WeatherAlerts language={currentLanguage} />;
      case 'market':
        return <MarketPrices language={currentLanguage} />;
      case 'soil':
        return <SoilHealth language={currentLanguage} />;
      case 'network':
        return <FarmerNetwork language={currentLanguage} />;
      case 'voice':
        return <VoiceAssistant language={currentLanguage} />;
      case 'traceability':
        return <Traceability language={currentLanguage} />;
      case 'government':
        return <GovernmentNGOs language={currentLanguage} />;
      case 'satellite':
        return <SatelliteData language={currentLanguage} />;
      case 'soil-sensors':
        return <SoilSensors language={currentLanguage} />;
      case 'weather-stations':
        return <WeatherStations language={currentLanguage} />;
      case 'iot-connectivity':
        return <IoTConnectivity language={currentLanguage} />;
      case 'edge-iot':
        return <EdgeIoT language={currentLanguage} />;
      default:
        return <Dashboard language={currentLanguage} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center space-x-3">
            <div className="bg-green-600 p-2 rounded-lg">
              <Sprout className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">{t.title}</h1>
              <p className="text-xs text-gray-600">{t.subtitle}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <nav className="mt-4 px-4">
          <div className="space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    activeTab === item.id
                      ? 'bg-green-100 text-green-700 border border-green-200'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>
        </nav>

        {/* Sidebar Footer */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="p-3 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center space-x-2 text-sm text-green-800">
              <MapPin className="h-4 w-4" />
              <span>Pune, Maharashtra</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 lg:ml-0">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className="lg:hidden"
                  onClick={() => setSidebarOpen(true)}
                >
                  <Menu className="h-5 w-5" />
                </Button>
                <div className="hidden lg:block">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {navigationItems.find(item => item.id === activeTab)?.label}
                  </h2>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <LanguageSelector 
                  currentLanguage={currentLanguage}
                  onLanguageChange={setCurrentLanguage}
                />
                
                {/* Notifications */}
                <div className="relative">
                  <Button variant="outline" size="sm" className="relative">
                    <Bell className="h-4 w-4" />
                    {notifications.filter(n => n.urgent).length > 0 && (
                      <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs">
                        {notifications.filter(n => n.urgent).length}
                      </Badge>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Urgent Notifications */}
        {notifications.filter(n => n.urgent).length > 0 && (
          <div className="bg-red-50 border-b border-red-200 px-4 py-2">
            {notifications.filter(n => n.urgent).map(notification => (
              <Alert key={notification.id} className="mb-2 last:mb-0 border-red-200">
                <Bell className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-800">
                  {notification.message}
                </AlertDescription>
              </Alert>
            ))}
          </div>
        )}

        {/* Main Content */}
        <main className="p-4 sm:p-6 lg:p-8">
          {renderContent()}
        </main>

        {/* Floating Action Button for Voice */}
        <div className="fixed bottom-6 right-6">
          <Button 
            size="lg" 
            className="rounded-full h-14 w-14 bg-green-600 hover:bg-green-700 shadow-lg"
            onClick={() => setActiveTab('voice')}
          >
            <Mic className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </div>
  );
}