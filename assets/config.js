var env = process.env,
    platform = env.platform

module.exports = {
    node_env : env.NODE_ENV || 'development',
    port: env.PORT || 8000
}