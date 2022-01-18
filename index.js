const { ethers } = require("ethers");
require("dotenv").config();
const contractAbi = require("./abi.json");

const provider = new ethers.providers.InfuraProvider(
  (network = "rinkeby"),
  process.env.INFURA_PROJECT_ID
);

const contractAddress = "0xa6174a3dbc417a1bd778a5ab2929847ac781ab50"; //TestToken address on Rinkeby

const contract = new ethers.Contract(
  contractAddress,
  contractAbi.abi,
  provider
);

async function main() {
  const name = await contract.name();
  console.log("Transfer event listener started for " + name);
}

contract.on("Transfer", function (from, to, value) {
  let tokens = ethers.utils.formatUnits(value, 8);
  console.log(
    "New Transfer recorded from " +
      from +
      " to " +
      to +
      " for " +
      tokens +
      " coins"
  );
});

main();
