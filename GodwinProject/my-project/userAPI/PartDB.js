var sqlite3 = require('sqlite3').verbose();

class PartDB {

    static initialize() {
        this.db.serialize(() => {
            this.db.run('CREATE TABLE Parts (id INTEGER PRIMARY KEY, sku TEXT NOT NULL, descr TEXT NOT NULL, retail INTEGER);');

            this.db.run('INSERT INTO Parts (sku, descr, retail) VALUES ("D9113ARDST", "Single Handle Pull Down Kitchen Faucet", 215.00);');
            this.db.run('INSERT INTO Parts (sku, descr, retail) VALUES ("AS2555.201.002", "Centerset Lav Faucet", 206.00);');
            this.db.run('INSERT INTO Parts (sku, descr, retail) VALUES ("D2538-MPU-DST", "Two Handle Centerset Lav Faucet", 136.00);');
            this.db.run('INSERT INTO Parts (sku, descr, retail) VALUES ("K14660-4", "Tall Single Handle Lav Faucet", 650.00);');
            this.db.run('INSERT INTO Parts (sku, descr, retail) VALUES ("BRZ63225LF", "Single Handle Pull Down Kitchen Faucet", 607.00);');
            this.db.run('INSERT INTO Parts (sku, descr, retail) VALUES ("D454418CP", "Single Handle Pull Down Kitchen Faucet", 267.00);');
            this.db.run('INSERT INTO Parts (sku, descr, retail) VALUES ("MOE4905", "Single Handle Bar Faucet", 170.00);');
        });
    }

    static drop() {
        this.db.serialize(() => {
            this.db.run('DROP TABLE Parts;');
        });
    }

    static all() {
        return new Promise((resolve, reject) => {
            this.db.all('SELECT * from Parts', (err, rows) => {
                resolve(rows);
            });
        });
    }

    // Notice that there is *a lot* of error handling missing here.
    static find(id) {
        return new Promise((resolve, reject) => {
            this.db.all(`SELECT * from Parts where (id == ${id})`, (err, rows) => {
                if (rows.length >= 1) {
                    console.log("resolving");
                    resolve(rows[0]);
                } else {
                    console.log("rejecting");
                    reject(`Part with Id ${id} not found`);
                }
            });
        });
    }

    static create(parts) {
        let sql = `INSERT INTO Parts (sku, descr, retail) VALUES ("${parts.sku}", "${parts.descr}", "${parts.retail}");`;
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
                    resolve({ id: this.lastID, ...parts })
                }
            });
        })
    }

    static update(parts) {
        let sql = `UPDATE Parts SET sku="${parts.sku}", descr="${parts.descr}", retail="${parts.retail} "WHERE id="${parts.id}"`;
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

    static delete(parts) {
        let sql = `DELETE from Parts WHERE id="${parts.id}"`;
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
} // end PartDB

PartDB.db = new sqlite3.Database('parts.sqlite');

module.exports = PartDB;