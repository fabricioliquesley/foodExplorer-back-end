const UserService = require("../services/UserService");
const UserRepository = require("../repositories/UserRepository")

class UserController {
    async create(request, response) {
        const {name, email, password} = request.body;

        const userRepository = new UserRepository();
        const userService = new UserService(userRepository);

        const user = await userService.executeCreate({name, email, password});

        response.status(201).json(user);
    }
}

module.exports = UserController;