import { EmptyState, Layout, Page } from '@shopify/polaris';
import { ResourcePicker, TitleBar } from '@shopify/app-bridge-react';
import React, { Component, useState } from "react";
import store from 'store-js';
import ProductList from '../component/ProductList';
import axios from 'axios';

function Index() {

  const [ resourceModal, setResourceModal ] = useState({ open: false })
  const emptyState = !store.get('ids');

  function handleSelection(resources) {
      const idsFromResources = resources.selection.map((product) => product.id);
      setResourceModal({ open: false });
      store.set('ids', idsFromResources)

      const selectedProducts = resources.selection;

      //deleteApiData();

      selectedProducts.map(product => makeApiCall(product));
  }

  function deleteApiData() {
      const url = '/api/products';

      axios.delete(url);
  }

  async function makeApiCall(products) {
      const url = '/api/products';

      axios.post(url, products)
          .then(result => console.log(result))
          .catch(error => console.log(error))
  }

  const img = 'https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg';

  return (
    <Page>
      <TitleBar primaryAction={ {
        content: 'Select products',
        onAction: () => setResourceModal({ open: true }),
      } }/>
      <ResourcePicker
        resourceType="Product"
        showVariants={ false }
        open={ resourceModal.open }
        onSelection={ (resources) => handleSelection(resources) }
        onCancel={ () => setResourceModal({ open: false }) }
      />
    { emptyState ? 
      <Layout>
        <EmptyState
          heading="Discount your products temporarily"
          action={ {
            content: 'Select products',
            onAction: () => setResourceModal({ open: true }),
          } }
          image={ img }
        >
          <p>Select products to change their price temporarily.</p>
        </EmptyState>
      </Layout>
              : <ProductList />
            }
    </Page>
  );
}

export default Index;
