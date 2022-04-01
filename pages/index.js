import React, { Component } from 'react';
import factory from '../ethereum/factory';
import { Button, Card } from 'semantic-ui-react';
import Layout from '../components/Layout';
import { Link } from '../routes';

class CampaignIndex extends Component {
  static async getInitialProps() {
    const campaigns = await factory.methods.getDeployedCampaigns().call();
    console.log(campaigns);
    return {
      campaigns: campaigns,
    };
  }

  // async componentDidMount() {
  //   //  const campaigns = await factory.methods.getDeployedCampaigns().call();
  //   //  console.log(campaigns);
  //   // console.log(this.props.campaigns);
  // }

  renderCampaigns() {
    const items = this.props.campaigns.map((address) => {
      return {
        header: address,
        description: (
          <Link route={`/campaigns/${address}`}>
            <a>View Campaing</a>
          </Link>
        ),
        fluid: true,
      };
    });

    return <Card.Group items={items} />;
  }

  render() {
    console.log(this.props.campaigns);
    return (
      <Layout>
        <div>
          <h3>Open Campaigns</h3>
          <Link route="/campaigns/new">
            <a>
              <Button
                floated="right"
                icon="add circle"
                content="Create Campaign"
                primary={true}
              />
            </a>
          </Link>
          {this.renderCampaigns()}
        </div>
      </Layout>
    );
  }
}

export default CampaignIndex;
