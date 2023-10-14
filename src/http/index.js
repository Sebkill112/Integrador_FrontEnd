import axios from 'axios'

const Token = require('../http/token')

module.exports = {
    post(body, header) {
        axios.post(body, header, {
            Authorization : `Bearer ${Token.obtenerToken()}`
        })
    },

    put(body, header) {
        axios.put(body, header, {
            Authorization : `Bearer ${Token.obtenerToken()}`
        })

    },
    get(body, header) {
        axios.get(body, header, {
            Authorization : `Bearer ${Token.obtenerToken()}`
        })
    }
}