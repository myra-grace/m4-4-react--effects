import React from 'react';
import styled from 'styled-components';
import cookieSrc from '../cookie.svg';
import Item from './Item';
import useInterval from '../hooks/use-interval.hook'

//-------------------------------------------------------------

const items = [
  { id: 'cursor', name: 'Cursor', cost: 10, value: 1 },
  { id: 'grandma', name: 'Grandma', cost: 100, value: 10 },
  { id: 'farm', name: 'Farm', cost: 1000, value: 80 },
];

//---------------------- GAME ------------------------

const Game = () => {
  const [perSecond, setPerSecond] = React.useState(0);
  const [numCookies, setNumCookies] = React.useState(0);
  const [purchasedItems, setPurchasedItems] = React.useState({
      cursor: 0,
      grandma: 0,
      farm: 0
  });

  //```````````````````` FUCTIONS ````````````````````

  React.useEffect(() => {
    document.title = `${numCookies} cookies - Cookie Clicker Workshop`;

    return () => {
      document.title = `Cookie Clicker Workshop`;
    };
  }, [numCookies]);

  React.useEffect(() => {
    function spaceHandler(event) {
      if (event.code === 'Space') {
      setNumCookies(numCookies + 1);
      }
    }
    window.addEventListener('keyup', spaceHandler);

    return () => {
      window.removeEventListener('keyup', spaceHandler);
    };
  }, [numCookies]);

  function buyItem(itemName) {
    let itemObj = items.find(item => item.name === itemName)
    if (numCookies < itemObj.cost) {
      console.log('NOT ENOUGHT FUNDS');
    } else {
      console.log('BOUGHT');
      setNumCookies(numCookies - itemObj.cost);
      let theItem = itemObj.id
      
      setPurchasedItems({...purchasedItems, [theItem]: purchasedItems[theItem] +1})
      
      setPerSecond(perSecond + itemObj.value);
    }
  };

  function calculateCookiesPerTick() {
    let result = 0;
    items.forEach((item) => {
      let amount = purchasedItems[item.id];
      let value = item.value;
      result += value * amount
    })
    return result;
  }
  useInterval(() => {
    const numOfGeneratedCookies = calculateCookiesPerTick(purchasedItems);
    setNumCookies(numCookies + numOfGeneratedCookies);
  }, 1000)

  //```````````````````````````````````````````````````

  return (
    <Wrapper>
      <GameArea>
        <Indicator>
          <Total>{numCookies} cookies</Total>
          <strong>{perSecond}</strong> cookies per second
        </Indicator>
        <Button onClick={() => setNumCookies(numCookies + 1)}>
          <Cookie src={cookieSrc} />
        </Button>
      </GameArea>

      <ItemArea>
        <SectionTitle>Items:</SectionTitle>
        <ul>
          {items.map((item, index) => {
            return <Item name={item.name} cost={item.cost} value={item.value} 
            purchasedItems={purchasedItems} purchased={purchasedItems[item.id]}
            buyItem={buyItem} index={index}
            />})}
        </ul>
      </ItemArea>
    </Wrapper>
  );
};

//---------------------- STYLE ----------------------

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
`;
const GameArea = styled.div`
  flex: 1;
  display: grid;
  place-items: center;
`;
const Button = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
`;

const Cookie = styled.img`
  width: 200px;
`;

const ItemArea = styled.div`
  height: 100%;
  padding-right: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const SectionTitle = styled.h3`
  text-align: center;
  font-size: 32px;
  color: yellow;
`;

const Indicator = styled.div`
  position: absolute;
  width: 250px;
  top: 0;
  left: 0;
  right: 0;
  margin: auto;
  text-align: center;
`;

const Total = styled.h3`
  font-size: 28px;
  color: lime;
`;

//------------------- EXPORTS --------------------
export default Game;
