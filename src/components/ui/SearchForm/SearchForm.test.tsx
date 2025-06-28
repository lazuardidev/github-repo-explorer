import '@testing-library/jest-dom';
import { describe, it, expect, afterEach, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchForm from './SearchForm';

describe('SearchForm component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should render input and button', () => {
    render(<SearchForm onSearch={() => {}} />);

    expect(screen.getByPlaceholderText('Enter username')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('should show error when input is empty and form is submitted', async () => {
    render(<SearchForm onSearch={() => {}} />);
    const button = screen.getByRole('button', { name: /search/i });

    await userEvent.click(button);

    expect(
      await screen.findByText('Please enter a username.')
    ).toBeInTheDocument();
  });

  it('should call onSearch with input value when submitted', async () => {
    const mockOnSearch = vi.fn();
    render(<SearchForm onSearch={mockOnSearch} />);
    const input = screen.getByPlaceholderText('Enter username');
    const button = screen.getByRole('button', { name: /search/i });

    await userEvent.type(input, 'tester');
    await userEvent.click(button);

    expect(mockOnSearch).toHaveBeenCalledWith('tester');
    expect(mockOnSearch).toHaveBeenCalledTimes(1);
  });

  it('should clear error after user types again', async () => {
    render(<SearchForm onSearch={() => {}} />);
    const input = screen.getByPlaceholderText('Enter username');
    const button = screen.getByRole('button', { name: /search/i });

    await userEvent.click(button);
    expect(screen.getByText('Please enter a username.')).toBeInTheDocument();

    await userEvent.type(input, 'a');
    expect(
      screen.queryByText('Please enter a username.')
    ).not.toBeInTheDocument();
  });
});
