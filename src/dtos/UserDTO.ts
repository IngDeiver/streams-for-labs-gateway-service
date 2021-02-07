/* eslint-disable no-empty-function */
/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-constructor */

import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

/**
 *
 * DTO for user 
 * @category DTOs
 * @class UserDTO
 * @param {string} username - A username 
 */
class UserDTO {
    @IsNotEmpty()
    @IsString()
    public username: string;

    @IsNotEmpty()
    @IsEmail()
    public email: string

    @IsNotEmpty()
    @IsString()
    public oaid: string

    /**
   * Creates an instance of UserDTO.
   * @param {string} username - the name user
   * @param {string} email - the email user
   * @memberof UserDTO
   */
    constructor(username: string, email: string, oaid: string) {
      this.username = username;
      this.email = email;
      this.oaid = oaid;
    }
}

export default UserDTO;
