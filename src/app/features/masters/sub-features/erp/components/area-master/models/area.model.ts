export interface AreaGetDto {
    areaCode: string;
    cityCode: string;
    cityName: string;
    stateCode: string;
    stateName: string;
    countryCode: string;
    countryName: string;
    areaName: string;
    updatedBy: string;
    updatedOn: string;
}

export interface AreaPostDto extends Omit<AreaGetDto, 'cityName' | 'stateName' | 'countryName' | 'updatedOn'> { }