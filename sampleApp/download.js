var azure = require('azure-storage');
var nconf = require('nconf');
nconf.env()
     .file({ file: 'config.json', search: true });
var accountName = nconf.get("STORAGE_NAME");
var accountKey = nconf.get("STORAGE_KEY");
var containerName = nconf.get("CONTAINER_NAME");
var fileName = nconf.get("FILE_NAME");
var threadCount = nconf.get("THREAD_COUNT");

var blobSvc = azure.createBlobService(accountName, accountKey);
var options = { parallelOperationThreadCount: threadCount };
var dlFileName = "dl." + fileName

blobSvc.getBlobToLocalFile(containerName, fileName, dlFileName, options, function(error, result, response){
  if(!error){
    console.log("File downloaded. Threads: %d", threadCount);
  }
});