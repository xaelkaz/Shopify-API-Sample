import App from 'next/app';
import Head from 'next/head';
import { AppProvider } from '@shopify/polaris';
import { Provider } from '@shopify/app-bridge-react';
import Cookies from "js-cookie";
import '@shopify/polaris/styles.css';
import translations from '@shopify/polaris/locales/en.json';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

const client = new ApolloClient({
  fetchOptions: {
    credentials: 'include',
  },
});

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <React.Fragment>
        <Head>
          <title>Sample App</title>
          <meta charSet="utf-8" />
        </Head>
          <AppProvider 
            i18n={{
                Polaris: {
                  ResourceList: {
                    sortingLabel: 'Sort by',
                    defaultItemSingular: 'item',
                    defaultItemPlural: 'items',
                    showing: 'Showing {itemsCount} {resource}',
                    Item: {
                      viewItem: 'View details for {itemName}',
                    },
                  },
                  Common: {
                    checkbox: 'checkbox',
                  },
                },
              }}
          >
            <ApolloProvider client={client}>
              <Component {...pageProps} />
            </ApolloProvider>
          </AppProvider>
      </React.Fragment>
    );
  }
}

export default MyApp;