const db = require('../storage/db');
let entity = 'notes';

module.exports = /** @class */ class Note {

    static list(res) {
        db.getAll(res, entity);
    }

    static get(res, id) {
        let parsed_id = parseInt(id);
        if (!Number.isInteger(parsed_id)) {
            res.sendStatus(404);
            return;
        }
        db.get(res, entity, parsed_id);
    }

    static add(res, { title = '', body = '' }) {
        if (title === '' && body === '') {
            res.sendStatus(400);
            return;
        }
        db.add(res, entity, { title, body });
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

    static remove(res, id) {
        let parsed_id = parseInt(id);
        if (!Number.isInteger(parsed_id)) {
            res.sendStatus(404);
            return;
        }
        db.remove(res, entity, parsed_id);
    }
};