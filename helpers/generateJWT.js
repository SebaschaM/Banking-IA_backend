const jwt = require('jsonwebtoken');

const generateJWT = (uid, name) => {

    const payload = { uid, name };
 
    try {
        const token = jwt.sign(payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '1h',
        });
        return token;
    } catch (err) {
        console.log(err);
        return 'No se pudo generar el token';
    }

}

module.exports = { generateJWT }