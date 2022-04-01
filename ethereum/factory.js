import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x36eEcECEC12f43Fa3b34AfDe8ec9e9277d003861'
);

export default instance;
