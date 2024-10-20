export abstract class IValidateDateUseCase {
    abstract validateDateAndTime(dateTime: Date): Promise<void>;
}
