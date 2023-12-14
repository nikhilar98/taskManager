import React,{useContext} from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import CreateTaskForm from '../CreateTaskForm';


jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useContext: jest.fn(),
}))

const mockTaskDispatch = jest.fn()
const mockLogTaskAction = jest.fn()

const mockAppContext = {
  taskDispatch: mockTaskDispatch,
  logTaskAction: mockLogTaskAction,
};

describe('CreateTaskForm', () => {

  beforeEach(() => {
    jest.clearAllMocks();
    useContext.mockReturnValue(mockAppContext);
  });

  test('renders form with right labels and button text', () => {
    render(<CreateTaskForm />);
    
    expect(screen.getByLabelText(/Enter title/)).toBeInTheDocument()
    expect(screen.getByLabelText(/Enter description/)).toBeInTheDocument()
    expect(screen.getByLabelText(/To Do/)).toBeInTheDocument()
    expect(screen.getByLabelText(/In progress/)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /create/i })).toBeInTheDocument()

  })


  test('renders legend text', () => {
    render(<CreateTaskForm />)
    expect(screen.getByText(/Create task/i)).toBeInTheDocument()
  })


  test('renders error messages for empty fields', () => {
    render(<CreateTaskForm />)
    
    expect(screen.queryByText(/Title cannot be empty/i)).toBeNull()
    expect(screen.queryByText(/Description cannot be empty/i)).toBeNull()
    expect(screen.queryByText(/Status is required/i)).toBeNull()

    const createButton = screen.getByRole('button', { name: /create/i })
    fireEvent.click(createButton)

    expect(screen.getByText(/Title cannot be empty/i)).toBeInTheDocument()
    expect(screen.getByText(/Description cannot be empty/i)).toBeInTheDocument()
    expect(screen.getByText(/Status is required/i)).toBeInTheDocument()
  })


  test('submits form with valid data', () => {
    render(<CreateTaskForm />);
    const titleInput = screen.getByLabelText(/Enter title/)
    const descriptionInput = screen.getByLabelText(/Enter description/)
    const toDoRadio = screen.getByLabelText(/To Do/)
    const createButton = screen.getByRole('button', { name: /create/i })

    fireEvent.change(titleInput, { target: { value: 'Test Title' } })
    fireEvent.change(descriptionInput, { target: { value: 'Test Description' } })
    fireEvent.click(toDoRadio)
    fireEvent.click(createButton)

    expect(mockTaskDispatch).toHaveBeenCalledTimes(1)
    expect(mockLogTaskAction).toHaveBeenCalledTimes(1)
  })


})
