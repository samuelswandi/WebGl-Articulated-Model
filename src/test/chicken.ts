import Model from "../models/model";
import { Cube } from "./cube";

export const Chicken : Model = {
    "name" : "Body",
    "shape" : Cube,
    "shading": true,
    "textureType": 0,
    "translation" : [40, -40, 0],
    "rotation" : [0, 0, 0],
    "scale" : [0.8, 0.8, 1.1],
    "children" : [
        {
            "name" : "Head",
            "shape" : Cube,
            "shading": true,
            "textureType": 0,
            "translation" : [30,70,70],
            "rotation" : [0, 0, 0],
            "scale" : [0.55, 0.55, 0.55],
            "children" : [
                {
                    "name" : "Mouth",
                    "shape" : Cube,
                    "shading": true,
                    "textureType": 0,
                    "translation" : [30,80,140],
                    "rotation" : [0, 0, 0],
                    "scale" : [0.55, 0.15, 0.35],
                    "children" : []
                }
            ]
        },
        {
            "name" : "Left Wing",
            "shape" : Cube,
            "shading": true,
            "textureType": 0,
            "translation" : [82.5, -20, 10],
            "rotation" : [0, 0, 0],
            "scale" : [0.2, 0.5, 0.6],
            "children" : []
        },
        {
            "name" : "Right Wing",
            "shape" : Cube,
            "shading": true,
            "textureType": 0,
            "translation" : [-62.5, -20, 10],
            "rotation" : [0, 0, 0],
            "scale" : [0.2, 0.5, 0.6],
            "children" : []
        },
        {
            "name" : "Left Leg",
            "shape" : Cube,
            "shading": true,
            "textureType": 0,
            "translation" : [30, -147.5, 0],
            "rotation" : [0, 0, 0],
            "scale" : [0.15, 0.75, 0.15],
            "children" : [
                {
                    "name" : "Left Telapak",
                    "shape" : Cube,
                    "shading": true,
                    "textureType": 0,
                    "translation" : [35, -157.5, 10],
                    "rotation" : [0, 0, 0],
                    "scale" : [0.25, 0.15, 0.35],
                    "children" : []
                }
            ]
        },
        {
            "name" : "Right Leg",
            "shape" : Cube,
            "shading": true,
            "textureType": 0,
            "translation" : [-10, -147.5, 0],
            "rotation" : [0, 0, 0],
            "scale" : [0.15, 0.75, 0.15],
            "children" : [
                {
                    "name" : "Right Telapak",
                    "shape" : Cube,
                    "shading": true,
                    "textureType": 0,
                    "translation" : [-5, -157.5, 10],
                    "rotation" : [0, 0, 0],
                    "scale" : [0.25, 0.15, 0.35],
                    "children" : []
                }
            ]
        },
    ]
}