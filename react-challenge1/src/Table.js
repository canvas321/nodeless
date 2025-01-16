import React from 'react';
import Row from './Row';

const Table = ({ items }) => {
  return (
    <table>
        <body>
            {items.map(item => (
                <Row key={item.id} item={item} />
            ))}
        </body>
    </table>
  )
}

export default Table