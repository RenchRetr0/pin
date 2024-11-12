export abstract class IAuthUseCase {
    abstract authPinterest(userId: number, code: string): Promise<string>;
    abstract refreshToken(userId: number): Promise<void>;
    abstract getAccessToken(login: string): Promise<string>;
}
