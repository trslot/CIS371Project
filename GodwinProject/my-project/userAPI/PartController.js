const PartDB = require('./PartDB');
const Part = require('./Part')

class PartController {

    async index(req, res) {     
        res.send(await PartDB.all())
    }

    async show(req, res) {
        let id = req.params.id;
        let part = await PartDB.find(id);

        if (!part) {
            res.send("Could not find part with id of " + id);
        } else {
            res.send(part);
        }
    }

    async create(req, res) {
        console.log("About to create part");
        console.log(req.body);

        let newPart = req.body;

        // Quick and dirty validation
        if (Part.isValid(newPart, await PartDB.all())) {
            // The 'data' contains the id (primary key) of newly created part
            PartDB.create(newPart).then(data => res.send(data));
        } else {
            // Send a 422 response.
            res.status(422);
            res.send({ message: newPart.errors.join(": ") });
        }
    }

    async update(req, res) {
        let newPart = req.body;
        console.log("Proposed update: ");
        console.log(newPart);
        let id = req.params.id;
        let part = await PartDB.find(id);

        if (!part) {
            res.status(404);
            res.send("Could not find an part with id of " + id);
        } else {
            if (Part.isValid(newPart, await PartDB.all())) {
                // Indicate that the response is successful, but has no body.
                PartDB.update(newPart).then(() => {
                    res.status(204);
                    res.send();
                });
            } else {
                // Send a 422 response.
                res.status(422);
                res.send({ message: newPart.errors.join(": ") });
            }
        }
    }

    async delete(req, res) {
        let id = req.params.id;
        let part = await PartDB.find(id);
        if (!part) {
            res.status(404);
            res.send("Could not find part with id of " + id);
        } else {
            PartDB.delete(part).then(() => {
                res.status(204);
                res.send();
            }).catch((message) => {
                res.status(500);
                res.send("Server error: " + message);
            });
        }
    } // end delete
}
module.exports = PartController;