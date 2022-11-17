# Dlink 

No Code Dynamic NFT Smart Contract.



```shell
yarn install
yarn hardhat compile
```

# Contract:
```
DLink\dlink-contract>yarn hardhat run scripts/deploy.ts --network mumbai
Deployed to 0x4Ea8e4a9111aC32a3A198bE66C034D4f6f5F9f7c
To Verify Run This Command
yarn hardhat --network mumbai verify 0x4Ea8e4a9111aC32a3A198bE66C034D4f6f5F9f7c
Done in 27.39s.

DLink\dlink-contract>yarn hardhat --network mumbai verify 0x4Ea8e4a9111aC32a3A198bE66C034D4f6f5F9f7c
Successfully submitted source code for contract
contracts/DLink.sol:DLink at 0x4Ea8e4a9111aC32a3A198bE66C034D4f6f5F9f7c
for verification on the block explorer. Waiting for verification result...
Done in 9.20s.erified contract DLink on Etherscan.
https://mumbai.polygonscan.com/address/0x4Ea8e4a9111aC32a3A198bE66C034D4f6f5F9f7c#code
```