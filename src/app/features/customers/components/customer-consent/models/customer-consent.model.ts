export interface CustomerConsentGetDto {
    custId: string;
    promo: string;
    general: string;
    dpAcpt: string;
    tcAcpt: string;
    voice: string;
    smsMms: string;
    whatsapp: string;
    faxNo: string;
    email: string;
    other: string;
    regByEnt: string;
    status: string;
    updatedBy: string;
    updatedOn: string;
}
 export interface CustomerConsentPostDto extends Omit<CustomerConsentGetDto, 'updatedBy' | 'updatedOn'>{}
