import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Textarea } from "./ui/textarea";
import { 
  Users, 
  MessageCircle, 
  Phone, 
  MapPin, 
  Star, 
  Plus, 
  Search,
  Filter,
  Heart,
  Share2,
  MoreHorizontal,
  Sprout,
  Calendar,
  Award,
  CheckCircle
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface FarmerNetworkProps {
  language: string;
}

interface Farmer {
  id: string;
  name: string;
  location: string;
  distance: number;
  crops: string[];
  experience: number;
  rating: number;
  verified: boolean;
  avatar?: string;
  phone: string;
  specialties: string[];
  recentActivity: string;
}

interface Post {
  id: string;
  farmer: Farmer;
  content: string;
  image?: string;
  timestamp: string;
  likes: number;
  comments: number;
  category: 'question' | 'tip' | 'success' | 'alert';
}

export function FarmerNetwork({ language }: FarmerNetworkProps) {
  const [selectedTab, setSelectedTab] = useState<'network' | 'posts' | 'groups'>('network');
  const [searchTerm, setSearchTerm] = useState('');
  const [newPost, setNewPost] = useState('');

  const translations = {
    'en': {
      title: 'Farmer Network',
      subtitle: 'Connect with local farmers and share knowledge',
      nearbyFarmers: 'Nearby Farmers',
      communityPosts: 'Community Posts',
      groups: 'Farmer Groups',
      searchFarmers: 'Search farmers...',
      connect: 'Connect',
      message: 'Message',
      call: 'Call',
      verified: 'Verified',
      experience: 'Experience',
      years: 'years',
      rating: 'Rating',
      distance: 'km away',
      writePost: 'Share your farming experience...',
      postTip: 'Share Tip',
      askQuestion: 'Ask Question',
      shareSuccess: 'Share Success',
      reportIssue: 'Report Issue',
      likes: 'likes',
      comments: 'comments',
      reply: 'Reply',
      share: 'Share',
      following: 'Following',
      followers: 'Followers',
      posts: 'Posts',
      joinGroup: 'Join Group',
      members: 'members',
      recentActivity: 'Recent Activity'
    },
    'hi': {
      title: 'किसान नेटवर्क',
      subtitle: 'स्थानीय किसानों से जुड़ें और ज्ञान साझा करें',
      nearbyFarmers: 'नजदीकी किसान',
      communityPosts: 'समुदायिक पोस्ट',
      groups: 'किसान समूह',
      searchFarmers: 'किसान खोजें...',
      connect: 'जुड़ें',
      message: 'संदेश',
      call: 'कॉल',
      verified: 'सत्यापित',
      experience: 'अनुभव',
      years: 'साल',
      rating: 'रेटिंग',
      distance: 'किमी दूर',
      writePost: 'अपना कृषि अनुभव साझा करें...',
      postTip: 'टिप साझा करें',
      askQuestion: 'प्रश्न पूछें',
      shareSuccess: 'सफलता साझा करें',
      reportIssue: 'समस्या रिपोर्ट करें',
      likes: 'लाइक',
      comments: 'टिप्पणियां',
      reply: 'उत्तर',
      share: 'साझा करें',
      following: 'फॉलो किए जा रहे',
      followers: 'फॉलोअर्स',
      posts: 'पोस्ट',
      joinGroup: 'समूह में शामिल हों',
      members: 'सदस्य',
      recentActivity: 'हाल की गतिविधि'
    }
  };

  const t = translations[language as keyof typeof translations] || translations['en'];

  const nearbyFarmers: Farmer[] = [
    {
      id: '1',
      name: language === 'hi' ? 'राज कुमार शर्मा' : 'Raj Kumar Sharma',
      location: language === 'hi' ? 'पुणे, महाराष्ट्र' : 'Pune, Maharashtra',
      distance: 2.5,
      crops: [language === 'hi' ? 'धान' : 'Rice', language === 'hi' ? 'गेहूं' : 'Wheat'],
      experience: 15,
      rating: 4.8,
      verified: true,
      phone: '+91 98765 43210',
      specialties: [language === 'hi' ? 'जैविक खेती' : 'Organic Farming', language === 'hi' ? 'जल प्रबंधन' : 'Water Management'],
      recentActivity: language === 'hi' ? 'एक घंटे पहले सक्रिय' : 'Active 1 hour ago'
    },
    {
      id: '2',
      name: language === 'hi' ? 'सुनीता देवी' : 'Sunita Devi',
      location: language === 'hi' ? 'नासिक, महाराष्ट्र' : 'Nashik, Maharashtra',
      distance: 8.2,
      crops: [language === 'hi' ? 'प्याज' : 'Onion', language === 'hi' ? 'टमाटर' : 'Tomato'],
      experience: 12,
      rating: 4.6,
      verified: true,
      phone: '+91 87654 32109',
      specialties: [language === 'hi' ? 'सब्जी उत्पादन' : 'Vegetable Production', language === 'hi' ? 'बाजार संपर्क' : 'Market Linkage'],
      recentActivity: language === 'hi' ? '2 घंटे पहले सक्रिय' : 'Active 2 hours ago'
    },
    {
      id: '3',
      name: language === 'hi' ? 'अमित पटेल' : 'Amit Patel',
      location: language === 'hi' ? 'अहमदाबाद, गुजरात' : 'Ahmedabad, Gujarat',
      distance: 12.1,
      crops: [language === 'hi' ? 'कपास' : 'Cotton', language === 'hi' ? 'मूंगफली' : 'Groundnut'],
      experience: 8,
      rating: 4.4,
      verified: false,
      phone: '+91 76543 21098',
      specialties: [language === 'hi' ? 'कीट प्रबंधन' : 'Pest Management', language === 'hi' ? 'मशीनीकरण' : 'Mechanization'],
      recentActivity: language === 'hi' ? 'कल सक्रिय' : 'Active yesterday'
    }
  ];

  const communityPosts: Post[] = [
    {
      id: '1',
      farmer: nearbyFarmers[0],
      content: language === 'hi' 
        ? 'नीम के तेल का छिड़काव करने से भूरे प्लांटहॉपर की समस्या 80% तक कम हो गई। 10ml प्रति लीटर पानी का अनुपात बेहतरीन रहा।'
        : 'Neem oil spray reduced brown planthopper problem by 80%. 10ml per liter water ratio worked excellently.',
      timestamp: '2 hours ago',
      likes: 24,
      comments: 8,
      category: 'tip'
    },
    {
      id: '2',
      farmer: nearbyFarmers[1],
      content: language === 'hi'
        ? 'इस साल प्याज की फसल में कमाल का मुनाफा हुआ! ड्रिप सिंचाई और मल्चिंग से 40% पानी की बचत भी हुई।'
        : 'Amazing profits this year from onion crop! Drip irrigation and mulching saved 40% water too.',
      timestamp: '5 hours ago',
      likes: 32,
      comments: 12,
      category: 'success'
    },
    {
      id: '3',
      farmer: nearbyFarmers[2],
      content: language === 'hi'
        ? 'कपास में सफेद मक्खी की समस्या बढ़ रही है। कोई प्रभावी जैविक समाधान सुझा सकते हैं?'
        : 'White fly problem increasing in cotton. Can anyone suggest effective organic solutions?',
      timestamp: '1 day ago',
      likes: 15,
      comments: 18,
      category: 'question'
    }
  ];

  const farmerGroups = [
    {
      id: '1',
      name: language === 'hi' ? 'जैविक कृषि समूह' : 'Organic Farming Group',
      description: language === 'hi' ? 'रासायनिक मुक्त खेती पर चर्चा' : 'Discussion on chemical-free farming',
      members: 1250,
      recentActivity: language === 'hi' ? '15 मिनट पहले' : '15 min ago',
      category: 'organic'
    },
    {
      id: '2',
      name: language === 'hi' ? 'धान उत्पादक संघ' : 'Rice Producers Association',
      description: language === 'hi' ? 'धान की खेती और बाजार की जानकारी' : 'Rice cultivation and market information',
      members: 2100,
      recentActivity: language === 'hi' ? '1 घंटा पहले' : '1 hour ago',
      category: 'crop'
    },
    {
      id: '3',
      name: language === 'hi' ? 'महिला किसान मंच' : 'Women Farmers Forum',
      description: language === 'hi' ? 'महिला किसानों के लिए विशेष मंच' : 'Special platform for women farmers',
      members: 850,
      recentActivity: language === 'hi' ? '30 मिनट पहले' : '30 min ago',
      category: 'women'
    }
  ];

  const filteredFarmers = nearbyFarmers.filter(farmer =>
    farmer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    farmer.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    farmer.crops.some(crop => crop.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'tip': return <Sprout className="h-4 w-4 text-green-600" />;
      case 'question': return <MessageCircle className="h-4 w-4 text-blue-600" />;
      case 'success': return <Award className="h-4 w-4 text-yellow-600" />;
      case 'alert': return <MapPin className="h-4 w-4 text-red-600" />;
      default: return <MessageCircle className="h-4 w-4 text-gray-600" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'tip': return 'bg-green-100 text-green-800';
      case 'question': return 'bg-blue-100 text-blue-800';
      case 'success': return 'bg-yellow-100 text-yellow-800';
      case 'alert': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">{t.title}</h2>
        <p className="text-gray-600">{t.subtitle}</p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        <button
          onClick={() => setSelectedTab('network')}
          className={`flex-1 py-2 px-4 rounded-md transition-colors ${
            selectedTab === 'network' 
              ? 'bg-white text-blue-600 shadow-sm' 
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Users className="h-4 w-4 inline mr-2" />
          {t.nearbyFarmers}
        </button>
        <button
          onClick={() => setSelectedTab('posts')}
          className={`flex-1 py-2 px-4 rounded-md transition-colors ${
            selectedTab === 'posts' 
              ? 'bg-white text-blue-600 shadow-sm' 
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <MessageCircle className="h-4 w-4 inline mr-2" />
          {t.communityPosts}
        </button>
        <button
          onClick={() => setSelectedTab('groups')}
          className={`flex-1 py-2 px-4 rounded-md transition-colors ${
            selectedTab === 'groups' 
              ? 'bg-white text-blue-600 shadow-sm' 
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Users className="h-4 w-4 inline mr-2" />
          {t.groups}
        </button>
      </div>

      {/* Content based on selected tab */}
      {selectedTab === 'network' && (
        <div>
          {/* Search */}
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex space-x-4">
                <div className="relative flex-1">
                  <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
                  <Input
                    placeholder={t.searchFarmers}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Farmers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFarmers.map((farmer) => (
              <Card key={farmer.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4 mb-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={farmer.avatar} />
                      <AvatarFallback>{farmer.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold">{farmer.name}</h3>
                        {farmer.verified && (
                          <CheckCircle className="h-4 w-4 text-blue-600" />
                        )}
                      </div>
                      <div className="flex items-center space-x-1 text-sm text-gray-600">
                        <MapPin className="h-3 w-3" />
                        <span>{farmer.location}</span>
                      </div>
                      <div className="text-sm text-gray-500">
                        {farmer.distance} {t.distance}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{t.experience}:</span>
                      <span className="font-medium">{farmer.experience} {t.years}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{t.rating}:</span>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="font-medium">{farmer.rating}</span>
                      </div>
                    </div>

                    <div>
                      <span className="text-sm text-gray-600 block mb-1">Crops:</span>
                      <div className="flex flex-wrap gap-1">
                        {farmer.crops.map((crop, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {crop}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <span className="text-sm text-gray-600 block mb-1">Specialties:</span>
                      <div className="flex flex-wrap gap-1">
                        {farmer.specialties.map((specialty, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="text-xs text-gray-500">
                      {farmer.recentActivity}
                    </div>
                  </div>

                  <div className="flex space-x-2 mt-4">
                    <Button size="sm" className="flex-1">
                      <Plus className="h-4 w-4 mr-1" />
                      {t.connect}
                    </Button>
                    <Button variant="outline" size="sm">
                      <MessageCircle className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Phone className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {selectedTab === 'posts' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Create Post */}
            <Card>
              <CardContent className="p-4">
                <Textarea
                  placeholder={t.writePost}
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  className="mb-4"
                />
                <div className="flex justify-between items-center">
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Sprout className="h-4 w-4 mr-1" />
                      {t.postTip}
                    </Button>
                    <Button variant="outline" size="sm">
                      <MessageCircle className="h-4 w-4 mr-1" />
                      {t.askQuestion}
                    </Button>
                  </div>
                  <Button size="sm">
                    Share
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Posts Feed */}
            <div className="space-y-4">
              {communityPosts.map((post) => (
                <Card key={post.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4 mb-4">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback>{post.farmer.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-semibold">{post.farmer.name}</h4>
                          {post.farmer.verified && (
                            <CheckCircle className="h-4 w-4 text-blue-600" />
                          )}
                          <Badge className={getCategoryColor(post.category)} size="sm">
                            {getCategoryIcon(post.category)}
                            <span className="ml-1 capitalize">{post.category}</span>
                          </Badge>
                        </div>
                        <div className="text-sm text-gray-600 flex items-center space-x-2">
                          <MapPin className="h-3 w-3" />
                          <span>{post.farmer.location}</span>
                          <span>•</span>
                          <span>{post.timestamp}</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>

                    <p className="text-gray-800 mb-4">{post.content}</p>

                    {post.image && (
                      <div className="mb-4">
                        <ImageWithFallback
                          src={post.image}
                          alt="Post image"
                          className="w-full h-48 object-cover rounded-lg"
                        />
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="flex space-x-4">
                        <Button variant="ghost" size="sm">
                          <Heart className="h-4 w-4 mr-1" />
                          {post.likes} {t.likes}
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MessageCircle className="h-4 w-4 mr-1" />
                          {post.comments} {t.comments}
                        </Button>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Share2 className="h-4 w-4 mr-1" />
                        {t.share}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Community Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <Users className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">{t.members}</p>
                  <p className="text-2xl font-bold">4,250</p>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <MessageCircle className="h-6 w-6 text-green-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">{t.posts}</p>
                  <p className="text-2xl font-bold">8,640</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {selectedTab === 'groups' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {farmerGroups.map((group) => (
            <Card key={group.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="mb-4">
                  <h3 className="font-semibold text-lg mb-2">{group.name}</h3>
                  <p className="text-gray-600 text-sm">{group.description}</p>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{t.members}:</span>
                    <span className="font-medium">{group.members.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{t.recentActivity}:</span>
                    <span className="text-sm text-gray-500">{group.recentActivity}</span>
                  </div>
                </div>

                <Button className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  {t.joinGroup}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}