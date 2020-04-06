module.exports = {
    "roots": [
        "<rootDir>"
    ],
    "transform": {
        "^.+\\.tsx?$": "babel-jest",
        "^.+\\.(css|scss|less)$": "jest-css-modules",
        "^.+\\.svg$": "<rootDir>/svgTransform.js"
    },
    "moduleNameMapper": {
        "^.+\\.(css|scss|less)$": "identity-obj-proxy",
        "^modules(.*)$": "<rootDir>/src/modules$1",
      },
    "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
    "moduleFileExtensions": [
        "ts",
        "tsx",
        "js",
        "jsx",
        "json",
        "node"
    ],
    "coveragePathIgnorePatterns": [
        "__mock__",
        "src/assets",
        "src/config"
    ],
    "globals": {
        "__LOCAL__": false,
        "__APP_ENV__": "test"
    },
    "testEnvironment": "node",

    // Setup Enzyme
    "snapshotSerializers": ["enzyme-to-json/serializer"],
    "setupFiles": ["<rootDir>/setupEnzyme.ts"],
}
