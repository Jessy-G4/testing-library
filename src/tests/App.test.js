import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';
// import { NotFound } from '../pages';
// import FavoritePokemons from '../pages/FavoritePokemons';

// começando o projeto
test(`Se o topo da aplicação contém um 
conjunto fixo de links de navegação:`, () => {
  renderWithRouter(<App />);
  const links = screen.getByRole('navigation');

  expect(links).toBeInTheDocument();
});

test(`Se a aplicação é redirecionada para a página de About, 
na URL /about, ao clicar no link About da barra de navegação;`, () => {
  renderWithRouter(<App />);
  const about = screen.getByRole('link', {
    name: /about/i,
  });
  userEvent.click(about);
  const aboutH1 = screen.getByRole('heading', {
    name: /about pokédex/i,
  });
  expect(aboutH1).toBeInTheDocument();
});

test(`Se a aplicação é redirecionada para a página inicial, na URL / 
ao clicar no link Home da barra de navegação;`, () => {
  const { history } = renderWithRouter(<App />);
  history.push('/about');
  const home = screen.getByRole('link', {
    name: /home/i,
  });
  userEvent.click(home);
  const encounteredH1 = screen.getByRole('heading', { name: /encountered pokémons/i });
  expect(encounteredH1).toBeInTheDocument();
});

test(`Se a aplicação é redirecionada para a página de Pokémons Favoritados, 
na URL /favorites, ao clicar no link Favorite Pokémons da barra de navegação;`, () => {
  renderWithRouter(<App />);
  const favoritos = screen.getByRole('link', {
    name: /favorite pokémons/i,
  });
  userEvent.click(favoritos);
  const favoritosH1 = screen.getByRole('heading', {
    name: /favorite pokémons/i,
  });
  expect(favoritosH1).toBeInTheDocument();
});

test(`Se a aplicação é redirecionada para a página Not Found ao entrar 
em uma URL desconhecida.`, () => {
  const { history } = renderWithRouter(<App />);
  history.push('/matheusGoyas');
  const notFound = screen.getByRole('heading', {
    name: /page requested not found/i,
  });
  expect(notFound).toBeInTheDocument();
});
