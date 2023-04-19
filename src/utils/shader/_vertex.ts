export const vsSource = `
attribute vec4 a_position;
attribute vec3 a_normal;
attribute vec2 a_texcoord;
attribute vec4 a_color;
attribute vec3 a_tangent;
attribute vec3 a_bitangent;

uniform mat4 u_worldViewProjection;
uniform mat4 u_world;
uniform mat4 u_projectionMatrix;
uniform mat4 u_normalMatrix;
uniform mat4 u_modelMatrix;
uniform mat4 u_viewMatrix;

varying vec3 v_normal;
varying vec2 v_texcoord;
varying vec3 v_modelPosition;
varying vec3 v_viewModelPosition;


// All variables for Bump Mapping
varying mat3 v_tbn;

mat3 transpose(in mat3 inMatrix) {
  vec3 i0 = inMatrix[0];
  vec3 i1 = inMatrix[1];
  vec3 i2 = inMatrix[2];

  mat3 outMatrix = mat3(vec3(i0.x, i1.x, i2.x), vec3(i0.y, i1.y, i2.y), vec3(i0.z, i1.z, i2.z));

  return outMatrix;
}

void main() {

  // Multiply the position by the matrix.
  gl_Position = u_worldViewProjection * a_position;

  // orient the normals and pass to the fragment shader
  v_normal = mat3(u_world) * a_normal;

  v_texcoord = a_texcoord;

  // Bump mapping variables. 
  vec3 t = normalize(mat3(u_normalMatrix) * a_tangent);
  vec3 b = normalize(mat3(u_normalMatrix) * a_bitangent);
  vec3 n = normalize(mat3(u_normalMatrix) * a_normal);
  v_tbn = transpose(mat3(t, b, n));

  mat4 viewModelMatrix = u_viewMatrix * u_modelMatrix;
  // send the view position to the fragment shader
  v_modelPosition = vec3(a_position);
  v_viewModelPosition = vec3(u_worldViewProjection * a_position);

}
`;
