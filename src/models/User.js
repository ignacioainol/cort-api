const res = require('express/lib/response');
const { connecting } = require('./connect');

const createUser = (user) => {
    // const connection = await connecting();

    try {
        return user;
    } catch (error) {
        console.log(error);
    }
}

const getAll = async () => {
    const connection = await connecting();

    try {
        const query = `
        SELECT *
        FROM users
    `;
        const result = await connection.query(query);
        let rows = result.rows;

        for (let i = 0; i < rows.length; i++) {
            delete rows[i].password;
        }

        return rows;

    } catch (error) {
        console.log(error);
    } finally {
        connection.release();
    }
}

module.exports = {
    getAll,
    createUser
}