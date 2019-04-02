
import Koa from 'koa';
import logger from 'koa-logger';
import bodyParser from 'koa-bodyparser';
import session from 'koa-session';
import ORM from 'koa-orm';

import config from '../config';
import routes from './routes';

import cors from './middlewares/cors';

export default function() {
    console.log('init koa server...');

    const app = new Koa();

    app.use(bodyParser());
    app.use(logger());

    // session
    app.keys = config.keys;
    app.use(session(config.session, app));

    // ORM
    app.orm = ORM(config.database);
    app.use(app.orm.middleware);

    console.log('start connect jcdb...');
    // sync detabase
    app.orm.database().sync({
        force: false
    }).then( () => {
        console.log('success!!!');
    });

    // 生成静态目录
    // app.use(require('koa-static')(path.resolve(__dirname, '../../uploads')));

    // middlewares
    cors(app, config);

    // Routes
    routes(app);

    // socket.io
    // const server = http.Server(app.callback());
    // const io = socketIo(server);

    // io.on('connection', (socket) => {
    //     socket.on('addNotice', function (data) {
    //         socket.broadcast.emit('borcastNotice', data);
    //     });

    //     socket.on('newMessage', function (data) {
    //         socket.broadcast.emit('borcastNewMessage', data);
    //     });

    //     socket.on('addCar', function (data) {
    //         socket.broadcast.emit('borcastCar', data);
    //     });

    //     socket.on('addCase', function (data) {
    //         socket.broadcast.emit('borcastCase', data);
    //     });
    // });

    console.log('success koa server...');
    return app;
}