"use client";

import axios from "axios";
import { useState } from "react";
import usePost from "../hooks/usepost";
import { useRouter } from "next/navigation";


export default function Upload() {
 
const [currentQuestion,setCurrentQuestion] = useState('')
const [currentAnswer,setCurrentAnswer] = useState('')
const [resume,setResume] = useState()
const { loading, error, response, postData } = usePost();
const router = useRouter()

//speak function
const speak = (text) => {
  return new Promise((resolve) => {
    const utter = new SpeechSynthesisUtterance(text);

    utter.onend = () => resolve(); // Continue only after speaking ends

    speechSynthesis.speak(utter);
  });
};


//listen function
const listen = () => {
  return new Promise((resolve) => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (e) => {
      const text = e.results[0][0].transcript;
      console.log("User said:", text);
      resolve(text);
    };

    recognition.onerror = (err) => {
      console.error(err);
      resolve(""); // still continue loop
    };

    recognition.start();
  });
};

//ask question function
  const askQuestion = async(prevQuestion, answer) => {
    const response = await axios.post('/api/interview',{
        prevQuestion,
        answer
    })

    console.log(response.data)

    return response.data.question

  }

  //start interview

  // const startInterview = async() => {
  //   while(true){

  //      const nextQuestion = await askQuestion(currentQuestion,currentAnswer)

  //      console.log(nextQuestion,'questionnnnnnnnnnn')

  //      await speak(nextQuestion)

  //      const userAnswer = await listen()

  //      console.log(userAnswer,'uiserrrrrrr')

  //      setCurrentAnswer(userAnswer)
  //      setCurrentQuestion(nextQuestion)

  //      if (!nextQuestion || nextQuestion === "END") {
  //       await speak("Thank you, the interview is completed.");
  //       break;
  //      }
  //   }
  // }


  //start interview 

  const startInterview = () => {
    router.push('/interview')
  }

  
  //upload file

  const uploadResume = async (e) => {
    const file = e.target.files?.[0];

    if (!file) {
      console.log("No file selected");
      return;
    }

    setResume(file)

    await postData("/api/upload", { resume: file }, true);

    console.log("Generated Questions:", response);
};


 
  return (

     <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start p-10 gap-12">

      {/* ---- RESUME UPLOAD SECTION ---- */}
      <div className="bg-white rounded-2xl shadow-lg p-10 w-full max-w-xl">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          📄 Upload Your Resume
        </h2>

        <label
          className="flex items-center gap-4 border-2 border-dashed border-gray-400 rounded-xl p-6 cursor-pointer hover:border-black transition"
        >
          <input
            type="file"
            accept="application/pdf"
            className="hidden"
            onChange={uploadResume}
          />
          <div className="text-lg text-gray-700">
            Click to choose a PDF resume
          </div>
        </label>
      </div>

      
      {resume && (
        <button
          onClick={startInterview}
          className="px-8 py-4 bg-black text-white text-xl font-semibold rounded-2xl 
                    hover:bg-gray-900 active:scale-95 transition-all shadow-md"
        >
          🎙️ Start Interview
        </button>
      )}


    </div>
  );
}
