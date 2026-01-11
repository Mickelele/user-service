const ReportsService = require('./reports.service');

const ReportsController = {
    async getDetailedReport(req, res) {
        try {
            const { groupId, studentId } = req.query;
            const report = await ReportsService.getDetailedReport(groupId, studentId);
            res.json(report);
        } catch (err) {
            console.error(err);
            res.status(400).json({ error: err.message });
        }
    }
};

module.exports = ReportsController;
