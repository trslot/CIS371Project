var sqlite3 = require('sqlite3').verbose();

class LoginDB {

    static initialize() {
        this.db.serialize(() => {
            this.db.run('CREATE TABLE Logins (id INTEGER PRIMARY KEY, user TEXT NOT NULL, password TEXT NOT NULL);');

            this.db.run('INSERT INTO Logins (user, password) VALUES ("tslot", "tslot707");');

        });
    }

    static drop() {
        this.db.serialize(() => {
            this.db.run('DROP TABLE Logins;');
        });
    }

    static all() {
        return new Promise((resolve, reject) => {
            this.db.all('SELECT * from Logins', (err, rows) => {
                resolve(rows);
            });
        });
    }

    // Notice that there is *a lot* of error handling missing here.
    static find(id) {
        return new Promise((resolve, reject) => {
            this.db.all(`SELECT * from Logins where (id == ${id})`, (err, rows) => {
                if (rows.length >= 1) {
                    console.log("resolving");
                    resolve(rows[0]);
                } else {
                    console.log("rejecting");
                    reject(`Login with Id ${id} not found`);
                }
            });
        });
    }

    static create(logins) {
        let sql = `INSERT INTO Logins (user, password) VALUES ("${logins.user}", "${logins.password}");`;
        return new Promise((resolve, reject) => {
            console.log('The sql: ');
            console.log(sql);
            this.db.run(sql, function (err, rows) {
                console.log("This: ");
                console.log(this);
                if (err) {
                    console.log('Create Error');
                    console.log(err);
                    reject(err);
                } else {
                    resolve({ id: this.lastID, ...logins })
                }
            });
        })
    }

    static update(logins) {
        let sql = `UPDATE Logins SET user="${logins.user}", password="${logins.password}" WHERE id="${logins.id}"`;
        return new Promise((resolve, reject) => {
            this.db.run(sql, function (err, rows) {
                if (err) {
                    console.log('Update Error');
                    console.log(err);
                    reject(err);
                } else {
                    resolve({ success: true });
                }
            });
        });
    }

    static delete(logins) {
        let sql = `DELETE from Logins WHERE id="${logins.id}"`;
        return new Promise((resolve, reject) => {
            this.db.run(sql, function (err, rows) {
                if (err) {
                    console.log('Delete Error');
                    console.log(err);
                    reject(err);
                } else {
                    resolve({ success: true });
                }
            });
        });
    } // end delete
} // end LoginDB

LoginDB.db = new sqlite3.Database('logins.sqlite');

module.exports = LoginDB;