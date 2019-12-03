import Repository from './Repository'

const resource = '/api/users'

export default {
    async post(payload) {
        const response = await Repository.post(`${resource}`, payload)
        return response.status === 201 ? true : false
    },
}