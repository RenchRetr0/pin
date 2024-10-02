import { Inject, Injectable } from "@nestjs/common";
import { IUpdateUserUseCase } from "./i-update-user.use-case";
import { IUserRepository } from "@user/domain/repository";
import { UpdateUserDto } from "@user/domain/dto";
import { IGetUserUseCase } from "../get";
import { UserModel } from "@user/domain/model";

@Injectable()
export class UpdateUserUseCase implements IUpdateUserUseCase
{
    constructor(
        @Inject(IUserRepository)
        private readonly userRepository: IUserRepository,
        @Inject(IGetUserUseCase)
        private readonly getUserUseCase: IGetUserUseCase
    ){}

    async update(userId: number, updateUserDto: UpdateUserDto): Promise<void>
    {
        const oldUserModel = await this.getUserUseCase.getById(userId);
        try
        {
            if(oldUserModel)
            {
                const newUserModel: UserModel =
                {
                    id: oldUserModel.id,
                    login: oldUserModel.login,
                    accessToken: updateUserDto.accessToken,
                    refreshToken: updateUserDto.refreshToken
                };
                await this.userRepository.update(userId, newUserModel);
            }
        }
        catch(error)
        {
            console.log(error);
        }
    }
}