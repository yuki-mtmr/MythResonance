import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Quiz from './pages/Quiz'
import Result from './pages/Result'
import './App.css'

function App() {
  const [answers, setAnswers] = useState<number[]>([])

  return (
    <div className="app-wrapper">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<Quiz setFinalAnswers={setAnswers} />} />
        <Route path="/result" element={<Result answers={answers} />} />
      </Routes>
    </div>
  )
}

export default App
