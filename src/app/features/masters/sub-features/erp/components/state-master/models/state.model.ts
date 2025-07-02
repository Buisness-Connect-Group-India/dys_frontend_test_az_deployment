export interface StateGetDto {
    stateCode: string;
    stateName: string;
    countryCode: string;
    countryName: string;
    updatedBy: string;
    updatedOn: string;
}

export interface StatePostDto extends Omit<StateGetDto, 'updatedOn'> { } 