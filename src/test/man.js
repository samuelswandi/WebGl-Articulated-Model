import { TEXTURE, PROJECTION, SHAPE } from "../types/const.js";

export const Man = {
    "name": "Body",
    "shape" : SHAPE.CUBE,
    "texture": TEXTURE.ENVIRONMENT,
    "projection" : PROJECTION.PERSPECTIVE,
    "trans_obj": [0, 0, -20],
    "rot_obj": [20, 45, 85],
    "scale_obj": [1, 2, 1],
    "trans_tree": [0, 0, -20],
    "rot_tree": [20, 45, 45],
    "scale_tree": [1, 1, 1],
    "children": [
        {
            "name": "Head",
            "shape" : SHAPE.CUBE,
            "texture": TEXTURE.ENVIRONMENT,
            "projection" : PROJECTION.PERSPECTIVE,
            "trans_obj": [0,0, -30],
            "rot_obj": [0, 0, 0],
            "scale_obj": [0.5, 0.5, 0.5],
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
            "trans_obj": [10, 0, -30],
            "rot_obj": [0, 30, 0],
            "scale_obj": [0.5, 0.5, 0.5],
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
            "trans_obj": [20,10, -30],
            "rot_obj": [0, 45,45],
            "scale_obj": [0.5, 0.5, 0.5],
            "tl_subtr": [0, 125, 0],
            "rot_subtr": [0, 0, 0],
            "scale_subtr": [1, 1, 1],
            "children": []
        },
    ]
}