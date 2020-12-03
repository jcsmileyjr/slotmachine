import chicken from '../assets/chicken.PNG';
import './symbols.css'

const Symbols = () => {
    return(
        <main className="img-container">
            <img src={chicken} alt="fried chicken" />
        </main>
    );
}

export default Symbols;