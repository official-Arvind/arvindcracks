import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap, Mail, Globe, Shield, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    'Quick Links': [
      { name: 'Home', path: '/' },
      { name: 'Software', path: '/software' },
      { name: 'About Us', path: '/about' },
      { name: 'Contact', path: '/contact' },
    ],
    'Categories': [
      { name: 'System Tools', path: '/software?category=system' },
      { name: 'Multimedia', path: '/software?category=multimedia' },
      { name: 'Graphics', path: '/software?category=graphics' },
      { name: 'Internet', path: '/software?category=internet' },
    ],
    'Support': [
      { name: 'FAQ', path: '/faq' },
      { name: 'Privacy Policy', path: '/privacy' },
      { name: 'Terms of Service', path: '/terms' },
      { name: 'DMCA', path: '/dmca' },
    ],
  };

  return (
    <footer className="bg-white dark:bg-dark-900 border-t border-gray-200 dark:border-dark-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-primary-600 to-primary-400 rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold gradient-text">Arvind Ji Cracks</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">Premium Software Hub</p>
              </div>
            </Link>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
              Your trusted source for premium software downloads, cracks, and portable applications. 
              We provide the latest software updates daily.
            </p>
            <div className="flex items-center space-x-4">
              <a
                href="mailto:contact@arvindjicracks.com"
                className="p-2 bg-gray-100 dark:bg-dark-800 rounded-lg hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors duration-200"
                aria-label="Email"
              >
                <Mail className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              </a>
              <a
                href="https://lrepacks.net"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-100 dark:bg-dark-800 rounded-lg hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors duration-200"
                aria-label="Source Website"
              >
                <Globe className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              </a>
            </div>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4">
                {title}
              </h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Copyright Notice */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-dark-700">
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-6">
            <div className="flex items-start space-x-3">
              <Shield className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
              <div className="text-sm">
                <p className="text-yellow-800 dark:text-yellow-200 font-medium mb-1">
                  Copyright Notice & Attribution
                </p>
                <p className="text-yellow-700 dark:text-yellow-300">
                  All software links, images, and descriptions are sourced from{' '}
                  <a
                    href="https://lrepacks.net"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium underline hover:no-underline"
                  >
                    https://lrepacks.net
                  </a>
                  . We acknowledge and respect their original work. This website serves as a curated 
                  collection with proper attribution to the original source.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              © {currentYear} Arvind Ji Cracks. All rights reserved.
            </p>
            <div className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-400">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500" />
              <span>for software enthusiasts</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;