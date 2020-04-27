import gql from 'graphql-tag';
import { useQuery } from 'react-apollo';
import { StoreReader } from 'apollo-boost';


const GET_PRODUCTS_BY_ID = gql`
    query getProducts($ids: [ID!]!) {
        nodes(ids: $ids) {
            ... on Product {
                title
                handle
                descriptionHtml
                id
                images(first: 1) {
                    edges {
                        node {
                            originalSrc
                            altText
                        }
                    }
                }
                variants(first: 1) {
                    edges {
                        node {
                            price
                            id
                        }
                    }
                }
            }
        }
    }
`;
 
function ResourceList() {
    const {loading, error, data} = useQuery(GET_PRODUCTS_BY_ID, {variables: { ids: store.get('ids')}})
    return(
        <div>
            <h1>
            Product List
            </h1>
        </div>
    )
}
export default ResourceList;
