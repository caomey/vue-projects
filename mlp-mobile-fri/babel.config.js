const transformRemoveConsolePlugin = []
if (process.env.NODE_ENV === 'production') {
    transformRemoveConsolePlugin.push("transform-remove-console")
}
module.exports = {
    presets: ['@vue/cli-plugin-babel/preset'],
    plugins: [
        [
            'import',
            {
                libraryName: 'vant',
                libraryDirectory: 'es',
                style: (name) => `${name}/style/less`,
            },
            'vant',
        ],
        ...transformRemoveConsolePlugin
    ],
};