export const vsSource = `
attribute vec4 a_position;
attribute vec3 a_normal;
attribute vec2 a_texcoord;

uniform mat4 u_worldViewProjection;
uniform mat4 u_world;

varying vec3 v_normal;
varying vec2 v_texcoord;

void main() {
  // Multiply the position by the matrix.
  gl_Position = u_worldViewProjection * a_position;

  // orient the normals and pass to the fragment shader
  v_normal = mat3(u_world) * a_normal;

  v_texcoord = a_texcoord;
}
`;
