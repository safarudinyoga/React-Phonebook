import React from 'react'
import { connect } from 'react-redux';
import { addData } from '../actions';

class PhonebookForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            phonenumber: '',
            added: false
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleButtonAdd = this.handleButtonAdd.bind(this)
        this.handleButtonCancel = this.handleButtonCancel.bind(this)
    }

    handleButtonAdd() {
        this.setState({
            added: true
        })
    }

    handleButtonCancel() {
        this.setState({
            added: false
        })
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.addData(
            this.state.name.trim(),
            this.state.phonenumber.trim()
        )
        this.setState({
            name: '',
            phonenumber: '',
            added: false
        })
    }

    render() {
        if (this.state.added) {
            return (
                <div className="card my-4">
                    <h5 className="card-header">Add New Contact</h5>
                    <div className="card-body">
                        <form className="form-row" onSubmit={this.handleSubmit}>
                            <div className="form-group col-md-4">
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" id="basic-addon1"><i
                                            className="fas fa-user"></i></span>
                                    </div>
                                    <input type="text" className="form-control" value={this.state.name} onChange={this.handleChange} placeholder="Username" aria-describedby="basic-addon1" name="name" required={true} />
                                </div>
                            </div>
                            <div className="form-group col-md-4">
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" id="basic-addon2"><i
                                            className="fas fa-phone"></i></span>
                                    </div>
                                    <input type="number" className="form-control" value={this.state.phonenumber} onChange={this.handleChange} placeholder="Insert Phone Number" aria-describedby="basic-addon2" name="phonenumber" required={true} />
                                </div>
                            </div>
                            <div className="form-group col-md-4">
                                <button type="submit" className="btn btn-success mr-2"><i className="fas fa-check"></i> Save</button>
                                <button type="button" onClick={this.handleButtonCancel} className="btn btn-info"> <i className="fas fa-undo"></i> Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )
        } else {
            return (
                <button type="button" onClick={this.handleButtonAdd} className="btn btn-info my-4 mr-2"><i className="fas fa-plus"></i> Add</button>
            )
        }
    }
}

const mapDispatchToProps = dispatch => ({
    addData: (name, phonenumber) => dispatch(addData(name, phonenumber))
})

export default connect(
    null,
    mapDispatchToProps
)(PhonebookForm)