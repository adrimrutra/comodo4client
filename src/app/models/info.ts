import { Friend } from './friend';

export interface Info {
    id: string;
    index: number;
    guid: string;
    isActive: boolean;
    balance: string;
    picture: string;
    age: number;
    eyeColor: string;
    name: string;
    gender: string;
    company: string;
    email: string;
    phone: string;
    address: string;
    about: string;
    registered: string;
    latitude: number;
    longitude: number;
    tags: Array<string>;
    friends: Array<Friend>;
    greeting: string;
    favoriteFruit: string;
}
