"use client"

import { useEffect,useState } from "react";
import usePost from "../hooks/usepost";
import axios from "axios";

export default function Interview() {
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [resume, setResume] = useState();
  const { loading, error, response, postData } = usePost();

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

      setTimeout(() => {
        recognition.stop();
        resolve(""); // Resolve with empty string if no speech detected
      }, 10000);

      recognition.start();
    });
  };

  //ask question function
  const askQuestion = async (prevQuestion, answer) => {
   
    // const response = await axios.post('/api/interview',{
    //     prevQuestion,
    //     answer
    // })

    await postData('/api/interview',{
        prevQuestion,
        answer
    })

    // if

    // console.log(response.data,'api calllllllllllll')

    // return response.data.question

    // if (response && response.question) {
    //   return response.question;  // If question exists in response
    // } else {
    //   return "END"; // Default to "END" if no question is received
    // }

    console.log("API Response:", response);

    // Return the next question based on the API response
    if (response && response.data && response.data.question) {
      return response.data.question; // If the question exists in the response, return it
    } else {
      return "END"; // Default to "END" if no question is returned
    }

    return
  };

  const startInterview = async () => {
    while (true) {
      const nextQuestion = await askQuestion(currentQuestion, currentAnswer);

      console.log(response, "questionnnnnnnnnnn");

      await speak(nextQuestion);

      const userAnswer = await listen();

      console.log(userAnswer, "uiserrrrrrr");

      setCurrentAnswer(userAnswer);
      setCurrentQuestion(nextQuestion);

      if (!nextQuestion || nextQuestion === "END") {
        await speak("Thank you, the interview is completed.");
        break;
      }
    }
  };

// useEffect(() => {
//     const runInterview = async () => {
//       await startInterview();
//       console.log(response,'usefedffffffffffff')
//     };

//     runInterview(); // Start the interview once the component is mounted
//   }, []); // Empty

  return (
    <div>
    <div className="w-full h-screen flex">
      <div className="w-1/2 bg-red-200 h-full flex justify-center items-center">
        Left Half
      </div>

      <div className="w-1/2 bg-blue-200 h-full flex justify-center items-center">
        Right Half
      </div>
    </div>
      <button onClick={startInterview}>start interveiw</button>
    </div>
  );
}
