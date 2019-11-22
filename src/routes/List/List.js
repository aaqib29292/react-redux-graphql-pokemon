import React, {useEffect} from 'react';
import s from './List.module.scss';

import { Container, Dimmer, Loader, Card, Label, Button } from 'semantic-ui-react'
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import {fetchData, loadMore, fetchMoreData} from '../../actions/index'


const PokemonCard = (props) => {
    const { pokemon } = props;

    let history = useHistory();

    const handleOnClick = () => {
        history.push(`/pokemon/${pokemon.id}`);
    }

    return (

        <Card link raised onClick={handleOnClick}>
            <Card.Content>
              <img className={s.image} src={pokemon.image} alt={pokemon.name} />
            </Card.Content>
            <Card.Content>
                <Card.Header>{pokemon.name}</Card.Header>
                <Card.Description>
                    <div>{pokemon.classification}</div>
                    <div style={{margin: "10px 0 0"}}>
                        {
                            pokemon.types && pokemon.types.map((x, i) => {
                                return <Label key={i} size="medium">{x}</Label>
                            })
                        }
                    </div>
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Card.Meta>
                    <span className='date'>{pokemon.number}</span>
                </Card.Meta>
            </Card.Content>
        </Card>
    )
}

const List = () => {
    const dispatch = useDispatch();
    let history = useHistory();
    const { data, isFetching, isFetchingMore, didInvalidate } = useSelector(state => state.data)

    useEffect(() => {
        dispatch(fetchData())
    }, [])

    const loadMorePokemons = () => {
        dispatch(loadMore())
        dispatch(fetchMoreData())
    }

    const handleClick = () => loadMorePokemons();

    const handleKeyPress = (e) => {
        
        if (e.charCode === 32 || e.charCode === 13) {
            e.preventDefault();
            loadMorePokemons();
        }
    }

    if (isFetching) {
        return <Dimmer active inverted>
            <Loader size='large' inverted>Loading</Loader>
        </Dimmer>
    }

    if (didInvalidate) {
        history("/error")
    }
    return (
        <div style={{ margin: "20px 0"}}>
            <Container>
                <Card.Group itemsPerRow={4}>
                    {
                        data && data.map((x, i) => {
                            return <PokemonCard key={i} pokemon={x}/>
                        })
                    }
                </Card.Group>
                <div style={{margin: "10px 0"}}>
                    <Button
                        fluid
                        size={"big"}
                        loading={isFetchingMore}
                        content='Click to load more pokemons'
                        onClick={handleClick}
                        onKeyPress={handleKeyPress}
                    />
                </div>

            </Container>
        </div>
    )
}

export default List
