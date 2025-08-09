# 💼 HireHub  

![License](https://img.shields.io/badge/license-MIT-blue.svg)  
![Tech](https://img.shields.io/badge/stack-MERN-green)  
![Status](https://img.shields.io/badge/status-active-success)  

> A modern job portal platform that connects recruiters with job seekers, featuring secure authentication, job management, and a sleek responsive UI.

---

## 🚀 Key Features  

### 🔐 Authentication & Authorization  
- Recruiter login & dashboard  
- Job seeker login  
- **Clerk Authentication** with Google, GitHub, and Facebook  
- Admin dashboard for managing jobs and users  

### 📄 Job Management  
- Apply for jobs directly  
- Manage job postings (create, edit, delete)  
- View applicants for each job  
- Accept or reject applications  

### 💡 User Experience  
- Responsive design for all devices  
- Similar jobs suggestion  
- Already applied job indicator  
- Image uploads with **Cloudinary**  
- Modern and intuitive design  

### 🔍 Search & Filtering  
- Search by job title or keywords  
- Filter by location  
- Pagination: 6 jobs per page for performance  

---

## 🛠 Tech Stack  

**Frontend:** React.js, Tailwind CSS  
**Backend:** Node.js, Express.js  
**Database:** MongoDB  
**Auth:** Clerk (Google, GitHub, Facebook)  
**Image Hosting:** Cloudinary  

---

## ⚙️ Installation  

```bash
# Clone the repository
git clone https://github.com/nitingoley/HireHub.git
cd hirehub

# Install dependencies
npm install

# Create a .env file in the root with the following:
PORT=4000
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CLERK_FRONTEND_API=your_clerk_frontend_api
CLERK_API_KEY=your_clerk_api_key

# Start the development server
npm run dev
📸 Screenshots
Home Page	Job Details	Dashboard

📌 Roadmap
 Job recommendations based on user skills

 Resume parsing & auto-fill application forms

 Email notifications for application updates

🤝 Contributing
Contributions, issues, and feature requests are welcome!
Feel free to fork and submit a PR.

📄 License
This project is licensed under the MIT License.

👨‍💻 Author
Nitin Goley
📧 Email: nitingoley42@gmail.com
🔗 LinkedIn: linkedin.com/in/nitingoley42
💻 GitHub: github.com/nitingoley

Made with ❤️ by Nitin Goley

---
If you want, I can also design you a **fancy banner image** for the top of the README so it looks like a professional SaaS product on GitHub.  
Do you want me to make that?
