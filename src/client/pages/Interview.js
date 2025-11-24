"use client";

import axios from "axios";
import { useState } from "react";


export default function InterviewPage() {
 
const [currentQuestion,setCurrentQuestion] = useState('')
const [currentAnswer,setCurrentAnswer] = useState('')

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

  const startInterview = async() => {
    while(true){

       const nextQuestion = await askQuestion(currentQuestion,currentAnswer)

       console.log(nextQuestion,'questionnnnnnnnnnn')

       await speak(nextQuestion)

       const userAnswer = await listen()

       console.log(userAnswer,'uiserrrrrrr')

       setCurrentAnswer(userAnswer)
       setCurrentQuestion(nextQuestion)

       if (!nextQuestion || nextQuestion === "END") {
        await speak("Thank you, the interview is completed.");
        break;
       }
    }
  }

  //upload file

  const uploadResume = async (e) => {
    const file = e.target.files?.[0];

  if (!file) {
    console.log("No file selected");
    return;
  }

  const formData = new FormData();
  formData.append("resume", file, file.name);

    const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
    });

    const data = await res.json();
    console.log("Generated Questions:", data.questions);
};


   const [text, setText] = useState("");

  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

    let fullText = "";

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      const strings = content.items.map((item) => item.str).join(" ");
      fullText += strings + "\n";
    }


    console
    setText(fullText);
  };

  return (
    <div>
      <div style={{ padding: 30 }}>
      <h1>Step 1: Mic Test</h1>

      <button
        onClick={startInterview}
        style={{
          padding: "12px 20px",
          fontSize: 18,
          background: "black",
          color: "white",
          borderRadius: 8,
          cursor:"pointer"
        }}
      >
        Start Microphone
      </button>

      {/* <audio ref={audioRef} controls /> */}
    </div>

    <div>
      <input type="file" accept="application/pdf" onChange={uploadResume} />
      {/* <pre>{text}</pre> */}
    </div>

    </div>
  );
}
