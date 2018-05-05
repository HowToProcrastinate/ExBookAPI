const db = require('../storage/db');

module.exports = /** @class */ class Note {

    static list(res) {
        db.getAll(res,'notes');
    }

    static get(res, id) {
        db.get(res, 'notes', id);
    }

    static add(res, { title = 'Empty title', body = 'Empty' }) {
        db.add(res, 'notes', { title, body });
    }
};