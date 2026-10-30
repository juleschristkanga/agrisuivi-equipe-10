// MEMBRE 1 — Parcelles : chercher, filtrer et additionner des informations.
// Fiche : fiches/1-parcelles.md · Vérifier : npm run test:parcelles

// Renvoie une ligne de texte qui décrit la parcelle.
// Exemple : 'P01 | Awa Diallo | Soubré | cacao | 3 ha'
export function formaterParcelle(parcelle) {
  return `${parcelle.id} | ${parcelle.producteur} | ${parcelle.localite} | ${parcelle.culture} | ${parcelle.surface} ha`;
}
// Renvoie la parcelle dont l'id est demandé, ou undefined si elle n'existe pas.
export function trouverParcelle(parcelles, id) {
  return parcelles.find((parcelle) => parcelle.id === id);
}

export function parcellesParCulture(parcelles, culture) {
  return parcelles.filter((p) => p.culture === culture);
}



// Renvoie la somme des surfaces (en hectares). Liste vide : 0.
export function surfaceTotale(parcelles) {
  return parcelles.reduce((total, p) => total + p.surface, 0);
}

// Renvoie un objet : pour chaque culture, le nombre de parcelles et leur surface.
// Exemple : { cacao: { nombre: 2, surface: 5 }, riz: { nombre: 1, surface: 1 } }
export function resumeParCulture(parcelles) {
  const resume = {};
  parcelles.forEach((p) => {
    if (!resume[p.culture]) {
      resume[p.culture] = { nombre: 0, surface: 0 };
    }
    resume[p.culture].nombre++;
    resume[p.culture].surface += p.surface;
  });
  return resume;
}
