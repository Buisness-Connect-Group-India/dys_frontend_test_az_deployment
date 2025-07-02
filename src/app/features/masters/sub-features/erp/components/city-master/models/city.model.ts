export interface CityGetDto {
    cityCode: string;
    cityName: string;
    stateCode: string;
    stateName: string;
    countryCode: string;
    countryName: string;
    updatedBy: string;
    updatedOn: string;
}

export interface CityPostDto extends Omit<CityGetDto, 'stateName'|'countryName'|'updatedOn'> { } 