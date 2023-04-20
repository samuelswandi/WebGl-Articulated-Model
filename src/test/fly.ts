import Model from "../models/model";
import { Cube } from "./cube";

export const Fly : Model = {
    "name" : "Body",
    "shape" : Cube,
    "shading": true,
    "textureType": 0,
    "translation" : [40, -40, -10],
    "rotation" : [0, 0, 0],
    "scale" : [2, 0.7, 1.1],
    "children" : [
        {
            "name" : "Head",
            "shape" : Cube,
            "shading": true,
            "textureType": 0,
            "translation" : [140,-30, 0],
            "rotation" : [0, 0, 0],
            "scale" : [0.8, 0.8, 0.8],
            "children" : [
                {
                    "name" : "Left Eye",
                    "shape" : Cube,
                    "shading": true,
                    "textureType": 0,
                    "translation" : [150, 0, -40],
                    "rotation" : [0, 0, 0],
                    "scale" : [0.6, 0.6, 0.4],
                    "children" : []
                },
                {
                    "name" : "Right Eye",
                    "shape" : Cube,
                    "shading": true,
                    "textureType": 0,
                    "translation" : [150, 0, 40],
                    "rotation" : [0, 0, 0],
                    "scale" : [0.6, 0.6, 0.4],
                    "children" : []
                },
            ]
        },
        {
            "name" : "Left Wing",
            "shape" : Cube,
            "shading": true,
            "textureType": 0,
            "translation" : [-20,50, 70],
            "rotation" : [0, 0, 0],
            "scale" : [1.9, 0.1, 0.8],
            "children" : []
        },
        {
            "name" : "Left Wing",
            "shape" : Cube,
            "shading": true,
            "textureType": 0,
            "translation" : [-20,50, -65],
            "rotation" : [0, 0, 0],
            "scale" : [1.9, 0.1, 0.8],
            "children" : []
        },
        {
            "name" : "Left Back Leg",
            "shape" : Cube,
            "shading": true,
            "textureType": 0,
            "translation" : [-150, -100, -40],
            "rotation" : [0, 0, 0],
            "scale" : [0.3, 0.6, 0.3],
            "children" : []
        },
        {
            "name" : "Right Back Leg",
            "shape" : Cube,
            "shading": true,
            "textureType": 0,
            "translation" : [-150, -100, 40],
            "rotation" : [0, 0, 0],
            "scale" : [0.3, 0.6, 0.3],
            "children" : []
        },
        {
            "name" : "Left Middle Leg",
            "shape" : Cube,
            "shading": true,
            "textureType": 0,
            "translation" : [-45, -100, -40],
            "rotation" : [0, 0, 0],
            "scale" : [0.3, 0.6, 0.3],
            "children" : []
        },
        {
            "name" : "Right Middle Leg",
            "shape" : Cube,
            "shading": true,
            "textureType": 0,
            "translation" : [-45, -100, 40],
            "rotation" : [0, 0, 0],
            "scale" : [0.3, 0.6, 0.3],
            "children" : []
        },
        {
            "name" : "Left Front Leg",
            "shape" : Cube,
            "shading": true,
            "textureType": 0,
            "translation" : [60, -100, -40],
            "rotation" : [0, 0, 0],
            "scale" : [0.3, 0.6, 0.3],
            "children" : []
        },
        {
            "name" : "Right Front Leg",
            "shape" : Cube,
            "shading": true,
            "textureType": 0,
            "translation" : [60, -100, 40],
            "rotation" : [0, 0, 0],
            "scale" : [0.3, 0.6, 0.3],
            "children" : []
        },
    ]
}