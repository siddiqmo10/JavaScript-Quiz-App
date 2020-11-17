const startButton = document.getElementById('start-btn')
const explain1 = document.getElementById('answer1')
const endButton = document.getElementById('end-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const endContainerElement = document.getElementById('end-container')
const answerContainerElement = document.getElementById('answer-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
endButton.addEventListener('click', () => {
  window.open('https://www.hce4.com/subscribers', '_blank')
})
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})


function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - 0)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  explain1.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })

  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
    explain1.innerText = shuffledQuestions[currentQuestionIndex].explanation
    explain1.classList.remove('hide')
    
  } else {
    endButton.innerText = 'Thank you for taking our quiz\nSubscribe to our Newsletter'
    endButton.classList.remove('hide')
    explain1.innerText = shuffledQuestions[currentQuestionIndex].explanation
    explain1.classList.remove('hide')
    
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'What do you think you should put at the heart of your business in the 4th Industrial Revolution?',
    answers: [
      { text: 'Profits', correct: false },
      { text: 'New Technologies', correct: false },
      { text: 'Human Connection', correct: true},
      { text: 'Natural Resources', correct: false}
    ],
    explanation : "Human Connection is essential. At the heart of your company the human connection represents the fourth level of Maslow’s Hierarchy of needs, Esteem. It goes hand in hand with the New Technologies 4.0"
  },
  {
    question: 'Where are the HCE 4 services available?',
    answers: [
      { text: 'Europe', correct: false },
      { text: 'North America', correct: false },
      { text: 'Asia', correct: false },
      { text: 'Everywhere', correct: true }
    ],
    explanation : "The 4th Industrial Revolution does not know boarders and neither do we. As an international business, we provide services that reach all over the world"
  },
  {
    question: 'What do you think are the new Technologies?',
    answers: [
      { text: 'Biotechnology', correct: false },
      { text: 'Humanoid Robots', correct: false },
      { text: 'Atrificial Intelligence', correct: false },
      { text: 'All of the above', correct: true }
    ],
    explanation : "The Fourth Industrial Revolution, itself a product of Industry 4.0, is based on New Technologies 4.0, such as Artificial Intelligence, Biotechnologies, Humanoid Robots, etc"
  },
   {
    question: 'Are you ready for the 4th industrial revolution?',
    answers: [
      { text: 'Yes', correct: true },
      { text: 'Absolutely Yes', correct: true },
      { text: '100% Yes', correct: true },
      { text: 'I am ready', correct: true }
    ],
    explanation : "Even if you do not feel ready yet, we are ready to guide you into the 4th Industrial Revolution"
  }
  
]
