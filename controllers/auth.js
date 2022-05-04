const bcrypt = require("bcryptjs");
const User = require("../models/User");

const register = async (req, res) => {
  const { email, password } = req.body;
  const photo = req.file.filename;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        ok: false,
        msg: "User already exists",
      });
    }
    user = new User(req.body);
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);
    user.setImgUrl(photo);
    // Aqui le enviamos a python la img de perfil
    await user.save();

    res.status(201).json({
      ok: true,
      msg: "User created successfully",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      ok: false,
      msg: "Error in the server",
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: "User does not exist",
      });
    }

    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "Invalid password",
      });
    }

    res.status(201).json({
      ok: true,
      uid: user.id,
      fullname: user.fullname,
      msg: "User logged successfully",
      token,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Error in the server",
    });
  }
};

module.exports = { register, login };
