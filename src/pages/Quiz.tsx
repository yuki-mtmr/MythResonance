import { useState, FC } from 'react';
import { useNavigate } from 'react-router-dom';
import questionsData from '../data/questions.json';
import { Question } from '../lib/scoring';

interface QuizProps {
  setFinalAnswers: (answers: number[]) => void;
}

const Quiz: FC<QuizProps> = ({ setFinalAnswers }) => {
  const navigate = useNavigate();
  const questions = questionsData as Question[];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);

  const handleOptionClick = (optionIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentIndex] = optionIndex;
    setAnswers(newAnswers);

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setFinalAnswers(newAnswers);
      navigate('/result');
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      navigate('/');
    }
  };

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  return (
    <div className="quiz-container fade-in">
      <div className="progress-bar-container">
        <div className="progress-bar" style={{ width: `${progress}%` }}></div>
        <span className="progress-text">{currentIndex + 1} / {questions.length}</span>
      </div>

      <div className="question-card">
        <h2 className="question-text">{currentQuestion.text}</h2>
        <div className="options-container">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              className={`option-button ${answers[currentIndex] === index ? 'selected' : ''}`}
              onClick={() => handleOptionClick(index)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="navigation-buttons">
        <button className="back-button" onClick={handleBack}>
          {currentIndex === 0 ? '戻る' : '前へ'}
        </button>
      </div>
    </div>
  );
};

export default Quiz;
