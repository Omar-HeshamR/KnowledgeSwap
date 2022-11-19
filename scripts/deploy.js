const hre = require("hardhat");

async function main() {

  // DEPLOY KS TOKENS
  // const KStokensMain = await hre.ethers.getContractFactory("KStoken");
  // const kstokens = await KStokensMain.deploy();
  // await kstokens.deployed();
  // console.log("KS tokens deployed to:", kstokens.address);

  // DEPLOY KS CREDIBILITY TOKENS
  // const KStokensMain = await hre.ethers.getContractFactory("KnowledgeSwapCredibilityToken");
  // const kstokens = await KStokensMain.deploy();
  // await kstokens.deployed();
  // console.log("KS crediblity deployed to:", kstokens.address);

  // DEPLOY QUESTION NFTs
  // const KSquestionNFT = await hre.ethers.getContractFactory("KSquestionNFT");
  // const ksquestionnft = await KSquestionNFT.deploy();
  // await ksquestionnft.deployed();
  // console.log("KS Questions NFTs deployed to:", ksquestionnft.address);

  // DEPLOY Answer NFTs 
  // const KSanswerNFT = await hre.ethers.getContractFactory("KSanswerNFT");
  // const ksanswerNFT = await KSanswerNFT.deploy();
  // await ksanswerNFT.deployed();
  // console.log("KS answers NFTs deployed to:", ksanswerNFT.address);

  // DEPLOY DrawWinners Contract 
  // const DrawWinnerContract = await hre.ethers.getContractFactory("DrawRandomWinnersContract");
  // const drawWinner = await DrawWinnerContract.deploy();
  // await drawWinner.deployed();
  // console.log("KS drawWinner deployed to:", drawWinner.address);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => { 
    console.error(error);
    process.exit(1);
  });