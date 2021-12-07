const { Pool } = require('pg');

const pool = new Pool({
    host: 'castor.db.elephantsql.com',
    user: 'wnbjfssw',
    password: '9EWMCklyjUx1MPhT3y8iSOISrljWZkm-',
    database: 'wnbjfssw'
})

const getUsers = async (req, res) => {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
}

module.exports = {
    getUsers
}