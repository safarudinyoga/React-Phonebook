import React from 'react'

class SearchPhonebook extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            findname: '',
            findphonenumber: ''
        }

        this.handleFilterChange = this.handleFilterChange.bind(this)
        // this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleFilterChange (event) {
        this.setState ({
            [event.target.name]: event.target.value
        })
    }

    render () {
        return (
            <div className="card my-4">
                    <h5 className="card-header">Search Contact</h5>
                    <div className="card-body">
                        <form className="form-row">
                            <div className="form-group col-md-4">
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" id="basic-addon2" htmlFor="inlineFormCheck"><i
                                            className="fas fa-user"></i></span>
                                    </div>
                                    <input type="text" id="inlineFormInputName2" className="form-control" placeholder="Username" value={this.state.findname} onChange={this.handleFilterChange} aria-describedby="basic-addon2" name="findname"/>
                                </div>
                            </div>
                            <div className="form-group col-md-4">
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span htmlFor="inlineFormCheck" className="input-group-text" id="basic-addon2"><i
                                            className="fas fa-phone"></i></span>
                                    </div>
                                    <input type="number" id="inlineFormInputName2" className="form-control" placeholder="Insert Phone Number" aria-describedby="basic-addon2" value={this.state.findphonenumber} onChange={this.handleFilterChange} name="findphonenumber"/>
                                </div>
                            </div>
                            <div className="form-group col-md-4">
                                <button type="submit" className="btn btn-success mr-2"><i className="fas fa-check"></i> Save</button>
                                <button type="button" className="btn btn-info"> <i className="fas fa-undo"></i> Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
        )
    }
}

export default SearchPhonebook