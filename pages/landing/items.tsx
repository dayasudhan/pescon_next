import React, { useState, useEffect, Fragment, useLayoutEffect } from 'react';
import Item from './item';
import { Grid, Segment } from 'semantic-ui-react';
import axios from 'axios';

const baseURL = 'http://localhost:3000/menu';
const Items = () => {
  const [menu, setMenu] = React.useState([
    {
      _id: '62fd0736ad62b9499b267f4c',
      menu: [
        {
          name: 'cultivator',
          price: 50000,
          availability: 1,
          timings: 5,
          description: 'ctivate a land',
          logo: 'https://demo.opencart.com/image/cache/catalog/demo/apple_cinema_30-800x800.jpg',
          _id: '62fd28d0d6fb4aee822d1972',
        },
        {
          name: 'Camera',
          price: 12,
          availability: 1,
          timings: 12,
          description: 'canon camera',
          logo: 'https://demo.opencart.com/image/cache/catalog/demo/canon_eos_5d_2-800x800.jpg',
          _id: '62fd295cd6fb4aee822d1a1e',
        },
        {
          name: 'Banana',
          price: 12,
          availability: 1,
          timings: 8,
          description: 'Banana Leaves',
          logo: 'https://5.imimg.com/data5/AY/PU/MY-6627052/tissue-culture-banana-plant-500x500.jpg',
          _id: '6319cd58396bf5137f23dfcb',
        },
      ],
    },
    {
      _id: '6319d2da38ca533b2ca1ee05',
      menu: [
        {
          name: 'ArecaNut Plant',
          price: 35,
          availability: 1,
          timings: 8,
          description: 'Bettlenut',
          logo: 'https://thumbs.dreamstime.com/z/arecanut-plant-also-called-areca-catechu-which-species-palm-grown-garden-small-203111792.jpg',
          _id: '6319d61038ca533b2ca1ee55',
        },
      ],
    },
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
      <Segment inverted color="teal" textAlign="left">
        {menu[0]?.menu[0]?.name}
      </Segment>
      <Grid Doubling container columns={3}>
        <Grid.Row columns={4}>
          {menu[0]?.menu?.map((element) => (
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
