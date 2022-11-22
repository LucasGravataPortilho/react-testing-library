import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { FavoritePokemon } from '../pages';

describe('testando o componente FavoritePokemon', () => {
  test('testando se é exibida a mensagem No favorite pokemno found, caso não tenha Pokémon favoritos', () => {
    renderWithRouter(<FavoritePokemon />);

    const favoriteTitle = screen.getByText('No favorite Pokémon found');
    expect(favoriteTitle).toBeInTheDocument();
  });
});
