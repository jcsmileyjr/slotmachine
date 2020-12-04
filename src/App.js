import {useState} from 'react';
import Swal from 'sweetalert2';
import combinations from './assets/game-rules.PNG'
import Symbol from './components/Symbols'
import InfoBox from './components/InfoBox';
import './App.css';
import {getRandomCombination, computeWin} from './js/computeWin.js';

function App() {
  const defaultSymbols = {0:1,1:0,2:3}
  
  const [gameSymbols, setGameSymbols] = useState(defaultSymbols)
  const [spinSymbols, setSpinSymbols] = useState(false);
  const [currentBet, changeBet] = useState(1);
  const [funds, updateFunds] = useState(10);
  const [lastWin, setLastWin] = useState(0);

  // Function that choose 3 random numbers for a combination of reels, check for combinations, and assign win amount to funds. 
  const onClickSpinButton = () => {
    if(funds <= 0){
      Swal.fire("You are out of points. Refresh page to restart!!");
    }else {
      let randomSymbol = getRandomCombination(); 
      setGameSymbols(randomSymbol); // Update the state's symbols to update the Symbol reels
      setTimeout(()=>setSpinSymbols(false),500); // Set timer to return Symbol reels to waiting status
      setSpinSymbols(true); // Make the Symbols reel spin      
      computeWin(randomSymbol, updateFunds, setLastWin, funds, currentBet);
    }
  }

  const onClickChangeBetAmount = amount => {
    changeBet(amount);
  }

  return (
    <div className="app">
      <div className="container">
        <header>
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
              <button className={currentBet===1?"selected-bet bet-button":"bet-button"} onClick={() => onClickChangeBetAmount(1)} >1</button>
              <button className={currentBet===5?"selected-bet bet-button":"bet-button"} onClick={() => onClickChangeBetAmount(5)} >5</button>
              <button className={currentBet===10?"selected-bet bet-button":"bet-button"} onClick={() => onClickChangeBetAmount(10)}>10</button>
              <button className={currentBet===20?"selected-bet bet-button":"bet-button"} onClick={() => onClickChangeBetAmount(20)} >20</button>
            </article>
          </section>
        </footer>
      </div>
    </div>
  );
}

export default App;
