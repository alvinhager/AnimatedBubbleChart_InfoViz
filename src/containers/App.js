import React, { useState, useCallback } from 'react';
import BubbleChart from '../components/BubbleChart/BubbleChart.js';
import Slider from '../components/Slider/Slider.js';
import classes from './App.module.scss';
import useDebounce from '../hooks/useDebounce.js';
import useTimer from '../hooks/useTimer.js';
import DropDownMenus from '../components/DropDownMenus/DropDownMenus.js';
import { convertDataToBubbleFormat } from '../data/data_functions.js';
import ToggleButton from '../components/ToggleButton/ToggleButton.js';
import { getMaxValueForDataset, getMinValueForGapminderDataset, getWholeDataset } from '../data/gapminder/gapminder_data_functions';
import WVSChart from '../components/WVSChart/WVSChart.js';
import { getGapminderCountryKeys, getFinalGapminderData, getGapminderData } from '../data/gapminder/newData/newData_functions.js';
import GapminderChart from '../components/GapminderChart/GapminderChart.js';

function App() {

  const [dropDownValues, setDropDownValues] = useState([1, 4, 3]);
  const [sliderValue, setSliderValue] = useState(0);
  const debouncedSliderValue = useDebounce(sliderValue, 0);
  const [mode, setMode] = useState('WVS');

  const handleChangeSliderValue = (e, value) => {
    if (sliderValue !== value) {
      setSliderValue(value);
    }
  };

  document.body.style = 'background:#F8F8F8';

  const handleChangeDropDowns = (ddValues) => {
    if (dropDownValues !== ddValues) {
      setDropDownValues(ddValues);
    }
  };

  const handleRedButtonClick = (value) => {
    if (value === 0 && mode !== 'Gapminder') {
      setDropDownValues([1, 2, 3]);
      setMode('Gapminder');
    }
    else if (value === 1 && mode !== 'WVS') {
      setDropDownValues([1, 2, 3]);
      setMode('WVS');
    }
    setDropDownValues([1, 2, 3]);
  }


  return (
    <div className={classes.App}>
      <div className={classes.title}> Totally not Hans Rosling</div>
      <div className={classes.bubbleChart}>
        {/* <BubbleChart value={debouncedSliderValue} dataset={mode} dropDownValues={dropDownValues}></BubbleChart> */}
        {mode === 'WVS' && <WVSChart sliderValue={debouncedSliderValue} dropDownValues={dropDownValues}></WVSChart>}
        {mode === 'Gapminder' && <GapminderChart sliderValue={debouncedSliderValue} dropDownValues={dropDownValues}></GapminderChart>}

      </div>
      <ToggleButton onClickHandler={handleRedButtonClick} />
      <div className={classes.dropDownMenus}><DropDownMenus values={dropDownValues} dataset={mode} handleChangeDropDowns={handleChangeDropDowns} /></div>
      <div className={classes.timeSlider}> <Slider mode={mode} handleValueChanged={handleChangeSliderValue}></Slider></div>
    </div > //App
  );

}

export default App;

