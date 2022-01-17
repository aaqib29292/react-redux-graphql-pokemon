import { execute, makePromise , HttpLink } from 'apollo-boost';

const uri = 'https://graphql-pokemon2.vercel.app';
const link = new HttpLink({ uri });

const request = (query, variables) => {
    const operation = {
        query,
        variables
    };
    return makePromise(execute(link, operation))
}

export default request

