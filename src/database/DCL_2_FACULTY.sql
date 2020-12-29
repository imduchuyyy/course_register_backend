USE LEARNING_SYSTEM;
####################################################################################################################################################################
#II. FACULTY
####################################################################################################################################################################
-- (ii.1). Cập nhật danh sách môn học được mở trước đầu mỗi học kỳ.
DROP PROCEDURE IF EXISTS INSERT_CLASS;
DELIMITER //
CREATE PROCEDURE INSERT_CLASS 
		(COURSE_ID VARCHAR(3), CLASS_ID VARCHAR(3), YEAR_SEMESTER VARCHAR(3), PERIOD INT, FACULTY VARCHAR(4))
BEGIN
	DECLARE FCODE VARCHAR(4);
    SET FCODE = (SELECT FCODE 
				FROM COURSE C
				WHERE C.COURSE_ID = COURSE_ID);
	IF (FCODE <> FACULTY) THEN
		SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'CAN NOT INSERT CLASS NOT BELONG TO YOUR FACULTY';
	END IF;
    
	INSERT INTO CLASS
    VALUES (COURSE_ID, CLASS_ID, YEAR_SEMESTER, PERIOD);
END //
DELIMITER ;
####################################################################################################################################################################
-- (ii.2). Cập nhật danh sách giảng viên phụ trách mỗi lớp học được mở trước đầu mỗi học kỳ.
DROP PROCEDURE IF EXISTS INSERT_INSTRUCTOR_TEACH;
DELIMITER //
CREATE PROCEDURE INSERT_INSTRUCTOR_TEACH
	(COURSE VARCHAR(3), CLASS VARCHAR(3), INSTRUCTOR_ID VARCHAR(9), FROM_WEEK INT, TO_WEEK INT)
BEGIN
	DECLARE ORDER_NUMBER CHAR;
    DECLARE COUNTER INT DEFAULT FROM_WEEK;
    SET ORDER_NUMBER = (SELECT CHAR(65 + COUNT(DISTINCT(ORDER_NO))) FROM CLASS_GROUP 
					WHERE COURSE_ID = COURSE AND CLASS_ID = CLASS);
    
    INSERT INTO CLASS_GROUP
    VALUES (COURSE, CLASS, ORDER_NUMBER, INSTRUCTOR_ID);
    
    WHILE COUNTER <= TO_WEEK DO
		INSERT INTO WEEK_OF_STUDY
        VALUES (COURSE, CLASS, ORDER_NUMBER, COUNTER, INSTRUCTOR_ID);
        SET COUNTER = COUNTER + 1;
    END WHILE;
END //
DELIMITER ;
-- test
#CALL INSERT_INSTRUCTOR_TEACH('C01','L01','SFF000001',1,2)
####################################################################################################################################################################
-- (ii.3). Xem danh sách môn học ở một học kỳ.
DELIMITER //
CREATE PROCEDURE COURSE_IN_SEMESTER (IN SEMESTER VARCHAR(3), IN FACULTY VARCHAR(4)) 
BEGIN
	SELECT * FROM COURSE
    WHERE COURSE_ID IN (SELECT COURSE_ID FROM CLASS WHERE YEAR_SEMESTER = SEMESTER)
		AND FCODE = FACULTY;
END //
DELIMITER ;
-- test
#CALL COURSE_IN_SEMESTER('201','F001')
####################################################################################################################################################################
-- (ii.4). Xem danh sách giảng viên ở một học kỳ.
DELIMITER //
CREATE PROCEDURE INSTRUCTOR_IN_SEMESTER(IN SEMESTER VARCHAR(3), IN FACULTY VARCHAR(4))
BEGIN
	SELECT * FROM INSTRUCTOR
    WHERE STAFF_ID IN (SELECT STAFF_ID FROM CLASS_GROUP NATURAL JOIN CLASS WHERE YEAR_SEMESTER = SEMESTER)
			AND STAFF_ID IN (SELECT STAFF_ID FROM STAFF WHERE FCODE = FACULTY);
END //
DELIMITER ;
-- test
#CALL  COURSE_IN_SEMESTER('201','F001')
####################################################################################################################################################################
-- (ii.5). Xem danh sách lớp được phụ trách bởi một giảng viên ở một học kỳ.
DELIMITER //
CREATE PROCEDURE LIST_CLASS(IN INSTRUCTOR_ID VARCHAR(9), IN SEMESTER VARCHAR(3))
BEGIN
	SELECT * FROM CLASS
    WHERE (COURSE_ID, CLASS_ID) IN (SELECT COURSE_ID, CLASS_ID
									FROM CLASS_GROUP NATURAL JOIN CLASS
									WHERE STAFF_ID = INSTRUCTOR_ID)
		AND YEAR_SEMESTER = SEMESTER;
END //
DELIMITER ;
-- test
#CALL  LIST_CLASS('SFF000001','201')
####################################################################################################################################################################
-- (ii.6). Xem danh sách giảng viên phụ trách ở mỗi lớp ở một học kỳ.
DELIMITER //
CREATE PROCEDURE LIST_INSTRUCTOR(IN COURSE VARCHAR(3), IN CLASS VARCHAR(3), IN SEMESTER VARCHAR(3))
BEGIN
	SELECT * FROM INSTRUCTOR
    WHERE STAFF_ID IN (SELECT STAFF_ID
					FROM CLASS_GROUP NATURAL JOIN CLASS
					WHERE COURSE_ID = COURSE AND CLASS_ID = CLASS AND YEAR_SEMESTER = SEMESTER);
