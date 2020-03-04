import React from 'react';
import './App.css';
import QuizQuestion from './components/QuizQuestion'
import questions from './questions.json'

const TITLE_STATE = 0
const QUESTION_STATE = 1
const TIME_LIMIT = 10
const FINAL_STATE = 2

class TitlePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {titleText: "Welcome to our Quiz!",
    currentState: TITLE_STATE,
    counter: 0,
    currentQuestion: 0}
    this.counter = 0
    this.timeLimit = TIME_LIMIT
  }
  
  nextQuestion(correct) {
    if (correct) {
      this.setState({score: this.state.score+1})
    }
    
    if(this.state.currentQuestion === questions.length - 1) {
      console.log("done")
    } else {
    clearInterval(this.timer)
    this.setState({
      titleText: "You answered Early!",
      currentState: FINAL_STATE,
      currentQuestion: this.state.currentQuestion + 1
    })
  }
}

start() {
  console.log("Starting!")
  this.setState({counter:0})
  this.setState({currentState: QUESTION_STATE})
  this.timer = setInterval(() => {
    console.log("INTERVAL CALLED")
    this.setState({counter: this.state.counter+1})
    if (this.state.counter < this.timeLimit) {
      this.setState({titleText: "Begin the quiz!" + this.state.counter})
    } else {
      this.setState({titleText: "Time's up!"})
      clearInterval(this.timer)
    }
  }, 1000);

}
render(props) {
  return (
    <div className="App">
    <div>{this.timeLimit - this.state.counter}</div>
    {(this.state.currentState === QUESTION_STATE) ? 
      <QuizQuestion answers={questions[this.state.currentQuestion].possibleAnswers}
      question={questions[this.state.currentQuestion].question}
      nextQuestion={(correct) => this.nextQuestion(correct)} />
      :
      <h1 className='title'>{this.state.titleText}</h1>}
      <input id='startButton' type="button" value="start" onClick={() => this.start()}></input>
    </div>
    )
  }
}

function App() {
  return (
    <TitlePage />
  );
}

export default App;
