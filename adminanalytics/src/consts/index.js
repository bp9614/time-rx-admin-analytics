export const COLLECTIONS = [
  'CloudTrail',
  'Cognito',
  'DynamoDB',
  'History',
];
export const DJANGO_URL = 'http://localhost:8000/';
export const LOGIN_ERROR_MESSAGE = 'INCORRECT USERNAME OR PASSWORD';
export const AXIOS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': [
    'GET',
    'POST',
    'PATCH',
    'PUT',
    'DELETE',
    'OPTIONS'
  ],
  'Access-Control-Allow-Headers': [
    'Origin',
    'Content-Type',
    'X-Auth-Token'
  ],
};