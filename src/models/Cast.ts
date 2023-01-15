export type Person = {
  id: number;
  name: string;
  image: {
    medium: string;
    original: string;
  };
};

export type Cast = Person[];
