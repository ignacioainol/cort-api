const { connecting } = require('./connect');

const createUser = async (body) => {
    const connection = await connecting();

    try {
        console.log('body desde repository: ', body);
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
    getAll
}