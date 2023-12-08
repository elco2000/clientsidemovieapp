export interface IReview {
    id: string;
    title: string;
    text: string;
    rating: number;
    date: string;
    userId: string;
}

export interface IReviewInfo {
    id: string;
    title: string;
    text: string;
    rating: number;
    date: string;
    userId: string;
    username: string;
}

export type ICreateReview = Pick<IReview, 'title' | 'text' | 'rating'>;
export type IUpdateReview = Partial<Omit<IReview, 'id'>>;
export type IUpsertReview = IReview;