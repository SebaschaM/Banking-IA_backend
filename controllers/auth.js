const bcrypt = require("bcryptjs");
const { generateJWT } = require("../helpers/generateJWT");
const User = require("../models/User");

const register = async (req, res) => {

    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({
                ok: false,
                msg: 'User already exists',
            });
        }
        user = new User(req.body);
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt)
        await user.save();

        //GENERATE JWT
        const token = generateJWT(user.id, user.fullname)

        res.status(201).json({
            ok: true,
            uid: user.id,
            fullname: user.fullname,
            msg: 'User created successfully',
            token
        });
    } catch (e) {
        res.status(500).json({
            ok: false,
            msg: 'Error in the server',
        });
    }
};

const login = async(req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: 'User does not exist',
            });
        }

        const validPassword = bcrypt.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Invalid password',
            });
        }

        //GENERATE JWT
        const token = generateJWT(user.id, user.fullname);
        res.status(201).json({
            ok: true,
            uid: user.id,
            fullname: user.fullname,
            msg: 'User logged successfully',
            token
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error in the server',
        });
    }
};

module.exports = { register, login }