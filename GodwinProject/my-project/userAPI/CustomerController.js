const CustomerDB = require('./CustomerDB');
const Customer = require('./Customer')

class CustomerController {

    async index(req, res) {     
        res.send(await CustomerDB.all())
    }

    async show(req, res) {
        let id = req.params.id;
        let customer = await CustomerDB.find(id);

        if (!customer) {
            res.send("Could not find customer with id of " + id);
        } else {
            res.send(customer);
        }
    }

    async create(req, res) {
        console.log("About to create user");
        console.log(req.body);

        let newCustomer = req.body;

        // Quick and dirty validation
        if (Customer.isValid(newCustomer, await CustomerDB.all())) {
            // The 'data' contains the id (primary key) of newly created customer
            CustomerDB.create(newCustomer).then(data => res.send(data));
        } else {
            // Send a 422 response.
            res.status(422);
            res.send({ message: newCustomer.errors.join(": ") });
        }
    }

    async update(req, res) {
        let newCustomer = req.body;
        console.log("Proposed update: ");
        console.log(newCustomer);
        let id = req.params.id;
        let customer = await CustomerDB.find(id);

        if (!customer) {
            res.status(404);
            res.send("Could not find an customer with id of " + id);
        } else {
            if (Customer.isValid(newCustomer, await CustomerDB.all())) {
                // Indicate that the response is successful, but has no body.
                CustomerDB.update(newCustomer).then(() => {
                    res.status(204);
                    res.send();
                });
            } else {
                // Send a 422 response.
                res.status(422);
                res.send({ message: newCustomer.errors.join(": ") });
            }
        }
    }

    async delete(req, res) {
        let id = req.params.id;
        let customer = await CustomerDB.find(id);
        if (!customer) {
            res.status(404);
            res.send("Could not find customer with id of " + id);
        } else {
            CustomerDB.delete(customer).then(() => {
                res.status(204);
                res.send();
            }).catch((message) => {
                res.status(500);
                res.send("Server error: " + message);
            });
        }
    } // end delete
}
module.exports = CustomerController;