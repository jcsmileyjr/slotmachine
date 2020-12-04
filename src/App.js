import {useState} from 'react';
import Swal from 'sweetalert2';
import combinations from './assets/game-rules.PNG'
import Symbol from './components/Symbols'
import InfoBox from './components/InfoBox';
import './App.css';

function App() {
  const defaultSymbols = {0:1,1:0,2:3}
  const defaultPayScale = [[1,5],[2,10],[3,20],[4,40]];
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
      
      computeWin(randomSymbol);
    }

  }

  const getRandomCombination = () => {
    let randomSymbol = {}
    
    // Assign a random number to a property of randomSymbol, which is a number less then 3
    for(let i=0;i<3;i++){
      randomSymbol[i] = Math.floor(Math.random() * 4);
    }

    return randomSymbol;
  }

  // Based on the random combination the winning amount is added to the user points minus the bet
  const computeWin = (symbols) => {
    let winningCombinations = {0:0, 1:0, 2:0,3:0};

    // Loop through each reel, updating the winningCombination object with each found matching reel.
    for(let reel in symbols){
      let valueOfReel = symbols[reel];
      for(let key in winningCombinations){
        if(valueOfReel === Number(key)){          
          let valueOfKey = winningCombinations[key];
          winningCombinations[key] = valueOfKey + 1;
        }
      }
    }    

    // Loop through the combinations to determine payout minus the bet
    for(let combinations in winningCombinations){
      if(winningCombinations[combinations] === 3){
        // Use the payscale array to determine the winning amount to be multiplied times the bet amount
        let winAmount = currentBet * defaultPayScale[combinations][1];
        let newFunds = winAmount + funds - currentBet;
        updateFunds(newFunds);
        setLastWin(winAmount);
        return;
      }else if(winningCombinations[combinations] === 2){
        // Use the payscale array to determine the winning amount to be multiplied times the bet amount
        let winAmount = currentBet * defaultPayScale[combinations][0];
        let newFunds = winAmount + funds - currentBet;
        updateFunds(newFunds);
        setLastWin(winAmount) 
        return;       
      }else{
        let newFunds = 0 + funds - currentBet;
        updateFunds(newFunds);
        setLastWin(0);
      }
    }
  }

  const changeBetAmount = amount => {
    changeBet(amount);
  }

  return (
    <div className="App">
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
            <button className={currentBet===1?"selected-bet bet-button":"bet-button"} onClick={() => changeBetAmount(1)} >1</button>
            <button className={currentBet===5?"selected-bet bet-button":"bet-button"} onClick={() => changeBetAmount(5)} >5</button>
            <button className={currentBet===10?"selected-bet bet-button":"bet-button"} onClick={() => changeBetAmount(10)}>10</button>
            <button className={currentBet===20?"selected-bet bet-button":"bet-button"} onClick={() => changeBetAmount(20)} >20</button>
          </article>
        </section>
      </footer>
    </div>
  );
}

export default App;
