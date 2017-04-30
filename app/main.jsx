/**
 * Created by liu on 17-4-30.
 */
const React = require('react');
const ReactDOM = require('react-dom');
const $ = require('jquery');
require('bootstrap-loader');
require('font-awesome-webpack');

require('jstree');

const Header = React.createClass({
    render: () =>
        <div>Header</div>
});


ReactDOM.render(
    <div className="app-body">
        <Header/>
    </div>
    , document.getElementById('body')
);

console.log($.fn.tooltip);