USE LEARNING_SYSTEM;
####################################################################################################################################################################
#I. AAO_STAFF
####################################################################################################################################################################
SET sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''));
####################################################################################################################################################################
-- (i.1). Cập nhật đăng ký môn học của các lớp
-- // phía dưới cùng //
#####################################################################################################################################################################
-- (i.2). Xem danh sách lớp đã được đăng ký bởi một sinh viên ở một học kỳ
DROP PROCEDURE IF EXISTS getClassOfStudent;
DELIMITER //
CREATE PROCEDURE getClassOfStudent(STU_ID CHAR(9), SEMESTER CHAR(3))
BEGIN
    SELECT *
    FROM LEARNING_SYSTEM.CLASS
    WHERE YEAR_SEMESTER = SEMESTER AND COURSE_ID IN (
		SELECT COURSE_ID FROM LEARNING_SYSTEM.REGISTER
        WHERE STUDENT_ID = STU_ID);
END //
DELIMITER ;
-- test
CALL LEARNING_SYSTEM.getClassOfStudent('SD1800000','201');
#####################################################################################################################################################################
-- (i.3). Xem danh sách lớp được phụ trách bởi một giảng viên ở một học kỳ
DROP PROCEDURE IF EXISTS getClassByInstructor;
DELIMITER //
CREATE PROCEDURE getClassByInstructor(STA_ID CHAR(9), SEMESTER CHAR(3))
BEGIN
    SELECT *
    FROM LEARNING_SYSTEM.CLASS c
    WHERE YEAR_SEMESTER = SEMESTER AND COURSE_ID IN (
		SELECT cg.COURSE_ID FROM LEARNING_SYSTEM.CLASS_GROUP cg
        WHERE cg.STAFF_ID = STA_ID AND cg.CLASS_ID = c.CLASS_ID);
END //
DELIMITER ;
-- test
CALL getClassByInstructor('SFF000001','201');
#####################################################################################################################################################################
-- (i.4). Xem danh sách môn học được đăng ký ở mỗi học kỳ ở mỗi khoa
DROP PROCEDURE IF EXISTS getCourseOfFaculty;
DELIMITER //
CREATE PROCEDURE getCourseOfFaculty()
BEGIN
    SELECT DISTINCT FACULTY_NAME, YEAR_SEMESTER, co.COURSE_NAME
    FROM FACULTY, COURSE co, CLASS cl
    WHERE FACULTY_CODE = FCODE AND co.COURSE_ID = cl.COURSE_ID
    ORDER BY FACULTY_NAME, YEAR_SEMESTER, co.COURSE_NAME;
END //
DELIMITER ;
-- test
#CALL getCourseOfFaculty();
#####################################################################################################################################################################
-- (i.5). Xem danh sách sinh viên đăng ký ở mỗi lớp ở mỗi học kỳ ở mỗi khoa
DROP PROCEDURE IF EXISTS getRegisterStudents;
DELIMITER //
CREATE PROCEDURE getRegisterStudents()
BEGIN
    SELECT DISTINCT FNAME, s.STUDENT_ID, st.CLASS_ID, YEAR_SEMESTER, FACULTY_NAME
    FROM PERSON p, STUDENT s, STUDY st, FACULTY, CLASS cl
    WHERE p.SSN = s.SSN AND s.STUDENT_ID = st.STUDENT_ID 
		AND s.FCODE = FACULTY_CODE AND st.CLASS_ID = cl.CLASS_ID 
	ORDER BY FACULTY_NAME, YEAR_SEMESTER, st.CLASS_ID, s.STUDENT_ID;
END //
DELIMITER ;
-- test
CALL getRegisterStudents();
#####################################################################################################################################################################
-- (i.6). Xem danh sách giảng viên phụ trách ở mỗi lớp ở mỗi học kỳ ở mỗi khoa
DROP PROCEDURE IF EXISTS getInChargedInstructors;
DELIMITER //
CREATE PROCEDURE getInChargedIntructors()
BEGIN
    SELECT DISTINCT FNAME, cg.STAFF_ID, cg.CLASS_ID, YEAR_SEMESTER, FACULTY_NAME
    FROM PERSON p, STAFF s, CLASS_GROUP cg, CLASS c, FACULTY
    WHERE p.SSN = s.SSN AND s.STAFF_ID = cg.STAFF_ID
		AND cg.CLASS_ID = c.CLASS_ID AND cg.COURSE_ID = c.COURSE_ID AND s.FCODE = FACULTY_CODE
	ORDER BY FACULTY_NAME, YEAR_SEMESTER, cg.CLASS_ID;
