import React, { Component } from 'react';
import Layout from '../../../components/Layout';
import RequestRow from '../../../components/RequestRow';
import {
  Button,
  Card,
  Form,
  Grid,
  Input,
  Message,
  Table,
  Footer,
  TableCell,
} from 'semantic-ui-react';
import { Link } from '../../../routes';
import Campaign from '../../../ethereum/campaign';
import web3 from '../../../ethereum/web3';

class RequestIndex extends Component {
  static async getInitialProps(props) {
    try {
      const campaign = Campaign(props.query.address);
      const requestsCount = await campaign.methods.getRequestsCount().call();
      const requests = await Promise.all(
        Array(parseInt(requestsCount))
          .fill()
          .map((element, index) => {
            console.log(element, index);
            return campaign.methods.requests(index).call();
          })
      );
      const approversCount = await campaign.methods.approversCount().call();

      return {
        address: props.query.address,
        requests: requests,
        requestsCount: requestsCount,
        approversCount: approversCount,
      };
    } catch (error) {
      console.log(error);
    }
  }

  renderRows = () => {
    return this.props.requests.map((request, index) => {
      return (
        <RequestRow
          key={index}
          id={index}
          requests={request}
          address={this.props.address}
          approversCount={this.props.approversCount}
        />
      );
    });
  };

  render() {
    const { Header, Row, HeaderCell, Body, Cell } = Table;
    return (
      <Layout>
        <h3>Requests</h3>
        <Link
          floated="right"
          route={`/campaigns/${this.props.address}/requests/new`}
        >
          <a>
            <Button
              floated="right"
              content="Add Request"
              primary
              style={{ marginBottom: 10 }}
            />
          </a>
        </Link>
        <Table celled>
          <Header>
            <Row>
              <HeaderCell>ID</HeaderCell>
              <HeaderCell>Description</HeaderCell>
              <HeaderCell>Amount (ether)</HeaderCell>
              <HeaderCell>Recipient</HeaderCell>
              <HeaderCell>Approval Count</HeaderCell>
              <HeaderCell>Approve</HeaderCell>
              <HeaderCell>Finalize</HeaderCell>
            </Row>
          </Header>
          <Body>{this.renderRows()}</Body>
        </Table>
        <div>Found {this.props.requestsCount} Requests</div>
      </Layout>
    );
  }
}

export default RequestIndex;
