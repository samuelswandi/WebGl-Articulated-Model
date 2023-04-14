import { Cube } from "../cube"
import Model from "../../models/model"
import { Transformation } from "../../models/transformation"

export const ManAnimation : Transformation[][] = [
    // 0
    [
        { "translation" : [0, 0, 0], "rotation" : [0, 0, 0], "scale" : [1, 1, 1] },
        { "translation" : [0, 0, 0], "rotation" : [0, 0, 0], "scale" : [1, 1, 1] },
        { "translation" : [0, 0, 0], "rotation" : [0, 0, 0], "scale" : [1, 1, 1] },
        { "translation" : [0, 0, 0], "rotation" : [0, 0, 0], "scale" : [1, 1, 1] },
        { "translation" : [0, 0, 0], "rotation" : [0, 0, 0], "scale" : [1, 1, 1] },
        { "translation" : [0, 0, 0], "rotation" : [0, 0, 0], "scale" : [1, 1, 1] },
    ],
    // 1
    [
        { "translation" : [0, 0, 0], "rotation" : [0, 0, 0], "scale" : [1, 1, 1] },
        { "translation" : [0, 0, 0], "rotation" : [0, 0, 0], "scale" : [1, 1, 1] },
        { "translation" : [30, -60, 0], "rotation" : [0, 0, 0.6], "scale" : [1, 1, 1] },
        { "translation" : [0, 0, 0], "rotation" : [0, 0, 0], "scale" : [1, 1, 1] },
        { "translation" : [0, 0, 0], "rotation" : [0, 0, 0], "scale" : [1, 1, 1] },
        { "translation" : [0, 0, 0], "rotation" : [0, 0, 0], "scale" : [1, 1, 1] },
    ],
    // 2
    [
        { "translation" : [0, 0, 0], "rotation" : [0, 0, 0], "scale" : [1, 1, 1] },
        { "translation" : [0, 0, 0], "rotation" : [0, 0, 0], "scale" : [1, 1, 1] },
        { "translation" : [0, -130, 0], "rotation" : [0, 0, 1], "scale" : [1, 1, 1] },
        { "translation" : [0, 0, 0], "rotation" : [0, 0, 0], "scale" : [1, 1, 1] },
        { "translation" : [0, 0, 0], "rotation" : [0, 0, 0], "scale" : [1, 1, 1] },
        { "translation" : [0, 0, 0], "rotation" : [0, 0, 0], "scale" : [1, 1, 1] },
    ],
    // 3
    [
        { "translation" : [0, 0, 0], "rotation" : [0, 0, 0], "scale" : [1, 1, 1] },
        { "translation" : [0, 0, 0], "rotation" : [0, 0, 0], "scale" : [1, 1, 1] },
        { "translation" : [-100, -70, 0], "rotation" : [0, 0, 1], "scale" : [1, 1, 1] },
        { "translation" : [0, 0, 0], "rotation" : [0, 0, 0], "scale" : [1, 1, 1] },
        { "translation" : [0, 0, 0], "rotation" : [0, 0, 0], "scale" : [1, 1, 1] },
        { "translation" : [0, 0, 0], "rotation" : [0, 0, 0], "scale" : [1, 1, 1] },
    ],
    // 4
    [
        { "translation" : [0, 0, 0], "rotation" : [0, 0, 0], "scale" : [1, 1, 1] },
        { "translation" : [0, 0, 0], "rotation" : [0, 0, 0], "scale" : [1, 1, 1] },
        { "translation" : [50, 25, 0], "rotation" : [0, 0, -0.5], "scale" : [1, 1, 1] },
        { "translation" : [0, 0, 0], "rotation" : [0, 0, 0], "scale" : [1, 1, 1] },
        { "translation" : [0, 0, 0], "rotation" : [0, 0, 0], "scale" : [1, 1, 1] },
        { "translation" : [0, 0, 0], "rotation" : [0, 0, 0], "scale" : [1, 1, 1] },
    ],
    // 5
    [
        { "translation" : [0, 0, 0], "rotation" : [0, 0, 0], "scale" : [1, 1, 1] },
        { "translation" : [0, 0, 0], "rotation" : [0, 0, 0], "scale" : [1, 1, 1] },
        { "translation" : [-50, -25, 0], "rotation" : [0, 0, 0.5], "scale" : [1, 1, 1] },
        { "translation" : [0, 0, 0], "rotation" : [0, 0, 0], "scale" : [1, 1, 1] },
        { "translation" : [0, 0, 0], "rotation" : [0, 0, 0], "scale" : [1, 1, 1] },
        { "translation" : [0, 0, 0], "rotation" : [0, 0, 0], "scale" : [1, 1, 1] },
    ],
    // 6
    [
        { "translation" : [0, 0, 0], "rotation" : [0, 0, 0], "scale" : [1, 1, 1] },
        { "translation" : [0, 0, 0], "rotation" : [0, 0, 0], "scale" : [1, 1, 1] },
        { "translation" : [50, 25, 0], "rotation" : [0, 0, -0.5], "scale" : [1, 1, 1] },
        { "translation" : [0, 0, 0], "rotation" : [0, 0, 0], "scale" : [1, 1, 1] },
        { "translation" : [0, 0, 0], "rotation" : [0, 0, 0], "scale" : [1, 1, 1] },
        { "translation" : [0, 0, 0], "rotation" : [0, 0, 0], "scale" : [1, 1, 1] },
    ],
    // 7
    [
        { "translation" : [0, 0, 0], "rotation" : [0, 0, 0], "scale" : [1, 1, 1] },
        { "translation" : [0, 0, 0], "rotation" : [0, 0, 0], "scale" : [1, 1, 1] },
        { "translation" : [-50, -25, 0], "rotation" : [0, 0, 0.5], "scale" : [1, 1, 1] },
        { "translation" : [0, 0, 0], "rotation" : [0, 0, 0], "scale" : [1, 1, 1] },
        { "translation" : [0, 0, 0], "rotation" : [0, 0, 0], "scale" : [1, 1, 1] },
        { "translation" : [0, 0, 0], "rotation" : [0, 0, 0], "scale" : [1, 1, 1] },
    ],
    // 8
    [
        { "translation" : [0, 0, 0], "rotation" : [0, 0, 0], "scale" : [1, 1, 1] },
        { "translation" : [0, 0, 0], "rotation" : [0, 0, 0], "scale" : [1, 1, 1] },
        { "translation" : [100, 70, 0], "rotation" : [0, 0, -1], "scale" : [1, 1, 1] },
        { "translation" : [0, 0, 0], "rotation" : [0, 0, 0], "scale" : [1, 1, 1] },
        { "translation" : [0, 0, 0], "rotation" : [0, 0, 0], "scale" : [1, 1, 1] },
        { "translation" : [0, 0, 0], "rotation" : [0, 0, 0], "scale" : [1, 1, 1] },
    ],
    // 9
    [
        { "translation" : [0, 0, 0], "rotation" : [0, 0, 0], "scale" : [1, 1, 1] },
        { "translation" : [0, 0, 0], "rotation" : [0, 0, 0], "scale" : [1, 1, 1] },
        { "translation" : [0, 130, 0], "rotation" : [0, 0, -1], "scale" : [1, 1, 1] },
        { "translation" : [0, 0, 0], "rotation" : [0, 0, 0], "scale" : [1, 1, 1] },
        { "translation" : [0, 0, 0], "rotation" : [0, 0, 0], "scale" : [1, 1, 1] },
        { "translation" : [0, 0, 0], "rotation" : [0, 0, 0], "scale" : [1, 1, 1] },
    ],
    // 10
    [
        { "translation" : [0, 0, 0], "rotation" : [0, 0, 0], "scale" : [1, 1, 1] },
        { "translation" : [0, 0, 0], "rotation" : [0, 0, 0], "scale" : [1, 1, 1] },
        { "translation" : [-30, 60, 0], "rotation" : [0, 0, -0.6], "scale" : [1, 1, 1] },
        { "translation" : [0, 0, 0], "rotation" : [0, 0, 0], "scale" : [1, 1, 1] },
        { "translation" : [0, 0, 0], "rotation" : [0, 0, 0], "scale" : [1, 1, 1] },
        { "translation" : [0, 0, 0], "rotation" : [0, 0, 0], "scale" : [1, 1, 1] },
    ],
    // WALKING 11
    [
        { "translation" : [0, 0, 0], "rotation" : [0, 0, 0], "scale" : [1, 1, 1] },
        { "translation" : [0, 0, 0], "rotation" : [0, 0, 0], "scale" : [1, 1, 1] },
        { "translation" : [0, 0, 0], "rotation" : [0, 0, 0], "scale" : [1, 1, 1] },
        { "translation" : [0, 0, 0], "rotation" : [0, 0, 0], "scale" : [1, 1, 1] },
        { "translation" : [0, 0, 0], "rotation" : [0, 0, 0], "scale" : [1, 1, 1] },
        { "translation" : [0, 0, 0], "rotation" : [0, 0, 0], "scale" : [1, 1, 1] },
    ],
]