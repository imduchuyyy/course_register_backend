const { query } = require('../../helper')

async function insertInstructor(
	idCourse,
	idClass,
	idInstructor,
	fromWeek,
	toWeek
) {
	await query(
		`CALL INSERT_INSTRUCTOR_TEACH('${idCourse}', '${idClass}', '${idInstructor}', ${fromWeek}, ${toWeek});`
	)
	console.log('insertInstructor')
}

async function listInstructorInSemester(semester, faculty) {
	const rows = await query(
		`CALL INSTRUCTOR_IN_SEMESTER('${semester}', '${faculty}');`
	)
	console.log('listInstructorInSemester')
	return rows[0]
}

async function listInstructor(idCourse, idClass, semester) {
	const rows = await query(
		`CALL LIST_INSTRUCTOR('${idCourse}', '${idClass}', '${semester}');`
	)
	console.log('listInstructor')
	return rows[0]
}

async function topInstructorNum(semester, faculty) {
	const rows = await query(`CALL MAX_INSTRUCTOR('${semester}', '${faculty}');`)
	console.log('topInstructorNum')
	return rows[0]
}

async function viewInChargedIntructor() {
	const rows = await query(`CALL getInChargedIntructors();`)
	console.log('viewInChargedIntructor')
	return rows[0]
}

async function listInstructorByFaculty(fcode) {
	let result = []
	if (fcode.toLowerCase().trim() == 'all')
		result = await query(
			`SELECT * FROM INSTRUCTOR NATURAL JOIN STAFF NATURAL JOIN PERSON;`
		)
	else
		result = await query(
			`SELECT * FROM INSTRUCTOR NATURAL JOIN STAFF NATURAL JOIN PERSON WHERE FCODE = '${fcode}';`
		)
	return result
}

async function getInstructorId(ssn) {
	const result = await query(
		`SELECT STAFF_ID FROM INSTRUCTOR WHERE SSN = '${ssn}'`
	)
	if (result[0]) return result[0].STAFF_ID
	return null
}

async function createInstructor(instructorInfo) {
	const {
		SSN,
		fname,
		lname,
		gender,
		birthdate,
		email,
		sff_id,
		fcode,
		degree,
		mgr_id
	} = instructorInfo

	await query(`
            INSERT INTO PERSON
            VALUES (
                '${SSN}', 
                '${fname.toUpperCase()}', 
                '${lname.toUpperCase()}', 
                'instructor',
                '${gender.toUpperCase()}',
                '${birthdate}',
                '${email}' );
        `)

	try {
		await query(`
                INSERT INTO STAFF
                VALUES ('${sff_id.toUpperCase()}', '${SSN}', '${fcode.toUpperCase()}');
            `)

		try {
			await query(`
                    INSERT INTO INSTRUCTOR
                    VALUES ('${sff_id.toUpperCase()}', '${degree}', '${mgr_id.toUpperCase()}');
                `)
		} catch (err) {
			await query(`
                    DELETE FROM STAFF
                    WHERE STAFF_ID = '${sff_id}';
                `)
			throw 'Fail to insert instructor'
		}
	} catch (err) {
		await query(`
                DELETE FROM PERSON
                WHERE SSN = '${SSN}';
            `)
		throw 'Fail to insert instructor'
	}
}

module.exports = {
	insertInstructor,
	listInstructorInSemester,
	listInstructor,
	topInstructorNum,
	viewInChargedIntructor,
	listInstructorByFaculty,
	createInstructor,
	getInstructorId
}
