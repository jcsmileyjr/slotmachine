import combinations from './assets/rules.PNG'
import Symbol from './components/Symbols'
import InfoBox from './components/InfoBox';
import './App.css';

function App() {
  return (
    <div className="App">
      <header>
        <section class="header-section">
          <label class="play-title">How to Play</label>
          <p>Press the spin button to randomaly get three symbols. If the three symobls match a combination you win.</p>
        </section>
        <img src={combinations} className="header-section" alt="Winning combinations" />
      </header>
      <main className="symbol-container">
        <Symbol order={1} />
        <Symbol order={2} />
        <Symbol order={3} />
      </main>
      <footer>
        <section class="footer-sections spin-button-area">
          <button className="spin-button">Spin</button>
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
