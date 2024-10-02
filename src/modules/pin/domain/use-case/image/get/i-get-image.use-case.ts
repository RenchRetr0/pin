import { ImageModel } from "@pin/domain/model";

export abstract class IGetImageUseCase
{
    abstract getById(imageId: number): Promise<ImageModel | null>
}