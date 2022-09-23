import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import About from '../pages/About';

describe('testando About.js', () => {
  it('Teste se a página contém as informações sobre a Pokédex', () => {
    renderWithRouter(<About />);
    const describe = screen.getByText(/this application simulates a pokédex/i);
    const describe2 = screen.getByText(/one can filter pokémons by type/i);
    expect(describe).toBeInTheDocument();
    expect(describe2).toBeInTheDocument();
  });

  it('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);
    const h2 = screen.getByRole('heading', { level: 2, name: /About Pokédex/i });
    expect(h2).toBeInTheDocument();
  });

  it('Teste se a página contém a seguinte imagem de uma Pokédex:', () => {
    renderWithRouter(<About />);
    const imgUrl = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const img = screen.getByRole('img', { name: /pokédex/i });
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', imgUrl);
  });
});
