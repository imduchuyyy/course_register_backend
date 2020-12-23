const { query } = require('../../helper')

function insertClass(newClass) {
    const rows = query(`
        
    `)
    console.log('insertClass')
}

function registeClass(idStudent, idClass) {
    console.log("new registe")
}

function listClassReigisted(idStudent) {
    const rows = query(`
        SELECT * FROM COURSE
    WHERE COURSE_ID IN (SELECT COURSE_ID FROM REGISTER WHERE STUDENT_ID = ${idStudent});
    `)
    console.log(rows)   
    return []
}

function listClass(semeter) {
    console.log('listclass')
    return []
}

module.exports = {
    insertClass,
    listClass,
    listClassReigisted
}
