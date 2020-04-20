var sqlite3 = require('sqlite3').verbose();

class CustomerDB {

    static initialize() {
        this.db.serialize(() => {
            this.db.run('CREATE TABLE Customers (id INTEGER PRIMARY KEY, fname TEXT NOT NULL, lname TEXT NOT NULL, streetAddress TEXT NOT NULL, city TEXT NOT NULL, state TEXT NOT NULL, phoneNumber INTEGER, email TEXT NOT NULL);');

            this.db.run('INSERT INTO Customers (fname, lname, streetAddress, city, state, phoneNumber, email) VALUES ("Frank", "Miller", "7 Dark Horse Ave", "Grand Rapids" , "MI", 6165559192, "FrankMiller@DarkHorseComics.com");');

        });
    }

    static drop() {
        this.db.serialize(() => {
            this.db.run('DROP TABLE Customers;');
        });
    }

    static all() {
        return new Promise((resolve, reject) => {
            this.db.all('SELECT * from Customers', (err, rows) => {
                resolve(rows);
            });
        });
    }

    // Notice that there is *a lot* of error handling missing here.
    static find(id) {
        return new Promise((resolve, reject) => {
            this.db.all(`SELECT * from Customers where (id == ${id})`, (err, rows) => {
                if (rows.length >= 1) {
                    console.log("resolving");
                    resolve(rows[0]);
                } else {
                    console.log("rejecting");
                    reject(`Customer with Id ${id} not found`);
                }
            });
        });
    }

    static create(customers) {
        let sql = `INSERT INTO Customers (fname, lname, streetAddress, city, state, phoneNumber, email) VALUES ("${customers.fname}", "${customers.lname}", "${customers.streetAddress}", "${customers.city}","${customers.state}", "${customers.phoneNumber}", "${customers.email}");`;
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
                    resolve({ id: this.lastID, ...customers })
                }
            });
        })
    }

    static update(customers) {
        let sql = `UPDATE Customers SET fname="${customers.fname}", lname="${customers.lname}", streetAddress="${customers.streetAddress}", city="${customers.city}", state="${customers.state}", phoneNumber=${customers.phoneNumber}, email="${customers.email}" WHERE id="${customers.id}"`;
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

    static delete(customers) {
        let sql = `DELETE from Customers WHERE id="${customers.id}"`;
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
} // end CustomerDB

CustomerDB.db = new sqlite3.Database('customers.sqlite');

module.exports = CustomerDB;