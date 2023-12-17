import { jwtDecode } from 'jwt-decode';

const decryptToken = (token) => jwtDecode(token);
export default decryptToken;
