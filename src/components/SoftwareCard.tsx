import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Download, Star, Calendar, Shield, ExternalLink } from 'lucide-react';

interface Software {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  version: string;
  size: string;
  rating: number;
  downloads: string;
  releaseDate: string;
  isVerified: boolean;
  downloadLinks: string[];
}

interface SoftwareCardProps {
  software: Software;
}

const SoftwareCard: React.FC<SoftwareCardProps> = ({ software }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white dark:bg-dark-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
    >
      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src={software.image}
          alt={software.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Verified Badge */}
        {software.isVerified && (
          <div className="absolute top-3 right-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
            <Shield className="w-3 h-3" />
            <span>Verified</span>
          </div>
        )}

        {/* Category Badge */}
        <div className="absolute top-3 left-3 bg-primary-600 text-white px-2 py-1 rounded-full text-xs font-medium">
          {software.category}
        </div>

        {/* Quick Download Button */}
        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Link
            to={`/software/${software.id}`}
            className="bg-white/90 hover:bg-white text-gray-900 p-2 rounded-full shadow-lg transition-colors duration-200"
          >
            <ExternalLink className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2 flex-1">
            {software.title}
          </h3>
          <div className="flex items-center space-x-1 ml-2">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {software.rating}
            </span>
          </div>
        </div>

        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
          {software.description}
        </p>

        {/* Software Info */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500 dark:text-gray-400">Version:</span>
            <span className="text-gray-900 dark:text-white font-medium">
              {software.version}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500 dark:text-gray-400">Size:</span>
            <span className="text-gray-900 dark:text-white font-medium">
              {software.size}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500 dark:text-gray-400">Downloads:</span>
            <span className="text-gray-900 dark:text-white font-medium">
              {software.downloads}
            </span>
          </div>
        </div>

        {/* Release Date */}
        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-4">
          <Calendar className="w-3 h-3 mr-1" />
          <span>Updated {software.releaseDate}</span>
        </div>

        {/* Action Button */}
        <Link
          to={`/software/${software.id}`}
          className="w-full bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 group"
        >
          <Download className="w-4 h-4 group-hover:animate-bounce" />
          <span>Download Now</span>
        </Link>
      </div>
    </motion.div>
  );
};

export default SoftwareCard;