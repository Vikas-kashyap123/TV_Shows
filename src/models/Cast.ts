
export type Person = {
    id: number;
    image?: {
        medium: string;
        original: string;
    };
    name: string
}

export type Cast = Person[]