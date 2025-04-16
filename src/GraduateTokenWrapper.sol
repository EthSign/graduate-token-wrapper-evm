// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import { SafeERC20 } from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract GraduateTokenWrapper is Ownable, ERC20 {
    using SafeERC20 for IERC20;

    bool public isGraduated;
    IERC20 public underlyingToken;

    error UnsupportedOperation();

    constructor(string memory name, string memory symbol) Ownable(_msgSender()) ERC20(name, symbol) { }

    function setInitialUnderlyingToken(address token) external onlyOwner {
        require(address(underlyingToken) == address(0), UnsupportedOperation());
        underlyingToken = IERC20(token);
    }

    function setGraduatedUnderlyingToken(address token) external onlyOwner {
        require(!isGraduated && address(underlyingToken) != address(0), UnsupportedOperation());
        underlyingToken = IERC20(token);
        isGraduated = true;
    }

    function wrap(uint256 amount) external {
        require(!isGraduated, UnsupportedOperation());
        underlyingToken.safeTransferFrom(_msgSender(), address(this), amount);
        _mint(_msgSender(), amount);
    }

    function unwrap(uint256 amount) external {
        _burn(_msgSender(), amount);
        underlyingToken.safeTransfer(_msgSender(), amount);
    }
}
