// Adresse du script Google, celle qui se termine par /exec. Vide : aucun envoi.
window.SOIREE = {
  script: "https://script.google.com/macros/s/AKfycbykQzmfFL99tNruKyummbVysCfZEnruXd0GdLVhG9ShirhCi2_2F4-GxgTYm5JuvuJT1g/exec",
  accueil: {
    titre: "Une soirée rien qu’à nous",
    texte: "Titia, dis-moi ce qui te ferait plaisir.",
    action: "Commencer"
  },
  questions: [
    {
      titre: "Pour commencer, tu préfères…",
      choix: [
        "Tu viens me chercher pour souper",
        "Je vais te chercher pour souper",
        "On se fait un appel Teams et on mange à distance."
      ]
    },
    {
      selon: 0,
      variantes: {
        "Tu viens me chercher pour souper": {
          titre: "Ensuite, on va souper où ?",
          choix: [
            "Une moyenne poutine soucisse du Ashton",
            "Un tartare saignant du Shaker",
            "Des nachos et un déjeuner du Normandin",
            "La Cohue, kessé ça",
            "Fais-moi la surprise, j'ai le goût que ça finisse au McDo."
          ]
        },
        "Je vais te chercher pour souper": {
          titre: "Ensuite, on va souper où ?",
          choix: [
            "Une moyenne poutine soucisse du Ashton",
            "Un tartare saignant du Shaker",
            "Des nachos et un déjeuner du Normandin",
            "La Cohue, kessé ça",
            "Fais-moi la surprise, j'ai le goût que ça finisse au McDo."
          ]
        },
        "On se fait un appel Teams et on mange à distance.": {
          titre: "Ensuite, on va souper où ?",
          choix: [
            "McDo",
            "Pizzeria Giffard",
            "St-Hubert",
            "Merci mais j'ai des touski à la maison"
          ]
        }
      }
    },
    {
      titre: "Pour le dessert...",
      choix: [
        "Je veux tes coupons Monopoly McDo",
        "On retourne où on s'est rencontré la première fois",
        "Penses-tu que je vais encore avoir faim ?"
      ]
    },
    {
      titre: "Pour finir en beauté, qu'est-ce qu'on fait en soirée...",
      choix: [
        "Visite guidée des décorations d'Halloween de la ville de Québec",
        "J'ai le goût de sentir l'odeur agréable (not) du fleuve",
        "J'ai envie de manger des graines (de pop-corn) au cinéma.",
        "Un cours privé d'arts martiaux mixtes \"Fuku fuku\"."
      ]
    }
  ],
  fin: {
    surtitre: "Ton ti chum",
    texte: "Merci, vos réponses seront peut-être prises en considération. Votre appel est important pour nous."
  },
  continuer: "Continuer",
  revenir: "Revenir"
};
