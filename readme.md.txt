# Image Processing and CSV Management API

## Project Description

This project is a backend service built with Node.js and Express.js, aimed at processing image URLs provided through a CSV file. The system handles file uploads, processes images using the Sharp library, and stores the results in a MongoDB database. Additionally, it supports querying the status of the processing task and exporting the results to a CSV file.

### Key Features:
- **CSV File Upload**: Users can upload a CSV file containing image URLs.
- **Image Processing**: The service downloads images from the provided URLs, compresses them, and saves the compressed images.
- **Status Tracking**: Tracks the status of image processing tasks.
- **CSV Export**: Allows users to export the processed data back into a CSV file.
- **File Upload to AWS S3**: Processes and uploads the CSV file to AWS S3 for storage.

## Getting Started

### Prerequisites
- Node.js
- MongoDB
- AWS S3 credentials (for file upload)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/image-processing-api.git
   cd image-processing-api
   ```
   
### Install dependencies
```bash
npm install
```

### Configure environment variables

1.Create a `.env` file in the root directory.
2.Add the following environment variables

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/your-db-name
AWS_ACCESS_KEY_ID=your-aws-access-key-id
AWS_SECRET_ACCESS_KEY=your-aws-secret-access-key
AWS_REGION=your-aws-region
AWS_BUCKET_NAME=your-s3-bucket-name
```

### Start the server

```bash
npm start
```

### API Collection

1. Find the `Image Processing and CSV Management API.postman_collection` file in the repository.
2. Import this file into postman.
3. You will found the full API documentation in this collection
4. LocalServerURI="http://localhost:3000/use/{end-points}"



