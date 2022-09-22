import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

test('testando App.js', () => {
    it('Teste se o topo da aplicação contém um conjunto fixo de links de navegação:', () => {
        renderWithRouter(<App />);
        expect(screen.getByRole('link', { name: /Home/i }));
        expect(screen.getByRole('link', { name: /About/i }));
        expect(screen.getByRole('link', { name: /Favorite Pokémons/i }));
    });

    it('Teste se a aplicação é redirecionada para a página inicial', () => {
        const { history } = renderWithRouter(<App />);
        const goHome = screen.getByRole('Link', { name: /home/i });
        userEvent.click(goHome);
        const { location: { pathname } } = history;
        expect(pathname).toBe('/');
    });

    it('Teste se a aplicação é redirecionada para a página de About', () => {
        const { history } = renderWithRouter(<App />);
        const goAbout = screen.getByRole('link', { name: /About/i });
        userEvent.click(goAbout);
        const { location: { pathname } } = history;
        expect(pathname).toBe('/about');
    });

    it('Teste se a aplicação é redirecionada para a página de Pokémons Favoritados', () => {
        const { history } = renderWithRouter(<App />);
        const goFav = screen.getByRole('link', { name: /Favorite Pokémons/i });
        userEvent.click(goFav);
        const { location: { pathname } } = history;
        expect(pathname).toBe('/favorites');
    });

    it('Teste se a aplicação é redirecionada para a página Not Found', () => {
        const { history } = renderWithRouter(<App />);
        act(() => history.push('/ablube'));
        const { location: { pathname } } = history;
        const notFoundImg = 'Pikachu crying because the page requested was not found';
        const notFound = 'Page requested not found';
        expect(pathname).toBe('/ablube');
        expect(screen.getByRole('heading', { name: `${notFound}`})).toBeInTheDocument();
        expect(screen.getByRole('img', { alt: `${notFoundImg}`})).toBeInTheDocument();
    });
});
