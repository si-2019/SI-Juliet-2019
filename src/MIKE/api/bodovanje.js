const axios = require('axios')
 
// upis bodova za sve studente iz grupe pojedinacno
const upisBodovaPojedinacno = (studenti, idProjekta) => {
    //studenti je niz [{idStudent, idGrupaProjekta, ostvareniBodovi},{...}]
    console.log(`Pozvan upis pojedinacno: studenti: ${JSON.stringify(studenti)} idProjekta: ${idProjekta}`);
    return axios.post('http://localhost:31913/api/bodovanjeprojekata/specified', {
        payload: studenti,
        projekat: idProjekta
      });
}

//upis istih bodova za sve studente u grupi
const upisBodovaGrupno = (idGrupaProjekta, bodovi) => {
    console.log(`Pozvan upis grupno: idGrupaProjekta: ${idGrupaProjekta} bodovi: ${bodovi}`);
    return axios.post('http://localhost:31913/api/bodovanjeprojekata/unified', {
        idGrupaProjekta: idGrupaProjekta,
        bodovi: bodovi
      });
}

export { 
    upisBodovaPojedinacno,
    upisBodovaGrupno
};