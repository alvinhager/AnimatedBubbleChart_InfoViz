import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({

    root: {
        fontSize: '1.2vw',
        color: 'black',

    },
    button: {
        display: 'block',
        marginTop: theme.spacing(2),
        fontSize: '10vw'
    },
    formControl: {
        fontColor: 'red',
        fontSize: '10vw',
        margin: theme.spacing(1),
        minWidth: 200,
    },
}));


const useStyles2 = makeStyles(theme => ({
    select: {
        fontSize: '2vh',
    },

}));

export default function ControlledOpenSelect({ values, handleChangeDropDowns, dataset }) {
    const classes = useStyles();

    const classes2 = useStyles2();

    const [xAxisOpen, setXAxisOpen] = React.useState(false);

    const handleXAxisOpen = () => {
        setXAxisOpen(true);
    };
    const handleXAxisClose = () => {
        setXAxisOpen(false);
    };

    const [yAxisOpen, setYAxisOpen] = React.useState(false);

    const handleYAxisOpen = () => {
        setYAxisOpen(true);
    };
    const handleYAxisClose = () => {
        setYAxisOpen(false);
    };

    const [bubbleSizeOpen, setBubbleSizeOpen] = React.useState(false);

    const handleBubbleSizeOpen = () => {
        setBubbleSizeOpen(true);
    };
    const handleBubbleSizeClose = () => {
        setBubbleSizeOpen(false);
    };

    const handleXAxisChange = event => {
        event.preventDefault();
        handleChangeDropDowns([event.target.value, values[1], values[2]]);
    };

    const handleYAxisChange = event => {
        event.preventDefault();
        handleChangeDropDowns([values[0], event.target.value, values[2]]);

    };

    const handleBubbleSizeChange = event => {
        event.preventDefault();
        handleChangeDropDowns([values[0], values[1], event.target.value]);
    };


    const menuItemsWVS = () => [
        <MenuItem key={"drop_" + 1 + "_1"} value={1}>% of total who believe in god </MenuItem>,
        <MenuItem key={"drop_" + 1 + "_2"} value={2}>% of total who say suicide is never justifiable</MenuItem>,
        <MenuItem key={"drop_" + 1 + "_3"} value={3}>% of total who say abortion is never justifiable</MenuItem>,
        <MenuItem key={"drop_" + 1 + "_4"} value={4}>% of total who say euthanasia is never justifiable</MenuItem>,
        <MenuItem key={"drop_" + 1 + "_5"} value={5}>% of total who say homosexuality is never justifiable</MenuItem>,
        <MenuItem key={"drop_" + 1 + "_6"} value={6}>% of total who say prostitution is never justifiable</MenuItem>,
        <MenuItem key={"drop_" + 1 + "_7"} value={7}>% of total who say god is very important in their lives</MenuItem>,
        <MenuItem key={"drop_" + 1 + "_8"} value={8}>% of total who say they believe in the devil</MenuItem>
    ];

    const menuItemsGapMinder = () => [
        <MenuItem key={"drop_" + 0 + "_2"} value={1}>% of total pop. that use the internet</MenuItem>,
        <MenuItem key={"drop_" + 0 + "_3"} value={2}>Mean no. of years in school for men ages 25 and over </MenuItem>,
        <MenuItem key={"drop_" + 0 + "_4"} value={3}>Mean no. of years in school for women ages 25 and over</MenuItem>,
        <MenuItem key={"drop_" + 0 + "_5"} value={4}>Population density per square km</MenuItem>,
        <MenuItem key={"drop_" + 0 + "_6"} value={5}>Electricity consumption per person</MenuItem>,
        <MenuItem key={"drop_" + 0 + "_7"} value={6}>Average life expectancy</MenuItem>,
        <MenuItem key={"drop_" + 0 + "_8"} value={7}>Income per person (adjusted (inflation adjusted)</MenuItem>
    ];

    const getMenuItems = () => {
        if (dataset === "Gapminder") return menuItemsGapMinder();
        else return menuItemsWVS();
    };

    return (
        <React.Fragment>

            <FormControl className={classes.formControl}>
                <InputLabel className={classes.root} id="demo-controlled-open-select-label">{"X-Axis"}</InputLabel>
                <Select className={classes2.select}
                    labelId="demo-controlled-open-select-label"
                    id="demo-controlled-open-select"
                    open={xAxisOpen}
                    onClose={handleXAxisClose}
                    onOpen={handleXAxisOpen}
                    value={values[0]}
                    onChange={handleXAxisChange}
                >
                    {getMenuItems()}
                </Select>
            </FormControl>

            <FormControl className={classes.formControl}>
                <InputLabel className={classes.root} id="demo-controlled-open-select-label">{"Y-Axis"}</InputLabel>
                <Select
                    className={classes2.select}
                    labelId="demo-controlled-open-select-label"
                    id="demo-controlled-open-select"
                    open={yAxisOpen}
                    onClose={handleYAxisClose}
                    onOpen={handleYAxisOpen}
                    value={values[1]}
                    onChange={handleYAxisChange}
                    size='medium'
                >
                    {getMenuItems()}
                </Select>
            </FormControl>

            <FormControl className={classes.formControl}>
                <InputLabel className={classes.root} id="demo-controlled-open-select-label">{"Bubble Size"}</InputLabel>
                <Select
                    className={classes2.select}
                    labelId="demo-controlled-open-select-label"
                    id="demo-controlled-open-select"
                    open={bubbleSizeOpen}
                    onClose={handleBubbleSizeClose}
                    onOpen={handleBubbleSizeOpen}
                    value={values[2]}
                    onChange={handleBubbleSizeChange}
                >
                    {getMenuItems()}
                </Select>
            </FormControl>

        </React.Fragment >
    );
}
