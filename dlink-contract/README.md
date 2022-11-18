# Dlink 

No Code Dynamic NFT Smart Contract.



```shell
yarn install
yarn hardhat compile
```

# Contract:
```
DLink\dlink-contract>yarn hardhat run scripts/deploy.ts --network mumbai
Deployed to 0xE21907F24DBe16890f9911Da3165799E8640603a
To Verify Run This Command
yarn hardhat --network mumbai verify 0xE21907F24DBe16890f9911Da3165799E8640603a
Done in 27.39s.

DLink\dlink-contract>yarn hardhat --network mumbai verify 0xE21907F24DBe16890f9911Da3165799E8640603a
Successfully submitted source code for contract
contracts/DLink.sol:DLink at 0xE21907F24DBe16890f9911Da3165799E8640603a
for verification on the block explorer. Waiting for verification result...
Done in 9.20s.erified contract DLink on Etherscan.
https://mumbai.polygonscan.com/address/0xE21907F24DBe16890f9911Da3165799E8640603a#code
```