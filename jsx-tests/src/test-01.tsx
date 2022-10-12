/**
 * In the following React template, display an unordered list (UL) with list items (LI) within it. 
 * The content of each list item should contain two spans (SPAN), one with the name and the other with the age passed in to the DataList function. 
 * The span elements should be separated by a single space.
 */

import React, { useState } from 'react';
import ReactDOM from 'react-dom';



function DataList(props) {
  const data = props.data;
  const listItems = data.map((item: { name: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; age: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; }, index: React.Key | null | undefined) =>
    <li key={index}><span>{item.name}</span> <span>{item.age}</span></li>
  );
  return (
    <>
      <h2>code goes here</h2>
      <ul>
        {listItems}
      </ul>
    </>
  );
}

const data = [
  { name: 'Daniel', age: 25 },
  { name: 'John', age: 24 },
  { name: 'Jen', age: 31 },
];

ReactDOM.render(
  <DataList data={data} />,
  document.getElementById('test-01')
);