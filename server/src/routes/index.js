import Router from 'koa-router';

import * as userController from '../controller/user.controller';

export default function routes(app) {
    const router = new Router();

    router.get('/user/login', userController.login);
    router.get('/user/add', userController.add);
    router.get('/user/find', userController.find);

    app.use(router.routes());
	app.use(router.allowedMethods());
}
