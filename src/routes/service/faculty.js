const { query } = require('../../helper')

async function sumStudent(semester, fcode) {
    const result = await query(`
        CALL SUM_STUDENT('${semester}', '${fcode}')
    `)
    return result[0]
}

async function sumClass(semester, fcode) {
    const result = await query(`
        CALL SUM_CLASS('${semester}', '${fcode}')
    `)
    return result[0]
}

async function maxInstructor(semester, fcode) {
    const result = await query(`
        CALL MAX_INSTRUCTOR('${semester}', '${fcode}')
    `)
    return result[0]
}

async function averageStudentOfCourse(course_id, semester) {
    const result = await query(`
        CALL AVG_REGISTER('${course_id}', '${semester}')
    `)
    return result[0]
}

module.exports = {
    sumStudent,
    sumClass,
    maxInstructor,
    averageStudentOfCourse
}