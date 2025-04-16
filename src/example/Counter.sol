// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";

contract Counter is Ownable {
    uint256 public number;

    constructor() Ownable(_msgSender()) { }

    function setNumber(uint256 newNumber) public onlyOwner {
        number = newNumber;
    }

    function increment() public {
        number++;
    }
}
