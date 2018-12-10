import React from 'react';
import PropTypes from 'prop-types';

/** a generic table data cell */
function TableData({children, props}) {
    return (
        <td {...props}>
            {children}
        </td>);
}

TableData.propTypes = {
    /** The component(s) that the data cell contains */
    children: PropTypes.node
};

TableData.defaultProps = {

};

export default TableData