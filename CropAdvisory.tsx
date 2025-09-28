import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { 
  Send, 
  Bot, 
  User, 
  Mic, 
  MicOff,
  Sprout,
  Calendar,
  MapPin,
  Thermometer,
  Droplets,
  Sun,
  CloudRain,
  Leaf,
  Bug,
  Shield,
  TrendingUp
} from 'lucide-react';

interface CropAdvisoryProps {
  language: string;
}

interface ChatMessage {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

export function CropAdvisory({ language }: CropAdvisoryProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'bot',
      content: language === 'hi' 
        ? 'नमस्ते! मैं आपका AI कृषि सलाहकार हूं। मैं फसल चयन, रोग नियंत्रण, उर्वरक उपयोग और मौसम आधारित सलाह में आपकी सहायता कर सकता हूं।'
        : 'Hello! I\'m your AI crop advisor. I can help you with crop selection, disease control, fertilizer recommendations, and weather-based farming advice.',
      timestamp: new Date(),
      suggestions: [
        language === 'hi' ? 'मेरी फसल के लिए सबसे अच्छा समय क्या है?' : 'What\'s the best time for my crop?',
        language === 'hi' ? 'मिट्टी की जांच कैसे करें?' : 'How to test soil health?',
        language === 'hi' ? 'कीट नियंत्रण के तरीके' : 'Pest control methods',
        language === 'hi' ? 'उर्वरक की सिफारिश' : 'Fertilizer recommendations'
      ]
    }
  ]);
  
  const [inputMessage, setInputMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [selectedCrop, setSelectedCrop] = useState('');
  const [farmLocation, setFarmLocation] = useState('');
  const [farmSize, setFarmSize] = useState('');
  const [soilType, setSoilType] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const translations = {
    'en': {
      title: 'AI Crop Advisory',
      subtitle: 'Get personalized farming recommendations',
      chatWith: 'Chat with AI Advisor',
      farmDetails: 'Farm Details',
      cropSelection: 'Crop Selection',
      location: 'Farm Location',
      size: 'Farm Size',
      soilType: 'Soil Type',
      typeMessage: 'Type your farming question...',
      send: 'Send',
      listening: 'Listening...',
      startVoice: 'Start Voice Input',
      recommendations: 'Current Recommendations',
      weatherImpact: 'Weather Impact',
      cropHealth: 'Crop Health Status',
      actionItems: 'Action Items',
      selectCrop: 'Select your crop',
      selectSoil: 'Select soil type',
      acres: 'acres',
      loamy: 'Loamy',
      clay: 'Clay',
      sandy: 'Sandy',
      silt: 'Silt',
      rice: 'Rice',
      wheat: 'Wheat',
      sugarcane: 'Sugarcane',
      cotton: 'Cotton',
      maize: 'Maize',
      soybean: 'Soybean'
    },
    'hi': {
      title: 'AI फसल सलाहकार',
      subtitle: 'व्यक्तिगत कृषि सिफारिशें प्राप्त करें',
      chatWith: 'AI सलाहकार से चैट करें',
      farmDetails: 'खेत का विवरण',
      cropSelection: 'फसल चयन',
      location: 'खेत का स्थान',
      size: 'खेत का आकार',
      soilType: 'मिट्टी का प्रकार',
      typeMessage: 'अपना कृषि प्रश्न टाइप करें...',
      send: 'भेजें',
      listening: 'सुन रहा है...',
      startVoice: 'आवाज इनपुट शुरू करें',
      recommendations: 'वर्तमान सिफारिशें',
      weatherImpact: 'मौसम का प्रभाव',
      cropHealth: 'फसल स्वास्थ्य स्थिति',
      actionItems: 'कार्य सूची',
      selectCrop: 'अपनी फसल चुनें',
      selectSoil: 'मिट्टी का प्रकार चुनें',
      acres: 'एकड़',
      loamy: 'दोमट',
      clay: 'चिकनी',
      sandy: 'रेतीली',
      silt: 'चिकनी बलुई',
      rice: 'धान',
      wheat: 'गेहूं',
      sugarcane: 'गन्ना',
      cotton: 'कपास',
      maize: 'मक्का',
      soybean: 'सोयाबीन'
    }
  };

  const t = translations[language as keyof typeof translations] || translations['en'];

  const crops = [
    { value: 'rice', label: t.rice },
    { value: 'wheat', label: t.wheat },
    { value: 'sugarcane', label: t.sugarcane },
    { value: 'cotton', label: t.cotton },
    { value: 'maize', label: t.maize },
    { value: 'soybean', label: t.soybean }
  ];

  const soilTypes = [
    { value: 'loamy', label: t.loamy },
    { value: 'clay', label: t.clay },
    { value: 'sandy', label: t.sandy },
    { value: 'silt', label: t.silt }
  ];

  const currentRecommendations = [
    {
      title: language === 'hi' ? 'सिंचाई की सिफारिश' : 'Irrigation Recommendation',
      content: language === 'hi' ? 'अगले 3 दिनों में 2-3 बार हल्की सिंचाई करें' : 'Light irrigation 2-3 times in next 3 days',
      priority: 'high',
      icon: <Droplets className="h-4 w-4" />
    },
    {
      title: language === 'hi' ? 'उर्वरक आवेदन' : 'Fertilizer Application',
      content: language === 'hi' ? 'नाइट्रोजन उर्वरक 50 किलो प्रति एकड़' : 'Nitrogen fertilizer 50kg per acre',
      priority: 'medium',
      icon: <Leaf className="h-4 w-4" />
    },
    {
      title: language === 'hi' ? 'कीट निगरानी' : 'Pest Monitoring',
      content: language === 'hi' ? 'भूरे प्लांटहॉपर के लिए नियमित जांच करें' : 'Regular check for brown planthopper',
      priority: 'medium',
      icon: <Bug className="h-4 w-4" />
    }
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');

    // Simulate AI response
    setTimeout(() => {
      const botResponse = generateBotResponse(inputMessage, language);
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const generateBotResponse = (userInput: string, lang: string): ChatMessage => {
    // Simulate intelligent responses based on input
    const responses = {
      'en': {
        default: 'Based on your query, I recommend consulting your local agricultural extension officer and considering soil testing for more specific advice.',
        weather: 'Current weather conditions suggest moderate irrigation. Avoid heavy watering during the monsoon season.',
        pest: 'For pest control, I recommend integrated pest management (IPM) practices. Use neem-based organic pesticides first.',
        fertilizer: 'Based on your soil type and crop, apply balanced NPK fertilizer. Consider organic compost for better soil health.',
        irrigation: 'Maintain soil moisture at 70-80% field capacity. Use drip irrigation for water efficiency.'
      },
      'hi': {
        default: 'आपके प्रश्न के आधार पर, मैं स्थानीय कृषि विस्तार अधिकारी से सलाह लेने और अधिक विशिष्ट सलाह के लिए मिट्टी परीक्षण कराने की सिफारिश करता हूं।',
        weather: 'वर्तमान मौसम की स्थिति मध्यम सिंचाई का सुझाव देती है। मानसून के दौरान भारी पानी देने से बचें।',
        pest: 'कीट नियंत्रण के लिए, मैं एकीकृत कीट प्रबंधन (IPM) प्रथाओं की सिफारिश करता हूं। पहले नीम आधारित जैविक कीटनाशक का उपयोग करें।',
        fertilizer: 'आपकी मिट्टी के प्रकार और फसल के आधार पर, संतुलित NPK उर्वरक डालें। बेहतर मिट्टी स्वास्थ्य के लिए जैविक खाद का विचार करें।',
        irrigation: 'मिट्टी की नमी को 70-80% फील्ड कैपेसिटी पर बनाए रखें। पानी की कुशलता के लिए ड्रिप सिंचाई का उपयोग करें।'
      }
    };

    const langResponses = responses[lang as keyof typeof responses] || responses['en'];
    
    let responseContent = langResponses.default;
    
    if (userInput.toLowerCase().includes('weather') || userInput.toLowerCase().includes('मौसम')) {
      responseContent = langResponses.weather;
    } else if (userInput.toLowerCase().includes('pest') || userInput.toLowerCase().includes('कीट')) {
      responseContent = langResponses.pest;
    } else if (userInput.toLowerCase().includes('fertilizer') || userInput.toLowerCase().includes('उर्वरक')) {
      responseContent = langResponses.fertilizer;
    } else if (userInput.toLowerCase().includes('irrigation') || userInput.toLowerCase().includes('सिंचाई')) {
      responseContent = langResponses.irrigation;
    }

    return {
      id: Date.now().toString(),
      type: 'bot',
      content: responseContent,
      timestamp: new Date(),
      suggestions: [
        lang === 'hi' ? 'और विस्तार से बताएं' : 'Tell me more',
        lang === 'hi' ? 'दूसरे विकल्प' : 'Alternative options',
        lang === 'hi' ? 'लागत कितनी होगी?' : 'What will be the cost?'
      ]
    };
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputMessage(suggestion);
  };

  const startVoiceInput = () => {
    setIsListening(true);
    // Implement voice recognition here
    setTimeout(() => {
      setIsListening(false);
      setInputMessage(language === 'hi' ? 'मेरी फसल में पीले पत्ते दिखाई दे रहे हैं' : 'My crop is showing yellow leaves');
    }, 3000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Chat Interface */}
      <div className="lg:col-span-2">
        <Card className="h-[600px] flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bot className="h-5 w-5 text-blue-600" />
              <span>{t.chatWith}</span>
            </CardTitle>
          </CardHeader>
          
          <CardContent className="flex-1 flex flex-col">
            <ScrollArea className="flex-1 pr-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] rounded-lg p-3 ${
                      message.type === 'user' 
                        ? 'bg-blue-600 text-white ml-4' 
                        : 'bg-gray-100 mr-4'
                    }`}>
                      <div className="flex items-start space-x-2">
                        {message.type === 'bot' && (
                          <Bot className="h-4 w-4 mt-1 text-blue-600" />
                        )}
                        {message.type === 'user' && (
                          <User className="h-4 w-4 mt-1" />
                        )}
                        <div className="flex-1">
                          <p className="text-sm">{message.content}</p>
                          <p className="text-xs opacity-70 mt-1">
                            {message.timestamp.toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                      
                      {message.suggestions && (
                        <div className="mt-3 space-y-1">
                          {message.suggestions.map((suggestion, index) => (
                            <Button
                              key={index}
                              variant="outline"
                              size="sm"
                              className="text-xs mr-2 mb-1 h-7"
                              onClick={() => handleSuggestionClick(suggestion)}
                            >
                              {suggestion}
                            </Button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div ref={messagesEndRef} />
            </ScrollArea>
            
            <div className="mt-4 flex space-x-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder={t.typeMessage}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1"
              />
              <Button
                onClick={startVoiceInput}
                variant="outline"
                size="icon"
                className={isListening ? 'bg-red-100 text-red-600' : ''}
              >
                {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              </Button>
              <Button onClick={handleSendMessage}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Side Panel */}
      <div className="space-y-6">
        {/* Farm Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Sprout className="h-5 w-5 text-green-600" />
              <span>{t.farmDetails}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">{t.cropSelection}</label>
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
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">{t.location}</label>
              <Input
                value={farmLocation}
                onChange={(e) => setFarmLocation(e.target.value)}
                placeholder="Pune, Maharashtra"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">{t.size}</label>
              <Input
                value={farmSize}
                onChange={(e) => setFarmSize(e.target.value)}
                placeholder={`5 ${t.acres}`}
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">{t.soilType}</label>
              <Select value={soilType} onValueChange={setSoilType}>
                <SelectTrigger>
                  <SelectValue placeholder={t.selectSoil} />
                </SelectTrigger>
                <SelectContent>
                  {soilTypes.map((soil) => (
                    <SelectItem key={soil.value} value={soil.value}>
                      {soil.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Current Recommendations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              <span>{t.recommendations}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {currentRecommendations.map((rec, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  {rec.icon}
                  <span className="font-medium text-sm">{rec.title}</span>
                  <Badge 
                    variant={rec.priority === 'high' ? 'destructive' : 'secondary'}
                    className="text-xs h-5"
                  >
                    {rec.priority}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600">{rec.content}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}