const { connecting } = require('./connect');

const createUser = async (user) => {
    const connection = await connecting();

    try {
        const query = `INSERT INTO users
                      (role_id, nickname, email, phonenumber, commune_id, age, password) 
                      VALUES ($1, $2, $3, $4, $5, $6, $7)
                      RETURNING *`;

        const values = [user.role_id, user.nickname, user.email, user.phone, user.commune_id, user.age, user.password];
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

const getAllEscorts = async () => {
    const connection = await connecting();

    try {
        const query = `
        SELECT *
        FROM users
        INNER JOIN attributes
        ON attributes.user_id = users.user_id
        WHERE role_id = $1
        AND active = $2
    `;
        const values = [3, true];
        const result = await connection.query(query, values);
        let rows = result.rows;


        return rows;

    } catch (error) {
        console.log(error);
    } finally {
        connection.release();
    }
}

const loginUser = async (email, password) => {
    const connection = await connecting();
    try {
        const query = `
            SELECT * 
            FROM users
            WHERE email = '${email}'
            AND password = '${password}'`;

        const result = await connection.query(query);
        let rows = result.rows;

        if (rows.length > 0) {
            delete rows[0].password;
            return rows[0];
        } else {
            return false;
        }
    } catch (error) {
        console.log(error);
    } finally {
        connection.release();
    }
}

const getUserById = async (user_id) => {
    const connection = await connecting();

    try {
        const query = `
            SELECT * 
            FROM users
            WHERE user_id = $1`;

        const values = [user_id];
        const result = await connection.query(query, values);
        let rows = result.rows;

        return rows[0];

    } catch (error) {
        return error.message;
    } finally {
        connection.release();
    }
}

const changePassword = async (user_id, newPassword) => {
    const connection = await connecting();
    try {
        const query = `
            UPDATE users
            SET password = $1,
            first_login = $2
            WHERE user_id = $3
            RETURNING *
        `;

        const values = [newPassword, false, user_id];
        const result = await connection.query(query, values);
        console.log(result);
        return result.rows[0];

    } catch (error) {
        return error.message;
    } finally {
        connection.release();
    }
}

module.exports = {
    getAll,
    getAllEscorts,
    createUser,
    loginUser,
    getUserById,
    changePassword
}