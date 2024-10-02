export abstract class IAuthUseCase {
    abstract authPinterest(userId: number, code: string): Promise<any>;
}
