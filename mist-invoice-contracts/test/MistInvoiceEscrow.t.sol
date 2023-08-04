// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console2} from "forge-std/Test.sol";
import {MistInvoiceEscrow} from "../src/MistInvoiceEscrow.sol";

contract MistInvoiceEscrowTest is Test {
    MistInvoiceEscrow public wrapper;

    function setUp() public {
        address _addr = new MockInvoiceFactory().address();
        wrapper = new MistInvoiceEscrow(_addr);
        counter.setNumber(0);
    }

    function testCreate() public {
        // TODO create new invoice
        //assertEq(created.amount, 100);
    }

}
