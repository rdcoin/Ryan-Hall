// imports
const Web3 = require("web3");
const { RINKEBY_ENDPOINT, DEV_ENDPOINT } = require("../config/Constants.js");
const scholarshipContractABI = require("../build/contracts/Scholarship.json").abi;

// contract properties to extract
const CONTRACT_PROPERTIES = [ "courseName", "schoolName", "studentName", "startedOn", "daysToComplete" ]

// configure endpoint
const endpoint = process.env.NODE_ENV === "production" ? RINKEBY_ENDPOINT : DEV_ENDPOINT;
// configure web3
const web3 = new Web3(new Web3.providers.HttpProvider(endpoint));

// main parse function
async function parse(contractAddress) {
  // find contract
  const scholarship = new web3.eth.Contract(scholarshipContractABI, contractAddress);
  return {
    courseName: await scholarship.methods.courseName().call(),
    schoolName: await scholarship.methods.schoolName().call(),
    studentName: await scholarship.methods.studentName().call(),
    startedOn: (await scholarship.methods.startedOn().call()).toNumber(),
    daysToComplete: (await scholarship.methods.daysToComplete().call()).toNumber()
  }
}

exports.parse = parse;

// if running file directly
if (require.main === module) {
  (async function(){
    // grab key from command line args
    const [ _, __, contractAddress, ...others ] = process.argv;
    if(!contractAddress) {
      console.log("contract address required");
      process.exit();
    }
    // print result
    console.log(await parse(contractAddress));
  })()
}
