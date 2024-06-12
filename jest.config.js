import { getJestProjects } from '@nx/jest';

export const projects = getJestProjects();
export const useESM = true;
export const transform = {
    '^.+\\.[tj]s$': 'ts-jest'
};
export const moduleFileExtensions = ['ts', 'js', 'html'];
export const setupFiles = ['<rootDir>/setupReactTesting.js'];
