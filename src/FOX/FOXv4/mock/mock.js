const createMockPredmet = (id, name) => ({ id, name })
const createMockGrupa = (id, name, predmet) => ({ id, name, predmetId: predmet.id })
const createMockStudent = (id, index, name) => ({
    id,
    index,
    name,
    pristustvo: 10,
    zadace: 10,
    prviParcijalniBodovi: 10,
    drugiParcijalniBodovi: 10,
    usmeni: 20,
    ukupno: 60,
    ocjena: 6
})

const createMockStudentGrupa = (student, grupa) => ({ studentId: student.id, grupaId: grupa.id })
const predmeti = [
    createMockPredmet(1, "Predmet1"),
    createMockPredmet(2, "Predmet2"),
    createMockPredmet(3, "Predmet3")
]

const grupe = [
    createMockGrupa(1, "Grupa1P1", predmeti[0]),
    createMockGrupa(2, "Grupa1P2", predmeti[1]),
    createMockGrupa(3, "Grupa1P3", predmeti[2]),
    createMockGrupa(4, "Grupa2P1", predmeti[0]),
    createMockGrupa(5, "Grupa2P2", predmeti[1]),
    createMockGrupa(6, "Grupa2P3", predmeti[2]),    
]

const studenti = [
    createMockStudent(1, 12345, "Neko nekic"),
    createMockStudent(2, 12346, "Neko nekic"),
    createMockStudent(3, 12347, "Neko nekic"),
    createMockStudent(4, 12348, "Neko nekic"),
    createMockStudent(5, 12349, "Neko nekic"),
]

const studenti_grupe = [
    createMockStudentGrupa(studenti[0], grupe[0]),
    createMockStudentGrupa(studenti[0], grupe[1]),
    createMockStudentGrupa(studenti[0], grupe[2]),
    createMockStudentGrupa(studenti[1], grupe[3]),
    createMockStudentGrupa(studenti[1], grupe[4]),
    createMockStudentGrupa(studenti[2], grupe[0]),
    createMockStudentGrupa(studenti[2], grupe[1]),
]

const dajPredmeteSaGrupama = async() => {
    const forReturn = [...predmeti]
    for(const grupa of grupe){
        const indexOfPredmet = forReturn.findIndex(p => p.id === grupa.predmetId)
        if(!forReturn[indexOfPredmet].grupe)
        forReturn[indexOfPredmet].grupe = []
        forReturn[indexOfPredmet].grupe.push(grupa)
    }

    return forReturn;
}

const dajPredmetPoId = async(predmetId, grupaId) => {
    const predmet = predmeti.find(p => p.id === predmetId)
    if(!predmet) return null
    if(!grupaId)
        predmet.grupe = grupe.filter(g => g.predmetId === predmetId)
    else{
        predmet.grupe = grupe.filter(g => g.predmetId === predmetId && g.id === grupaId)
    }
    for(let i = 0; i<predmet.grupe.length; i++){
        predmet.grupe[i] = await prosiriGrupuSaStudentima(predmet.grupe[i])
    }
    return predmet
}

const prosiriGrupuSaStudentima = async(grupa) =>{
    const studentiGrupeIds = studenti_grupe.filter(sg => sg.grupaId === grupa.id)
    console.log(studentiGrupeIds, studenti, studenti_grupe)
    const studentiGrupe = studentiGrupeIds.map(sg => studenti.find(s => s.id === sg.studentId))

    return {
        ...grupa,
        studenti: studentiGrupe
    }
}

export {
    dajPredmeteSaGrupama,
    dajPredmetPoId
}