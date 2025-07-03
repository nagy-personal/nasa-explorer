# 🚀 NASA Explorer

A stunning web application showcasing NASA's space data with a modern, responsive interface. Explore APOD (Astronomy Picture of the Day), EPIC (Earth Polychromatic Imaging Camera), Mars Rover photos, and Near-Earth Objects (NEOs).

![NASA Explorer](https://img.shields.io/badge/NASA-Explorer-blue?style=for-the-badge&logo=nasa)
![React](https://img.shields.io/badge/React-19.1.0-blue?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-green?style=for-the-badge&logo=node.js)
![TypeScript](https://img.shields.io/badge/TypeScript-4.9.5-blue?style=for-the-badge&logo=typescript)

## 🧩 Component Architecture

- **Home Page** is split into:
  - `HeroSection`
  - `FeaturesGrid`
  - `StatsSection`
  - `CallToAction`
- **Reusable UI Components:** Button, Card, DatePicker, Select, ImageWithFallback, ErrorMessage, etc.
- **Common Patterns:** All error messages use a single `<ErrorMessage />` component for consistency.

## 🪝 Custom Hooks

- `useDebounce`: Debounces input values (used for camera filter in Mars Rover).
- `useIntersectionObserver`: Triggers effects when elements enter the viewport (used for fade-in animation in photo gallery).
- `useLocalStorage`: Persists user preferences (last viewed date, rover, date range) across sessions.

## ✨ Features

- **🌌 APOD (Astronomy Picture of the Day)**: Daily stunning space images with detailed descriptions
- **🌍 EPIC (Earth Polychromatic Imaging Camera)**: Real-time Earth imagery from NASA's DSCOVR satellite
- **🔴 Mars Rover Photos**: Explore the Red Planet through Curiosity, Opportunity, and Spirit rover images
- **☄️ Near-Earth Objects (NEOs)**: Track asteroids and comets with detailed statistics and charts
- **📱 Responsive Design**: Beautiful UI that works on desktop, tablet, and mobile devices
- **⚡ Real-time Data**: Live data from NASA's APIs
- **🎨 Modern UI**: Built with React, TypeScript, and Tailwind CSS

## 🛠️ Tech Stack

### Frontend
- **React 19.1.0** - Modern React with hooks
- **TypeScript 4.9.5** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client
- **Chart.js** - Interactive charts for NEO data
- **Lucide React** - Beautiful icons

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **CORS** - Cross-origin resource sharing
- **Helmet** - Security middleware
- **Morgan** - HTTP request logger
- **Axios** - HTTP client for NASA API calls

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- Yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/nagy-personal/nasa-explorer.git
   cd nasa-explorer
   ```

2. **Install dependencies**
   ```bash
   yarn install:all
   ```

3. **Set up environment variables**
   
   Create `.env` files in both `backend/` and `frontend/` directories:
   
   **Backend (.env)**
   ```env
   PORT=5000
   NASA_API_KEY=your_nasa_api_key_here
   NODE_ENV=development
   ```
   
   **Frontend (.env)**
   ```env
   REACT_APP_API_URL=http://localhost:5000
   REACT_APP_NASA_API_KEY=your_nasa_api_key_here
   ```

4. **Get NASA API Key**
   - Visit [NASA API Portal](https://api.nasa.gov/)
   - Sign up for a free API key
   - Add your API key to the environment variables

5. **Start the development servers**
   ```bash
   yarn dev
   ```

   This will start both the backend (port 5000) and frontend (port 3000) servers.

## 📁 Project Structure

```
nasa-explorer/
├── api/                    # Vercel serverless functions
│   ├── controllers/        # API route handlers
│   ├── routes/            # API routes
│   ├── middlewares/       # Express middlewares
│   ├── config/            # Configuration files
│   ├── utils/             # Utility functions
│   ├── index.js           # Main API entry point
│   └── package.json       # API dependencies
├── backend/               # Original backend (for local development)
│   ├── src/
│   │   ├── controllers/   # API route handlers
│   │   ├── routes/        # API routes
│   │   ├── middlewares/   # Express middlewares
│   │   ├── config/        # Configuration files
│   │   └── utils/         # Utility functions
│   └── server.js          # Server entry point
├── frontend/              # React application
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API service functions
│   │   ├── hooks/         # Custom React hooks
│   │   ├── types/         # TypeScript type definitions
│   │   └── config/        # Configuration files
│   └── public/            # Static assets
├── package.json           # Root package.json with scripts
└── vercel.json           # Vercel deployment configuration
```

## 🌐 Deployment

### Vercel Deployment (Recommended)

This project is optimized for deployment on Vercel with serverless functions:

1. **Connect to Vercel**
   - Push your code to GitHub
   - Connect your GitHub repository to Vercel
   - Vercel will automatically detect the configuration

2. **Environment Variables**
   - Add your NASA API key in Vercel's environment variables:
     - **Name**: `NASA_API_KEY`
     - **Value**: Your NASA API key
     - **Environment**: Production, Preview, Development

3. **Automatic Deployment**
   - Vercel will automatically deploy both frontend and API
   - The `api/` directory contains serverless functions
   - The `frontend/` directory is built and served as static files

4. **Custom Domain (Optional)**
   - Configure your custom domain in Vercel dashboard
   - All API calls will work with your custom domain

### Manual Deployment

1. **Build the frontend**
   ```bash
   cd frontend
   yarn build
   ```

2. **Deploy the backend**
   ```bash
   cd backend
   yarn start
   ```

## 🔧 Available Scripts

- `yarn install:all` - Install dependencies for both frontend and backend
- `yarn dev` - Start both development servers concurrently
- `yarn start:backend` - Start only the backend server
- `yarn start:frontend` - Start only the frontend server
- `yarn build` - Build the frontend for production
- `yarn vercel-build` - Build script for Vercel deployment

## 📊 API Endpoints

The API provides the following endpoints:

- `GET /api/health` - Health check
- `GET /api/apod` - Astronomy Picture of the Day
- `GET /api/epic` - Earth Polychromatic Imaging Camera data
- `GET /api/mars-rover/:rover` - Mars Rover photos
- `GET /api/mars-rovers` - Available Mars rovers
- `GET /api/neo` - Near-Earth Objects data

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [NASA API](https://api.nasa.gov/) for providing amazing space data
- [React](https://reactjs.org/) for the amazing frontend framework
- [Express.js](https://expressjs.com/) for the robust backend framework
- [Tailwind CSS](https://tailwindcss.com/) for the beautiful styling
- [Vercel](https://vercel.com/) for seamless deployment

## 📞 Support

If you have any questions or need help, please open an issue on GitHub.

---

Made with ❤️ by the NASA Explorer Team
