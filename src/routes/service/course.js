const { query } = require('../../helper')

function insertCourse(newCourse) {
    console.log('new course')
}


async function listCourse(semeter) {
    const rows = await query(
        `SELECT * FROM COURSE
    WHERE COURSE_ID IN (SELECT COURSE_ID FROM CLASS WHERE YEAR_SEMESTER = '${semeter}')
		;`
    )

    console.log(rows)
    return rows
}

module.exports = {
    insertCourse,
    listCourse
}
