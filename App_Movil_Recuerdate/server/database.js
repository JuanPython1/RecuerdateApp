    import mysql from 'mysql2';
    import dotenv from 'dotenv';
    dotenv.config();

    const pool = mysql
    .createPool({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
    })
    .promise();

    export async function getRecordatoriosByID(id) {
        const [rows] = await pool.query(
            `
            SELECT recordatorios.*, shared_recordatorios.shared_with_id
            FROM recordatorios
            LEFT JOIN shared_recordatorios ON recordatorios.id = shared_recordatorios.recordatorios_id
            WHERE recordatorios.user_id = ? OR shared_recordatorios.shared_with_id = ?;
            `,
            [id, id]
        );
        return rows;
    }
    

    export async function getRecordatorios(id){
        const [rows] = await pool.query(`SELECT * FROM recordatorios WHERE id = ?`,[id]);
        return rows[0];
    }

    export async function getSharedRecordatoriosByID(id){
        const [rows] = await pool.query(
            `SELECT * FROM shared_recordatorios WHERE recordatorios_id = ?`,
            [id]
        );
        return rows[0];
    }

    export async function getUserByID(id) {
        const [rows] = await pool.query(`SELECT * FROM users WHERE id = ?`, 
        [id]
            );
        //console.log(rows[0]);
        return rows[0];
    }

    export async function getEmailByID(email) {
        const [rows] = await pool.query(`SELECT * FROM users WHERE email = ?`, [
            email,
        ]);
        return rows[0];
    }

    export async function createRecordatorio(titulo, descripcion, fecha_hora, completado ,user_id){
        const [result] = await pool.query(
            `
            INSERT INTO recordatorios (titulo, descripcion, fecha_hora, user_id)
            VALUES (?, ?, ?, ?);
            `, 
                [titulo, descripcion, fecha_hora, user_id]
            );
            const recordatoriosID = result.insertId;
            return getRecordatorios(recordatoriosID);
    }

    export async function deleteRecordatorio (id) {
        const [result] = await pool.query(
            `
                DELETE FROM recordatorios WHERE id = ?;
            `,
            [id]
            );
            return result;
    }

    export async function toggleCompleted(id, value) {
        const newValue = value == true ? "TRUE" : "FALSE";
        const [result] = await pool.query(
        `
        UPDATE recordatorios
        SET completado = ${newValue}
        WHERE id = ?;
        `,
         [id]
        );
        return result;
    }

    export async function shareRecordatorio(recordatorios_id, user_id, shared_with_id){
        const [result] = await pool.query(
            `
            INSERT INTO shared_recordatorios (recordatorios_id, user_id, shared_with_id) VALUES (?,?,?);
            `, 
             [recordatorios_id, user_id, shared_with_id]
            );
            return result.insertId;
    }


