import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { SearchPage } from "../../../src/heroes/pages";

// Mock de una librería completa para hacer uso del "useNavigate".
const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUseNavigate
}));

describe('Pruebas en <SearchPage />', () => {

    beforeEach(() => jest.clearAllMocks());

    test('Debe mostrarse correctamente con valores por defecto', () => {

        const { container } = render(
            <MemoryRouter>
                <SearchPage />
            </MemoryRouter>
        );

        expect(container).toMatchSnapshot();

    });

    test('Debe mostrar a Batman y el input con el valor del queryString', () => {

        const { container } = render(
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <SearchPage />
            </MemoryRouter>
        );

        const input = screen.getByRole('textbox');
        expect(input.value).toBe('batman');

        const img = screen.getByRole('img');
        expect(img.src).toContain('dc-batman');

        const alert = screen.getByLabelText('alert-danger');
        expect(alert.style.display).toBe('none');
    });

    test('Debe mostrar un error si no se encuentra el héroe', () => {

        render(
            <MemoryRouter initialEntries={['/search?q=batman123']}>
                <SearchPage />
            </MemoryRouter>
        );


        const alert = screen.getByLabelText('alert-danger');
        expect(alert.style.display).toBe('');
    });

    test('El navigate debe llamar a la pantalla nueva', () => {

        const inputValue = 'superman'

        render(
            <MemoryRouter initialEntries={['/search']}>
                <SearchPage />
            </MemoryRouter>
        );

        // Introducimos valores en el input y disparamos el "onChange={onInputChange}"
        const input = screen.getByRole('textbox');
        fireEvent.change(input, { target: { name: 'searchText', value: inputValue } });

        // Hacemos submit al formulario.
        const form = screen.getByLabelText('form');
        fireEvent.submit(form);

        expect(mockedUseNavigate).toHaveBeenCalledWith(`?q=${inputValue}`);
    });

});