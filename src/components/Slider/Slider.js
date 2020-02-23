import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        height: '100%'
    },
    margin: {
        height: theme.spacing(3),
    },
    markActive: {

        visibility: 'hidden'

    },
    thumb: {
        height: 1000,
        width: 24,
        backgroundColor: '#fff',
        border: '2px solid ',
        marginTop: -8,
        marginLeft: -12,
        '&:focus,&:hover,&$active': {
            boxShadow: 'inherit',
        },
    },
}));


const WVSmarks = [
    {
        value: 0,
        label: "1981"
    },
    {
        value: 100,
        label: "2004"
    }
];


const GapminderMarks = [
    {
        value: 0,
        label: '1990',
    },
    {
        value: 100,
        label: '2014',
    },
];





function valuetext(value) {
    return `${value}°C`;
}

// const PrettoSlider = withStyles({
//     root: {
//         color: '#52af77',
//         height: 8,
//     },
//     thumb: {
//         height: '2vw',
//         width: '2vw',
//         backgroundColor: '#fff',
//         border: '2px solid currentColor',
//         marginTop: '-2px',
//         marginLeft: '-42px',
//         '&:focus,&:hover,&$active': {
//             boxShadow: 'inherit',
//         },
//     },
//     active: {},
//     valueLabel: {
//         left: 'calc(0px)',
//     },
//     track: {
//         height: '2vw',
//         borderRadius: '0.5vw',
//     },
//     rail: {
//         height: '2vw',
//         borderRadius: '0.5vw',
//     },
// })(Slider);



const PrettoSlider = withStyles({
    root: {
        color: '#dc3545',
        height: 8,
        fontSize: '13vw'
    },
    markLabel: {

        marginTop: '5%',
        fontSize: '18px'

    },
    mark: {
        width: 0
    },
    thumb: {
        height: '1.5vw',
        width: '1.5vw',
        backgroundColor: '#343a40',
        border: '0.2vw solid grey',
        marginTop: '-0.4vw',
        marginLeft: '-0.9vw',
        '&:focus,&:hover,&$active': {
            boxShadow: 'inherit',
        },
    },
    markLabel: {

        marginTop: '0.5vw',
        fontSize: '1.5vw'

    },
    active: {
    },
    valueLabel: {
        left: 'calc(-50%-1vw)',
    },
    track: {
        height: '0.8vw',
        borderRadius: '1vw',
    },
    rail: {
        height: '0.7vw',
        borderRadius: '1vw',
    },
})(Slider);

function valueLabelFormat(value) {
    return WVSmarks.findIndex(mark => mark.value === value) + 1;
}

export default function DiscreteSlider({ handleValueChanged, mode }) {
    const classes = useStyles();

    const getMarks = () => {
        if (mode === "WVS") { return WVSmarks; }
        else { return GapminderMarks; }
    };

    return (
        // <div className={classes.root}>
        <div className={classes.root}>
            <Typography id="track-false-slider" gutterBottom>
            </Typography>
            {/* <Slider
                track={false}
                aria-labelledby="track-false-slider"
                getAriaValueText={valuetext}
                defaultValue={0}
                marks={marks2}
                onChange={(e, value) => { if (value % 5 === 0) { handleValueChanged(e, value) } }}
            /> */}
            <PrettoSlider
                aria-label="pretto slider" defaultValue={20}
                defaultValue={0}
                min={0}
                max={100}
                marks={getMarks()}
                onChange={(e, value) => { if (value % 5 === 0) { handleValueChanged(e, value) } }}
            />
        </div>



        // </div>
    );
}

        // import React from 'react';
// import {makeStyles} from '@material-ui/core/styles';
            // import Typography from '@material-ui/core/Typography';
            // import Slider from '@material-ui/core/Slider';

// const useStyles = makeStyles(theme => ({
//   root: {
//     width: 250,
//   },
//   margin: {
//     height: theme.spacing(3),
//   },
// }));

// const marks = [
//   {
//     value: 0,
//     label: '0°C',
//   },
//   {
//     value: 20,
//     label: '20°C',
//   },
//   {
//     value: 37,
//     label: '37°C',
//   },
//   {
//     value: 100,
//     label: '100°C',
//   },
// ];

// function valuetext(value) {
//   return `${value}°C`;
// }

// export default function TrackInvertedSlider() {
//   const classes = useStyles();

//   return (
//     <div className={classes.root}>
//       <Typography id="track-inverted-slider" gutterBottom>
//         Inverted track
//       </Typography>
//       <Slider
//         track="inverted"
//         aria-labelledby="track-inverted-slider"
//         getAriaValueText={valuetext}
//         defaultValue={30}
//         marks={marks}
//       />
//       <div className={classes.margin} />
//       <Typography id="track-inverted-range-slider" gutterBottom>
//         Inverted track range
//       </Typography>
//       <Slider
//         track="inverted"
//         aria-labelledby="track-inverted-range-slider"
//         getAriaValueText={valuetext}
//         defaultValue={[20, 37]}
//         marks={marks}
//       />
//     </div>
//   );
// }






// <Typography id="discrete-slider" gutterBottom>
// Temperature
// </Typography>
// <Slider
// defaultValue={30}
// getAriaValueText={valuetext}
// aria-labelledby="discrete-slider"
// valueLabelDisplay="auto"
// step={10}
// marks
// min={10}
// max={110}
// />
// <div className={classes.margin} />
// <Typography id="discrete-slider-small-steps" gutterBottom>
// Small steps
// </Typography>
// <Slider
// defaultValue={0.00000005}
// getAriaValueText={valuetext}
// aria-labelledby="discrete-slider-small-steps"
// step={0.00000001}
// marks
// min={-0.00000005}
// max={0.0000001}
// valueLabelDisplay="auto"
// />
// <div className={classes.margin} />
// <Typography id="discrete-slider-custom" gutterBottom>
// Custom marks
// </Typography>
// <Slider
// defaultValue={1990}
// getAriaValueText={valuetext}
// aria-labelledby="track-inverted-range-slider"
// step={1}
// valueLabelDisplay="auto"
// marks={marks}
// min={1990}
// max={1993}
// track={false}

// />
// <div className={classes.margin} />
// <Typography id="discrete-slider-restrict" gutterBottom>
// Restricted values
// </Typography>
// <Slider
// defaultValue={20}
// valueLabelFormat={valueLabelFormat}
// getAriaValueText={valuetext}
// aria-labelledby="discrete-slider-restrict"
// step={null}
// valueLabelDisplay="auto"
// marks={marks}
// />
// <div className={classes.margin} />
// <Typography id="discrete-slider-always" gutterBottom>
// Always visible
// </Typography>
// <Slider
// defaultValue={80}
// getAriaValueText={valuetext}
// aria-labelledby="discrete-slider-always"
// step={10}
// marks={marks}
// valueLabelDisplay="on"
// />