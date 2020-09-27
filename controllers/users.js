let users = require('../data/index.js');
let counter = users.length;

exports.usersGet = function(req, res) {
    res.json(users);
};

exports.usersGetId = function(req, res) {
    let i = users.findIndex(user => user.id == req.params.id);
    let user = users[i];
    if (user) {
        res.json(user);
    } else {
        res.status(404).send("No such user exists.");
    };
};

exports.usersPost = function(req, res) {
    let postUser = req.body;
    let newUser = {
        id: ++counter,
        name: postUser.name,
        username: postUser.username,
        email: postUser.email,
        address: {
            street: postUser.address.street,
            suite: postUser.address.suite,
            city: postUser.address.city,
            zipcode: postUser.address.zipcode,
            geo: {
                lat: postUser.address.geo.lat,
                lng: postUser.address.geo.lng
            }
        },
        phone: postUser.phone,
        website: postUser.website,
        company: {
            name: postUser.company.name,
            catchPhrase: postUser.company.catchPhrase,
            bs: postUser.company.bs
        }
    };
    users.push(newUser);
    res.send(newUser);
};

exports.usersPut = function(req, res) {
    let putUser = req.body;
    let i = users.findIndex(user => user.id == req.params.id)
    if (i >= 0) {
        if (putUser.name) { users[i].name = putUser.name };
        if (putUser.username) { users[i].username = putUser.username };
        if (putUser.email) { users[i].email = putUser.email };
        if (putUser.address.street) { users[i].address.street = putUser.address.street };
        if (putUser.address.suite) { users[i].address.suite = putUser.address.suite };
        if (putUser.address.city) { users[i].address.city = putUser.address.city };
        if (putUser.address.zipcode) { users[i].address.zipcode = putUser.address.zipcode };
        if (putUser.address.geo.lat) { users[i].address.geo.lat = putUser.address.geo.lat };
        if (putUser.address.geo.lng) { users[i].address.geo.lng = putUser.address.geo.lng };
        if (putUser.phone) { users[i].phone = putUser.phone };
        if (putUser.website) { users[i].website = putUser.website };
        if (putUser.company.name) { users[i].company.name = putUser.company.name };
        if (putUser.company.catchPhrase) { users[i].company.catchPhrase = putUser.company.catchPhrase };
        if (putUser.company.bs) { users[i].company.bs = putUser.company.bs };
        res.json(users[i]);
    } else {
        res.status(400).send("No such user exists.");
    }
};

exports.usersDelete = function(req, res) {
    let i = users.findIndex(user => user.id == req.params.id)
    if (i >= 0) {
        users.splice(i, 1)
        res.json(users);
    } else {
        res.status(400).send("No such user exists.");
    }
}; 