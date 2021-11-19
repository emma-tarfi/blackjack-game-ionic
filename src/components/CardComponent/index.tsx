import React from 'react';
import {Carte} from "../../types";
import './CardComponent.css'
type CardComponentProps = {
    carte: Carte;
}

const CardComponent = (props: CardComponentProps) => {
    const { carte } = props;
    return (
        <div className={'card-container'}>
            <img className={'card-text'} src={`assets/images/${carte.texte}.png`} alt=""/>
            <img className={'card-enseigne'} src={`assets/images/${carte.enseigne}.png`} alt=""/>
            <span className="card-value">{carte.valeur}</span>
        </div>
    );
};
export default CardComponent;

