import '@testing-library/jest-dom';
import { ArtsTable } from '../ArtsTable';
import { act } from 'react';
import { render, screen } from '@testing-library/react';
import { ArtProject } from '../../../types/ArtProject';
import { fireEvent } from '@testing-library/react';

describe('ArtsTable Component', () => {
  const mockProjects: ArtProject[] = [
    {
      's.no': 1,
      'amt.pledged': 1500,
      blurb: 'Test project 1',
      by: 'Test Creator 1',
      country: 'US',
      currency: 'USD',
      'end.time': '2024-12-31T23:59:59-05:00',
      location: 'New York, NY',
      'percentage.funded': 75,
      'num.backers': '100',
      state: 'NY',
      title: 'Test Project 1',
      type: 'Technology',
      url: '/projects/test1',
    },
    {
      's.no': 2,
      'amt.pledged': 2000,
      blurb: 'Test project 2',
      by: 'Test Creator 2',
      country: 'GB',
      currency: 'GBP',
      'end.time': '2024-12-31T23:59:59-05:00',
      location: 'London, UK',
      'percentage.funded': 150,
      'num.backers': '200',
      state: 'LDN',
      title: 'Test Project 2',
      type: 'Games',
      url: '/projects/test2',
    },
  ];

  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockProjects),
      })
    ) as jest.Mock;
  });

  it('should fetch and render projects on mount', async () => {
    await act(async () => {
      render(<ArtsTable />);
    });

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('frontend-assignment.json')
    );
  });

  it('should handle API error correctly', async () => {
    global.fetch = jest.fn(() =>
      Promise.reject(new Error('API Error'))
    ) as jest.Mock;

    await act(async () => {
      render(<ArtsTable />);
    });

    expect(
      await screen.findByText(/Failed to load projects/)
    ).toBeInTheDocument();
  });

  it('should show loading state initially', async () => {
    act(() => {
      render(<ArtsTable />);
    });
    expect(screen.getByText('Loading projects...')).toBeInTheDocument();
  });

  it('should sort projects by serial number', async () => {
    const unsortedProjects = [
      { ...mockProjects[0], 's.no': 2 },
      { ...mockProjects[0], 's.no': 1 },
    ];

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(unsortedProjects),
      })
    ) as jest.Mock;

    await act(async () => {
      render(<ArtsTable />);
    });

    const rows = screen.getAllByRole('row');
    const firstSerialNumber = rows[1]?.firstChild?.textContent;
    expect(firstSerialNumber).toBe('1');
  });

  it('should handle pagination correctly', async () => {
    const manyProjects = Array.from({ length: 7 }, (_, i) => ({
      ...mockProjects[0],
      's.no': i + 1,
    }));

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(manyProjects),
      })
    ) as jest.Mock;

    await act(async () => {
      render(<ArtsTable />);
    });

    // Should show only 5 projects initially (plus header row)
    expect(screen.getAllByRole('row')).toHaveLength(6);

    // Change page
    fireEvent.click(screen.getByTestId('pagination-2'));

    // Should show remaining 2 projects on second page
    expect(screen.getAllByRole('row')).toHaveLength(3);
  });
});
