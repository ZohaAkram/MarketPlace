import React, { Component } from 'react';
//import logo from '../logo.png';
import Web3 from 'web3';
import Marketplace from '../abis/Marketplace.json';
import './App.css';

class App extends Component {
  async componentWillMount(){
    await this.loadWeb3()
    await this.loadBlockchainData()
  }
  async loadWeb3(){
    window.addEventListener('load', async () => {
      // Modern dapp browsers...
      if (window.ethereum) {
          window.web3 = new Web3(window.ethereum);
         
      }
      // Legacy dapp browsers...
      else if (window.web3) {
          window.web3 = new Web3(window.web3.currentProvider);
          // Acccounts always exposed
   
      }
      // Non-dapp browsers...
      else {
          console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
      }
  });
  }
  async loadBlockchainData(){
    const Web3 = require('web3');
// web3 lib instance
const web3 = new Web3(window.ethereum);
// get all accounts
const accounts = await web3.eth.getAccounts();
this.setState({account:accounts[0]})
const networkId=await web3.eth.net.getId()
const abi=Marketplace.abi
const address=Marketplace.networks[networkId].address
const marketplace = web3.eth.Contract(abi,address)
this.setState({marketplace})
this.setState({loading:false})
  }

  constructor(props){
    super(props)
    this.state={
      account:'',
      prodCount: 0,
      products: [],
      loading : true
    }
  }
  render() {
    return (
      <div>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <h5
            className="navbar-brand col-sm-3 col-md-2 mr-0"
              target="_blank"
            rel="noopener noreferrer"
          >
            Marketplace
          </h5>
          <p style={{color:"White"}}>{this.state.account}</p>
        </nav>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
            <div id="content">
                 <h1>Add Book</h1>
                
               </div>
               
              <div className="content mr-auto ml-auto">
                
                {/* <h1>Online Book MarketPlace</h1> */}
               
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
