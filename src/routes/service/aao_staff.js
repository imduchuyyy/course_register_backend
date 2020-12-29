const { query } = require('../../helper')

async function getNumberOfCourse() {
    const result = await query(`
        call getNumberOfCourse();
    `)
    return result[0]
}

async function getNumberOfClass() {
    const result = await query(`
        call getNumberOfClass();
    `)
    return result[0]
}

async function getStudentByCourse(semester) {
    const result = await query(`
        call getStudentByCourse('${semester}');
    `)
    return result[0]
}

async function getStudentByClass(course_id, semester) {
    const result = await query(`
        call getStudentByClass('${course_id}','${semester}');
    `)
    return result[0]
}


async function getNumberOfStudent() {
    const result = await query(`
        call getNumberOfStudent();
    `)
    return result[0]
}


module.exports = {
    getNumberOfCourse,
    getNumberOfClass,
    getStudentByCourse,
    getStudentByClass,
    getNumberOfStudent
}