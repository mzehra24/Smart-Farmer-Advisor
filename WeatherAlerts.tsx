import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Alert, AlertDescription } from "./ui/alert";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { 
  CloudRain, 
  Sun, 
  Cloud, 
  Wind, 
  Thermometer, 
  Droplets, 
  Eye, 
  Sunrise, 
  Sunset,
  AlertTriangle,
  Bell,
  Zap,
  Snowflake,
  Navigation
} from 'lucide-react';

interface WeatherAlertsProps {
  language: string;
}

interface WeatherData {
  current: {
    temperature: number;
    humidity: number;
    windSpeed: number;
    pressure: number;
    visibility: number;
    uvIndex: number;
    condition: string;
    icon: string;
  };
  forecast: Array<{
    date: string;
    day: string;
    high: number;
    low: number;
    condition: string;
    icon: string;
    precipitation: number;
    windSpeed: number;
  }>;
  alerts: Array<{
    id: string;
    type: 'severe' | 'moderate' | 'advisory';
    title: string;
    description: string;
    startTime: string;
    endTime: string;
    impact: string;
  }>;
}

export function WeatherAlerts({ language }: WeatherAlertsProps) {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [selectedDay, setSelectedDay] = useState(0);

  const translations = {
    'en': {
      title: 'Weather Alerts & Forecast',
      subtitle: 'Real-time weather updates and farming advisories',
      currentWeather: 'Current Weather',
      forecast: '7-Day Forecast',
      alerts: 'Weather Alerts',
      farmingAdvice: 'Farming Advice',
      temperature: 'Temperature',
      humidity: 'Humidity',
      windSpeed: 'Wind Speed',
      pressure: 'Pressure',
      visibility: 'Visibility',
      uvIndex: 'UV Index',
      sunrise: 'Sunrise',
      sunset: 'Sunset',
      precipitation: 'Precipitation',
      severe: 'Severe',
      moderate: 'Moderate',
      advisory: 'Advisory',
      today: 'Today',
      tomorrow: 'Tomorrow',
      impact: 'Impact on Farming'
    },
    'hi': {
      title: 'मौसम अलर्ट और पूर्वानुमान',
      subtitle: 'वास्तविक समय मौसम अपडेट और कृषि सलाह',
      currentWeather: 'वर्तमान मौसम',
      forecast: '7-दिन का पूर्वानुमान',
      alerts: 'मौसम अलर्ट',
      farmingAdvice: 'कृषि सलाह',
      temperature: 'तापमान',
      humidity: 'नमी',
      windSpeed: 'हवा की गति',
      pressure: 'दबाव',
      visibility: 'दृश्यता',
      uvIndex: 'UV सूचकांक',
      sunrise: 'सूर्योदय',
      sunset: 'सूर्यास्त',
      precipitation: 'वर्षा',
      severe: 'गंभीर',
      moderate: 'मध्यम',
      advisory: 'सलाह',
      today: 'आज',
      tomorrow: 'कल',
      impact: 'खेती पर प्रभाव'
    }
  };

  const t = translations[language as keyof typeof translations] || translations['en'];

  useEffect(() => {
    // Simulate fetching weather data
    const mockWeatherData: WeatherData = {
      current: {
        temperature: 28,
        humidity: 65,
        windSpeed: 12,
        pressure: 1013,
        visibility: 10,
        uvIndex: 7,
        condition: 'Partly Cloudy',
        icon: 'partly-cloudy'
      },
      forecast: [
        {
          date: '2024-01-15',
          day: t.today,
          high: 30,
          low: 22,
          condition: 'Partly Cloudy',
          icon: 'partly-cloudy',
          precipitation: 10,
          windSpeed: 12
        },
        {
          date: '2024-01-16',
          day: t.tomorrow,
          high: 27,
          low: 20,
          condition: 'Rain',
          icon: 'rain',
          precipitation: 85,
          windSpeed: 18
        },
        {
          date: '2024-01-17',
          day: 'Wed',
          high: 25,
          low: 19,
          condition: 'Heavy Rain',
          icon: 'heavy-rain',
          precipitation: 95,
          windSpeed: 25
        },
        {
          date: '2024-01-18',
          day: 'Thu',
          high: 29,
          low: 21,
          condition: 'Cloudy',
          icon: 'cloudy',
          precipitation: 30,
          windSpeed: 15
        },
        {
          date: '2024-01-19',
          day: 'Fri',
          high: 31,
          low: 23,
          condition: 'Sunny',
          icon: 'sunny',
          precipitation: 5,
          windSpeed: 10
        },
        {
          date: '2024-01-20',
          day: 'Sat',
          high: 32,
          low: 24,
          condition: 'Sunny',
          icon: 'sunny',
          precipitation: 0,
          windSpeed: 8
        },
        {
          date: '2024-01-21',
          day: 'Sun',
          high: 28,
          low: 22,
          condition: 'Partly Cloudy',
          icon: 'partly-cloudy',
          precipitation: 20,
          windSpeed: 14
        }
      ],
      alerts: [
        {
          id: '1',
          type: 'severe',
          title: language === 'hi' ? 'भारी वर्षा चेतावनी' : 'Heavy Rainfall Warning',
          description: language === 'hi' 
            ? 'अगले 48 घंटों में 100-150mm भारी वर्षा की संभावना। तेज हवाओं के साथ तूफान संभावित।'
            : 'Heavy rainfall of 100-150mm expected in next 48 hours. Thunderstorms with strong winds likely.',
          startTime: '2024-01-16 06:00',
          endTime: '2024-01-17 18:00',
          impact: language === 'hi' 
            ? 'फसल कटाई और छिड़काव कार्य तुरंत रोकें। पानी की निकासी का इंतजाम करें।'
            : 'Stop harvesting and spraying activities immediately. Arrange for water drainage.'
        },
        {
          id: '2',
          type: 'moderate',
          title: language === 'hi' ? 'हवा की गति चेतावनी' : 'Wind Speed Advisory',
          description: language === 'hi' 
            ? '25-30 km/h की हवा की गति। युवा पौधों को सहारा दें।'
            : 'Wind speeds of 25-30 km/h expected. Provide support to young plants.',
          startTime: '2024-01-16 10:00',
          endTime: '2024-01-16 20:00',
          impact: language === 'hi' 
            ? 'नाजुक फसलों को हवा से बचाने का इंतजाम करें।'
            : 'Protect delicate crops from wind damage.'
        }
      ]
    };

    setWeatherData(mockWeatherData);
  }, [language, t.today, t.tomorrow]);

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'sunny': return <Sun className="h-8 w-8 text-yellow-500" />;
      case 'partly-cloudy': return <Cloud className="h-8 w-8 text-gray-500" />;
      case 'cloudy': return <Cloud className="h-8 w-8 text-gray-600" />;
      case 'rain': return <CloudRain className="h-8 w-8 text-blue-500" />;
      case 'heavy-rain': return <CloudRain className="h-8 w-8 text-blue-700" />;
      default: return <Sun className="h-8 w-8 text-yellow-500" />;
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'severe': return 'border-red-200 bg-red-50';
      case 'moderate': return 'border-yellow-200 bg-yellow-50';
      case 'advisory': return 'border-blue-200 bg-blue-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'severe': return <AlertTriangle className="h-4 w-4 text-red-600" />;
      case 'moderate': return <Bell className="h-4 w-4 text-yellow-600" />;
      case 'advisory': return <Eye className="h-4 w-4 text-blue-600" />;
      default: return <Bell className="h-4 w-4 text-gray-600" />;
    }
  };

  const getFarmingAdvice = (forecast: any) => {
    const advice = [];
    
    if (forecast.precipitation > 80) {
      advice.push(language === 'hi' 
        ? 'भारी बारिश के कारण खेतों में जाने से बचें'
        : 'Avoid field activities due to heavy rain'
      );
    } else if (forecast.precipitation > 50) {
      advice.push(language === 'hi' 
        ? 'छिड़काव कार्य स्थगित करें'
        : 'Postpone spraying activities'
      );
    } else if (forecast.precipitation < 20) {
      advice.push(language === 'hi' 
        ? 'सिंचाई की जांच करें'
        : 'Check irrigation requirements'
      );
    }

    if (forecast.windSpeed > 20) {
      advice.push(language === 'hi' 
        ? 'तेज हवा से फसल को बचाएं'
        : 'Protect crops from strong winds'
      );
    }

    if (forecast.high > 35) {
      advice.push(language === 'hi' 
        ? 'अधिक तापमान से पौधों को बचाएं'
        : 'Protect plants from high temperature'
      );
    }

    return advice.length > 0 ? advice : [
      language === 'hi' 
        ? 'सामान्य कृषि कार्य जारी रख सकते हैं'
        : 'Normal farming activities can continue'
    ];
  };

  if (!weatherData) {
    return <div>Loading weather data...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">{t.title}</h2>
        <p className="text-gray-600">{t.subtitle}</p>
      </div>

      {/* Weather Alerts */}
      {weatherData.alerts.length > 0 && (
        <div className="space-y-3">
          {weatherData.alerts.map((alert) => (
            <Alert key={alert.id} className={getAlertColor(alert.type)}>
              {getAlertIcon(alert.type)}
              <div className="ml-2">
                <div className="flex items-center space-x-2 mb-2">
                  <h4 className="font-semibold">{alert.title}</h4>
                  <Badge variant={alert.type === 'severe' ? 'destructive' : 'secondary'}>
                    {t[alert.type as keyof typeof t]}
                  </Badge>
                </div>
                <AlertDescription className="mb-2">
                  {alert.description}
                </AlertDescription>
                <div className="text-sm text-gray-600 mb-2">
                  {alert.startTime} - {alert.endTime}
                </div>
                <div className="font-medium text-sm">
                  {t.impact}: {alert.impact}
                </div>
              </div>
            </Alert>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Current Weather */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              {getWeatherIcon(weatherData.current.condition)}
              <span>{t.currentWeather}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900 mb-2">
                {weatherData.current.temperature}°C
              </div>
              <p className="text-gray-600">{weatherData.current.condition}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <Droplets className="h-5 w-5 text-blue-500 mx-auto mb-1" />
                <p className="text-xs text-gray-600">{t.humidity}</p>
                <p className="font-semibold">{weatherData.current.humidity}%</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <Wind className="h-5 w-5 text-gray-500 mx-auto mb-1" />
                <p className="text-xs text-gray-600">{t.windSpeed}</p>
                <p className="font-semibold">{weatherData.current.windSpeed} km/h</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <Navigation className="h-5 w-5 text-gray-500 mx-auto mb-1" />
                <p className="text-xs text-gray-600">{t.pressure}</p>
                <p className="font-semibold">{weatherData.current.pressure} mb</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <Sun className="h-5 w-5 text-yellow-500 mx-auto mb-1" />
                <p className="text-xs text-gray-600">{t.uvIndex}</p>
                <p className="font-semibold">{weatherData.current.uvIndex}</p>
              </div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t">
              <div className="flex items-center space-x-2">
                <Sunrise className="h-4 w-4 text-orange-500" />
                <span className="text-sm">6:30 AM</span>
              </div>
              <div className="flex items-center space-x-2">
                <Sunset className="h-4 w-4 text-orange-600" />
                <span className="text-sm">6:45 PM</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 7-Day Forecast */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>{t.forecast}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-2 mb-4">
              {weatherData.forecast.map((day, index) => (
                <Button
                  key={index}
                  variant={selectedDay === index ? "default" : "outline"}
                  className="p-2 h-auto flex flex-col items-center"
                  onClick={() => setSelectedDay(index)}
                >
                  <div className="text-xs mb-1">{day.day}</div>
                  {getWeatherIcon(day.condition)}
                  <div className="text-xs mt-1">
                    <div className="font-semibold">{day.high}°</div>
                    <div className="text-gray-500">{day.low}°</div>
                  </div>
                </Button>
              ))}
            </div>

            {/* Selected Day Details */}
            {weatherData.forecast[selectedDay] && (
              <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-lg">
                    {weatherData.forecast[selectedDay].day} - {weatherData.forecast[selectedDay].condition}
                  </h4>
                  <div className="text-right">
                    <div className="text-2xl font-bold">{weatherData.forecast[selectedDay].high}°C</div>
                    <div className="text-gray-600">{weatherData.forecast[selectedDay].low}°C</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{t.precipitation}</p>
                    <div className="flex items-center space-x-2">
                      <Progress value={weatherData.forecast[selectedDay].precipitation} className="flex-1" />
                      <span className="text-sm font-medium">{weatherData.forecast[selectedDay].precipitation}%</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{t.windSpeed}</p>
                    <p className="font-semibold">{weatherData.forecast[selectedDay].windSpeed} km/h</p>
                  </div>
                </div>

                <div>
                  <h5 className="font-medium mb-2">{t.farmingAdvice}</h5>
                  <div className="space-y-1">
                    {getFarmingAdvice(weatherData.forecast[selectedDay]).map((advice, index) => (
                      <div key={index} className="flex items-center space-x-2 text-sm">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>{advice}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}