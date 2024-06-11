describe('canary in the coal mine (should always pass)', () => {
    test('this test should always pass no matter what', () => {
        const canary = { alive: true };
        expect(canary.alive).toBe(true);
    });
});
