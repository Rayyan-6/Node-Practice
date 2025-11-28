import os from "os";
import cluster from "cluster";


const totalCPUs = os.cpus().length

console.log(totalCPUs)