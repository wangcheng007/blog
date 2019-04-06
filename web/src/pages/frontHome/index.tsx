import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import FrontLayout from '@components/frontLayout';

export default class PageA extends Component {
    render() {
        return (
            <FrontLayout>
                ccc
            </FrontLayout>
        );
    }
}

const rootEL = document.getElementById('root');

ReactDOM.render(
    <PageA />,
    rootEL
);
