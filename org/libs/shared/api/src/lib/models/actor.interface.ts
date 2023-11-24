export enum Nationality {
    English = "English",
    American = "American",
    Dutch = "Dutch"
}

export interface IActor {
    id: string,
    name: string,
    birthdate: Date,
    nationality: string,
    photo: string
}

export type ICreateActor = Pick<
IActor,
'name' | 'birthdate' | 'nationality' | 'photo'
>;

export type IUpdateActor = IActor;