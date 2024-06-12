import { screen } from '@testing-library/react';

describe('canary in the coal mine (should always pass) 🐦️', () => {
    test('this test should always pass no matter what', () => {
        const canary = { alive: true };
        expect(canary.alive).toBe(true);
    });

    test('FUI should resolve expected version', async () => {
        // assert both that the environment is configured for module imports correctly
        // AND that the current version is resolvable
        const { default: VersionInfo } = await import('./VersionInfo');
        expect(VersionInfo.toString()).toBe('1.6.0');
    });

    describe('can test a simple dummy React component', () => {
        function TestComponent({ greeter }) {
            const [_greeter, setGreeter] = useState('');
            const [disabled, setDisabled] = useState('');

            const onClick = () => {
                setGreeter(greeter);
                setDisabled(true);
            };

            return (
                <>
                    <h1 role='heading'>{_greeter}</h1>
                    <button disabled={disabled} onClick={onClick}>
                        Load Greeting
                    </button>
                </>
            );
        }

        test('loads and displays greeting', async () => {
            // Arrange
            render(<TestComponent greeter='hello there' />);

            // ACt
            await userEvent.click(screen.getByText('Load Greeting'));
            await screen.findByRole('heading');

            // Assert
            expect(screen.getByRole('heading')).toHaveTextContent(
                'hello there'
            );
            expect(screen.getByRole('button')).toBeDisabled();
        });
    });
});
