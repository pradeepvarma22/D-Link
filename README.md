# DLink
A platform for users to create dNFTs on Polygon in a simple manner within a few clicks, similar to MintNft by Polygon which offers the same services for traditional NFTs.

## What it does
Initially user needs to connect his metamask wallet upon which he is redirected to the application dashboard. Here user can fill in the details of the dynamic NFT he wants to create such as name, description, traits. The user needs to upload the images that he wants to feature in his dNFT one by one, which are uploaded to IPFS simultaneously. User can set the time upon which the NFT should change accordingly. Chainlink Upkeep for automates the NFT updating process in a timely manner according to user's settings.

## How we built it
We built it used Nextjs to build our application. Tailwind CSS is used to design our application. Solidity for writing Smart Contracts, hardhat for deploying them. Chainlink is used for highly reliable automation based on time set according to the user choice. We chose Polygon chain to deploy the smart contract.

## UI
### Home Page

![home](dlink-app/public/D-Link%20home.png)

### Dashboard

![dashboard](dlink-app/public/D-Link%20dashboard.png)

## Usage of Technologies

### Chainlink

[ChainLink Upkeep](https://github.com/surendravarmadendukuri/DLink/blob/master/dlink-contract/contracts/DLink.sol#L56)

### IPFS

[IPFS upload](https://github.com/surendravarmadendukuri/DLink/blob/master/dlink-app/components/main/index.js#L28)

### Polygon

[Mint to Polygon](https://github.com/surendravarmadendukuri/DLink/blob/master/dlink-app/components/main/index.js#L70)

