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

## Working

[Video Link](https://www.youtube.com/embed/fizWFQYvU8w)


## Usage of Technologies

### Chainlink 

[Chain automation](https://automation.chain.link/mumbai/46277873803391044297138286140250922453207600799325432450806265802817893284589)

### IPFS

[IPFS upload](https://github.com/pradeepvarma22/D-Link/blob/b5ba3b01906e0631d26a9a2ccb3482cb0ca9a3ed/dlink-app/components/main/index.js#L28)

### Polygon

[Mint to Polygon](https://github.com/pradeepvarma22/D-Link/blob/master/dlink-app/components/main/index.js#L70)

### Smart Contract

[Smart Contract code](https://github.com/pradeepvarma22/D-Link/blob/master/dlink-contract/contracts/DLink.sol)



## Contributors
<a href="https://github.com/pradeepvarma22/d-link/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=pradeepvarma22/d-link" />
</a>

pradeep shashank surendra

## Submission link
[Devpost Submission](https://devpost.com/software/dlink)

