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
    collectCoverageFrom: ['src/javascript/**/*.{js,jsx}'],
    coverageReporters: ['lcov', 'text-summary']
};
