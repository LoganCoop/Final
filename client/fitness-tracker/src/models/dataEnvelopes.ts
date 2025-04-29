export interface DataEnvelope<T> {
    data: T;
    success: boolean;
    message?: string;
}

export interface PaginatedDataEnvelope<T> extends DataEnvelope<T> {
    currentPage: number;
    totalPages: number;
    totalItems: number;
}