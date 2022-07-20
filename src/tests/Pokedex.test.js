import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

test(`Se a página contém um heading h2 com o 
texto Encountered pokémons;`, () => {
  const { history } = renderWithRouter(<App />);
  history.push('/');
  const enconteredH1 = screen.getByRole('heading', {
    name: /encountered pokémons/i,
  });
  expect(enconteredH1).toBeInTheDocument();
});

test(`Se é exibido o próximo pokémon da 
lista quando o botão Próximo pokémon é clicado:`, () => {
  const { history } = renderWithRouter(<App />);
  history.push('/');
  const proximo = screen.getByRole('button', {
    name: /próximo pokémon/i,
  });
  pokemons.forEach((tipo, index) => {
    const tela = screen.getByText(tipo.name);
    if (index === 0) { expect(tela).toBeInTheDocument(); }
    userEvent.click(proximo);
    expect(tela).toBeInTheDocument();
  });
});

test(`Se é mostrado apenas um pokémon 
por vez;`, () => {
  const { history } = renderWithRouter(<App />);
  history.push('/');
  const pokemon = screen.getAllByRole('img', {
    name: /pikachu sprite/i,
  });
  expect(pokemon.length).toBe(1);
});

test('Teste se a Pokédex tem os botões de filtro:', () => {
  const { history } = renderWithRouter(<App />);
  history.push('/');
  const botoes = screen.getAllByTestId('pokemon-type-button');
  botoes.forEach((bot) => {
    expect(bot).toBeInTheDocument();
  });
});

test(`Deve existir um botão de filtragem
 para cada tipo de pokémon, sem repetição;`, () => {
  const { history } = renderWithRouter(<App />);
  history.push('/');
  const filteredTypes = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic',
    'Normal', 'Dragon'];
  filteredTypes.forEach((tipo) => {
    const tela = screen.getByRole('button', {
      name: tipo,
    });
    expect(tela).toBeInTheDocument();
  });
});

test(`A partir da seleção de um botão de tipo, 
a Pokédex deve circular somente pelos pokémons daquele tipo;`, () => {
  const { history } = renderWithRouter(<App />);
  history.push('/');
  const fisicoBotao = screen.getByRole('button', {
    name: /psychic/i,
  });
  userEvent.click(fisicoBotao);
  const Alakazam = screen.getByText(/Alakazam/i);
  expect(Alakazam).toBeInTheDocument();
  const proximoBotao = screen.getByRole('button', {
    name: /próximo pokémon/i,
  });
  userEvent.click(proximoBotao);
  const mew = screen.getByText(/Mew/i);
  expect(mew).toBeInTheDocument();
});

test(`O texto do botão deve corresponder 
ao nome do tipo, ex. Psychic;`, () => {
  const { history } = renderWithRouter(<App />);
  history.push('/');
  const botao = screen.getByRole('button', {
    name: /psychic/i,
  });
  userEvent.click(botao);
  const tipo = screen.getByTestId('pokemon-type', {
    name: botao,
  });
  expect(tipo).toBeInTheDocument();
});

test(`O botão All precisa estar 
sempre visível.`, () => {
  const { history } = renderWithRouter(<App />);
  history.push('/');
  const all = screen.getByRole('button', {
    name: /all/i,
  });
  const botao = screen.getByRole('button', {
    name: /psychic/i,
  });
  userEvent.click(botao);
  expect(all).toBeInTheDocument();
});

test(`Teste se a Pokédex contém um botão para 
resetar o filtro:`, () => {
  const { history } = renderWithRouter(<App />);
  history.push('/');
  const all = screen.getByRole('button', {
    name: /all/i,
  });
  console.log(all);
  expect(all).toHaveTextContent('All');
});

test(`A Pokedéx deverá mostrar os pokémons 
normalmente (sem filtros) quando o botão All for clicado`, () => {
  const { history } = renderWithRouter(<App />);
  history.push('/');
  const botaoAll = screen.getByRole('button', {
    name: /all/i,
  });
  const proximoPokemon = screen.getByRole('button', {
    name: /próximo pokémon/i,
  });
  userEvent.click(botaoAll);
  pokemons.forEach((get, index) => {
    const pokemon = screen.getByText(get.name);
    if (index === 0) { expect(pokemon).toBeInTheDocument(); }
    userEvent.click(proximoPokemon);
    expect(pokemon).toBeInTheDocument();
  });
});

test('Ao carregar a página, o filtro selecionado deverá ser All.', () => {
  const { history } = renderWithRouter(<App />);
  history.push('/');
  const all = screen.getByRole('button', {
    name: /all/i,
  });
  userEvent.click(all);
  expect(all).toBeInTheDocument();
});
