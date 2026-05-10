import type { CursorBasedresponse } from "./common";

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
        published: string;
        authorId: number;
        createdAt: Date;
        updatedAt: Date;
        tags: Tag[];
        likes: Likes[];
    }[];
}>