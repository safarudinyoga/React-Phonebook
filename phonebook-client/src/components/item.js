import React from 'react';

function Item(props) {
    return <tr>
        <th scope="row">{props.index}</th>
        <th scope="row" className="text-left">{props.name}</th>
        <th scope="row">{props.phonenumber}</th>
        <td>
            <button type="button" className="btn btn-success mr-2"><i
                className="fas fa-pencil-alt"></i> Edit</button>
            <button type="button" className="btn btn-danger" onClick={props.onDelete}><i className="fas fa-trash"></i> Delete</button>
        </td>
    </tr>
}

export default Item;