import passport from 'koa-passport';
import { Strategy as JwtStrategy, ExtractJwt, type StrategyOptions } from 'passport-jwt';
import { config } from '../../config';
import { data } from '../../data/users';
import { JwtTokenPayload } from '../utils/createToken';
import { authService } from '../services/authService';
import { User } from '../schemas/models/userEntitySchema';


const opts: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.SECRET
};

passport.use(
    new JwtStrategy(opts, async (payload: JwtTokenPayload, done) => {
        const user: User | null = await authService.getUser(payload.id, payload.username);
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    })
);

export default passport;