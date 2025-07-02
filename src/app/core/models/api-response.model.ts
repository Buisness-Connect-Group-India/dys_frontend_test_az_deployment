export interface ApiResponse<T> {
    status: 'SUCCESS' | 'FAILURE';
    message: string;
    payload: ApiPayload<T>
}
export interface ApiPayload<T> {
    data: T;
    pageNumber?: number;
    pageSize?: number;
    totalElements?: number;
    totalPages?: number;
    lastPage?: boolean;
}