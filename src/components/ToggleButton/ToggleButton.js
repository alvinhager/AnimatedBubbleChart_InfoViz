import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import React, { useState } from 'react';


export default function ToggleButton({ onClickHandler }) {


    const [valueOn, setValueOn] = useState(1);

    const handleClickButton = (i) => {
        onClickHandler(i);
        setValueOn(i);
    };


    const setLook = (i) => {
        if (i === valueOn) {
            return "danger";
        }

        return "dark";
    };

    return <React.Fragment>
        <ButtonGroup aria-label="ToggleButton" size={'lg'}>
            <Button onClick={() => handleClickButton(0)} variant={setLook(0)}>Gapminder Data</Button>
            <Button onClick={() => handleClickButton(1)} variant={setLook(1)}>World Value Survey Data</Button>
        </ButtonGroup>
    </React.Fragment >
}


