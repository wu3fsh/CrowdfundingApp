const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('./build/CampaignFactory.json');
// const {
//   interface,
//   bytecode
// } = require("./compile");

const provider = new HDWalletProvider(
  'seed',
  'https://rinkeby.infura.io/v3/ce0a88b0d64a4dcc9225fff54d5fab9f'
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(
    JSON.parse(compiledFactory.interface)
  )
    .deploy({
      data: compiledFactory.bytecode,
    })
    .send({
      gas: '1000000',
      from: accounts[0],
    });

  console.log('Contract deployed to', result.options.address);
};
deploy();
