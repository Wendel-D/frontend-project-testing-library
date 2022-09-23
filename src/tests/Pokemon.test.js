import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testando Pokemon.js', () => {
  it('Teste se é renderizado um card com as informações de determinado pokémon:', () => {
    renderWithRouter(<App />);
    const name = screen.getByText(/pikachu/i);
    const type = screen.getAllByText(/Electric/i);
    const peso = screen.getByText(/average weight: 6\.0 kg/i);
    const img = screen.getByRole('img', { name: /pikachu sprite/i });
    expect(name).toBeInTheDocument();
    expect(type.length).toBe(2);
    expect(peso).toBeInTheDocument();
    expect(img).toBeInTheDocument();
    expect(img).toHaveProperty('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(img).toHaveProperty('alt', 'Pikachu sprite');
  });

  it('A Pokédex contém um link de navegação para exibir detalhes deste pokémon', () => {
    const { history } = renderWithRouter(<App />);
    const link = screen.getByRole('link', { name: /more details/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveProperty('href', 'http://localhost/pokemons/25');
    userEvent.click(link);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/pokemons/25');
  });

  it('Teste se existe um ícone de estrela nos pokémons favoritados', () => {
    renderWithRouter(<App />);
    const link = screen.getByRole('link', { name: /more details/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveProperty('href', 'http://localhost/pokemons/25');
    userEvent.click(link);
    const favorite = screen.getByRole('checkbox');
    userEvent.click(favorite);
    const img = screen.getByRole('img', { name: /pikachu is marked as favorite/i });
    expect(img).toBeInTheDocument();
    expect(img).toHaveProperty('src', 'http://localhost/star-icon.svg');
    expect(img).toHaveProperty('alt', 'Pikachu is marked as favorite');
  });
});
