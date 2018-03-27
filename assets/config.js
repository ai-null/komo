var env = process.env,
      platform = env.platform;

module.exports = {
    node_env : env.NODE_ENV || 'development',
    port: env.PORT || 8000,
    open_devtools: platform === 'darwin' ? 'Command+Shift+I' : 'Ctrl+Shift+I',
    open_files: platform === 'darwin' ? 'Command+Shift+I' : 'Ctrl+Shift+I'
}