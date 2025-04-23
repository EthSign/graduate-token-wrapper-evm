// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import { Test, console2 } from "forge-std/Test.sol";
import { GraduateTokenWrapper } from "../src/GraduateTokenWrapper.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract InitialERC20 is ERC20 {
    constructor() ERC20("initialToken", "ITOKEN") { }
}

contract GraduatedERC20 is ERC20 {
    constructor() ERC20("graduatedToken", "GTOKEN") { }
}

contract GraduateTokenWrapperTest is Test {
    GraduateTokenWrapper public wrapper;
    InitialERC20 public initialToken;
    GraduatedERC20 public graduatedToken;
    address public owner;
    address public user;

    error UnsupportedOperation();

    function setUp() public {
        owner = makeAddr("owner");
        user = makeAddr("user");

        vm.startPrank(owner);
        wrapper = new GraduateTokenWrapper("Wrapped Token", "WRAP");
        initialToken = new InitialERC20();
        graduatedToken = new GraduatedERC20();
        vm.stopPrank();
    }

    /**
     *  @dev setInitialUnderlyingToken()
     */
    function test_SetInitialUnderlyingToken_NotOwner() public {
        address nonOwner = makeAddr("nonOwner");
        vm.prank(nonOwner);
        vm.expectRevert(abi.encodeWithSelector(Ownable.OwnableUnauthorizedAccount.selector, nonOwner));
        wrapper.setInitialUnderlyingToken(address(initialToken));
    }

    function test_SetInitialUnderlyingToken_AlreadySet() public {
        vm.startPrank(owner);
        wrapper.setInitialUnderlyingToken(makeAddr("token1"));
        vm.expectRevert(UnsupportedOperation.selector);
        wrapper.setInitialUnderlyingToken(makeAddr("token2"));
        vm.stopPrank();
    }

    function testFuzz_SetInitialUnderlyingToken(address token) public {
        vm.assume(token != address(0));
        vm.prank(owner);
        wrapper.setInitialUnderlyingToken(token);
        assertEq(address(wrapper.underlyingToken()), token);
        assertEq(wrapper.isGraduated(), false);
    }

    /**
     *  @dev SetGraduatedUnderlyingToken()
     */
    function test_SetGraduatedUnderlyingToken_NotOwner() public {
        address nonOwner = makeAddr("nonOwner");
        vm.prank(owner);
        wrapper.setInitialUnderlyingToken(address(initialToken));
        vm.prank(nonOwner);
        vm.expectRevert(abi.encodeWithSelector(Ownable.OwnableUnauthorizedAccount.selector, nonOwner));
        wrapper.setGraduatedUnderlyingToken(address(graduatedToken));
    }

    function test_SetGraduatedUnderlyingToken_InitialNotSet() public {
        vm.prank(owner);
        vm.expectRevert(UnsupportedOperation.selector);
        wrapper.setGraduatedUnderlyingToken(address(graduatedToken));
    }

    function test_SetGraduatedUnderlyingToken_Graduated() public {
        vm.startPrank(owner);
        wrapper.setInitialUnderlyingToken(address(initialToken));
        wrapper.setGraduatedUnderlyingToken(address(graduatedToken));
        vm.expectRevert(UnsupportedOperation.selector);
        wrapper.setGraduatedUnderlyingToken(makeAddr("seeingSigns"));
        vm.stopPrank();
    }

    function testFuzz_SetGraduatedUnderlyingToken(address token) public {
        vm.assume(token != address(0));
        vm.startPrank(owner);
        wrapper.setInitialUnderlyingToken(address(initialToken));
        wrapper.setGraduatedUnderlyingToken(token);
        vm.stopPrank();
        assertEq(address(wrapper.underlyingToken()), token);
        assertEq(wrapper.isGraduated(), true);
    }

    /**
     *  @dev wrap()
     */
    function testFuzz_Wrap(uint256 amount) public {
        amount = bound(amount, 1, 10_000 ether);
        deal(address(initialToken), user, amount);
        vm.prank(owner);
        wrapper.setInitialUnderlyingToken(address(initialToken));
        vm.startPrank(user);
        initialToken.approve(address(wrapper), amount);
        wrapper.wrap(amount);
        vm.stopPrank();
        assertEq(wrapper.balanceOf(user), amount);
        assertEq(initialToken.balanceOf(user), 0);
        assertEq(initialToken.balanceOf(address(wrapper)), amount);
    }

    function test_Wrap_Graduated() public {
        uint256 amount = 1000 ether;
        vm.startPrank(owner);
        wrapper.setInitialUnderlyingToken(address(initialToken));
        wrapper.setGraduatedUnderlyingToken(address(graduatedToken));
        vm.stopPrank();
        vm.startPrank(user);
        initialToken.approve(address(wrapper), amount);
        vm.expectRevert(UnsupportedOperation.selector);
        wrapper.wrap(amount);
        vm.stopPrank();
    }

    function test_Wrap_NoInitialToken() public {
        uint256 amount = 1000 ether;
        vm.startPrank(user);
        initialToken.approve(address(wrapper), amount);
        vm.expectRevert();
        wrapper.wrap(amount);
        vm.stopPrank();
    }

    /**
     *  @dev unwrap()
     */
    function testFuzz_Unwrap(uint256 wrapAmount, uint256 unwrapAmount) public {
        wrapAmount = bound(wrapAmount, 1, 1000 ether);
        unwrapAmount = bound(unwrapAmount, 1, wrapAmount);
        deal(address(initialToken), user, 1000 ether);
        vm.prank(owner);
        wrapper.setInitialUnderlyingToken(address(initialToken));
        vm.startPrank(user);
        initialToken.approve(address(wrapper), wrapAmount);
        wrapper.wrap(wrapAmount);
        wrapper.unwrap(unwrapAmount);
        vm.stopPrank();
        assertEq(wrapper.balanceOf(user), wrapAmount - unwrapAmount);
        assertEq(initialToken.balanceOf(user), 1000 ether - wrapAmount + unwrapAmount);
        assertEq(initialToken.balanceOf(address(wrapper)), wrapAmount - unwrapAmount);
    }
}
