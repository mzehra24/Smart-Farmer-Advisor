import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Alert, AlertDescription } from "./ui/alert";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { 
  Building2, 
  Users, 
  FileText, 
  Phone, 
  Mail, 
  ExternalLink,
  MapPin,
  Calendar,
  Banknote,
  Leaf,
  Tractor,
  Droplets
} from 'lucide-react';

interface GovernmentNGOsProps {
  language: string;
}

export function GovernmentNGOs({ language }: GovernmentNGOsProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [applicationForm, setApplicationForm] = useState({
    farmerName: '',
    landSize: '',
    cropType: '',
    scheme: '',
    reason: '',
    documents: []
  });

  const translations = {
    'en': {
      title: 'Government & NGO Resources',
      subtitle: 'Access government schemes, subsidies, and NGO support programs',
      schemes: 'Government Schemes',
      ngos: 'NGO Programs',
      subsidies: 'Subsidies Available',
      apply: 'Apply Now',
      contact: 'Contact',
      eligibility: 'Eligibility Criteria',
      documents: 'Required Documents',
      applicationForm: 'Application Form',
      farmerName: 'Farmer Name',
      landSize: 'Land Size (acres)',
      cropType: 'Primary Crop',
      reason: 'Reason for Application',
      submit: 'Submit Application',
      status: 'Application Status',
      notifications: 'Notifications'
    },
    'hi': {
      title: 'सरकार और NGO संसाधन',
      subtitle: 'सरकारी योजनाओं, सब्सिडी और NGO सहायता कार्यक्रमों का उपयोग करें',
      schemes: 'सरकारी योजनाएं',
      ngos: 'NGO कार्यक्रम',
      subsidies: 'उपलब्ध सब्सिडी',
      apply: 'अभी आवेदन करें',
      contact: 'संपर्क',
      eligibility: 'पात्रता मानदंड',
      documents: 'आवश्यक दस्तावेज',
      applicationForm: 'आवेदन फॉर्म',
      farmerName: 'किसान का नाम',
      landSize: 'भूमि का आकार (एकड़)',
      cropType: 'मुख्य फसल',
      reason: 'आवेदन का कारण',
      submit: 'आवेदन जमा करें',
      status: 'आवेदन की स्थिति',
      notifications: 'सूचनाएं'
    }
  };

  const t = translations[language as keyof typeof translations] || translations.en;

  const governmentSchemes = [
    {
      id: 1,
      name: 'PM-KISAN Samman Nidhi',
      description: 'Direct income support to farmers',
      amount: '₹6,000/year',
      category: 'subsidy',
      eligibility: 'Small & marginal farmers',
      documents: ['Aadhaar', 'Land records', 'Bank account'],
      contact: '+91-11-23381092',
      website: 'https://pmkisan.gov.in'
    },
    {
      id: 2,
      name: 'Soil Health Card Scheme',
      description: 'Free soil testing and nutrient recommendations',
      amount: 'Free',
      category: 'service',
      eligibility: 'All farmers',
      documents: ['Land records', 'Aadhaar'],
      contact: '+91-11-23383370',
      website: 'https://soilhealth.dac.gov.in'
    },
    {
      id: 3,
      name: 'Pradhan Mantri Fasal Bima Yojana',
      description: 'Crop insurance scheme',
      amount: 'Premium: 2% (Kharif), 1.5% (Rabi)',
      category: 'insurance',
      eligibility: 'All farmers',
      documents: ['Land records', 'Aadhaar', 'Bank account'],
      contact: '+91-11-20865260',
      website: 'https://pmfby.gov.in'
    },
    {
      id: 4,
      name: 'Kisan Credit Card',
      description: 'Easy access to agricultural credit',
      amount: 'Up to ₹3 lakh',
      category: 'credit',
      eligibility: 'Landowner farmers',
      documents: ['Land records', 'Aadhaar', 'Income certificate'],
      contact: '+91-11-23742035',
      website: 'https://kcc.gov.in'
    }
  ];

  const ngoPrograms = [
    {
      id: 1,
      name: 'Digital Green - Video Extension',
      description: 'Community video-based agricultural extension',
      focus: 'Digital literacy',
      location: 'Pan India',
      contact: '+91-80-43434343',
      website: 'https://digitalgreen.org',
      services: ['Video training', 'Digital literacy', 'Market linkage']
    },
    {
      id: 2,
      name: 'PRADAN - Livelihood Enhancement',
      description: 'Sustainable livelihood programs for rural communities',
      focus: 'Livelihood',
      location: '10 states',
      contact: '+91-11-29956110',
      website: 'https://pradan.net',
      services: ['SHG formation', 'Skill development', 'Market access']
    },
    {
      id: 3,
      name: 'BAIF Development Research Foundation',
      description: 'Rural development through science and technology',
      focus: 'Technology',
      location: 'Maharashtra, Gujarat',
      contact: '+91-20-25231661',
      website: 'https://baif.org.in',
      services: ['Organic farming', 'Livestock development', 'Water conservation']
    }
  ];

  const applications = [
    {
      id: 'APP001',
      scheme: 'PM-KISAN',
      status: 'Approved',
      date: '2024-01-15',
      amount: '₹2,000'
    },
    {
      id: 'APP002',
      scheme: 'Soil Health Card',
      status: 'In Progress',
      date: '2024-01-20',
      amount: 'Free'
    }
  ];

  const handleApplicationSubmit = () => {
    // Handle form submission
    alert('Application submitted successfully!');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{t.title}</h1>
        <p className="text-gray-600">{t.subtitle}</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 p-2 rounded-lg">
                <Building2 className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Active Schemes</p>
                <p className="text-xl font-bold">24</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="bg-green-100 p-2 rounded-lg">
                <Users className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">NGO Partners</p>
                <p className="text-xl font-bold">18</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="bg-yellow-100 p-2 rounded-lg">
                <Banknote className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Subsidies</p>
                <p className="text-xl font-bold">₹45L</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="bg-purple-100 p-2 rounded-lg">
                <FileText className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Applications</p>
                <p className="text-xl font-bold">156</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Government Schemes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Building2 className="h-5 w-5" />
              <span>{t.schemes}</span>
            </CardTitle>
            <CardDescription>Available government support programs</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {governmentSchemes.map((scheme) => (
              <div key={scheme.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{scheme.name}</h3>
                    <p className="text-sm text-gray-600">{scheme.description}</p>
                  </div>
                  <Badge variant="secondary">{scheme.amount}</Badge>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">{scheme.eligibility}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">{scheme.contact}</span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button size="sm" className="flex-1">
                    {t.apply}
                  </Button>
                  <Button variant="outline" size="sm">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* NGO Programs */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>{t.ngos}</span>
            </CardTitle>
            <CardDescription>Non-governmental organization support</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {ngoPrograms.map((ngo) => (
              <div key={ngo.id} className="border rounded-lg p-4 space-y-3">
                <div>
                  <h3 className="font-semibold">{ngo.name}</h3>
                  <p className="text-sm text-gray-600">{ngo.description}</p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">{ngo.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">{ngo.contact}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1">
                  {ngo.services.map((service, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {service}
                    </Badge>
                  ))}
                </div>

                <Button size="sm" variant="outline" className="w-full">
                  {t.contact}
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Application Form */}
      <Card>
        <CardHeader>
          <CardTitle>{t.applicationForm}</CardTitle>
          <CardDescription>Apply for government schemes and programs</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">{t.farmerName}</label>
              <Input 
                placeholder="Enter your full name"
                value={applicationForm.farmerName}
                onChange={(e) => setApplicationForm({...applicationForm, farmerName: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">{t.landSize}</label>
              <Input 
                placeholder="e.g., 2.5"
                value={applicationForm.landSize}
                onChange={(e) => setApplicationForm({...applicationForm, landSize: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">{t.cropType}</label>
              <Select value={applicationForm.cropType} onValueChange={(value) => setApplicationForm({...applicationForm, cropType: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select crop type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rice">Rice</SelectItem>
                  <SelectItem value="wheat">Wheat</SelectItem>
                  <SelectItem value="cotton">Cotton</SelectItem>
                  <SelectItem value="sugarcane">Sugarcane</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Scheme</label>
              <Select value={applicationForm.scheme} onValueChange={(value) => setApplicationForm({...applicationForm, scheme: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select scheme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pm-kisan">PM-KISAN</SelectItem>
                  <SelectItem value="soil-health">Soil Health Card</SelectItem>
                  <SelectItem value="crop-insurance">Crop Insurance</SelectItem>
                  <SelectItem value="kcc">Kisan Credit Card</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">{t.reason}</label>
            <Textarea 
              placeholder="Explain why you are applying for this scheme"
              value={applicationForm.reason}
              onChange={(e) => setApplicationForm({...applicationForm, reason: e.target.value})}
            />
          </div>

          <Button onClick={handleApplicationSubmit} className="w-full">
            {t.submit}
          </Button>
        </CardContent>
      </Card>

      {/* Application Status */}
      <Card>
        <CardHeader>
          <CardTitle>{t.status}</CardTitle>
          <CardDescription>Track your submitted applications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {applications.map((app) => (
              <div key={app.id} className="flex justify-between items-center p-3 border rounded-lg">
                <div>
                  <p className="font-semibold">{app.scheme}</p>
                  <p className="text-sm text-gray-600">Application ID: {app.id}</p>
                  <p className="text-sm text-gray-600">Applied: {app.date}</p>
                </div>
                <div className="text-right">
                  <Badge 
                    variant={app.status === 'Approved' ? 'default' : 'secondary'}
                    className={app.status === 'Approved' ? 'bg-green-100 text-green-800' : ''}
                  >
                    {app.status}
                  </Badge>
                  <p className="text-sm font-semibold">{app.amount}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}