export interface CountryGetDto {
    countryCode: string;
    countryName: string;
    didCode: string;
    currCode: string;
    language: string;
    langCode: string;
    timeDiff: number;
    updatedBy: string;
    updatedOn: string;
}

export interface CountryPostDto extends Omit<CountryGetDto, 'updatedOn'> { } 
