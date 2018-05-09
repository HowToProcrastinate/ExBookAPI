var db = {
    'notes': []
};

function getAll(res, collection) {
    res.send(db[collection]);
}

function get(res, collection, id) {
    let note = db[collection].find((el) => el.id === id);
    res.send(note);
}

function add(res, collection, data) {
    data.id = db[collection].length + 1;
    db[collection].push(data);
    res.status(201).send('ok');
}

function edit(res, collection, data) {
    let noteIndex = db[collection].findIndex((el) => el.id === data.id);
    Object.assign(db[collection][noteIndex], data);
    res.send(db[collection][noteIndex]);
}

function remove(res, collection, id) {
    db[collection] = db[collection].filter((el) => el.id !== id);
    res.status(200).send('ok');
}

module.exports = {
    getAll,
    get,
    add,
    edit,
    remove
};