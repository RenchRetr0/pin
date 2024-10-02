import { Provider } from "@nestjs/common";
import { CreatePinProvider } from "./create";

export const PinProviders: Provider[] =
[
    CreatePinProvider
]