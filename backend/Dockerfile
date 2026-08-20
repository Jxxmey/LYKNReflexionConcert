# backend/Dockerfile
FROM python:3.10-slim

WORKDIR /app

# คัดลอก requirements และติดตั้ง
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# คัดลอกโค้ดทั้งหมดเข้ามา
COPY . .

# รัน FastAPI ด้วย Uvicorn (เปิดโหมด reload สำหรับตอนพัฒนา)
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]