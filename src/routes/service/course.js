const { query } = require('../../helper')

async function insertCourse(param) {
	const { course_id, course_name, credit, fcode } = param
	await query(`
        INSERT INTO COURSE
        VALUES ('${course_id.toUpperCase()}', 
                '${course_name.toUpperCase()}', 
                 ${credit}, 
                '${fcode.toUpperCase()}')`)
	return {
		message: 'Add course success'
	}
}

async function listCourse(semester) {
    const result = await query(`
        SELECT *
        FROM COURSE
        WHERE COURSE_ID IN (
            SELECT DISTINCT COURSE_ID 
            FROM CLASS
            WHERE YEAR_SEMESTER = '${semester}');
    `)
    return result;
}

async function listCourseRegisted(student_id, semester) {
    const result = {};
    result.listCourseRegisted = await query(`
        SELECT *
        FROM REGISTER NATURAL JOIN COURSE
        WHERE SEMESTER = '${semester}' AND STUDENT_ID = '${student_id}';
    `);
    result.totalCredit = (await viewTotalCredit(student_id, semester))[0].TOTAL_CREDIT
    return result;
}

async function registerCourse(course_id, student_id) {
	const result = await query(
		`CALL REGISTER_COURSE('${course_id.toUpperCase()}', '${student_id.toUpperCase()}');`
	)
	return result[0]
}

async function viewCourses(course_id) {
	const result = await query(`SELECT * FROM CLASS WHERE COURSE_ID = '${course_id}'');`)
	return result
}

async function viewTotalCredit(student_id, semester) {
	const result = await query(
		`CALL VIEW_TOTAL_CREDIT('${student_id}', '${semester}');`
	)
	return result[0]
}

async function viewTotalCourseRegisted(student_id, semester) {
	const result = await query(
		`CALL VIEW_TOTAL_COURSE_REGISTED('${student_id}', '${semester}');`
	)
	return result[0]
}

async function viewTop3Semester(student_id) {
	const result = await query(`CALL VIEW_TOP3_SEMESTER('${student_id}');`)
	return result[0]
}

async function viewCourseDocument(staff_id, year_semester, class_id) {
	const result = await query(
		`CALL VIEW_COURSE_DOCUMENT('${staff_id}', '${year_semester}', '${class_id}');`
	)
	return result[0]
}

async function viewSumStudent(staff_id, year_semester, class_id) {
	const result = await query(
		`CALL VIEW_SUM_STUDENT('${staff_id}', '${year_semester}', '${class_id}');`
	)
	return result[0]
}

async function courseInSemester(semester, faculty) {
	const result = await query(
		`CALL COURSE_IN_SEMESTER('${semester}', '${faculty}');`
	)
	return result[0]
}

module.exports = {
	insertCourse,
	listCourse,
	listCourseRegisted,
	registerCourse,
	viewCourses,
	viewTotalCredit,
	viewTotalCourseRegisted,
	viewTop3Semester,
	viewCourseDocument,
	viewSumStudent,
	courseInSemester
}
