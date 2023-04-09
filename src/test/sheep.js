import { TEXTURE, PROJECTION, SHAPE } from "../types/const.js";

export const Sheep = {
    "name": "Body",
    "shape" : SHAPE.CUBE,
    "texture": TEXTURE.ENVIRONMENT,
    "projection" : PROJECTION.PERSPECTIVE,
    "trans_obj": [0,0, -30],
    "rot_obj": [20, 20, 0],
    "scale_obj": [3,1,2],
    "tl_subtr": [0, 125, 0],
    "rot_subtr": [0, 0, 0],
    "scale_subtr": [1, 1, 1],
    "children": [
        {
            "name": "Head",
            "shape" : SHAPE.CUBE,
            "texture": TEXTURE.ENVIRONMENT,
            "projection" : PROJECTION.PERSPECTIVE,
            "trans_obj": [3,1.5, -30],
            "rot_obj": [20, 20, 0],
            "scale_obj": [1,1,1],
            "tl_subtr": [0, 125, 0],
            "rot_subtr": [0, 0, 0],
            "scale_subtr": [1, 1, 1],
            "children": []
        },
        {
            "name": "Leg Front Left",
            "shape" : SHAPE.CUBE,
            "texture": TEXTURE.ENVIRONMENT,
            "projection" : PROJECTION.PERSPECTIVE,
            "trans_obj": [2,-2.5, -38],
            "rot_obj": [20, 20, 0],
            "scale_obj": [0.5,1.5,0.5],
            "tl_subtr": [0, 125, 0],
            "rot_subtr": [0, 0, 0],
            "scale_subtr": [1, 1, 1],
            "children": []
        },
        {
            "name": "Leg Front Right",
            "shape" : SHAPE.CUBE,
            "texture": TEXTURE.ENVIRONMENT,
            "projection" : PROJECTION.PERSPECTIVE,
            "trans_obj": [2.8,-2.5, -33],
            "rot_obj": [20, 20, 0],
            "scale_obj": [0.5,1.5,0.5],
            "tl_subtr": [0, 125, 0],
            "rot_subtr": [0, 0, 0],
            "scale_subtr": [1, 1, 1],
            "children": []
        },
        {
            "name": "Leg Back Left",
            "shape" : SHAPE.CUBE,
            "texture": TEXTURE.ENVIRONMENT,
            "projection" : PROJECTION.PERSPECTIVE,
            "trans_obj": [-2,-2.5, -35],
            "rot_obj": [20, 20, 0],
            "scale_obj": [0.5,1.5,0.5],
            "tl_subtr": [0, 125, 0],
            "rot_subtr": [0, 0, 0],
            "scale_subtr": [1, 1, 1],
            "children": []
        },
        {
            "name": "Leg Back Right",
            "shape" : SHAPE.CUBE,
            "texture": TEXTURE.ENVIRONMENT,
            "projection" : PROJECTION.PERSPECTIVE,
            "trans_obj": [-1,-2.5, -30],
            "rot_obj": [20, 20, 0],
            "scale_obj": [0.5,1.5,0.5],
            "tl_subtr": [0, 125, 0],
            "rot_subtr": [0, 0, 0],
            "scale_subtr": [1, 1, 1],
            "children": []
        },
    ]
}