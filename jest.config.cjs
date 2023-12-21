module.exports = {
    testEnvironment: "jest-environment-jsdom",
    //   setupFiles: ["./jest.setup.js"],

    // Movida para el query-string con el Jest
    transformIgnorePatterns: [
        "node_modules/(?!(query-string|decode-uri-component|split-on-first|filter-obj)/)",
    ],
};