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
    mapping(uint256 => bool) public isLast; // tokenId to array of cids

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
        returns (bool upkeepNeeded, bytes memory)
    {
        for (uint256 tokenId = 0; tokenId < tokenCounter; tokenId++) {
            if (
                block.timestamp - lastTimeStamps[tokenId + 1] >
                intervals[tokenId + 1] &&
                isLast[tokenId + 1] == false
            ) {
                upkeepNeeded = true;
                break;
            }
        }
    }

    function performUpkeep(bytes calldata) external override {
        for (uint256 tokenId = 0; tokenId < tokenCounter; tokenId += 1) {
            uint256 _currentTokenId = tokenId + 1;

            uint256 _currentTokenIndex = currentState(_currentTokenId);

            if (
                block.timestamp - lastTimeStamps[_currentTokenId] >
                intervals[_currentTokenId] &&
                isLast[_currentTokenId] == false
            ) {
                _currentTokenIndex += 1;
                string memory newURI = IpfsTokenURIs[_currentTokenId][
                    _currentTokenIndex
                ];
                _setTokenURI(_currentTokenId, newURI);
                lastTimeStamps[_currentTokenId] = block.timestamp;

                if (
                    _currentTokenIndex >=
                    IpfsTokenURIs[_currentTokenId].length - 1
                ) {
                    isLast[_currentTokenId] = true;
                }
            }
        }
    }

    function currentState(uint256 _tokenId)
        public
        view
        returns (uint256 _index)
    {
        string memory _uri = tokenURI(_tokenId);
        for (
            uint256 index = 0;
            index < IpfsTokenURIs[_tokenId].length;
            index += 1
        ) {
            bytes32 temp = keccak256(
                abi.encodePacked(IpfsTokenURIs[_tokenId][index])
            );
            bytes32 temp_2 = keccak256(abi.encodePacked(_uri));
            if (temp == temp_2) {
                _index = index;
            }
        }

        return _index;
    }

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
