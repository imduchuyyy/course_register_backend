USE LEARNING_SYSTEM;
####################################################################################################################################################################
# IV. STUDENT
#####################################################################################################################################################################
-- (iv.1). Đăng ký môn học ở học kỳ được đăng ký.
DROP PROCEDURE IF EXISTS REGISTER_COURSE;
DELIMITER //
CREATE PROCEDURE REGISTER_COURSE 
		(COURSE_ID CHAR(3), STUDENT_ID CHAR(9), SEMESTER CHAR(3))
BEGIN
	DECLARE _date DATE;
    DECLARE NUM_OF_CLASS INT;
    DECLARE NUM_OF_CREDIT INT;
    DECLARE CREDIT_OF_COURSE INT;
    SET NUM_OF_CLASS = (SELECT COUNT(CLASS_ID) 
						FROM CLASS 
                        WHERE CLASS.COURSE_ID = COURSE_ID
								AND YEAR_SEMESTER = SEMESTER);
    
    IF (NUM_OF_CLASS = 0) THEN
		SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'COURSE IS NOT OPEN IN THIS SEMESTER';
	END IF;

	SET NUM_OF_CREDIT = (SELECT SUM(CREDIT)
						FROM REGISTER NATURAL JOIN COURSE
						WHERE REGISTER.STUDENT_ID = STUDENT_ID 
							AND REGISTER.SEMESTER = SEMESTER);

	SET CREDIT_OF_COURSE = (SELECT CREDIT
							FROM COURSE
                            WHERE COURSE.COURSE_ID = COURSE_ID);
                            
    IF (NUM_OF_CREDIT + CREDIT_OF_COURSE > 18) THEN
		SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'CANNOT REGISTER MORE THAN 18 CREDITS';
	END IF;
    
	SET _date = (SELECT CURDATE());
	INSERT INTO REGISTER
    VALUES (STUDENT_ID, COURSE_ID, _date, SEMESTER);
END //
DELIMITER ;

CALL REGISTER_COURSE('C06', 'SD1800001', '192');
#####################################################################################################################################################################
-- (iv.2). Xem danh sách môn học, lớp học, và các giảng viên phụ trách cho mỗi lớp của mỗi môn học ở học kỳ được đăng ký.
DELIMITER //
CREATE PROCEDURE VIEW_COURSE 
		(STU_ID CHAR(9))
BEGIN
	SELECT * FROM COURSE
    WHERE COURSE_ID IN (SELECT COURSE_ID FROM REGISTER WHERE STUDENT_ID = STU_ID);
END //
DELIMITER ;
-- test
CALL VIEW_COURSE ('SD1800000');
#####################################################################################################################################################################
-- (iv.3). Xem danh sách môn học và giáo trình chính cho mỗi môn học mà mình đăng ký ở một học kỳ.
DROP PROCEDURE IF EXISTS VIEW_CLASS_AND_DOCUMENT;
DELIMITER //
CREATE PROCEDURE VIEW_CLASS_AND_DOCUMENT
		(STU_ID CHAR(9), SEMESTER CHAR(3))
BEGIN
	SELECT *
    FROM COURSE NATURAL JOIN  USE_DOCUMENT JOIN DOCUMENT ON DOC_ISBN = ISBN
    WHERE COURSE_ID IN (
			SELECT DISTINCT COURSE_ID
            FROM CLASS WHERE YEAR_SEMESTER = SEMESTER)
		AND COURSE_ID IN (
			SELECT COURSE_ID FROM REGISTER
			WHERE STUDENT_ID = STU_ID);
END //
DELIMITER ;
-- test
CALL VIEW_CLASS_AND_DOCUMENT('SD1800000','201')
#####################################################################################################################################################################
-- (iv.4). Xem danh sách lớp học của mỗi môn học mà mình đăng ký ở một học kỳ.  
DELIMITER //
CREATE PROCEDURE VIEW_CLASS_IN_SEMESTER 
		(STU_ID CHAR(9), SEMESTER CHAR(3))
BEGIN
	SELECT *
    FROM CLASS 
    WHERE COURSE_ID IN (SELECT COURSE_ID FROM REGISTER WHERE STUDENT_ID = STU_ID) 
    AND YEAR_SEMESTER = SEMESTER;
