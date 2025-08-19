export interface Software {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  version: string;
  size: string;
  rating: number;
  downloads: string;
  releaseDate: string;
  isVerified: boolean;
  downloadLinks: string[];
}
