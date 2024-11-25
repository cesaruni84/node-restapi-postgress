
export default class tokenResponse {
    constructor(jwt, type, expiresIn) {
        this.jwt = jwt;
        this.type = type;
        this.expiresIn = expiresIn;
    }
}