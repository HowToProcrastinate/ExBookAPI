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

    static patch(res, id, { title = '', body = '' }) {
        let params = { id };
        if(title !== '') {
            params.title = title;
        }
        if(body !== '') {
            params.body = body;
        }
        db.edit(res, 'notes', params);
    }
};