import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../pages/NotFound';

describe('testando NotFound.js', () => {
  it('Teste se a página contém um heading h2', () => {
    renderWithRouter(<NotFound />);
    const h2 = screen.getByRole('heading', {
      level: 2, name: /Page requested not found/i,
    });
    expect(h2).toBeInTheDocument();
  });

  it('Teste se a página mostra a imagem pikachu chorando', () => {
    renderWithRouter(<NotFound />);
    const imgUrl = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const img = screen.getByRole('img', {
      name: /pikachu crying because the page requested was not found/i,
    });
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', imgUrl);
  });
});
