import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { NotFound } from '../pages';

describe('testando o componente NotFound', () => {
  test('testando se a página tem um heading h2 com o texto', () => {
    renderWithRouter(<NotFound />);

    const notFoundTitle = screen.getByRole('heading', {
      name: 'Page requested not found',
    });
    expect(notFoundTitle).toBeInTheDocument();
  });

  test('testando se a página tem uma imagem', () => {
    renderWithRouter(<NotFound />);

    const notFoundImage = screen.getByRole('img', {
      name: /pikachu/i,
    });
    expect(notFoundImage).toBeInTheDocument();
    expect(notFoundImage).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
