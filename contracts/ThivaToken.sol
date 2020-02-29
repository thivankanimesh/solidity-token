pragma solidity >=0.4.21 <0.7.0;

import "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20Detailed.sol";

contract ThivaToken is ERC20, ERC20Detailed{

    constructor(uint256 _initialSupply) ERC20Detailed("Thiva Token","THIVA", 2) public {
        _mint(msg.sender, _initialSupply);
    }

}