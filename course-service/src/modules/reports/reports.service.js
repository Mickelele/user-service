const axios = require('axios');
const Zajecia = require('../lesson/lesson.model');
const Obecnosc = require('../presence/presence.model');
const ZadanieDomowe = require('../homework/zadanieDomowe.model');
const OdpowiedzNaZadanie = require('../homework_answer/odpowiedzNaZadanie.model');
const Grupa = require('../group/group.model');
const Uczen = require('../group/student.model');
const { Op } = require('sequelize');

const QUIZ_SERVICE_URL = process.env.QUIZ_SERVICE_URL || 'http://localhost:5002';
const POINTS_SERVICE_URL = process.env.POINTS_SERVICE_URL || 'http://localhost:5001';

class ReportsService {
    async getDetailedReport(groupId, studentId) {
        try {
            const report = {
                summary: {},
                homework: {},
                quiz: {},
                attendance: {},
                prizes: {}
            };

            
            const filters = {};
            if (groupId) filters.groupId = parseInt(groupId);
            if (studentId) filters.studentId = parseInt(studentId);

           
            report.attendance = await this.getAttendanceStats(filters);

            
            report.homework = await this.getHomeworkStats(filters);

            
            report.quiz = await this.getQuizStats(filters);

            
            report.prizes = await this.getPrizesStats(filters);

            
            report.summary = {
                totalLessons: report.attendance.totalLessons || 0,
                totalHomeworks: report.homework.totalHomeworks || 0,
                totalQuizzes: report.quiz.totalQuizzes || 0,
                totalPrizes: report.prizes.totalPrizes || 0,
                averageAttendance: report.attendance.attendancePercentage || 0,
                averageHomeworkGrade: report.homework.averageGrade || 0,
                averageQuizScore: report.quiz.averageScore || 0
            };

            return report;
        } catch (error) {
            console.error('Błąd generowania raportu:', error);
            throw error;
        }
    }

    async getAttendanceStats(filters) {
        try {
            const whereClause = {};
            
            if (filters.groupId) {
                const zajecia = await Zajecia.findAll({
                    where: { id_grupy: filters.groupId },
                    attributes: ['id_zajec']
                });
                const zajeciaIds = zajecia.map(z => z.id_zajec);
                whereClause.id_zajec = { [Op.in]: zajeciaIds };
            }

            if (filters.studentId) {
                whereClause.id_ucznia = filters.studentId;
            }

            const obecnosci = await Obecnosc.findAll({
                where: whereClause,
                include: [
                    {
                        model: Zajecia,
                        as: 'zajecia',
                        attributes: ['id_zajec', 'data', 'id_grupy']
                    }
                ]
            });

            const totalLessons = filters.studentId 
                ? obecnosci.length 
                : await Zajecia.count({ where: filters.groupId ? { id_grupy: filters.groupId } : {} });

            const present = obecnosci.filter(o => o.status === 'obecny').length;
            const absent = obecnosci.filter(o => o.status === 'nieobecny').length;
            const late = obecnosci.filter(o => o.status === 'spóźniony').length;
            const excused = obecnosci.filter(o => o.status === 'nieobecny usprawiedliwiony').length;

            return {
                totalLessons,
                present,
                absent,
                late,
                excused,
                attendancePercentage: totalLessons > 0 ? ((present / totalLessons) * 100).toFixed(2) : 0,
                byStatus: {
                    obecny: present,
                    nieobecny: absent,
                    spóźniony: late,
                    'nieobecny usprawiedliwiony': excused
                }
            };
        } catch (error) {
            console.error('Błąd statystyk obecności:', error);
            return { totalLessons: 0, present: 0, absent: 0, late: 0, excused: 0, attendancePercentage: 0 };
        }
    }

