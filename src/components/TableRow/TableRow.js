import React from 'react';
import PropTypes from 'prop-types';

/** an opinionated tr */


//Interface needs:
//JSON Object of cell data
//What table data properties should be controlled? ....


//RegistrationForm array to try out in the example. Need to make the sub components for:
//      photoThumb (title optional),
//      StatusIcon - Make sure this covers all icons
//      ContextMenu (Molecule - Menu, Arrowtoggle which is an - ArrowIconDown, ArrowIconUp) --- just do a quick rough draft to build out later, to cover all context menus
//      Checkbox (Part of the forms group)

var cellData =
    [
        "<Checkbox></Checkbox>",
        "<PhotoThumb " +
        "   src='someimgpath' " +
        "   imgStyleClasses=''" +
        "   titleStyleClasses='' " +
        "   containerStyleClasses='' " +
        "   title='title of the photo'></PhotoThumb>",
        "<a href=\"RowData\">Match</a>",
        "25 minutes ago",
        "Remington Guliana",
        "<StatusIcon color='green'/>"
    ];

function TableRow({rowData, ...props}) {
    //Loop yho
    return (<tr>

    </tr>)
}


TableRow.propTypes = {

};

TableRow.defaultProps = {

};

export default TableRow