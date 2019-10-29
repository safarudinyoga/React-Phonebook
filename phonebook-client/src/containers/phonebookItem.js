import React from 'react';
import Item from './itemActive';
import { connect } from 'react-redux';
import { LoadData } from '../actions';

class PhonebookItem extends React.Component {
    constructor(){
        super();
        this.state = {
            name: '',
            phonenumber: '',
            findname: '',
            findphonenumber: ''
        }

        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {
        this.props.loadData();
    }

    handleChange (event) {
        this.setState ({
            [event.target.name]: event.target.value            
        })
    }

    filter = () => {
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
                                    <input type="text" id="inlineFormInputName2" className="form-control" placeholder="Name" value={this.state.findname} onChange={this.handleChange} aria-describedby="basic-addon2" name="findname"/>
                                </div>
                            </div>
                            <div className="form-group col-md-4">
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span htmlFor="inlineFormCheck" className="input-group-text" id="basic-addon2"><i
                                            className="fas fa-phone"></i></span>
                                    </div>
                                    <input type="number" id="inlineFormInputName2" className="form-control" placeholder="Insert Phone Number" aria-describedby="basic-addon2" value={this.state.findphonenumber} onChange={this.handleChange} name="findphonenumber"/>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
        )
    }

    render() {
        let list = this.props.data.map((item, index) => {
            return (
                <Item key={index} id={item.id} index={index + 1} name={item.name} status={item.status} phonenumber={item.phonenumber} sent={item.sent} />)
        })
        let {data} = this.props
        let {findname, findphonenumber} = this.state
        if( findname && findphonenumber ) {
            const filterItem = (name, phonenumber) => {
                return data.filter(data => {
                    return (
                        data.name.toLowerCase().indexOf(name.toLowerCase()) > -1 && data.phonenumber.indexOf(phonenumber) > -1
                    )
                })
            }
            data = filterItem (findname, findphonenumber)
        }
        if (findname) {
            const filterItem = (name) => {
                return data.filter(data => {
                    return data.name.toLowerCase().indexOf(name.toLowerCase()) > -1
                })
            }
            data = filterItem(findname, findphonenumber)
        }
        if (findphonenumber) {
            const filterItem = (phonenumber) => {
                return data.filter(data => {
                    return data.phonenumber.indexOf(phonenumber) > -1
                })
            }
            data = filterItem(findphonenumber)
        }

        return (
            <div>
            {this.filter()}
            <table className="table table-striped">
                <thead className="thead">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Number</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {list}
                </tbody>
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