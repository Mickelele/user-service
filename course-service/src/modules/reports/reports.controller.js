const ReportsService = require('./reports.service');

const ReportsController = {
    async getDetailedReport(req, res) {
        try {
            const { groupId, studentId } = req.query;
            const token = req.headers.authorization;
            const report = await ReportsService.getDetailedReport(groupId, studentId, token);
            res.json(report);
        } catch (err) {
            console.error(err);
            res.status(400).json({ error: err.message });
        }
    }
};

module.exports = ReportsController;
