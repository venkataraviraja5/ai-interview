"use client";
import { FaRobot, FaBolt, FaMicrophoneAlt, FaCheckCircle,FaLinkedin} from "react-icons/fa";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <section className="flex flex-col items-center text-center md:py-28 py-10 px-6">
        <FaRobot className="text-teal-400 mb-6" size={90} />

        <h1 className="md:text-5xl text-[17px] font-extrabold mb-4 leading-tight">
          AI Interview Assistant  
          <span className="text-teal-400 block">Ace Your Next Interview</span>
        </h1>

        <p className="text-gray-300 max-w-2xl mb-8 text-lg">
          Practice real-time AI-powered mock interviews, get instant feedback, and level up your skills.
        </p>

        <button className="bg-teal-500 hover:bg-teal-600 px-8 py-4 rounded-xl text-lg font-semibold transition">
          Start your AI Interview →
        </button>
      </section>

      {/* Features */}
      <section className="md:py-20 py-10 bg-gray-800">
        <h2 className="md:text-4xl text-[20px] font-bold text-center mb-12">Why Choose Us?</h2>

        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto px-6">
          <div className="bg-gray-700 p-8 rounded-2xl text-center hover:bg-gray-600 transition">
            <FaMicrophoneAlt size={50} className="mx-auto text-teal-400 mb-4" />
            <h3 className="lg:text-2xl text-[15px] font-semibold mb-2">Real-Time Voice Interviews</h3>
            <p className="text-gray-300">
              Speak with an AI interviewer that responds just like a real human.
            </p>
          </div>

          <div className="bg-gray-700 p-8 rounded-2xl text-center hover:bg-gray-600 transition">
            <FaBolt size={50} className="mx-auto text-yellow-400 mb-4" />
            <h3 className="lg:text-2xl text-[15px] font-semibold mb-2">Instant Feedback</h3>
            <p className="text-gray-300">
              Get strengths, mistakes, and improvement tips instantly.
            </p>
          </div>

          <div className="bg-gray-700 p-8 rounded-2xl text-center hover:bg-gray-600 transition">
            <FaCheckCircle size={50} className="mx-auto text-green-400 mb-4" />
            <h3 className="lg:text-2xl text-[15px] font-semibold mb-2">Industry-Specific Roles</h3>
            <p className="text-gray-300">
              Choose interviews tailored to tech, finance, healthcare, design, and more.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center bg-gray-900">
        <h2 className="md:text-4xl text-[15px] font-bold mb-6">
          Ready to Master Your Next Interview?
        </h2>

        <button className="bg-teal-500 hover:bg-teal-600 px-10 py-4 rounded-xl text-lg font-semibold transition">
          Get Started Now
        </button>
      </section>

      <footer className="bg-gray-800 py-8 mt-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between px-6">
          
          {/* LinkedIn */}
          <a 
            href="https://www.linkedin.com/in/your-profile" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-300 hover:text-teal-400 transition"
          >
            <FaLinkedin size={26} />
            <span className="text-lg">Connect on LinkedIn</span>
          </a>

          {/* Copyright */}
          <p className="text-gray-400 mt-4 md:mt-0 text-center">
            © {new Date().getFullYear()} AI Interview Assistant. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
