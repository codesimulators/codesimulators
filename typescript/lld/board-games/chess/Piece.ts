import { PieceType } from './PieceType';

export interface Piece {
    symbol: string;
    color: string;   // hex: '#FFFFFF' | '#000000'
    type: PieceType;
}