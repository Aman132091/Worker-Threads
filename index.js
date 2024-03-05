//threads in js
const {Worker,isMainThread,parentPort} = require('worker_threads')

// to check if main thread
if(isMainThread){
    console.log('main thread start');

    //creating a worker thread
    const worker = new Worker(__filename);
    //event handler
    worker.on('message',(msg)=>{
        console.log(`Worker: ${msg}`);
    })
    console.log('doing some random work in main thread....');

}else{
    parentPort.postMessage('hello from worker thread')

    cpuIntensiveFunction(1000)
    parentPort.postMessage('i am working on something')

    cpuIntensiveFunction(1000)
    parentPort.postMessage('my task is done..')
}

//CPU intensive function
function cpuIntensiveFunction(timeInSecond){
    const end = Date.now() + timeInSecond
    while (Date.now() < end) { }
}