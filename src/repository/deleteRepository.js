import Repository from './Repository'

const resource = '/api/users/2'

export default {
    async delete(payload) {
        const response = await Repository.delete(`${resource}`, payload)
        return response.status === 204 ? true : false
    },
    // delete(payload) { //same
    //     return Repository.delete(`${resource}`, payload).then(response => response.status === 204 ? true : false)
    // }
}