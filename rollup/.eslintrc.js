module.exports = {
    "env": {
        "browser": true,
        "es2020": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:vue/essential"
    ],
    "parserOptions": {
        "ecmaVersion": 10,
        "sourceType": "module"
    },
    "plugins": [
        "vue"
    ],
    "rules": {
        'no-undef': 0,
        "no-func-assign": 0,
    },
    "globals": {
        "require": true,
        "module": true,
        "import": true,
        "define": true,
        "globalThis": true
    }   
};
