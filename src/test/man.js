import { TEXTURE, PROJECTION, SHAPE } from "../types/const.js";

export const Man = {
    "name": "Body",
    "shape" : SHAPE.CUBE,
    "texture": TEXTURE.ENVIRONMENT,
    "projection" : PROJECTION.PERSPECTIVE,
    "trans_obj": [0,0, -30],
    "rot_obj": [20, 20, 0],
    "scale_obj": [1,2,1],
    "tl_subtr": [0, 125, 0],
    "rot_subtr": [0, 0, 0],
    "scale_subtr": [1, 1, 1],
    "children": [
        {
            "name": "Head",
            "shape" : SHAPE.CUBE,
            "texture": TEXTURE.ENVIRONMENT,
            "projection" : PROJECTION.PERSPECTIVE,
            "trans_obj": [0,2.6, -29],
            "rot_obj": [20, 20, 0],
            "scale_obj": [0.6,0.6,0.6],
            "tl_subtr": [0, 125, 0],
            "rot_subtr": [0, 0, 0],
            "scale_subtr": [1, 1, 1],
            "children": []
        },
        {
            "name": "Left Arm",
            "shape" : SHAPE.CUBE,
            "texture": TEXTURE.ENVIRONMENT,
            "projection" : PROJECTION.PERSPECTIVE,
            "trans_obj": [-1.6,0, -30],
            "rot_obj": [20, 20, 0],
            "scale_obj": [0.5,1.5,0.5],
            "tl_subtr": [0, 125, 0],
            "rot_subtr": [0, 0, 0],
            "scale_subtr": [1, 1, 1],
            "children": []
        },
        {
            "name": "Right Arm",
            "shape" : SHAPE.CUBE,
            "texture": TEXTURE.ENVIRONMENT,
            "projection" : PROJECTION.PERSPECTIVE,
            "trans_obj": [1.8,0.5, -32.5],
            "rot_obj": [20, 20, 0],
            "scale_obj": [0.5,1.5,0.5],
            "tl_subtr": [0, 125, 0],
            "rot_subtr": [0, 0, 0],
            "scale_subtr": [1, 1, 1],
            "children": []
        },
        {
            "name": "Left Leg",
            "shape" : SHAPE.CUBE,
            "texture": TEXTURE.ENVIRONMENT,
            "projection" : PROJECTION.PERSPECTIVE,
            "trans_obj": [-0.3,-3.5, -31],
            "rot_obj": [20, 20, 0],
            "scale_obj": [0.25,1.5,0.6],
            "tl_subtr": [0, 125, 0],
            "rot_subtr": [0, 0, 0],
            "scale_subtr": [1, 1, 1],
            "children": []
        },
        {
            "name": "Right Leg",
            "shape" : SHAPE.CUBE,
            "texture": TEXTURE.ENVIRONMENT,
            "projection" : PROJECTION.PERSPECTIVE,
            "trans_obj": [0.7,-3.4, -32],
            "rot_obj": [20, 20, 0],
            "scale_obj": [0.25,1.5,0.6],
            "tl_subtr": [0, 125, 0],
            "rot_subtr": [0, 0, 0],
            "scale_subtr": [1, 1, 1],
            "children": []
        },
    ]
}