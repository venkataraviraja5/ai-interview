"use client";

import { useState, useRef } from "react";
import usePost from "../hooks/usepost";
import { MicroPhone } from "../components/MicroPhone";
import { useParams } from "next/navigation";
import Modal from "../components/Modal";
import { useRouter } from "next/navigation";

export default function Interview() {
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [currentAnswer, setCurrentAnswer] = useState("");
  const { loading, error, response, postData } = usePost();
  const [isUserSpeaking, setUserSpeaking] = useState(false);
  const [isInterviewerSpeaking, setIsInterviewerSpeaking] = useState(false);
  const [interviewButton, setInterviewButton] = useState(true);
  const isInterviewRunning = useRef(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [feedBack, setFeedBack] = useState("");
  const {
    loading: feedBackLoading,
    error: feedBackError,
    response: feedBackResponse,
    postData: feedBackPostData,
  } = usePost();

  const params = useParams();
  const id = params.id;
  const router = useRouter();

  //speak function
  const speak = (text) => {
    return new Promise((resolve) => {
      const utter = new SpeechSynthesisUtterance(text);

      utter.onstart = () => {
        setIsInterviewerSpeaking(true);
      }
      
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

      recognition.onspeechstart = () => {
        setUserSpeaking(true);
      };

      recognition.onspeechend = () => {
        setUserSpeaking(false);
      };

      recognition.onresult = (e) => {
        const text = e.results[0][0].transcript;
        // console.log("User said:", text);
        resolve(text);
      };

      recognition.onerror = (err) => {
        // console.error(err);
        resolve("");
      };

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
    isInterviewRunning.current = true;

    let question = currentQuestion;
    let answer = currentAnswer;

    setInterviewButton(false);

    if (!isInterviewRunning.current) {
      setIsInterviewerSpeaking(false);
      setUserSpeaking(false);
    }

    while (isInterviewRunning.current) {
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

  //interview result function

  const getInterviewResult = async () => {
    isInterviewRunning.current = false;

    setIsModalOpen(true);

    const apiResponse = await feedBackPostData("/api/result", {
      redisId: id,
    });

    if (apiResponse) {
      setFeedBack(apiResponse.result);
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen">
      <div className="w-full h-[70vh] flex flex-col lg:flex-row gap-3 p-5">
        <div className="lg:w-1/2 w-full h-full flex justify-center items-center rounded-[20px] bg-gradient-to-br from-fuchsia-500 to-purple-600 text-white">
          <div className="flex flex-col justify-center items-center font-bold">
            <MicroPhone isSpeaking={isInterviewerSpeaking} />
            <span>AI </span>
          </div>
        </div>

        <div className="lg:w-1/2 w-full h-full flex justify-center items-center rounded-[20px] bg-gradient-to-br from-cyan-400 to-blue-600 text-white">
          <div className="flex flex-col justify-center items-center font-bold">
            <MicroPhone isSpeaking={isUserSpeaking} />
            <span>You</span>
          </div>
        </div>
      </div>

      <div className="flex gap-4 mt-6 justify-center items-center">
        {/* Start Interview Button */}
        {interviewButton ? (
          <button
            onClick={startInterview}
            className="px-6 py-3 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 active:scale-95 transition cursor-pointer"
          >
            Start Interview
          </button>
        ) : (
          <button
            onClick={getInterviewResult}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 active:scale-95 transition cursor-pointer"
          >
            Get Results
          </button>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          router.push("/upload");
        }}
        data={feedBack}
        loading={feedBackLoading}
      />
    </div>
  );
}
