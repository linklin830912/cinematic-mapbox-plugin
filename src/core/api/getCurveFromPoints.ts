import { api } from "./client";

export type Point = {
  x: number;
  y: number;
  z: number;
};

export async function getCurveFromPoints(points: Point[]) {
  const res = await api.post("/curve", {
    points,
  });

  return res.data;
}