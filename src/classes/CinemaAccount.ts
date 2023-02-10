import { randomUUID } from "crypto";

export class CinemaAccount {
    private UUID: string = randomUUID();
    constructor(
        private username: string,
        private password: string
    ){
    }
    public getUsername(){
        return this.username;
    }
    public getPassword(){
        return this.password;
    }
    public getUUID(){
        return this.UUID;
    }
}