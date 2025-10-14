import passport from 'koa-passport';
import { Strategy as JwtStrategy, ExtractJwt, type StrategyOptions } from 'passport-jwt';
import { config } from '../../config';
import { data } from '../../data/users';


const opts: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.SECRET
};

passport.use(
    new JwtStrategy(opts, (payload, done) => {
        // TODO: Change later when db is included -> This functions verifies data ... 
        const user = data.users.find(u => u.id === payload.id);
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    })
);

export default passport;