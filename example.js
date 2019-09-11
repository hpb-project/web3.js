#!/usr/bin/env node
/*
Usage:
- Make sure NodeJS is installed (sudo apt-get install nodejs)
- Execute the example by typing: node example.js
*/

var node = "https://node.myhpbwallet.com"
var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider(node));

function showAccounts() {
  web3.hpb.getAccounts((err, accounts) => {
    if (err != null) {
      console.log("There was an error fetching HPB accounts on the HPB Sync Node ("+node+")");
      return;
    }

    if (accounts.length == 0) {
      console.log("Couldn't find any accounts on the HPB Sync Node ("+node+")");
      return;
    }
    callback(accounts);
  });
}

function callback(accounts){
  for(var i=0; i<accounts.length; i++) {
    console.log('Address: ' + accounts[i]);
    var balance = web3.hpb.getBalance(accounts[i]);
    balance = web3.fromWei(balance, 'ether');
    console.log('Balance: ' + balance + ' HPB');
  }
}

console.log("Version: " + web3.net.version);
console.log("Listening: " + web3.net.listening);
console.log("Peer Count: " + web3.net.peerCount);
console.log("Protocol Version: " + web3.hpb.protocolVersion);
console.log("Is Syncing :" + web3.hpb.syncing);
console.log("Coinbase :" + web3.hpb.coinbase);
console.log("Mining :" + web3.hpb.mining);
console.log("Created new Account :" + web3.personal.newAccount('12345678'))
console.log("Get Transaction Count: " + web3.hpb.getTransactionCount("0x407d73d8a49eeb85d32cf465507dd71d507100c1"));
console.log("Get Block Transaction Count: " + web3.hpb.getBlockTransactionCount("0x14e359841aa92a9befa315d866e3f9bbf4ea09662c30538064493f31ebc4ceee"));
console.log("Get Uncle Count: " + web3.hpb.getBlockUncleCount("0x14e359841aa92a9befa315d866e3f9bbf4ea09662c30538064493f31ebc4ceee"));
// console.log(web3.hpb.sendTransaction());
console.log("Get Block: " + '%j', web3.hpb.getBlock("0x14e359841aa92a9befa315d866e3f9bbf4ea09662c30538064493f31ebc4ceee"))
console.log("Get Transaction: " + '%j', web3.hpb.getTransaction("0x7f19c141e526066d92331a4ecad637251e8f9d986faf3d79160b16c310c0a86a"));
console.log("Get Transaction by Block: " + '%j',web3.hpb.getTransactionFromBlock("0x14e359841aa92a9befa315d866e3f9bbf4ea09662c30538064493f31ebc4ceee", "0x0"));

console.log("Account(s) available on the HPB Sync Node ("+node+")");
showAccounts();
