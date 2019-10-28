import React from 'react';
import Item from './item';

function PhonebookItem(props) {
    const list = props.data.map((item, index) =>
        <Item key={index} id={item.id} name={item.name} status={item.status} phonenumber={item.phonenumber} sent={item.sent} removeItem={() => props.deleteTodo(item.id)} />
        )//{...item} buat mecah item langsung

    return (
        <div>
            {list}
        </div>
    )
}

export default PhonebookItem;