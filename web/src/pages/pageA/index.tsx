import React, { Component } from 'react';
// import utils from 'common/utils';
// import Table from 'components/table';
import ReactDOM from 'react-dom';

export default class PageA extends Component {
    render() {
        return (
            <div>
                aaa
            </div>
        );
    }
}

const rootEL = document.getElementById('root');

ReactDOM.render(
    <PageA />,
    rootEL
);
