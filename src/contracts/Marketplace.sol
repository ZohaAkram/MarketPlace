// SPDX-License-Identifier: MIT
pragma solidity >= 0.5.8;

contract Marketplace{
string public name;
uint public prodCount=0;
mapping(uint=>BookProduct) public bookProducts;


struct BookProduct{
    uint id;
    string name;
    uint price;
    address owner;
    bool purchased;
}

event BookProdCreated(
uint id,
    string name,
    uint price,
    address owner,
    bool purchased
);
constructor()public {
name="Online Book Marketplace"; }

function createBookProd(string memory _name,uint _price) public{
require(bytes(_name).length>0); //checks for empty name
require(_price> 0); //checks for price
prodCount++;
bookProducts[prodCount]=BookProduct(prodCount,_name,_price,msg.sender,false);
emit BookProdCreated(prodCount, _name, _price, msg.sender, false);
}
}