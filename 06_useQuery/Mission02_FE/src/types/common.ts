export type CommonResponse<T> = {
    status: boolean;
    statusCode: number;
    message: string;
    data: T;
};

export type CursorBasedresponse<T> = {
    status: boolean;
    statusCode: number;
    message: string;
    data: T;
    nextCursor: number;
    hasNext: boolean;
}

export type PaginationDto = {
    cursor?: number;
    limit?: number;
    search?: string;
    order?: "asc" | "desc";
}

export type CommentDto = {
    lpId: number;
    cursor?: number;
    limit?: number;
    order?: "asc" | "desc";
}