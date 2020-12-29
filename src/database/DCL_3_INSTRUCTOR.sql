USE LEARNING_SYSTEM;
####################################################################################################################################################################
#III. INSTRUCTOR
#####################################################################################################################################################################
#(iii.1). Cập nhật giáo trình chính cho môn học do mình phụ trách.
#add
DROP PROCEDURE IF EXISTS add_document; #add
DELIMITER \\
CREATE PROCEDURE add_document(ISBN VARCHAR(13), DOCUMENT_NAME VARCHAR(15), PUBLISHER_NAME VARCHAR(15))
BEGIN
	INSERT INTO document
    VALUES (ISBN, DOCUMENT_NAME, PUBLISHER_NAME);
END \\
DELIMITER ;
DROP PROCEDURE IF EXISTS update_document; #update
DELIMITER \\
CREATE PROCEDURE update_document(ISBN VARCHAR(13), DOCUMENT_NAME VARCHAR(15), PUBLISHER_NAME VARCHAR(15))
BEGIN
	UPDATE document
    SET document.DOCUMENT_NAME=DOCUMENT_NAME, document.PUBLISHER_NAME=PUBLISHER_NAME
    WHERE document.ISBN=ISBN;
END \\
DELIMITER ;
DROP PROCEDURE IF EXISTS delete_document; #delete
DELIMITER \\
CREATE PROCEDURE delete_document(ISBN VARCHAR(13))
BEGIN
	DELETE FROM document
    WHERE document.ISBN=ISBN;
END \\
DELIMITER ;
#####################################################################################################################################################################
# (iii.2). Xem danh sách lớp học của mỗi môn học do mình phụ trách ở một học kỳ.
DROP VIEW IF EXISTS SEE_LIST_CLASS;
CREATE VIEW SEE_LIST_CLASS  AS
SELECT DISTINCT CLASS_ID, YEAR_SEMESTER, COURSE_ID, STAFF_ID
    FROM (CLASS_GROUP) NATURAL JOIN CLASS;

DROP PROCEDURE IF EXISTS VIEW_LIST_CLASS
DELIMITER \\
CREATE PROCEDURE VIEW_LIST_CLASS(IN _STAFF_ID CHAR(9), _YEAR_SEMESTER CHAR(3), _COURSE_ID CHAR(3))
BEGIN 
	SELECT * FROM SEE_LIST_CLASS
    WHERE STAFF_ID=_STAFF_ID AND YEAR_SEMESTER=_YEAR_SEMESTER AND COURSE_ID=_COURSE_ID;
END \\
DELIMITER ;
-- test
#CALL  VIEW_LIST_CLASS('SFF000001','201','C01');
#####################################################################################################################################################################
# (iii.3). Xem danh sách sinh viên của mỗi lớp học do mình phụ trách ở một học kỳ.
DROP VIEW IF EXISTS SEE_LIST_STUDENT;
CREATE VIEW SEE_LIST_STUDENT  AS
SELECT *
    FROM (CLASS_GROUP)  NATURAL JOIN CLASS 
		NATURAL JOIN STUDY
			NATURAL JOIN STUDENT 
				NATURAL JOIN PERSON;

DROP PROCEDURE IF EXISTS VIEW_LIST_STUDENT;
DELIMITER \\
CREATE PROCEDURE VIEW_LIST_STUDENT(IN _STAFF_ID CHAR(9), _YEAR_SEMESTER CHAR(3), _COURSE_ID CHAR(3),_CLASS_ID CHAR(3))
BEGIN 
	SELECT DISTINCT FNAME, LNAME FROM SEE_LIST_STUDENT
    WHERE STAFF_ID=_STAFF_ID AND YEAR_SEMESTER=_YEAR_SEMESTER AND COURSE_ID=_COURSE_ID AND CLASS_ID=_CLASS_ID;
END \\
DELIMITER ;
-- test
#CALL VIEW_LIST_STUDENT('SFF000004','201','C01','L01');
#####################################################################################################################################################################
# (iii.4). Xem danh sách môn học và giáo trình chính cho mỗi môn học do mình phụ trách ở một học kỳ.

DROP PROCEDURE IF EXISTS VIEW_COURSE_DOCUMENT;
DELIMITER \\
CREATE PROCEDURE VIEW_COURSE_DOCUMENT(IN _STAFF_ID CHAR(9), _YEAR_SEMESTER CHAR(3),_CLASS_ID CHAR(3))
BEGIN 
	DROP VIEW IF EXISTS SEE_COURSE_DOCUMENT;
	CREATE VIEW SEE_COURSE_DOCUMENT  AS
	SELECT CLASS_ID, YEAR_SEMESTER, COURSE_ID, STAFF_ID, DOC_ISBN
		FROM (CLASS_GROUP) NATURAL JOIN CLASS 
			NATURAL JOIN USE_DOCUMENT;
			
	SELECT COURSE_ID, DOC_ISBN FROM SEE_COURSE_DOCUMENT
    WHERE STAFF_ID=_STAFF_ID AND YEAR_SEMESTER=_YEAR_SEMESTER AND CLASS_ID=_CLASS_ID;
