import { useNavigate } from 'react-router-dom';
import { FC } from 'react';

interface HomeProps {
  setMode: (mode: 'mythology' | 'dark') => void;
}

const Home: FC<HomeProps> = ({ setMode }) => {
  const navigate = useNavigate();

  const handleModeSelect = (selectedMode: 'mythology' | 'dark') => {
    setMode(selectedMode);
    navigate('/quiz');
  };

  return (
    <div className="home-container fade-in">
      <header className="hero">
        <h1 className="title">Myth Resonance</h1>
        <p className="subtitle">10の問いで、あなたの内なる本質を見つける</p>
      </header>

      <main className="main-content">
        <div className="mode-selection">
          <h2 className="mode-title">診断モードを選択</h2>
          
          <div className="mode-buttons">
            <button 
              className="mode-button mythology-mode" 
              onClick={() => handleModeSelect('mythology')}
            >
              <div className="mode-icon">✨</div>
              <h3>神話の神</h3>
              <p>古代神話の神々と共鳴する</p>
            </button>

            <button 
              className="mode-button dark-mode" 
              onClick={() => handleModeSelect('dark')}
            >
              <div className="mode-icon">🌑</div>
              <h3>ダークサイド</h3>
              <p>内なる影と向き合う</p>
            </button>
          </div>
        </div>

        <div className="disclaimer">
          <p>
            ※本診断は占いではなく、アーキタイプを使った自己理解の遊びです。<br />
            気分や状況で結果が変わることがあります。
          </p>
        </div>
      </main>
    </div>
  );
};

export default Home;
