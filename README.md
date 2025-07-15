CloudyFile – Smart File Management System

CloudyFile is a full-stack file management system built to handle secure uploads, advanced metadata operations, and intelligent features like background processing, image optimization, and role-based sharing.

🚀 Features

📁 Upload & manage files (images, videos, docs)

🔐 User authentication (JWT-based)

🗂️ File categorization: archive, favorites, recycle bin

🔄 Background image processing with AWS Lambda + Sharp

⚡ Real-time syncing via Redis cache

📊 Storage usage and analytics (file type, size)

📤 Shared files with role-based access (viewer, editor)

🔎 Filter with pagination

🛠️ Built with scalable microservice-friendly architecture


🧰 Tech Stack

Frontend: React + Vite + Tailwind
Backend: Node.js + Express + TypeScript
Database: MySQL + Prisma ORM
Queue & Cache: Redis + BullMQ
Storage: AWS S3 (Pre-signed uploads)
Image Processing: AWS Lambda + Sharp


npm install
npm run dev


![Image 1](https://ibb.co/dw1nyKsG)
![Image 2](https://drive.google.com/file/d/16ODJGYpB4gVdN1zUUk2rwIml8Z5lL-tN/view?usp=sharing)
![Image 3](https://drive.google.com/file/d/1lfUnheppoggJ9tZjkG4Sq_s7TiTTWa3o/view?usp=sharing)
![Image 4](https://drive.google.com/file/d/1zQbJaf2uvnh6l7pteLvCZmo4KNzsEBJ5/view?usp=sharing)
![Image 5](https://drive.google.com/file/d/1cu5xVUNPKo3FG44tbBGKzaks9--fzftA/view?usp=sharing)

