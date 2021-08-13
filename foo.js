const fs = require('fs');

fs.readdir('actions', (err, files) => {
    console.log(JSON.stringify(files));
});