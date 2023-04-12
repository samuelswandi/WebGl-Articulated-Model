import Shape from "../models/shape"

export const Cube: Shape = {
    "num_vertices": 48,
    "positions": [
        // bawah
        -70, -70, -70,
        -70, 70, -70,
        70, -70, -70,
        -70, 70, -70,
        70, 70, -70,
        70, -70, -70,

        // atas
        -70, -70, 70,
        70, -70, 70,
        -70, 70, 70,
        -70, 70, 70,
        70, -70, 70,
        70, 70, 70,

        // belakang
        -70, 70, -70,
        -70, 70, 70,
        70, 70, -70,
        -70, 70, 70,
        70, 70, 70,
        70, 70, -70,

        // depan
        -70, -70, -70,
        70, -70, -70,
        -70, -70, 70,
        -70, -70, 70,
        70, -70, -70,
        70, -70, 70,

        // kiri
        -70, -70, -70,
        -70, -70, 70,
        -70, 70, -70,
        -70, -70, 70,
        -70, 70, 70,
        -70, 70, -70,

        // kanan
        70, -70, -70,
        70, 70, -70,
        70, -70, 70,
        70, -70, 70,
        70, 70, -70,
        70, 70, 70,
    ],
    "normals": 
    [
        // atas
        0, 0, 1, 
        0, 0, 1, 
        0, 0, 1, 
        0, 0, 1, 
        0, 0, 1, 
        0, 0, 1,

        // bawah
        0, 0, -1, 
        0, 0, -1, 
        0, 0, -1, 
        0, 0, -1, 
        0, 0, -1, 
        0, 0, -1,

        // belakang
        0, -1, 0, 
        0, -1, 0, 
        0, -1, 0, 
        0, -1, 0, 
        0, -1, 0, 
        0, -1, 0,

        // depan
        0, 1, 0, 
        0, 1, 0, 
        0, 1, 0, 
        0, 1, 0, 
        0, 1, 0, 
        0, 1, 0,
        
        // kiri
        -1, 0, 0, 
        -1, 0, 0, 
        -1, 0, 0, 
        -1, 0, 0, 
        -1, 0, 0, 
        -1, 0, 0,
        
        // kanan
        1, 0, 0, 
        1, 0, 0, 
        1, 0, 0, 
        1, 0, 0, 
        1, 0, 0, 
        1, 0, 0,
    ],
    "colors": [
        256, 28, 196,
        256, 28, 196,
        256, 28, 196,
        256, 28, 196,

        256, 28, 196,
        256, 28, 196,
        256, 28, 196,
        256, 28, 196,

        256, 28, 196,
        256, 28, 196,
        256, 28, 196,
        256, 28, 196,

        256, 28, 196,
        256, 28, 196,
        256, 28, 196,
        256, 28, 196,

        256, 28, 196,
        256, 28, 196,
        256, 28, 196,
        256, 28, 196,

        256, 28, 196,
        256, 28, 196,
        256, 28, 196,
        256, 28, 196,
    ],
    "textureCoord": [
        0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0,
        0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1,
        0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1,
        0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0,
        0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1,
        1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1
    ]
}