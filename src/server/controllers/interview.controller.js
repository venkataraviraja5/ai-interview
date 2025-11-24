import {generateQuestionsService} from "../services/interview.service";


// const data = `
// Ravi Kumar
// Email: ravikumar@example.com
// Phone: +91 98765 43210
// Location: Hyderabad, India

// Professional Summary:
// Full-stack developer with 3+ years of experience building scalable web applications. 
// Strong expertise in JavaScript, React, Node.js, Express, MongoDB, and REST APIs. 
// Experienced in cloud deployment, CI/CD, and microservices.

// Skills:
// - Frontend: HTML, CSS, Tailwind, React.js, Next.js, Redux Toolkit
// - Backend: Node.js, Express.js, JWT Authentication
// - Database: MongoDB, PostgreSQL
// - Cloud/DevOps: Docker, GitHub Actions, AWS EC2, S3
// - Tools: Git, Postman, Jira

// Experience:
// Software Developer – TechNova Solutions (2021–Present)
// - Developed and deployed full-stack applications using MERN stack.
// - Improved API response time by 35% by optimizing database indexes.
// - Integrated Razorpay and Stripe payment gateways.
// - Implemented authentication system with roles and permissions.
// - Built dashboards using Recharts and Chart.js.

// Junior Web Developer – CodeWorks Labs (2020–2021)
// - Converted Figma designs into responsive UI with Tailwind CSS.
// - Built reusable React components and improved Lighthouse score by 20%.
// - Assisted in backend API development using Express and MongoDB.

// Projects:
// 1. AI Interview App
//    - Built an AI-powered interview generator using Next.js + OpenAI APIs.
//    - Supports PDF resume parsing, dynamic questions, and scoring.

// 2. Ecommerce Platform
//    - MERN stack app with admin panel, product filtering, and payments.

// Education:
// B.Tech in Computer Science – JNTU Hyderabad (2016–2020)

// Certifications:
// - AWS Cloud Practitioner
// - JavaScript Algorithms – FreeCodeCamp

// Languages:
// English, Hindi, Telugu
// `;



export const generateQuestionsController = async (body) => {

  const question = await generateQuestionsService(body);

  console.log(question,'quessssssssssss')

  return question;
};
