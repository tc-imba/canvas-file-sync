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
require('select2');
require('select2/dist/css/select2.css');

const Header = React.createClass({
    render: () =>
        <h1 className="text-center">Header</h1>
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
    callbackTreeData: function (node, callback) {
        let children = [];
        this.props.files.map(file => {
            children.push({"text": file});
        });
        let data = [{
            "text": "Course Name",
            "state": {"opened": true},
            children: children
        }];
        callback(data);
    },
    getDefaultProps: function () {
        return {
            fileTree: {}
        }
    },
    render: () =>
        <div ref="fileTree"></div>,
    componentDidMount: function () {
        $(this.refs.fileTree).jstree({
            'core': {
                'data': (node, callback) => {
                    callback(this.props.fileTree);
                },
                worker: false
            }
        });
        console.log("Tree init");
    },
    componentDidUpdate: function () {
        $(this.refs.fileTree).jstree(true).refresh();
        console.log("Tree update");
    }
});

const File = React.createClass({
    render: function () {
        return (
            <tr>
                <td>{this.props.file.display_name}</td>
                <td>{this.props.file.created_at}</td>
                <td>{this.props.file.updated_at}</td>
                <td>{this.props.file.size}</td>
            </tr>
        )
    }
});

const Folder = React.createClass({
    render: function () {
        return (
            <tr>
                <td>{this.props.folder.name}</td>
                <td>{this.props.folder.created_at}</td>
            </tr>
        )
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
                    <th>Size</th>
                </tr>
                </thead>
                <tbody>
                {
                    this.props.folder.children.map(folder => {
                        return <Folder folder={folder}/>
                    })
                }
                {
                    this.props.folder.files.map(file => {
                        return <File file={file}/>
                    })
                }
                </tbody>
            </table>
        )
    }
});

const FileView = React.createClass({
    getDefaultProps: function () {
        return {
            files: [1, 2, 3],
            courses: ['Course 1', 'Course 2'],
            fileTree : {
                text: 'Course Name',
                children: [],
                files: []
            }
        }
    },
    getInitialState: function () {
        return {
            data: {
                files: [
                    {display_name: 'A.jpg', folder_id: 2, filename: '12345.jpg'},
                    {display_name: 'B.jpg', folder_id: 8, filename: '12345.jpg'},
                    {display_name: 'C.jpg', folder_id: 8, filename: '12345.jpg'},
                    {display_name: 'D.jpg', folder_id: 6, filename: '12345.jpg'},
                    {display_name: 'E.jpg', folder_id: 6, filename: '12345.jpg'},
                    {display_name: 'F.jpg', folder_id: 2, filename: '12345.jpg'},
                    {display_name: 'F.jpg', folder_id: 22, filename: '12345.jpg'}
                ],
                folders: [
                    {id: 2, parent_folder_id: null, name: 'Folder 2'},
                    {id: 6, parent_folder_id: 2, name: 'Folder 6'},
                    {id: 8, parent_folder_id: 2, name: 'Folder 8'},
                    {id: 22, parent_folder_id: 6, name: 'Folder 22'}
                ]
            }
        }
    },
    processData: function () {
        let fileTree = this.props.fileTree;
        let folderMap = {};
        this.state.data.folders.map(folder => {
            if (!folderMap.hasOwnProperty(folder.id)) {
                folderMap[folder.id] = {children: []};
            }
            folderMap[folder.id].text = folderMap[folder.id].name = folder.name;
            folderMap[folder.id].id = folder.id;
            folderMap[folder.id].files = [];
            if (folder.parent_folder_id) {
                if (!folderMap.hasOwnProperty(folder.parent_folder_id)) {
                    folderMap[folder.parent_folder_id] = {children: []};
                }
                folderMap[folder.parent_folder_id].children.push(folderMap[folder.id]);
            } else {
                fileTree = folderMap[folder.id];
            }
        });
        this.state.data.files.map(file => {
            if (folderMap.hasOwnProperty(file.folder_id)) {
                folderMap[file.folder_id].files.push(file);
            }
        });
        fileTree.state = {
            opened: true
        };
        console.log(fileTree);
        this.setState({
            fileTree: fileTree,
            folderMap: folderMap,
            currentFolderId: fileTree.id
        });
    },
    render: function () {
        return (
            <div className="row">
                <div className="col-sm-4">
                    <CourseSelect courses={this.props.courses}/>
                    <FileTree fileTree={this.state.fileTree}/>
                </div>
                <div className="col-sm-8">
                    <FileList folder={this.state.currentFolderId ?
                        this.state.folderMap[this.state.currentFolderId] : this.props.fileTree}/>
                </div>
            </div>
        )
    },
    componentDidMount: function () {
        this.processData();
    }
});

const App = React.createClass({
    render: function () {
        return (
            <div className="app-body container">
                <Header/>
                <FileView ref="fileView"/>
            </div>
        );
    },

    componentDidMount: function () {
        /*setTimeout(() => {
         this.refs.fileView.setState({
         data: {
         files: [1, 2]
         }
         })
         }, 1000);*/
    }

});

ReactDOM.render(
    <App/>
    , document.getElementById('body')
);
