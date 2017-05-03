/**
 * Created by liu on 17-4-30.
 */
const React = require('react');
const ReactDOM = require('react-dom');
const $ = require('jquery');
require('bootstrap-loader');
require('font-awesome-webpack');

require('jstree');
require('jstree/dist/themes/default/style.css');

const Header = React.createClass({
    render: () =>
        <div>Header</div>
});

const FileTree = React.createClass({
    getInitialState: function () {
        let state = {};
        state.data = {
            'core': {
                'data': [
                    {
                        "text": "Root node", "children": [
                        {"text": "Child node 1"},
                        {"text": "Child node 2"}
                    ]
                    }
                ],
                worker: false
            }
        };
        return state;
    },
    render: () =>
        <div className="file-tree" ref="fileTree"></div>,
    componentDidMount: function () {
        $(this.refs.fileTree).jstree(this.state.data);
        console.log("Tree init");
    },
    componentDidUpdate: function () {
        $(this.refs.fileTree).jstree(this.state.data).refresh();
        console.log("Tree update");
    }
});


const App = React.createClass({
    render: function () {
        return (
            <div className="app-body">
                <Header/>
                <FileTree ref="fileTree"/>
            </div>
        );
    },

    componentDidMount: function () {
        setTimeout(() => {
            console.log(1);
            let state = {};
            state.data = {
                'core': {
                    'data': [
                        {
                            "text": "Root node", "children": [
                            {"text": "Child node 2"},
                            {"text": "Child node 3"}
                        ]
                        }
                    ],
                    worker: false
                }
            };
            this.refs.fileTree.setState(state);
        }, 1000);
    }

});

ReactDOM.render(
    <App/>
    , document.getElementById('body')
);
