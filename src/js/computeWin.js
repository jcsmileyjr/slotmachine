
  export const getRandomCombination = () => {
    let randomSymbol = {}    
    // Assign a random number to a property of randomSymbol, which is a number less then 3
    for(let i=0;i<3;i++){
      randomSymbol[i] = Math.floor(Math.random() * 4);
    }
    return randomSymbol;
  }

  // Based on the random combination the winning amount is added to the user points minus the bet
  export const computeWin = (symbols, updateFunds, setLastWin, funds, currentBet) => {
    const defaultPayScale = [[1,5],[2,10],[3,20],[4,40]];
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
