(function () {
  var config = window.SOIREE;
  var app = document.querySelector("#app");
  var reponses = [];
  var etape = "accueil";
  var index = 0;
  var envoiLance = false;

  if (!config || !app) {
    return;
  }

  function element(balise, classe, texte) {
    var noeud = document.createElement(balise);
    if (classe) {
      noeud.className = classe;
    }
    if (texte) {
      noeud.textContent = texte;
    }
    return noeud;
  }

  function carte() {
    var bloc = element("section", "carte");
    app.replaceChildren(bloc);
    return bloc;
  }

  function focusTitre() {
    var titre = app.querySelector("h1");
    if (!titre) {
      return;
    }
    titre.tabIndex = -1;
    titre.focus();
  }

  function questionAffichee(position) {
    var question = config.questions[position];
    if (!question.variantes) {
      return question;
    }
    return question.variantes[reponses[question.selon]];
  }

  function dessinerAccueil() {
    var bloc = carte();
    bloc.append(
      element("p", "salut", config.accueil.surtitre),
      element("span", "marque"),
      element("h1", null, config.accueil.titre),
      element("p", "texte", config.accueil.texte)
    );
    var actions = element("div", "actions");
    var commencer = element("button", "principal", config.accueil.action);
    commencer.type = "button";
    commencer.addEventListener("click", function () {
      etape = "question";
      index = 0;
      dessiner();
    });
    actions.append(commencer);
    bloc.append(actions);
    focusTitre();
  }

  function dessinerQuestion() {
    var question = questionAffichee(index);
    var bloc = carte();
    var points = element("div", "points");
    var lecture = element(
      "p",
      "sr",
      "Question " + (index + 1) + " sur " + config.questions.length
    );

    config.questions.forEach(function (_, position) {
      var point = document.createElement("span");
      if (position <= index) {
        point.className = "fait";
      }
      points.append(point);
    });

    bloc.append(lecture, points, element("h1", null, question.titre));

    question.choix.forEach(function (libelle, position) {
      var bouton = element("button", "choix", libelle);
      bouton.type = "button";
      bouton.setAttribute("aria-pressed", reponses[index] === libelle ? "true" : "false");
      bouton.addEventListener("click", function () {
        reponses[index] = libelle;
        var boutons = bloc.querySelectorAll(".choix");
        boutons.forEach(function (autre, autrePosition) {
          autre.setAttribute("aria-pressed", autrePosition === position ? "true" : "false");
        });
        var suite = bloc.querySelector("[data-action='suivant']");
        if (suite) {
          suite.disabled = false;
        }
      });
      bloc.append(bouton);
    });

    var actions = element("div", "actions");
    var suivant = element("button", "principal", config.continuer);
    suivant.type = "button";
    suivant.dataset.action = "suivant";
    suivant.disabled = !reponses[index];
    suivant.addEventListener("click", avancer);
    actions.append(suivant);

    if (index > 0) {
      var retour = element("button", "retour", config.revenir);
      retour.type = "button";
      retour.addEventListener("click", function () {
        index -= 1;
        dessiner();
      });
      actions.append(retour);
    }

    bloc.append(actions);
    focusTitre();
  }

  function dessinerFin() {
    var bloc = carte();
    bloc.append(
      element("p", "surtitre", config.fin.surtitre),
      element("span", "marque"),
      element("h1", null, config.fin.texte)
    );
    focusTitre();
  }

  function avancer() {
    if (!reponses[index]) {
      return;
    }
    if (index < config.questions.length - 1) {
      index += 1;
      var suivante = questionAffichee(index);
      if (!suivante || suivante.choix.indexOf(reponses[index]) === -1) {
        reponses[index] = undefined;
      }
      dessiner();
      return;
    }
    if (envoiLance) {
      return;
    }
    envoiLance = true;
    etape = "fin";
    dessiner();
    envoyer();
  }

  function envoyer() {
    var script = (config.script || "").trim();
    if (!script) {
      return;
    }

    var corps = new URLSearchParams();
    config.questions.forEach(function (_, position) {
      var question = questionAffichee(position);
      corps.set(question.titre, reponses[position]);
    });

    fetch(script, {
      method: "POST",
      body: corps
    }).catch(function () {});
  }

  function dessiner() {
    if (etape === "accueil") {
      dessinerAccueil();
      return;
    }
    if (etape === "fin") {
      dessinerFin();
      return;
    }
    dessinerQuestion();
  }

  dessiner();
})();
