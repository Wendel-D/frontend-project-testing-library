import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../pages/FavoritePokemons';
import App from '../App';

describe('testando FavoritePokemons.js', () => {
  it('Teste se é exibida na tela a mensagem No favorite pokemon found', () => {
    renderWithRouter(<FavoritePokemons />);
    const p = screen.getByText(/no favorite pokemon/i);
    expect(p).toBeInTheDocument();
  });

  it('Teste se são exibidos todos os cards de pokémons favoritados', () => {
    renderWithRouter(<App />);
    const describe = screen.getByRole('link', { name: /more details/i });
    userEvent.click(describe);
    const favoriteBtn = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    userEvent.click(favoriteBtn);
    const favoritesCards = screen.getByRole('link', { name: /favorite pokémons/i });
    userEvent.click(favoritesCards);
    const nome = screen.getByText(/pikachu/i);
    const tipo = screen.getByText(/electric/i);
    expect(nome).toBeInTheDocument();
    expect(tipo).toBeInTheDocument();
  });
});
