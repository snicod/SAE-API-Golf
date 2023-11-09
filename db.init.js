const Golfeur = require('./models/golfeur.model');
const CameraSurveillance = require('./models/cameraSurveillance.model');
const ConditionMeteo = require('./models/conditionMeteo.model');
const Drapeau = require('./models/drapeau.model');
const EtatSol = require('./models/etatSol.model');
const GestionnaireTrous = require('./models/gestionnaireTrous.model');
const ImageDrapeau = require('./models/imageDrapeau.model');
const LocalisationBalle = require('./models/localisationBalle.model');
const statistiqueCoup = require('./models/statistiqueCoup.model');
const Trou = require('./models/trou.model');
const bcrypt = require('bcryptjs');
const SALT_WORK_FACTOR = 10;
async function initGolfeur () {
  let golfeur1, golfeur2 = null
  try {
    golfeur1 = await Golfeur.findOne({nom: 'Woods'}).exec()
    if (golfeur1 === null) {
      const salt = bcrypt.genSaltSync(SALT_WORK_FACTOR);
      const password = bcrypt.hashSync('golfeur1', salt);
      golfeur1 = new Golfeur({
        nom: "Woods",
        prenom: "Tiger",
        email: "tiger@example.com",
        "mot_de_passe": password
      })
      golfeur1 = await golfeur1.save()
      console.log("added Woods");
    }
  } catch (err) {
    console.log("cannot add Woods")
  }
  try {
    golfeur2 = await Golfeur.findOne({nom: 'McIlroy'}).exec()
    if (golfeur2 === null) {
      const salt = bcrypt.genSaltSync(SALT_WORK_FACTOR);
      const password = bcrypt.hashSync('golfeur2', salt);
      golfeur2 = new Golfeur({
        nom: "McIlroy",
        prenom: "Rory",
        email: "rory@example.com",
        "mot_de_passe": password
      })
      golfeur2 = await golfeur2.save()
      console.log("added McIlroy");
    }
  } catch (err) {
    console.log("cannot add McIlroy")
  }
  console.log(golfeur1, golfeur2)
  return {golfeur1, golfeur2} ;
}
async function initGestionnaireTrous () {
  let gestionnaire1, gestionnaire2 = null
  try {
    gestionnaire1 = await GestionnaireTrous.findOne({nom: 'Tibs'}).exec()
    if (gestionnaire1 === null) {
      const salt = bcrypt.genSaltSync(SALT_WORK_FACTOR);
      const password = bcrypt.hashSync('gestionnaire1', salt);
      gestionnaire1 = new GestionnaireTrous({
        nom: "Tibs",
        prenom: "Tibault",
        email: "tibault@example.com",
        "mot_de_passe": password
      })
      gestionnaire1 = await gestionnaire1.save()
      console.log("added Tibs");
    }
  } catch (err) {
    console.log("cannot add Tibs")
  }
  try {
    gestionnaire2 = await GestionnaireTrous.findOne({nom: 'Etang'}).exec()
    if (gestionnaire2 === null) {
      const salt = bcrypt.genSaltSync(SALT_WORK_FACTOR);
      const password = bcrypt.hashSync('gestionnaire2', salt);
      gestionnaire2 = new GestionnaireTrous({
        nom: "Etang",
        prenom: "loffy",
        email: "loffy@example.com",
        "mot_de_passe": password
      })
      gestionnaire2 = await gestionnaire2.save()
      console.log("added Etang");
    }
  } catch (err) {
    console.log("cannot add Etang")
  }
  return {gestionnaire1, gestionnaire2}
}
async function initCameraSurveillance (trou1, trou2) {
  let camera1, camera2 = null
    try {
        camera1 = await CameraSurveillance.findOne({video_url: "urlvideo1"}).exec()
        if (camera1 === null) {
        camera1 = new CameraSurveillance({
            date: new Date(),
            video_url: "urlvideo1",
            trou_id: trou1._id
        })
        camera1 = await camera1.save()
        console.log("added Camera1");
        }
    } catch (err) {
        console.log("cannot add Camera1")
    }
    try {
        camera2 = await CameraSurveillance.findOne({video_url: "urlvideo2"}).exec()
        if (camera2 === null) {
        camera2 = new CameraSurveillance({
            date: new Date(),
            video_url: "urlvideo2",
            trou_id: trou2._id
        })
        camera2 = await camera2.save()
        console.log("added Camera2");
        }
    } catch (err) {
        console.log("cannot add Camera2")
    }
}
async function initDrapeau () {
    let drapeau1, drapeau2 = null
            try {
                drapeau1 = await Drapeau.findOne({latitude: 232344}).exec()
                if (drapeau1 === null) {
                drapeau1 = new Drapeau({
                    latitude: 232344,
                    longitude: 23244111
                })
                drapeau1 = await drapeau1.save()
                console.log("added Drapeau1");
                }
            } catch (err) {
                console.log("cannot add Drapeau1")
            }
            try {
                drapeau2 = await Drapeau.findOne({latitude: 2111134}).exec()
                if (drapeau2 === null) {
                drapeau2 = new Drapeau({
                    latitude: 2111134,
                    longitude: 2166134
                })
                drapeau2 = await drapeau2.save()
                console.log("added Drapeau2");
                }
            } catch (err) {
                console.log("cannot add Drapeau2")
            }
            return {drapeau1, drapeau2}
}
async function initTrou (gestionnaire1, gestionnaire2, drapeau1, drapeau2) {
    let trou1, trou2 = null
    try {
        trou1 = await Trou.findOne({ numero: 1 }).exec()
        if (trou1 === null) {
            trou1 = new Trou({
                numero: 1,
                gestionnaire_id: gestionnaire1._id,
                drapeau_id: drapeau1._id
            })
            trou1 = await trou1.save()
            console.log("added Trou1");
        }
    } catch (err) {
        console.log("Error adding Trou1:", err);
    }

    try {
        trou2 = await Trou.findOne({ numero: 2 }).exec()
        if (trou2 === null) {
            trou2 = new Trou({
                numero: 2,
                gestionnaire_id: gestionnaire2._id,
                drapeau_id: drapeau2._id
            })
            trou2 = await trou2.save()
            console.log("added Trou2");
        }
    } catch (err) {
        console.log("Error adding Trou2:", err);
    }
    return {trou1, trou2}

}
async function initConditionMeteo (trou1, trou2) {
    let condition1, condition2 = null
    try {
        condition1 = await ConditionMeteo.findOne({temperature: 25}).exec()
        if (condition1 === null) {
            condition1 = new ConditionMeteo({
                trou_id: trou1._id,
                date: new Date(),
                temperature: 25,
                humidite: 60,
                vent: {
                    vitesse: 15,
                    direction: "N"
                }
            })
            condition1 = await condition1.save()
            console.log("added Condition1");
        }
    } catch (err) {
        console.log("cannot add Condition1")
    }
    try {
        condition2 = await ConditionMeteo.findOne({temperature: 23}).exec()
        if (condition2 === null) {
            condition2 = new ConditionMeteo({
                trou_id: trou2._id,
                date: new Date(),
                temperature: 23,
                humidite: 50,
                vent: {
                    vitesse: 25,
                    direction: "S"
                }
            })
            condition2 = await condition2.save()
            console.log("added Condition2");
        }
    } catch (err) {
        console.log("cannot add Condition2")
    }
}
async function initEtatSol (trou1, trou2) {
  let etat1, etat2 = null
  try {
    etat1 = await EtatSol.findOne({densite_herbe: "Moyenne"}).exec()
    if (etat1 === null) {
      etat1 = new EtatSol({
        date: new Date(),
        densite_herbe: "Moyenne",
        qualite_nutriments: "Pas mal",
        humidite: 60,
        trou_id: trou1._id
      })
      etat1 = await etat1.save()
      console.log("added Etat1");
    }
  } catch (err) {
    console.log("cannot add Etat1")
  }
  try {
    etat2 = await EtatSol.findOne({densite_herbe: "Faible"}).exec()
    if (etat2 === null) {
      etat2 = new EtatSol({
        date: new Date(),
        densite_herbe: "Faible",
        qualite_nutriments: "Mouais",
        humidite: 20,
        trou_id: trou2._id
      })
      etat2 = await etat2.save()
      console.log("added Etat2");
    }
  } catch (err) {
    console.log("cannot add Etat2")
  }
}
async function initImageDrapeau (golfeur1, golfeur2) {
    let image1, image2 = null
    try {
        image1 = await ImageDrapeau.findOne({image_url: "urlimage1"}).exec()
        if (image1 === null) {
        image1 = new ImageDrapeau({
            golfeur_id: golfeur2._id,
            image_url: "urlimage1",
            distance_estimee: 10
        })
        image1 = await image1.save()
        console.log("added Image1");
        }
    } catch (err) {
        console.log("cannot add Image1")
    }
    try {
        image2 = await ImageDrapeau.findOne({image_url: "urlimage2"}).exec()
        if (image2 === null) {
        image2 = new ImageDrapeau({
            golfeur_id: golfeur2._id,
            image_url: "urlimage2",
            distance_estimee: 20
        })
        image2 = await image2.save()
        console.log("added Image2");
        }
    } catch (err) {
        console.log("cannot add Image2")
    }
}
async function initLocalisationBalle (golfeur1, golfeur2) {
    let localisation1, localisation2 = null
    try {
        localisation1 = await LocalisationBalle.findOne({latitude: 23234444}).exec()
        if (localisation1 === null) {
            localisation1 = new LocalisationBalle({
                golfeur_id: golfeur2._id,
                latitude: 23234444,
                longitude: 23244111,
            })
            localisation1 = await localisation1.save()
            console.log("added Localisation1");
        }
    } catch (err) {
        console.log("cannot add Localisation1")
    }
    try {
        localisation2 = await LocalisationBalle.findOne({latitude: 2111134}).exec()
        if (localisation2 === null) {
            localisation2 = new LocalisationBalle({
                golfeur_id: golfeur1._id,
                latitude: 2111134,
                longitude: 2166134
            })
            localisation2 = await localisation2.save()
            console.log("added Localisation2");
        }
    } catch (err) {
        console.log("cannot add Localisation2")
    }
}
async function initStatistiqueCoup (golfeur1, golfeur2) {
    let statistique1, statistique2 = null
    try {
        statistique1 = await statistiqueCoup.findOne({vitesse: 34}).exec()
        if (statistique1 === null) {
            statistique1 = new statistiqueCoup({
                golfeur_id: golfeur1._id,
                vitesse: 34,
                trajectoire: 45,
                conseil: "tire plus fort !"
            })
            statistique1 = await statistique1.save()
            console.log("added Statistique1");
        }
    } catch (err) {
        console.log("cannot add Statistique1")
    }
    try {
        statistique2 = await statistiqueCoup.findOne({vitesse: 21}).exec()
        if (statistique2 === null) {
            statistique2 = new statistiqueCoup({
                golfeur_id: golfeur2._id,
                vitesse: 21,
                trajectoire: 15,
                conseil: "tire plus vers le haut !"
            })
            statistique2 = await statistique2.save()
            console.log("added Statistique2");
        }
    } catch (err) {
        console.log("cannot add Statistique2")
    }
}
  async function initBdD() {
      const {golfeur1, golfeur2} = await initGolfeur()
      console.log("Golfeurs initialized:", golfeur1, golfeur2);
      const { gestionnaire1, gestionnaire2 } = await initGestionnaireTrous();
      console.log("Gestionnaires initialized:", gestionnaire1, gestionnaire2);
      const { drapeau1, drapeau2 } = await initDrapeau();
      console.log("Drapeaux initialized:", drapeau1, drapeau2);
      const { trou1, trou2 } = await initTrou(gestionnaire1, gestionnaire2, drapeau1, drapeau2);
      console.log("Trous initialized:", trou1, trou2);
    await initCameraSurveillance(trou1, trou2)
    await initConditionMeteo(trou1, trou2)
    await initEtatSol(trou1, trou2)
    await initImageDrapeau(golfeur1, golfeur2)
    await initLocalisationBalle(golfeur1, golfeur2)
    await initStatistiqueCoup(golfeur1, golfeur2)
  }

  module.exports = {
    initBdD,
  };


