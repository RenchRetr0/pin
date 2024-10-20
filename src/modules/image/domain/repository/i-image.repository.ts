import { CreateImageDto } from '../dto';
import { ImageModel } from '../model';

export abstract class IImageRepository {
    abstract findById(imageId: number): Promise<ImageModel | null>;
    abstract findByIdWithUser(imageId: number): Promise<ImageModel | null>;
    abstract findAllByUserId(userId: number): Promise<ImageModel[]>;
    abstract findAllSendImageTime(): Promise<ImageModel[]>;
    abstract create(createImageDto: CreateImageDto): Promise<ImageModel>;
    abstract update(imageId: number, imageModel: ImageModel): Promise<void>;
}
