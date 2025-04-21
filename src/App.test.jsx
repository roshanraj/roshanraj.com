import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

describe('App Component', () => {
  test('renders navbar', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    const navElement = screen.getByRole('navigation');
    expect(navElement).toBeInTheDocument();
  });

  test('renders home page by default', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    const homeElement = screen.getByTestId('home-page');
    expect(homeElement).toBeInTheDocument();
  });

  test('renders works page on /works route', () => {
    render(
      <MemoryRouter initialEntries={['/works']}>
        <App />
      </MemoryRouter>
    );
    const worksElement = screen.getByTestId('works-page');
    expect(worksElement).toBeInTheDocument();
  });

  test('renders contact page on /contact route', () => {
    render(
      <MemoryRouter initialEntries={['/contact']}>
        <App />
      </MemoryRouter>
    );
    const contactElement = screen.getByTestId('contact-page');
    expect(contactElement).toBeInTheDocument();
  });

  test('container has correct className', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    const containerElement = screen.getByClassName('container-fluid mt-4');
    expect(containerElement).toBeInTheDocument();
  });
});
