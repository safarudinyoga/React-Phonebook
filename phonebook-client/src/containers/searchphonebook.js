import React from 'react'
import { connect } from 'react-redux';
import { searchData, searchDataReset } from '../actions'

class SearchPhonebook extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: '',
            search: false
        }

        this.handleFilterChange = this.handleFilterChange.bind(this)
        this.handleReset = this.handleReset.bind(this)
        this.handleButtonSearch = this.handleButtonSearch.bind(this)
        this.handleButtonCancel = this.handleButtonCancel.bind(this)
    }

    handleButtonSearch() {
        this.setState({
            search: true
        })
    }

    handleButtonCancel() {
        this.setState({
            search: false
        })
    }

    handleFilterChange (event) {
        let value = event.target.value
        this.setState ({
            value: event.target.value
        })
        this.props.searchData(value)
    }

    handleReset (event) {
        event.preventDefault();
        this.setState ({ 
            value: ''
        })
        this.props.searchDataReset()
    }

    render () {
        if (this.state.search) {
        return (
            <div className="card my-4">
                    <h5 className="card-header">Search Contact</h5>
                    <div className="card-body">
                        <form className="form-row">
                            <div className="form-group col-md-4">
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" id="basic-addon2" htmlFor="inlineFormInputGroup"><i
                                            className="fas fa-user"></i></span>
                                    </div>
                                    <input type="text" id="inlineFormInputGroup" className="form-control" placeholder="Name / Phone Number" value={this.state.value} onChange={this.handleFilterChange}/>
                                </div>
                            </div>
                            <div className="form-group mr-2">
                                <button type="button"  onClick={this.handleReset} className="btn btn-info"><i className="fas fa-undo"></i> Reset</button>
                            </div>
                            <div className="form-group">
                            <button type="button" onClick={this.handleButtonCancel} className="btn btn-danger"><i className="fas fa-times"></i> Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
        )
    } else {
        return (
            <button type="button" onClick={this.handleButtonSearch} className="btn btn-outline-info my-4 mr-2"><i className="fas fa-search"></i> Search</button>
        )
    }
}
}

const mapDispatchToProps = (dispatch) => ({
    searchData: (value) => { dispatch(searchData(value)) },
    searchDataReset: () => { dispatch(searchDataReset()) }
})

export default connect (
    null,
    mapDispatchToProps
)(SearchPhonebook)