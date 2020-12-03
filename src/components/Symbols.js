//import {useState,useEffect} from 'react';
import chicken from '../assets/chicken.PNG';
import './symbols.css'

const Symbols = (props) => {
    return(
        <main className="img-container">
            <img src={chicken} alt="fried chicken" className={`slide-down${props.order}`} />
        </main>
    );
}

export default Symbols;