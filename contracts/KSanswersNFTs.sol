// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract KSanswerNFT is ERC721, Ownable {

    constructor()
    ERC721("Knowledge Swap Answer", "KSA")
    {}

    struct KSanswer {
        uint256 dna;
        uint256 questionID;
        string creator;
        string asnwer;
    }

    KSanswer[] public answers;
    uint256 COUNTER = 1;

    event NewAnswer(address indexed owner, uint256 dna, uint256 _questionID, string creator, 
    string answer);

    function _createAnswer(uint256 _dna, uint256 _questionID, string memory _creator, string memory _answer) internal
    {
        KSanswer memory newKSanswer = KSanswer(_dna, _questionID, _creator, _answer);
        answers.push(newKSanswer);
        _safeMint(msg.sender,COUNTER); 
        emit NewAnswer(msg.sender, _dna, _questionID, _creator, _answer );
        COUNTER ++;
    }

    // GET FUNCTION
    function getAllAnswers() public view returns(KSanswer[] memory){
        return answers;
    }

    // To Make DNA, Hashing asker and question
    function _createRandomNum(uint256 _questionID, string memory _creator, string memory _answer) internal view returns (uint256) {
        string memory Stringfier = "";
        Stringfier = string(bytes.concat(bytes(Stringfier), bytes(Strings.toString(_questionID)),bytes(_creator), bytes(_answer)));
        uint256 randomNum = uint256(
        keccak256(abi.encodePacked(Stringfier))
        );
        return randomNum % 10**16;
    }

    function answerTheQuestion(uint256 _questionID, string memory _creator, string memory _answer) public payable{
        uint256 randDNA = _createRandomNum(_questionID, _creator, _answer);
        _createAnswer(randDNA, _questionID, _creator, _answer);
    }
}