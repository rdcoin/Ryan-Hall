# remove existing files and folders
rm -rf contracts > /dev/null 2>&1 &
rm -rf external_contracts > /dev/null 2>&1 &
rm -rf build/contracts > /dev/null 2>&1 &
rm truffle-config.js > /dev/null 2>&1 &
# make contract directories
mkdir -p contracts
mkdir -p external_contracts
# fetch CryptoShips contracts
echo "fetching contracts and truffle-config..."
curl https://raw.githubusercontent.com/RyanRHall/CryptoShips/master/contracts/Scholarship.sol --output contracts/Scholarship.sol
curl https://raw.githubusercontent.com/RyanRHall/CryptoShips/master/contracts/ScholarshipManager.sol --output contracts/ScholarshipManager.sol
curl https://raw.githubusercontent.com/RyanRHall/CryptoShips/master/contracts/ScholarshipManagerInterface.sol --output contracts/ScholarshipManagerInterface.sol
# fetch external contracts
curl https://raw.githubusercontent.com/oraclize/ethereum-api/master/oraclizeAPI_0.4.25.sol --output external_contracts/oraclizeAPI_0.4.25.sol
curl https://raw.githubusercontent.com/Arachnid/solidity-stringutils/master/src/strings.sol --output external_contracts/strings.sol
# fetch truffle config
curl https://raw.githubusercontent.com/RyanRHall/CryptoShips/master/truffle-config.js --output truffle-config.js
# compile
npx truffle compile
# remove contracts
rm -rf ./contracts
rm -rf ./external_contracts
echo "done!"
