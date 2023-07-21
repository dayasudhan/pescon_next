import React from 'react';
import ReactDOM from 'react-dom';
import Carousel from 'semantic-ui-carousel-react';
import { Image, Button } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
const App = () => {
  let elements = [
    {
      render: () => {
        return (
          <Image
            src="https://i.pinimg.com/originals/09/6d/f0/096df0eb195b8f0d9475924f9a1e9425.jpg"
            width={600}
            height={500}
          />
        );
      },
    },
    {
      render: () => {
        return (
          <Image
            src="https://i.imgur.com/0eRe75Y.jpg"
            width={600}
            height={500}
          />
        );
      },
    },
    {
      render: () => {
        return (
          <Image
            src="https://5.imimg.com/data5/AY/PU/MY-6627052/tissue-culture-banana-plant-500x500.jpg"
            width={600}
            height={500}
          />
        );
      },
    },
    {
      render: () => {
        return (
          <Image
            src="https://thumbs.dreamstime.com/z/arecanut-plant-also-called-areca-catechu-which-species-palm-grown-garden-small-203111792.jpg"
            width={600}
            height={500}
          />
        );
      },
    },
  ];
  return (
    <Carousel
      elements={elements}
      duration={3000}
      animation="fly left"
      showNextPrev={false}
      showIndicators={false}
    />
  );
};
export default App;
