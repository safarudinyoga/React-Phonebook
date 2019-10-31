import { connect } from 'react-redux';
import { deleteData, resendData } from '../actions';
import Item from '../components/item';

const mapDispatchToProps = (dispatch, ownProps) => ({
    onEdit: () => dispatch(editON(ownProps.id)),
    onDelete: () => dispatch(deleteData(ownProps.id)),
    onResend: () => dispatch(resendData(ownProps.id, ownProps.name, ownProps.phonenumber))
})

export default connect (
    null,
    mapDispatchToProps
)(Item)