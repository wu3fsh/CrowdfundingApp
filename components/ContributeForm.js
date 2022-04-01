import React, { Component } from 'react';
import { Button, Form, Input, Message } from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import Campaign from '../ethereum/campaign';
import { Router } from '../routes';

class ContributeForm extends Component {
  state = {
    loading: false,
    errorMessage: '',
    value: '',
  };

  onSubmit = async (event) => {
    event.preventDefault();

    this.setState({
      loading: true,
      errorMessage: '',
    });

    try {
      const accounts = await web3.eth.getAccounts();
      const campaign = Campaign(this.props.address);

      await campaign.methods.contribute().send({
        from: accounts[0],
        value: web3.utils.toWei(this.state.value, 'ether'),
      });

      Router.replaceRoute(`/campaigns/${this.props.address}`);
    } catch (error) {
      this.setState({ errorMessage: error.message });
      console.log('error', error);
    }

    this.setState({ loading: false, value: '' });
  };

  render() {
    return (
      <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
        <Form.Field>
          <label>Amount to Contribute</label>
          <Input
            label="ether"
            labelPosition="right"
            value={this.state.value}
            onChange={(event) => {
              this.setState({ value: event.target.value });
            }}
          />
        </Form.Field>

        <Message error header="Oops!" content={this.state.errorMessage} />

        <Button loading={this.state.loading} type="submit" primary>
          Contribute
        </Button>
      </Form>
    );
  }
}

export default ContributeForm;
