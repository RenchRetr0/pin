import { Provider } from "@nestjs/common";
import { IImageRepository } from "@pin/domain/repository";
import { ImageRepository } from "@pin/storages/repository";

export const ImageProvider: Provider =
{
    provide: IImageRepository,
    useClass: ImageRepository
}