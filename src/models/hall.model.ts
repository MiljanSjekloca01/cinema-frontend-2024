export interface HallModel{
    hallId: number,
    name: string,
    capacity: number,
    projectionType: "2D" | "3D",
    createdAt: string,
    updatedAt: string
}