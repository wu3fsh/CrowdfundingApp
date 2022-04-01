import React, { Component } from 'react';
import Layout from '../../../components/Layout';
import { Button, Card, Form, Grid, Input, Message } from 'semantic-ui-react';
import Campaign from '../../../ethereum/campaign';
import web3 from '../../../ethereum/web3';
import { Link, Router } from '../../../routes';

class RequestNew extends Component {
  state = {
    value: '',
    description: '',
    recipient: '',
    errorMessage: '',
    loading: false,
  };

  static async getInitialProps(props) {
    const { address } = props.query;
    console.log('address', address);
    return { address };
  }

  onSubmit = async (event) => {
    event.preventDefault();

    console.log(this.state);
    this.setState({
      loading: true,
    });

    const { description, value, recipient } = this.state;

    try {
      const accounts = await web3.eth.getAccounts();
      const campaign = Campaign(this.props.address);

      await campaign.methods
        .createRequest(description, web3.utils.toWei(value, 'ether'), recipient)
        .send({
          from: accounts[0],
        });
      Router.pushRoute(`/campaigns/${this.props.address}/requests`);
    } catch (error) {
      console.log(error);
      this.setState({
        errorMessage: error.message,
      });
    }

    this.setState({
      loading: false,
    });
  };

  render() {
    return (
      <Layout>
        <Link route={`/campaigns/${this.props.address}/requests`}>
          <a>Back</a>
        </Link>

        <h3>Create a Request</h3>
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>Description</label>
            <Input
              value={this.state.description}
              onChange={(event) =>
                this.setState({ description: event.target.value })
              }
            />
          </Form.Field>
          <Form.Field>
            <label>Value in Ether</label>
            <Input
              value={this.state.value}
              onChange={(event) => this.setState({ value: event.target.value })}
            />
          </Form.Field>
          <Form.Field>
            <label>Recipient</label>
            <Input
              value={this.state.recipient}
              onChange={(event) =>
                this.setState({ recipient: event.target.value })
              }
            />
          </Form.Field>

          <Message error header="Oops!" content={this.state.errorMessage} />

          <Button primary loading={this.state.loading}>
            Create
          </Button>
        </Form>
      </Layout>
    );
  }
}

export default RequestNew;
