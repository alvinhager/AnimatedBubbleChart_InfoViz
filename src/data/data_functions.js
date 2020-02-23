import wvs_data_obj from './wvs_obj.js';

export function getCountryObj(countryKey) {
    return wvs_data_obj[countryKey];
};

export function getAllCountryKeys() {
    return Object.keys(wvs_data_obj);
};

export function getQuestionTags() {
    return ['BLVGOD',
        'SUICID',
        'ABORT',
        'EUTHAN',
        'GAY',
        'PROSTI',
        'GODIMP',
        'BLVDEV'];
};

export function getQuestionKeyForWave(questionTag, waveNum) {
    return questionTag + `_${waveNum}`;
}


export function waveKeysArray() {
    return ['WAVE_1', 'WAVE_2', 'WAVE_3', 'WAVE_4'];
};

export function getWaveKeyByNum(waveNum) {
    return `WAVE_${waveNum}`;
};

export function getOfficialNameByKey(countryKey) {
    return wvs_data_obj[countryKey].name;
};

export function getCountryYearForWave(countryKey, waveNum) {
    const country = getCountryObj(countryKey);
    return country['WAVE_' + waveNum];
}

/* waveNum is indexed 1-4, questionTag: "SUICID" */
export function getKeyForQuestionAndWaveNum(questionTag, waveNum) {
    return questionTag + "_" + waveNum;
}

/** returns array [[1993,percentage],...] */
export function getYearsAndAnswersForCountryAndQuestion(countryKey, questionTag) {
    const country = getCountryObj(countryKey);

    // console.log(country);
    const waveKeys = waveKeysArray();
    const yearsAndAnswers = [];

    // for each wave, add [year,questionpercentage] to our array.
    for (let i = 0; i < waveKeys.length; i++) {
        const yearSurveyed = country[getWaveKeyByNum(i)];
        let questionPercentage;
        // console.log("");
        // console.log("wave: " + (i + 1));
        if (yearSurveyed !== null && yearSurveyed !== undefined) {
            // console.log("key :" + getKeyForQuestionAndWaveNum(questionTag, i + 1));
            questionPercentage = country[getKeyForQuestionAndWaveNum(questionTag, i)];
            yearsAndAnswers.push([yearSurveyed, questionPercentage]);
            // console.log("year surveyed: " + yearSurveyed);
            // console.log("qst percentage: " + questionPercentage);
        }
    }
    return yearsAndAnswers;
};


export function convertDataToBubbleFormat() {


    const wrapper = getAllCountryKeys().map((countryKey) => {

        const countryObj = getCountryObj(countryKey);
        const newCountryObj = convertCountryObjToBubbleFormat(countryObj);
        const element = { countryKey: countryKey, data: newCountryObj };

        return element;
    });

    return wrapper;
}


export function getWVSDataInWaveFormat() {

    const wrapper = getAllCountryKeys().map((countryKey) => {

        const countryObj = getCountryObj(countryKey);
        const newCountryObj = convertCountryObjToWaveFormat(countryObj);

        const element = { countryKey: countryKey, continent: countryObj.continent, data: newCountryObj };
        return element;
    });

    return wrapper;
}

export function convertCountryObjToBubbleFormat(countryObj) {

    const waveKeys = waveKeysArray();
    const questionTags = getQuestionTags();

    let newCountryObj = {};

    for (let i = 0; i < waveKeys.length; i++) {
        const waveKey = waveKeys[i];
        const year = countryObj[waveKey];

        // wave exists!
        if (year !== undefined && year != null) {

            const answersForWave = questionTags.map((qstTag) => {
                const qstKey = getQuestionKeyForWave(qstTag, i + 1);
                const qstAnswer = countryObj[qstKey];

                return qstAnswer;

            });
            newCountryObj[year] = answersForWave;
        }
    }
    return newCountryObj;
};


export function convertCountryObjToWaveFormat(countryObj) {

    const waveKeys = waveKeysArray();
    const questionTags = getQuestionTags();

    let newCountryObj = {};

    for (let i = 0; i < waveKeys.length; i++) {
        const waveKey = waveKeys[i];
        const year = countryObj[waveKey];

        // wave exists!
        if (year !== undefined && year != null) {

            const answersForWave = questionTags.map((qstTag) => {
                const qstKey = getQuestionKeyForWave(qstTag, i + 1);
                const qstAnswer = countryObj[qstKey];

                return qstAnswer;

            });
            newCountryObj['wave_' + i] = answersForWave;
        }
    }
    return newCountryObj;
};





