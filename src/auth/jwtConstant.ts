import { ConfigService } from "@nestjs/config";

function getConfigService(): ConfigService {
    return new ConfigService();
}

export const JWT_CONSTANT = {
    SECRET: getConfigService().get("SECRET"),
    EXPIRES_IN: getConfigService().get("EXPIRES_IN")
}