const SessionsService = require("../services/SessionsService");
const UserRepository = require("../repositories/UserRepository");

class SessionsController {
    async create(request, response) {
        const {email, password} = request.body;

        const userRepository = new UserRepository();
        const sessionsService = new SessionsService(userRepository);

        const data = await sessionsService.create({email, password});

        response.status(201).json(data);
    }
}

module.exports = SessionsController;