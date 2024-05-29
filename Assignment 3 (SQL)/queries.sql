--Intrebarea 1

SELECT COUNT(DISTINCT Person.id) AS person_count_with_phones
FROM Person
JOIN Position ON Person.id = Position.person_fk
JOIN Phone ON Position.id = Phone.position_fk;

--Intrebarea 2

SElECT Company.name AS company_name, COUNT(DISTINCT Person.id) AS person_records
FROM Company
JOIN Position ON Company.id = Position.company_fk
JOIN Person ON Position.person_fk = Person.id
GROUP BY Company.name
ORDER BY person_records DESC
LIMIT 3;

