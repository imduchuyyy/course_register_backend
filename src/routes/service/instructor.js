const { query } = require('../../helper')

async function insertInstructor(idCourse, idClass, idInstructor, fromWeek, toWeek){
    await query(`CALL INSERT_INSTRUCTOR_TEACH('${idCourse}', '${idClass}', '${idInstructor}', ${fromWeek}, ${toWeek});`)
    console.log('insertInstructor')
}

async function listInstructorInSemester(semester, faculty){
    const rows = await query(`CALL INSTRUCTOR_IN_SEMESTER('${semester}', '${faculty}');`)
    console.log('listInstructorInSemester')
    return rows[0]
}

async function listInstructor(idCourse, idClass, semester){
    const rows = await query(`CALL LIST_INSTRUCTOR('${idCourse}', '${idClass}', '${semester}');`)
    console.log('listInstructor')
    return rows[0]
}

async function topInstructorNum(semester, faculty){
    const rows = await query(`CALL MAX_INSTRUCTOR('${semester}', '${faculty}');`)
    console.log('topInstructorNum')
    return rows[0]
}

async function viewInChargedIntructor(){
    const rows = await query(`CALL getInChargedIntructors();`)
    console.log('viewInChargedIntructor')
    return rows[0]
}

async function listInstructorByFaculty(fcode) {
    let result = []
    if (fcode.toLowerCase().trim() == 'all') 
        result = await query(`SELECT * FROM INSTRUCTOR;`)
    else result = await query(`SELECT * FROM INSTRUCTOR NATURAL JOIN STAFF WHERE FCODE = '${fcode}';`)
    return result
}

module.exports = {
    insertInstructor,
    listInstructorInSemester,
    listInstructor,
    topInstructorNum,
    viewInChargedIntructor,
    listInstructorByFaculty
}