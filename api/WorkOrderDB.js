var sqlite3 = require('sqlite3').verbose();
const Customers = require('./CustomerDB')


class WorkOrderDB {

    static initialize() {
        this.db.serialize(() => {
            this.db.run('CREATE TABLE WorkOrders (id INTEGER PRIMARY KEY, workOrderNumber NUMBER NOT NULL, custID NUMBER NOT NULL, date text NOT NULL, partID NUMBER NOT NULL);');

            this.db.run('INSERT INTO WorkOrders (workOrderNumber, custID, date, partID) VALUES (1, 1, "04/10/20", 1);');
            this.db.run('INSERT INTO WorkOrders (workOrderNumber, custID, date, partID) VALUES (1, 1, "04/10/20", 2);');
            this.db.run('INSERT INTO WorkOrders (workOrderNumber, custID, date, partID) VALUES (1, 1, "04/10/20", 5);');
            this.db.run('INSERT INTO WorkOrders (workOrderNumber, custID, date, partID) VALUES (2, 2, "04/11/20", 4);');
            this.db.run('INSERT INTO WorkOrders (workOrderNumber, custID, date, partID) VALUES (2, 2, "04/11/20", 6);');
            this.db.run('INSERT INTO WorkOrders (workOrderNumber, custID, date, partID) VALUES (3, 3, "04/15/20", 3);');
            
        });
    }

    static drop() {
        this.db.serialize(() => {
            this.db.run('DROP TABLE WorkOrders;');
        });
    }

    static all() {
        return new Promise((resolve, reject) => {
            this.db.all('SELECT * FROM WorkOrders' , (err, rows) => { 
            resolve(rows);
            });
        });
    }
    
    // Notice that there is *a lot* of error handling missing here.
    static find(id) {
        return new Promise((resolve, reject) => {
            this.db.all(`SELECT * from WorkOrders where (id == ${id})`, (err, rows) => {
                if (rows.length >= 1) {
                    console.log("resolving");
                    resolve(rows[0]);
                } else {
                    console.log("rejecting");
                    reject(`Work order with Id ${id} not found`);
                }
            });
        });
    }

    static create(workOrders) {
        let sql = `INSERT INTO WorkOrders (workOrderNumber, custID, date, partID) VALUES (${workOrders.workOrderNumber}, ${workOrders.custID}, ${workOrders.date}, ${workOrders.partID});`;
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
                    resolve({ id: this.lastID, ...workOrders })
                }
            });
        })
    }

    static update(workOrders) {
        let sql = `UPDATE WorkOrders SET workOrderNumber="${workOrders.workOrderNumber}", custID="${workOrders.custID}", date="${workOrders.date}", partID="${workOrders.partID} "WHERE id="${workOrders.id}"`;
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

    static delete(workOrders) {
        let sql = `DELETE from WorkOrders WHERE id="${workOrders.id}"`;
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
} // end WorkOrderDB

WorkOrderDB.db = new sqlite3.Database('workOrders.sqlite');

module.exports = WorkOrderDB;