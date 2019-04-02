import * as userServer from '../service/user.server';

export async function login(ctx) {
    const { username, password } = ctx.query;

    const data = await userServer.login({ username, password });

    ctx.body = data;
}

export async function add(ctx) {
    const { username, password } = ctx.query;
    const { USER } = ctx.orm();

    const data = await userServer.add(USER, { username, password });

    ctx.body = data;
}

export async function find(ctx) {
    const { USER } = ctx.orm();

    const data = await userServer.find(USER);

    ctx.body = data;
}
