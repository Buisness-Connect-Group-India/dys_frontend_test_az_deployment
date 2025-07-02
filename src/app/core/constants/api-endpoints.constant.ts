import { environment } from "../../../environments/environments";

export interface CrudEndpoints {
    getAll?: string;
    getByCode?: (code: string | number) => string;
    getByCodeParams?: (code: string | number) => string;
    create?: string;
    createWithParams?: string;

    update?: (code: string | number) => string;
    delete?: (code: string | number) => string;
}
interface DropdownConfig {
    dropdown?: string;
    options?: string;
}

export const API_ENDPOINTS = {
    LOGIN: {
        create: `${environment.apiBaseUrl}/auth/login`,
    },
    COUNTRY: {
        getAll: `${environment.apiBaseUrl}/masters/countries/list`,
        getByCode: (code: string | number) => `${environment.apiBaseUrl}/masters/countries/${code}`,
        create: `${environment.apiBaseUrl}/masters/countries/add`,
        update: (code: string | number) => `${environment.apiBaseUrl}/masters/countries/${code}`,
        delete: (code: string | number) => `${environment.apiBaseUrl}/masters/countries/${code}`
    },
    STATE: {
        getAll: `${environment.apiBaseUrl}/masters/states/list`,
        getByCode: (code: string | number) => `${environment.apiBaseUrl}/masters/states/${code}`,
        create: `${environment.apiBaseUrl}/masters/states/add`,
        update: (code: string | number) => `${environment.apiBaseUrl}/masters/states/${code}`,
        delete: (code: string | number) => `${environment.apiBaseUrl}/masters/states/${code}`
    },
    CITY: {
        getAll: `${environment.apiBaseUrl}/masters/cities/list`,
        getByCode: (code: string | number) => `${environment.apiBaseUrl}/masters/cities/${code}`,
        create: `${environment.apiBaseUrl}/masters/cities/add`,
        update: (code: string | number) => `${environment.apiBaseUrl}/masters/cities/${code}`,
        delete: (code: string | number) => `${environment.apiBaseUrl}/masters/cities/${code}`
    },
    AREA: {
        getAll: `${environment.apiBaseUrl}/masters/areas/list`,
        getByCode: (code: string | number) => `${environment.apiBaseUrl}/masters/areas/${code}`,
        create: `${environment.apiBaseUrl}/masters/areas/add`,
        update: (code: string | number) => `${environment.apiBaseUrl}/masters/areas/${code}`,
        delete: (code: string | number) => `${environment.apiBaseUrl}/masters/areas/${code}`,
        search: `${environment.apiBaseUrl}/masters/areas/search`
    },
    BRANCH: {
        getAll: `${environment.apiBaseUrl}/masters/branches/list`,
        getByCode: (code: string | number) => `${environment.apiBaseUrl}/masters/branches/${code}`,
        create: `${environment.apiBaseUrl}/masters/branches/add`,
        update: (code: string | number) => `${environment.apiBaseUrl}/masters/branches/${code}`,
        delete: (code: string | number) => `${environment.apiBaseUrl}/masters/branches/${code}`,
    },
    BRANCHGROUP: {
        getAll: `${environment.apiBaseUrl}/masters/branchgroups/list`,
        getByCode: (code: string | number) => `${environment.apiBaseUrl}/masters/branchgroups/${code}`,
        create: `${environment.apiBaseUrl}/masters/branchgroups/add`,
        update: (code: string | number) => `${environment.apiBaseUrl}/masters/branchgroups/${code}`,
        delete: (code: string | number) => `${environment.apiBaseUrl}/masters/branchgroups/${code}`,
    },
    TECHNICIAN: {
        getAll: `${environment.apiBaseUrl}/masters/techs/list`,
        getByCode: (code: string | number) => `${environment.apiBaseUrl}/masters/techengs/${code}`,
        create: `${environment.apiBaseUrl}/masters/techengs/add`,
        update: (code: string | number) => `${environment.apiBaseUrl}/masters/techengs/${code}`,
        delete: (code: string | number) => `${environment.apiBaseUrl}/masters/techengs/${code}`
    },
    ENGINEER: {
        getAll: `${environment.apiBaseUrl}/masters/techengs/list`,
        getByCode: (code: string | number) => `${environment.apiBaseUrl}/masters/techengs/${code}`,
        create: `${environment.apiBaseUrl}/masters/techengs/add`,
        update: (code: string | number) => `${environment.apiBaseUrl}/masters/techengs/${code}`,
        delete: (code: string | number) => `${environment.apiBaseUrl}/masters/techengs/${code}`
    },
    SPAREITEM: {
        getAll: `${environment.apiBaseUrl}/masters/spitems/list`,
        getByCode: (code: string | number) => `${environment.apiBaseUrl}/masters/spitems/${code}`,
        create: `${environment.apiBaseUrl}/masters/spitems/add`,
        update: (code: string | number) => `${environment.apiBaseUrl}/masters/spitems/${code}`,
        delete: (code: string | number) => `${environment.apiBaseUrl}/masters/spitems/${code}`
    },
    PRODUCTLINE: {
        getAll: `${environment.apiBaseUrl}/masters/productline/list`,
        getByCode: (code: string | number) => `${environment.apiBaseUrl}/masters/productline/${code}`,
        create: `${environment.apiBaseUrl}/masters/productline/add`,
        update: (code: string | number) => `${environment.apiBaseUrl}/masters/productline/${code}`,
        delete: (code: string | number) => `${environment.apiBaseUrl}/masters/productline/${code}`
    },
    PRODUCT: {
        getAll: `${environment.apiBaseUrl}/masters/prods/list`,
        getByCode: (code: string | number) => `${environment.apiBaseUrl}/masters/prods/${code}`,
        create: `${environment.apiBaseUrl}/masters/prods/add`,
        update: (code: string | number) => `${environment.apiBaseUrl}/masters/prods/${code}`,
        delete: (code: string | number) => `${environment.apiBaseUrl}/masters/prods/${code}`
    },
    PRODUCTGROUP: {
        getAll: `${environment.apiBaseUrl}/masters/prodgrps/list`,
        getByCode: (code: string | number) => `${environment.apiBaseUrl}/masters/prodgrps/${code}`,
        create: `${environment.apiBaseUrl}/masters/prodgrps/add`,
        update: (code: string | number) => `${environment.apiBaseUrl}/masters/prodgrps/${code}`,
        delete: (code: string | number) => `${environment.apiBaseUrl}/masters/prodgrps/${code}`
    },
    BRAND: {
        getAll: `${environment.apiBaseUrl}/masters/brands/list`,
        getByCode: (code: string | number) => `${environment.apiBaseUrl}/masters/brands/${code}`,
        create: `${environment.apiBaseUrl}/masters/brands/add`,
        update: (code: string | number) => `${environment.apiBaseUrl}/masters/brands/${code}`,
        delete: (code: string | number) => `${environment.apiBaseUrl}/masters/brands/${code}`,
    },
    RETAILERS: {
        getAll: `${environment.apiBaseUrl}/masters/retailers/list`,
        getByCode: (code: string | number) => `${environment.apiBaseUrl}/masters/retailers/${code}`,
        create: `${environment.apiBaseUrl}/masters/retailers/add`,
        update: (code: string | number) => `${environment.apiBaseUrl}/masters/retailers/${code}`,
        delete: (code: string | number) => `${environment.apiBaseUrl}/masters/retailers/${code}`
    },
    TAXES: {
        getAll: `${environment.apiBaseUrl}/masters/taxes/list`,
        getByCode: (code: string | number) => `${environment.apiBaseUrl}/masters/taxes/${code}`,
        create: `${environment.apiBaseUrl}/masters/taxes/add`,
        update: (code: string | number) => `${environment.apiBaseUrl}/masters/taxes/${code}`,
        delete: (code: string | number) => `${environment.apiBaseUrl}/masters/taxes/${code}`
    },
    COMMONCODE: {
        getAll: `${environment.apiBaseUrl}/masters/codes/list`,
        getByCode: (code: string | number) => `${environment.apiBaseUrl}/masters/codes/${code}`,
        create: `${environment.apiBaseUrl}/masters/codes/add`,
        update: (code: string | number) => `${environment.apiBaseUrl}/masters/codes/update`,
        delete: (code: string | number) => `${environment.apiBaseUrl}/masters/codes/${code}`
    },
    CUSTOMER: {
        getAll: `${environment.apiBaseUrl}/consumer/list`,
        getByCode: (code: string | number) => `${environment.apiBaseUrl}/consumer/${code}`,
        create: `${environment.apiBaseUrl}/consumer/add`,
    },
    CUSTOMER_OVERVIEW: {
        getByCode: (code: string | number) => `${environment.apiBaseUrl}/consumer/overview/${code}`,
    },
    CUSTOMER_ADDRESS: {
        getAll: `${environment.apiBaseUrl}/consumer/address/addresses`,
        getByCode: (code: string | number) => `${environment.apiBaseUrl}/consumer/address/${code}`,
        getByCodeParams: (code: string | number) => `${environment.apiBaseUrl}/consumer/addresses/${code}`,
        create: `${environment.apiBaseUrl}/consumer/address/add`,
        update: (code: string | number) => `${environment.apiBaseUrl}/consumer/address/${code}`,
        delete: (code: string | number) => `${environment.apiBaseUrl}/consumer/address/${code}`
    },
    CUSTOMER_CONSENT: {
        getAll: `${environment.apiBaseUrl}/consumer/consents/consent`,
        getByCode: (code: string | number) => `${environment.apiBaseUrl}/consumer/consent/${code}`,
        getByCodeParams: (code: string | number) => `${environment.apiBaseUrl}/consumer/consent/${code}`,
        create: `${environment.apiBaseUrl}/consumer/consent/add`,
        update: (code: string | number) => `${environment.apiBaseUrl}/consumer/consent/${code}`,
        delete: (code: string | number) => `${environment.apiBaseUrl}/consumer/consent/${code}`
    },
    CUSTOMER_PRODUCTS: {
        getAll: `${environment.apiBaseUrl}/cust/product/list`,
        getByCode: (code: string | number) => `${environment.apiBaseUrl}/cust/product/${code}`,
        getByCodeParams: (code: string | number) => `${environment.apiBaseUrl}/consumer/products/${code}`,
        create: `${environment.apiBaseUrl}/cust/product/add`,
        update: (code: string | number) => `${environment.apiBaseUrl}/cust/product/${code}`,
        delete: (code: string | number) => `${environment.apiBaseUrl}/cust/product/${code}`
    },
    CUSTOMER_REGISTRATION: {
        getAll: `${environment.apiBaseUrl}/consumer/list`,
        getByCode: (code: string | number) => `${environment.apiBaseUrl}/consumer/${code}`,
        create: `${environment.apiBaseUrl}/consumer/add`,
        update: (code: string | number) => `${environment.apiBaseUrl}/consumer/${code}`,
        delete: (code: string | number) => `${environment.apiBaseUrl}/consumer/${code}`
    },
    CUSTOMER_COMPLAINT: {
        getAll: `${environment.apiBaseUrl}/services/ticket/list`,
        getByCode: (code: string | number) => `${environment.apiBaseUrl}/consumer/${code}`,
        create: `${environment.apiBaseUrl}/consumer/add`,
        createWithParams: `${environment.apiBaseUrl}/services/ticket/list`,
        update: (code: string | number) => `${environment.apiBaseUrl}/consumer/${code}`,
        delete: (code: string | number) => `${environment.apiBaseUrl}/consumer/${code}`
    },
    COMPLAINT_OVERVIEW: {
        getAll: `${environment.apiBaseUrl}/consumer/list`,
        getByCode: (code: string | number) => `${environment.apiBaseUrl}/services/ticket/${code}/overview`,
        create: `${environment.apiBaseUrl}/consumer/add`,
        update: (code: string | number) => `${environment.apiBaseUrl}/consumer/${code}`,
        delete: (code: string | number) => `${environment.apiBaseUrl}/consumer/${code}`
    }
};

export const DROPDOWN_ENDPOINTS: { [key: string]: DropdownConfig } = {
    DYNAMIC_DROP_DOWN: {
        dropdown: `${environment.apiBaseUrl}/masters/options/dropdown`,
        options: `${environment.apiBaseUrl}/masters/options`,
    },
    COUNTRY: {
        dropdown: `${environment.apiBaseUrl}/masters/countries`
    }
};