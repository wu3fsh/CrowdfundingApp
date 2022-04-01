import React, { Component } from 'react';
import { Button, Table } from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import Campaign from '../ethereum/campaign';
import { Router } from '../routes';

class RequestRow extends Component {
  state = {
    approveLoading: false,
    finalizeLoading: false,
  };

  onApprove = async () => {
    try {
      this.setState({ approveLoading: true });
      const campaign = Campaign(this.props.address);
      const accounts = await web3.eth.getAccounts();

      await campaign.methods.approveRequest(this.props.id).send({
        from: accounts[0],
      });
      Router.replaceRoute(`/campaigns/${this.props.address}/requests`);
    } catch (error) {
      console.log(error);
    }

    this.setState({ approveLoading: false });
  };

  onFinalize = async () => {
    try {
      this.setState({ finalizeLoading: true });
      const campaign = Campaign(this.props.address);
      const accounts = await web3.eth.getAccounts();

      await campaign.methods.finalizeRequest(this.props.id).send({
        from: accounts[0],
      });
      Router.replaceRoute(`/campaigns/${this.props.address}/requests`);
    } catch (error) {
      console.log(error);
    }
    this.setState({ finalizeLoading: false });
  };

  render() {
    const { Row, Cell } = Table;
    const { description, approvalCount, complete, recipient, value } =
      this.props.requests;
    console.log('this.props', this.props);

    const readyToFinalize = approvalCount > this.props.approversCount / 2;
    return (
      <Row disabled={complete} positive={readyToFinalize && !complete}>
        <Cell>{this.props.id}</Cell>
        <Cell>{description}</Cell>
        <Cell>{web3.utils.fromWei(value, 'ether')}</Cell>
        <Cell>{recipient}</Cell>
        <Cell>
          {approvalCount}/{this.props.approversCount}
        </Cell>
        <Cell>
          {/* {complete ? null : (
            <Button
              color="green"
              basic
              onClick={this.onApprove}
              loading={this.state.approveLoading}
            >
              Approve
            </Button>
          )} */}
          <Button
            color="green"
            basic
            onClick={this.onApprove}
            loading={this.state.approveLoading}
            disabled={complete || readyToFinalize}
          >
            Approve
          </Button>
        </Cell>
        <Cell>
          <Button
            color="teal"
            basic
            onClick={this.onFinalize}
            loading={this.state.finalizeLoading}
            disabled={complete || !readyToFinalize}
          >
            Finalize
          </Button>
        </Cell>
      </Row>
    );
  }
}

export default RequestRow;
