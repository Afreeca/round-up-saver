import { plainToInstance } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString, validateSync } from 'class-validator';

class EnvironmentVariables {
  @IsNotEmpty()
  @IsNumber()
  APP_PORT: number;

  @IsNotEmpty()
  @IsString()
  APP_NAME: string;

  @IsString()
  NODE_ENV: string;

  @IsNotEmpty()
  @IsString()
  STARLING_SANDBOX_HOST: string;

  @IsNotEmpty()
  @IsString()
  STARLING_CLIENT_ID: string;

  @IsNotEmpty()
  @IsString()
  STARLING_SECRET: string;
}

/**
 * Function to validate and transform the provided configuration object
 * @param config - The configuration object to validate.
 * @returns An instance of EnvironmentVariables with validated values.
 * @throws Error if there are validation errors.
 */
export function validate(config: Record<string, unknown>) {
  // Convert the plain object to an instance of EnvironmentVariables class
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });

  // Validate the instance based on class-validator decorators
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(
      `${errors.toString()} \n******** Please ensure that the .dev.env file is correctly created and configured.*****\n`,
    );
  }

  return validatedConfig;
}