END //
DELIMITER ;
-- test
#CALL getInChargedIntructors();
#####################################################################################################################################################################
-- (i.7). Xem các giáo trình được chỉ định cho mỗi môn học ở mỗi học kỳ ở mỗi khoa
DROP PROCEDURE IF EXISTS getAssignedDocument;
DELIMITER //
CREATE PROCEDURE getAssignedDocument()
BEGIN
    SELECT DISTINCT DOCUMENT_NAME, COURSE_NAME, YEAR_SEMESTER, FACULTY_NAME
    FROM DOCUMENT, DECIDE d, COURSE c, CLASS cl, FACULTY
    WHERE ISBN = d.DOC_ISBN AND d.COURSE_ID = c.COURSE_ID 
		AND d.CLASS_ID = cl.CLASS_ID AND d.COURSE_ID = cl.COURSE_ID AND c.FCODE = FACULTY_CODE
	ORDER BY FACULTY_NAME, YEAR_SEMESTER, COURSE_NAME;
END //
DELIMITER ;
-- test
#CALL getAssignedDocument();
#####################################################################################################################################################################
-- (i.8). Xem tổng số môn học được đăng ký ở mỗi học kỳ ở mỗi khoa
DROP PROCEDURE IF EXISTS getNumberOfCourse;
DELIMITER //
CREATE PROCEDURE getNumberOfCourse()
BEGIN
    SELECT FACULTY_NAME, YEAR_SEMESTER, COUNT(*)
    FROM FACULTY, COURSE co, CLASS cl
    WHERE FACULTY_CODE = co.FCODE AND co.COURSE_ID = cl.COURSE_ID
    GROUP BY FACULTY_NAME, YEAR_SEMESTER;
END //
DELIMITER ;
-- test
#CALL getNumberOfCourse();
#####################################################################################################################################################################
-- (i.9). Xem tổng số lớp được mở ở mỗi học kỳ ở mỗi khoa
DROP PROCEDURE IF EXISTS getNumberOfClass;
DELIMITER //
CREATE PROCEDURE getNumberOfClass()
BEGIN
    SELECT FACULTY_NAME, YEAR_SEMESTER, COUNT(*)
    FROM FACULTY, COURSE co, CLASS cl
    WHERE FACULTY_CODE = FCODE AND co.COURSE_ID = cl.COURSE_ID
    GROUP BY FACULTY_NAME, YEAR_SEMESTER;
END //
DELIMITER ;
-- test
#CALL getNumberOfClass();
#####################################################################################################################################################################
-- (i.10). Xem tổng số sinh viên đăng ký ở mỗi lớp của một môn học ở một học kỳ
DROP PROCEDURE IF EXISTS getStudentByClass;
DELIMITER //
CREATE PROCEDURE getStudentByClass(CO_ID CHAR(3), SEMESTER CHAR(3))
BEGIN
    SELECT cl.CLASS_ID, COUNT(*)
    FROM CLASS cl, COURSE co, REGISTER r
    WHERE cl.COURSE_ID = co.COURSE_ID AND co.COURSE_ID = r.COURSE_ID
		AND r.COURSE_ID = CO_ID AND cl.YEAR_SEMESTER = SEMESTER
	GROUP BY cl.CLASS_ID;
END //
DELIMITER ;
-- test
#CALL getStudentByClass('C01','201');
#####################################################################################################################################################################
-- (i.11). Xem tổng số sinh viên đăng ký ở mỗi môn học ở một học kỳ
DROP PROCEDURE IF EXISTS getStudentByCourse;
DELIMITER //
CREATE PROCEDURE getStudentByCourse(SEMESTER CHAR(3))
BEGIN
    SELECT r.COURSE_ID, COUNT(*)
    FROM COURSE co, REGISTER r, CLASS cl
    WHERE co.COURSE_ID = r.COURSE_ID AND cl.COURSE_ID = co.COURSE_ID AND cl.YEAR_SEMESTER = SEMESTER
	GROUP BY r.COURSE_ID;
END //
DELIMITER ;
-- test
#CALL getStudentByCourse('201');
#####################################################################################################################################################################
-- (i.12). Xem tổng số sinh viên đăng ký ở mỗi học kỳ ở mỗi khoa
DROP PROCEDURE IF EXISTS getNumberOfStudent;
DELIMITER //
CREATE PROCEDURE getNumberOfStudent()
BEGIN
    SELECT FACULTY_NAME, YEAR_SEMESTER, COUNT(*)
    FROM FACULTY, COURSE co, CLASS cl, REGISTER r
    WHERE FACULTY_CODE = FCODE AND co.COURSE_ID = cl.COURSE_ID AND co.COURSE_ID = r.COURSE_ID
    GROUP BY FACULTY_NAME, YEAR_SEMESTER;
END //
DELIMITER ;
-- test
#CALL getNumberOfStudent();
#####################################################################################################################################################################
