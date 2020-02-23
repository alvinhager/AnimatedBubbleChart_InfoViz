import internet_users from './internet_users.js';
import men_school from './mean_years_in_school_25_older_men.js';
import women_school from './mean_years_in_school_25_older_women.js';
import population_density from './population_density';
import electricity_consumption from './electricity_consumption';
import life_expectancy from './life_expectancy';
import income_per_person from './income_per_person';

export function getGapminderDatasetByIndex(index) {

    switch (index) {
        case 1:
            return internet_users;
        case 2:
            return men_school;
        case 3:
            return women_school;
        case 4:
            return population_density;
        case 5:
            return electricity_consumption;
        case 6:
            return life_expectancy;
        case 7:
            return life_expectancy;
        case 8:
            return income_per_person;
        default:
            return "error";
    }


};

export function getGapminderCountryKeys() {

    const countryKeys = [];

    for (let i = internet_users.length - 1; i >= 0; i--) {
        const countryKey = internet_users[i].countryKey;
        countryKeys.push(countryKey);
    }

    return countryKeys;
}

export function getGapminderData() {

    const countryKeys = getGapminderCountryKeys();

    // get internet user data question 1
    let internetDataWrapper = {};
    for (let i = 0; i < internet_users.length; i++) {

        // for (let keyIndex = 0; keyIndex < countryKeys.length; keyIndex++) {

        const internet_country_Obj = internet_users[i];
        const dataForCountry = getDataBetweenYears(1994, 2014, internet_country_Obj);
        internetDataWrapper[internet_country_Obj.countryKey] = dataForCountry;
        // }
    }


    // get men_school data question 2
    let men_school_wrapper = {};
    for (let i = 0; i < men_school.length; i++) {

        const men_school_obj = men_school[i];
        if (countryKeys.includes(men_school_obj.countryKey)) {
            const men_school_data_obj = getDataBetweenYears(1994, 2014, men_school_obj);
            men_school_wrapper[men_school_obj.countryKey] = men_school_data_obj;
        }
    }

    // get women_school data question 3
    let women_school_wrapper = {};
    for (let i = 0; i < women_school.length; i++) {

        const women_school_obj = women_school[i];
        if (countryKeys.includes(women_school_obj.countryKey)) {
            const women_school_data_obj = getDataBetweenYears(1994, 2014, women_school_obj);
            women_school_wrapper[women_school_obj.countryKey] = women_school_data_obj;
        }
    }

    // get population_density data question 4
    let population_density_wrapper = {};
    for (let i = 0; i < population_density.length; i++) {
        const population_density_obj = population_density[i];

        if (countryKeys.includes(population_density_obj.countryKey)) {
            const population_density_data_obj = getDataBetweenYears(1994, 2014, population_density_obj);
            population_density_wrapper[population_density_obj.countryKey] = population_density_data_obj;
        }
    }

    // electricty use per person data question 5
    let electricity_consumption_wrapper = {};
    for (let keyIndex = 0; keyIndex < countryKeys.length; keyIndex++) {

        const countryKey = countryKeys[keyIndex];
        if (electricity_consumption[countryKeys[keyIndex]] !== undefined && electricity_consumption[countryKeys[keyIndex]] !== null) {
            const electricity_consumption_obj = electricity_consumption[countryKeys[keyIndex]];
            const electricity_consumption_data_obj = getDataBetweenYears(1994, 2014, electricity_consumption_obj);
            electricity_consumption_wrapper[countryKey] = electricity_consumption_data_obj;
        }
    }

    // life_expectancy 6
    let life_expectancy_wrapper = extractData(life_expectancy);

    // income_per_person 7
    let income_per_person_wrapper = {};
    for (let keyIndex = 0; keyIndex < countryKeys.length; keyIndex++) {

        const countryKey = countryKeys[keyIndex];
        if (income_per_person[countryKeys[keyIndex]] !== undefined && income_per_person[countryKeys[keyIndex]] !== null) {
            const income_per_person_obj = income_per_person[countryKeys[keyIndex]];
            const income_per_person_data_obj = getDataBetweenYears(1994, 2014, income_per_person_obj);
            income_per_person_wrapper[countryKey] = income_per_person_data_obj;
        }
    }

    return {
        1: internetDataWrapper,
        2: men_school_wrapper,
        3: women_school_wrapper,
        4: population_density_wrapper,
        5: electricity_consumption_wrapper,
        6: life_expectancy_wrapper,
        7: income_per_person_wrapper
    };

}

export function extractData(dataset) {

    const countryKeys = getGapminderCountryKeys();

    // get population_density data question 3
    let dataset_wrapper = {};
    for (let i = 0; i < dataset.length; i++) {
        const country_obj = dataset[i];
        if (countryKeys.includes(country_obj.countryKey)) {
            const data_obj = getDataBetweenYears(1994, 2014, country_obj);
            dataset_wrapper[country_obj.countryKey] = data_obj;
        }
    }

    return dataset_wrapper;
}


export function getFinalGapminderData() {

    const gapMinderData = getGapminderData();
    const countryKeys = getGapminderCountryKeys();

    //console.log(gapMinderData);


    let dataArray = [];

    // for each country
    for (let ki = 0; ki < countryKeys.length; ki++) {

        const countryKey = countryKeys[ki];

        //console.log("countryKey " + countryKey);

        let wrapper = {};
        wrapper['countryKey'] = countryKey;

        // for each question in gapminder data
        for (let qki = 1; qki <= 7; qki++) {
            const questionCountryObj = gapMinderData[qki];
            const countryObjForQuestion = questionCountryObj[countryKey];
            wrapper[qki] = (countryObjForQuestion);
        }
        dataArray.push(wrapper);
    }

    return dataArray;
}




export function getDataBetweenYears(startYear, endYear, dataObj) {
    let newObj = {};

    for (let year = startYear; year <= endYear; year++) {

        if (typeof dataObj[year] !== undefined && dataObj[year] != null) {
            let data = dataObj[year];
            newObj[year] = data;
        }

    }
    return newObj;
};

