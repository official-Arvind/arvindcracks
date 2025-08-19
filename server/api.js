import express from 'express';
import cors from 'cors';
import LrepacksScraper from './scraper.js';

const app = express();
const port = process.env.PORT || 3001;
const scraper = new LrepacksScraper();

// Middleware
app.use(cors());
app.use(express.json());

// Initialize scraper data
let softwareData = scraper.loadData();

// API Routes
app.get('/api/software', (req, res) => {
  const { category, search, limit = 50 } = req.query;
  
  let filteredData = [...softwareData];
  
  // Filter by category
  if (category && category !== 'all') {
    filteredData = filteredData.filter(item => 
      item.category.toLowerCase() === category.toLowerCase()
    );
  }
  
  // Filter by search term
  if (search) {
    const searchTerm = search.toLowerCase();
    filteredData = filteredData.filter(item =>
      item.title.toLowerCase().includes(searchTerm) ||
      item.description.toLowerCase().includes(searchTerm)
    );
  }
  
  // Limit results
  filteredData = filteredData.slice(0, parseInt(limit));
  
  res.json({
    success: true,
    data: filteredData,
    total: filteredData.length
  });
});

app.get('/api/software/:id', (req, res) => {
  const { id } = req.params;
  const software = softwareData.find(item => item.id === id);
  
  if (!software) {
    return res.status(404).json({
      success: false,
      message: 'Software not found'
    });
  }
  
  res.json({
    success: true,
    data: software
  });
});

app.get('/api/categories', (req, res) => {
  const categories = [...new Set(softwareData.map(item => item.category))];
  
  res.json({
    success: true,
    data: categories
  });
});

app.get('/api/stats', (req, res) => {
  const stats = {
    totalSoftware: softwareData.length,
    categories: [...new Set(softwareData.map(item => item.category))].length,
    totalDownloads: softwareData.reduce((sum, item) => {
      const downloads = parseInt(item.downloads.replace(/[^\d]/g, '')) || 0;
      return sum + downloads;
    }, 0),
    averageRating: softwareData.reduce((sum, item) => sum + item.rating, 0) / softwareData.length,
    lastUpdated: new Date().toISOString()
  };
  
  res.json({
    success: true,
    data: stats
  });
});

// Trigger manual scraping
app.post('/api/scrape', async (req, res) => {
  try {
    console.log('Manual scraping triggered...');
    const newData = await scraper.scrapeAll();
    softwareData = newData;
    
    res.json({
      success: true,
      message: 'Scraping completed successfully',
      count: newData.length
    });
  } catch (error) {
    console.error('Scraping error:', error);
    res.status(500).json({
      success: false,
      message: 'Scraping failed',
      error: error.message
    });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'API is running',
    timestamp: new Date().toISOString(),
    dataCount: softwareData.length
  });
});

// Start server
app.listen(port, () => {
  console.log(`API server running on port ${port}`);
  
  // Start scheduled scraping
  scraper.startScheduledScraping();
  
  // Initial scraping if no data exists
  if (softwareData.length === 0) {
    console.log('No existing data found. Starting initial scraping...');
    scraper.scrapeAll().then(data => {
      softwareData = data;
      console.log(`Initial scraping completed. Loaded ${data.length} items.`);
    }).catch(error => {
      console.error('Initial scraping failed:', error);
    });
  } else {
    console.log(`Loaded ${softwareData.length} existing software items.`);
  }
});

export default app;