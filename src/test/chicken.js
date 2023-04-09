import { TEXTURE, PROJECTION, SHAPE } from "../types/const.js";

export const Chicken = {
    "name": "Body",
    "shape" : SHAPE.CUBE,
    "texture": TEXTURE.ENVIRONMENT,
    "projection" : PROJECTION.PERSPECTIVE,
    "trans_obj": [0,0, -30],
    "rot_obj": [20, -30, 0],
    "scale_obj": [2,1,1.5],
    "tl_subtr": [0, 125, 0],
    "rot_subtr": [0, 0, 0],
    "scale_subtr": [1, 1, 1],
    "children": [
        {
            "name": "Head",
            "shape" : SHAPE.CUBE,
            "texture": TEXTURE.ENVIRONMENT,
            "projection" : PROJECTION.PERSPECTIVE,
            "trans_obj": [2,1, -28.5],
            "rot_obj": [20, -30, 0],
            "scale_obj": [0.9,0.9,0.9],
            "tl_subtr": [0, 125, 0],
            "rot_subtr": [0, 0, 0],
            "scale_subtr": [1, 1, 1],
            "children": [
                {
                    "name": "Mouth",
                    "shape" : SHAPE.CUBE,
                    "texture": TEXTURE.ENVIRONMENT,
                    "projection" : PROJECTION.PERSPECTIVE,
                    "trans_obj": [3,0.75, -28],
                    "rot_obj": [20, -30, 0],
                    "scale_obj": [0.8,0.2,0.75],
                    "tl_subtr": [0, 125, 0],
                    "rot_subtr": [0, 0, 0],
                    "scale_subtr": [1, 1, 1],
                    "children": []
                }
            ]
        },
        {
            "name": "Left Leg",
            "shape" : SHAPE.CUBE,
            "texture": TEXTURE.ENVIRONMENT,
            "projection" : PROJECTION.PERSPECTIVE,
            "trans_obj":[0.5,-2, -32],
            "rot_obj": [20, -30, 0],
            "scale_obj": [0.2,1,0.2],
            "tl_subtr": [0, 125, 0],
            "rot_subtr": [0, 0, 0],
            "scale_subtr": [1, 1, 1],
            "children": [
                {
                    "name": "Left Sole",
                    "shape" : SHAPE.CUBE,
                    "texture": TEXTURE.ENVIRONMENT,
                    "projection" : PROJECTION.PERSPECTIVE,
                    "trans_obj":[0.7,-3, -32.25],
                    "rot_obj": [20, -30, 0],
                    "scale_obj": [0.7,0.2,0.2],
                    "tl_subtr": [0, 125, 0],
                    "rot_subtr": [0, 0, 0],
                    "scale_subtr": [1, 1, 1],
                    "children" : []
                }
            ]
        },
        {
            "name": "Right Leg",
            "shape" : SHAPE.CUBE,
            "texture": TEXTURE.ENVIRONMENT,
            "projection" : PROJECTION.PERSPECTIVE,
            "trans_obj": [-0.5,-2, -30],
            "rot_obj": [20, -30, 0],
            "scale_obj": [0.2,1,0.2],
            "tl_subtr": [0, 125, 0],
            "rot_subtr": [0, 0, 0],
            "scale_subtr": [1, 1, 1],
            "children": [
                {
                    "name": "Right Sole",
                    "shape" : SHAPE.CUBE,
                    "texture": TEXTURE.ENVIRONMENT,
                    "projection" : PROJECTION.PERSPECTIVE,
                    "trans_obj": [-0.4,-2.9, -30.25],
                    "rot_obj": [20, -30, 0],
                    "scale_obj": [0.7,0.2,0.2],
                    "tl_subtr": [0, 125, 0],
                    "rot_subtr": [0, 0, 0],
                    "scale_subtr": [1, 1, 1],
                    "children" : []
                }
            ]
        },
        {
            "name": "Right Wing",
            "shape" : SHAPE.CUBE,
            "texture": TEXTURE.ENVIRONMENT,
            "projection" : PROJECTION.PERSPECTIVE,
            "trans_obj": [-0.5,-0.25, -29],
            "rot_obj": [20, -30, 0],
            "scale_obj": [0.75,0.6,1.25],
            "tl_subtr": [0, 125, 0],
            "rot_subtr": [0, 0, 0],
            "scale_subtr": [1, 1, 1],
            "children": []
        }
    ]
}