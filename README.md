# 🌍 AI Travel Planner

A full-stack, premium AI-powered web application that generates highly detailed, personalized travel itineraries, complete with budget breakdowns, hotel suggestions, and smart packing lists.

## ✨ Features

- **Modern & Premium UI:** Built with Next.js, featuring glassmorphism, fluid animations, and a sleek dark theme.
- **AI-Powered Itineraries:** Integrates with Google's Gemini AI to instantly generate custom day-by-day travel plans based on user preferences.
- **Smart Fallback Mechanism:** Includes a robust fallback handler that guarantees a seamless user experience even if AI API limits are reached or keys are invalid.
- **Secure Authentication:** JWT-based user authentication and encrypted passwords with bcrypt.
- **Responsive Design:** Fully optimized for mobile, tablet, and desktop viewing.

## 🏗️ Architecture

This project is built using a decoupled architecture for maximum scalability:

- **Frontend:** Next.js (React), Tailwind CSS v3, Lucide Icons.
- **Backend:** Node.js, Express.js.
- **Database:** MongoDB (Mongoose ORM).
- **AI Integration:** Google Generative AI SDK (@google/generative-ai).

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas Account (or local MongoDB instance)
- Google Gemini API Key

### 1. Clone the repository
bash
git clone https://github.com/yourusername/ai-travel-planner.git
cd ai-travel-planner


### 2. Setup the Backend
Open a terminal and navigate to the backend directory:
bash
cd backend
npm install


Create a .env file in the backend directory with the following variables:
env
PORT=5000
MONGO_URI=mongodb+srv://rushibhosale1818_db_user:NW9UGiIRmIhhmtet@cluster0.hla5biy.mongodb.net/ai-travel-planner?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=super_secret_travel_key_999
GEMINI_API_KEY=your_gemini_api_key


Start the backend server:
bash
node index.js

### 3. Setup the Frontend
Open a new terminal and navigate to the frontend directory:
bash
cd frontend
npm install --legacy-peer-deps


Start the frontend development server:
bash
npm run dev


### 4. Explore
Open your browser and navigate to http://localhost:3000. Create an account and start planning your next adventure!

## 🧪 Engineering Decisions

1. **Decoupled Architecture:** Separating the frontend and backend allows for independent scaling and easier maintenance.
2. **Robust Error Handling & Fallbacks:** Designed with defensive programming in mind. If the AI service fails, the backend catches the error and serves a heavily structured mock payload to ensure the UI never breaks for the end user.
3. **Optimized Animations:** Used pure CSS and Tailwind utility classes for animations to avoid heavy JavaScript animation libraries, keeping the bundle size small and performance high.

---
*Built as a Full-Stack Engineering Assessment.*
