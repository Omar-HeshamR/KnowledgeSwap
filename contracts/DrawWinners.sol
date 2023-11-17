// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol";
import "@chainlink/contracts/src/v0.8/ConfirmedOwner.sol";


interface KSTOKEN {

    function balanceOf(address account) external view returns (uint256);
    function allowance(address owner, address spender) external view returns (uint256);
    function transfer(address recipient, uint256 amount) external returns (bool);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);

}



// VARIBLES HARDCODED TO MUMBAI TESTNETWORK
contract DrawRandomWinnersContract is VRFConsumerBaseV2, ConfirmedOwner {
    
    KSTOKEN public KStoken;
    event RequestSent(uint256 requestId, uint32 numWords);
    event RequestFulfilled(uint256 requestId, uint256[] randomWords);
    struct RequestStatus {
        bool fulfilled; // whether the request has been successfully fulfilled
        bool exists; // whether a requestId exists
        uint256[] randomWords;
    }
    mapping(uint256 => RequestStatus)public s_requests; 
    VRFCoordinatorV2Interface COORDINATOR;

    uint64 s_subscriptionId;
    uint256[] public requestIds;
    uint256 public lastRequestId;

    bytes32 keyHash = 'private key goes here';
    uint32 callbackGasLimit = 100000;
    uint16 requestConfirmations = 3;
    uint32 numWords = 2;


    constructor()
        VRFConsumerBaseV2(0x7a1BaC17Ccc5b313516C5E16fb24f7659aA5ebed)
        ConfirmedOwner(msg.sender)
    {
        KStoken = KSTOKEN(0x164A5B05F1C10a3D6ebd48dc6f3949Dbb4102034);
        COORDINATOR = VRFCoordinatorV2Interface(0x7a1BaC17Ccc5b313516C5E16fb24f7659aA5ebed);
        s_subscriptionId = 2632;
    }

    function _getRandomNumber(uint256 SizeToPickOutOf) internal returns (uint256 requestId){
        requestId = COORDINATOR.requestRandomWords(
            keyHash,
            s_subscriptionId,
            requestConfirmations,
            callbackGasLimit,
            numWords
        );
        s_requests[requestId] = RequestStatus({
            randomWords: new uint256[](0),
            exists: true,
            fulfilled: false
        });
        requestIds.push( (requestId % (SizeToPickOutOf)) );
        lastRequestId = (requestId % (SizeToPickOutOf));
        emit RequestSent((requestId % (SizeToPickOutOf)), numWords);
        return (requestId % (SizeToPickOutOf));
    }

    function fulfillRandomWords(uint256 _requestId, uint256[] memory _randomWords) internal override {
        require(s_requests[_requestId].exists, "request not found");
        s_requests[_requestId].fulfilled = true;
        s_requests[_requestId].randomWords = _randomWords;
        emit RequestFulfilled(_requestId, _randomWords);
    }

    function getRequestStatus(uint256 _requestId) external view returns 
    (bool fulfilled, uint256[] memory randomWords) {
        require(s_requests[_requestId].exists, "request not found");
        RequestStatus memory request = s_requests[_requestId];
        return (request.fulfilled, request.randomWords);
    }

    // WILL BE REPEATED BY CHAINLINK AUTOMATION EVERY 15 DAYS.
    function AwardWinnerOfA(address[] memory rankedSolvers) onlyOwner public{
        uint256 randomWinner = _getRandomNumber(rankedSolvers.length);
        KStoken.transferFrom(address(this), rankedSolvers[randomWinner], 5000 * (10 ** 18));
    }

    function AwardWinnerOfB(address[] memory rankedSolvers) onlyOwner public{
        uint256 randomWinner = _getRandomNumber(rankedSolvers.length);
        KStoken.transferFrom(address(this), rankedSolvers[randomWinner], 2000 * (10 ** 18));
    }

    function AwardWinnerOfC(address[] memory rankedSolvers) onlyOwner public{
        uint256 randomWinner = _getRandomNumber(rankedSolvers.length);
        KStoken.transferFrom(address(this), rankedSolvers[randomWinner], 800 * (10 ** 18));
    }

}
