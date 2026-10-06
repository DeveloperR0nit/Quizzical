import Question from "./Question";
import "./QuestionsPage.css";
import { useState, useEffect } from "react";
export default function QuestionsPage(props) {
  
  // State Variables

  const [resetQuestions, setResetQuestions] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [randomNosArr, setRandomNosArr] = useState([]);
  const [selectedAnswerObj, setSelectedAnswerObj] = useState({});
  const [error, setError] = useState(false);

  // Derived Variables

  const { amt, category, difficulty } = props.questionSettings;
  const returnCategory = category === "any" ? "" : `&category=${category}`;
  const returnDifficulty =
    difficulty === "any" ? "" : `&difficulty=${difficulty}`;

  // Functions

  function resetQuiz() {
    setResetQuestions((prev) => !prev);
    setQuestions([]);
    setRandomNosArr([]);
    setSelectedAnswerObj({});
  }
  function correctAnswers() {
    let count = 0;
    Object.entries(selectedAnswerObj).forEach(([key, value]) => {
      if (value === questions[key].correct_answer) {
        count++;
      }
    });
    return count;
  }

  // Fetching Data from API

  useEffect(() => {
    const fetchQuestions = () => {
      fetch(
        `https://opentdb.com/api.php?amount=${amt}${returnCategory}${returnDifficulty}&type=multiple`,
      )
        .then((res) => {
          if (!res.ok) {
            throw new Error(`HTTP Error: ${res.status}`);
          }
          return res.json();
        })
        .then((data) => {
          setQuestions(data.results);
          const arrRandomNos = [];
          for (let i = 0; i < data.results.length; i++) {
            arrRandomNos.push(Math.floor(Math.random() * 4));
          }
          setRandomNosArr(arrRandomNos);
          setError(false);
        })
        .catch((error) => {
          console.error("Failed to fetch questions:", error);
          setError(true);
          setTimeout(() => {
            fetchQuestions();
          }, 6000);
        });
    };
    fetchQuestions();
  }, [resetQuestions, amt, returnCategory, returnDifficulty]);

  // Getting all the questions from Question element

  const allQuestions = questions.map((q, index) => {
    const optionsArr = [...q.incorrect_answers];
    optionsArr.splice(randomNosArr[index], 0, q.correct_answer);
    return (
      <Question
        question={q.question}
        options={optionsArr}
        answer={q.correct_answer}
        key={index}
        index={index}
        onClick={(id, ans) =>
          setSelectedAnswerObj((prev) => ({ ...prev, [id]: ans }))
        }
        selectedAnswerObj={selectedAnswerObj}
        questionsPage={props.questionsPage}
      />
    );
  });

  // Rendering

  return (
    <div className="questions-page-wrapper">
      {allQuestions.length === 0 && !error && <div className="loader"></div>}
      {allQuestions}
      {props.questionsPage && allQuestions.length > 0 && (
        <button className="primary-btn" onClick={props.revealAnswers}>
          Check answers
        </button>
      )}
      {!props.questionsPage && allQuestions.length > 0 && (
        <div className="answers-box">
          <p>
            You scored {correctAnswers()}/{questions.length} correct answers
          </p>
          <div className="btn-box">
            <button
              className="primary-btn"
              onClick={() => {
                props.playAgain();
                resetQuiz();
              }}
            >
              Play again
            </button>
            <button
              className="primary-btn"
              onClick={() => {
                props.returnToHome();
              }}
            >
              Home
            </button>
          </div>
        </div>
      )}
      {error && (
        <>
          <p className="error-msg">
            Please wait for atleast 5 seconds before trying again 😥
          </p>
          <div className="loader"></div>
        </>
      )}
    </div>
  );
}