END \\
DELIMITER ;
-- test
#CALL VIEW_COURSE_DOCUMENT('SFF000004','201','L01');
#####################################################################################################################################################################
# (iii.5). Xem tổng số sinh viên của mỗi lớp học do mình phụ trách ở một học kỳ.
DROP PROCEDURE IF EXISTS VIEW_SUM_STUDENT;
DELIMITER \\
CREATE PROCEDURE VIEW_SUM_STUDENT(IN _STAFF_ID CHAR(9), _YEAR_SEMESTER CHAR(3),_CLASS_ID CHAR(3))
BEGIN 
	DROP VIEW IF EXISTS SEE_SUM_STUDENT;
	CREATE VIEW SEE_SUM_STUDENT  AS
	SELECT DISTINCT *
		FROM CLASS_GROUP NATURAL JOIN CLASS 
			NATURAL JOIN STUDY;
        
	SELECT COUNT(STUDENT_ID) FROM SEE_SUM_STUDENT
    WHERE STAFF_ID=_STAFF_ID AND YEAR_SEMESTER=_YEAR_SEMESTER AND CLASS_ID=_CLASS_ID;
END \\
DELIMITER ;
-- test
#CALL VIEW_SUM_STUDENT('SFF000001','201','L01');
#####################################################################################################################################################################
-- (iii.6). Xem số lớp học do mình phụ trách ở mỗi học kỳ trong 3 năm liên tiếp gần đây nhất.
DROP PROCEDURE IF EXISTS SUM_CLASS_OF_INSTRUCTOR;
DELIMITER //
CREATE PROCEDURE SUM_CLASS_OF_INSTRUCTOR(IN INSTRUCTOR_ID VARCHAR(9), IN SEMESTER VARCHAR(3))
BEGIN
	DECLARE LOWER_SEMESTER VARCHAR(3);
    DECLARE F_PART INT;
    DECLARE L_PART INT;
    
    SET F_PART = CAST(SUBSTR(SEMESTER, 1, 2) AS UNSIGNED) - 3;
    SET L_PART = CAST(SUBSTR(SEMESTER, 3, 1) AS UNSIGNED);
    SET LOWER_SEMESTER = CONCAT(F_PART, L_PART);
    
    SELECT YEAR_SEMESTER, COUNT(*) SUM_CLASS
    FROM (SELECT DISTINCT COURSE_ID, CLASS_ID, YEAR_SEMESTER
			FROM CLASS NATURAL JOIN CLASS_GROUP
			WHERE YEAR_SEMESTER > LOWER_SEMESTER 
				AND YEAR_SEMESTER <= SEMESTER 
                AND STAFF_ID = INSTRUCTOR_ID) COUNT_TABLE
    GROUP BY YEAR_SEMESTER;
    
END //
DELIMITER ;
-- test
#CALL SUM_CLASS_OF_INSTRUCTOR('SFF000005', '202');
#####################################################################################################################################################################
-- (iii.7). Xem 5 lớp học có số sinh viên cao nhất mà giảng viên từng phụ trách.
DROP PROCEDURE IF EXISTS TOP_5_CLASS;
DELIMITER //
CREATE PROCEDURE TOP_5_CLASS (IN INSTRUCTOR_ID VARCHAR(9))
BEGIN
	SELECT COURSE_ID, CLASS_ID, COUNT(STUDENT_ID) NUM_OF_STUDENT
    FROM CLASS_GROUP NATURAL JOIN CLASS NATURAL JOIN STUDY
    WHERE STAFF_ID = INSTRUCTOR_ID
    GROUP BY COURSE_ID, CLASS_ID
    ORDER BY NUM_OF_STUDENT DESC
    LIMIT 5;
END //
DELIMITER ;
-- test
#CALL TOP_5_CLASS('SFF000001');
#####################################################################################################################################################################
-- (iii.8). Xem 5 học kỳ có số lớp nhiều nhất mà giảng viên từng phụ trách.
DROP PROCEDURE IF EXISTS TOP_5_SEMESTER_HIGH_CLASS;
DELIMITER //
CREATE PROCEDURE TOP_5_SEMESTER_HIGH_CLASS(IN INSTRUCTOR_ID VARCHAR(9))
BEGIN
	SELECT YEAR_SEMESTER, COUNT(*) SUM_CLASS
	FROM (SELECT DISTINCT COURSE_ID, CLASS_ID, YEAR_SEMESTER
			FROM CLASS NATURAL JOIN CLASS_GROUP
			WHERE STAFF_ID = INSTRUCTOR_ID) COUNT_TABLE
    GROUP BY YEAR_SEMESTER
    ORDER BY SUM_CLASS DESC
    LIMIT 5;
END //
DELIMITER ;
-- test
#CALL TOP_5_SEMESTER_HIGH_CLASS('SFF000005');
#####################################################################################################################################################################