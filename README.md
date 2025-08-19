# Arvind Ji Cracks - Premium Software Hub

A beautiful, responsive website for software reviews and downloads with automated web scraping capabilities.

## Features

### 🎨 Modern Design
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Dark/Light Theme**: Automatic theme switching with user preference
- **Smooth Animations**: Framer Motion powered transitions and micro-interactions
- **Apple-level Aesthetics**: Clean, sophisticated design with attention to detail

### 🔍 Advanced Search & Filtering
- **Real-time Search**: Instant search across software titles and descriptions
- **Category Filtering**: Filter by software categories (System Tools, Graphics, etc.)
- **Smart Sorting**: Sort by name, rating, downloads, or release date
- **Grid/List Views**: Toggle between different viewing modes

### 🤖 Automated Web Scraping
- **Live Data**: Automatically scrapes lrepacks.net for latest software
- **Scheduled Updates**: Runs every 6 hours to keep content fresh
- **Comment Analysis**: Uses sentiment analysis to determine software quality
- **Smart Filtering**: Only publishes software with positive community feedback

### 📊 Content Management
- **Quality Control**: Automated rating system based on user comments
- **Verification System**: Marks high-quality software as verified
- **Download Tracking**: Tracks download counts and popularity
- **Category Organization**: Automatically categorizes software

### 🚀 Performance
- **Fast Loading**: Optimized images and lazy loading
- **Efficient Caching**: Smart data caching for better performance
- **SEO Optimized**: Proper meta tags and structured data
- **Progressive Enhancement**: Works without JavaScript

## Technology Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **React Router** for navigation
- **Lucide React** for icons

### Backend & Scraping
- **Node.js** with Express
- **Cheerio** for HTML parsing
- **Axios** for HTTP requests
- **Sentiment Analysis** for comment evaluation
- **Cron Jobs** for scheduled scraping

### Development Tools
- **Vite** for fast development
- **TypeScript** for type safety
- **ESLint** for code quality
- **PostCSS** for CSS processing

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd arvind-ji-cracks
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Start the scraper (optional)**
   ```bash
   npm run scraper
   ```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run scraper` - Run web scraper manually

## Web Scraping System

### How It Works

1. **Automated Scraping**: The system automatically scrapes lrepacks.net every 6 hours
2. **Content Extraction**: Extracts software titles, descriptions, images, and download links
3. **Comment Analysis**: Analyzes user comments using sentiment analysis
4. **Quality Control**: Only publishes software with positive community feedback
5. **Data Storage**: Stores processed data in JSON format for fast access

### Scraping Features

- **Respectful Scraping**: Includes delays between requests
- **Error Handling**: Robust error handling and retry logic
- **Data Validation**: Validates scraped data before publishing
- **Duplicate Prevention**: Prevents duplicate entries
- **Category Mapping**: Maps source categories to our system

### API Endpoints

- `GET /api/software` - Get all software with filtering
- `GET /api/software/:id` - Get specific software details
- `GET /api/categories` - Get all categories
- `GET /api/stats` - Get platform statistics
- `POST /api/scrape` - Trigger manual scraping

## Content Attribution

This website serves as a curated collection with proper attribution to the original source. All software links, images, and descriptions are sourced from [https://lrepacks.net](https://lrepacks.net). We acknowledge and respect their original work.

## Project Structure

```
src/
├── components/          # Reusable UI components
├── pages/              # Page components
├── data/               # Mock data and types
├── styles/             # Global styles
server/
├── scraper.js          # Web scraping logic
├── api.js              # Express API server
data/
├── scraped_software.json  # Scraped data storage
```

## Features in Detail

### Responsive Design
- Mobile-first approach
- Flexible grid layouts
- Touch-friendly interactions
- Optimized for all screen sizes

### Dark Mode
- System preference detection
- Smooth theme transitions
- Persistent user preference
- Optimized for both themes

### Search & Filtering
- Instant search results
- Multiple filter options
- Sort by various criteria
- Pagination for large datasets

### Software Cards
- Rich preview information
- Rating and download stats
- Category badges
- Verification indicators

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is for educational and demonstration purposes. Please respect the original content creators and consider supporting them by purchasing legitimate software licenses.

## Disclaimer

This website is created for educational purposes to demonstrate web scraping and modern web development techniques. All scraped content is properly attributed to the original source at lrepacks.net. Users are encouraged to support software developers by purchasing legitimate licenses.