END //
DELIMITER ;
-- test
#CALL  LIST_INSTRUCTOR('C01','L01','201')
####################################################################################################################################################################
-- (ii.7). Xem các giáo trình được chỉ định cho mỗi môn học ở một học kỳ.
DELIMITER //
CREATE PROCEDURE LIST_DOCUMENT(IN SEMESTER VARCHAR(3), IN FACULTY VARCHAR(4))
BEGIN
	SELECT COURSE_ID, CLASS_ID, ISBN, DOCUMENT_NAME
    FROM DOCUMENT JOIN DECIDE ON DOC_ISBN = ISBN NATURAL JOIN CLASS
    WHERE YEAR_SEMESTER = SEMESTER
		AND COURSE_ID IN (SELECT COURSE_ID FROM COURSE WHERE FCODE = FACULTY);
END //
DELIMITER ;
-- test
#CALL  LIST_DOCUMENT('201','F001')
####################################################################################################################################################################
-- (ii.8). Xem danh sách sinh viên đăng ký cho mỗi lớp ở một học kỳ.
DELIMITER //
CREATE PROCEDURE LIST_STUDENT_REGISTER(IN FACULTY VARCHAR(4))
BEGIN
	SELECT DISTINCT COURSE_ID, CLASS_ID, STUDENT_ID, LNAME, FNAME, GENDER, EMAIL
    FROM STUDY NATURAL JOIN CLASS_GROUP NATURAL JOIN STUDENT NATURAL JOIN PERSON
    WHERE COURSE_ID IN (SELECT COURSE_ID FROM COURSE WHERE FCODE = FACULTY);
END //
DELIMITER ;
-- test
#CALL LIST_STUDENT_REGISTER('F001')
####################################################################################################################################################################
-- (ii.9). Xem tổng số sinh viên đăng ký ở một học kỳ.
DELIMITER //
CREATE PROCEDURE SUM_STUDENT(IN SEM VARCHAR(3), IN FACULTY VARCHAR(4))
BEGIN
	SELECT COUNT(STUDENT_ID) SUM_STUDENT
    FROM REGISTER
	WHERE SEMESTER = SEM
		AND COURSE_ID IN (SELECT COURSE_ID FROM COURSE WHERE FCODE = FACULTY);
END //
DELIMITER ;
-- test
#CALL SUM_STUDENT('201','F001')
####################################################################################################################################################################
-- (ii.10). Xem tổng số lớp được mở ở một học kỳ.
DELIMITER //
CREATE PROCEDURE SUM_CLASS(IN SEMESTER VARCHAR(3), IN FACULTY VARCHAR(4))
BEGIN
	SELECT COUNT(*) NUM_OF_CLASS
    FROM CLASS 
    WHERE YEAR_SEMESTER = SEMESTER
		AND COURSE_ID IN (SELECT COURSE_ID FROM COURSE WHERE FCODE = FACULTY);
END //
DELIMITER ;
-- test
#CALL SUM_CLASS('201','F001')
####################################################################################################################################################################
-- (ii.11). Xem những môn có nhiều giảng viên cùng phụ trách nhất ở một học kỳ.
DELIMITER //
CREATE PROCEDURE MAX_INSTRUCTOR(IN SEMESTER VARCHAR(3), IN FACULTY VARCHAR(4))
BEGIN
	DECLARE MAX_INSTRUCTOR_SEMESTER INT;
    SET MAX_INSTRUCTOR_SEMESTER = 
			(SELECT MAX(COUNT_INSTRUCTOR) 
			FROM (SELECT COUNT(DISTINCT(STAFF_ID)) COUNT_INSTRUCTOR
				  FROM CLASS_GROUP NATURAL JOIN CLASS 
				  WHERE YEAR_SEMESTER = SEMESTER
				  GROUP BY COURSE_ID) COUNTING_TABLE);
                  
	SELECT COURSE_ID
    FROM CLASS_GROUP NATURAL JOIN CLASS
    WHERE YEAR_SEMESTER = SEMESTER
		AND COURSE_ID IN (SELECT COURSE_ID FROM COURSE WHERE FCODE = FACULTY)
    GROUP BY COURSE_ID
    HAVING COUNT(DISTINCT(STAFF_ID)) = MAX_INSTRUCTOR_SEMESTER;
END //
DELIMITER ;
-- test
#CALL MAX_INSTRUCTOR('201','F001');
####################################################################################################################################################################
-- (ii.12). Xem số sinh viên đăng ký trung bình trong 3 năm gần nhất cho một môn học ở một học kỳ.
DROP PROCEDURE IF EXISTS AVG_REGISTER;
DELIMITER //
CREATE PROCEDURE AVG_REGISTER (IN COURSE VARCHAR(3), IN SEM VARCHAR(3))
BEGIN
	DECLARE LOWER_SEMESTER VARCHAR(3);
    DECLARE F_PART INT;
    DECLARE L_PART INT;
    
    SET F_PART = CAST(SUBSTR(SEM, 1, 2) AS UNSIGNED) - 3;
    SET L_PART = CAST(SUBSTR(SEM, 3, 1) AS UNSIGNED);
    SET LOWER_SEMESTER = CONCAT(F_PART, L_PART);
    
    SELECT COUNT(STUDENT_ID) / 3 AVG_STUDENT_REGISTER
    FROM REGISTER
    WHERE COURSE_ID = COURSE AND SEMESTER <= SEM AND SEMESTER >  LOWER_SEMESTER;
END //
DELIMITER ;
-- test
#CALL AVG_REGISTER('C01','201');
####################################################################################################################################################################
