let sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('fridge.db');

async function get(query, dict) {
    return new Promise((resolve, reject) => db.get(query, dict,
        function (e, r)  {
            if (e) {
                return reject(e);
            }
            return resolve(r);
        }));
}
exports.get = get;

async function all(query, dict) {
    return new Promise((resolve, reject) => db.all(query, dict,
        function (e, r)  {
            if (e) {
                return reject(e);
            }
            return resolve(r);
        }));
}
exports.all = all;

function run(query, dict) {
    return new Promise((resolve, reject) => db.run(query, dict,
        function (e, r)  {
            if (e) {
                return reject(e);
            }
            return resolve(r);
        }));
}
exports.run = run;