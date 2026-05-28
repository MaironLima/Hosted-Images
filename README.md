# Hosted Images

Fullstack platform for image publishing, database integration, and dynamic content visualization.  
- **Backend and database:** Railway  
- **Frontend:** [Vercel - hosted-images.vercel.app](https://hosted-images.vercel.app)

---

## 🌐 Demo

- [Access the production frontend](https://hosted-images.vercel.app)

---

## 📦 Technologies Used

- **Backend:** Node.js, NestJS, Prisma ORM, PostgreSQL  
- **Frontend:** React, Vite, TailwindCSS  
- **Hosting:** [Railway](https://railway.app/) (API & DB), [Vercel](https://vercel.com/) (Frontend)  
- **Others:** TypeScript, Cloudinary (image uploads)

---

## 🚀 How to run the project locally

1. **Clone the repository**

   ```bash
   git clone https://github.com/MaironLima/Hosted-Images.git
   ```

2. **Set up environment variables**

   - In the backend, copy `.env.example` to `.env` and set your Railway and Cloudinary credentials.

3. **Install dependencies**

   ```bash
   # Backend
   cd back-end
   npm install

   # Frontend
   cd ../front-end
   npm install
   ```

4. **Run database migrations**

   ```bash
   cd ../back-end
   npx prisma migrate dev
   ```

5. **Start the backend**

   ```bash
   npm run start:dev
   ```

6. **Start the frontend**

   ```bash
   cd ../front-end
   npm run dev
   ```

---

## 🏗️ Deploy

- **Backend + Database:**  
  - Set up a Railway project, connect the repository, and configure environment variables.
  - Railway automatically creates and connects a PostgreSQL database to the backend.

- **Frontend:**  
  - Deploy the `front-end` folder directly to Vercel.
  - Set up the necessary environment variables like the API URL.

- **Production:**  
  https://hosted-images.vercel.app

---

## ⚙️ Main Features

- User registration and authentication
- Image upload and visualization
- Post publishing
- Backend-frontend integration
- PostgreSQL database (Railway)
- Continuous deployment (Railway and Vercel)

---

## 📸 Screenshots

> Add screenshots of the main system screens here.

---

## 🤝 Contributing

1. Fork the repository
2. Create a branch (`git checkout -b feature/name`)
3. Commit your changes (`git commit -m 'feat: features description'`)
4. Push to your branch (`git push origin feature/name`)
5. Open a Pull Request

---

## 📝 License

This project is under the MIT license. See the [LICENSE](LICENSE) file for more details.

---

## 👤 Author

- [Mairon Lima](https://github.com/MaironLima)
