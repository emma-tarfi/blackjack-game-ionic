import {
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonModal,
  IonPage, IonRow,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import './Home.css';
import React from "react";
import {useBlackJack} from "../../hooks";
import CardComponent from "../../components/CardComponent";
import { close, clipboardOutline, gameController } from 'ionicons/icons';

const Index: React.FC = () => {
  const { step, setStep, joueur, ia, getCardFromJoueur } = useBlackJack();

  function getGrid() {
      return (
          <IonGrid>
              <IonRow>
                <IonCol size={'6'}>
                    <IonButton color="warning" onClick={() => getCardFromJoueur()}>Tirez une carte</IonButton>
                    <IonButton color="danger" onClick={() => setStep("playerended")}>Stop</IonButton>
                </IonCol>
                <IonCol size={'6'}>
                    {joueur.cartes.map(carte => (
                      <CardComponent carte={carte} />
                    ))}
                </IonCol>
              </IonRow>
          </IonGrid>
      )
  }

  function getStart() {
      return (
          <>
            <IonButton color="light" expand="block" routerLink={"/rules"}>              
              <IonIcon slot="icon-only" icon={clipboardOutline} />
              Règles
            </IonButton>
            <IonButton expand={'block'} onClick={() => setStep("start")}>
            <IonIcon slot="icon-only" icon={gameController} />
              Start
            </IonButton>
          </>
      )
  }

  function getEnd() {
    return (
        <>
          <IonGrid>
              <IonRow>
                <IonCol size={'6'}>
                    <IonButton color="danger" onClick={() => setStep('start')}>Recommencer</IonButton>
                </IonCol>
                <IonCol size={'6'}>
                    Vous avez { step === "win" ? "Gagné" : "Perdu" }
                </IonCol>
              </IonRow>
          </IonGrid>
        </>
    )
  }

  function getCroupier() {
    return (
        <>
          <IonModal isOpen={step === "playerended"}>
            <IonHeader>
              <IonToolbar>
                <IonButtons slot="primary">
                  <IonButton onClick={() => setStep("endgame")}>
                    <IonIcon icon={close} />
                  </IonButton>
                </IonButtons>  
                <IonTitle>Croupier</IonTitle>
              </IonToolbar>
            </IonHeader>
            <IonContent>
              <IonGrid>
                <IonRow>
                  <IonCol size="12">
                    Total du croupier
                  </IonCol>
                  {ia?.cartes.map((carte, i) => (
                    <IonCol key={i} size="12">
                      <CardComponent carte={carte} />
                    </IonCol>
                  ))}
                </IonRow>
              </IonGrid>
            </IonContent>
          </IonModal>
        </>
    )
  }

  function getStatusStep(){
      switch(step){
        case "null":
          return getStart();
        case "start":
          return getGrid();
        case "loose":
          return getEnd();
        case "win":
          return getEnd();
        case "playerended":
          return getCroupier();
        case "endgame":
          return getEnd();
      }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle><img src="assets/images/blackjack.png" alt=""/> BlackJack</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        { getStatusStep() }     
       </IonContent>
    </IonPage>
  );
};
export default Index;
