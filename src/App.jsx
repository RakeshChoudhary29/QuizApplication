import { useState } from 'react'
import './App.css'
import QuizPage from './Components/QuizPage'
import axios from 'axios'

export default function App() {


  const buttons=[{name:"Cartoon & Animation",id:32},{name:'Animals',id:27},
                 {name:"Celebrity",id:26},{name:"Sports",id:21},{name:"General Knowledge",id:9},{name:"Computers",id:18},{name:"Science & Nature ",id:17},{name:"Film",id:11}]

  
  const [question , setQuestion]=useState([]);
  const [quizStarted, setQuizStarted] = useState(false);


  const newQuiz = ()=>{ setQuizStarted(false);   }


  const GenerateQuiz = async (para) => { 
    try {
    // Set loading to true when fetching data
    

      const response = await axios.get('https://opentdb.com/api.php', {
        params: {
          amount: para[0],
          category: para[1],
          difficulty: para[2],
          type: para[3]
        }
      });

      const transformedQuestions = response.data.results.map(val => ({
        question: val.question,
        correct_answer: val.correct_answer,
        incorrect_answers: val.incorrect_answers
      }));

      setQuestion(transformedQuestions); // Update state with fetched questions
    
      
    } catch (error) {
      console.error("Got some error", error);
    } finally {
     
      setQuizStarted(true);// Set loading to false after data fetching completes (whether success or error)
    }
  };
  
  return (
    <main>

      <h1>The Quiz</h1>

      
      { !quizStarted && <div className='buttons-container'>

     

        <div className='quiz-options'>

          <div className='instruction'>
            
            <h2>Choose any quiz you want to take </h2>
            
          </div> 
        

           <div className='quiz-buttons'>
             
           { buttons.map((option, index)=>{ 

            return (
              <button 
                key={index}
                value={option.name}
                
                onClick ={()=>GenerateQuiz([10,option.id,'easy','multiple'])}>{option.name}</button>
            )      
        })}

        </div>
          </div>
      </div>}
  

     {quizStarted && <QuizPage ques={question} new_quiz={newQuiz}/>}   
      
    </main>
  )
}
