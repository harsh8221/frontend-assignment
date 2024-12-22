import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { fireEvent } from '@testing-library/react';
import { Pagination } from '../Pagination';

describe('Pagination Component', () => {
  const defaultProps = {
    currentPage: 1,
    totalPages: 10,
    onPageChange: jest.fn(),
    rowsPerPage: 50,
    onRowsPerPageChange: jest.fn(),
    totalItems: 500,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rows Per Page Selector', () => {
    it('should render rows per page selector with correct options', () => {
      render(<Pagination {...defaultProps} />);

      const selector = screen.getByRole('combobox');
      expect(selector).toBeInTheDocument();

      const options = screen.getAllByRole('option');
      expect(options).toHaveLength(5); // [5, 10, 20, 50, 100]
      expect(options[0]).toHaveValue('5');
      expect(options[1]).toHaveValue('10');
      expect(options[2]).toHaveValue('20');
      expect(options[3]).toHaveValue('50');
      expect(options[4]).toHaveValue('100');
    });

    it('should call onRowsPerPageChange when selecting a new value', () => {
      render(<Pagination {...defaultProps} />);

      const selector = screen.getByRole('combobox');
      fireEvent.change(selector, { target: { value: '20' } });

      expect(defaultProps.onRowsPerPageChange).toHaveBeenCalledWith(20);
    });
  });

  describe('Page Range Display', () => {
    it('should display correct range for first page', () => {
      render(<Pagination {...defaultProps} />);
      expect(screen.getByText('1-50 of 500 rows')).toBeInTheDocument();
    });

    it('should display correct range for middle page', () => {
      render(<Pagination {...defaultProps} currentPage={5} />);
      expect(screen.getByText('201-250 of 500 rows')).toBeInTheDocument();
    });

    it('should display correct range for last incomplete page', () => {
      render(
        <Pagination {...defaultProps} totalItems={480} currentPage={10} />
      );
      expect(screen.getByText('451-480 of 480 rows')).toBeInTheDocument();
    });
  });

  describe('Navigation Controls', () => {
    it('should disable first and previous buttons on first page', () => {
      render(<Pagination {...defaultProps} currentPage={1} />);

      expect(screen.getByLabelText('First page')).toBeDisabled();
      expect(screen.getByLabelText('Previous page')).toBeDisabled();
      expect(screen.getByLabelText('Next page')).not.toBeDisabled();
      expect(screen.getByLabelText('Last page')).not.toBeDisabled();
    });

    it('should disable next and last buttons on last page', () => {
      render(<Pagination {...defaultProps} currentPage={10} />);

      expect(screen.getByLabelText('First page')).not.toBeDisabled();
      expect(screen.getByLabelText('Previous page')).not.toBeDisabled();
      expect(screen.getByLabelText('Next page')).toBeDisabled();
      expect(screen.getByLabelText('Last page')).toBeDisabled();
    });

    it('should navigate to first page when clicking first page button', () => {
      render(<Pagination {...defaultProps} currentPage={5} />);

      fireEvent.click(screen.getByLabelText('First page'));
      expect(defaultProps.onPageChange).toHaveBeenCalledWith(1);
    });

    it('should navigate to last page when clicking last page button', () => {
      render(<Pagination {...defaultProps} currentPage={5} />);

      fireEvent.click(screen.getByLabelText('Last page'));
      expect(defaultProps.onPageChange).toHaveBeenCalledWith(10);
    });
  });

  describe('Page Input', () => {
    it('should render current page in input field', () => {
      render(<Pagination {...defaultProps} currentPage={5} />);

      const input = screen.getByRole('spinbutton');
      expect(input).toHaveValue(5);
    });

    it('should update page when entering valid page number', () => {
      render(<Pagination {...defaultProps} />);

      const input = screen.getByRole('spinbutton');
      fireEvent.change(input, { target: { value: '7' } });

      expect(defaultProps.onPageChange).toHaveBeenCalledWith(7);
    });

    it('should not update page when entering invalid page number', () => {
      render(<Pagination {...defaultProps} />);

      const input = screen.getByRole('spinbutton');
      fireEvent.change(input, { target: { value: '15' } }); // Greater than totalPages

      expect(defaultProps.onPageChange).not.toHaveBeenCalled();
    });

    it('should display total pages correctly', () => {
      render(<Pagination {...defaultProps} />);
      expect(screen.getByText('of 10')).toBeInTheDocument();
    });
  });
});

