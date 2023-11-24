import { ICreateActor, IUpdateActor } from "@org/shared/api";
import { IsDate, IsNotEmpty, IsString } from "class-validator";

export class CreateActorDto implements ICreateActor {

    constructor(data: Partial<ICreateActor>) { Object.assign(this, data) }

    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsDate()
    @IsNotEmpty()
    birthdate!: Date;

    @IsString()
    @IsNotEmpty()
    nationality!: string;

    @IsString()
    @IsNotEmpty()
    photo!: string;
}

export class UpdateActorDto implements IUpdateActor {

    constructor(data: Partial<IUpdateActor>) { Object.assign(this, data) }

    @IsString()
    @IsNotEmpty()
    id!: string;

    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsDate()
    @IsNotEmpty()
    birthdate!: Date;

    @IsString()
    @IsNotEmpty()
    nationality!: string;

    @IsString()
    @IsNotEmpty()
    photo!: string;
}
