const res = require('express/lib/response');
const { connecting } = require('./connect');

const createUser = async (user) => {
    const connection = await connecting();

    try {
        const query = `INSERT INTO users
                      (username, firstname, lastname, email, password, role_id) 
                      VALUES ($1, $2, $3, $4, $5, $6)
                      RETURNING *`;

        const values = [user.username, user.firstname, user.lastname, user.email, user.password, user.role_id];
        const result = await connection.query(query, values);
        let data = result.rows[0];
        return data ? data : null;

    } catch (error) {
        console.log(error);
    } finally {
        connection.release();
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