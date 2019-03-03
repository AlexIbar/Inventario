import {LibDB} from './LibDB.js'
export default {
    install(Vue, options) {
        Vue.prototype.$db = new LibDB(options.name, options.version, options.arreglo)
    }
}