export abstract class IRequestPinUseCase {
    abstract requestSave(imageId: number): Promise<void>;
}
