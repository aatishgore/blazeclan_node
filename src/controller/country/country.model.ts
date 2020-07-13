export interface ICountry {
    name: string,
    topLevelDomain?: string[],
    alpha2Code?: string,
    alpha3Code?: string,
    callingCodes?: string[],
    capital?: string,
    altSpellings?: string[],
    region?: string,
    subregion?: string,
    population?: number,
    latlng?: number[],
    demonym?: string,
    area?: number,
    gini?: number,
    timezones?: string[],
    borders?:string[],
    nativeName?: string,
    numericCode?: string,
    currencies?: string[],
    languages?: string[],
    translations?: {
        de: string,
        es: string,
        fr: string,
        ja: string,
        it: string
    },
    relevance?: string
}