import {useState} from 'react';
import combinations from './assets/rules.PNG'
import Symbol from './components/Symbols'
import InfoBox from './components/InfoBox';
import './App.css';

function App() {
  const [gameSymbols, setGameSymbols] = useState({})
  const [spinSymbols, setSpinSymbols] = useState(0);

  const onClickSpinButton = () => {
    setGameSymbols(false)
    let randomSymbol = {}
    for(let i=0;i<3;i++){
      randomSymbol[i] = Math.floor(Math.random() * 4);
    }
    setGameSymbols(randomSymbol);
    setTimeout(()=>setSpinSymbols(0),500);
    setSpinSymbols(1);
    
    
  }

  return (
    <div className="App">
      <header>
        <section className="header-section">
          <label className="play-title">How to Play</label>
          <p>Press the spin button to randomaly get three symbols. If the three symobls match a combination you win.</p>
        </section>
        <img src={combinations} className="header-section" alt="Winning combinations" />
      </header>
      <main className="symbol-container">
        <Symbol order={1} pickedSymbol={gameSymbols[0]} start={spinSymbols===1?true:false} />
        <Symbol order={2} pickedSymbol={gameSymbols[1]} start={spinSymbols===1?true:false} />
        <Symbol order={3} pickedSymbol={gameSymbols[2]} start={spinSymbols===1?true:false} />
      </main>
      <footer>
        <section className="footer-sections spin-button-area">
          <button className="spin-button" onClick={()=> onClickSpinButton()}>Spin</button>
        </section>
        <section className="footer-sections info-section">
          <InfoBox title="Bet" data={1} />
          <InfoBox title="Win" data={1} />
          <InfoBox title="Funds" data={1} />
        </section>
        <section className="footer-sections">
          <p className="bet-amount-instruction">Change your <span className="bet-instruction-bold">Bet </span>amount</p>
          <article className="bet-section">
            <button className="bet-button">1</button>
            <button className="bet-button">5</button>
            <button className="bet-button">10</button>
            <button className="bet-button">20</button>
          </article>
        </section>
      </footer>
    </div>
  );
}

export default App;
