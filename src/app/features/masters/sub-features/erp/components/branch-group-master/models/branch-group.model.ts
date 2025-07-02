export interface BranchGroupGetDto {
    branchGrpCode: string;
    branchCode: string;
    branchName: string;
    createdBy: string;
    createdTime: string;
    updatedBy: string;
    updatedOn: string;
}

export interface BranchGroupPostDto extends Omit<BranchGroupGetDto, 'branchName' | 'createdTime' | 'updatedOn'> { } 