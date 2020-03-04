import React from 'react'

class QuizQuestion extends React.Component {
  render() {
    return(
      <>
        <h2>{this.props.question}</h2>
        {this.props.answers.map((v, i) => {
          return <input type="button"
          value={v.text} key={i}
          className="answerButton"
          onClick={(correct) => this.props.nextQuestion(correct)}></input>
        })}
      </>
    )
  }
}

export default QuizQuestion