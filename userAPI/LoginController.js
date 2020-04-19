const LoginDB = require('./LoginDB');
const Login = require('./Login')

class LoginController {

    async index(req, res) {     
        res.send(await LoginDB.all())
    }

    async show(req, res) {
        let id = req.params.id;
        let login = await LoginDB.find(id);

        if (!login) {
            res.send("Could not find login with id of " + id);
        } else {
            res.send(login);
        }
    }

    async create(req, res) {
        console.log("About to create login");
        console.log(req.body);

        let newLogin = req.body;

        // Quick and dirty validation
        if (Login.isValid(newLogin, await LoginDB.all())) {
            // The 'data' contains the id (primary key) of newly created login
            LoginDB.create(newLogin).then(data => res.send(data));
        } else {
            // Send a 422 response.
            res.status(422);
            res.send({ message: newLogin.errors.join(": ") });
        }
    }

    async update(req, res) {
        let newLogin = req.body;
        console.log("Proposed update: ");
        console.log(newLogin);
        let id = req.params.id;
        let login = await LoginDB.find(id);

        if (!login) {
            res.status(404);
            res.send("Could not find an login with id of " + id);
        } else {
            if (Login.isValid(newLogin, await LoginDB.all())) {
                // Indicate that the response is successful, but has no body.
                LoginDB.update(newLogin).then(() => {
                    res.status(204);
                    res.send();
                });
            } else {
                // Send a 422 response.
                res.status(422);
                res.send({ message: newLogin.errors.join(": ") });
            }
        }
    }

    async delete(req, res) {
        let id = req.params.id;
        let login = await LoginDB.find(id);
        if (!login) {
            res.status(404);
            res.send("Could not find login with id of " + id);
        } else {
            LoginDB.delete(login).then(() => {
                res.status(204);
                res.send();
            }).catch((message) => {
                res.status(500);
                res.send("Server error: " + message);
            });
        }
    } // end delete
}
module.exports = LoginController;