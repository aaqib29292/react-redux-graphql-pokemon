import React, { useEffect } from 'react';
import s from './Details.module.scss';

import { Container, Dimmer, Loader, Card, Button, Label, Item, Icon } from 'semantic-ui-react';
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { fetchDetails } from '../../actions/index'

const color = ['red','orange', 'yellow', 'olive', 'green', 'teal', 'blue', 'violet', 'purple', 'pink', 'brown', 'grey',]

const EvolutionItem = (props) => {

    let history = useHistory();

    const {data: pokemon} = props

    const handleOnClick = () => {
        history.push(`/pokemon/${pokemon.id}`)
    }
    return (
        <Item as={"a"} onClick={handleOnClick}>
            <Item.Image size='tiny' src={pokemon.image} />
            <Item.Content verticalAlign='middle' header={pokemon.name} meta={pokemon.number} ></Item.Content>
        </Item>
    )
}

const Details = () => {
    let { id } = useParams();
    let history = useHistory();
    const dispatch = useDispatch();
    const { details:  pokemon, isFetching, didInvalidate } = useSelector(state => state.details)

    useEffect(() => {
        dispatch(fetchDetails(id))
    }, [id])

    if (isFetching) {
        return <Dimmer active inverted>
            <Loader size='large' inverted>Loading</Loader>
        </Dimmer>
    }
    if (didInvalidate) {
        history("/error")
    }

    const randomNum = Math.floor(Math.random() * color.length);

    return (
        <div className={s.detailsContainer}>
            <Container>
                <Card fluid color={color[randomNum]} >
                    <Card.Content style={{textAlign: "center"}}>
                        <img className={s.image} src={pokemon.image} alt={pokemon.name} />
                    </Card.Content>
                    <Card.Content>
                        <Card.Header>{pokemon.name}</Card.Header>
                        <Card.Description>
                            <div className={s.typeDescription}>
                                <div >Strength: </div>
                                <div style={{margin: "10px 10px 0"}}>
                                    {
                                        pokemon.types && pokemon.types.map((x, i) => {
                                            return <Label key={i} size="medium">{x}</Label>
                                        })
                                    }
                                </div>
                            </div>
                            <div className={s.typeDescription}>
                                <div>Weakness: </div>
                                <div style={{margin: "10px 10px 0"}}>
                                    {
                                        pokemon.weaknesses && pokemon.weaknesses.map((x, i) => {
                                            return <Label key={i} size="medium">{x}</Label>
                                        })
                                    }
                                </div>
                            </div>
                        </Card.Description>
                    </Card.Content>
                    {
                        pokemon.evolutions &&
                        <Card.Content>
                            <Item.Group divided>
                                {
                                    pokemon.evolutions && pokemon.evolutions.map((x, i) => {
                                        return <EvolutionItem key={i} data={x}/>
                                    })
                                }
                            </Item.Group>
                        </Card.Content>
                    }

                    <Card.Content extra>
                        <Card.Meta>
                            <span className='date'>{pokemon.number}</span>
                        </Card.Meta>
                    </Card.Content>
                </Card>
                <Button fluid onClick={() => history.goBack() || history.push("/") }><Icon name="arrow left" />Back</Button>
            </Container>
        </div>
    )
}

export default Details
