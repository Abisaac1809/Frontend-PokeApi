import { pokeApiFetch } from './client';
import type { Move, MoveType } from '@/types/move';

export async function getMovesByType(typeName: string): Promise<MoveType> {
  return pokeApiFetch<MoveType>(`/type/${typeName}`);
}

export async function getMove(id: number | string): Promise<Move> {
  return pokeApiFetch<Move>(`/move/${id}`);
}
