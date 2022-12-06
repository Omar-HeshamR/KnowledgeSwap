// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

interface KStoken {

    function balanceOf(address account) external view returns (uint256);
    function allowance(address owner, address spender) external view returns (uint256);
    function increaseAllowance(address spender, uint256 addedValue) external virtual returns (bool);
    function transfer(address recipient, uint256 amount) external returns (bool);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);

}

contract KSquestionNFT is ERC721, Ownable {
    // KStoken public kstoken;

    constructor()
    ERC721("Knowledge Swap Question", "KSQ")
    {
        // kstoken = KStoken(0xb00bc5f7dCBe05DaD3FEAafcA99F1a59D8976B1a);
    }

    KSquestion[] public questions;

    // For Awards
    mapping(address => uint) public balances;

    struct KSquestion {
            string tokenURI;
        }

    event NewQuestion(address indexed owner, string tokenURI);

    uint256 COUNTER = 1;

    // INTERNAL CREATE A QUESTION NFT
    function _createQuestion(string memory tokenURI) internal{
        KSquestion memory newKSquestion = KSquestion(tokenURI);
        questions.push(newKSquestion);
        _safeMint(msg.sender,COUNTER); 
        emit NewQuestion(msg.sender, tokenURI);
        COUNTER ++;
    }

    // GET FUNCTION
    function getAllQuestions() public view returns(KSquestion[] memory){
        return questions;
    }

    // EXTERNAL MAIN CREATE QUESTION
    function AskMyQuestion(string memory _tokenURI) public payable{
    balances[msg.sender] += 1;
    _createQuestion(_tokenURI);
    }


    // Award Answer
    // function AwardAnswer(address payable _answerer, uint256 amount) public{
    //     kstoken.approve(address(this),amount);
    //     kstoken.transferFrom(address(this), _answerer, amount);
    // }

    // function contractBalance() public view returns(uint256){
    //     return kstoken.balanceOf(address(this));
    // }

    // function checkApproval(uint $KStoken) public{
    //     // address toTest = 0x1D3442b1d5Ec9C85cC18023685f9C742c6345004;
    //     // kstoken.approve(toTest, $KStoken);
    //     // kstoken.transferFrom(msg.sender, toTest, $KStoken);
    //     kstoken.transferFrom(msg.sender, address(this), $KStoken);
    // }
}