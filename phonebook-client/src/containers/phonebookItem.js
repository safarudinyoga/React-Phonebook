import React from 'react';
import Item from './itemActive';
import { connect } from 'react-redux';
import { LoadData } from '../actions';
import PhonebookEditForm from './phonebookEditForm'

class PhonebookItem extends React.Component {
    constructor() {
        super();
        this.state = {
            name: '',
            phonenumber: ''
        }

        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {
        this.props.loadData();
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        let list = this.props.data.map((item, index) => {
            return (
                item.isVisible && (item.onEdit ? <PhonebookEditForm key={index} id={item.id} index={index + 1} name={item.name} status={item.status} phonenumber={item.phonenumber} sent={item.sent}/>:<Item key={index} id={item.id} index={index + 1} name={item.name} status={item.status} phonenumber={item.phonenumber} sent={item.sent}/>)
                )
        })

        return (
            <div>
                <table className="table table-striped">
                    <thead className="thead">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Number</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>{list}</tbody>
                </table>
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
)(PhonebookItem)