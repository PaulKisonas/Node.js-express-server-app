import mysql from 'mysql2/promise';
import config from 'config';
import NotFoundError from 'errors/not-found-error';
import BcryptService from 'services/bcrypt-service';
import { UserData } from 'controllers/auth/types';
import SQL from './sql';

const checkUsername = async (username: string): Promise<true> => {
    const connection = await mysql.createConnection(config.database);

    const preparedSql = `
        select 1
        from users
        where username = ?
    `;

    const bindings = [username];
    const [rows] = await connection.query<mysql.RowDataPacket[]>(
        preparedSql,
        bindings,
    );

    connection.end();

    if (rows.length > 0) throw new Error(`Username '${username}' is taken`);

    return true;
};

const createUser = async (userData: UserData): Promise<UserEntity> => {
    const connection = await mysql.createConnection(config.database);

    const preparedSql = `
        insert into users (username, password, name, surname, phone) VALUE (?, ?, ?, ?, ?);

        set
        @created_user_id = last_insert_id();
            
        ${SQL.SELECT}
        where userId = @created_user_id;
    `;

    const bindings = [
        userData.username,
        BcryptService.encrypt(userData.password),
        userData.name,
        userData.surname,
        userData.phone,
    ];

    const [queryResult] = await connection.query<mysql.RowDataPacket[][]>(
        preparedSql,
        bindings,
    );
    const [user] = queryResult[queryResult.length - 1] as UserEntity[];

    connection.end();

    return user;
};

const getUserByUsername = async (username: string): Promise<UserEntity> => {
    const connection = await mysql.createConnection(config.database);

    const preparedSql = `
${SQL.SELECT}
where username = ?;
`;

    const bindings = [username];
    const [users] = await connection.query<mysql.RowDataPacket[]>(
        preparedSql,
        bindings,
    );

    connection.end();

    if (users.length === 0) {
        throw new NotFoundError(`User with username '${username} was not found'`);
    }

    return users[0] as UserEntity;
};

const UserModel = {
    createUser,
    checkUsername,
    getUserByUsername,
};

export default UserModel;
