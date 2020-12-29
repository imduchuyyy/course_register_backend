USE LEARNING_SYSTEM;

INSERT INTO PERSON 
VALUES 	('000000000', "ADMIN",  "SUPER",        'superadmin',   "M",  	"1999-1-1",    "ABC@GMAIL.COM"),
		('000000001', "A",      "NGUYEN VAN",   "student",      "M",    "1999-1-1",    "ABC@GMAIL.COM"),
		('000000002', "B",      "NGUYEN VAN",   "student",      "M",    "1999-5-1",    "ABC@GMAIL.COM"),
        ('000000003', "MINH",   "DO CONG",      "student",      "M",    "1999-4-5",    "ABC@GMAIL.COM"),
        ('000000004', "VU",     "TRAN VAN",     "aao_staff",    "M",    "1989-7-20",   "ABC@GMAIL.COM"),
        ('000000005', "VAN",    "BUI CONG",     "faculty",      "M",    "1989-12-20",  "ABC@GMAIL.COM"),
        ('000000006', "ANH",    "TRAN NGOC",    "instructor",   "F",    "1980-8-14",   "ABC@GMAIL.COM"),
        ('000000007', "DUNG",   "NGUYEN KIM",   "aao_staff",    "F",    "1985-3-20",   "ABC@GMAIL.COM"),
        ('000000008', "KIM",    "NGUYEN QUOC",  "instructor",   "M",    "1988-10-12",  "ABC@GMAIL.COM");

INSERT INTO ACCOUNTS
VALUES  ('000000000',   'superadmin',     '$2b$10$LojmfXGOFJu9TayiJkYrOuoUUo5/UCTA6NiWDXhBSOXgyb2vCkc1m'),
        ('000000001',   'student',      '$2b$10$LojmfXGOFJu9TayiJkYrOuoUUo5/UCTA6NiWDXhBSOXgyb2vCkc1m'),
        ('000000004',   'aao_staff',      '$2b$10$LojmfXGOFJu9TayiJkYrOuoUUo5/UCTA6NiWDXhBSOXgyb2vCkc1m'),
        ('000000005',   'faculty',      '$2b$10$LojmfXGOFJu9TayiJkYrOuoUUo5/UCTA6NiWDXhBSOXgyb2vCkc1m'),
        ('000000006',   'instructor',      '$2b$10$LojmfXGOFJu9TayiJkYrOuoUUo5/UCTA6NiWDXhBSOXgyb2vCkc1m');
        
INSERT INTO FACULTY
VALUES ('F001', 'ABC'), ('F002', 'DEF');

INSERT INTO AUTHOR
VALUES ('A00000000'), ('A00000001'), ('A00000002');

INSERT INTO PUBLISHER 
VALUES ("NXB TPHCM"), ("NXB HA NOI");

INSERT INTO STUDENT
VALUES 	('SD1800000', '000000001', 7.82, 'F001'),
		('SD1800001', '000000002', 8.51, 'F002'),
        ('SD1800002', '000000003', 8.05, 'F002');
        
INSERT INTO STAFF
VALUES 	("SFF000001", '000000004', 'F001'),
		("SFF000002", '000000005', 'F001'),
        ("SFF000003", '000000006', 'F001'),
        ("SFF000004", '000000007', 'F002'),
        ("SFF000005", '000000008', 'F002');
        
INSERT INTO MANAGEMENT_INSTRUCTOR
VALUES 	("SFF000003", "GS"),
		('SFF000002', "PGS");
        
INSERT INTO INSTRUCTOR
VALUES 	('SFF000001', 'Master', 'SFF000003'),
		('SFF000004', 'Doctor', 'SFF000003'),
        ('SFF000005', 'Doctor', 'SFF000002');
        
INSERT INTO AAO_STAFF
VALUES 	("SFF000001", "GOOD"),
		("SFF000004", "NORMAL");
        
INSERT INTO MAJOR_INSTRUCTOR
VALUES ("SFF000005", 3);

INSERT INTO DOCUMENT
VALUES 	("0000000000000", "SACH A", "NXB TPHCM"),
		("0000000000001", "SACH B", "NXB TPHCM"),
        ("0000000000002", "SACH C", "NXB HA NOI"),
        ("0000000000003", "SACH D", "NXB HA NOI");
        
INSERT INTO COURSE
VALUES 	("C01", "MON A", 2, 'F001'), ("C04", "MON B", 2, 'F001'),
		("C02", "MON C", 1, 'F001'), ("C05", "MON D", 3, 'F001'),
        ("C03", "MON E", 2, 'F002'), ("C06", "MON F", 3, 'F002');
        
