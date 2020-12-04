import chicken from '../assets/chicken.PNG';
import burger from '../assets/burger.PNG';
import cheese from '../assets/cheese.PNG';
import shrimp from '../assets/shrimp.PNG';

import './symbols.css'



const Symbols = (props) => {
    let symbols = [shrimp, burger, chicken, cheese];
    
    return(
        <main className="img-container">
            <img src={symbols[props.pickedSymbol]} alt="fried chicken" className={props.start?`slide-down${props.order}`:``} />
        </main>
    );
}

export default Symbols;