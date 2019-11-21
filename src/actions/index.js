import { REQUEST_DATA, RECEIVE_DATA, INCREASE_LIMIT, REQUEST_DETAILS, RECEIVE_DETAILS, FETCHING_MORE, RECEIVED_ERROR} from './../constants/reduxConstants';

import request from './../services/apolloRequest'

import { getDataQuery, getPokemonDetails } from '../graphql_queries';


// data dispatcher

function requestData() {
    return {
        type: REQUEST_DATA,
    }
}

function receiveData(data) {
    return {
        type: RECEIVE_DATA,
        data,
        receivedAt: Date.now()
    }
}

function receiveError() {
    return {
        type: RECEIVED_ERROR,
    }
}


export function fetchData() {
   return function(dispatch, getState) {
        dispatch(requestData())

        return request(getDataQuery, {'first': getState().limit})
            .then(data => {
                const resp = data.data
                dispatch(receiveData(resp.pokemons))
            })
            .catch(error => {
                dispatch(receiveError())
            })

    }
}

// fetching more data

function fetchingMore() {
    return {
        type: FETCHING_MORE,
    }
}


export function fetchMoreData(limit) {
    return function(dispatch, getState) {

        dispatch(fetchingMore())

        return request(getDataQuery, {'first': getState().limit})
                    .then(data => {
                        const resp = data.data
                        dispatch(receiveData(resp.pokemons))
                    })
                    .catch(error => {
                        dispatch(receiveError())
                    })
    }
}

// limit dispatcher

function requestLimitIncrease () {
    return {
            type: INCREASE_LIMIT,
        }
}

export function loadMore() {
    return function(dispatch) {
        dispatch(requestLimitIncrease())
    }
}

// details dispatcher

function requestDetails(details) {
    return {
        type: REQUEST_DETAILS,
        details
    }
}

function receiveDetails(details) {
    return {
        type: RECEIVE_DETAILS,
        details,
        receivedAt: Date.now()
    }
}

export function fetchDetails(id) {
   return function(dispatch) {

        dispatch(requestDetails())

        return request(getPokemonDetails, {'id': id})
            .then(data => {
                const resp = data.data
                dispatch(receiveDetails(resp.pokemon))
            })
            .catch(error => {
                // handle error case
            })

    }
}
