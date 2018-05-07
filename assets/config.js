let env = process.env;
let platform = env.platform;

module.exports = {
    node_env : env.NODE_ENV || 'production', // Change production to development to use devTools
    open_devtools: platform === 'darwin' ? 'Command+Shift+I' : 'Ctrl+Shift+I',
    open_files: platform === 'darwin' ? 'Command+O' : 'Ctrl+O',
    reload: platform === 'darwin' ? 'Command+R' : 'Ctrl+R'
}