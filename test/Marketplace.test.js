const { assert } = require('chai');

const Marketplace=artifacts.require("./Marketplace.sol");
require('chai').use(require('chai-as-promised')).should();

contract('Marketplace',([deployer,seller,buyer])=>{
    let marketplace
    before(async()=>{
        marketplace=await Marketplace.deployed()
    })
    describe('deployment',async()=>{
        it('deploys successfully',async()=>{
            const address = await marketplace.address
            assert.notEqual(address,0x0)
            assert.notEqual(address,'')
            assert.notEqual(address,null)
            assert.notEqual(address,undefined)
  
        })
        it('has a name',async()=>{
            const name=await marketplace.name()
            assert.equal(name,'Online Book Marketplace')
        })
    })

    describe('products',async()=>{
        let result,prodCount
        before(async()=>{
            result=await marketplace.createBookProd('Intro to Programming',web3.utils.toWei('1','Ether'),{from:seller})
           prodCount=await marketplace.prodCount()
        })

        it('creates Products',async()=>{
            // success
           assert.equal(prodCount,1); //checks for product count
       const event= result.logs[0].args;
       assert.equal(event.id.toNumber(),prodCount.toNumber(),'id is correct')
       assert.equal(event.name,'Intro to Programming','name is correct')
       assert.equal(event.price, 1000000000000000000,'price is correct')
       assert.equal(event.owner,seller ,'owner is correct')
       assert.equal(event.purchased, false,'purchased is correct')   
              

    //failure
  await await marketplace.createBookProd('',web3.utils.toWei('1','Ether'),{from:seller}).should.be.rejected;
  await await marketplace.createBookProd('Intro to Programming',0,{from:seller}).should.be.rejected;
        }) 
        it('lists Products',async()=>{
    const product=await marketplace.bookProducts(prodCount)
    assert.equal(product.id.toNumber(),prodCount.toNumber(),'id is correct')
    assert.equal(product.name,'Intro to Programming','name is correct')
    assert.equal(product.price, 1000000000000000000,'price is correct')
    assert.equal(product.owner,seller ,'owner is correct')
    assert.equal(product.purchased, false,'purchased is correct')   
           

       })
    
       it('sells Products',async()=>{
           let prevSellerBal;
           prevSellerBal= await web3.eth.getBalance(seller);
           prevSellerBal=new web3.utils.BN(prevSellerBal);
       result = await marketplace.buyBookProd(prodCount,{from:buyer,value:web3.utils.toWei('1','Ether')})       
       const event= result.logs[0].args;
       assert.equal(event.id.toNumber(),prodCount.toNumber(),'id is correct')
       assert.equal(event.name,'Intro to Programming','name is correct')
       assert.equal(event.price, 1000000000000000000,'price is correct')
       assert.equal(event.owner,buyer ,'owner is correct')
       assert.equal(event.purchased, true,'purchased is correct')   
              
         let newSellerBal;
         newSellerBal=await web3.eth.getBalance(seller);
         newSellerBal=new web3.utils.BN(newSellerBal)
         let price
         price=web3.utils.toWei('1','Ether')
        price=new web3.utils.BN(price)
        const expectedBal=prevSellerBal.add(price);
        assert.equal(newSellerBal.toString(),expectedBal.toString());
     
     await marketplace.buyBookProd(99,{from:buyer,value:web3.utils.toWei('1','Ether')}).should.be.rejected;
     await marketplace.buyBookProd(prodCount,{from:buyer,value:web3.utils.toWei('0.5','Ether')}).should.be.rejected;
     await marketplace.buyBookProd(prodCount,{from:deployer,value:web3.utils.toWei('1','Ether')}).should.be.rejected;  
     await marketplace.buyBookProd(prodCount,{from:buyer,value:web3.utils.toWei('1','Ether')}).should.be.rejected;
    })
    
    
    })
})