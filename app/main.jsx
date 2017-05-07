/**
 * Created by liu on 17-4-30.
 */
const React = require('react');
const ReactDOM = require('react-dom');
const $ = require('jquery');
const filesize = require('filesize');
const fileicon = require('../lib/file-icon');
const sillydatetime = require('silly-datetime');

require('bootstrap-loader');
require('font-awesome-webpack');

require('jstree');
require('jstree/dist/themes/default/style.css');
require('select2');
require('select2/dist/css/select2.css');

const Header = React.createClass({
    render: () =>
        <h1 className="text-center">Canvas File Sync</h1>
});

const CourseSelect = React.createClass({
    render: function () {
        return (
            <select ref="select">
                <option></option>
            </select>
        )
    },
    componentDidMount: function () {
        $(this.refs.select).select2({
            data: this.props.courses,
            placeholder: "---",
            allowClear: true
        })
    }
});

const FileTree = React.createClass({
    getDefaultProps: function () {
        return {
            fileTree: {}
        }
    },
    shouldComponentUpdate: function (nextProps, nextState) {
        //console.log(this.state, nextState);
        return this.props.fileTree.id !== nextProps.fileTree.id;
    },
    render: () =>
        <div ref="fileTree"></div>,
    componentDidMount: function () {
        const $fileTree = $(this.refs.fileTree);
        $fileTree.jstree({
            'core': {
                'data': (node, callback) => {
                    callback(this.props.fileTree);
                },
                worker: false
            }
        }).on('select_node.jstree', (e, selected) => {
            //console.log(selected);
            this.props.callbackChangeFolder(selected.node.id);
        });

        console.log("Tree init");
    },
    componentDidUpdate: function () {
        $(this.refs.fileTree).jstree(true).refresh();
        $(this.refs.fileTree).jstree(true).select_node(2);
        console.log("Tree update");
    }
});

const File = React.createClass({
    render: function () {
        return (
            <tr>
                <td>
                    <i className={"fa fa-fw " + this.props.file.icon} aria-hidden="true"></i>&nbsp;
                    <a href={this.props.file.url}>{this.props.file.display_name}</a>
                </td>
                <td>{this.props.file.created_at}</td>
                <td>{this.props.file.updated_at}</td>
                <td className="text-right">{this.props.file.size}</td>
            </tr>
        )
    }
});

const Folder = React.createClass({
    onClick: function () {
        this.props.callbackChangeFolder(this.props.folder.id);
    },
    render: function () {
        if (this.props.parent) {
            return (
                <tr>
                    <td>
                        <i className="fa fa-fw fa-folder-open-o" aria-hidden="true"></i>&nbsp;
                        <a href="javascript:void(0);" onClick={this.onClick}>..</a>
                    </td>
                </tr>
            )
        } else {
            return (
                <tr>
                    <td>
                        <i className="fa fa-fw fa-folder-o" aria-hidden="true"></i>&nbsp;
                        <a href="javascript:void(0);" onClick={this.onClick}>{this.props.folder.name }</a>
                    </td>
                    <td>{this.props.folder.created_at}</td>
                    <td>{this.props.folder.updated_at}</td>
                </tr>
            )
        }

    }
});

const FileList = React.createClass({
    render: function () {
        return (
            <table className="table">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Time Created</th>
                    <th>Time Updated</th>
                    <th className="text-right">Size</th>
                </tr>
                </thead>
                <tbody>
                {
                    this.props.parentFolder.id ?
                        <Folder callbackChangeFolder={this.props.callbackChangeFolder} folder={this.props.parentFolder}
                                parent={true}/> : ''
                }
                {
                    this.props.folder.children ? this.props.folder.children.map(folder => {
                        return <Folder callbackChangeFolder={this.props.callbackChangeFolder} folder={folder}/>
                    }) : ''
                }
                {
                    this.props.folder.files ? this.props.folder.files.map(file => {
                        return <File file={file}/>
                    }) : ''
                }
                </tbody>
            </table>
        )
    }
});

