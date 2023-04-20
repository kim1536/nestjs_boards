import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { UserRepository } from './user.repository';
import { User } from "./user.entity";

@Injectable()
export class JetStrategy extends PassportStrategy(Strategy) {
    constructor(private userRepository:UserRepository){
        super({
            secretOrKey:'test1234',
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        })
    }

    async validare(payload){
        const { username } = payload;
        const user: User = await this.userRepository.findOneBy({username});

        if(!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}