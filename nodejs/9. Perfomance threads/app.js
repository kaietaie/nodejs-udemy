const {fork} = require('child_process');
const { readFileSync } = require('fs');
const {performance, PerformanceObserver } = require('perf_hooks');
const { Worker } = require('worker_threads');

const file = readFileSync('./file.mp4');


const performanceObsorver = new PerformanceObserver(( items) => {
    items.getEntries().forEach((entry) => {
        console.log(`${entry.name}: ${entry.duration}`);
    });
});

performanceObsorver.observe({ entryTypes: ['measure']});

const workerFunction = (array) => {
    return new Promise((resolve, reject) => {
      performance.mark('worker start');
        const worker = new Worker('./worker.js', {
           workerData: {array, file}
       });
       worker.on('message', (msg) => {
        performance.mark('worker end');
        performance.measure('worker', 'worker start', 'worker end');
            resolve(msg);
       });
       worker.on('exit', () => {
           console.log('Worker had finish work');
       });
       worker.on('error', (err) => {
           reject(err);
       });
    
    });
    
};

const forkFunction = (array) => {
    return new Promise((resolve, reject) => {
        performance.mark('fork start');
        const frokProcess = fork('./fork.js');
       frokProcess.send( {array, file} );
       
       frokProcess.on('message', (msg) => {
        performance.mark('fork end'); 
        performance.measure('fork', 'fork start', 'fork end');
        resolve(msg);
       });
       frokProcess.on('error', () => {
            reject(err);
       });

    });
};


const main = async () => {
    await workerFunction([25, 19, 48, 30, 96, 99]);
    await forkFunction([25, 19, 48, 30, 96, 99]);
}

main();
