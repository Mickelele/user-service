const SubstituteService = require('./substitute.service');

class SubstituteController {
    async getAll(req, res) {
        try {
            const substitutes = await SubstituteService.getAll();
            res.json(substitutes);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async getOne(req, res) {
        try {
            const substitute = await SubstituteService.getOne(req.params.id);
            res.json(substitute);
        } catch (err) {
            res.status(404).json({ error: err.message });
        }
    }

    async create(req, res) {
        try {
            const substitute = await SubstituteService.create(req.body);
            res.status(201).json(substitute);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

    async update(req, res) {
        try {
            const substitute = await SubstituteService.update(req.params.id, req.body);
            res.json(substitute);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

    async delete(req, res) {
        try {
            await SubstituteService.delete(req.params.id);
            res.status(204).send();
        } catch (err) {
            res.status(404).json({ error: err.message });
        }
    }

    async getByTeacherReporting(req, res) {
        try {
            const substitutes = await SubstituteService.getByTeacherReporting(req.params.teacherId);
            res.json(substitutes);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async getByTeacherSubstituting(req, res) {
        try {
            const substitutes = await SubstituteService.getByTeacherSubstituting(req.params.teacherId);
            res.json(substitutes);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async getAvailable(req, res) {
        try {
            const substitutes = await SubstituteService.getAvailable();
            res.json(substitutes);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async assignTeacher(req, res) {
        try {
            const { id } = req.params;
            const { id_nauczyciel_zastepujacy } = req.body;
            
            const substitute = await SubstituteService.assignTeacher(id, id_nauczyciel_zastepujacy);
            res.json(substitute);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

    async unassignTeacher(req, res) {
        try {
            const { id } = req.params;
            const substitute = await SubstituteService.unassignTeacher(id);
            res.json(substitute);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }
}

module.exports = new SubstituteController();