    async getHomeworkStats(filters) {
        try {
            const whereClause = {};

            if (filters.studentId) {
                whereClause.id_ucznia = filters.studentId;
            }

            if (filters.groupId) {
                const zadania = await ZadanieDomowe.findAll({
                    where: { id_grupy: filters.groupId },
                    attributes: ['id_zadania']
                });
                const zadaniaIds = zadania.map(z => z.id_zadania);
                whereClause.id_zadania = { [Op.in]: zadaniaIds };
            }

            const odpowiedzi = await OdpowiedzNaZadanie.findAll({
                where: whereClause,
                include: [
                    {
                        model: ZadanieDomowe,
                        as: 'zadanie',
                        attributes: ['tytul', 'id_grupy']
                    }
                ]
            });

            const graded = odpowiedzi.filter(o => o.ocena !== null && o.ocena !== undefined);
            const totalGrade = graded.reduce((sum, o) => sum + parseFloat(o.ocena), 0);
            const averageGrade = graded.length > 0 ? (totalGrade / graded.length).toFixed(2) : 0;

            const gradeDistribution = {
                '0-20': 0,
                '21-40': 0,
                '41-60': 0,
                '61-80': 0,
                '81-100': 0
            };

            graded.forEach(o => {
                const grade = parseFloat(o.ocena);
                if (grade <= 20) gradeDistribution['0-20']++;
                else if (grade <= 40) gradeDistribution['21-40']++;
                else if (grade <= 60) gradeDistribution['41-60']++;
                else if (grade <= 80) gradeDistribution['61-80']++;
                else gradeDistribution['81-100']++;
            });

            return {
                totalHomeworks: odpowiedzi.length,
                graded: graded.length,
                ungraded: odpowiedzi.length - graded.length,
                averageGrade: parseFloat(averageGrade),
                gradeDistribution
            };
        } catch (error) {
            console.error('Błąd statystyk zadań domowych:', error);
            return { totalHomeworks: 0, graded: 0, ungraded: 0, averageGrade: 0 };
        }
    }

    async getQuizStats(filters) {
        try {
            let url = `${QUIZ_SERVICE_URL}/wyniki`;
            const params = [];

            if (filters.studentId) {
                url = `${QUIZ_SERVICE_URL}/wyniki/uczen/${filters.studentId}`;
            }

            const response = await axios.get(url);
            let wyniki = response.data || [];

            
            if (filters.groupId && wyniki.length > 0) {
                wyniki = wyniki.filter(w => w.Quiz && w.Quiz.id_grupy === filters.groupId);
            }

            const totalQuizzes = wyniki.length;
            const totalScore = wyniki.reduce((sum, w) => sum + parseFloat(w.wynik || 0), 0);
            const averageScore = totalQuizzes > 0 ? (totalScore / totalQuizzes).toFixed(2) : 0;

            const scoreDistribution = {
                '0-20': 0,
                '21-40': 0,
                '41-60': 0,
                '61-80': 0,
                '81-100': 0
            };

            wyniki.forEach(w => {
                const score = parseFloat(w.wynik || 0);
                if (score <= 20) scoreDistribution['0-20']++;
                else if (score <= 40) scoreDistribution['21-40']++;
                else if (score <= 60) scoreDistribution['41-60']++;
                else if (score <= 80) scoreDistribution['61-80']++;
                else scoreDistribution['81-100']++;
            });

            return {
                totalQuizzes,
                averageScore: parseFloat(averageScore),
                scoreDistribution
            };
        } catch (error) {
            console.error('Błąd pobierania statystyk quizów:', error.message);
            return { totalQuizzes: 0, averageScore: 0, scoreDistribution: {} };
        }
    }

    async getPrizesStats(filters) {
        try {
            if (!filters.studentId) {
                
                const response = await axios.get(`${POINTS_SERVICE_URL}/nagrody/history/all`);
                const prizes = response.data || [];

                return {
                    totalPrizes: prizes.length,
                    totalPointsSpent: prizes.reduce((sum, p) => sum + (p.koszt || 0), 0),
                    prizesList: prizes.slice(0, 10) 
                };
            }

            const response = await axios.get(`${POINTS_SERVICE_URL}/nagrody/uczen/${filters.studentId}`);
            const prizes = response.data || [];

            const totalPointsSpent = prizes.reduce((sum, p) => sum + (p.koszt || 0), 0);

            return {
                totalPrizes: prizes.length,
                totalPointsSpent,
                prizesList: prizes
            };
        } catch (error) {
            console.error('Błąd pobierania statystyk nagród:', error.message);
            return { totalPrizes: 0, totalPointsSpent: 0, prizesList: [] };
        }
    }
}

module.exports = new ReportsService();
