import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, Users, Award, Globe, Heart } from 'lucide-react';

const About: React.FC = () => {
  const features = [
    {
      icon: Shield,
      title: 'Verified & Safe',
      description: 'All software is thoroughly tested and verified to be free from malware and viruses.',
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Premium download servers ensure maximum speed and reliability for all downloads.',
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'Built by software enthusiasts for the community with regular updates and feedback.',
    },
    {
      icon: Award,
      title: 'Premium Quality',
      description: 'Only the highest quality repacks and cracks make it to our collection.',
    },
    {
      icon: Globe,
      title: 'Global Access',
      description: 'Available worldwide with multiple mirror servers for optimal accessibility.',
    },
    {
      icon: Heart,
      title: 'Free Forever',
      description: 'Completely free service with no hidden costs or premium subscriptions required.',
    },
  ];

  const stats = [
    { number: '2.5M+', label: 'Total Downloads' },
    { number: '1,200+', label: 'Software Titles' },
    { number: '150K+', label: 'Active Users' },
    { number: '99.9%', label: 'Uptime' },
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
            About <span className="gradient-text">Arvind Ji Cracks</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            We are passionate about providing the software community with access to premium applications, 
            tools, and utilities. Our mission is to make quality software accessible to everyone while 
            maintaining the highest standards of safety and reliability.
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
        >
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 dark:text-gray-400">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-dark-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-primary-600 to-primary-400 rounded-lg mb-4">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Our Story Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white dark:bg-dark-800 rounded-xl shadow-lg p-8 mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Our Story
          </h2>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
              Arvind Ji Cracks was founded with a simple vision: to create a trusted platform where 
              software enthusiasts can access premium applications without compromising on quality or security. 
              What started as a small collection has grown into one of the most comprehensive software 
              repositories on the internet.
            </p>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
              Our team consists of experienced software engineers, security experts, and passionate 
              community members who work tirelessly to ensure every piece of software in our collection 
              meets our strict quality standards. We believe that everyone should have access to the 
              tools they need to be productive and creative.
            </p>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              We maintain strong relationships with the original software creators and always encourage 
              users to support developers by purchasing legitimate licenses when possible. Our platform 
              serves as a bridge between users and software, helping people discover and evaluate 
              applications before making purchasing decisions.
            </p>
          </div>
        </motion.div>

        {/* Attribution Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-gradient-to-r from-primary-50 to-purple-50 dark:from-primary-900/20 dark:to-purple-900/20 rounded-xl p-8 border border-primary-200 dark:border-primary-800"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">
            Content Attribution
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-center leading-relaxed">
            We want to acknowledge that our software collection, including descriptions, images, and 
            download links, is sourced from{' '}
            <a
              href="https://lrepacks.net"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 dark:text-primary-400 font-medium hover:underline"
            >
              https://lrepacks.net
            </a>
            . We deeply respect their work and maintain this platform as a curated collection with 
            proper attribution. All credit goes to the original creators and maintainers of the 
            source content.
          </p>
        </motion.div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="mt-16 text-center"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Security First
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Every file is scanned and verified to ensure your system's safety and security.
              </p>
            </div>
            <div className="p-6">
              <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-green-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Community Focus
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Built by the community, for the community, with continuous feedback and improvement.
              </p>
            </div>
            <div className="p-6">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-purple-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Quality Assurance
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Only the highest quality software makes it to our platform after rigorous testing.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;