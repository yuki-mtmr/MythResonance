import { useEffect, useState, FC } from 'react';
import { useNavigate } from 'react-router-dom';
import deitiesData from '../data/deities.json';
import questionsData from '../data/questions.json';
import { computeResult, Deity, Question } from '../lib/scoring';

interface ResultProps {
  answers: number[];
}

const Result: FC<ResultProps> = ({ answers }) => {
  const navigate = useNavigate();
  const [resultDeity, setResultDeity] = useState<Deity | null>(null);

  useEffect(() => {
    if (answers.length < 10) {
      navigate('/'); // Go back if no answers
      return;
    }
    const result = computeResult(answers, questionsData as Question[], deitiesData as Deity[]);
    setResultDeity(result);
  }, [answers, navigate]);

  if (!resultDeity) return <div className="loading">魂の共鳴を解析中...</div>;

  const handleShareX = () => {
    const text = encodeURIComponent(resultDeity.share_text);
    const url = encodeURIComponent(window.location.origin + window.location.pathname);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
  };

  const handleCopy = () => {
    const text = `${resultDeity.share_text}\n${window.location.origin + window.location.pathname}`;
    navigator.clipboard.writeText(text);
    alert('結果をクリップボードにコピーしました');
  };

  return (
    <div className="result-container fade-in">
      <header className="result-header">
        <p className="result-label">あなたと共鳴する神は</p>
        <h1 className="deity-name">{resultDeity.name}</h1>
        <p className="pantheon">[{resultDeity.pantheon}]</p>
      </header>

      <div className="keyword-chips">
        {resultDeity.vibe_keywords.map((kw, i) => (
          <span key={i} className="chip">{kw}</span>
        ))}
      </div>

      <section className="result-section">
        <h3>概要</h3>
        <p>{resultDeity.summary}</p>
      </section>

      <div className="result-grid">
        <section className="result-section">
          <h3>強み</h3>
          <ul>
            {resultDeity.strengths.map((s, i) => <li key={i}>{s}</li>)}
          </ul>
        </section>

        <section className="result-section">
          <h3>注意点</h3>
          <ul>
            {resultDeity.pitfalls.map((p, i) => <li key={i}>{p}</li>)}
          </ul>
        </section>
      </div>

      <section className="result-section alignment-tips">
        <h3>波動を整えるアドバイス</h3>
        <ul>
          {resultDeity.alignment_tips.map((tip, i) => <li key={i}>{tip}</li>)}
        </ul>
      </section>

      <div className="share-actions">
        <button className="share-button x-button" onClick={handleShareX}>
          Xで結果を共有
        </button>
        <button className="share-button copy-button" onClick={handleCopy}>
          結果をコピー
        </button>
      </div>

      <button className="retry-button" onClick={() => navigate('/')}>
        もう一度診断する
      </button>
    </div>
  );
};

export default Result;
