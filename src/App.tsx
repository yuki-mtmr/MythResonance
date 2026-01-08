import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Quiz from './pages/Quiz'
import Result from './pages/Result'
import './App.css'

function App() {
  const [answers, setAnswers] = useState<number[]>([])
  const [mode, setMode] = useState<'mythology' | 'dark'>('mythology')

  return (
    <div className="app-wrapper">
      <Routes>
        <Route path="/" element={<Home setMode={setMode} />} />
        <Route path="/quiz" element={<Quiz setFinalAnswers={setAnswers} mode={mode} />} />
        <Route path="/result" element={<Result answers={answers} mode={mode} />} />
      </Routes>
    </div>
  )
}

export default App
