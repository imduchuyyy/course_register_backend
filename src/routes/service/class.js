const { query } = require('../../helper')

async function insertClass(param) {
    const {course_id, class_id, year_semester, period, faculty} = param
    await query(`CALL 
        INSERT_CLASS(
            '${course_id.toUpperCase()}', 
            '${class_id.toUpperCase()}', 
            '${year_semester}',
             ${period}, 
            '${faculty}');`)
}

async function listClass(semester, faculty) {
    const result = await query(`CALL COURSE_IN_SEMESTER('${semester}', '${faculty}');`);
    return result[0]
}

async function viewClassAndDocument(student_id, semester) {
    const result = await query(`CALL VIEW_CLASS_AND_DOCUMENT('${student_id}', '${semester}')`);
    return result[0]
}

async function viewClassByStudent() {

}

async function viewClassByTeacher() {

}

async function viewClass() {

}

async function viewClassInSemester(student_id, semester) {
    const result = await query(`CALL VIEW_CLASS_IN_SEMESTER('${student_id}', '${semester}')`);
    return result[0]
}

async function viewClassOfCourse(student_id, semester) {
    const result = await query(`CALL VIEW_CLASS_OF_COURSE('${student_id}', '${semester}')`);
    return result[0]
}

async function sumClassInstructor(instructor_id, semester) {
    const result = await query(`CALL SUM_CLASS_OF_INSTRUCTOR('${instructor_id}', '${semester}')`);
    return result[0]
}

async function top5Class(instructor_id) {
    const result = await query(`CALL TOP_5_CLASS('${instructor_id}')`);
    return result[0]
}

async function top5SemesterHighClass(instructor_id) {
    const result = await query(`CALL TOP_5_SEMESTER_HIGH_CLASS('${instructor_id}')`);
    return result[0]
}

module.exports = {
    insertClass,
    listClass,
    viewClassAndDocument,

    viewClassInSemester,
    viewClassOfCourse,
    sumClassInstructor,
    top5Class,
    top5SemesterHighClass
}
