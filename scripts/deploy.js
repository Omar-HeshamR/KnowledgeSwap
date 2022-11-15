const hre = require("hardhat");

async function main() {

  // DEPLOY QUESTION NFTs
  // const KSquestionNFT = await hre.ethers.getContractFactory("KSquestionNFT");
  // const ksquestionnft = await KSquestionNFT.deploy();
  // await ksquestionnft.deployed();
  // console.log("KS Questions NFTs deployed to:", ksquestionnft.address);

  // DEPLOY Answer NFTs // CURRENT: 0x22b4448Cad48839C1f36534760ecB61Fb14A1c8d
  const KSanswerNFT = await hre.ethers.getContractFactory("KSanswerNFT");
  const ksanswerNFT = await KSanswerNFT.deploy();
  await ksanswerNFT.deployed();
  console.log("KS answers NFTs deployed to:", ksanswerNFT.address);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => { 
    console.error(error);
    process.exit(1);
  });