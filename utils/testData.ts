import userRaw from "../data/users.json";
import {User} from "../types/user";

type UserData = Record<string, User>;

export const users: UserData = userRaw as UserData;

export function getUser(key: string): User{
    const user = users[key];
    if (!user){
        throw new Error(`User key not found in users.json:${key}`);
    }
    return user;

}