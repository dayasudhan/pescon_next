import React, { useState, useEffect, Fragment, useLayoutEffect } from 'react';
import Item from './item';
import { Grid, Segment } from 'semantic-ui-react';
import axios from 'axios';

const baseURL = '/items';
const Items = () => {
  const [menu, setMenu] = React.useState([
  ]);

  React.useEffect(() => {
    console.log('reacteffect');

    axios.get(baseURL).then((response) => {
      setMenu(response.data);
      console.log('response', response.data);
    });
  }, []);

  return (
    <Segment>
      {/* <Segment inverted color="teal" textAlign="left">
        Items
      </Segment> */}
      <Grid Doubling container columns={3}>
        <Grid.Row columns={4}>
          {menu?.map((element) => (
            <Grid.Column>
              <Item data={element} />
            </Grid.Column>
          ))}
        </Grid.Row>
      </Grid>
    </Segment>
  );
};

export default Items;
