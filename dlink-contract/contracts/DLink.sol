// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@chainlink/contracts/src/v0.8/AutomationCompatible.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract DLink is
    ERC721,
    ERC721URIStorage,
    AutomationCompatibleInterface,
    Ownable
{
    uint256 public tokenCounter;
    mapping(uint256 => uint256) public lastTimeStamps; // tokenId to lastTimeStamp default value: lastTimeStamp when tokenCreated
    mapping(uint256 => uint256) public intervals; // tokenId to intervals
    mapping(uint256 => string[]) public IpfsTokenURIs; // tokenId to array of cids

    constructor() ERC721("DLink NFT", "DLink") {
        tokenCounter = 0;
    }

    function safeMint(
        address _to,
        string[] memory _ipfsURIs,
        uint256 _interval
    ) external {
        tokenCounter += 1;
        uint256 tokenId = tokenCounter;
        _safeMint(_to, tokenCounter);
        IpfsTokenURIs[tokenId] = _ipfsURIs;
        _setTokenURI(tokenId, _ipfsURIs[0]);
        intervals[tokenId] = _interval;
        lastTimeStamps[tokenId] = block.timestamp;
    }

    function checkUpkeep(bytes calldata)
        external
        view
        override
        returns (
            bool upkeepNeeded,
            bytes memory /* performData */
        )
    {}

    function performUpkeep(bytes calldata) external override {}

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function _burn(uint256 tokenId)
        internal
        override(ERC721, ERC721URIStorage)
    {
        super._burn(tokenId);
    }
}
