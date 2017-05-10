/**
 * Created by liu on 17-4-30.
 */
const React = require('react');
const ReactDOM = require('react-dom');
const $ = require('jquery');
const filesize = require('filesize');
const fileicon = require('../lib/file-icon');
const sillydatetime = require('silly-datetime');
const async = require('neo-async');

require('bootstrap-loader');
require('font-awesome-webpack');

require('jstree');
require('jstree/dist/themes/default/style.css');
require('select2');
require('select2/dist/css/select2.css');

const Header = React.createClass({
    render: () =>
        <div className="container mb-3">
            <nav className="navbar navbar-toggleable-md navbar-light bg-faded">
                <a className="navbar-brand" href="/">Canvas File Sync</a>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                    </ul>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link" href="/auth">Grant Privilege</a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>

});

const CourseSelect = React.createClass({
    render: function () {
        return (
            <div className="form-group">
                <select className="form-control" ref="select">
                    <option></option>
                </select>
            </div>
        )
    },
    componentDidMount: function () {
        $(this.refs.select).select2({
            data: this.props.courses,
            placeholder: "Please select a course",
            allowClear: true
        }).on("select2:select", (e) => {
            //console.log(e);
            this.props.callbackChangeCourse(e.params.data.id);
        })
    },
    componentDidUpdate: function () {
        let data = [];
        this.props.courses.map(course => {
            data.push({
                id: course.id,
                text: `${course.course_code} ${course.name}`
            });
        });
        $(this.refs.select).select2({
            data: data,
            placeholder: "Please select a course",
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
            processing: false,
            error: false,
            first: true
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
            sync: false,
            sync_timeout: false,
            error: false,
            first: false
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
    callbackChangeCourse: function (course_id) {
        if (course_id !== this.state.course.id) {
            this.processing = false;
            this.refreshTree(course_id);
        }
    },
    onSyncClick: function () {
        this.setState({sync: true});
        const timestamp = this.timestamp = new Date();
        const times = 30;
        const interval = 2000;
        let i = 0;
        let loop = setInterval(
            () => {
                if (timestamp !== this.timestamp) {
                    // Course changed
                    window.clearInterval(loop);
                    return;
                }
                if (++i === times) {
                    window.clearInterval(loop);
                    this.setState({sync: false, sync_timeout: true});
                    return;
                }
                $.ajax({
                    url: '/data/sync',
                    data: {
                        id: this.state.course.id,
                        time: Date.parse(this.state.course.last_sync_time)
                    },
                    type: 'GET',
                    dataType: 'json',
                    success: data => {
                        if (timestamp !== this.timestamp) {
                            // Course changed
                            window.clearInterval(loop);
                            return;
                        }
                        if (data.state == 0 && !this.state.sync) {

                        } else if (data.state == 1) {
                            this.refreshTree(this.state.course.id, true);
                            window.clearInterval(loop);
                        }
                    }
                });
            },
            interval
        );
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

        const first = [
            <div className="jumbotron">
                <h1 className="display-3">Canvas File Sync</h1>
                <p className="lead">
                    Canvas File Sync is created by tc-imba, in order to sync all files on Canvas LMS with the help of
                    access token providers.
                </p>
                <hr className="my-4"/>
                <p>
                    If you'd like to contribute, grant privilege to us in the button below.
                </p>
                <p className="lead">
                    <a className="btn btn-primary btn-lg" href="/auth" role="button">Grant Privilege</a>
                </p>
            </div>
        ];

        const no_error = [
            <div className="mb-3">
                <span>Last Sync Time: {this.state.course.sync_time || 'Unknown'}&nbsp;</span>
                (Thanks to the data provided by {this.state.course.sync_user_name})
                <span className="float-right"><a onClick={this.onSyncClick}>
                            <i className={"fa fa-refresh " + (this.state.sync ? "fa-spin" : "")}></i>
                        </a>&nbsp;{this.state.sync ? "Syncing" : this.state.sync_timeout ? "Sync timeout" :
                    this.state.sync_success ? "Synced" : "Sync now"}</span>
            </div>,
            <FileList callbackChangeFolder={this.callbackChangeFolder}
                      folder={folder} parentFolder={parentFolder}/>
        ];

        const error = [
            <h4>Sorry, we currently haven't data for the course</h4>,
            <div>Error: {this.state.error}</div>
        ];

        return (
            <div className="row">
                <div className="col-sm-3">
                    <CourseSelect courses={this.props.courses} callbackChangeCourse={this.callbackChangeCourse}/>
                    {
                        this.state.error || this.state.first ? "" :
                            <FileTree callbackChangeFolder={this.callbackChangeFolder}
                                      fileTree={this.state.fileTree} ref="fileTree"/>
                    }
                </div>
                <div className="col-sm-9">
                    {this.state.error ? error : this.state.first ? first : no_error}
                </div>
            </div>
        )
    },
    refreshTree: function (course_id, sync_success = false) {
        const callbackError = data => {
            this.setState({error: JSON.stringify(data, null, '    ')});
        };
        $.ajax({
            url: '/data/course',
            data: {
                id: course_id
            },
            type: 'GET',
            dataType: 'json',
            success: data => {
                if (data.course) {
                    data = this.processData(data);
                    if (sync_success) data.sync_success = true;
                    this.setState(data);
                    if (data.sync) this.onSyncClick();
                } else {
                    callbackError(data);
                }
                console.log(data);
            },
            error: callbackError
        });
    },
    componentDidMount: function () {
        //this.processing = false;
        //this.refreshTree(1);
    },
    componentDidUpdate: function () {

    }
});

const App = React.createClass({
    getInitialState: function () {
        return {
            courses: []
        }
    },
    render: function () {
        return (
            <div className="app">
                <Header/>,
                <div className="app-body container">
                    <FileView courses={this.state.courses}/>
                </div>
            </div>
        )
    },
    componentDidMount: function () {
        $.ajax({
            url: '/public/courses.json',
            type: 'GET',
            dataType: 'json',
            success: data => {
                console.log(data);
                this.setState({courses: data});
            }
        });
    }

});

ReactDOM.render(
    <App/>
    , document.getElementById('body')
);
