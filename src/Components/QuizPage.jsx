import React, { useEffect, useState } from "react";
import "./QuizPage.css";
   

export default function QuizPage({ ques, new_quiz }) {
  const quizQuestions = ques;

  const len = ques.length;

  const [currquestion, setcurrquestion] = useState("");
  const [count, setCount] = useState(0);
  const [score, setScore] = useState(0);
  const [options, setOptions] = useState([]);
  const [correctanswer, setCorrectanswer] = useState("");
  const [selectedOption, setSelectedOption] = useState("");

  const setParameters = () => {
    if (count < len) {
      setcurrquestion(quizQuestions[count].question);
      setCorrectanswer(quizQuestions[count].correct_answer);
      setSelectedOption("");

      var val = [
        ...quizQuestions[count].incorrect_answers,
        quizQuestions[count].correct_answer,
      ];

      val = val.sort(() => Math.random() - 0.5);

      setOptions(val);
    } else {
      setcurrquestion("");
      setOptions([]);
      setSelectedOption("");
      setCorrectanswer("");
    }

    // console.log(count, " ques ", currquestion);
  };

  const nextQuestion = () => {
    if (count == len) {
      setScore(0);
      setCount(0);
      return;
    } else if (selectedOption === "") {
      alert("Select an option");
      return;
    } else if (selectedOption === correctanswer) setScore((prev) => prev + 1);

    setCount((prev) => prev + 1);

    // console.log("current count", count);
  };

  useEffect(() => setParameters(), [count]);
  

  return (
    <div className="main-container">

        
      {count<len ? <h2>Answer all the questions</h2>:
      
      score<=len/2?<h2>You are a noob</h2>:<h2>Yeah! Great</h2>}

      {count < len ? (      

            <div className="Question" >
           <span>Q {count + 1}</span>
            <span>{currquestion}</span>
            
          <div className="options-container">
            
            {options.map((option, index) => (
              <input
                className={`option ${
                  selectedOption === option ? "selected" : ""
                }`}
                type="button"
                key={index}
                value={option}
                onClick={(e) => setSelectedOption(e.target.value)}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="score">
          your score is :{score}/{len}
        </div>
          )
      }

    

      <div className="btns">
        <button className="sub-button" onClick={nextQuestion}>
          {count < len - 1 ? "next" : count == len ? "Retry" : "Submit"}
        </button>
        {count == len && (
          <button onClick={new_quiz} className="sub-button">
            take other quiz
          </button>
        )}
      </div>

      
    </div>
  );
}
