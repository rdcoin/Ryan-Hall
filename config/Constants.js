require('dotenv').config();

module.exports = {
  COURSERA_ENDPOINT: "https://www.coursera.org/account/accomplishments/verify",
  SCHOLARSHIP_CONTRACT: "https://raw.githubusercontent.com/RyanRHall/CryptoShips/master/contracts/Scholarship.sol",
  RINKEBY_ENDPOINT: `https://rinkeby.infura.io/${process.env.INFURA_API_KEY}`,
  DEV_ENDPOINT: "http://localhost:8545"
};
