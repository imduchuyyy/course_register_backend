#(iii.1). Cập nhật giáo trình chính cho môn học do mình phụ trách.

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
CALL delete_document("0000000000004");
SELECT * FROM learning_system.document;
###################################################################################################################3
-- (iv.1). Đăng ký môn học ở học kỳ được đăng ký.
DROP PROCEDURE IF EXISTS REGISTER_COURSE;
DELIMITER //
CREATE PROCEDURE REGISTER_COURSE 
		(COURSE_ID CHAR(3), STUDENT_ID CHAR(9))
BEGIN
	DECLARE _date DATE;
	SET _date = (SELECT CURDATE());
	INSERT INTO REGISTER
    VALUES (STUDENT_ID, COURSE_ID, _date,210);
END //
DELIMITER ;
-- test

CALL REGISTER_COURSE ("C01","SD1800000");
SELECT * FROM learning_system.register;