import '@testing-library/jest-dom';

import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import ErrorPage from './ErrorPage';

describe('ErrorPage component', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders 404 text and page not found message', () => {
    render(<ErrorPage />);

    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('Page Not Found')).toBeInTheDocument();
    expect(
      screen.getByText(/Sorry, the page you are looking for/i)
    ).toBeInTheDocument();
  });

  it('renders "Go Home" link pointing to "/"', () => {
    render(<ErrorPage />);

    const link = screen.getByRole('link', { name: /Go Home/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/');
  });
});
