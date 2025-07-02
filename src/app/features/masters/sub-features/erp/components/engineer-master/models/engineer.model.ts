export interface EngineerGetDto {
  engCode: string;         
  engName: string;         
  techCode: string;        
  techCat: string;         
  telNo: string;           
  mobileNo: string;        
  skillLevel: string;      
  activeStatus: string;   
  idCardNo: string;       
  updatedBy: string;       
  updatedOn: string;       
}

export interface EngineerPostDto extends Omit<EngineerGetDto, 'updatedOn'> { } 
