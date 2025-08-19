import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Download, 
  Star, 
  Calendar, 
  Shield, 
  ExternalLink,
  ArrowLeft,
  Share2,
  Heart,
  MessageCircle,
  ThumbsUp,
  ThumbsDown,
  AlertTriangle
} from 'lucide-react';
import { mockSoftware } from '../data/mockData';

const SoftwareDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [software, setSoftware] = useState(mockSoftware.find(s => s.id === id));
  const [activeTab, setActiveTab] = useState('description');
  const [isFavorite, setIsFavorite] = useState(false);

  if (!software) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Software Not Found
          </h2>
          <Link to="/software" className="btn-primary">
            Back to Software
          </Link>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'description', label: 'Description' },
    { id: 'requirements', label: 'System Requirements' },
    { id: 'changelog', label: 'Changelog' },
    { id: 'reviews', label: 'Reviews' },
  ];

  const downloadLinks = [
    { name: 'Primary Mirror', url: '#', speed: 'High Speed' },
    { name: 'Mirror 2', url: '#', speed: 'Medium Speed' },
    { name: 'Mirror 3', url: '#', speed: 'Standard Speed' },
  ];

  const systemRequirements = {
    minimum: {
      os: 'Windows 10 (64-bit)',
      processor: 'Intel Core i3 or AMD equivalent',
      memory: '4 GB RAM',
      graphics: 'DirectX 11 compatible',
      storage: '2 GB available space',
    },
    recommended: {
      os: 'Windows 11 (64-bit)',
      processor: 'Intel Core i5 or AMD equivalent',
      memory: '8 GB RAM',
      graphics: 'Dedicated graphics card',
      storage: '4 GB available space',
    },
  };

  const reviews = [
    {
      id: 1,
      user: 'TechUser123',
      rating: 5,
      comment: 'Excellent software! Works perfectly and installation was smooth.',
      date: '2 days ago',
      helpful: 12,
    },
    {
      id: 2,
      user: 'SoftwareFan',
      rating: 4,
      comment: 'Good quality repack. No issues so far. Highly recommended.',
      date: '1 week ago',
      helpful: 8,
    },
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Link
            to="/software"
            className="inline-flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Software</span>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-dark-800 rounded-xl shadow-lg p-6 mb-8"
            >
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-48 flex-shrink-0">
                  <img
                    src={software.image}
                    alt={software.title}
                    className="w-full h-48 md:h-32 object-cover rounded-lg"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        {software.title}
                      </h1>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                        <span className="bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 px-2 py-1 rounded">
                          {software.category}
                        </span>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span>{software.rating}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Download className="w-4 h-4" />
                          <span>{software.downloads}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setIsFavorite(!isFavorite)}
                        className={`p-2 rounded-lg transition-colors duration-200 ${
                          isFavorite
                            ? 'bg-red-100 dark:bg-red-900/30 text-red-600'
                            : 'bg-gray-100 dark:bg-dark-700 text-gray-600 dark:text-gray-400 hover:text-red-600'
                        }`}
                      >
                        <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
                      </button>
                      <button className="p-2 bg-gray-100 dark:bg-dark-700 text-gray-600 dark:text-gray-400 rounded-lg hover:text-primary-600 transition-colors duration-200">
                        <Share2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">Version:</span>
                      <p className="font-medium text-gray-900 dark:text-white">{software.version}</p>
                    </div>
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">Size:</span>
                      <p className="font-medium text-gray-900 dark:text-white">{software.size}</p>
                    </div>
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">Updated:</span>
                      <p className="font-medium text-gray-900 dark:text-white">{software.releaseDate}</p>
                    </div>
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">Status:</span>
                      <div className="flex items-center space-x-1">
                        <Shield className="w-3 h-3 text-green-500" />
                        <span className="font-medium text-green-600 dark:text-green-400">Verified</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-dark-800 rounded-xl shadow-lg overflow-hidden"
            >
              <div className="border-b border-gray-200 dark:border-dark-700">
                <nav className="flex space-x-8 px-6">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                        activeTab === tab.id
                          ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                          : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="p-6">
                {activeTab === 'description' && (
                  <div className="prose dark:prose-invert max-w-none">
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {software.description}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed mt-4">
                      This is a premium software repack that includes all the necessary files and 
                      activation tools. The software has been tested and verified to work on all 
                      supported operating systems. Installation is straightforward with our 
                      step-by-step guide included in the package.
                    </p>
                  </div>
                )}

                {activeTab === 'requirements' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                        Minimum Requirements
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {Object.entries(systemRequirements.minimum).map(([key, value]) => (
                          <div key={key} className="flex justify-between">
                            <span className="text-gray-500 dark:text-gray-400 capitalize">
                              {key.replace(/([A-Z])/g, ' $1')}:
                            </span>
                            <span className="text-gray-900 dark:text-white font-medium">
                              {value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                        Recommended Requirements
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {Object.entries(systemRequirements.recommended).map(([key, value]) => (
                          <div key={key} className="flex justify-between">
                            <span className="text-gray-500 dark:text-gray-400 capitalize">
                              {key.replace(/([A-Z])/g, ' $1')}:
                            </span>
                            <span className="text-gray-900 dark:text-white font-medium">
                              {value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'changelog' && (
                  <div className="space-y-4">
                    <div className="border-l-4 border-primary-500 pl-4">
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        Version {software.version}
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                        Released {software.releaseDate}
                      </p>
                      <ul className="text-gray-600 dark:text-gray-300 space-y-1">
                        <li>• Fixed critical security vulnerabilities</li>
                        <li>• Improved performance and stability</li>
                        <li>• Added new features and enhancements</li>
                        <li>• Updated user interface elements</li>
                      </ul>
                    </div>
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div className="space-y-6">
                    {reviews.map((review) => (
                      <div key={review.id} className="border-b border-gray-200 dark:border-dark-700 pb-6 last:border-b-0">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-white">
                              {review.user}
                            </h4>
                            <div className="flex items-center space-x-2 mt-1">
                              <div className="flex items-center">
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-4 h-4 ${
                                      i < review.rating
                                        ? 'text-yellow-400 fill-current'
                                        : 'text-gray-300 dark:text-gray-600'
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-sm text-gray-500 dark:text-gray-400">
                                {review.date}
                              </span>
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 mb-3">
                          {review.comment}
                        </p>
                        <div className="flex items-center space-x-4">
                          <button className="flex items-center space-x-1 text-sm text-gray-500 hover:text-green-600 transition-colors duration-200">
                            <ThumbsUp className="w-4 h-4" />
                            <span>Helpful ({review.helpful})</span>
                          </button>
                          <button className="flex items-center space-x-1 text-sm text-gray-500 hover:text-red-600 transition-colors duration-200">
                            <ThumbsDown className="w-4 h-4" />
                            <span>Not Helpful</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Download Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-dark-800 rounded-xl shadow-lg p-6 mb-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Download Links
              </h3>
              <div className="space-y-3">
                {downloadLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    className="block p-3 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 text-white rounded-lg transition-all duration-200 transform hover:scale-105"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Download className="w-4 h-4" />
                        <span className="font-medium">{link.name}</span>
                      </div>
                      <ExternalLink className="w-4 h-4" />
                    </div>
                    <div className="text-xs text-white/80 mt-1">
                      {link.speed}
                    </div>
                  </a>
                ))}
              </div>

              <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                <div className="flex items-start space-x-2">
                  <AlertTriangle className="w-4 h-4 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-yellow-800 dark:text-yellow-200">
                    <p className="font-medium mb-1">Important Notice</p>
                    <p>Disable antivirus temporarily during installation. All files are verified and safe.</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Software Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white dark:bg-dark-800 rounded-xl shadow-lg p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Software Information
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Category:</span>
                  <span className="text-gray-900 dark:text-white font-medium">
                    {software.category}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Version:</span>
                  <span className="text-gray-900 dark:text-white font-medium">
                    {software.version}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">File Size:</span>
                  <span className="text-gray-900 dark:text-white font-medium">
                    {software.size}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Downloads:</span>
                  <span className="text-gray-900 dark:text-white font-medium">
                    {software.downloads}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Rating:</span>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-gray-900 dark:text-white font-medium">
                      {software.rating}/5
                    </span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Last Updated:</span>
                  <span className="text-gray-900 dark:text-white font-medium">
                    {software.releaseDate}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SoftwareDetail;