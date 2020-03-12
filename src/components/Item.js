import React, {useRef} from 'react';
import styled from 'styled-components';

function Item(props) {
    const firstProductRef = useRef(null);
    
    React.useEffect(() => {
        if (props.index === 0) {
            console.log('firstProductRef: ', firstProductRef);
            firstProductRef.current.focus();
        }
    }, []);

    return (
        <Products onClick={() => props.buyItem(props.name)}>
            <MyButton ref={firstProductRef}>
            <h4>{props.name}</h4>
            <MyDiv>
              <PTag>Cost: {props.cost} cookies Produces: {props.value} cookies/second.</PTag>
              <Purchased>{props.purchased}</Purchased>
            </MyDiv>
            </MyButton>
        </Products>
    )
};

const Products = styled.li`
  text-align: left;
  padding: 5px;
  border-bottom: 1px solid grey;

  &:hover {
    cursor: pointer;
}
`
const MyDiv = styled.div`
  display: flex;
  text-align: left;
}
`
const PTag = styled.p`
  margin-right: 15px;
}
`
const Purchased = styled.h4`
  font-size: 20px;
  position: absolute;
  right: 15px;
}
`
const MyButton = styled.button`
  color: white;
  background-color: transparent;
  border: none;
  text-align: left;
}
`

export default Item;
