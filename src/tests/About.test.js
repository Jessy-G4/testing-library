import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

test(`Se a página contém as informações sobre a Pokédex e Teste se a página 
contém um heading h2 com o texto About Pokédex;`, () => {
  const { history } = renderWithRouter(<App />);
  history.push('/about');
  const aboutH2 = screen.getByRole('heading', {
    name: /about pokédex/i,
  });
  expect(aboutH2).toBeInTheDocument();
});

test('Se a página contém dois parágrafos com texto sobre a Pokédex;', () => {
  const { history } = renderWithRouter(<App />);
  history.push('/about');
  const paragrafo1 = screen.getByText(
    /this application simulates a pokédex/i,
  );
  const paragrafo2 = screen.getByText(
    /one can filter pokémons by type, and see more details for each one of them/i,
  );
  const paragrafos = [paragrafo1, paragrafo2];
  paragrafos.forEach((paragrafo) => {
    expect(paragrafo).toBeInTheDocument();
  });
});

test(`Teste se a página contém a seguinte imagem de uma Pokédex:
https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png.`, () => {
  const { history } = renderWithRouter(<App />);
  history.push('/about');
  const imagem = screen.getByRole('img', {
    name: /pokédex/i,
  });
  expect(imagem).toHaveProperty('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
