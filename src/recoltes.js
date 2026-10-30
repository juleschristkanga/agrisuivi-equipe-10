// MEMBRE 3 — Récoltes : calculer la production, le rendement et le revenu.
// Fiche : fiches/3-recoltes.md · Vérifier : npm run test:recoltes

// Renvoie le total des kilos récoltés sur une parcelle. Aucune récolte : 0.
export function totalRecolte(recoltes, idParcelle) {
  const recoltesParcelle = recoltes.filter((r) => r.parcelle === idParcelle);
  return recoltesParcelle.reduce((total, r) => total + r.kg, 0);
}

// Renvoie le rendement en kg par hectare, arrondi à l'entier le plus proche.
// Une surface nulle ou négative est une erreur : on lance une RangeError.
export function rendement(kg, surface) {
  if (surface <= 0) {
    throw new RangeError("La surface doit être un nombre positif.");
  }
  return Math.round(kg / surface);
}

// Renvoie le revenu estimé en FCFA.
export function revenu(kg, prixKg) {
  return kg * prixKg;
}

// Renvoie une ligne de bilan par parcelle, dans le même ordre que parcelles.
// Chaque ligne : { id, producteur, culture, kg, rendement, revenu }
export function bilanRecoltes(parcelles, recoltes, cultures) {
  return parcelles.map((p) => {
    const kg = totalRecolte(recoltes, p.id);
    const rendementParHectare = rendement(kg, p.surface);
    const prixKg = cultures.find((culture) => culture.code === p.culture)?.prixKg ?? 0;
    const revenuEstime = revenu(kg, prixKg);
    return {
      id: p.id,
      producteur: p.producteur,
      culture: p.culture,
      kg,
      rendement: rendementParHectare,
      revenu: revenuEstime,
    };
  });
}

// Renvoie une COPIE du bilan, triée du plus grand revenu au plus petit.
// Le tableau reçu ne doit pas changer d'ordre.
export function classerParRevenu(bilan) {
  return [...bilan].sort((a, b) => b.revenu - a.revenu);
}
