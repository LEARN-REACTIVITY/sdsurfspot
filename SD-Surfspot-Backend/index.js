const app = require('./app')
import path from 'path'

const staticFiles = express.static(path.join(__dirname, '../../surf-spot-frontend/build'))

app.use(staticFiles)

app.listen(3000, function () {
    console.log('Todo Server listening on port 3000!');
});
