import { useState } from "react";
import HomePage from "./components/HomePage";
import QuestionsPage from "./components/QuestionsPage";
export default function App() {
  const [questionsPage, setQuestionsPage] = useState("home");
  return (
    <div className="container">
      {questionsPage === "home" && (
        <HomePage onClick={() => setQuestionsPage(true)} />
      )}
      {questionsPage !== "home" && (
        <QuestionsPage
          revealAnswers={() => setQuestionsPage((prev) => !prev)}
          playAgain={() => setQuestionsPage((prev) => !prev)}
          questionsPage={questionsPage}
        />
      )}
    </div>
  );
}
