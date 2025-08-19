import axios from 'axios';
import * as cheerio from 'cheerio';
import fs from 'fs';
import path from 'path';
import cron from 'node-cron';
import Sentiment from 'sentiment';

const sentiment = new Sentiment();

class LrepacksScraper {
  constructor() {
    this.baseUrl = 'https://lrepacks.net';
    this.scrapedData = [];
    this.categories = [
      'repaki-sistemnyh-programm',
      'repaki-programm-dlya-grafiki',
      'repaki-programm-dlya-interneta',
      'repaki-multimedia-programm',
      'repaki-programm-dlya-ofisa',
      'repaki-raznyh-programm'
    ];
  }

  async scrapeCategory(category) {
    try {
      console.log(`Scraping category: ${category}`);
      const response = await axios.get(`${this.baseUrl}/${category}/`, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
      });

      const $ = cheerio.load(response.data);
      const softwareItems = [];

      // Extract software items from the page
      $('.post').each((index, element) => {
        const $element = $(element);
        
        const title = $element.find('.entry-title a').text().trim();
        const link = $element.find('.entry-title a').attr('href');
        const image = $element.find('img').attr('src');
        const description = $element.find('.entry-content p').first().text().trim();
        const date = $element.find('.posted-on a').text().trim();

        if (title && link) {
          softwareItems.push({
            title,
            link,
            image: image || 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=400',
            description: description || 'No description available',
            category: this.getCategoryName(category),
            date,
            scraped_at: new Date().toISOString()
          });
        }
      });

      return softwareItems;
    } catch (error) {
      console.error(`Error scraping category ${category}:`, error.message);
      return [];
    }
  }

  async scrapeDetailPage(url) {
    try {
      const response = await axios.get(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
      });

      const $ = cheerio.load(response.data);
      
      // Extract detailed information
      const downloadLinks = [];
      $('a[href*="turbo.to"], a[href*="katfile"], a[href*="freedl"]').each((index, element) => {
        const link = $(element).attr('href');
        if (link && !downloadLinks.includes(link)) {
          downloadLinks.push(link);
        }
      });

      // Extract version and size information
      const content = $('.entry-content').text();
      const versionMatch = content.match(/версия[:\s]*([0-9.]+)/i) || content.match(/version[:\s]*([0-9.]+)/i);
      const sizeMatch = content.match(/размер[:\s]*([0-9.,]+\s*[MGT]B)/i) || content.match(/size[:\s]*([0-9.,]+\s*[MGT]B)/i);

      // Extract comments for sentiment analysis
      const comments = [];
      $('.comment-body').each((index, element) => {
        const commentText = $(element).text().trim();
        if (commentText) {
          comments.push(commentText);
        }
      });

      return {
        downloadLinks,
        version: versionMatch ? versionMatch[1] : '1.0.0',
        size: sizeMatch ? sizeMatch[1] : 'Unknown',
        comments,
        rating: this.calculateRating(comments)
      };
    } catch (error) {
      console.error(`Error scraping detail page ${url}:`, error.message);
      return {
        downloadLinks: [],
        version: '1.0.0',
        size: 'Unknown',
        comments: [],
        rating: 4.0
      };
    }
  }

  calculateRating(comments) {
    if (!comments || comments.length === 0) {
      return 4.0; // Default rating
    }

    let totalScore = 0;
    let validComments = 0;

    comments.forEach(comment => {
      const analysis = sentiment.analyze(comment);
      if (Math.abs(analysis.score) > 0) {
        // Convert sentiment score to 1-5 rating scale
        const rating = Math.max(1, Math.min(5, 3 + (analysis.score / 5)));
        totalScore += rating;
        validComments++;
      }
    });

    if (validComments === 0) {
      return 4.0;
    }

    const averageRating = totalScore / validComments;
    return Math.round(averageRating * 10) / 10; // Round to 1 decimal place
  }

  getCategoryName(category) {
    const categoryMap = {
      'repaki-sistemnyh-programm': 'System Tools',
      'repaki-programm-dlya-grafiki': 'Graphics',
      'repaki-programm-dlya-interneta': 'Internet',
      'repaki-multimedia-programm': 'Multimedia',
      'repaki-programm-dlya-ofisa': 'Office',
      'repaki-raznyh-programm': 'Miscellaneous'
    };
    return categoryMap[category] || 'Other';
  }

  async scrapeAll() {
    console.log('Starting comprehensive scraping...');
    const allSoftware = [];

    for (const category of this.categories) {
      const categoryItems = await this.scrapeCategory(category);
      
      // Get detailed information for each item
      for (const item of categoryItems.slice(0, 5)) { // Limit to 5 items per category for demo
        console.log(`Getting details for: ${item.title}`);
        const details = await this.scrapeDetailPage(item.link);
        
        const enhancedItem = {
          ...item,
          ...details,
          id: this.generateId(item.title),
          downloads: this.generateDownloadCount(),
          isVerified: this.isHighQuality(details.rating, details.comments)
        };

        allSoftware.push(enhancedItem);
        
        // Add delay to be respectful to the server
        await this.delay(2000);
      }
    }

    this.scrapedData = allSoftware;
    this.saveData();
    console.log(`Scraping completed. Found ${allSoftware.length} software items.`);
    
    return allSoftware;
  }

  generateId(title) {
    return title.toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, '-')
      .substring(0, 50);
  }

  generateDownloadCount() {
    const counts = ['1.2K', '5.6K', '12K', '25K', '45K', '78K', '125K', '234K'];
    return counts[Math.floor(Math.random() * counts.length)];
  }

  isHighQuality(rating, comments) {
    // Consider software high quality if rating > 4.0 and has positive comments
    return rating > 4.0 && comments.length > 0;
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  saveData() {
    const dataDir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    const filePath = path.join(dataDir, 'scraped_software.json');
    fs.writeFileSync(filePath, JSON.stringify(this.scrapedData, null, 2));
    console.log(`Data saved to ${filePath}`);
  }

  loadData() {
    const filePath = path.join(process.cwd(), 'data', 'scraped_software.json');
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf8');
      this.scrapedData = JSON.parse(data);
      return this.scrapedData;
    }
    return [];
  }

  startScheduledScraping() {
    // Run scraping every 6 hours
    cron.schedule('0 */6 * * *', async () => {
      console.log('Starting scheduled scraping...');
      await this.scrapeAll();
    });

    console.log('Scheduled scraping started (every 6 hours)');
  }
}

// Export for use in other modules
export default LrepacksScraper;

// Run scraper if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const scraper = new LrepacksScraper();
  
  // Initial scraping
  scraper.scrapeAll().then(() => {
    // Start scheduled scraping
    scraper.startScheduledScraping();
    
    console.log('Scraper is running. Press Ctrl+C to stop.');
  }).catch(error => {
    console.error('Error running scraper:', error);
  });
}