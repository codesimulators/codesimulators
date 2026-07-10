import { RoomType } from './enums';

export class Room {
    constructor(
        public readonly number: string,
        public readonly type: RoomType,
    ) {}
}