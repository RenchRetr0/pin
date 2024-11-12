import { ReqCreateImageDto, ReqCreateImageTimeDto } from '@image/domain/dto';

export abstract class ICreateImageUseCase {
    abstract createImage(
        reqCreateImageDto: ReqCreateImageDto,
        imageName: string,
    ): Promise<void>;
    abstract createImageTime(
        reqCreateImageTimeDto: ReqCreateImageTimeDto,
        imageName: string,
    ): Promise<void>;
}
