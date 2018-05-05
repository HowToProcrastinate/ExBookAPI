const db = require('../storage/db');

module.exports = /** @class */ class Note {
    
    /**
     * @returns {Array<String>} Listado de Notas
     */
    static list() {
        let notes = db.getAll('notes');
        return notes;
    }

    static get(id) {
        let note = db.get('notes', id);
        return note;
    }
};