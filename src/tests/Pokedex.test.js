import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('testando o componente Pokedex', () => {
  test('testando se a página contém um heading h2 com texto Encountered Pokémon', () => {
    renderWithRouter(<App />);

    const pokedexTitle = screen.getByRole('heading', {
      name: 'Encountered Pokémon',
      level: 2,
    });
    expect(pokedexTitle).toBeInTheDocument();
  });

  test('testando se é exibido o próximo Pokemon quando o botão Próximo Pokemon é clicado', () => {
    renderWithRouter(<App />);

    const pokedexButton = screen.getByRole('button', {
      name: 'Próximo Pokémon',
    });
    expect(pokedexButton).toBeInTheDocument();

    userEvent.click(pokedexButton);
    const nextPokemon = screen.getByText(/charmander/i);
    expect(nextPokemon).toBeInTheDocument();

    userEvent.click(pokedexButton);
    userEvent.click(pokedexButton);
    userEvent.click(pokedexButton);
    userEvent.click(pokedexButton);
    userEvent.click(pokedexButton);
    userEvent.click(pokedexButton);
    userEvent.click(pokedexButton);
    userEvent.click(pokedexButton);
    const firstPokemon = screen.getByText(/pikachu/i);
    expect(firstPokemon).toBeInTheDocument();
  });

  test('testando se a Pokedex contem os botões de filtro', () => {
    renderWithRouter(<App />);
    const limite = 7;

    const pokedexButtons = screen.getAllByTestId('pokemon-type-button');
    expect(pokedexButtons).toHaveLength(limite);
  });

  test('testando se a Pokedex contem o botao all', () => {
    renderWithRouter(<App />);

    const pokedexButtonAll = screen.getByRole('button', {
      name: /All/i,
    });
    expect(pokedexButtonAll).toBeInTheDocument();
    userEvent.click(pokedexButtonAll);
    const firstPokemon = screen.getByText(/pikachu/i);
    expect(firstPokemon).toBeInTheDocument();
  });

  test('testando se o botão de filtro corresponde', () => {
    renderWithRouter(<App />);

    const bugButton = screen.getByRole('button', {
      name: 'Bug',
    });
    expect(bugButton).toBeInTheDocument();
  });
});
