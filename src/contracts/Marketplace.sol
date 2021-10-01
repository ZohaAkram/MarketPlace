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
    address payable owner;
    bool purchased;
}

event BookProdCreated(
uint id,
    string name,
    uint price,
    address payable owner,
    bool purchased
);
event BookProdPurchased(
uint id,
    string name,
    uint price,
    address payable owner,
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


function buyBookProd(uint _id) public payable{
    BookProduct memory _bookProd = bookProducts[_id];
    address payable _seller = _bookProd.owner;
   require(_bookProd.id>0 && _bookProd.id<= prodCount);
   require(msg.value >= _bookProd.price);
   require(!_bookProd.purchased);
   require(_seller !=msg.sender);
   
    _bookProd.owner=msg.sender; // transfer ownership
   _bookProd.purchased=true;
   bookProducts[_id]=_bookProd; //update book product
   address(_seller).transfer(msg.value);
   emit BookProdPurchased(prodCount, _bookProd.name,_bookProd.price, msg.sender, true);
    }

}