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

export function negate(tr : Transformation) : Transformation {
    return new Transformation(
        [-tr.translation[0], -tr.translation[1], -tr.translation[2]],
        [-tr.rotation[0], -tr.rotation[1], -tr.rotation[2]],
        [1 / tr.scale[0],  1 / tr.scale[1], 1 / tr.scale[2]]
    )
}

export function backwardSum(src: Transformation[][],idxStart : number, idxEnd : number) : Transformation[]{
    let sumTr : Transformation[] = [];
    for (let i = 0; i < src[0].length; i++) 
        sumTr.push(new Transformation([0,0,0], [0,0,0], [1,1,1]));

    for (let i = idxStart + 1; i <= idxEnd; i++) {
        for (let j = 0 ; j < sumTr.length; j++) {
            sumTr[j].translation[0] -= src[i][j].translation[0];
            sumTr[j].translation[1] -= src[i][j].translation[1];
            sumTr[j].translation[2] -= src[i][j].translation[2];

            sumTr[j].rotation[0] -= src[i][j].rotation[0];
            sumTr[j].rotation[1] -= src[i][j].rotation[1];
            sumTr[j].rotation[2] -= src[i][j].rotation[2];

            sumTr[j].scale[0] /= src[i][j].scale[0];
            sumTr[j].scale[1] /= src[i][j].scale[1];
            sumTr[j].scale[2] /= src[i][j].scale[2];
        }
    }

    return sumTr;
}

export function forwardSum(src: Transformation[][], idx : number) : Transformation[] {
    let sumTr : Transformation[] = [];
    for (let i = 0; i < src[0].length; i++) 
        sumTr.push(new Transformation([0,0,0], [0,0,0], [1,1,1]));

    for (let i = idx + 1; i < src.length; i++) {
        for (let j = 0 ; j < sumTr.length; j++) {
            sumTr[j].translation[0] += src[i][j].translation[0];
            sumTr[j].translation[1] += src[i][j].translation[1];
            sumTr[j].translation[2] += src[i][j].translation[2];

            sumTr[j].rotation[0] += src[i][j].rotation[0];
            sumTr[j].rotation[1] += src[i][j].rotation[1];
            sumTr[j].rotation[2] += src[i][j].rotation[2];

            sumTr[j].scale[0] *= src[i][j].scale[0];
            sumTr[j].scale[1] *= src[i][j].scale[1];
            sumTr[j].scale[2] *= src[i][j].scale[2];
        }
    }

    console.log(sumTr)

    return sumTr;
}