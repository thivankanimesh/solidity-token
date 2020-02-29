pragma solidity >=0.4.22 <0.7.0;

contract Lottery {
    
    address public manager;
    address[] public players;
    address public winnerAddress;
    uint public lastWinnerPickedTime;
    
    constructor() public {
        manager = msg.sender;
    }
    
    function enter() public payable {
        require(msg.value > .01 ether,'Ether value need to be greater than 0.01 ether');
        players.push(msg.sender);
    }
    
    function random() private view returns (uint256) {
        return uint256(keccak256(abi.encodePacked(block.difficulty, now, players)));
    }
    
    function pickWinner() public payable restricted {
        uint256 index = random()%players.length;
        winnerAddress = players[index];
        lastWinnerPickedTime = now;
        address(uint256(winnerAddress)).transfer(address(this).balance);
        players = new address[](0);
    }

    function getWinnerAddress() public view returns (address) {
        return winnerAddress;
    }
    
    modifier restricted() {
        require(msg.sender == manager, 'Only manager can pick winner');
        _;
    }
    
    function getPlayers() public view returns (address[] memory){
        return players;
    }
    
}