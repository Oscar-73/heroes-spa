import { authReducer, types } from "../../../src/auth";

describe('Pruebas en authReducer', () => {

    test('Debe devolver el estado por defecto', () => {
        const state = authReducer({ logged: false }, {});

        expect(state).toEqual({ logged: false });
    });

    test('Debe llamar al login y establecer el usuario', () => {

        const action = {
            type: types.login,
            payload: {
                id: 'ABC',
                name: 'Óscar Gómez'
            }
        };

        const state = authReducer({ logged: false }, action);

        expect(state).toEqual({
            ...state,
            logged: true,
            user: action.payload
        });
    });

    test('Debe llamar al logout, borrar el usuario y dejar el logged en false', () => {

        const state = {
            logged: true,
            user: { id: 'ABC', name: 'Óscar Gómez' }
        };

        const action = {
            type: types.logout,
        };

        const newState = authReducer(state, action);

        expect(newState).toEqual({ logged: false });
    })

});