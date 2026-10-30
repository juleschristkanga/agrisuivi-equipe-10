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
  const bilan = bilanRecoltes(parcelles, recoltes, cultures);
  const classement = classerParRevenu(bilan);
  const productionTotale = bilan.reduce((total, ligne) => total + ligne.kg, 0);
  const revenuTotal = bilan.reduce((total, ligne) => total + ligne.revenu, 0);
  const meilleureParcelle = classement[0];
  const lignes = [
    `=== RAPPORT AGRISUIVI DU ${date} ===`,
    `Parcelles suivies : ${parcelles.length}`,
    `Surface totale : ${surfaceTotale(parcelles)} ha`,
    '',
    '--- Irrigation ---',
    `À arroser : ${listerParEtat(alertes, 'ARROSER')}`,
    `À drainer : ${listerParEtat(alertes, 'DRAINER')}`,
    `Sans relevé : ${listerParEtat(alertes, 'INCONNU')}`,
    '',
    '--- Récoltes ---',
    `Production totale : ${productionTotale} kg`,
    `Revenu estimé : ${revenuTotal} FCFA`,
    `Meilleure parcelle : ${meilleureParcelle ? `${meilleureParcelle.id} (${meilleureParcelle.producteur}) avec ${meilleureParcelle.revenu} FCFA` : 'aucune'}`,
  ];
  return `${lignes.join('\n')}\n`;
}

// Écrit le texte dans le fichier demandé. Crée le dossier s'il n'existe pas.
export async function enregistrerRapport(chemin, texte) {
  await mkdir(dirname(chemin), { recursive: true });
  await writeFile(chemin, texte, 'utf8');
}
