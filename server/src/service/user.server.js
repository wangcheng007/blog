
import Sequelize from 'sequelize';
import uuidV4 from 'uuid/v4';
const Op = Sequelize.Op;

export async function login(datas) {
    const { username, password } = datas;

    return {
        data: {
            username,
            password
        },
        returnCode: '1001',
        message: 'success'
	}
}

export async function add(entry, datas) {
    const { username, password } = datas;
    const id = uuidV4();

    const flag = await entry.create({
        id, username, password
    });

    if (flag) {
        return {
            data: {
                flag: flag
            },
            returnCode: '1001',
            message: 'success'
        }
    } else {
        return {
            data: {},
            returnCode: '2002',
            message: 'fail'
        }
    }
}

export async function find(entry) {

    const users = await entry.findAll();

    if (users && Array.isArray(users)) {
        return {
            data: {
                list: users
            },
            returnCode: '1001',
            message: 'success'
        }
    } else {
        return {
            data: {},
            returnCode: '2002',
            message: 'fail'
        }
    }
}
