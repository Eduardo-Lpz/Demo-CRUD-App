import Repository from './Repository'

const resource = '/users?page=2'

export default {
    get() {
        return Repository.get(`${resource}`)
    }
}