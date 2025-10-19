import type { Config } from 'jest';

const config: Config = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    verbose: true,
    testMatch: [
        '<rootDir>/src/**/*.spec.ts',
        '<rootDir>/src/**/*.test.ts',
        '<rootDir>/tests/**/*.(spec|test).ts'
    ],
    collectCoverage: true,
    collectCoverageFrom: [
        'src/**/*.{ts,tsx}',
        '!src/**/*.spec.ts', 
        '!src/**/*.test.ts',
        '!src/types/**',     
        '!src/config/**',  
        '!src/app.ts',      
    ],
    coverageDirectory: 'coverage', 
    coverageReporters: ['text', 'lcov', 'html'], 
    coverageThreshold: {
        'global': {
            'statements': 79,
            'branches': 70,
            'functions': 75,
            'lines': 80
        }
    },
    modulePathIgnorePatterns: ['<rootDir>/dist/'],
};

export default config;