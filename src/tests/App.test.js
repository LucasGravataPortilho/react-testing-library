import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('testando componente App', () => {
  test('testando o topo da aplicação', () => {
    renderWithRouter(<App />);

    const homeTitle = screen.getByRole('link', {
      name: 'Home',
    });
    expect(homeTitle).toBeInTheDocument();

    const aboutTitle = screen.getByRole('link', {
      name: 'About',
    });
    expect(aboutTitle).toBeInTheDocument();

    const favoriteTitle = screen.getByRole('link', {
      name: 'Favorite Pokémon',
    });
    expect(favoriteTitle).toBeInTheDocument();
  });

  test('testando se aplicação redieciona pra página principal', () => {
    const { history } = renderWithRouter(<App />);

    const homeLink = screen.getByRole('link', {
      name: 'Home',
    });
    userEvent.click(homeLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  test('testando se aplicação redieciona pra página About', () => {
    const { history } = renderWithRouter(<App />);

    const aboutLink = screen.getByRole('link', {
      name: 'About',
    });
    userEvent.click(aboutLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  test('testando se aplicação redieciona pra página de Pokemon Favoritados', () => {
    const { history } = renderWithRouter(<App />);

    const favoriteLink = screen.getByRole('link', {
      name: 'Favorite Pokémon',
    });
    userEvent.click(favoriteLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  test('testando se aplicação redieciona pra página NotFound', () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/pagina/qualquer');
    });

    const notFoundTitle = screen.getByRole('heading', {
      name: 'Page requested not found',
    });
    expect(notFoundTitle).toBeInTheDocument();
  });
});
