import { BearerStrategy }from 'passport-azure-ad'
import { IUser } from '../interfaces';
import { User } from '../models';
import { UserService } from '../services';

const options = {
    identityMetadata: "https://login.microsoftonline.com/618bab0f-20a4-4de3-a10c-e20cee96bb35/v2.0/.well-known/openid-configuration",
    clientID: "4ffd1ea7-1b1d-4ad6-96d5-916315128e56",
  };
   
  const AzurebearerStrategy = new BearerStrategy(options,
    async function(token, done) {
     
      // Search user
      User.findOne({ oaid: token.oid }, async function(err: Error, user: IUser) {
        console.log("OFFICE USER: ", user);
        
        if (err) {
          return done(err);
        }

        // Create if not exist 
        if (!user) {
          const {oid, preferred_username, name} = token
          console.log('User was added automatically as they were new. Their oid is: ', oid);
        
          // create user
          try {
            const newUser:IUser = await UserService
            .create(new User({username: name, oaid: oid, email: preferred_username}))
            // pass user to next request
            return done(null, newUser)

          } catch (error) { // If fail the create method
            return done(error, false)
          }

        }
        
        // if exist pass user to next request
        return done(null, user);
      });
    }
  );

  export default AzurebearerStrategy