END //
DELIMITER ;
-- test
#CALL VIEW_CLASS_IN_SEMESTER('SD1800000','201');
#####################################################################################################################################################################
-- (iv.5). Xem danh sách lớp học của mỗi môn học mà mình đăng ký có nhiều hơn 1 giảng viên phụ trách ở một học kỳ.
DROP PROCEDURE IF EXISTS VIEW_CLASS_OF_COURSE;
DELIMITER //
CREATE PROCEDURE VIEW_CLASS_OF_COURSE(STU_ID CHAR(9), SEMESTER CHAR(3))
BEGIN
    SELECT *
    FROM CLASS
    WHERE  COURSE_ID IN (SELECT COURSE_ID FROM REGISTER WHERE STUDENT_ID = STU_ID) 
		AND YEAR_SEMESTER = SEMESTER
		AND (COURSE_ID, CLASS_ID) IN (
				SELECT COURSE_ID, CLASS_ID 
				FROM CLASS_GROUP 
				GROUP BY COURSE_ID, CLASS_ID 
				HAVING COUNT(DISTINCT(STAFF_ID)) > 1);
END //
DELIMITER ;
-- test
#CALL VIEW_CLASS_OF_COURSE('SD1800000','201');
#####################################################################################################################################################################
-- (iv.6). Xem tổng số tín chỉ đã đăng ký được ở một học kỳ.
DROP PROCEDURE IF EXISTS VIEW_TOTAL_CREDIT;
DELIMITER //
CREATE PROCEDURE VIEW_TOTAL_CREDIT
		(STU_ID CHAR(9), SEMESTER CHAR(3))
BEGIN
	SELECT SUM(CREDIT) TOTAL_CREDIT
    FROM COURSE NATURAL JOIN REGISTER
	WHERE REGISTER.SEMESTER = SEMESTER AND REGISTER.STUDENT_ID = STU_ID;
    -- FROM COURSE co, REGISTER r, CLASS cl
--     WHERE co.COURSE_ID = r.COURSE_ID 
--     AND cl.COURSE_ID = co.COURSE_ID 
--     AND cl.YEAR_SEMESTER = SEMESTER
--     AND r.STUDENT_ID = STU_ID;
END //
DELIMITER ;
-- test
CALL VIEW_TOTAL_CREDIT('SD1800000','201');
#####################################################################################################################################################################
-- (iv.7). Xem tổng số môn học đã đăng ký được ở một học kỳ.
DROP PROCEDURE IF EXISTS VIEW_TOTAL_COURSE_REGISTED;
DELIMITER //
CREATE PROCEDURE VIEW_TOTAL_COURSE_REGISTED
		(STU_ID CHAR(9), SEMESTER CHAR(3))
BEGIN
	SELECT DISTINCT *, COUNT(*) 
    FROM COURSE NATURAL JOIN REGISTER
		NATURAL JOIN CLASS
	WHERE CLASS.YEAR_SEMESTER = SEMESTER AND REGISTER.STUDENT_ID = STU_ID;
    -- FROM COURSE co, REGISTER r, CLASS cl
--     WHERE co.COURSE_ID = r.COURSE_ID 
--     AND cl.COURSE_ID = co.COURSE_ID 
--     AND cl.YEAR_SEMESTER = SEMESTER
--     AND r.STUDENT_ID = STU_ID;
END //
DELIMITER ;
-- test
#CALL VIEW_TOTAL_COURSE_REGISTED('SD1800000','201');
#####################################################################################################################################################################
-- (iv.8). Xem 3 học kỳ có số tổng số tín chỉ cao nhất mà mình đã từng đăng ký.
DROP PROCEDURE IF EXISTS VIEW_TOP3_SEMESTER;
DELIMITER //
CREATE PROCEDURE VIEW_TOP3_SEMESTER(STU_ID CHAR(9))
BEGIN
	SELECT SEMESTER, SUM(CREDIT) as sum_credit
    -- FROM (
-- 		SELECT YEAR_SEMESTER, SUM(CREDIT)
-- 		FROM CLASS cl JOIN COURSE co ON cl.COURSE_ID = co.COURSE_ID
-- 		WHERE co.COURSE_ID IN (SELECT COURSE_ID FROM REGISTER WHERE STUDENT_ID = STU_ID)
-- 		GROUP BY YEAR_SEMESTER
-- 		ORDER BY SUM(CREDIT) DESC)
	 FROM REGISTER NATURAL JOIN COURSE WHERE REGISTER.STUDENT_ID=STU_ID GROUP BY SEMESTER ORDER BY sum_credit DESC LIMIT 3; 
	#WHERE ROWNUM = 3;
END //
DELIMITER ;
-- test
CALL VIEW_TOP3_SEMESTER('SD1800000');
#####################################################################################################################################################################