INSERT INTO CLASS
VALUES 	('C01', 'L01', '201', 3), ('C01', 'L02', '202', 3),
        ('C01', 'L03', '171', 3), ('C01', 'L04', '172', 3),
        ('C02', 'L01', '201', 3), ('C02', 'L02', '202', 3),
        ('C03', 'L01', '181', 3), ('C04', 'L02', '181', 3),
        ('C05', 'L01', '191', 3), ('C06', 'L02', '192', 3);
        
INSERT INTO CLASS_GROUP
VALUES 	('C01', 'L01', 'A', 'SFF000001'), ('C01', 'L01', 'B', 'SFF000004'),
        ('C01', 'L02', 'A', 'SFF000001'), ('C01', 'L02', 'B', 'SFF000004'),
        ('C01', 'L03', 'A', 'SFF000001'), ('C01', 'L04', 'B', 'SFF000004'),
        ('C03', 'L01', 'C', 'SFF000005'), ('C04', 'L02', 'C', 'SFF000005'),
        ('C05', 'L01', 'C', 'SFF000005'), ('C06', 'L02', 'C', 'SFF000005');

INSERT INTO WEEK_OF_STUDY
VALUES  ('C01', 'L01', 'A', 1, 'SFF000001'), ('C01', 'L01', 'A', 2, 'SFF000001'), ('C01', 'L01', 'A', 3, 'SFF000001'), ('C01', 'L01', 'A', 4, 'SFF000001'),
        ('C01', 'L01', 'B', 5, 'SFF000004'), ('C01', 'L01', 'B', 6, 'SFF000004'), ('C01', 'L01', 'B', 7, 'SFF000004'), ('C01', 'L01', 'B', 8, 'SFF000004'),
        ('C01', 'L02', 'A', 1, 'SFF000001'), ('C01', 'L02', 'A', 2, 'SFF000001'), ('C01', 'L02', 'A', 3, 'SFF000001'), ('C01', 'L02', 'A', 4, 'SFF000001'),
        ('C01', 'L02', 'B', 5, 'SFF000004'), ('C01', 'L02', 'B', 6, 'SFF000004'), ('C01', 'L02', 'B', 7, 'SFF000004'), ('C01', 'L02', 'B', 8, 'SFF000004'),
        ('C01', 'L03', 'A', 1, 'SFF000001'), ('C01', 'L03', 'A', 2, 'SFF000001'), ('C01', 'L03', 'A', 3, 'SFF000001'), ('C01', 'L03', 'A', 4, 'SFF000001'),
        ('C01', 'L04', 'B', 1, 'SFF000004'), ('C01', 'L04', 'B', 2, 'SFF000004'), ('C01', 'L04', 'B', 3, 'SFF000004'), ('C01', 'L04', 'B', 4, 'SFF000004'),
        ('C03', 'L01', 'C', 1, 'SFF000005'), ('C03', 'L01', 'C', 2, 'SFF000005'), ('C03', 'L01', 'C', 3, 'SFF000005'), ('C03', 'L01', 'C', 4, 'SFF000005'),
        ('C04', 'L02', 'C', 1, 'SFF000005'), ('C04', 'L02', 'C', 2, 'SFF000005'), ('C04', 'L02', 'C', 3, 'SFF000005'), ('C04', 'L02', 'C', 4, 'SFF000005'),
        ('C05', 'L01', 'C', 1, 'SFF000005'), ('C05', 'L01', 'C', 2, 'SFF000005'), ('C05', 'L01', 'C', 3, 'SFF000005'), ('C05', 'L01', 'C', 4, 'SFF000005'), 
        ('C06', 'L02', 'C', 1, 'SFF000005'), ('C06', 'L02', 'C', 2, 'SFF000005'), ('C06', 'L02', 'C', 3, 'SFF000005'), ('C06', 'L02', 'C', 4, 'SFF000005');

INSERT INTO REGISTER
VALUES  ('SD1800000', 'C01', '2020-9-1', '201'), ('SD1800000', 'C06', '2020-1-1', '192'),
        ('SD1800001', 'C01', '2020-9-1', '201'), ('SD1800001', 'C01', '2021-1-1', '202'), 
        ('SD1800001', 'C05', '2019-9-1', '191'), ('SD1800002', 'C01', '2017-9-1', '171'), 
        ('SD1800002', 'C01', '2018-1-1', '172'), ('SD1800002', 'C03', '2018-9-1', '181'), 
        ('SD1800002', 'C04', '2018-9-1', '181');


INSERT INTO PARRALLEL_COURSE
VALUES  ('C01', 'C02'), ('C03', 'C04'), ('C05', 'C06');

