export type ValeurCarte = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
export type TexteCarte =
  | "As"
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "Valet"
  | "Reine"
  | "Roi";
export type EnseigneCarte = "Piques" | "Carreaux" | "Coeurs" | "Trèfles";
export type Carte = {
  valeur: ValeurCarte;
  texte: TexteCarte;
  enseigne: EnseigneCarte;
};

export type TypeJoueur = "ia" | "joueur";
export type Joueur = {
  type: TypeJoueur;
  score: number;
  cartes: Carte[];
};

export type Step =
  | "null"
  | "start"
  | "playerturn"
  | "playerended"
  | "iaturn"
  | "endgame"
  | "win"
  | "loose";

export const getDeck: () => Carte[] = () => {
  const deck: Carte[] = [];
  [
    "As",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "Valet",
    "Reine",
    "Roi",
  ].forEach((texte: any) => {
    let valeur = Number(texte) as ValeurCarte;
    if (texte === "As") valeur = 1;
    if (texte === "Valet" || texte === "Reine" || texte === "Roi") valeur = 10;
    ["Piques", "Carreaux", "Coeurs", "Trèfles"].forEach((enseigne: any) =>
      deck.push({
        enseigne,
        valeur,
        texte,
      })
    );
  });
  return deck;
};