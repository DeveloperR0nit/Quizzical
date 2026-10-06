import { useState } from "react";
import HomePage from "./components/HomePage";
import QuestionsPage from "./components/QuestionsPage";
export default function App() {
  const [questionsPage, setQuestionsPage] = useState("home");
  const [questionSettings,setQuestionSettings] = useState({})
  return (
    <div className="container">
      {questionsPage === "home" && (
        <HomePage onClick={() => setQuestionsPage(true)} setQuestionSettings={(e) => setQuestionSettings(e)}/>
      )}
      {questionsPage !== "home" && (
        <QuestionsPage
          revealAnswers={() => setQuestionsPage((prev) => !prev)}
          playAgain={() => setQuestionsPage((prev) => !prev)}
          returnToHome={() => setQuestionsPage("home")}
          questionsPage={questionsPage}
          questionSettings={questionSettings}
        />
      )}
    </div>
  );
}
