describe('canary in the coal mine (should always pass) 🐦️', () => {
    test('this test should always pass no matter what', () => {
        const canary = { alive: true };
        expect(canary.alive).toBe(true);
    });

    test('FUI should resolve expected version', async () => {
        // assert both that the environment is configured for module imports correctly
        // AND that the current version is resolvable
        const { default: VersionInfo } = await import('./VersionInfo.js');
        expect(VersionInfo.toString()).toBe('1.3.3');
    });
});
