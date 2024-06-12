import { screen } from '@testing-library/react';
import { ErrorDetailContext, useErrorDetail } from './errorContext';

describe('ErrorDetailContext and useErrorDetail', () => {
    function TestComponentUsingContext() {
        const { error, setError } = useContext(ErrorDetailContext);

        return (
            <div>
                <span data-testid='context-error'>{error}</span>
                <button onClick={() => setError('Context Error')}>
                    Set Context Error
                </button>
            </div>
        );
    }

    function TestProvider({ children }) {
        const errorDetail = useErrorDetail();
        return (
            <ErrorDetailContext.Provider value={errorDetail}>
                {children}
            </ErrorDetailContext.Provider>
        );
    }

    test('ErrorDetailContext provides default values and updates state', async () => {
        render(
            <TestProvider>
                <TestComponentUsingContext />
            </TestProvider>
        );

        expect(screen.getByTestId('context-error').textContent).toBe('');

        fireEvent.click(screen.getByText('Set Context Error'));

        await screen.getByText('Set Context Error');

        expect(screen.getByTestId('context-error').textContent).toBe(
            'Context Error'
        );
    });
});
