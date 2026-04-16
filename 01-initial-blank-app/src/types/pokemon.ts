export interface Pokemon {
  id: number;
  name: string;
  description: string;
  type: PokemonType;
  spriteId: number;
}

export type PokemonType =
  | 'fire'
  | 'water'
  | 'grass'
  | 'electric'
  | 'psychic'
  | 'normal'
  | 'poison'
  | 'ground'
  | 'fairy'
  | 'bug'
  | 'rock'
  | 'ghost'
  | 'dragon'
  | 'ice'
  | 'fighting';

export const TYPE_COLORS: Record<PokemonType, string> = {
  fire: '#F08030',
  water: '#6890F0',
  grass: '#78C850',
  electric: '#F8D030',
  psychic: '#F85888',
  normal: '#A8A878',
  poison: '#A040A0',
  ground: '#E0C068',
  fairy: '#EE99AC',
  bug: '#A8B820',
  rock: '#B8A038',
  ghost: '#705898',
  dragon: '#7038F8',
  ice: '#98D8D8',
  fighting: '#C03028',
};

export const POKEMON_TYPES: PokemonType[] = Object.keys(TYPE_COLORS) as PokemonType[];

export const getSpriteUrl = (spriteId: number) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${spriteId}.png`;
