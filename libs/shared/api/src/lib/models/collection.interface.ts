export interface ICollection {
    id: string;
    name: string;
    description: string;
    privateCollection: boolean;
    createDate: string;
    updatedDate: string;
    userId: string; 
}

export type ICreateCollection = Pick<ICollection, 'name' | 'description' | 'privateCollection'>;
export type IUpdateCollection = Partial<Omit<ICollection, 'id'>>;
export type IUpsertCollection = ICollection;