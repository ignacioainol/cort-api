const res = require('express/lib/response');
const { connecting } = require('./connect');

const createUser = async (user) => {
    const connection = await connecting();

    try {
        const query = `INSERT INTO users
                      (role_id, nickname, email, phonenumber, commune_id, age) 
                      VALUES ($1, $2, $3, $4, $5, $6)
                      RETURNING *`;

        const values = [user.role_id, user.username, user.email, user.phone, user.commune_id, user.age];
        const result = await connection.query(query, values);
        let data = result.rows[0];
        console.log(query);
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

        // for (let i = 0; i < rows.length; i++) {
        //     delete rows[i].password;
        // }

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