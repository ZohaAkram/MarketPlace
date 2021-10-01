
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
}) })
})