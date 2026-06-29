module.exports = {
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.jsx?$': 'babel-jest'
    },
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': '<rootDir>/__mocks__/styleMock.js'
    },
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    testPathIgnorePatterns: ['/node_modules/', '/target/'],
    modulePathIgnorePatterns: ['<rootDir>/target/', '<rootDir>/src/main/resources/javascript/apps/'],
    collectCoverageFrom: [
        'src/javascript/**/*.{js,jsx}',
        // Exclude framework bootstrap / registration entrypoints and barrel
        // re-exports: these are @jahia/ui-extender + app-shell wiring with no
        // unit-testable logic (verified by the production build and Cypress).
        '!src/javascript/index.js',
        '!src/javascript/init.js',
        '!src/javascript/JContentSlider.register.jsx',
        '!src/javascript/**/index.js'
    ],
    coverageThreshold: {
        global: {statements: 80, branches: 80, functions: 80, lines: 80}
    },
    coverageReporters: ['lcov', 'text-summary']
};
