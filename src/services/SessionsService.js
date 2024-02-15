const AppError = require("../utils/AppError");
const { compare } = require("bcryptjs")
const authConfig = require("../config/auth");
const { sign } = require("jsonwebtoken");

class SessionsService {
    constructor(repository) {
        this.repository = repository;
    }

    async create({ email, password }) {
        if (!email || !password) throw new AppError("Preencha todos os campos!");

        const user = await this.repository.checkEmail(email);

        if (!user) throw new AppError("E-mail ou senha inválidos!");

        const comparePasswords = await compare(password, user.password);

        if (!comparePasswords) throw new AppError("E-mail ou senha inválidos!");

        const { secret, expiresIn } = authConfig.jwt;

        const token = sign({}, secret, {
            subject: user.id,
            expiresIn
        })

        return {user, token};
    }
}

module.exports = SessionsService;