INSERT INTO DECISION_COURSE
VALUES  ('C03', 'C01'), ('C04', 'C02');

INSERT INTO AUTHOR_WRITE
VALUES  ('A00000000', '0000000000000'), ('A00000000', '0000000000001'),
        ('A00000001', '0000000000002'), ('A00000002', '0000000000003');

INSERT INTO USE_DOCUMENT
VALUES  ('C01', '0000000000000'), ('C02', '0000000000000'),
        ('C03', '0000000000001'), ('C04', '0000000000001'),
        ('C05', '0000000000002'), ('C06', '0000000000003');

INSERT INTO STUDY 
VALUES  ('SD1800000', 'C01', 'L01', 'A'), ('SD1800000', 'C01', 'L01', 'B'),
        ('SD1800001', 'C01', 'L01', 'A'), ('SD1800001', 'C01', 'L01', 'B'),
        ('SD1800001', 'C01', 'L02', 'A'), ('SD1800001', 'C01', 'L02', 'B'),
        ('SD1800002', 'C01', 'L03', 'A'), ('SD1800002', 'C01', 'L04', 'B'),
        ('SD1800002', 'C03', 'L01', 'C'), ('SD1800002', 'C04', 'L02', 'C'),
        ('SD1800001', 'C05', 'L01', 'C'), ('SD1800000', 'C06', 'L02', 'C');

INSERT INTO SAVE_SCORE
VALUES  ('SD1800000', 'C01', 'SFF000005', '7.55'),
        ('SD1800000', 'C06', 'SFF000005', '8.00'),
        ('SD1800001', 'C01', 'SFF000005', '9.50'),
        ('SD1800001', 'C05', 'SFF000005', '8.50'),
        ('SD1800002', 'C01', 'SFF000005', '9.50'),
        ('SD1800002', 'C03', 'SFF000005', '9.50'),
        ('SD1800002', 'C04', 'SFF000005', '8.00');

INSERT INTO DECIDE
VALUES  ('SFF000004', '0000000000000', 'C01', 'L01'), ('SFF000004', '0000000000000', 'C01', 'L02'),
        ('SFF000001', '0000000000000', 'C01', 'L03'), ('SFF000001', '0000000000000', 'C01', 'L04'),
        ('SFF000005', '0000000000000', 'C02', 'L01'), ('SFF000005', '0000000000000', 'C02', 'L02'),
        ('SFF000001', '0000000000001', 'C03', 'L01'), ('SFF000001', '0000000000001', 'C04', 'L02'),
        ('SFF000001', '0000000000002', 'C05', 'L01'), ('SFF000001', '0000000000003', 'C06', 'L02');

INSERT INTO PERSON_PHONE
VALUES  ('000000001', '0123456789'),
        ('000000001', '0323456789'),
        ('000000002', '0123456789'),
        ('000000003', '0323456789'),
        ('000000004', '0338234362'),
        ('000000005', '0323456789');

INSERT INTO STATUS_LEARNING
VALUES  ('SD1800000', 'Studying', '181'), ('SD1800000', 'Studying', '182'),
        ('SD1800000', 'Studying', '191'), ('SD1800000', 'Studying', '192'),
        ('SD1800000', 'Studying', '201'), ('SD1800000', 'Studying', '202'),
        ('SD1800001', 'Studying', '181'), ('SD1800001', 'Studying', '182'),
        ('SD1800001', 'Studying', '191'), ('SD1800001', 'Studying', '192'),
        ('SD1800001', 'Studying', '201'), ('SD1800001', 'Studying', '202'),
        ('SD1800002', 'Studying', '181'), ('SD1800002', 'Studying', '182'),
        ('SD1800002', 'Studying', '191'), ('SD1800002', 'Studying', '192'),
        ('SD1800002', 'Studying', '201'), ('SD1800002', 'Studying', '202');

INSERT INTO DOCUMENT_CATEGORY
VALUES  ("0000000000000", "ECONOMIC"),
        ("0000000000001", "SCIENCE"),
        ("0000000000002", "PROGRAMMING"),
        ("0000000000003", "CHEMISTRY");

INSERT INTO AUTHOR_EMAIL
VALUES  ("A00000000", "ABC@GMAIL.COM"), ("A00000001", "ABC@GMAIL.COM"), ("A00000002", "ABC@GMAIL.COM");

INSERT INTO PUBLISHING_YEAR
VALUES  ("0000000000000", 1999),
        ("0000000000001", 2001),
        ("0000000000002", 2010),
        ("0000000000003", 2005);

INSERT INTO PUBLISHING_TYPE
VALUES ("NXB TPHCM", "domestic"), ("NXB HA NOI", 'domestic');
