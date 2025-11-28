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
  const [interviewButton,setInterviewButton] = useState(true)

  const params = useParams();
  const id = params.id;

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
      redisId: id,
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

    setInterviewButton(false)
    
    while (true) {
      const nextQuestion = await askQuestion(question, answer);

      // console.log(nextQuestion, "question");

      await speak(nextQuestion);

      const userAnswer = await listen();

      // console.log(userAnswer, "user");

      question = nextQuestion;
      answer = userAnswer;

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
      <div className="w-full h-[70vh] flex flex-col lg:flex-row gap-3 p-5">
        <div className="lg:w-1/2 w-full h-full flex justify-center items-center rounded-[20px] bg-gradient-to-br from-fuchsia-500 to-purple-600 text-white">
          <MicroPhone isSpeaking={isInterviewerSpeaking} />
        </div>

        <div className="lg:w-1/2 w-full h-full flex justify-center items-center rounded-[20px] bg-gradient-to-br from-cyan-400 to-blue-600 text-white">
          <MicroPhone isSpeaking={isUserSpeaking} />
        </div>
      </div>

      <div className="flex gap-4 mt-6 justify-center items-center">
        {/* Start Interview Button */}
        {
          interviewButton ?

          <button
            onClick={startInterview}
            className="px-6 py-3 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 active:scale-95 transition cursor-pointer"
          >
            Start Interview
          </button>
          :
          <button
            // onClick={getResults}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 active:scale-95 transition cursor-pointer"
          >
            Get Results
          </button>
        }

      </div>
    </div>
  );
}
