import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('testando Pokédex.js', () => {
  it('Teste se a página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);
    const h2 = screen.getByRole('heading', { level: 2, name: /Encountered pokémons/i });
    expect(h2).toBeInTheDocument();
  });

  it('Exibido o próximo pokémon da lista quando botão Próximo pokémon é clicado:', () => {
    renderWithRouter(<App />);
    const btn = screen.getByRole('button', { name: /próximo pokémon/i });
    userEvent.click(btn);
    const proxPkm = screen.getByText(/charmander/i);
    expect(proxPkm).toBeInTheDocument();
  });

  it('Teste se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);
    const buttonsQT = 7;
    const buttons = screen.getAllByTestId('pokemon-type-button');
    expect(buttons.length).toBe(buttonsQT);
    expect(buttons[0]).toHaveTextContent('Electric');
    expect(buttons[1]).toHaveTextContent('Fire');
    expect(buttons[2]).toHaveTextContent('Bug');
    expect(buttons[3]).toHaveTextContent('Poison');
    expect(buttons[4]).toHaveTextContent('Psychic');
    expect(buttons[5]).toHaveTextContent('Normal');
    expect(buttons[6]).toHaveTextContent('Dragon');
    userEvent.click(buttons[0]);
  });

  it('Teste se a Pokédex contém um botão para resetar o filtro:', () => {
    renderWithRouter(<App />);
    const all = screen.getByRole('button', { name: /all/i });
    expect(all).toBeInTheDocument();
    expect(userEvent.click(all));
    expect(all).toHaveTextContent('All');
    userEvent.click(all);
    const pokemon = screen.getByText('Pikachu');
    expect(pokemon).toBeInTheDocument();
  });
});
