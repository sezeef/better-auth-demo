import { ProcessEnvStringified } from "@/lib/env";

declare global {
    // Extending process.env with validated vars
    // WARN: This assumes strict runtime validations are ran on required
    //       env vars before any attempt as accessing them.
    namespace NodeJS {
        interface ProcessEnv extends ProcessEnvStringified {}
    }
}
