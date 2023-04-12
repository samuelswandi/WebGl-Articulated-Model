import Model from "../models/model";
import { Cube } from "./cube";

export const Man : Model = {
    "name" : "Body",
    "shape" : Cube,
    "translation" : [40, -40, 0],
    "rotation" : [0, 0, 0],
    "scale" : [0.75, 1.5, 0.6],
    "children" : [
        {
            "name" : "Head",
            "shape" : Cube,
            "translation" : [30,155, 0],
            "rotation" : [0, 0, 0],
            "scale" : [0.55, 0.55, 0.55],
            "children" : []
        },
        {
            "name" : "Left Arm",
            "shape" : Cube,
            "translation" : [95, -20, 10],
            "rotation" : [0, 0, 0],
            "scale" : [0.3, 1.25, 0.3],
            "children" : []
        },
        {
            "name" : "Right Arm",
            "shape" : Cube,
            "translation" : [-60, -20, 10],
            "rotation" : [0, 0, 0],
            "scale" : [0.3, 1.25, 0.3],
            "children" : []
        },
        {
            "name" : "Left Leg",
            "shape" : Cube,
            "translation" : [-10, -222.5, 0],
            "rotation" : [0, 0, 0],
            "scale" : [0.3, 1.25, 0.3],
            "children" : []
        },
        {
            "name" : "Right Leg",
            "shape" : Cube,
            "translation" : [45, -222.5, 0],
            "rotation" : [0, 0, 0],
            "scale" : [0.3, 1.25, 0.3],
            "children" : []
        },
    ]
}