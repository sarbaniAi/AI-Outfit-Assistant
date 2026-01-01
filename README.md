# StyleFit AI Outfit Assistant 👗✨

An AI-powered outfit recommendation system deployed on **Databricks Apps**. Upload clothing images, get style recommendations for events, and search your inventory using natural language.

![Databricks](https://img.shields.io/badge/Deployed%20on-Databricks-FF3621?style=for-the-badge&logo=databricks&logoColor=white)
![Python](https://img.shields.io/badge/Python-3.9+-3776AB?style=for-the-badge&logo=python&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4o-412991?style=for-the-badge&logo=openai&logoColor=white)

## 🎯 Features

### 1. Style Matcher 📸
Upload any clothing item and get AI-powered recommendations for complementary pieces.
- **Vision AI Analysis**: GPT-4o-mini analyzes the uploaded image
- **RAG-based Matching**: Finds similar items using semantic embeddings
- **Guardrails**: Verifies matches with visual AI comparison

### 2. Event Stylist 🎉
Get complete outfit recommendations for any occasion.
- Select from preset events (Wedding, Date Night, Job Interview, etc.)
- Or describe your custom event
- Receive curated outfit suggestions from inventory

### 3. Smart Search 🔍
Search your clothing inventory using natural language.
- "Blue casual jeans for weekend"
- "Elegant dress for evening party"
- "Comfortable sneakers for gym"

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    DATABRICKS APPS                          │
│  ┌───────────────────────────────────────────────────────┐ │
│  │  Flask Backend (app.py)                                │ │
│  │  • REST API endpoints                                  │ │
│  │  • Image processing                                    │ │
│  │  • Embedding search                                    │ │
│  ├───────────────────────────────────────────────────────┤ │
│  │  React Frontend (static/)                              │ │
│  │  • Modern UI with Tailwind CSS                         │ │
│  │  • Framer Motion animations                            │ │
│  └───────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  OpenAI API                                                 │
│  • gpt-4o-mini (Vision & Chat)                              │
│  • text-embedding-3-large (Semantic Search)                 │
└─────────────────────────────────────────────────────────────┘
```

## 📁 Project Structure

```
databricks-stylefit/
├── app.py                 # Main Flask application
├── app.yaml               # Databricks Apps configuration
├── requirements.txt       # Python dependencies
├── static/                # Built React frontend
│   ├── index.html
│   └── assets/
├── data/                  # Clothing dataset (embedded in app)
│   ├── sample_styles_with_embeddings.csv
│   └── sample_images/
├── frontend/              # React source code
│   ├── src/
│   │   ├── App.jsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config.js
└── backend/               # Original backend (for local dev)
    └── app.py
```

## 🚀 Deployment

### Prerequisites
- Databricks workspace with Apps enabled
- Databricks CLI configured
- OpenAI API key

### Deploy to Databricks Apps

1. **Configure Databricks CLI**
   ```bash
   databricks configure --host https://your-workspace.cloud.databricks.com
   ```

2. **Create the app**
   ```bash
   databricks apps create stylefit-outfit-assistant
   ```

3. **Upload source code**
   ```bash
   databricks workspace import-dir . /Users/your-email/stylefit-app --overwrite
   ```

4. **Deploy**
   ```bash
   databricks apps deploy stylefit-outfit-assistant \
     --source-code-path /Workspace/Users/your-email/stylefit-app
   ```

### Environment Variables

Set in `app.yaml`:
```yaml
env:
  - name: OPENAI_API_KEY
    value: "your-openai-api-key"
```

## 🛠️ Local Development

### Backend
```bash
cd backend
pip install -r requirements.txt
export OPENAI_API_KEY="your-key"
python app.py
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## 📊 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/` | GET | Serve React frontend |
| `/api/health` | GET | Health check with debug info |
| `/api/analyze` | POST | Analyze uploaded clothing image |
| `/api/event-outfit` | POST | Get event-based outfit recommendations |
| `/api/search` | POST | Semantic search for clothing items |
| `/api/inventory` | GET | Get inventory summary |
| `/api/image/<id>` | GET | Serve clothing images |

## 🎨 Tech Stack

- **Backend**: Flask, Gunicorn, Pandas, NumPy
- **Frontend**: React 18, Tailwind CSS, Framer Motion, Lucide Icons
- **AI/ML**: OpenAI GPT-4o-mini, text-embedding-3-large
- **Deployment**: Databricks Apps
- **Build Tools**: Vite, PostCSS

## 📈 Performance

| Metric | Value |
|--------|-------|
| Items in Inventory | 100 (demo) |
| Average Response Time | < 3 seconds |
| Match Accuracy | ~94% |
| Embedding Dimensions | 3072 |

## 🔒 Security

- API keys stored as environment variables
- Databricks OAuth for app authentication
- CORS enabled for cross-origin requests

## 📝 License

MIT License - feel free to use this project for your own applications!

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📧 Contact

Built with ❤️ using Databricks and OpenAI

---

**Live Demo**: [StyleFit on Databricks Apps](https://retailnext-outfit-assistant-984752964297111.11.azure.databricksapps.com)

