import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Progress } from "./ui/progress";
import { 
  Shield, 
  QrCode, 
  Truck, 
  Store, 
  Leaf, 
  Award, 
  Clock, 
  MapPin,
  Coins,
  Users,
  FileText,
  CheckCircle,
  AlertTriangle,
  Search,
  Camera,
  Link,
  ArrowRight
} from 'lucide-react';

interface TraceabilityProps {
  language: string;
}

interface TraceRecord {
  id: string;
  stage: string;
  location: string;
  timestamp: string;
  actor: string;
  details: string;
  verified: boolean;
  documents: string[];
}

interface Product {
  id: string;
  name: string;
  variety: string;
  quantity: number;
  unit: string;
  farmer: string;
  farm: string;
  harvestDate: string;
  quality: 'A' | 'B' | 'C';
  organic: boolean;
  traceRecords: TraceRecord[];
  currentStage: string;
  estimatedDelivery: string;
}

interface SmartContract {
  id: string;
  buyer: string;
  seller: string;
  product: string;
  quantity: number;
  price: number;
  conditions: string[];
  status: 'pending' | 'active' | 'completed' | 'disputed';
  milestones: Array<{
    title: string;
    completed: boolean;
    paymentPercentage: number;
  }>;
}

export function Traceability({ language }: TraceabilityProps) {
  const [selectedTab, setSelectedTab] = useState<'track' | 'contracts' | 'marketplace'>('track');
  const [trackingId, setTrackingId] = useState('');
  const [trackedProduct, setTrackedProduct] = useState<Product | null>(null);
  const [contracts, setContracts] = useState<SmartContract[]>([]);

  const translations = {
    'en': {
      title: 'Blockchain Traceability',
      subtitle: 'Farm-to-market transparency with smart contracts',
      trackProduct: 'Track Product',
      smartContracts: 'Smart Contracts',
      marketplace: 'Decentralized Marketplace',
      enterTrackingId: 'Enter tracking ID or scan QR code',
      track: 'Track',
      scanQR: 'Scan QR',
      generateQR: 'Generate QR',
      productJourney: 'Product Journey',
      farmDetails: 'Farm Details',
      qualityGrade: 'Quality Grade',
      organic: 'Organic',
      conventional: 'Conventional',
      verified: 'Verified',
      pending: 'Pending',
      stage: 'Stage',
      location: 'Location',
      timestamp: 'Timestamp',
      actor: 'Actor',
      details: 'Details',
      documents: 'Documents',
      contractDetails: 'Contract Details',
      buyer: 'Buyer',
      seller: 'Seller',
      quantity: 'Quantity',
      totalValue: 'Total Value',
      conditions: 'Conditions',
      milestones: 'Milestones',
      completed: 'Completed',
      active: 'Active',
      disputed: 'Disputed',
      createContract: 'Create Contract',
      viewMarketplace: 'View Marketplace',
      paymentReleased: 'Payment Released',
      deliveryConfirmed: 'Delivery Confirmed',
      qualityApproved: 'Quality Approved'
    },
    'hi': {
      title: 'ब्लॉकचेन ट्रेसेबिलिटी',
      subtitle: 'स्मार्ट कॉन्ट्रैक्ट के साथ खेत से बाजार तक पारदर्शिता',
      trackProduct: 'उत्पाद ट्रैक करें',
      smartContracts: 'स्मार्ट कॉन्ट्रैक्ट',
      marketplace: 'विकेंद्रीकृत बाजार',
      enterTrackingId: 'ट्रैकिंग ID दर्ज करें या QR कोड स्कैन करें',
      track: 'ट्रैक करें',
      scanQR: 'QR स्कैन करें',
      generateQR: 'QR जेनरेट करें',
      productJourney: 'उत्पाद यात्रा',
      farmDetails: 'खेत विवरण',
      qualityGrade: 'गुणवत्ता ग्रेड',
      organic: 'जैविक',
      conventional: 'परंपरागत',
      verified: 'सत्यापित',
      pending: 'लंबित',
      stage: 'चरण',
      location: 'स्थान',
      timestamp: 'समय',
      actor: 'कार्यकर्ता',
      details: 'विवरण',
      documents: 'दस्तावेज',
      contractDetails: 'कॉन्ट्रैक्ट विवरण',
      buyer: 'खरीदार',
      seller: 'विक्रेता',
      quantity: 'मात्रा',
      totalValue: 'कुल मूल्य',
      conditions: 'शर्तें',
      milestones: 'मील के पत्थर',
      completed: 'पूर्ण',
      active: 'सक्रिय',
      disputed: 'विवादित',
      createContract: 'कॉन्ट्रैक्ट बनाएं',
      viewMarketplace: 'बाजार देखें',
      paymentReleased: 'भुगतान जारी',
      deliveryConfirmed: 'डिलीवरी पुष्टि',
      qualityApproved: 'गुणवत्ता अनुमोदित'
    }
  };

  const t = translations[language as keyof typeof translations] || translations['en'];

  const mockProduct: Product = {
    id: 'TRC001',
    name: language === 'hi' ? 'बासमती चावल' : 'Basmati Rice',
    variety: 'Pusa Basmati 1121',
    quantity: 500,
    unit: 'kg',
    farmer: language === 'hi' ? 'राज कुमार शर्मा' : 'Raj Kumar Sharma',
    farm: language === 'hi' ? 'श्री राम फार्म, पुणे' : 'Shri Ram Farm, Pune',
    harvestDate: '2024-01-10',
    quality: 'A',
    organic: true,
    currentStage: language === 'hi' ? 'परिवहन में' : 'In Transit',
    estimatedDelivery: '2024-01-20',
    traceRecords: [
      {
        id: '1',
        stage: language === 'hi' ? 'रोपाई' : 'Planting',
        location: language === 'hi' ? 'खेत #1, पुणे' : 'Field #1, Pune',
        timestamp: '2023-06-15 08:00',
        actor: language === 'hi' ? 'राज कुमार शर्मा' : 'Raj Kumar Sharma',
        details: language === 'hi' ? 'जैविक बीज रोपे गए' : 'Organic seeds planted',
        verified: true,
        documents: ['planting_certificate.pdf']
      },
      {
        id: '2',
        stage: language === 'hi' ? 'उगाना' : 'Growing',
        location: language === 'hi' ? 'खेत #1, पुणे' : 'Field #1, Pune',
        timestamp: '2023-08-20 14:30',
        actor: language === 'hi' ? 'कृषि निरीक्षक' : 'Agriculture Inspector',
        details: language === 'hi' ? 'जैविक प्रमाणन निरीक्षण' : 'Organic certification inspection',
        verified: true,
        documents: ['organic_inspection.pdf']
      },
      {
        id: '3',
        stage: language === 'hi' ? 'कटाई' : 'Harvesting',
        location: language === 'hi' ? 'खेत #1, पुणे' : 'Field #1, Pune',
        timestamp: '2024-01-10 09:00',
        actor: language === 'hi' ? 'राज कुमार शर्मा' : 'Raj Kumar Sharma',
        details: language === 'hi' ? 'फसल काटी गई' : 'Crop harvested',
        verified: true,
        documents: ['harvest_report.pdf']
      },
      {
        id: '4',
        stage: language === 'hi' ? 'प्रसंस्करण' : 'Processing',
        location: language === 'hi' ? 'ABC मिल, पुणे' : 'ABC Mill, Pune',
        timestamp: '2024-01-12 11:00',
        actor: language === 'hi' ? 'ABC मिल' : 'ABC Mill',
        details: language === 'hi' ? 'सफाई और पैकेजिंग' : 'Cleaning and packaging',
        verified: true,
        documents: ['processing_report.pdf']
      },
      {
        id: '5',
        stage: language === 'hi' ? 'परिवहन' : 'Transportation',
        location: language === 'hi' ? 'मुंबई की ओर' : 'En route to Mumbai',
        timestamp: '2024-01-15 07:00',
        actor: language === 'hi' ? 'XYZ ट्रांसपोर्ट' : 'XYZ Transport',
        details: language === 'hi' ? 'रेफ्रिजरेटेड ट्रक में परिवहन' : 'Transport in refrigerated truck',
        verified: false,
        documents: ['transport_receipt.pdf']
      }
    ]
  };

  const mockContracts: SmartContract[] = [
    {
      id: 'SC001',
      buyer: language === 'hi' ? 'ABC खाद्य प्रोसेसर' : 'ABC Food Processor',
      seller: language === 'hi' ? 'राज कुमार शर्मा' : 'Raj Kumar Sharma',
      product: language === 'hi' ? 'बासमती चावल 500 किग्रा' : 'Basmati Rice 500kg',
      quantity: 500,
      price: 142500,
      status: 'active',
      conditions: [
        language === 'hi' ? 'जैविक प्रमाणित होना चाहिए' : 'Must be organic certified',
        language === 'hi' ? 'गुणवत्ता ग्रेड A' : 'Quality grade A',
        language === 'hi' ? '15 दिन में डिलीवरी' : 'Delivery within 15 days'
      ],
      milestones: [
        { 
          title: language === 'hi' ? 'ऑर्डर पुष्टि' : 'Order Confirmation', 
          completed: true, 
          paymentPercentage: 20 
        },
        { 
          title: language === 'hi' ? 'गुणवत्ता जांच' : 'Quality Check', 
          completed: true, 
          paymentPercentage: 30 
        },
        { 
          title: language === 'hi' ? 'शिपमेंट' : 'Shipment', 
          completed: false, 
          paymentPercentage: 30 
        },
        { 
          title: language === 'hi' ? 'डिलीवरी' : 'Delivery', 
          completed: false, 
          paymentPercentage: 20 
        }
      ]
    },
    {
      id: 'SC002',
      buyer: language === 'hi' ? 'DEF रिटेलर' : 'DEF Retailer',
      seller: language === 'hi' ? 'सुनीता देवी' : 'Sunita Devi',
      product: language === 'hi' ? 'जैविक प्याज 1000 किग्रा' : 'Organic Onions 1000kg',
      quantity: 1000,
      price: 35000,
      status: 'completed',
      conditions: [
        language === 'hi' ? 'कोई रसायन नहीं' : 'No chemicals used',
        language === 'hi' ? 'ताजा और साफ' : 'Fresh and clean'
      ],
      milestones: [
        { 
          title: language === 'hi' ? 'ऑर्डर पुष्टि' : 'Order Confirmation', 
          completed: true, 
          paymentPercentage: 25 
        },
        { 
          title: language === 'hi' ? 'पैकेजिंग' : 'Packaging', 
          completed: true, 
          paymentPercentage: 25 
        },
        { 
          title: language === 'hi' ? 'डिलीवरी' : 'Delivery', 
          completed: true, 
          paymentPercentage: 50 
        }
      ]
    }
  ];

  useEffect(() => {
    setContracts(mockContracts);
  }, [language]);

  const handleTrack = () => {
    if (trackingId === 'TRC001' || trackingId === 'trc001') {
      setTrackedProduct(mockProduct);
    } else {
      setTrackedProduct(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'active': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'disputed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStageIcon = (stage: string) => {
    const lowerStage = stage.toLowerCase();
    if (lowerStage.includes('plant') || lowerStage.includes('रोप')) return <Leaf className="h-4 w-4" />;
    if (lowerStage.includes('harvest') || lowerStage.includes('कटाई')) return <Award className="h-4 w-4" />;
    if (lowerStage.includes('transport') || lowerStage.includes('परिवहन')) return <Truck className="h-4 w-4" />;
    if (lowerStage.includes('process') || lowerStage.includes('प्रसंस्करण')) return <FileText className="h-4 w-4" />;
    return <Clock className="h-4 w-4" />;
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
          onClick={() => setSelectedTab('track')}
          className={`flex-1 py-2 px-4 rounded-md transition-colors ${
            selectedTab === 'track' 
              ? 'bg-white text-blue-600 shadow-sm' 
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <QrCode className="h-4 w-4 inline mr-2" />
          {t.trackProduct}
        </button>
        <button
          onClick={() => setSelectedTab('contracts')}
          className={`flex-1 py-2 px-4 rounded-md transition-colors ${
            selectedTab === 'contracts' 
              ? 'bg-white text-blue-600 shadow-sm' 
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <FileText className="h-4 w-4 inline mr-2" />
          {t.smartContracts}
        </button>
        <button
          onClick={() => setSelectedTab('marketplace')}
          className={`flex-1 py-2 px-4 rounded-md transition-colors ${
            selectedTab === 'marketplace' 
              ? 'bg-white text-blue-600 shadow-sm' 
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Store className="h-4 w-4 inline mr-2" />
          {t.marketplace}
        </button>
      </div>

      {/* Track Product Tab */}
      {selectedTab === 'track' && (
        <div className="space-y-6">
          {/* Tracking Input */}
          <Card>
            <CardContent className="p-6">
              <div className="flex space-x-4">
                <div className="relative flex-1">
                  <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
                  <Input
                    placeholder={t.enterTrackingId}
                    value={trackingId}
                    onChange={(e) => setTrackingId(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button onClick={handleTrack}>
                  <Search className="h-4 w-4 mr-2" />
                  {t.track}
                </Button>
                <Button variant="outline">
                  <Camera className="h-4 w-4 mr-2" />
                  {t.scanQR}
                </Button>
              </div>
              
              <div className="mt-4 text-sm text-gray-600">
                Try tracking ID: <code className="bg-gray-100 px-2 py-1 rounded">TRC001</code>
              </div>
            </CardContent>
          </Card>

          {/* Tracked Product Details */}
          {trackedProduct && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Product Info */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center space-x-2">
                      <Shield className="h-5 w-5 text-green-600" />
                      <span>{t.farmDetails}</span>
                    </CardTitle>
                    <Button variant="outline" size="sm">
                      <QrCode className="h-4 w-4 mr-1" />
                      {t.generateQR}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-lg">{trackedProduct.name}</h3>
                    <p className="text-gray-600">{trackedProduct.variety}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">{t.quantity}</p>
                      <p className="font-medium">{trackedProduct.quantity} {trackedProduct.unit}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">{t.qualityGrade}</p>
                      <Badge variant="default" className="mt-1">Grade {trackedProduct.quality}</Badge>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600">Farmer</p>
                    <p className="font-medium">{trackedProduct.farmer}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600">Farm</p>
                    <p className="font-medium">{trackedProduct.farm}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Type</span>
                    <Badge variant={trackedProduct.organic ? 'default' : 'secondary'}>
                      {trackedProduct.organic ? t.organic : t.conventional}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Current Status</span>
                    <Badge variant="outline">{trackedProduct.currentStage}</Badge>
                  </div>

                  <div className="pt-4 border-t">
                    <p className="text-sm text-gray-600">Harvest Date</p>
                    <p className="font-medium">{trackedProduct.harvestDate}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Product Journey */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Truck className="h-5 w-5 text-blue-600" />
                      <span>{t.productJourney}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {trackedProduct.traceRecords.map((record, index) => (
                        <div key={record.id} className="relative">
                          {index < trackedProduct.traceRecords.length - 1 && (
                            <div className="absolute left-4 top-8 w-0.5 h-12 bg-gray-300"></div>
                          )}
                          
                          <div className="flex items-start space-x-4">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              record.verified ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
                            }`}>
                              {record.verified ? (
                                <CheckCircle className="h-4 w-4" />
                              ) : (
                                <Clock className="h-4 w-4" />
                              )}
                            </div>

                            <div className="flex-1 bg-gray-50 rounded-lg p-4">
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center space-x-2">
                                  {getStageIcon(record.stage)}
                                  <h4 className="font-semibold">{record.stage}</h4>
                                </div>
                                <Badge variant={record.verified ? 'default' : 'secondary'}>
                                  {record.verified ? t.verified : t.pending}
                                </Badge>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                                <div>
                                  <p className="text-gray-600">{t.location}:</p>
                                  <p className="font-medium">{record.location}</p>
                                </div>
                                <div>
                                  <p className="text-gray-600">{t.timestamp}:</p>
                                  <p className="font-medium">{record.timestamp}</p>
                                </div>
                                <div>
                                  <p className="text-gray-600">{t.actor}:</p>
                                  <p className="font-medium">{record.actor}</p>
                                </div>
                              </div>

                              <div className="mt-3">
                                <p className="text-gray-600 text-sm">{t.details}:</p>
                                <p className="font-medium">{record.details}</p>
                              </div>

                              {record.documents.length > 0 && (
                                <div className="mt-3">
                                  <p className="text-gray-600 text-sm mb-2">{t.documents}:</p>
                                  <div className="flex flex-wrap gap-2">
                                    {record.documents.map((doc, docIndex) => (
                                      <Button key={docIndex} variant="outline" size="sm">
                                        <FileText className="h-3 w-3 mr-1" />
                                        {doc}
                                      </Button>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Smart Contracts Tab */}
      {selectedTab === 'contracts' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Active Smart Contracts</h3>
            <Button>
              <FileText className="h-4 w-4 mr-2" />
              {t.createContract}
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {contracts.map((contract) => (
              <Card key={contract.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{contract.id}</CardTitle>
                    <Badge className={getStatusColor(contract.status)}>
                      {t[contract.status as keyof typeof t]}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">{t.buyer}</p>
                      <p className="font-medium">{contract.buyer}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">{t.seller}</p>
                      <p className="font-medium">{contract.seller}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600">Product</p>
                    <p className="font-medium">{contract.product}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">{t.quantity}</p>
                      <p className="font-medium">{contract.quantity} kg</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">{t.totalValue}</p>
                      <p className="font-medium text-green-600">₹{contract.price.toLocaleString()}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600 mb-2">{t.conditions}</p>
                    <div className="space-y-1">
                      {contract.conditions.map((condition, index) => (
                        <div key={index} className="flex items-center space-x-2 text-sm">
                          <CheckCircle className="h-3 w-3 text-green-600" />
                          <span>{condition}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600 mb-3">{t.milestones}</p>
                    <div className="space-y-2">
                      {contract.milestones.map((milestone, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <div className="flex items-center space-x-2">
                            {milestone.completed ? (
                              <CheckCircle className="h-4 w-4 text-green-600" />
                            ) : (
                              <Clock className="h-4 w-4 text-gray-400" />
                            )}
                            <span className="text-sm font-medium">{milestone.title}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline" size="sm">
                              {milestone.paymentPercentage}%
                            </Badge>
                            {milestone.completed && (
                              <span className="text-xs text-green-600">{t.paymentReleased}</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <FileText className="h-4 w-4 mr-1" />
                        View Details
                      </Button>
                      {contract.status === 'active' && (
                        <Button size="sm" className="flex-1">
                          <ArrowRight className="h-4 w-4 mr-1" />
                          Next Milestone
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Marketplace Tab */}
      {selectedTab === 'marketplace' && (
        <div className="space-y-6">
          <div className="text-center py-12">
            <Store className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Decentralized Marketplace</h3>
            <p className="text-gray-600 mb-6">
              {language === 'hi' 
                ? 'किसानों के लिए सीधे बिक्री का प्लेटफॉर्म - बिचौलियों के बिना'
                : 'Direct selling platform for farmers - without middlemen'
              }
            </p>
            <div className="flex justify-center space-x-4">
              <Button>
                <Users className="h-4 w-4 mr-2" />
                Join as Seller
              </Button>
              <Button variant="outline">
                <Store className="h-4 w-4 mr-2" />
                Browse Products
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="text-center p-6">
              <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h4 className="font-semibold mb-2">
                {language === 'hi' ? 'पारदर्शी लेनदेन' : 'Transparent Transactions'}
              </h4>
              <p className="text-sm text-gray-600">
                {language === 'hi' 
                  ? 'ब्लॉकचेन तकनीक से सुरक्षित और पारदर्शी भुगतान'
                  : 'Secure and transparent payments with blockchain technology'
                }
              </p>
            </Card>

            <Card className="text-center p-6">
              <Coins className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h4 className="font-semibold mb-2">
                {language === 'hi' ? 'बेहतर मूल्य' : 'Better Prices'}
              </h4>
              <p className="text-sm text-gray-600">
                {language === 'hi' 
                  ? 'बिचौलियों को हटाकर किसानों को अधिक लाभ'
                  : 'Higher profits for farmers by eliminating middlemen'
                }
              </p>
            </Card>

            <Card className="text-center p-6">
              <Link className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h4 className="font-semibold mb-2">
                {language === 'hi' ? 'प्रत्यक्ष संपर्क' : 'Direct Connection'}
              </h4>
              <p className="text-sm text-gray-600">
                {language === 'hi' 
                  ? 'किसान और खरीदार के बीच सीधा संपर्क'
                  : 'Direct connection between farmers and buyers'
                }
              </p>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}