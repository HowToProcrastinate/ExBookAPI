let notes = [];
notes.push({
    'title': 'Note 1',
    'body': 'Content'
});
notes.push({
    'title': 'Note 2',
    'body': 'Content'
});
notes.push({
    'title': 'Note 3',
    'body': 'Content'
});
notes.push({
    'title': 'Note 4',
    'body': 'Content'
});

module.exports = /** @class */ class Note {
    
    /**
     * @returns {Array<String>} Listado de Notas
     */
    static list() {
        return notes;
    }

    static get(id) {
        return (id > notes.length) ? -1 : notes[id];
    }
};