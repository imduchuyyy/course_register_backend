const { query } = require('../../helper')

async function insertClass(param) {
	const { course_id, class_id, year_semester, period, faculty } = param
	await query(`CALL 
        INSERT_CLASS(
            '${course_id.toUpperCase()}', 
            '${class_id.toUpperCase()}', 
            '${year_semester}',
             ${period}, 
            '${faculty}');`)
	return {
		message: 'Add class success'
	}
}

async function listClass(semester, faculty) {
	const result = await query(
		`CALL COURSE_IN_SEMESTER('${semester}', '${faculty}');`
	)
	return result[0]
}

async function viewClassAndDocument(student_id, semester) {
	const result = await query(
		`CALL VIEW_CLASS_AND_DOCUMENT('${student_id}', '${semester}');`
	)
	return result[0]
}

async function viewClassByStudent(student_id, semester) {
	const result = await query(
		`CALL getClassOfStudent('${student_id}', '${semester}');`
	)
	return result[0]
}

async function viewClassByTeacher(instructor_id, semester) {
	const result = await query(
		`CALL getClassByInstructor('${instructor_id}', '${semester}');`
	)
	return result[0]
}

async function viewClass() {}

async function viewClassInSemester(student_id, semester) {
	const result = await query(
		`CALL VIEW_CLASS_IN_SEMESTER('${student_id}', '${semester}');`
	)
	return result[0]
}

async function viewClassOfCourse(student_id, semester) {
	const result = await query(
		`CALL VIEW_CLASS_OF_COURSE('${student_id}', '${semester}');`
	)
	return result[0]
}

async function sumClassInstructor(instructor_id, semester) {
	const result = await query(
		`CALL SUM_CLASS_OF_INSTRUCTOR('${instructor_id}', '${semester}');`
	)
	return result[0]
}

async function top5Class(instructor_id) {
	const result = await query(`CALL TOP_5_CLASS('${instructor_id}');`)
	return result[0]
}

async function top5SemesterHighClass(instructor_id) {
	const result = await query(
		`CALL TOP_5_SEMESTER_HIGH_CLASS('${instructor_id}');`
	)
	return result[0]
}

async function numberOfClass() {
	// i.9
	const result = await query(`CALL getNumberOfClass();`)
	return result[0]
}

async function getDetailClass(course_id, class_id) {
	const [listStudent, listInstructor, listDocument] = await Promise.all([
		query( `SELECT * FROM STUDY NATURAL JOIN STUDENT 
				WHERE COURSE_ID = '${course_id}' AND CLASS_ID = '${class_id}'`),
		query( `SELECT * FROM CLASS_GROUP NATURAL JOIN INSTRUCTOR 
				WHERE COURSE_ID = '${course_id}' AND CLASS_ID = '${class_id}'`),
		query( `SELECT * FROM USE_DOCUMENT NATURAL JOIN DOCUMENT 
				WHERE COURSE_ID = '${course_id}'`),
	])
	return { listStudent, listInstructor, listDocument }
}

module.exports = {
	insertClass,
	listClass,
	viewClassAndDocument,
	viewClassByStudent,
	viewClassByTeacher,
	viewClass,
	viewClassInSemester,
	viewClassOfCourse,
	sumClassInstructor,
	top5Class,
	top5SemesterHighClass,
	numberOfClass,
	getDetailClass
}
