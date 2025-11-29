"use client";
import {
  FaRobot,
  FaBolt,
  FaMicrophoneAlt,
  FaCheckCircle,
  FaLinkedin,
  FaGithub,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
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
          Practice real-time AI-powered mock interviews, get instant feedback,
          and level up your skills.
        </p>

        <button className="bg-teal-500 hover:bg-teal-600 px-8 py-4 rounded-xl text-lg font-semibold transition cursor-pointer"
          onClick={() => router.push('/upload')}
        >
          Start your AI Interview →
        </button>
      </section>

      {/* Features */}
      <section className="md:py-20 py-10 bg-gray-800">
        <h2 className="md:text-4xl text-[20px] font-bold text-center mb-12">
          Why Choose Us?
        </h2>

        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto px-6">
          <div className="bg-gray-700 p-8 rounded-2xl text-center hover:bg-gray-600 transition">
            <FaMicrophoneAlt size={50} className="mx-auto text-teal-400 mb-4" />
            <h3 className="lg:text-2xl text-[15px] font-semibold mb-2">
              Real-Time Voice Interviews
            </h3>
            <p className="text-gray-300">
              Speak with an AI interviewer that responds just like a real human.
            </p>
          </div>

          <div className="bg-gray-700 p-8 rounded-2xl text-center hover:bg-gray-600 transition">
            <FaBolt size={50} className="mx-auto text-yellow-400 mb-4" />
            <h3 className="lg:text-2xl text-[15px] font-semibold mb-2">
              Instant Feedback
            </h3>
            <p className="text-gray-300">
              Get strengths, mistakes, and improvement tips instantly.
            </p>
          </div>

          <div className="bg-gray-700 p-8 rounded-2xl text-center hover:bg-gray-600 transition">
            <FaCheckCircle size={50} className="mx-auto text-green-400 mb-4" />
            <h3 className="lg:text-2xl text-[15px] font-semibold mb-2">
              Industry-Specific Roles
            </h3>
            <p className="text-gray-300">
              Choose interviews tailored to tech, finance, healthcare, design,
              and more.
            </p>
          </div>
        </div>
      </section>

      <footer className="bg-gray-800 py-10 mt-10">
        <div className="max-w-6xl mx-auto px-6">
          {/* Social Links */}
          <div className="flex flex-wrap justify-center md:justify-between gap-8 md:gap-10 mb-6">
            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/raviraja2000/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-300 hover:text-teal-400 transition"
            >
              <FaLinkedin size={26} />
              <span className="text-lg">LinkedIn</span>
            </a>

            {/* GitHub */}
            <a
              href="https://github.com/venkataraviraja5"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-300 hover:text-teal-400 transition"
            >
              <FaGithub size={26} />
              <span className="text-lg">GitHub</span>
            </a>

            {/* Gmail */}
            <a
              href="venkataraviraja5@gmail.com"
              className="flex items-center gap-2 text-gray-300 hover:text-teal-400 transition"
            >
              <FaEnvelope size={26} />
              <span className="text-lg">venkataraviraja5@gmail.com</span>
            </a>

            {/* Mobile */}
            <a
              href="tel:+917989691817"
              className="flex items-center gap-2 text-gray-300 hover:text-teal-400 transition"
            >
              <FaPhone size={26} />
              <span className="text-lg">+917989691817</span>
            </a>
          </div>

          {/* Copyright */}
          <p className="text-gray-400 text-center text-sm md:text-base">
            © {new Date().getFullYear()} AI Interview Assistant. All rights
            reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
