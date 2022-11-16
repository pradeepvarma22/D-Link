import { ethers } from "hardhat";

async function main() {

  const DLink = await ethers.getContractFactory("Lock");
  const dLink = await DLink.deploy();

  await dLink.deployed();

  console.log(`Deployed to ${dLink.address}`);
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
