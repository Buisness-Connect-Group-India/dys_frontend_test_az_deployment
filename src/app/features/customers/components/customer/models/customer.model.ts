import { CustomerAddressesGetDto } from "../../customer-addresses/models/custome-addresses.model";
import { CustomerConsentGetDto } from "../../customer-consent/models/customer-consent.model";
import { CustomerOverviewDto } from "../../customer-overview/models/customer-overview.model";
import { CustomerProductsGetDto } from "../../customer-products/models/customer-products.model";

export interface CustomerDetailsGetDto {
    payload: {
        overview: CustomerOverviewDto;
        addresses: CustomerAddressesGetDto[];
        products: CustomerProductsGetDto[];
        consent: CustomerConsentGetDto[];
    };
}

export interface CustomerGetDto {
    custId: string;
    sourceCustId: string;
    cType: string;
    salutation: string;
    firstName: string;
    middleName: string;
    lastName: string;
    batchNo: string;
    syncToCrm: string;
    regBy: string;
    regByEnt: string;
    status: string;
    updatedBy: string;
    totalRecords: number;
    emailId: string;
    mobileNo: string;
}

export interface CustomerPostDto extends Omit<CustomerGetDto, ''> { }




