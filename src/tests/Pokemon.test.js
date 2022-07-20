import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

test('O nome correto do pokémon deve ser mostrado na tela;', () => {
  const { history } = renderWithRouter(<App />);
  history.push('/');
  const nomePokemon = screen.getByTestId('pokemon-name');
  expect(nomePokemon).toBeInTheDocument();
});

test('O tipo correto do pokémon deve ser mostrado na tela;', () => {
  const { history } = renderWithRouter(<App />);
  history.push('/');
  const tipoPokemon = screen.getAllByText(/Electric/i);
  expect(tipoPokemon[1]).toBeInTheDocument();
});

test(`O peso médio do pokémon deve ser exibido com um texto no formato Average weight:
 <value> <measurementUnit>; onde <value> e <measurementUnit> são, respectivamente, 
 o peso médio do pokémon e sua unidade de medida;`, () => {
  const { history } = renderWithRouter(<App />);
  history.push('/');
  pokemons.forEach((monstroDeBolso) => {
    const kg = monstroDeBolso.averageWeight.measurementUnit;
    const valor = monstroDeBolso.averageWeight.value;
    const info = `average weight: ${valor} ${kg}`;
    const elemento = screen.getByTestId('pokemon-weight', {
      text: info,
    });
    expect(elemento).toBeInTheDocument();
  });
});

test(`A imagem do pokémon deve ser exibida. Ela deve conter um atributo src com a URL 
da imagem e um atributo alt com o texto <name> sprite, onde 
<name> é o nome do pokémon.`, () => {
  const { history } = renderWithRouter(<App />);
  history.push('/');
  const imgPokemon = screen.getByRole('img', {
    name: /pikachu sprite/i,
  });
  expect(imgPokemon).toHaveProperty('src', pokemons[0].image);
  expect(imgPokemon).toHaveProperty('alt', `${pokemons[0].name} sprite`);
});

test(`A imagem do pokémon deve ser exibida. Ela deve conter um atributo src com a URL 
da imagem e um atributo alt com o texto <name> sprite, onde 
<name> é o nome do pokémon.`, () => {
  const { history } = renderWithRouter(<App />);
  history.push('/');
  const maisDetalhes = screen.getByRole('link', {
    name: /more details/i,
  });
  expect(maisDetalhes).toBeInTheDocument();
  expect(maisDetalhes).toHaveProperty('href', `http://localhost/pokemons/${pokemons[0].id}`);
});

test(`Teste se ao clicar no link de navegação do pokémon, 
é feito o redirecionamento da aplicação para a página de detalhes de pokémon;`, () => {
  const { history } = renderWithRouter(<App />);
  history.push('/');
  const maisDetalhes = screen.getByRole('link', {
    name: /more details/i,
  });
  userEvent.click(maisDetalhes);
  const sumario = screen.getByRole('heading', {
    name: /summary/i,
  });
  expect(sumario).toBeInTheDocument();
});

test(`O ícone deve ser uma imagem com o atributo src contendo
 o caminho /star-icon.svgP`, () => {
  const { history } = renderWithRouter(<App />);
  history.push('/');
  const maisDetalhes = screen.getByRole('link', {
    name: /more details/i,
  });
  userEvent.click(maisDetalhes);
  const checkbox = screen.getByRole('checkbox', {
    name: /pokémon favoritado\?/i,
  });
  userEvent.click(checkbox);
  const estrela = screen.getByRole('img', {
    name: /Pikachu is marked as favorite/i,
  });
  expect(estrela).toHaveProperty('src', 'http://localhost/star-icon.svg');
});

test(`A imagem deve ter o atributo alt igual a <pokemon> is marked as favorite, onde 
<pokemon> é o nome do pokémon exibido.`, () => {
  const { history } = renderWithRouter(<App />);
  history.push('/');
  const maisDetalhes = screen.getByRole('link', {
    name: /more details/i,
  });
  userEvent.click(maisDetalhes);
  const estrela = screen.getByRole('img', {
    name: /Pikachu is marked as favorite/i,
  });
  expect(estrela).toHaveProperty('alt', `${pokemons[0].name} is marked as favorite`);
});
