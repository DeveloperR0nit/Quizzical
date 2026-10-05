import "./Question.css";
import { decode } from "html-entities";
export default function Question(props) {
  const optionsArr = props.options.map((option, index) => {

    // Checking if the current page is questions page or answers page and rendering button design based on the following

    if (!props.questionsPage) {
      function answer() {
        if (
          props.selectedAnswerObj[props.index] === option &&
          props.selectedAnswerObj[props.index] !== props.answer
        ) {
          return "incorrect";
        }
        if (option == props.answer) {
          return "correct";
        }
      }
      return (
        <button className={`option-btn fade ${answer()}`} key={index}>
          {decode(option)}
        </button>
      );
    } else {
      return (
        <button
          className={`option-btn ${props.selectedAnswerObj[props.index] === option ? "active" : ""}`}
          key={index}
          onClick={() => props.onClick(props.index, option)}
        >
          {decode(option)}
        </button>
      );
    }
  });

  // Rendering

  return (
    <div className="question-box">
      <h3>{decode(props.question)}</h3>
      <div className="buttons">{optionsArr}</div>
    </div>
  );
}
