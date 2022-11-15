// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract KSquestionNFT is ERC721, Ownable {

    constructor()
    ERC721("Knowledge Swap Question", "KSQ")
    {}

    KSquestion[] public questions;

    struct KSquestion {
            uint256 dna;
            string creator;
            string question;
            uint256 bounty;
            string timeLeft;
        }

    event NewQuestion(address indexed owner, uint256 dna, string creator, 
    string question, uint256 bounty, string timeLeft);

    uint256 COUNTER = 1;

    // INTERNAL CREATE A QUESTION NFT
    function _createQuestion(uint256 _dna, string memory _creator, string memory _question,
    uint256 _bounty, string memory _timeStamp) internal{
        KSquestion memory newKSquestion = KSquestion(_dna, _creator,_question, _bounty, _timeStamp);
        questions.push(newKSquestion);
        _safeMint(msg.sender,COUNTER); 
        emit NewQuestion(msg.sender, _dna, _creator,_question, _bounty, _timeStamp);
        COUNTER ++;
    }

    // GET FUNCTION
    function getAllQuestions() public view returns(KSquestion[] memory){
        return questions;
    }

    function getQuestionID(string memory _creator, string memory _question) public view returns (uint256) {
        string memory Stringfier = "";
        Stringfier = string(bytes.concat(bytes(Stringfier), bytes(_creator), bytes(_question)));
        uint256 randomNum = uint256(
        keccak256(abi.encodePacked(Stringfier))
        );
        return randomNum % 10**16;
    }

    // To Make DNA, Hashing asker and question
    function _createRandomNum(string memory _creator, string memory _question) internal view returns (uint256) {
        string memory Stringfier = "";
        Stringfier = string(bytes.concat(bytes(Stringfier), bytes(_creator), bytes(_question)));
        uint256 randomNum = uint256(
        keccak256(abi.encodePacked(Stringfier))
        );
        return randomNum % 10**16;
    }

    // EXTERNAL MAIN CREATE QUESTION
    function AskMyQuestion(string memory _creator, string memory _question,
    uint256 _bounty, string memory _timeStamp) public payable{

     uint256 randDNA = _createRandomNum(_creator, _question);
    _createQuestion(randDNA, _creator, _question, _bounty, _timeStamp);

    }

}