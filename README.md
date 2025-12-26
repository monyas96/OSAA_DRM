# OSAA DRM Dashboard

A comprehensive dashboard for analyzing Domestic Resource Mobilization (DRM) in Africa, featuring interactive policy briefs, exploratory data views, and explanatory narratives.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Python 3.12+
- pip

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/monyas96/OSAA_DRM.git
   cd OSAA_DRM
   ```

2. **Install Python dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

3. **Install React dependencies**:
   ```bash
   cd osaa-drm-app
   npm install
   ```

### Running Locally

1. **Start the FastAPI server** (Terminal 1):
   ```bash
   python api_server.py
   ```
   Server runs on `http://localhost:8000`

2. **Start the Streamlit app** (Terminal 2):
   ```bash
   streamlit run app_streamlit.py
   ```
   App runs on `http://localhost:8501`

3. **Start the React frontend** (Terminal 3):
   ```bash
   cd osaa-drm-app
   npm run dev
   ```
   App runs on `http://localhost:3000` or `http://localhost:5173`

## 📁 Project Structure

```
OSAA_DRM/
├── osaa-drm-app/          # React frontend
│   ├── src/
│   │   ├── pages/         # Main pages (Landing, Exploratory, Explanatory)
│   │   ├── components/    # Reusable components
│   │   └── services/      # API services
│   └── package.json
├── pages/                  # Streamlit pages
│   ├── 2_theme_4.py       # Theme 4 overview
│   ├── 3_topic_4_1.py     # Topic 4.1: Public Expenditures
│   ├── 4_topic_4_2.py     # Topic 4.2: Budget and Tax Revenues
│   ├── 5_topic_4_3.py     # Topic 4.3: Capital Markets
│   ├── 6_topic_4_4.py     # Topic 4.4: Illicit Flows
│   └── 7_data_availability.py
├── app_streamlit.py       # Main Streamlit app
├── api_server.py          # FastAPI backend
├── data/                   # Data files (parquet, CSV)
└── requirements.txt       # Python dependencies
```

## 🌐 Deployment

### Option 1: Vercel (React Frontend) + Streamlit Cloud + Railway (API)

**React Frontend (Vercel)**:
1. Install Vercel CLI: `npm i -g vercel`
2. Deploy: `cd osaa-drm-app && vercel`
3. Set environment variables:
   - `VITE_API_URL`: Your FastAPI URL
   - `VITE_STREAMLIT_URL`: Your Streamlit URL

**Streamlit Backend**:
1. Push code to GitHub
2. Go to [share.streamlit.io](https://share.streamlit.io)
3. Connect repository and deploy `app_streamlit.py`

**FastAPI Server (Railway)**:
1. Install Railway CLI: `npm i -g @railway/cli`
2. Deploy: `railway up`
3. Get URL and update React app's `VITE_API_URL`

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

## 📊 Features

- **Policy Briefs**: Interactive policy briefs for topics 4.1-4.4
- **Exploratory View**: Interactive data exploration with filters and visualizations
- **Explanatory View**: Narrative-driven policy briefs with embedded graphs
- **Data API**: FastAPI backend for serving data to React frontend
- **Responsive Design**: Mobile-friendly interface

## 🛠️ Technology Stack

- **Frontend**: React 18, Vite, Tailwind CSS, Recharts
- **Backend**: Python, Streamlit, FastAPI
- **Data**: Pandas, Parquet files
- **Deployment**: Vercel, Streamlit Cloud, Railway/Render

## 📝 Environment Variables

### React App
- `VITE_API_URL`: FastAPI server URL (default: `http://localhost:8000`)
- `VITE_STREAMLIT_URL`: Streamlit app URL (default: `http://localhost:8501`)

### FastAPI Server
- `ALLOWED_ORIGINS`: Comma-separated list of allowed CORS origins

## 📚 Documentation

- [DEPLOYMENT.md](./DEPLOYMENT.md) - Detailed deployment guide
- [osaa-drm-app/README_DEPLOYMENT.md](./osaa-drm-app/README_DEPLOYMENT.md) - Quick deployment guide
- [QUICK_START.md](./QUICK_START.md) - Quick start guide

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is part of the OSAA (Office of the Special Adviser on Africa) initiative.

## 🔗 Links

- Repository: https://github.com/monyas96/OSAA_DRM
- API Documentation: `http://localhost:8000/docs` (when running locally)

## ⚠️ Important Notes

- Large data files (`main_data.json`, parquet files) are not included in the repository
- Data files should be generated or downloaded separately
- Ensure all environment variables are set correctly for production deployment
