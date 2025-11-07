const GroupRepository = require('./group.repository');

class GroupService {
    async getAll() {
        return await GroupRepository.findAll();
    }

    async getOne(id) {
        const course = await GroupRepository.findById(id);
        if (!course) throw new Error('Grupa nie znaleziona');
        return course;
    }

    async create(data) {
        return await GroupRepository.createCourse(data);
    }

    async update(id, data) {
        return await GroupRepository.updateCourse(id, data);
    }

    async delete(id) {
        return await GroupRepository.deleteCourse(id);
    }


}

module.exports = new GroupService();
