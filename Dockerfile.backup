# Dockerfile for deploying the full stack (FastAPI + Streamlit)
# This allows deploying everything in one container

FROM python:3.12-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Install FastAPI and Uvicorn
RUN pip install --no-cache-dir fastapi uvicorn[standard]

# Copy application files
COPY . .

# Copy data files
COPY data/ ./data/

# Expose ports
# 8000 for FastAPI
# 8501 for Streamlit
EXPOSE 8000 8501

# Create startup script
RUN echo '#!/bin/bash\n\
uvicorn api_server:app --host 0.0.0.0 --port 8000 &\n\
streamlit run app_streamlit.py --server.port 8501 --server.address 0.0.0.0 --server.headless true\n\
wait' > /app/start.sh && chmod +x /app/start.sh

# Start both services
CMD ["/app/start.sh"]

