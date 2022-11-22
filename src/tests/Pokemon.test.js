import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('testando o componente Pokemon', () => {
  test('testando se é renderizado o card com as infos do Pokemon', () => {
    renderWithRouter(<App />);

    const pokemonName = screen.getByText(/pikachu/i);
    expect(pokemonName).toBeInTheDocument();
    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType).toBeInTheDocument();
    expect(pokemonType.innerHTML).toBe('Electric');
    const pokemonWeight = screen.getByText(/average weight: 6.0 kg/i);
    expect(pokemonWeight).toBeInTheDocument();
    const pokemonImage = screen.getByRole('img', {
      name: /pikachu/i,
    });
    expect(pokemonImage).toBeInTheDocument();
    expect(pokemonImage).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  test('testando se o card do Pokemon indicado contém um link de navegação para exibir detalhes dele', () => {
    const { history } = renderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', {
      name: /More details/i,
    });
    expect(detailsLink).toBeInTheDocument();
    userEvent.click(detailsLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/pokemon/25');
  });

  test('teste se existe um ícone de estrela nos Pokémon favoritados', () => {
    renderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', {
      name: /More details/i,
    });
    expect(detailsLink).toBeInTheDocument();
    userEvent.click(detailsLink);

    const favoriteCheck = screen.getByText(/Pokémon favoritado?/i);
    userEvent.click(favoriteCheck);
    const favoriteStar = screen.getByRole('img', {
      name: /Pikachu is marked as favorite/i,
    });
    expect(favoriteStar).toBeInTheDocument();
    expect(favoriteStar).toHaveAttribute('src', '/star-icon.svg');
  });
});
