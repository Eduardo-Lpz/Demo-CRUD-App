import DataRepository from './dataRepository'
import DeleteRepository from './deleteRepository'
import CreateRepository from './createRepository'

const repositories = {
    data: DataRepository,
    delete: DeleteRepository,
    create: CreateRepository
}

export const RepositoryFactory = {
    get: name => repositories[name]
}