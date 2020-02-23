import internet_users from './newData/internet_users.js';
import life_expectancy from './newData/life_expectancy.js';
import school_men from './newData/mean_years_in_school_25_older_men.js';
import school_women from './newData/mean_years_in_school_25_older_women.js';
import murder_total from '../../data/gapminder/murder_total.js';
import population_total from '../../data/gapminder/population_total.js';
import suicide_total from '../../data/gapminder/suicide_totals.js';

export function getGapminderDatasetByIndex(index) {

    switch (index) {
        case 1:
            return suicide_total;
        case 2:
            return population_total;
        case 3:
            return internet_users;
        case 4:
            return school_men;
        case 5:
            return school_women;
        case 6:
            return murder_total;
        case 7:
            return life_expectancy;
        default:
            return "error";
    }
};


export function getMinMaxForGapminderDataset(index) {

    switch (index) {
        case 1:
            return [0, 100];
        case 2:
            return [0, 100];
        case 3:
            return [0, 100];
        case 4:
            return [0, 100];
        case 5:
            return [0, 100];
        case 6:
            return [0, 100];
        case 7:
            return [0, 100];
        default:
            return [0, 100];
    }
}

export function getWholeDataset() {

    let mixedDataset = [];

    for (let i = 0; i < 120; i++) {

        let countries = [
            suicide_total[i].countryKey,
            population_total[i].countryKey,
            internet_users[i].countryKey,
            school_men[i].countryKey,
            school_women[i].countryKey,
            murder_total[i].countryKey,
            life_expectancy[i].countryKey
        ];

        const newObj = {
            countryKeys: countries,
            suicide_total: suicide_total[i],
            population_total: population_total[i],
            internet_users: internet_users[i],
            school_men: school_men[i],
            school_women: school_women[i],
            murder_total: murder_total[i],
            life_expectancy: life_expectancy[i],
        };

        mixedDataset.push(newObj);
    }

    //console.log(mixedDataset);
    return mixedDataset;


}

export function cleanData(dataset) {
    const keys = Object.keys(dataset[0]);
    const cleanedDataset = [];

    for (let dataIndex = 0; dataIndex < dataset.length; dataIndex++) {
        let foundNull = false;

        for (let keyIndex = 0; keyIndex < keys; keyIndex++) {
            let property = dataset[dataIndex][keys[keyIndex]];
            if (property === null) { foundNull = true };
        };
        if (foundNull) cleanedDataset.push(dataset[dataIndex]);
    };
    return cleanedDataset;
}


export function getMaxValueForDataset(index, noElements) {

    let dataset = getGapminderDatasetByIndex(index);

    //dataset = [{ 1990: 1, 1991: 2 }, { 1990: 3, 1991: 4 }];

    if (noElements > dataset.length) { noElements = dataset.length };

    let max = 0;

    // for each elem in dataset array
    for (let i = 0; i < noElements; i++) {

        // for each year in object
        for (let year = 1990; year <= 2010; year++) {

            let property = dataset[i][year];

            // console.log(property);
            // console.log(year);
            // console.log(dataset[i].countryKey);
            // console.log();

            if (property !== undefined && property !== null && property > max) {
                // console.log(dataset[i].countryKey);
                // console.log(year);
                max = property;
            };
        };
    };
    return max;

}


export function getMinValueForGapminderDataset2(dataset) {

    let max = 0;
    const keys = Object.keys(dataset[0]);

    // for each elem in dataset array
    for (let i = 0; i < dataset.length; i++) {

        // for each year in object
        for (let keyIndex = 0; keyIndex < keys.length; keyIndex++) {

            //let property = dataset[i][keys[keyIndex]];

            let property = dataset[i][keys[keyIndex]];

            if (property !== null && property > max) {
                max = property;
            };
        };
    };
    return max;

}


export function getMaxValueForGapminderDataset(dataset) {

    let max = 0;
    const keys = Object.keys(dataset[0]);

    // for each elem in dataset array
    for (let i = 0; i < dataset.length; i++) {

        // for each year in object
        for (let keyIndex = 0; keyIndex < keys.length; keyIndex++) {

            //let property = dataset[i][keys[keyIndex]];

            let property = dataset[i][keys[keyIndex]];

            if (property !== null && property > max) {
                max = property;
            };
        };
    };
    return max;
};



export function getMinValueForGapminderDataset(dataset) {

    let min = 1000;
    const keys = Object.keys(dataset[0]);

    // console.log(keys);
    // console.log(max);

    // for each elem in dataset array
    for (let i = 0; i < dataset.length; i++) {


        // for each year in object
        for (let keyIndex = 0; keyIndex < keys.length; keyIndex++) {

            //let property = dataset[i][keys[keyIndex]];

            let property = dataset[i][keys[keyIndex]];

            if (property !== null && property < min) {
                min = property;
            };
        };
    };

    return min;
};


export function getTicks(start, finish, noBlocks) {
    let ticks = [];
    const diff = (finish - start) / noBlocks

    for (let i = 0; i < (noBlocks + 1); i++) {
        const value = start + diff * i;
        ticks.push(value);
    }
    return ticks;
}