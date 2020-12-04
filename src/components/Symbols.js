//import {useState} from 'react';
import chicken from '../assets/chicken.PNG';
import './symbols.css'

const Symbols = (props) => {
    /*
    const [rolling, setRolling] = useState(false);

    const rollSymbols = () => {
        if(props.start){
            setRolling(true);
        }
    }
*/
    
    return(
        <main className="img-container">
            <img src={chicken} alt="fried chicken" className={props.start?`slide-down${props.order}`:``} />
        </main>
    );
}

export default Symbols;