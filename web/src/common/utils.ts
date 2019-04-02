
const requesting = {};
const utils = {
    // fetch(options: any) {
    //     let url = options.url;
    //     url = url.indexOf('//') > -1 ? url : '//localhost:3000' + url;
    //     const method = options.method || 'GET';
    //     const data = options.data || {};
    //     const type = options.type == null ? 'json' : options.type;

    //     const setting = {
    //         url,
    //         type: type,
    //         method: method,
    //         data,
    //         mode: 'cors'
    //     };

    //     let uid = setting.url + setting.type + setting.method + JSON.stringify(setting.data);

    //     if (requesting[uid]) {
    //         console.warn('请勿重复点击哦~');
    //         return;
    //     }

    //     requesting[uid] = true;

    //     // 跨域带cookie参数
    //     // setting.withCredentials = true;

    //     return Reqwest(setting).then((resData) => {
    //         let data;

    //         if (typeof resData === 'string') {
    //             data = JSON.parse(resData);
    //         } else {
    //             data = resData;
    //         }

    //         // if(!data || data.code !== 1001){
    //         //     notification.error({
    //         //         message: <span dangerouslySetInnerHTML={{ __html: (data && data.message) || (data && data.returnMessage) || "服务器异常" }}></span>
    //         //     });
    //         // }

    //         // 没有权限
    //         // if (data.code === 1005) {
    //         //     window.logger.goTo('//daisy.mgs.meili-inc.com/#/home');
    //         // }

    //         return data;
    //     }).fail(() => {
    //         // notification.error({
    //         //     message: '服务器异常'
    //         // });
    //     }).always(() => {
    //         requesting[uid] = false;
    //     }); ;
    // }
};

export default utils;
