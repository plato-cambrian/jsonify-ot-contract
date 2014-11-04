// Require dependency modules
var fs = require('fs');
var xml2js = require('xml2js');

// Configure xml2js to trim beginning and ending whitespace within text tags
var parser = new xml2js.Parser({trim: true});

// Find the smart contract passed in on command line:
var args = process.argv;
var filename;

if(args.length != 3){
  throw('jsonifyContract.js requires exactly one command line parameter,\n'
  +'a filename of the XML file you would like to create.')
} else {
  filename = args[2];
}

var contract;
try{
  contract = fs.readFileSync(filename, 'utf-8');
} catch(e) {
  throw(e);
}

// Preprocess the contract to get the XML from inside it
var xml; 
xml = preprocess(contract);

// Convert the xml to json object and output to stdout
var json;
parser.parseString(xml, function(err, result){
  if(err){
    throw(err);
  }
  json = JSON.stringify(result, null, 2)
  console.log(json);
})

// Utility functions:
// Strip out header and footer metadata and return just the XML <smartcontract>...</smartcontract>:
function preprocess(contract){
  // Avoid Windows newlines:
  winCRLF = /\r\n/.test(contract);
  if(winCRLF){
    throw('Expected only Unix \\n line endings. Found Windows \\n\\r line endings.')
  }
  //console.log(contract);
  var regex = /^(\s*)-----BEGIN SIGNED SMARTCONTRACT-----\nHash: SAMY\n\n([\s\S]*?)-----BEGIN SMARTCONTRACT SIGNATURE-----([\s\S]*?)-----END SMARTCONTRACT SIGNATURE-----\s?$/
  var result = regex.exec(contract);
  if(!result){
    throw('Rexex failed to find XML data in ' + filename)
  }
  return result[2];
}