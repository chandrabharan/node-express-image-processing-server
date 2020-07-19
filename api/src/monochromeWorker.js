const {gm, workerData, parentPort} = require('worker_threads');

gm(workerData.source).monochrome().write(workerData.destination, (error)=>{
  if (error) {
    throw (error);
  }
  parentPort.postMessage({monochrome: true});
});
