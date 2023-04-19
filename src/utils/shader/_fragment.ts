export const fsSource = `
precision mediump float;

// Passed in from the vertex shader.
varying vec3 v_normal;

uniform vec3 u_reverseLightDirection;
uniform vec4 u_color;

uniform bool u_shading;
uniform int u_textureMode;

// Passed in from the vertex shader.
varying vec2 v_texcoord;

// The texture.
uniform sampler2D u_texture;
uniform sampler2D u_texture_image;
uniform samplerCube u_texture_environment;
uniform sampler2D u_texture_bump;

// position of camera
uniform vec3 u_worldCameraPosition;

varying mat3 v_tbn;

// The position of object.
varying vec3 v_modelPosition;
varying vec3 v_viewModelPosition;

void main() {
  highp vec4 texelColor = texture2D(u_texture, v_texcoord);
  vec3 normal = normalize(v_normal);
  float light = dot(normal, u_reverseLightDirection);

  if(u_textureMode == 1) {
    gl_FragColor = texture2D(u_texture_image, v_texcoord);
  } else if(u_textureMode == 2) {
    // Reflection direction.
    vec3 eyeToSurfaceDir = normalize(v_modelPosition - u_worldCameraPosition);
    vec3 reflectionDir = reflect(eyeToSurfaceDir, v_normal);
    
    gl_FragColor = textureCube(u_texture_environment, reflectionDir);
  } else if (u_textureMode == 3) {
    // Fragment position and lighting position.
    vec3 fragPos = v_tbn * v_viewModelPosition;
    vec3 lightPos = v_tbn * u_reverseLightDirection;
  
    // Lighting direction and ambient.
    vec3 lightDir = normalize(lightPos - fragPos);
    vec3 albedo = texture2D(u_texture_bump, v_texcoord).rgb;
    vec3 ambient = 0.3 * albedo;
    // Lighting diffuse.
    vec3 norm = normalize(texture2D(u_texture_bump, v_texcoord).rgb * 2.0 - 1.0);
    float diffuse = max(dot(lightDir, norm), 0.0);
    gl_FragColor = vec4(albedo + ambient, 1.0);
  } else {
    gl_FragColor = u_color;
  }
  
  if (u_shading) {
    gl_FragColor.rgb *= light;
  }
}
`;
