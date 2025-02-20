import z, { type ZodIssue } from "zod";

export const envSchema = z.object({
    NEXT_PUBLIC_BASE_URL: z.string().url(),
    BETTER_AUTH_URL: z.string().url(),
    BETTER_AUTH_SECRET: z.string(),
    TURSO_DATABASE_URL: z.string().url(),
    TURSO_AUTH_TOKEN: z.string(),
    GITHUB_CLIENT_ID: z.string(),
    GITHUB_CLIENT_SECRET: z.string(),
});

export function errorMessageBuilder(errors: ZodIssue[]): string {
    return errors.reduce((acc, error, idx) => {
        return (
            acc + `   [${idx + 1}] ${error.path.join(".")}: ${error.message}\n`
        );
    }, "");
}

export function envValidator() {
    const bold = "\x1b[1m";
    const red = "\x1b[31m";
    const green = "\x1b[32m";
    const reset = "\x1b[0m";

    const result = envSchema.safeParse(process.env);

    if (result.error) {
        console.error(
            ` ${bold}${red}✗${reset} Environment variables validation failed:`,
        );
        console.error(errorMessageBuilder(result.error.errors));
        process.exit(1);
    }

    console.info(
        ` ${bold}${green}✓${reset} Environment variables validation passed`,
    );
}

// TS's type for process.env is fixed: vars are always
// strings at runtime, even if the zod schema
// validates/defines them as other types (URLs,
// numbers, etc.). We must align with it.
export type ProcessEnvStringified = {
    [K in keyof z.infer<typeof envSchema>]: string;
};

