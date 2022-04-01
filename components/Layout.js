import React from 'react';
import Head from 'next/head';
import { Container } from 'semantic-ui-react';
import Header from './Header';

const Layout = (props) => {
  return (
    <div>
      <Head>
        <link
          async
          rel="stylesheet"
          href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.1/dist/semantic.min.css"
        />
      </Head>
      <Container>
        <Header />
        {props.children}
      </Container>
    </div>
  );
};

export default Layout;
