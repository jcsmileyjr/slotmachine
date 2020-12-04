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

  // Function that choose 3 random numbers for a combination of reels, check for combinations, and assign win amount to funds. 
  const onClickSpinButton = () => {
    /*
    let randomSymbol = {}
    
    // Assign a random number to a new property of randomSymbol which is a number less then 3
    for(let i=0;i<3;i++){
      randomSymbol[i] = Math.floor(Math.random() * 4);
    }
*/
    let randomSymbol= {0:3,1:3,2:3} //   TESTING TESTING TESTING TESTING

    setGameSymbols(randomSymbol); // Updte the state's symbols to update the Symbol reels
    setTimeout(()=>setSpinSymbols(false),500); // Set timer to return Symbol reels to waiting status
    setSpinSymbols(true); // Make the Symbols reel spin
    
    computeWin(randomSymbol);
  }

  // Based on the random combination the winning amount is added to the user points minus the bet
  const computeWin = (symbols) => {
    //let currentSymbols = gameSymbols;
    let count=0;
    let keySymbol = symbols[0]; // Get the first number of the first reel to use as a comparison

    // Loop through each reel (a number) matching against the first reel.
    for(let reel in symbols){
      if(symbols[reel] === keySymbol){
        count ++;
      }
    }

    if(count === 3){
      let winAmount = currentBet * defaultPayScale[keySymbol];
      let newFunds = winAmount + funds - currentBet

      updateFunds(newFunds );
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
