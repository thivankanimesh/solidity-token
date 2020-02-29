pragma solidity >=0.4.21 <0.7.0;

import "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20Detailed.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20Mintable.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20Pausable.sol";
import "../node_modules/@openzeppelin/contracts/ownership/Ownable.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20Capped.sol";

contract ThivaToken is ERC20Detailed, ERC20Mintable, ERC20Pausable, Ownable{

    constructor(uint256 _initialSupply) ERC20Detailed("Thiva Token","THIVA", 2) public {
        _mint(msg.sender, _initialSupply);
    }

}