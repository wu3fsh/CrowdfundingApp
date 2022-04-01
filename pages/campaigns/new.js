import React, { Component } from 'react';
import Layout from '../../components/Layout';
import { Button, Form, Input, Message } from 'semantic-ui-react';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import { Router } from '../../routes';

class CampaignNew extends Component {
  state = {
    minimumContribution: '',
    errorMessage: '',
    loading: false,
  };

  onSubmit = async (event) => {
    event.preventDefault();

    this.setState({
      loading: true,
      errorMessage: '',
    });

    console.log('start accs');
    try {
      const accounts = await web3.eth.getAccounts();
      await factory.methods
        .createCampaign(this.state.minimumContribution)
        .send({
          from: accounts[0],
          // gas: web3.utils.fromWei('1000000000000000000', 'gwei'),
        });
      Router.pushRoute('/');
    } catch (error) {
      this.setState({ errorMessage: error.message });
    }
    console.log('accs2');
    this.setState({
      loading: false,
    });
  };

  render() {
    return (
      <Layout>
        <h3>Create a Campaign </h3>

        {/* <Form onSubmit={this.onSubmit} error={Boolean(this.state.errorMessage)}> */}
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>Minimum Contribution</label>
            <Input
              label="wei"
              labelPosition="right"
              value={this.state.minimumContribution}
              onChange={(event) =>
                this.setState({ minimumContribution: event.target.value })
              }
            />
          </Form.Field>

          <Message error header="Oops!" content={this.state.errorMessage} />

          <Button loading={this.state.loading} type="submit" primary>
            Create
          </Button>
        </Form>
      </Layout>
    );
  }
}

export default CampaignNew;
