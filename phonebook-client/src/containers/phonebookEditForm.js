import React from 'react';
import { connect } from 'react-redux';
import Item from './itemActive';
import { editData, editOFF } from '../actions';

class PhonebookEditForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: props.name,
            phonenumber: props.phonenumber,
            isValid: true
        }

        this.handleNameChange = this.handleNameChange.bind(this)
        this.handleNumberChange = this.handleNumberChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleNameChange(event) {
        if (event.target.name.length > 0) {
            this.setState({
                name: event.target.value,
                isValid: true
            })
        } else {
            this.setState({
                name: event.target.value,
                isValid: false
            })
        }
    }

    handleNumberChange(event) {
            this.setState({
                phonenumber: event.target.value,
                isValid: true
            })
        // } else {
        //     this.setState({
        //         phonenumber: event.target.value,
        //         isValid: false
        //     })
        // }
    }

    handleSubmit(event){
        event.preventDefault()
        if (this.state.name === this.props.name && this.state.phonenumber === this.props.phonenumber){
            this.props.onCancel()
        } else if (!this.state.isValid) {
            this.props.onCancel()
        } else {
            this.props.onSave(this.state.name, this.state.phonenumber)
        }
    }

    render(){
        return (
            <tr>
                <td scope="row">{this.props.index}</td>
                <td>
                    <form className="form-row" onSubmit={this.handleSubmit}>
                        <div className="col-8">
                            <input type="text" className="form-control" name="name" value={this.state.name} onChange={this.handleNameChange} required={true} />
                        </div>
                    </form>
                </td>
                <td>
                    <form className="form-row" onSubmit={this.handleSubmit}>
                        <div className="col-8">
                            <input type="tel" pattern={"^(08)[0-9]{9,11}$"} className="form-control" name="phonenumber" value={this.state.phonenumber} onChange={this.handleNumberChange} required={true} />
                        </div>
                    </form>
                </td>
                <td>
                    <button type="submit" className="btn btn-success mr-2" onClick={this.handleSubmit}><i className="fas fa-check"></i> Save</button>
                    <button type="button" className="btn btn-danger" onClick={() => this.props.onCancel()}><i className="fas fa-times"></i> Cancel</button>
                </td>
            </tr>
        )
    }

}

const mapDispatchToProps = (dispatch, ownProps) => ({
    onCancel: () => dispatch(editOFF(ownProps.id)),
    onSave: (name,phonenumber) => {
        dispatch(editData(ownProps.id, name, phonenumber))
        dispatch(editOFF(ownProps.id))
    }
})

export default connect(
    null,
    mapDispatchToProps
)(PhonebookEditForm)