import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

test(`se a página contém um heading h2 com o texto
 Page requested not found;`, () => {
  const { history } = renderWithRouter(<App />);
  history.push('/matheusGoyas');
  const h2 = screen.getByRole('heading', {
    name: /page requested not found/i,
  });
  expect(h2).toBeInTheDocument();
});

test(`se a página contém um heading h2 com o texto
 Page requested not found;`, () => {
  const { history } = renderWithRouter(<App />);
  history.push('/matheusGoyas');
  const img = screen.getByRole('img', {
    name: /pikachu crying because the page requested was not found/i,
  });
  expect(img).toHaveProperty('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
