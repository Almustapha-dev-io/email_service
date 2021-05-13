import Mysql from 'mysql2';

const pool = Mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'admin',
    database: 'sql_emailing'
});

export default pool.promise();