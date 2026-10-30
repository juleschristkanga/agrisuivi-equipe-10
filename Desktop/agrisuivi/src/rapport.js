// ÉQUIPE — Rapport : assembler le travail des quatre membres.
// Fiche : fiches/5-equipe-rapport.md · Vérifier : npm run test:rapport
import { mkdir, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import { surfaceTotale } from "./parcelles.js";
import { alertesIrrigation } from "./irrigation.js";
import { bilanRecoltes, classerParRevenu } from "./recoltes.js";

// Renvoie les id des alertes qui ont cet état, séparés par ', ', ou 'aucune'.
export function listerParEtat(alertes, etat) {
  const ids = alertes.filter((a) => a.etat === etat).map((a) => a.id);
  if (ids.length === 0) {
    return "aucune";
  }
  return ids.join(", ");
}

// Renvoie le texte complet du rapport (voir fiches/5-equipe-rapport.md).
export function construireRapport(donnees, date) {
  const { parcelles, releves, cultures, recoltes } = donnees;
  const alertes = alertesIrrigation(parcelles, releves, cultures);
  const bilan = bilanRecoltes(recoltes, parcelles, cultures);
  const parcellePlusRentable = classerParRevenu(bilan)[0];
  return `Rapport du ${date}  

Nombre de parcelles : ${parcelles.length}
Surface totale : ${surfaceTotale(parcelles)} m²

Alertes d'irrigation :
- En attente : ${listerParEtat(alertes, "en_attente")}
- En cours : ${listerParEtat(alertes, "en_cours")}
- Résolues : ${listerParEtat(alertes, "resolue")}

Parcelle la plus rentable : ${parcellePlusRentable?.id || "aucune"}
`;
}

// Écrit le texte dans le fichier demandé. Crée le dossier s'il n'existe pas.
export async function enregistrerRapport(chemin, texte) {
  throw new Error("TODO Équipe : coder enregistrerRapport dans src/rapport.js");
}
