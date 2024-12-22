import '@testing-library/jest-dom';
import { ArtsTable } from '../ArtsTable';
import { act } from 'react';
import { render, screen } from '@testing-library/react';
import { fireEvent } from '@testing-library/react';

describe('ArtsTable Pagination Integration', () => {
  const mockProjects = Array.from({ length: 150 }, (_, index) => ({
    's.no': index + 1,
    'amt.pledged': 1000,
    blurb: `Project ${index + 1}`,
    by: 'Test Creator',
    country: 'US',
    currency: 'USD',
    'end.time': '2024-12-31T23:59:59-05:00',
    location: 'New York, NY',
    'percentage.funded': 100,
    'num.backers': '100',
    state: 'NY',
    title: `Test Project ${index + 1}`,
    type: 'Technology',
    url: `/projects/test${index + 1}`,
  }));

  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockProjects),
      })
    ) as jest.Mock;

    // Mock window.scrollTo
    window.scrollTo = jest.fn();
  });

  it('should update display when changing rows per page', async () => {
    await act(async () => {
      render(<ArtsTable />);
    });

    const rowsSelect = screen.getByRole('combobox');
    fireEvent.change(rowsSelect, { target: { value: '20' } });

    // Should show 20 rows (plus header row)
    expect(screen.getAllByRole('row')).toHaveLength(21);
  });

  it('should reset to first page when changing rows per page', async () => {
    await act(async () => {
      render(<ArtsTable />);
    });

    // Go to second page
    const nextButton = screen.getByLabelText('Next page');
    fireEvent.click(nextButton);

    // Change rows per page
    const rowsSelect = screen.getByRole('combobox');
    fireEvent.change(rowsSelect, { target: { value: '20' } });

    // Should show first 20 items
    const firstItem = screen.getByText('1');
    expect(firstItem).toBeInTheDocument();
  });

  it('should handle direct page input', async () => {
    await act(async () => {
      render(<ArtsTable />);
    });

    const pageInput = screen.getByRole('spinbutton');
    fireEvent.change(pageInput, { target: { value: '2' } });

    // Should show items from second page
    const firstItemOnSecondPage = screen.getByText('50');
    expect(firstItemOnSecondPage).toBeInTheDocument();
  });

  it('should scroll to top when changing pages', async () => {
    const scrollToSpy = jest.spyOn(window, 'scrollTo');

    await act(async () => {
      render(<ArtsTable />);
    });

    const nextButton = screen.getByLabelText('Next page');
    fireEvent.click(nextButton);

    expect(scrollToSpy).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
  });
});
