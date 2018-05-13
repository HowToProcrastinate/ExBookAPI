const db = require('../storage/db');
let entity = 'notes';

module.exports = /** @class */ class Note {

    static add(res, { title = '', body = '' }) {
        if (title === '' && body === '') {
            res.sendStatus(400);
            return;
        }
        let params = {};
        if (title !== '') {
            params.title = title;
        }
        if (body !== '') {
            params.body = body;
        }
        db.add(res, entity, params);
    }

    static list(res) {
        db.getAll(res, entity);
    }

    static get(res, id = '') {
        if (id === '') {
            res.sendStatus(400);
            return;
        }
        db.get(res, entity, id);
    }

    static patch(res, id, { title = '', body = '' }) {
        let params = { id };
        if (title !== '') {
            params.title = title;
        }
        if (body !== '') {
            params.body = body;
        }
        db.edit(res, entity, params);
    }

    static remove(res, id = '') {
        if (id === '') {
            res.sendStatus(400);
            return;
        }
        db.remove(res, entity, id);
    }
};