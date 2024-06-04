import type { HallModel } from "./hall.model";
import type { MovieModel } from "./movie.model";

export interface ProjectionModel{
    projectionId: number,
    hallId: number,
    movieId: number,
    hall: HallModel,
    movie: MovieModel,
    startsAt: string,
    endsAt: string,
    projectionDate: string,
    createdAt: string,
    updatedAt: string
}