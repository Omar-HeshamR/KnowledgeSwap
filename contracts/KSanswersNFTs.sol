// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract KSanswerNFT is ERC721, Ownable {

    constructor()
    ERC721("Knowledge Swap Reply", "KSR")
    {}

    struct KSanswer {
        string tokenURI;
        string questionID;
        string replyID;
    }

    KSanswer[] public answers;
    mapping(string => KSanswer[]) public QuestionReplies;
    mapping(string => uint256) public ReplyUpVotes;
    mapping(string => address[]) public UpVoteChecker;
    uint256 COUNTER = 1;

    event NewAnswer(address indexed owner, string tokenURI, string questionID, string replyID);

    function _createAnswer(string memory tokenURI, string memory QuestionID, string memory ReplyID) internal
    {
        KSanswer memory newKSanswer = KSanswer(tokenURI, QuestionID, ReplyID);
        answers.push(newKSanswer);
        QuestionReplies[QuestionID].push(newKSanswer);
        _safeMint(msg.sender,COUNTER); 
        emit NewAnswer(msg.sender, tokenURI, QuestionID, ReplyID );
        COUNTER ++;
    }

    // GET FUNCTION
    function getAllAnswers() public view returns(KSanswer[] memory){
        return answers;
    }

    function getUpvotesByReplyID(string memory ReplyID) public view returns(uint256){
        return ReplyUpVotes[ReplyID];
    }

    function getRepliesByID(string memory questionID) public view returns(KSanswer[] memory){
        return QuestionReplies[questionID];
    }

    function answerTheQuestion(string memory tokenURI, string memory QuestionID, string memory ReplyID) public payable{
        _createAnswer(tokenURI, QuestionID, ReplyID);
    }

    function upvoteReply(string memory ReplyID) public {
        require( _find(ReplyID, msg.sender) == false, "already voted");
        ReplyUpVotes[ReplyID] += 1;
        UpVoteChecker[ReplyID].push(msg.sender);
    }

    function _find(string memory ReplyID, address toBeFound) internal returns(bool){
        uint arrayLength = UpVoteChecker[ReplyID].length;
        for (uint i=0; i<arrayLength; i++) {
            if(UpVoteChecker[ReplyID][i] == toBeFound){
                return true;
            }
        }
        return false;
   }
}