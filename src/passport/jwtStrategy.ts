import { User } from '../models';
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

const opts = {
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : 
    `-----BEGIN RSA PUBLIC KEY-----
    MIIBCgKCAQEAst0QhV3d+owVRDE9qy1RjqG67cij32bt+0PutmZKzGnU2+A6JQ2w
    xTg9q89MoYN+mnyNgcURMwgK+MbyfvqWLSaNK88KexI2GQ4IDFLldHk25VSZHnrk
    YBl9vxIqGYSlWRGlTVPoCCvx8f+CNCyVomEU9g98N0cUtp/873hSp6jEyzP76ZKP
    9gY7ykF8QcjnpU/+5gPxlBtdp69c7VUREk8654NskW6HVgGVJLE3hAUGcvdFFGIJ
    hslDgA864e5v6/vG5xL5wutFMIoGALNPVq2BgZ50wnqP0s/Zgw8bCtZQCQH1Elxm
    r7heStYxGqM9La1mfQs9ZBitEiNud8VGWwIDAQAB
    -----END RSA PUBLIC KEY-----`.replace(/\n\s+/g, "\n"),
}


const jwtStrategy = new JwtStrategy(opts, function(jwt_payload: any, done: Function) {
    User.findOne({ oaid: jwt_payload.email}, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    });
})

export default jwtStrategy