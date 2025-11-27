"use client";

import { useState } from "react";
import usePost from "../hooks/usepost";
import { MicroPhone } from "../components/MicroPhone";
import { useParams } from "next/navigation";

export default function Interview() {
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [currentAnswer, setCurrentAnswer] = useState("");
  const { loading, error, response, postData } = usePost();
  const [isUserSpeaking, setUserSpeaking] = useState(false);
  const [isInterviewerSpeaking, setIsInterviewerSpeaking] = useState(false);

  const params = useParams()
  const id = params.id

  //speak function
  const speak = (text) => {
    return new Promise((resolve) => {
      const utter = new SpeechSynthesisUtterance(text);

      setIsInterviewerSpeaking(true);
      utter.onend = () => {
        resolve();
        setIsInterviewerSpeaking(false);
      }; // Continue only after speaking ends

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
        // console.log("User said:", text);
        resolve(text);
      };

      recognition.onerror = (err) => {
        // console.error(err);
        resolve("");
      };

      setUserSpeaking(true);
      recognition.start();

      // Resolve with empty string if no speech detected
      setTimeout(() => {
        recognition.stop();
        setUserSpeaking(false);
        resolve("");
      }, 10000);
    });
  };

  //ask question function
  const askQuestion = async (prevQuestion, answer) => {
    const apiResponse = await postData("/api/interview", {
      redisId:id,
      prevQuestion,
      answer,
    });


    if (apiResponse) {
      return apiResponse.question;
    }

  };

  //start interview function
  const startInterview = async () => {
    
    let question = currentQuestion;
    let answer = currentAnswer;

    while (true) {
      const nextQuestion = await askQuestion(question,answer);

      // console.log(nextQuestion, "question");

      await speak(nextQuestion);

      const userAnswer = await listen();

      // console.log(userAnswer, "user");

      question = nextQuestion
      answer = userAnswer

      setCurrentAnswer(userAnswer);
      setCurrentQuestion(nextQuestion);

      if (!nextQuestion || nextQuestion === "END") {
        await speak("Thank you, the interview is completed.");
        break;
      }
    }
  };

  return (
    <div>
      <div className="w-full h-screen flex">
        <div className="w-1/2 bg-red-200 h-full flex justify-center items-center">
          <MicroPhone isSpeaking={isInterviewerSpeaking} />
        </div>

        <div className="w-1/2 bg-blue-200 h-full flex justify-center items-center">
          <MicroPhone isSpeaking={isUserSpeaking} />
        </div>
      </div>
      <button onClick={startInterview}>start interveiw</button>
    </div>
  );
}
