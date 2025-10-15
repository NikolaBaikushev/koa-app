

import { config } from '../../config';
import jwt, { JsonWebTokenError } from 'jsonwebtoken';

type CreateTokenPayload = {
    id: number,
    username: string,
}

export function createToken(payload: CreateTokenPayload) {
    throw new Error('asd')
    return jwt.sign(payload, config.SECRET, { expiresIn: '1h' });
}