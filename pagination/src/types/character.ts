export interface Character {
  id: number;
  name: string;
  status: "Alive" | "unknown" | "Dead";
  type: string;
  url: string;
  image: string
}