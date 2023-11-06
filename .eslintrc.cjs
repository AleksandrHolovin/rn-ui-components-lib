module.exports = {
	root: true,
	env: { browser: true, es2020: true },
	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:@typescript-eslint/recommended',
	],
	ignorePatterns: ['dist', '.eslintrc.cjs'],
	parser: '@typescript-eslint/parser',
	plugins: ['react', '@typescript-eslint', 'prettier'],
	rules: {
		indent: ['error', 'tab', { SwitchCase: 1 }],
		'linebreak-style': 'off',
		'prettier/prettier': [
			'error',
			{
				endOfLine: 'auto',
			},
		],
		quotes: ['error', 'single'],
		semi: ['error', 'always'],
		'react/react-in-jsx-scope': 'off',
		'no-duplicate-imports': ['error'],
		'react/jsx-boolean-value': ['warn', 'always'],
		'react/function-component-definition': [
			'warn',
			{
				namedComponents: 'arrow-function',
			},
		],
		'react/hook-use-state': ['warn'],
		'react/jsx-key': ['error', { warnOnDuplicates: true }],
		'react/jsx-no-leaked-render': [
			'error',
			{ validStrategies: ['ternary', 'coerce'] },
		],
		'react/jsx-no-useless-fragment': ['warn', { allowExpressions: true }],
		'react/no-multi-comp': ['warn', { ignoreStateless: true }],
		'@typescript-eslint/explicit-module-boundary-types': 'warn',
		'@typescript-eslint/no-unused-vars': 'warn',
		'react/prop-types': 'off',
	},
};
