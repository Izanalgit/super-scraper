const fs = require('node:fs');

const BBDD = './data/bbdd.json';

function readbd() {
    try {
        const data = fs.readFileSync(BBDD, 'utf-8');

        if(!data) return null;
        return JSON.parse(data);

    } catch (error) {
        console.error('Error on bbdd read : ', error.message);
    }
}

function savedb(data) {
    try{
        fs.writeFileSync(BBDD, JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('Error on bbdd write : ', error.message);
    }
}

module.exports = {readbd,savedb};