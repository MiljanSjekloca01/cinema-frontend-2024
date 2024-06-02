export interface MovieModel{
    movieId: number,
    title: string,
    genre: string[],
    releaseYear: string,
    description: string,
    image: string,
    main_actors: string[],
    duration: number;
    startsShowing: string;
    createdAt: string,
    updatedAt:string
}