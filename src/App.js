import {useState, useEffect} from 'react';
import combinations from './assets/rules.PNG'
import Symbol from './components/Symbols'
import InfoBox from './components/InfoBox';
import './App.css';

//let symbols = [chicken, burger, cheese, shrimp];
function App() {
  const defaultSymbols = {0:1,1:0,2:3}
  const defaultPayScale = [1,5,10,20];
  const [gameSymbols, setGameSymbols] = useState(defaultSymbols)
  const [spinSymbols, setSpinSymbols] = useState(false);
  const [currentBet, changeBet] = useState(1);
  const [funds, updateFunds] = useState(10);
  const [lastWin, setLastWin] = useState(0);



  const onClickSpinButton = () => {
    let randomSymbol = {}
    for(let i=0;i<3;i++){
      randomSymbol[i] = Math.floor(Math.random() * 4);
    }
    setGameSymbols(randomSymbol);
    setTimeout(()=>setSpinSymbols(false),500);
    setSpinSymbols(true);
    computeWin();
  }


  const computeWin = () => {
    let currentSymbols = gameSymbols;
    let count=0;
    let keySymbol = currentSymbols[0];

    // Loop through each reel (a number) matching against the first reel.
    for(let reel in currentSymbols){
      if(currentSymbols[reel] === keySymbol){
        count ++;
      }
    }

    if(count === 3){
      let winAmount = currentBet * defaultPayScale[keySymbol];
      let newFunds = winAmount + funds - currentBet
      updateFunds(newFunds);
      setLastWin(winAmount)
    }
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
        <Symbol order={1} pickedSymbol={gameSymbols[0]} start={spinSymbols} />
        <Symbol order={2} pickedSymbol={gameSymbols[1]} start={spinSymbols} />
        <Symbol order={3} pickedSymbol={gameSymbols[2]} start={spinSymbols} />
      </main>
      <footer>
        <section className="footer-sections spin-button-area">
          <button className="spin-button" onClick={()=> onClickSpinButton()}>Spin</button>
        </section>
        <section className="footer-sections info-section">
          <InfoBox title="Bet" data={currentBet} />
          <InfoBox title="Win" data={lastWin} />
          <InfoBox title="Funds" data={funds} />
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
