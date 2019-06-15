export const inicijalizirajBrojZadataka = noviBrojZadataka => {
  if (noviBrojZadataka > 10) noviBrojZadataka = 10;
  if (noviBrojZadataka < 1) noviBrojZadataka = 1;
  const novaListaTipova = [];

  for (let i = 0; i < noviBrojZadataka; i++) {
    novaListaTipova.push([false, false, false, false, false]);
  }

  return {
    brojZadataka: noviBrojZadataka,
    listaTipova: novaListaTipova,
    sviTipoviIsti: false
  };
};

export const promjeniListuTipova = (
  noviNiz,
  brojZadataka,
  sviTipoviIsti,
  indexZadatka,
  indexTipa
) => {
  if (!sviTipoviIsti) {
    noviNiz[indexZadatka][indexTipa] = !noviNiz[indexZadatka][indexTipa];
  } else {
    noviNiz[0][indexTipa] = !noviNiz[0][indexTipa];
    for (let k = 1; k < brojZadataka; k++) {
      noviNiz[k][indexTipa] = noviNiz[0][indexTipa];
    }
  }
  return {
    listaTipova: noviNiz
  };
};

export const promjenaBodova = (listaBodova, index, value) => {
  listaBodova[index] = value;
  let ukupnoBodova = 0;
  listaBodova.forEach(item => {
    ukupnoBodova += Number(item);
  });
  return {
    listaBodova,
    ukupnoBodova
  };
};
