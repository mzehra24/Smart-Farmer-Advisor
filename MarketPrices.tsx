import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  MapPin, 
  Calendar, 
  Search,
  Filter,
  Bell,
  BarChart3,
  Smartphone,
  Users,
  Truck
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

interface MarketPricesProps {
  language: string;
}

interface MarketPrice {
  crop: string;
  variety: string;
  market: string;
  state: string;
  price: number;
  unit: string;
  change: number;
  trend: 'up' | 'down' | 'stable';
  lastUpdated: string;
  minPrice: number;
  maxPrice: number;
  modalPrice: number;
}

interface PriceHistory {
  date: string;
  price: number;
  market: string;
}

export function MarketPrices({ language }: MarketPricesProps) {
  const [selectedCrop, setSelectedCrop] = useState('rice');
  const [selectedState, setSelectedState] = useState('maharashtra');
  const [searchTerm, setSearchTerm] = useState('');
  const [priceAlerts, setPriceAlerts] = useState<string[]>([]);
  const [marketData, setMarketData] = useState<MarketPrice[]>([]);
  const [priceHistory, setPriceHistory] = useState<PriceHistory[]>([]);

  const translations = {
    'en': {
      title: 'Market Prices & Trends',
      subtitle: 'Real-time mandi prices and market analytics',
      currentPrices: 'Current Market Prices',
      priceHistory: 'Price History',
      priceAlerts: 'Price Alerts',
      topMarkets: 'Top Markets',
      searchCrop: 'Search crop or market...',
      selectCrop: 'Select Crop',
      selectState: 'Select State',
      setAlert: 'Set Price Alert',
      removeAlert: 'Remove Alert',
      price: 'Price',
      change: 'Change',
      market: 'Market',
      lastUpdated: 'Last Updated',
      minPrice: 'Min Price',
      maxPrice: 'Max Price',
      modalPrice: 'Modal Price',
      trend: 'Trend',
      quintal: 'per quintal',
      today: 'Today',
      week: 'This Week',
      month: 'This Month',
      higherPrices: 'Markets with Higher Prices',
      nearbyMarkets: 'Nearby Markets',
      recommendation: 'Selling Recommendation'
    },
    'hi': {
      title: 'बाजार भाव और रुझान',
      subtitle: 'वास्तविक समय मंडी भाव और बाजार विश्लेषण',
      currentPrices: 'वर्तमान बाजार भाव',
      priceHistory: 'भाव इतिहास',
      priceAlerts: 'भाव अलर्ट',
      topMarkets: 'प्रमुख बाजार',
      searchCrop: 'फसल या बाजार खोजें...',
      selectCrop: 'फसल चुनें',
      selectState: 'राज्य चुनें',
      setAlert: 'भाव अलर्ट सेट करें',
      removeAlert: 'अलर्ट हटाएं',
      price: 'भाव',
      change: 'बदलाव',
      market: 'बाजार',
      lastUpdated: 'अंतिम अपडेट',
      minPrice: 'न्यूनतम भाव',
      maxPrice: 'अधिकतम भाव',
      modalPrice: 'मॉडल भाव',
      trend: 'रुझान',
      quintal: 'प्रति क्विंटल',
      today: 'आज',
      week: 'इस सप्ताह',
      month: 'इस महीने',
      higherPrices: 'अधिक भाव वाले बाजार',
      nearbyMarkets: 'नजदीकी बाजार',
      recommendation: 'बिक्री सिफारिश'
    }
  };

  const t = translations[language as keyof typeof translations] || translations['en'];

  const crops = [
    { value: 'rice', label: language === 'hi' ? 'धान' : 'Rice' },
    { value: 'wheat', label: language === 'hi' ? 'गेहूं' : 'Wheat' },
    { value: 'sugarcane', label: language === 'hi' ? 'गन्ना' : 'Sugarcane' },
    { value: 'cotton', label: language === 'hi' ? 'कपास' : 'Cotton' },
    { value: 'onion', label: language === 'hi' ? 'प्याज' : 'Onion' },
    { value: 'tomato', label: language === 'hi' ? 'टमाटर' : 'Tomato' }
  ];

  const states = [
    { value: 'maharashtra', label: language === 'hi' ? 'महाराष्ट्र' : 'Maharashtra' },
    { value: 'punjab', label: language === 'hi' ? 'पंजाब' : 'Punjab' },
    { value: 'haryana', label: language === 'hi' ? 'हरियाणा' : 'Haryana' },
    { value: 'uttar-pradesh', label: language === 'hi' ? 'उत्तर प्रदेश' : 'Uttar Pradesh' },
    { value: 'karnataka', label: language === 'hi' ? 'कर्नाटक' : 'Karnataka' }
  ];

  useEffect(() => {
    // Mock market data
    const mockMarketData: MarketPrice[] = [
      {
        crop: 'Rice',
        variety: 'Basmati',
        market: 'Pune',
        state: 'Maharashtra',
        price: 2850,
        unit: 'quintal',
        change: 5.2,
        trend: 'up',
        lastUpdated: '2024-01-15 10:30',
        minPrice: 2800,
        maxPrice: 2900,
        modalPrice: 2850
      },
      {
        crop: 'Rice',
        variety: 'Basmati',
        market: 'Mumbai',
        state: 'Maharashtra',
        price: 2920,
        unit: 'quintal',
        change: 3.8,
        trend: 'up',
        lastUpdated: '2024-01-15 11:00',
        minPrice: 2850,
        maxPrice: 2950,
        modalPrice: 2920
      },
      {
        crop: 'Rice',
        variety: 'Common',
        market: 'Nashik',
        state: 'Maharashtra',
        price: 2650,
        unit: 'quintal',
        change: -1.2,
        trend: 'down',
        lastUpdated: '2024-01-15 09:45',
        minPrice: 2600,
        maxPrice: 2700,
        modalPrice: 2650
      },
      {
        crop: 'Rice',
        variety: 'Basmati',
        market: 'Kolhapur',
        state: 'Maharashtra',
        price: 2780,
        unit: 'quintal',
        change: 2.1,
        trend: 'up',
        lastUpdated: '2024-01-15 10:15',
        minPrice: 2750,
        maxPrice: 2800,
        modalPrice: 2780
      }
    ];

    const mockPriceHistory: PriceHistory[] = [
      { date: '01-10', price: 2650, market: 'Pune' },
      { date: '01-11', price: 2680, market: 'Pune' },
      { date: '01-12', price: 2720, market: 'Pune' },
      { date: '01-13', price: 2750, market: 'Pune' },
      { date: '01-14', price: 2800, market: 'Pune' },
      { date: '01-15', price: 2850, market: 'Pune' },
      { date: '01-10', price: 2700, market: 'Mumbai' },
      { date: '01-11', price: 2740, market: 'Mumbai' },
      { date: '01-12', price: 2780, market: 'Mumbai' },
      { date: '01-13', price: 2820, market: 'Mumbai' },
      { date: '01-14', price: 2880, market: 'Mumbai' },
      { date: '01-15', price: 2920, market: 'Mumbai' }
    ];

    setMarketData(mockMarketData);
    setPriceHistory(mockPriceHistory);
  }, [selectedCrop, selectedState]);

  const filteredMarketData = marketData.filter(item =>
    item.crop.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.market.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.variety.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getTrendIcon = (trend: string, change: number) => {
    if (trend === 'up') {
      return <TrendingUp className="h-4 w-4 text-green-600" />;
    } else if (trend === 'down') {
      return <TrendingDown className="h-4 w-4 text-red-600" />;
    }
    return <div className="h-4 w-4" />;
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'text-green-600';
      case 'down': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getBestSellingMarket = () => {
    return filteredMarketData.reduce((best, current) => 
      current.price > best.price ? current : best
    , filteredMarketData[0]);
  };

  const togglePriceAlert = (marketId: string) => {
    if (priceAlerts.includes(marketId)) {
      setPriceAlerts(priceAlerts.filter(id => id !== marketId));
    } else {
      setPriceAlerts([...priceAlerts, marketId]);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">{t.title}</h2>
        <p className="text-gray-600">{t.subtitle}</p>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
              <Input
                placeholder={t.searchCrop}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCrop} onValueChange={setSelectedCrop}>
              <SelectTrigger>
                <SelectValue placeholder={t.selectCrop} />
              </SelectTrigger>
              <SelectContent>
                {crops.map((crop) => (
                  <SelectItem key={crop.value} value={crop.value}>
                    {crop.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedState} onValueChange={setSelectedState}>
              <SelectTrigger>
                <SelectValue placeholder={t.selectState} />
              </SelectTrigger>
              <SelectContent>
                {states.map((state) => (
                  <SelectItem key={state.value} value={state.value}>
                    {state.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Current Prices */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <DollarSign className="h-5 w-5 text-green-600" />
                <span>{t.currentPrices}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredMarketData.map((item, index) => (
                  <div key={index} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-lg">{item.crop} - {item.variety}</h4>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <MapPin className="h-4 w-4" />
                          <span>{item.market}, {item.state}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-green-600">₹{item.price}</div>
                        <div className="text-sm text-gray-600">{t.quintal}</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                      <div className="text-center p-2 bg-gray-50 rounded">
                        <p className="text-xs text-gray-600">{t.minPrice}</p>
                        <p className="font-semibold">₹{item.minPrice}</p>
                      </div>
                      <div className="text-center p-2 bg-gray-50 rounded">
                        <p className="text-xs text-gray-600">{t.maxPrice}</p>
                        <p className="font-semibold">₹{item.maxPrice}</p>
                      </div>
                      <div className="text-center p-2 bg-gray-50 rounded">
                        <p className="text-xs text-gray-600">{t.modalPrice}</p>
                        <p className="font-semibold">₹{item.modalPrice}</p>
                      </div>
                      <div className="text-center p-2 bg-gray-50 rounded">
                        <p className="text-xs text-gray-600">{t.change}</p>
                        <div className={`flex items-center justify-center space-x-1 font-semibold ${getTrendColor(item.trend)}`}>
                          {getTrendIcon(item.trend, item.change)}
                          <span>{item.change > 0 ? '+' : ''}{item.change}%</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-xs text-gray-500">
                        {t.lastUpdated}: {item.lastUpdated}
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => togglePriceAlert(`${item.market}-${item.crop}`)}
                        className={priceAlerts.includes(`${item.market}-${item.crop}`) ? 'bg-blue-50' : ''}
                      >
                        <Bell className="h-4 w-4 mr-1" />
                        {priceAlerts.includes(`${item.market}-${item.crop}`) ? t.removeAlert : t.setAlert}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Price History Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5 text-blue-600" />
                <span>{t.priceHistory}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={priceHistory}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value: any, name: any) => [`₹${value}`, name]}
                      labelFormatter={(label) => `Date: ${label}`}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="price" 
                      stroke="#10b981" 
                      strokeWidth={2}
                      dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Best Selling Recommendation */}
          {filteredMarketData.length > 0 && (
            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="text-green-800">{t.recommendation}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-center p-3 bg-white rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Best Market</p>
                    <p className="font-bold text-lg">{getBestSellingMarket().market}</p>
                    <p className="text-2xl font-bold text-green-600">₹{getBestSellingMarket().price}</p>
                    <p className="text-sm text-gray-600">{t.quintal}</p>
                  </div>
                  <div className="text-sm text-green-800">
                    {language === 'hi' 
                      ? `इस बाजार में ₹${getBestSellingMarket().price - filteredMarketData[0]?.price || 0} अधिक मिल सकता है`
                      : `You can get ₹${getBestSellingMarket().price - filteredMarketData[0]?.price || 0} more in this market`
                    }
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Top Markets */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-blue-600" />
                <span>{t.higherPrices}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {filteredMarketData
                .sort((a, b) => b.price - a.price)
                .slice(0, 3)
                .map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">{item.market}</p>
                      <p className="text-sm text-gray-600">{item.variety}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-600">₹{item.price}</p>
                      <div className={`flex items-center space-x-1 text-xs ${getTrendColor(item.trend)}`}>
                        {getTrendIcon(item.trend, item.change)}
                        <span>{item.change > 0 ? '+' : ''}{item.change}%</span>
                      </div>
                    </div>
                  </div>
                ))}
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Market Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <Users className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Active Markets</p>
                <p className="text-2xl font-bold">{filteredMarketData.length}</p>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <TrendingUp className="h-6 w-6 text-green-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Average Price</p>
                <p className="text-2xl font-bold">
                  ₹{Math.round(filteredMarketData.reduce((sum, item) => sum + item.price, 0) / filteredMarketData.length)}
                </p>
              </div>
              <div className="text-center p-3 bg-yellow-50 rounded-lg">
                <Truck className="h-6 w-6 text-yellow-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Transport Cost</p>
                <p className="text-2xl font-bold">₹50-80</p>
                <p className="text-xs text-gray-500">per quintal</p>
              </div>
            </CardContent>
          </Card>

          {/* Price Alerts */}
          {priceAlerts.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bell className="h-5 w-5 text-yellow-600" />
                  <span>{t.priceAlerts}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {priceAlerts.map((alert, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-yellow-50 rounded">
                      <span className="text-sm">{alert}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => togglePriceAlert(alert)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}