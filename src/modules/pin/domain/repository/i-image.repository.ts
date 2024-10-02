import { CreateImageDto } from '../dto';
import { ImageModel } from '../model';

export abstract class IImageRepository {
    abstract findById(imageId: number): Promise<ImageModel | null>;
    abstract create(createImageDto: CreateImageDto): Promise<ImageModel>;
}
