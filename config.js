const httpPort = process.env.PORT || 80,
    httpsPort = 443

export default {
    entryPoint: '/graphql',
    baseUrl: '',
    baseUrlServer: 'http://localhost:' + httpPort,
    feedbackUrl: '/feedback',
    port: {
        http: httpPort,
        https: httpsPort
    },
    path: {
        template: '../client/index.template.html'
    },
    ssl: {
        private: '/etc/crypto/private.key',
        certificate: '/etc/crypto/certificate.crt',
        ca: '/etc/crypto/ca_bundle.crt'
    }
}