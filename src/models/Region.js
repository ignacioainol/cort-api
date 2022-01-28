const { connecting } = require('./connect');

const getRegions = async () => {
    const connection = await connecting();

    try {
        const query = `
        SELECT *
        FROM regions
    `;
        const result = await connection.query(query);
        let rows = result.rows;

        return rows;

    } catch (error) {
        console.log(error);
    } finally {
        connection.release();
    }
}

module.exports = {
    getRegions
}