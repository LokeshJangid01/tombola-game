# Dockerfile
FROM python:3.11-slim

# Set workdir
WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the app code
COPY . .

# Expose port
EXPOSE 4000

# Start server
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "4000", "--reload"]
