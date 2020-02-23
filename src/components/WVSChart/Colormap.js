

const colorMap = (continent) => {

    if (continent === 'Oceania') return '#3498DB' //blue
    if (continent === 'Europe') return '#5B2C6F'  //purple
    if (continent === 'South America') return '#E74C3C' //red
    if (continent === 'Asia') return '#239B56' //dark green
    if (continent === 'Middle East') return '#F4D03F' //yellow
    if (continent === 'Africa') return '#99A3A4' //light grey
    if (continent === 'North America') return '#D35400'; //brown orange
};


export default colorMap;