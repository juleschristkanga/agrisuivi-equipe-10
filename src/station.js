// BONUS — Station connectée : simuler des capteurs qui répondent après un délai.
// Fiche : fiches/6-bonus-station.md · Vérifier : npm run test:station

// Renvoie une promesse qui se résout après capteur.delai millisecondes avec
// { parcelle, humidite }, ou qui est rejetée si le capteur n'est pas en ligne.
export function interrogerCapteur(capteur) {
  return new Promise((resolve, reject) => {
    if (!capteur.enLigne) {
      reject(new Error("Capteur hors ligne"));
      return;
    }

    setTimeout(() => {
      resolve({ parcelle: capteur.parcelle, humidite: capteur.humidite });
    }, capteur.delai);
  });
}

// Même travail que interrogerCapteur, mais ne rejette jamais :
// en cas d'erreur, renvoie { parcelle, erreur } avec le message de l'erreur.
export async function interrogerSansPlanter(capteur) {
  return interrogerCapteur(capteur).catch((err) => ({
    parcelle: capteur.parcelle,
    erreur: err.message,
  }));
}

// Interroge les capteurs L'UN APRÈS L'AUTRE (on attend chaque réponse).
export async function releverUnParUn(capteurs) {
  const results = [];
  for (const capteur of capteurs) {
    results.push(await interrogerSansPlanter(capteur));
  }
  return results;
}

// Interroge tous les capteurs EN MÊME TEMPS. Les résultats gardent l'ordre des capteurs.
export async function releverEnParallele(capteurs) {
return Promise.all(capteurs.map((capteur) => interrogerSansPlanter(capteur)));

}
