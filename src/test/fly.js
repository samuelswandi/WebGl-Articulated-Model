import { TEXTURE, PROJECTION, SHAPE } from "../types/const.js";

export const Fly = {
    "name": "Body",
    "shape" : SHAPE.CUBE,
    "texture": TEXTURE.ENVIRONMENT,
    "projection" : PROJECTION.PERSPECTIVE,
    "trans_obj": [-0.7,0, -30],
    "rot_obj": [20,-30, 0],
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
            "trans_obj": [2,-0.2, -28.5],
            "rot_obj": [20, -30, 0],
            "scale_obj": [1.0,1.1,1.3],
            "tl_subtr": [0, 125, 0],
            "rot_subtr": [0, 0, 0],
            "scale_subtr": [1, 1, 1],
            "children": [
                {
                    "name": "Left Eye",
                    "shape" : SHAPE.CUBE,
                    "texture": TEXTURE.ENVIRONMENT,
                    "projection" : PROJECTION.PERSPECTIVE,
                    "trans_obj": [3.5,0.8, -29],
                    "rot_obj": [20, -30, 0],
                    "scale_obj": [0.4,0.6,0.6],
                    "tl_subtr": [0, 125, 0],
                    "rot_subtr": [0, 0, 0],
                    "scale_subtr": [1, 1, 1],
                    "children": []
                },
                {
                    "name": "Right Eye",
                    "shape" : SHAPE.CUBE,
                    "texture": TEXTURE.ENVIRONMENT,
                    "projection" : PROJECTION.PERSPECTIVE,
                    "trans_obj": [1.5,-0.1, -22],
                    "rot_obj": [20, -30, 0],
                    "scale_obj": [0.4,0.6,0.6],
                    "tl_subtr": [0, 125, 0],
                    "rot_subtr": [0, 0, 0],
                    "scale_subtr": [1, 1, 1],
                    "children": []
                },
                {
                    "name": "Mouth",
                    "shape" : SHAPE.CUBE,
                    "texture": TEXTURE.ENVIRONMENT,
                    "projection" : PROJECTION.PERSPECTIVE,
                    "trans_obj": [3,-1.4, -28],
                    "rot_obj": [20, -30, -20],
                    "scale_obj": [0.3,0.2,0.2],
                    "tl_subtr": [0, 125, 0],
                    "rot_subtr": [0, 0, 0],
                    "scale_subtr": [1, 1, 1],
                    "children": []
                }
            ]
        },
        {
            "name": "Right Wing",
            "shape" : SHAPE.CUBE,
            "texture": TEXTURE.ENVIRONMENT,
            "projection" : PROJECTION.PERSPECTIVE,
            "trans_obj": [-2.5,1.2, -30],
            "rot_obj": [20, 90, 0],
            "scale_obj": [2,0.2,3],
            "tl_subtr": [0, 125, 0],
            "rot_subtr": [0, 0, 0],
            "scale_subtr": [1, 1, 1],
            "children": []
        },
        {
            "name": "Left Wing",
            "shape" : SHAPE.CUBE,
            "texture": TEXTURE.ENVIRONMENT,
            "projection" : PROJECTION.PERSPECTIVE,
            "trans_obj": [0,1.9, -32],
            "rot_obj": [20, 0, 0],
            "scale_obj": [2,0.2,3],
            "tl_subtr": [0, 125, 0],
            "rot_subtr": [0, 0, 0],
            "scale_subtr": [1, 1, 1],
            "children": []
        }
    ]
}