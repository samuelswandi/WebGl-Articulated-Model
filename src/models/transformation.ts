export class Transformation {
    public translation: [number, number, number] = [0, 0, 0];
    public rotation: [number, number, number] = [0, 0, 0];
    public scale: [number, number, number] = [1, 1, 1];

    // set constructor
    constructor(translation : [number, number, number],  rotation : [number, number, number], scale : [number, number, number]) {
        this.translation = translation;
        this.rotation = rotation;
        this.scale = scale;
    }
}

export function negate(tr : Transformation) {
    return new Transformation(
        [-tr.translation[0], -tr.translation[1], -tr.translation[2]],
        [-tr.rotation[0], -tr.rotation[1], -tr.rotation[2]],
        [1 / tr.scale[0],  1 / tr.scale[1], 1 / tr.scale[2]]
    )
}