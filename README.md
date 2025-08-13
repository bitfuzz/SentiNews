# Senti-News

A real-time news sentiment analysis application that fetches the latest headlines and categorizes them based on sentiment analysis using machine learning.

## Features

- **Real-time News Fetching**: Retrieves top headlines from NewsAPI
- **AI-Powered Sentiment Analysis**: Uses DistilBERT model to analyze news sentiment
- **Smart Categorization**: Automatically categorizes news as Good, Bad, or Neutral
- **Interactive Filtering**: Filter news by sentiment category
- **Responsive Design**: Modern, clean interface that works on all devices
- **Caching System**: Intelligent caching to reduce API calls and improve performance

## Architecture

This is a full-stack application with:

- **Backend**: Node.js + Express API server with sentiment analysis
- **Frontend**: React application with modern UI
- **AI/ML**: Xenova Transformers for client-side sentiment analysis

## Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **@xenova/transformers** - Machine learning models
- **Axios** - HTTP client for API requests
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

### Frontend
- **React 19** - UI framework
- **Axios** - HTTP client
- **CSS3** - Modern styling with grid layout

## Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- NewsAPI key (get one at [newsapi.org](https://newsapi.org))

### Setup

1. **Clone the repository**
   ```cmd
   git clone <repository-url>
   cd Sentstream
   ```

2. **Install backend dependencies**
   ```cmd
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```cmd
   cd ..\frontend
   npm install
   ```

4. **Configure environment variables**
   
   Create a `.env` file in the `backend` directory:
   ```env
   NEWS_API_KEY=your_newsapi_key_here
   ```

## Running the Application

### Development Mode

1. **Start the backend server**
   ```cmd
   cd backend
   node index.js
   ```
   The backend will run on `http://localhost:5000`

2. **Start the frontend development server**
   ```cmd
   cd frontend
   npm start
   ```
   The frontend will run on `http://localhost:3000`

### Production Build

1. **Build the frontend**
   ```cmd
   cd frontend
   npm run build
   ```

2. **Start the backend**
   ```cmd
   cd backend
   node index.js
   ```

## 📡 API Endpoints

### GET `/api/news`
Fetches and analyzes the latest news headlines.

**Response:**
```json
[
  {
    "title": "Breaking News Title",
    "description": "News description...",
    "url": "https://example.com/article",
    "urlToImage": "https://example.com/image.jpg",
    "source": "News Source",
    "sentimentCategory": "Good" // or "Bad" or "Neutral"
  }
]
```

## How It Works

1. **News Fetching**: The backend fetches top 40 headlines from NewsAPI
2. **Sentiment Analysis**: Each headline is processed through a DistilBERT model
3. **Categorization**: Headlines are categorized based on sentiment scores:
   - **Good**: Positive sentiment with confidence > 95%
   - **Bad**: Negative sentiment with confidence > 95%
   - **Neutral**: Everything else
4. **Caching**: Results are cached for 10 minutes to improve performance
5. **Frontend Display**: React app displays news cards with filtering options

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEWS_API_KEY` | Your NewsAPI.org API key | Yes |

### Caching

The application uses in-memory caching with a 10-minute TTL (Time To Live). You can modify this in `backend/index.js`:

```javascript
TTL: 10 * 60 * 1000, // 10 minutes in milliseconds
```

## Customization

### Sentiment Thresholds

You can adjust sentiment categorization thresholds in `backend/index.js`:

```javascript
function categorize({ label, score }) {
  if (label === "POSITIVE" && score > 0.95) return "Good";
  if (label === "NEGATIVE" && score > 0.95) return "Bad";
  return "Neutral";
}
```

### Styling

Frontend styles are located in:
- `frontend/src/App.css` - Main application styles
- `frontend/src/index.css` - Global styles


## Future Enhancements

- [ ] Add a custom self-made model
- [ ] Add news source filtering
- [ ] Implement real-time updates
- [ ] Add sentiment trend analytics
- [ ] Include more news categories
- [ ] Add user preferences and bookmarking
- [ ] Implement database storage
- [ ] Add unit and integration tests

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## Support

If you have any questions or run into issues, please open an issue on the repository.


