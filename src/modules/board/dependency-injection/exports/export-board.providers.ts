import { Provider } from '@nestjs/common';
import { GetBoardProvider } from '../providers/domain/get';

export const ExportBoardProviders: Provider[] = [GetBoardProvider];
