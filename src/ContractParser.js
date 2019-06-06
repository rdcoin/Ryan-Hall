// imports
const Web3 = require("web3");
const { RINKEBY_ENDPOINT, DEV_ENDPOINT } = require("../config/Constants.js");
const scholarshipContractABI = require("../build/contracts/Scholarship.json").abi;

const CONTRACT_PROPERTIES = [ "courseName", "schoolName", "studentName", "startedOn", "daysToComplete" ]

// configure endpoint
const endpoint = process.env.NODE_ENV === "production" ? RINKEBY_ENDPOINT : DEV_ENDPOINT;
// configure web3
const web3 = new Web3(new Web3.providers.HttpProvider(endpoint));

// parse function TODO:
async function parse(contractAddress) {
  // find contract
  const scholarship = new web3.eth.Contract(scholarshipContractABI, contractAddress);
  result = {};
  for (let i = 0; i < CONTRACT_PROPERTIES.length; i++) {
    let property = CONTRACT_PROPERTIES[i];
    result[property] = await scholarship.methods[property].call();
  }
  return result;
}

exports.parse = parse;

// TESTING
// (async function() {
//   console.log(await parse("0xe347c73399f0dc0ae058bf5cd9c79b8a1081d554"));
// })();
