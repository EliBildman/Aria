const child_proccess = require('child_process');

const proc = child_proccess.spawn('python', ['data/scripts/hello_world.py']);

proc.stdout.on('data', (buffer) => {
    console.log(buffer.toString());
});