import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import { act } from 'react-dom/test-utils';
import renderWithRouter from '../renderWithRouter';
import { About } from '../pages';

describe('testando o componente About', () => {
  test('testando se a página contém infos sobre a Pokedéx', () => {
    renderWithRouter(<About />);

    const aboutDescription = screen.getByText('This application simulates a Pokédex, a digital encyclopedia containing all Pokémon');
    expect(aboutDescription).toBeInTheDocument();
  });

  test('testando se a página contém heading h2 com About Pokédex', () => {
    renderWithRouter(<About />);

    const aboutText = screen.getByRole('heading', {
      name: 'About Pokédex',
    });
    expect(aboutText).toBeInTheDocument();
  });

  test('testando se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);

    const aboutParagraph1 = screen.getByText('This application simulates a Pokédex, a digital encyclopedia containing all Pokémon');
    expect(aboutParagraph1).toBeInTheDocument();

    const aboutParagraph2 = screen.getByText('One can filter Pokémon by type, and see more details for each one of them');
    expect(aboutParagraph2).toBeInTheDocument();
  });

  test('testando se a página contém imagem de uma Pokédex', () => {
    renderWithRouter(<About />);

    const aboutImage = screen.getByRole('img', {
      name: 'Pokédex',
    });
    expect(aboutImage).toBeInTheDocument();
    expect(aboutImage).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
