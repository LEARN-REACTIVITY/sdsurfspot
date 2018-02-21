'use strict';

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = require('./app');


var staticFiles = express.static(_path2.default.join(__dirname, '../../surf-spot-frontend/build'));

app.use(staticFiles);

app.listen(3000, function () {
    console.log('Todo Server listening on port 3000!');
});