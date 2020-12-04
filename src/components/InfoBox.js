import './infoBox.css';

const InfoBox = (props) => {
    return(
        <main className="info-box-style">
            <label htmlFor="info">{props.title}</label>
            <section id="info" className="info-area">{props.data}</section>
        </main>
    );
}

export default InfoBox;