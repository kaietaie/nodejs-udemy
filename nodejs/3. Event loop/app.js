const fs = require('fs');
let con = console.log;

con('Init');

setTimeout(() => {
    con( 'Imidiate');
});

fs.readFile(__filename, () => {
    con('File readed');
});

setTimeout(() => {
    for (let i = 0; i < 1000000000; i++) {

    }
    con('Done');
    Promise.resolve().then(() => {
        con('Promise inside Timeout');
    });
}, 0);

Promise.resolve().then(() => {
    con('Promise');
}, 0);

process.nextTick( () => con('tick'));

con('Final');