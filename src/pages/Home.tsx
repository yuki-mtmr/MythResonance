import { useNavigate } from 'react-router-dom';
import { FC } from 'react';

const Home: FC = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container fade-in">
      <header className="hero">
        <h1 className="title">Myth Resonance</h1>
        <p className="subtitle">10の問いで、あなたと共鳴する神話の象徴を見つける</p>
      </header>

      <main className="main-content">
        <div className="description-card">
          <p>
            いにしえより語り継がれる神々の物語は、私たちの内なる魂の型（アーキタイプ）と響き合います。
            あなたの無意識に眠る波動は、どの神の性質に近いでしょうか？
          </p>
          <button className="start-button" onClick={() => navigate('/quiz')}>
            診断を始める
          </button>
        </div>

        <div className="disclaimer">
          <p>
            ※本診断は占いではなく、神話アーキタイプを使った自己理解の遊びです。<br />
            気分や状況で結果が変わることがあります。
          </p>
        </div>
      </main>
    </div>
  );
};

export default Home;
