import React from 'react';

function Item(props) {
    return <li>
        <h5>{props.name}</h5>
        <p>{props.phonenumber}/></p>
        <button type="button" onClick={props.removeItem}></button>
    </li>
}

export default Item;