export interface CocktailItem {
  id: string;
  name: string,
  compound: string[],
  type: string,
  isExpanded: boolean,
  isLike: boolean,
  alcohol: string[],
  liqueurs: string[],
  image: string,
  glass?: string,
}
