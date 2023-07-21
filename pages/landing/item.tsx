import React from 'react';
import { Image, List, Rating } from 'semantic-ui-react';
import Link from 'next/link';
const baseURL = '/buyer/product/product?id=';
const Item = (props) => {
  const [url, setUrl] = React.useState(baseURL + props.data._id);
  return (
    <div>
      <div className="product-grid6">
        <div className="product-image6">
          <Image src={props.data.logo} size="medium" as="a" href={url} />
        </div>
        <div className="product-content">
          <h3 className="ui header">
            <Link href={url}>
              <a>{props.data.name}</a>
            </Link>

            <div className="sub header">{props.data.description}</div>
          </h3>
          <Rating icon="star" defaultRating={5} maxRating={5} />
          <br />
          <br />
          <div className="price">{props.data.price}</div>
        </div>
        <List className="social" horizontal>
          <List.Item>
            <List.Icon circular name="eye" size="large" />
          </List.Item>
          <List.Item>
            <List.Icon circular name="heart" size="large" />
          </List.Item>
          <List.Item>
            <List.Icon circular name="cart arrow down" size="large" />
          </List.Item>
        </List>
      </div>
    </div>
  );
};

export default Item;
