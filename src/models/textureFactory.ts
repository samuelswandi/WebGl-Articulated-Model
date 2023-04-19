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

  public loadImage(): WebGLTexture | null{
    const url = "../../assets/sun.jpg"
    return this.loadTexture2D(url)
  }
  
  public getBumpTexture(): WebGLTexture | null {
    const url = "/src/assets/bump.png"
    return this.loadTexture2D(url)
  }


  public environment(glManager: WebGlManager): WebGLTexture | null {
    const gl = glManager.gl
    
    const texture = gl.createTexture()
    gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture)
  
    gl.generateMipmap(gl.TEXTURE_CUBE_MAP)
    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR)
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

