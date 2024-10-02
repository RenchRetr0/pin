import { Provider } from '@nestjs/common';
import { CreateBoardProvider } from './create';

export const BoardProviders: Provider[] = [CreateBoardProvider];
