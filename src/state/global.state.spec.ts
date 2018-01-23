import SessionState from './session.state';

describe('SessionState', () => {
    let state: SessionState;
    const IDENTIFIER = 'id';

    describe('constructor', () => {
        beforeAll(() => {
            state = new SessionState(IDENTIFIER);
        });

        it('sets the identifier', () =>
            expect(state.identifier).toBe(IDENTIFIER));

        it('creates a new mocks object', () =>
            expect(state.mocks).toEqual({}));

        it('creates a new variables object', () =>
            expect(state.variables).toEqual({}));
    });
});