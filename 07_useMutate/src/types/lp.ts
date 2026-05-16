import type { Author } from "./auth";
import type { CommonResponse, CursorBasedresponse } from "./common";

export type Tag = {
    id: number;
    name: string;
}

export type Likes = {
    id: number;
    userId: number;
    lpId: number;
}

export type responseLpListDto = CursorBasedresponse<{
    data: {
        id: number;
        title: string;
        content: string;
        thumbnail: string;
        published: boolean;
        authorId: number;
        createdAt: Date;
        updatedAt: Date;
        tags: Tag[];
        likes: Likes[];
    }[];
}>


export type responseLpDetailDto = CommonResponse<{
    id: number;
    title: string;
    content: string;
    thumbnail: string;
    published: boolean;
    authorId: number;
    createdAt: Date;
    updatedAt: Date;
    tags: Tag[];
    likes: Likes[];
    author: Author;
}>

export type responseCommentsDto = CommonResponse<{
    data: {
        id: number;
        content: string;
        lpId: number;
        authorId: number;
        createdAt: Date;
        updatedAt: Date;
        author: Author;
    }[]
    nextCursor: number | null;
    hasNext: boolean;
}>