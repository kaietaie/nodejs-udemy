let con = console.log;

const EventEmmiter = require('events');
const myEmitter = new EventEmmiter();
const logDbConnection = () => {
    console.log('DB connected');
};
myEmitter.addListener('connected', logDbConnection);

myEmitter.emit('connected');

myEmitter.on('msg', (data) => {
    console.log(`Reseved: ${data}`);
});



myEmitter.once('off', () => {
    console.log('I will apear only one time');
});

myEmitter.emit("off");

console.log(myEmitter.getMaxListeners());

con(myEmitter.listenerCount('msg'));
con(myEmitter.listenerCount('off'));
con(myEmitter.listeners('msg'));


myEmitter.prependListener('msg', () => {
    con("Prepend");
});
myEmitter.emit('msg', "Ahoj!");

con(myEmitter.eventNames());
myEmitter.on('error', (err) => {
    con(`We have an error: ${err.message}`); 
});
myEmitter.emit('error', new Error('BOOM!'));

//_________________________________________________________

const target = new EventTarget();
const logTarget = () => {
    con('Connected to target');
}

target.addEventListener('connected', logTarget);
target.dispatchEvent(new Event('connected'));