const { sequelize } = require('../../config/db');
const ZadanieDomowe = require('./zadanieDomowe.model');

const HomeworkRepository = {
    async createHomework(data) {
        const homework = await ZadanieDomowe.create({
            id_grupy: data.id_grupy,
            tytul: data.tytul,
            opis: data.opis,
            termin: data.termin
        });
        return homework;
    },

    async getHomeworkByGroupId(id_grupy, id_ucznia) {
        const groupId = Number(id_grupy);
        const studentId = Number(id_ucznia);

        if (Number.isNaN(groupId)) {
            throw new Error('Nieprawidłowe id_grupy');
        }
        if (Number.isNaN(studentId)) {
            throw new Error('Nieprawidłowe id_ucznia');
        }

        const [results] = await sequelize.query(
            `
            SELECT z.*
            FROM zadanie_domowe z
            WHERE z.id_grupy = :id_grupy
              AND NOT EXISTS (
                  SELECT 1
                  FROM odpowiedz_na_zadanie o  
                  WHERE o.id_zadania = z.id_zadania
                    AND o.id_ucznia = :id_ucznia
              )
            `,
            {
                replacements: {
                    id_grupy: groupId,
                    id_ucznia: studentId
                },
                type: sequelize.QueryTypes.SELECT
            }
        );

        return results;
    },

    async getAllHomeworkByGroupIdWithStatus(id_grupy, id_ucznia) {
        const groupId = Number(id_grupy);
        const studentId = Number(id_ucznia);

        if (Number.isNaN(groupId)) {
            throw new Error('Nieprawidłowe id_grupy');
        }
        if (Number.isNaN(studentId)) {
            throw new Error('Nieprawidłowe id_ucznia');
        }

        const results = await sequelize.query(
            `
            SELECT 
                z.*,
                CASE 
                    WHEN o.id_odpowiedzi IS NOT NULL THEN true
                    ELSE false
                END AS rozwiazane,
                o.id_odpowiedzi,
                o.ocena
            FROM zadanie_domowe z
            LEFT JOIN odpowiedz_na_zadanie o 
                ON o.id_zadania = z.id_zadania 
                AND o.id_ucznia = :id_ucznia
            WHERE z.id_grupy = :id_grupy
            ORDER BY z.termin DESC
            `,
            {
                replacements: {
                    id_grupy: groupId,
                    id_ucznia: studentId
                },
                type: sequelize.QueryTypes.SELECT
            }
        );

        return results;
    }



};

module.exports = HomeworkRepository;
