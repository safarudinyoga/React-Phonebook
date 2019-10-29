import { connect } from 'react-redux';
import { deleteData } from '../actions';
import Item from '../components/item';

const mapDispatchToProps = (dispatch, ownProps) => ({
    onDelete: () => dispatch(deleteData(ownProps.id))
})

export default connect (
    null,
    mapDispatchToProps
)(Item)