import { execute, makePromise , HttpLink } from 'apollo-boost';

const uri = 'https://graphql-pokemon.now.sh/graphql';
const link = new HttpLink({ uri });

const request = async (query, variables) => {
    const operation = {
        query,
        variables
    };
    return await makePromise(execute(link, operation))
}

export default request
