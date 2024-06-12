const { getJestProjects } = require('@nx/jest');

module.exports = {
    projects: getJestProjects(),
    useESM: true,
    transform: {
        '^.+\\.[tj]s$': 'ts-jest'
    },
    moduleFileExtensions: ['ts', 'js', 'html']
};
