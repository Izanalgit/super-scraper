const crypto = require('node:crypto');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

const generateUniqueId = () => uuidv4();

function createSecret(){

    const secret = crypto.randomBytes(64).toString('hex');
    const hashSc = bcrypt.hashSync(secret, 10)
    
    return hashSc;
}

module.exports = {generateUniqueId,createSecret} ;