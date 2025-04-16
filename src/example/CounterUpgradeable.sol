// SPDX-License-Identifier: MIT
// solhint-disable no-empty-blocks
pragma solidity ^0.8.13;

import { OwnableUpgradeable } from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import { UUPSUpgradeable } from "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

contract CounterUpgradeable is OwnableUpgradeable, UUPSUpgradeable {
    uint256 public number;

    function initialize() public initializer {
        __Ownable_init(_msgSender());
    }

    function setNumber(uint256 newNumber) public onlyOwner {
        number = newNumber;
    }

    function increment() public {
        number++;
    }

    function _authorizeUpgrade(address newImplementation) internal override onlyOwner { }
}
