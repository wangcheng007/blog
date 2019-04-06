/**
 * 2019年04月03日10:39:27
 * 外层模板
 */

import React, { PureComponent, ReactNode } from 'react';
import { Icon } from 'antd';

import './index.less';

export interface IProps {
    children?: ReactNode;
}

export interface IState {
    showNav: boolean;
    showGoTop: boolean;
    clientHeight: number;
}

export default class Layout extends PureComponent<IProps, IState> {
    state: IState = {
        showNav: false,
        showGoTop: false,
        clientHeight: 0
    };

    private wrapperRef: HTMLDivElement | null = null;

    componentDidMount() {
        this.wrapperRef && this.wrapperRef.addEventListener('scroll', this.throttle(this.mainScroll, 200));
        this.setState({
            clientHeight: document.documentElement.clientHeight
        });
    }

    componentWillUnmount() {
        this.wrapperRef && this.wrapperRef.removeEventListener('scroll', this.throttle(this.mainScroll, 200));
    }

    switch = () => {
        this.setState({
            showNav: !this.state.showNav
        });
    }

    wrapperRefFunc = (ref: HTMLDivElement) => {
        this.wrapperRef = ref;
    }

    mainScroll = () => {
        if (this.wrapperRef && this.wrapperRef.scrollTop > this.state.clientHeight * 1.8) {
            this.setState({
                showGoTop: true
            });
        } else {
            this.setState({
                showGoTop: false
            });
        }
    }

    throttle = (cb: () => void, time: number) => {
        let lastTime: number | null = null;

        return () => {
            const nowTime: number = +new Date();
            if (lastTime && nowTime - lastTime > time || !lastTime) {
                cb();
                lastTime = nowTime;
            }
        };
    }

    goTop = () => {
        this.wrapperRef && (this.wrapperRef.scrollTop = 0);
    }

    render(): ReactNode {

        const { showNav, showGoTop } = this.state;

        return (
            <div className="layout">
                <div className={`layout_nav ${showNav ? 'layout_nav__on' : 'layout_nav__off'}`} >
                    <div className="layout_nav_header">
                        <div className="layout_nav_header_avatar">
                            <img src={'https://avatars2.githubusercontent.com/u/24378829?s=460&v=4'}/>
                        </div>

                        <div style={{ height: '100%' }}>
                            <div className="layout_nav_header_switch" onClick={this.switch}>
                                <Icon
                                    style={{
                                        margin: '3px 0 0 2px'
                                    }}
                                    type={'menu-fold'}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="layout_nav_list">
                        <div className="layout_nav_list__item">
                            <Icon className="layout_nav_list__item_icon" type={'home'}/>
                            <a href={'/html/frontHome.html'}>主页</a>
                        </div>
                        <div className="layout_nav_list__item">
                            <Icon className="layout_nav_list__item_icon" type={'book'}/>
                            <a href={'/html/frontHome.html'}>归档</a>
                        </div>
                        <div className="layout_nav_list__item">
                            <Icon className="layout_nav_list__item_icon" type={'tags'}/>
                            <a href={'/html/frontHome.html'}>分类</a>
                        </div>
                        <div className="layout_nav_list__item">
                            <Icon className="layout_nav_list__item_icon" type={'user'}/>
                            <a href={'/html/frontHome.html'}>关于</a>
                        </div>
                        <div className="layout_nav_list__item">
                            <Icon className="layout_nav_list__item_icon" type={'link'}/>
                            <a href={'/html/frontHome.html'}>友情链接</a>
                        </div>
                    </div>
                </div>

                <div className={`layout_pages ${showNav ? 'layout_pages__on' : 'layout_pages__off'}`} ref={this.wrapperRefFunc}>
                    <div className="layout_pages_wrapper">
                        <div style={{ height: '10000px' }}>
                            ppppp
                        </div>
                    </div>
                </div>

                {
                    !showNav ? (
                        <div className="layout_switch">
                            <div className="layout_nav_header_switch" onClick={this.switch}>
                                <Icon
                                    style={{
                                        margin: '3px 0 0 2px'
                                    }}
                                    type={'menu-fold'}
                                />
                            </div>
                        </div>
                    ) : null
                }

                <div
                    className="layout_bg"
                    style={{
                        backgroundImage: 'url(https://s10.mogucdn.com/mlcdn/c45406/190404_7kgehlkd505a8ei7h67fheelabcdf_1920x1227.png)'
                    }}
                />
                <div
                    className={`layout_gotop ${showGoTop ? 'layout_gotop__on' : 'layout_gotop__off'}`}
                    style={{ boxShadow: showGoTop ? 'box-shadow: 0 0 3px 3px #fff' : 'none' }}
                    onClick={this.goTop}
                >
                    <Icon type={'to-top'}/>
                </div>
            </div>
        );
    }
}
