import Model from "../models/model";
import { Cube } from "./cube";

export const Sheep : Model = {
    "name" : "Body",
    "shape" : Cube,
    "translation" : [40, -40, -10],
    "rotation" : [0, 0, 0],
    "scale" : [2, 0.7, 1.1],
    "children" : [
        {
            "name" : "Head",
            "shape" : Cube,
            "translation" : [120,0, 0],
            "rotation" : [0, 0, 0],
            "scale" : [0.8, 0.8, 0.8],
            "children" : []
        },
        {
            "name" : "Left Back Leg",
            "shape" : Cube,
            "translation" : [-150, -172.5, -40],
            "rotation" : [0, 0, 0],
            "scale" : [0.3, 1.25, 0.3],
            "children" : []
        },
        {
            "name" : "Right Back Leg",
            "shape" : Cube,
            "translation" : [-150, -172.5, 40],
            "rotation" : [0, 0, 0],
            "scale" : [0.3, 1.25, 0.3],
            "children" : []
        },
        {
            "name" : "Left Front Leg",
            "shape" : Cube,
            "translation" : [60, -172.5, -40],
            "rotation" : [0, 0, 0],
            "scale" : [0.3, 1.25, 0.3],
            "children" : []
        },
        {
            "name" : "Right Front Leg",
            "shape" : Cube,
            "translation" : [60, -172.5, 40],
            "rotation" : [0, 0, 0],
            "scale" : [0.3, 1.25, 0.3],
            "children" : []
        },
    ]
}