const FileView = React.createClass({
    getDefaultProps: function () {
        return {
            courses: ['Course 1', 'Course 2'],
            fileTree: {
                text: '',
                children: [],
                files: []
            }
        }
    },
    getInitialState: function () {
        return {
            files: [],
            folders: [],
            course: {
                sync_time: null
            },
            processing: false
        }
    },
    processData: function (data) {
        const processTime = (str, format = 'YYYY-MM-DD HH:mm') => sillydatetime.format(new Date(str), format);
        let fileTree = this.props.fileTree;
        let folderMap = {};
        data.folders.map(folder => {
            if (!folderMap.hasOwnProperty(folder.id)) {
                folderMap[folder.id] = {children: []};
            }
            folder.created_at = processTime(folder.created_at);
            folder.updated_at = processTime(folder.updated_at);
            $.extend(folderMap[folder.id], folder);
            folderMap[folder.id].text = folder.name;
            folderMap[folder.id].files = [];
            folderMap[folder.id].__children = folderMap[folder.id].children;
            if (folder.parent_folder_id) {
                if (!folderMap.hasOwnProperty(folder.parent_folder_id)) {
                    folderMap[folder.parent_folder_id] = {children: []};
                }
                folderMap[folder.parent_folder_id].children.push(folderMap[folder.id]);
            } else {
                fileTree = folderMap[folder.id];
            }
        });
        data.files.map(file => {
            file.url = data.download_host + file.filename + '?attname=' + file.display_name;
            file.size = filesize(file.size);
            file.icon = fileicon.processFile(file.filename);
            file.created_at = processTime(file.created_at);
            file.updated_at = processTime(file.updated_at);
            if (folderMap.hasOwnProperty(file.folder_id)) {
                folderMap[file.folder_id].files.push(file);
            }
        });
        fileTree.text = data.course.name;
        fileTree.state = {
            opened: true,
        };
        data.course.last_sync_time = data.course.sync_time;
        data.course.sync_time = processTime(data.course.sync_time, 'YYYY-MM-DD HH:mm:ss');
        console.log(fileTree);
        return $.extend({
            fileTree: fileTree,
            folderMap: folderMap,
            currentFolderId: fileTree.id,
            sync: false
        }, data);
    },
    callbackChangeFolder: function (id) {
        if (this.processing)return;
        id = parseInt(id);
        //console.log(this.state.currentFolderId, id);
        if (!id || this.state.currentFolderId === id)return;
        if (this.state.folderMap.hasOwnProperty(id)) {
            this.processing = true;
            let fileTree = this.refs.fileTree;
            let jstree = $(fileTree.refs.fileTree).jstree(true);
            jstree.deselect_all();
            jstree.select_node(id);
            jstree.open_node(id);
            this.setState({currentFolderId: id});
            this.processing = false;
        }
    },
    onSyncClick: function () {
        $.ajax({
            url: '/data/sync',
            data: {
                id: this.state.course.id,
                time: Date.parse(this.state.course.last_sync_time)
            },
            type: 'GET',
            dataType: 'json',
            success: data => {
                if (data.state == 0 && !this.state.sync) {
                    this.setState({sync: true});
                } else if (data.state == 1) {
                    this.refreshTree(this.state.course.id);
                }
            }
        });
    },
    componentWillUpdate: function () {
        for (let i in this.state.folderMap) {
            this.state.folderMap[i].children = this.state.folderMap[i].__children;
        }
    },
    render: function () {
        let folder;
        let parentFolder = {};
        if (this.state.currentFolderId) {
            folder = this.state.folderMap[this.state.currentFolderId];
            if (folder.parent_folder_id) {
                parentFolder = this.state.folderMap[folder.parent_folder_id];
            }
        } else {
            folder = this.props.fileTree;
        }
        return (
            <div className="row">
                <div className="col-sm-3">
                    <CourseSelect courses={this.props.courses}/>
                    <FileTree callbackChangeFolder={this.callbackChangeFolder} fileTree={this.state.fileTree}
                              ref="fileTree"/>
                </div>
                <div className="col-sm-9">
                    <div>
                        <div>Last Sync Time: {this.state.course.sync_time || 'Unknown'}&nbsp;</div>
                        <a onClick={this.onSyncClick}>
                            <i className={"fa fa-refresh " + (this.state.sync ? "fa-spin" : "")}></i>
                        </a>
                        <div>&nbsp;{this.state.sync ? "Syncing" : ""}</div>
                    </div>
                    <FileList callbackChangeFolder={this.callbackChangeFolder}
                              folder={folder} parentFolder={parentFolder}/>
                </div>
            </div>
        )
    },
    refreshTree: function (course_id) {
        $.ajax({
            url: '/data/course',
            data: {
                id: course_id
            },
            type: 'GET',
            dataType: 'json',
            success: data => {
                data = this.processData(data);
                console.log(data);
                this.setState(data);
            }
        });
    },
    componentDidMount: function () {
        this.processing = false;
        this.refreshTree(1);
    },
    componentDidUpdate: function () {

    }
});

const App = React.createClass({
    getInitialState: function () {
        return {
            course: {},
            files: [],
            folders: []
        }
    },
    render: function () {
        return (
            <div className="app-body container">
                <Header/>
                <FileView/>
            </div>
        );
    },
    componentDidMount: function () {

    }

});

ReactDOM.render(
    <App/>
    , document.getElementById('body')
);
