import './infoBox.css';

const InfoBox = (props) => {
    return(
        <main className="info-box-style">
            <label for="info">{props.title}</label>
            <section className="info-area">{props.data}</section>
        </main>
    );
}

export default InfoBox;