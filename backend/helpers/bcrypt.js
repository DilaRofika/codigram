const bcrypt = require('bcrypt')
const saltRound = +process.env.SALT_ROUND || 5;

const encryptPswd = data => {
    return bcrypt.hashSync(String(data), saltRound)
}

const decryptPswd = (data, hashPswd) => {
    return bcrypt.compareSync(String(data), hashPswd)
}

module.exports = {
    encryptPswd, decryptPswd
}