const jwt = require("jsonwebtoken");
const jwtPassword = "secret";
const zod = require("zod");

/**
 * Generates a JWT for a given username and password.
 *
 * @param {string} username - The username to be included in the JWT payload.
 *                            Must be a valid email address.
 * @param {string} password - The password to be included in the JWT payload.
 *                            Should meet the defined length requirement (e.g., 6 characters).
 * @returns {string|null} A JWT string if the username and password are valid.
 *                        Returns null if the username is not a valid email or
 *                        the password does not meet the length requirement.
 */

const emailSchema = zod.string().email();
const passwordSchema = zod.string().min(6);

function signJwt(username, password) {

    const usernameResponse = emailSchema.safeParse(username);
    const passwordResponse = passwordSchema.safeParse(password);
    console.log(usernameResponse);
    console.log(passwordResponse)

    if (usernameResponse.success && passwordResponse.success) {
        const token = jwt.sign(
            {
                username,
            },
            jwtPassword,
        );
        console.log(token);
    } else {
        return null;
    }
}

//signJwt("izhar@gmail.com", "123456");

/**
 * Verifies a JWT using a secret key.
 *
 * @param {string} token - The JWT string to verify.
 * @returns {boolean} Returns true if the token is valid and verified using the secret key.
 *                    Returns false if the token is invalid, expired, or not verified
 *                    using the secret key.
 */

function verifyJwt(token) {
    try {
        const verify = jwt.verify(token, jwtPassword);
        console.log("verification status", verify);
    } catch (error) {
        console.log("Error ", error);
    }
}
verifyJwt("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Iml6aGFyIiwiaWF0IjoxNzIyMTY0NTk4fQ.TJjAtBlhLykczkA54QMLOyDc3o010ckaw7B_C9oYrKg");

/**
 * Decodes a JWT to reveal its payload without verifying its authenticity.
 *
 * @param {string} token - The JWT string to decode.
 * @returns {object|false} The decoded payload of the JWT if the token is a valid JWT format.
 *                         Returns false if the token is not a valid JWT format.
 */


function decodeJwt(token) {
    const decoded = jwt.decode(token);
    if (decoded) {
        return true;
    } else {
        return false;
    }

}

decodeJwt("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Iml6aGFyIiwiaWF0IjoxNzIyMTY0NTk4fQ.TJjAtBlhLykczkA54QMLOyDc3o010ckaw7B_C9oYrKg");
