const AppError = require("../utils/AppError");
const { randomUUID } = require("node:crypto");
const { hash } = require("bcryptjs");

class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async executeCreate({ name, email, password }) {
        if (!name || !email || !password) throw new AppError("Preencha todos os campos para se cadastrar!")

        const emailExists = await this.userRepository.checkEmail(email);

        if (emailExists) throw new AppError("E-mail já em uso!")

        const hashPassword = await hash(password, 6);

        function checkIfUserIsAdmin(email, password) {
            if (email.includes("foodexplore") && password.includes("@admin")){
                return "admin";
            }

            return "common";
        }

        const data = {
            id: randomUUID(),
            name,
            email,
            password: hashPassword,
            accountType: checkIfUserIsAdmin(email, password),
        }

        const result = this.userRepository.createUser(data);

        return result;
    }
}

module.exports = UserService;