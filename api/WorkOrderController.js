const WorkOrderDB = require('./WorkOrderDB');
const WorkOrder = require('./WorkOrder')

class WorkOrderController {

    async index(req, res) {     
        res.send(await WorkOrderDB.all())
    }

    async show(req, res) {
        let id = req.params.id;
        let workOrder = await WorkOrderDB.find(id);

        if (!workOrder) {
            res.send("Could not find workOrder with id of " + id);
        } else {
            res.send(workOrder);
        }
    }

    async create(req, res) {
        console.log("About to create workOrder");
        console.log(req.body);

        let newWorkOrder = req.body;

        // Quick and dirty validation
        if (WorkOrder.isValid(newWorkOrder, await WorkOrderDB.all())) {
            // The 'data' contains the id (primary key) of newly created workOrder
            WorkOrderDB.create(newWorkOrder).then(data => res.send(data));
        } else {
            // Send a 422 response.
            res.status(422);
            res.send({ message: newWorkOrder.errors.join(": ") });
        }
    }

    async update(req, res) {
        let newWorkOrder = req.body;
        console.log("Proposed update: ");
        console.log(newWorkOrder);
        let id = req.params.id;
        let workOrder = await WorkOrderDB.find(id);

        if (!workOrder) {
            res.status(404);
            res.send("Could not find an workOrder with id of " + id);
        } else {
            if (WorkOrder.isValid(newWorkOrder, await WorkOrderDB.all())) {
                // Indicate that the response is successful, but has no body.
                WorkOrderDB.update(newWorkOrder).then(() => {
                    res.status(204);
                    res.send();
                });
            } else {
                // Send a 422 response.
                res.status(422);
                res.send({ message: newWorkOrder.errors.join(": ") });
            }
        }
    }

    async delete(req, res) {
        let id = req.params.id;
        let workOrder = await WorkOrderDB.find(id);
        if (!workOrder) {
            res.status(404);
            res.send("Could not find workOrder with id of " + id);
        } else {
            WorkOrderDB.delete(workOrder).then(() => {
                res.status(204);
                res.send();
            }).catch((message) => {
                res.status(500);
                res.send("Server error: " + message);
            });
        }
    } // end delete
}
module.exports = WorkOrderController;