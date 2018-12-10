import React from 'react';
import TableData from 'ps-react/TableData';

/** A table data item with plaintext data */
export default class ExampleWithLink extends React.Component {
    render() {
        return (
            <TableData>
                <a class="orange-link" href="#TableData">Match</a>
            </TableData>
        )
    }
}