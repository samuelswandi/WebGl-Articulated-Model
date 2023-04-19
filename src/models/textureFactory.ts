import { isPowerOf2 } from "../math/mat4";
import WebGlManager from "../utils/webgl/_manager";


export class TextureFactory {
  glManager: WebGlManager;
  gl: WebGLRenderingContext;

  private static instance: TextureFactory | null;

  static getInstance(glManager: WebGlManager) {
    if (this.instance == null){
      this.instance = new TextureFactory(glManager);
    } else {
      this.instance.setWebGlManager(glManager)
    }
    return this.instance
  }

  private constructor(glManager: WebGlManager){
    this.glManager = glManager;
    this.gl = glManager.gl;
  }

  public setWebGlManager(glManager: WebGlManager) {
    this.glManager = glManager
    this.gl = glManager.gl
  }

  public getImageTexture(): WebGLTexture | null{
    const url = "/src/assets/sun.jpg"
    return this.loadTexture2D(url)
  }
  
  public getBumpTexture(): WebGLTexture | null {
    const url = "/src/assets/bump.png"
    return this.loadTexture2D(url)
  }


  public getEnvironmentTexture(): WebGLTexture | null {
    // Create the texture.
    let texture = this.gl.createTexture()

    // Bind the texture.
    this.gl.bindTexture(this.gl.TEXTURE_CUBE_MAP, texture);

    const faceInfos = [
      {
        target: this.gl.TEXTURE_CUBE_MAP_POSITIVE_X,
        url: '/src/assets/pos-x.jpg',
      },
      {
        target: this.gl.TEXTURE_CUBE_MAP_NEGATIVE_X,
        url: '/src/assets/neg-x.jpg',
      },
      {
        target: this.gl.TEXTURE_CUBE_MAP_POSITIVE_Y,
        url: '/src/assets/pos-y.jpg',
      },
      {
        target: this.gl.TEXTURE_CUBE_MAP_NEGATIVE_Y,
        url: '/src/assets/neg-y.jpg',
      },
      {
        target: this.gl.TEXTURE_CUBE_MAP_POSITIVE_Z,
        url: '/src/assets/pos-z.jpg',
      },
      {
        target: this.gl.TEXTURE_CUBE_MAP_NEGATIVE_Z,
        url: '/src/assets/neg-z.jpg',
      },
    ];
    faceInfos.forEach((faceInfo) => {
      const { target, url } = faceInfo;

      // Upload the canvas to the cubemap face.
      const level = 0;
      const internalFormat = this.gl.RGBA;
      const width = 512;
      const height = 512;
      const format = this.gl.RGBA;
      const type = this.gl.UNSIGNED_BYTE;

      // setup each face so it's immediately renderable
      this.gl.texImage2D(target, level, internalFormat, width, height, 0, format, type, null);

      // Asynchronously load an image
      const image = new Image();
      image.src = url;
      image.crossOrigin = "";   // ask for CORS permission
      
      const gl = this.gl;
      image.addEventListener('load', function () {
        // Now that the image has loaded make copy it to the texture.
        gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);
        gl.texImage2D(target, level, internalFormat, format, type, image);
        gl.generateMipmap(gl.TEXTURE_CUBE_MAP);
      });
    });
    this.gl.generateMipmap(this.gl.TEXTURE_CUBE_MAP);
    this.gl.texParameteri(this.gl.TEXTURE_CUBE_MAP, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR_MIPMAP_LINEAR);

    return texture;
  }

  public loadTexture2D(imageUrl: string): WebGLTexture | null {

    const gl = this.gl
    const texture = this.gl.createTexture()
    gl.bindTexture(gl.TEXTURE_2D, texture)

    const level = 0;
    const internalFormat = gl.RGBA;
    const width = 1;
    const height = 1;
    const border = 0;
    const srcFormat = gl.RGBA;
    const srcType = gl.UNSIGNED_BYTE;
    const pixel = new Uint8Array([0, 0, 0, 255]);
    gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, width, height, border, srcFormat, srcType,
      pixel);

    var image = new Image();
    image.src = imageUrl;
    image.crossOrigin = ""; 
    image.addEventListener('load', function () {
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
      if (isPowerOf2(image.width) && isPowerOf2(image.height)) {
        gl.generateMipmap(gl.TEXTURE_2D);
      } else {
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      }
      console.log("loaded")
    });

    return texture;
  }
}

