import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Play, 
  Pause, 
  RotateCcw,
  Languages,
  Settings,
  Headphones,
  Activity,
  Circle,
  MessageCircle
} from 'lucide-react';

interface VoiceAssistantProps {
  language: string;
}

interface VoiceSession {
  id: string;
  timestamp: string;
  question: string;
  answer: string;
  duration: number;
  confidence: number;
}

export function VoiceAssistant({ language }: VoiceAssistantProps) {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [sessions, setSessions] = useState<VoiceSession[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(75);

  const audioRef = useRef<HTMLAudioElement>(null);

  const translations = {
    'en': {
      title: 'Voice Assistant',
      subtitle: 'Ask farming questions using your voice',
      startListening: 'Start Listening',
      stopListening: 'Stop Listening',
      listening: 'Listening...',
      processing: 'Processing...',
      speaking: 'Speaking...',
      askQuestion: 'Ask your farming question',
      recentSessions: 'Recent Voice Sessions',
      playback: 'Playback',
      settings: 'Voice Settings',
      language: 'Language',
      volume: 'Volume',
      speed: 'Speed',
      voiceCommands: 'Voice Commands',
      examples: 'Example Questions',
      confidence: 'Confidence',
      duration: 'Duration',
      question: 'Question',
      answer: 'Answer',
      tryAgain: 'Try Again',
      clear: 'Clear',
      mute: 'Mute',
      unmute: 'Unmute'
    },
    'hi': {
      title: 'आवाज सहायक',
      subtitle: 'अपनी आवाज का उपयोग करके कृषि प्रश्न पूछें',
      startListening: 'सुनना शुरू करें',
      stopListening: 'सुनना बंद करें',
      listening: 'सुन रहा है...',
      processing: 'प्रोसेसिंग...',
      speaking: 'बोल रहा है...',
      askQuestion: 'अपना कृषि प्रश्न पूछें',
      recentSessions: 'हाल के आवाज सत्र',
      playback: 'प्लेबैक',
      settings: 'आवाज सेटिंग्स',
      language: 'भाषा',
      volume: 'आवाज़',
      speed: 'गति',
      voiceCommands: 'आवाज कमांड',
      examples: 'उदाहरण प्रश्न',
      confidence: 'विश्वसनीयता',
      duration: 'अवधि',
      question: 'प्रश्न',
      answer: 'उत्तर',
      tryAgain: 'फिर कोशिश करें',
      clear: 'साफ़ करें',
      mute: 'मूक',
      unmute: 'अनम्यूट'
    }
  };

  const t = translations[language as keyof typeof translations] || translations['en'];

  const exampleQuestions = [
    language === 'hi' ? 'धान में कीट लगने पर क्या करें?' : 'What to do if pests attack rice?',
    language === 'hi' ? 'मिट्टी की जांच कैसे करें?' : 'How to test soil health?',
    language === 'hi' ? 'बारिश के बाद क्या सावधानी बरतें?' : 'What precautions after rainfall?',
    language === 'hi' ? 'उर्वरक कब और कितना डालें?' : 'When and how much fertilizer to apply?'
  ];

  const mockSessions: VoiceSession[] = [
    {
      id: '1',
      timestamp: '10:30 AM',
      question: language === 'hi' ? 'धान में भूरे धब्बे दिख रहे हैं' : 'Brown spots appearing on rice plants',
      answer: language === 'hi' 
        ? 'यह ब्लास्ट रोग हो सकता है। तुरंत ट्राइसाइक्लेज़ोल का छिड़काव करें।'
        : 'This could be blast disease. Apply Tricyclazole spray immediately.',
      duration: 45,
      confidence: 92
    },
    {
      id: '2',
      timestamp: '9:15 AM',
      question: language === 'hi' ? 'मिट्टी की pH कैसे बढ़ाएं?' : 'How to increase soil pH?',
      answer: language === 'hi' 
        ? 'चूना या लाइमस्टोन का उपयोग करें। 500 किलो प्रति एकड़ डालें।'
        : 'Use lime or limestone. Apply 500 kg per acre.',
      duration: 38,
      confidence: 88
    }
  ];

  useEffect(() => {
    setSessions(mockSessions);
    
    // Simulate audio level changes when listening
    let interval: NodeJS.Timeout;
    if (isListening) {
      interval = setInterval(() => {
        setAudioLevel(Math.random() * 100);
      }, 100);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isListening, language]);

  const startListening = () => {
    setIsListening(true);
    setCurrentQuestion('');
    setCurrentAnswer('');
    
    // Simulate speech recognition
    setTimeout(() => {
      const exampleQ = exampleQuestions[Math.floor(Math.random() * exampleQuestions.length)];
      setCurrentQuestion(exampleQ);
      setIsListening(false);
      
      // Simulate processing and response
      setTimeout(() => {
        processVoiceQuestion(exampleQ);
      }, 1000);
    }, 3000);
  };

  const stopListening = () => {
    setIsListening(false);
    setAudioLevel(0);
  };

  const processVoiceQuestion = (question: string) => {
    setIsSpeaking(true);
    
    // Generate response based on question
    let answer = '';
    if (question.toLowerCase().includes('pest') || question.toLowerCase().includes('कीट')) {
      answer = language === 'hi' 
        ? 'नीम का तेल और साबुन का घोल छिड़कें। जैविक कीटनाशक का उपयोग करें।'
        : 'Spray neem oil and soap solution. Use organic pesticides.';
    } else if (question.toLowerCase().includes('soil') || question.toLowerCase().includes('मिट्टी')) {
      answer = language === 'hi' 
        ? 'मिट्टी का pH 6.5-7.5 रखें। जैविक खाद मिलाएं।'
        : 'Maintain soil pH between 6.5-7.5. Add organic compost.';
    } else {
      answer = language === 'hi' 
        ? 'आपके प्रश्न के लिए स्थानीय कृषि विशेषज्ञ से सलाह लें।'
        : 'Consult local agriculture expert for your question.';
    }
    
    setCurrentAnswer(answer);
    
    // Simulate speech synthesis
    setTimeout(() => {
      setIsSpeaking(false);
      
      // Add to sessions
      const newSession: VoiceSession = {
        id: Date.now().toString(),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        question,
        answer,
        duration: Math.floor(Math.random() * 60) + 20,
        confidence: Math.floor(Math.random() * 20) + 80
      };
      
      setSessions(prev => [newSession, ...prev]);
    }, 2000);
  };

  const playAnswer = (answer: string) => {
    setIsPlaying(true);
    // Simulate audio playback
    setTimeout(() => {
      setIsPlaying(false);
    }, 3000);
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-green-600';
    if (confidence >= 75) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">{t.title}</h2>
        <p className="text-gray-600">{t.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Voice Interface */}
        <div className="lg:col-span-2 space-y-6">
          {/* Voice Control */}
          <Card className="text-center">
            <CardContent className="p-8">
              <div className="relative mb-8">
                {/* Audio Visualization */}
                <div className="flex items-center justify-center h-32 mb-6">
                  <div className={`relative w-32 h-32 rounded-full border-4 ${
                    isListening ? 'border-red-500 animate-pulse' : 
                    isSpeaking ? 'border-blue-500 animate-pulse' : 
                    'border-gray-300'
                  } flex items-center justify-center`}>
                    {isListening && (
                      <div className="absolute inset-0 rounded-full bg-red-100 opacity-30 animate-ping"></div>
                    )}
                    {isSpeaking && (
                      <div className="absolute inset-0 rounded-full bg-blue-100 opacity-30 animate-ping"></div>
                    )}
                    
                    {isListening ? (
                      <Mic className="h-12 w-12 text-red-600" />
                    ) : isSpeaking ? (
                      <Volume2 className="h-12 w-12 text-blue-600" />
                    ) : (
                      <Mic className="h-12 w-12 text-gray-400" />
                    )}
                  </div>
                </div>

                {/* Audio Level Indicator */}
                {isListening && (
                  <div className="flex justify-center items-end space-x-1 h-8 mb-4">
                    {[...Array(10)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-2 bg-red-500 rounded-t transition-all duration-100 ${
                          audioLevel > i * 10 ? `h-${Math.min(8, Math.floor(audioLevel / 10))}` : 'h-1'
                        }`}
                        style={{ height: audioLevel > i * 10 ? `${Math.min(32, audioLevel / 3)}px` : '4px' }}
                      />
                    ))}
                  </div>
                )}

                {/* Status Text */}
                <div className="mb-6">
                  {isListening && (
                    <div className="text-lg font-medium text-red-600 mb-2">
                      {t.listening}
                    </div>
                  )}
                  {isSpeaking && (
                    <div className="text-lg font-medium text-blue-600 mb-2">
                      {t.speaking}
                    </div>
                  )}
                  {!isListening && !isSpeaking && (
                    <div className="text-lg font-medium text-gray-600 mb-2">
                      {t.askQuestion}
                    </div>
                  )}
                  
                  {currentQuestion && (
                    <div className="p-3 bg-gray-100 rounded-lg mb-3">
                      <p className="text-sm text-gray-600 mb-1">{t.question}:</p>
                      <p className="font-medium">{currentQuestion}</p>
                    </div>
                  )}
                  
                  {currentAnswer && (
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">{t.answer}:</p>
                      <p className="font-medium text-blue-800">{currentAnswer}</p>
                    </div>
                  )}
                </div>

                {/* Control Buttons */}
                <div className="flex justify-center space-x-4">
                  {!isListening ? (
                    <Button 
                      onClick={startListening}
                      size="lg"
                      className="bg-red-600 hover:bg-red-700"
                      disabled={isSpeaking}
                    >
                      <Mic className="h-5 w-5 mr-2" />
                      {t.startListening}
                    </Button>
                  ) : (
                    <Button 
                      onClick={stopListening}
                      size="lg"
                      variant="outline"
                      className="border-red-600 text-red-600"
                    >
                      <MicOff className="h-5 w-5 mr-2" />
                      {t.stopListening}
                    </Button>
                  )}
                  
                  {currentAnswer && (
                    <Button 
                      onClick={() => playAnswer(currentAnswer)}
                      size="lg"
                      variant="outline"
                      disabled={isPlaying}
                    >
                      {isPlaying ? (
                        <Pause className="h-5 w-5 mr-2" />
                      ) : (
                        <Play className="h-5 w-5 mr-2" />
                      )}
                      {t.playback}
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Example Questions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageCircle className="h-5 w-5 text-blue-600" />
                <span>{t.examples}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {exampleQuestions.map((question, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="p-4 h-auto text-left justify-start"
                    onClick={() => processVoiceQuestion(question)}
                  >
                    <Mic className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span className="text-sm">{question}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Voice Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="h-5 w-5 text-gray-600" />
                <span>{t.settings}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">{t.volume}</label>
                <div className="flex items-center space-x-2">
                  <VolumeX className="h-4 w-4 text-gray-400" />
                  <Progress value={volume} className="flex-1" />
                  <Volume2 className="h-4 w-4 text-gray-600" />
                </div>
                <div className="text-center text-sm text-gray-600 mt-1">{volume}%</div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">{t.language}</label>
                <Button variant="outline" className="w-full justify-between">
                  <div className="flex items-center space-x-2">
                    <Languages className="h-4 w-4" />
                    <span>{language === 'hi' ? 'हिन्दी' : 'English'}</span>
                  </div>
                </Button>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">{t.speed}</label>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">0.5x</span>
                  <Progress value={75} className="flex-1" />
                  <span className="text-sm text-gray-600">2x</span>
                </div>
                <div className="text-center text-sm text-gray-600 mt-1">1.0x</div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Sessions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Headphones className="h-5 w-5 text-green-600" />
                <span>{t.recentSessions}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {sessions.map((session) => (
                <div key={session.id} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs text-gray-500">{session.timestamp}</span>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="text-xs">
                        {session.duration}s
                      </Badge>
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${getConfidenceColor(session.confidence)}`}
                      >
                        {session.confidence}%
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Q:</p>
                      <p className="text-sm font-medium">{session.question}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-1">A:</p>
                      <p className="text-sm text-gray-700">{session.answer}</p>
                    </div>
                  </div>

                  <div className="flex justify-end mt-2">
                    <Button variant="ghost" size="sm" onClick={() => playAnswer(session.answer)}>
                      <Play className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Voice Commands Help */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="h-5 w-5 text-purple-600" />
                <span>{t.voiceCommands}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="text-sm space-y-1">
                <p className="text-gray-600">
                  {language === 'hi' ? '• "सुनना शुरू करो"' : '• "Start listening"'}
                </p>
                <p className="text-gray-600">
                  {language === 'hi' ? '• "बंद करो"' : '• "Stop"'}
                </p>
                <p className="text-gray-600">
                  {language === 'hi' ? '• "दोहराओ"' : '• "Repeat"'}
                </p>
                <p className="text-gray-600">
                  {language === 'hi' ? '• "साफ़ करो"' : '• "Clear"'}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}