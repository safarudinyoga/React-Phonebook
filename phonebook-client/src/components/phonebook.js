import React from 'react';
// import ChatForm from './chatForm';
import PhonebookItem from './phonebookItem';
import { connect } from 'react-redux'
import { LoadData } from '../actions';

class Phonebook extends React.Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {
        this.props.loadData()
    }

    render() {
        return (
            <div>
                <h1>Todo</h1>
                <PhonebookItem data={this.props.data} />
                {/* <ChatForm /> */}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    data: state.todos
})

const mapDispatchToProps = (dispatch) => ({
    loadData: () => dispatch(LoadData())
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Phonebook)