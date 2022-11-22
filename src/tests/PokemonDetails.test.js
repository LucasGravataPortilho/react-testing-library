// finalizando
import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('testando o componente PokemonDetails', () => {
  test('testando informações detalhadas do Pokemon selecionado são mostradas na tela', () => {
    renderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', {
      name: /More details/i,
    });
    expect(detailsLink).toBeInTheDocument();
    userEvent.click(detailsLink);

    const pokemonDetails = screen.getByRole('heading', {
      name: /Pikachu details/i,
    });
    expect(pokemonDetails).toBeInTheDocument();
    expect(detailsLink).not.toBeInTheDocument();

    const pokemonSummary = screen.getByRole('heading', {
      name: /Summary/i,
    });
    expect(pokemonSummary).toBeInTheDocument();

    const summaryText = screen.getByText('This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat.');
    expect(summaryText).toBeInTheDocument();
  });

  test('testando se existe na página uma seção com os mapas contendo as localizações do Pokémon', () => {
    renderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', {
      name: /More details/i,
    });
    expect(detailsLink).toBeInTheDocument();
    userEvent.click(detailsLink);

    const gameLocations = screen.getByRole('heading', {
      name: /Game Locations of Pikachu/i,
    });
    expect(gameLocations).toBeInTheDocument();

    const mapName = screen.getByText(/kanto viridian forest/i);
    expect(mapName).toBeInTheDocument();

    const mapImage = screen.getAllByRole('img', {
      name: /pikachu location/i,
    });
    expect(mapImage).toHaveLength(2);

    const filteredSrc = mapImage.map((x) => x.src);
    expect(filteredSrc).toEqual(['https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png']);
  });

  test('testando se o usuário pode favoritar um Pokémon através da página de detalhes', () => {
    renderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', {
      name: /More details/i,
    });
    expect(detailsLink).toBeInTheDocument();
    userEvent.click(detailsLink);

    const favoriteCheck = screen.getByText(/Pokémon favoritado?/i);
    expect(favoriteCheck).toBeInTheDocument();
  });

  test('testando se cliques alternados no checkbox adicionam e removem da lista de favoritos', () => {
    renderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', {
      name: /More details/i,
    });
    expect(detailsLink).toBeInTheDocument();
    userEvent.click(detailsLink);

    const favoriteCheck = screen.getByText(/Pokémon favoritado?/i);
    expect(favoriteCheck).toBeInTheDocument();
    userEvent.click(favoriteCheck);

    const favoriteStar = screen.getByRole('img', {
      name: /pikachu is marked as favorite/i,
    });
    expect(favoriteStar).toBeInTheDocument();
    userEvent.click(favoriteCheck);
    expect(favoriteStar).not.toBeInTheDocument();
  });
});
