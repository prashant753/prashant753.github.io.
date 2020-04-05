export const BASE_URL = 'http://advantage-api-dev.eastus.cloudapp.azure.com';
export const ANONYMOUS_ROUTES = ['/signin', '/register'];
export const REFRESH_TOKEN_STORAGE_KEY = 'refresh_token';
export const AUTH_TOKEN_STORAGE_KEY = 'auth_token';
export const USER_ID = 'user_id';
export const USER_EMAIL = 'user_email';
export const SUPER_ADMIN = 'super_admin';
export const AUTH_TOKEN_EXPIRED_MESSAGE = 'jwt expired';
export const DEFAULT_ERROR_MESSAGE = `Oops, something's not right`;
export const ERR_PERMISSIONS_NOT_FOUND = `ERR_PERMISSIONS_NOT_FOUND`;
export const ERR_FORBIDDEN = `ERR_FORBIDDEN`;

export const HTTP_STATUS_CODES = {
  Ok: 200,
  Created: 201,
  NoContent: 204,
  BadRequest: 400,
  Unauthorized: 401,
  Forbidden: 403,
  NotFound: 404,
  Conflict: 409,
  UnprocessableEntity: 422,
  InternalServerError: 500,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
};
