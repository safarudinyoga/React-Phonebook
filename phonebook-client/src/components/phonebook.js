import React from 'react';
import PhonebookForm from '../containers/phonebookForm';
import PhonebookItem from '../containers/phonebookItem';
import SearchPhonebook from '../containers/searchphonebook';

export default class Phonebook extends React.Component {

    render() {
        return (
            <div className="container">
                <div className="card my-4">
                    <div className="card-header text-center">
                        <h1>Phonebook App</h1>
                    </div>
                </div>
                <PhonebookForm />
                <SearchPhonebook />
                <PhonebookItem data={this.props.data} />
                <div className="card-footer text-center text-muted">
                    <i className="far fa-copyright"></i> Safarudin Alwi Prayogo
                </div>
            </div>
        )
    }
}
