import React from 'react';
import PropTypes from 'prop-types';

//TVP table will interface with action bar molecule on select,

//API for component (the props passed in):
//rowData - [rowData1, rowData2, ... ]
//headerData - [{headerTitle: "Video Title", isSortable: false}, ... ]

//JSON data for table
//data object which mirrors the object for the structure

//Component Behaviors:
// on row item select
// select item enabled
// select all enabled (only works if select item enabled)

/** tvpage table component used for applications */
function Table(headerData, rowData, onSelectAll, onDeselectAll, ...props) {
    return <table></table>
}

Table.propTypes = {

};

Table.defaultProps = {

};

export default Table