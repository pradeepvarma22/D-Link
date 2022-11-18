import { ethers } from "hardhat";

async function main() {

  const DLink = await ethers.getContractFactory("DLink");
  const dLink = await DLink.deploy();

  await dLink.deployed();

  console.log(`Deployed to ${dLink.address}`);
  console.log("To Verify Run This Command")
  console.log(`yarn hardhat --network mumbai verify ${dLink.address}`)
  
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
