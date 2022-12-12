import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import React from 'react';

import 'bootstrap/dist/css/bootstrap.css';

export function Paginations(currentPage) {
  return (
    <div className="d-flex justify-content-evenly mb-5">
    
    <ButtonToolbar aria-label="Toolbar with button groups">
      <ButtonGroup className="me-2" aria-label="First group">
      <Button>PREV</Button>
      </ButtonGroup>
      <ButtonGroup className="me-2" aria-label="Second group">
        <Button>{currentPage}</Button> 
      </ButtonGroup>
      <ButtonGroup aria-label="Third group">
        <Button>NEXT</Button>
      </ButtonGroup>
    </ButtonToolbar>

    </div>
  );
}