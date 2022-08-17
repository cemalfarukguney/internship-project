import React, { useContext, useState } from 'react';
import { Button } from 'react-bootstrap';
import Card from './Card';
import { UserContext } from '../context/UserContext'
import VoteCard from './VoteCard';
import RevealCard from './RevealCard';

function CardGrid(props) {

    const [selectedCard, setSelectedCard] = useState(-1);
    const [div1Visibility, setDiv1Visibility] = useState(true);
    const [{ username, setUsername }] = useContext(UserContext);
    var numbers = [0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, "?"];
    var cards = numbers.map((data) => <Card number={data} selectCard={setSelectedCard} selectedNo={selectedCard} />);
    var total=0;
    var userNumber=0;

    var datas = [{
        "name": "kutluhan",
        "vote": -1,
    },
    {
        "name": "maruf",
        "vote": 3,
    },
    {
        "name": "ahmet",
        "vote": 5,
    },
    {
        "name": "cemal",
        "vote": -1,
    },
    {
        "name": "kemal",
        "vote": 89,
    },
    {
        "name": "ufkun",
        "vote": 3,
    },
    ];

    var uservotes = [...datas, { "name": username, "vote": selectedCard }];

    // [
    //     <VoteCard username={username} selectCard={setSelectedCard} selectedNo={selectedCard} />,
    //     <VoteCard username={'kutluhan'} selectCard={setSelectedCard} selectedNo={-1} />,
    //     <VoteCard username={'maruf'} selectCard={setSelectedCard} selectedNo={3} />,
    //     <VoteCard username={'ahmet'} selectCard={setSelectedCard} selectedNo={5} />,
    //     <VoteCard username={'cemal'} selectCard={setSelectedCard} selectedNo={-1} />,
    //     <VoteCard username={'kemal'} selectCard={setSelectedCard} selectedNo={89} />,
    //     <VoteCard username={'ufkun'} selectCard={setSelectedCard} selectedNo={3} />
    // ];

    return (
        <div className='cardgrid--wrapper'>
            {div1Visibility ?(
                <div id='div1'>
                    <div className='cardgrid--div'>
                        {uservotes.map((data) => <VoteCard username={data.name} selectedNo={data.vote} />)}
                    </div>
                    <h3 className='cardgrid--h3'>
                        Dear {username},
                    </h3>
                    <div>
                        <h3 className='cardgrid--h3'>
                            Please choose your cards!
                        </h3>
                    </div>
                    <div className='cardgrid--div'>
                        {cards}
                    </div>
                    <div className='reveal-button--div'>
                        {(selectedCard !== -1) && <Button variant='primary' onClick={() => {
                            setDiv1Visibility(false);
                        }}>Reveal Cards</Button>}
                    </div>
                </div>)
                : (<div>
                    <div className='cardgrid--div'>
                    {uservotes.map((data) => {
                     (data.vote!==-1 && data.vote !=="?") ? total=total+data.vote : total=total;
                     (data.vote!==-1 && data.vote !=="?") ? userNumber++ : userNumber=userNumber; 
            })}
                     {uservotes.map((data) => <RevealCard username={data.name} selectedNo={data.vote}/>)}
                    </div>
                    <div className='cardgrid--div'>
                        <h3 className='average--h3'>
                            average storypoint = {total/userNumber}
                        </h3>
                    </div>
                </div>
                )
            }
            

        </div>
    );
}
export default CardGrid;