import { caretUpSharp } from "ionicons/icons";
import React, { useState, useEffect } from "react";
import { Carte, getDeck, Joueur, Step } from "../../types";

const useBlackJack = () => {
    const [deck, setDeck] = useState<Carte[]>([]);
    const [step, setStep] = useState<Step>("null");
    const [joueur, setJoueur] = useState<Joueur>({
      cartes: [],
      score: 0,
      type: "joueur",
    });
    const [ia, setIa] = useState<Joueur>({
        cartes: [],
        score: 0,
        type: "ia",
      });

    const getDeckCard = () => {
        return deck[Math.floor(Math.random() * deck.length)];
    };

    const getCardFromJoueur = () => {
        const card = getDeckCard();
        setJoueur({...joueur, cartes: Array.from(joueur.cartes.concat(card))});
    }; 

    const getTotal = (cartes: Carte[]) => {
        let total = 0;
        cartes.forEach(carte => total += carte.valeur);
        return total;    
    };

    const getTotalPlayer = () => {
        return getTotal(joueur.cartes);
    }; 

    const getTotalIA = () => {
        return getTotal(ia.cartes);
    }; 

    useEffect(() => {
        setDeck(getDeck());
    }, []);

    useEffect(() => {
        switch(step){
            case "start":
                const card1 = getDeckCard();
                const card2 = getDeckCard();
                setJoueur({...joueur, cartes: [card1, card2]});
                break;
            case "playerended":
                const cardsIA: Carte[] = [];
                while(getTotal(cardsIA) < getTotalPlayer()){
                    cardsIA.push(getDeckCard());
                }
                setIa({...ia, cartes: cardsIA});
                break;
            case "null":
                default:
                    return;
        }
    }, [step]);

    useEffect(() => {
        if (joueur) {
          let total = 0;
          joueur.cartes.forEach((carte) => (total += carte.valeur));
          if (total > 21) {
            setStep("loose");
          }
        }
      }, [joueur]);

      useEffect(() => {
        if (step !== "null" && step !== "start" && deck.length > 0) {
          localStorage.setItem(
            "game",
            JSON.stringify({
              step,
              deck,
              joueur,
              ia,
            })
          );
        }
      }, [step, deck, joueur, ia]);

    useEffect(() => {
        const dataLocalStorage = localStorage.getItem("game");
        if (dataLocalStorage) {
          const { step, deck, player, ia } = JSON.parse(dataLocalStorage);
          setJoueur(joueur);
          setIa(ia);
          setDeck(deck);
          setStep(step);
        } else {
          setDeck(getDeck());
        }
      }, []);

    return {
        step,
        setStep, 
        joueur,
        ia,
        getCardFromJoueur
    }
};

export default useBlackJack;
