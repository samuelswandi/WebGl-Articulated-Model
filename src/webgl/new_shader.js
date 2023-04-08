const vsSource3 = `
    attribute vec4 a_position;
    attribute vec4 a_color;
    attribute vec3 a_normal;
    attribute vec3 a_tangent;
    attribute vec3 a_bitangent;

    attribute vec2 a_textureCoord;

    uniform mat4 u_projectionMatrix;
    uniform mat4 u_viewMatrix;
    uniform mat4 u_modelMatrix;
    uniform mat4 u_normalMatrix;

    varying vec4 v_color;

    varying vec3 v_modelPosition;
    varying vec3 v_viewModelPosition;
    varying vec3 v_worldNormal;
    varying vec2 v_textureCoord;

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
        // View model matrix.
        mat4 viewModelMatrix = u_viewMatrix * u_modelMatrix;

        // Multiply the position by the matrix.
        gl_Position = u_projectionMatrix * viewModelMatrix * a_position;

        // send the view position to the fragment shader
        v_modelPosition = vec3(u_modelMatrix * a_position);
        v_viewModelPosition = vec3(viewModelMatrix * a_position);

        // orient the normals and pass to the fragment shader
        v_worldNormal = mat3(u_modelMatrix) * a_normal;

        // Pass the color to the fragment shader.
        v_color = a_color;

        // Pass the texcoord to the fragment shader.
        //v_textureCoord = a_textureCoord;

        // Bump mapping variables. 
        vec3 t = normalize(mat3(u_normalMatrix) * a_tangent);
        vec3 b = normalize(mat3(u_normalMatrix) * a_bitangent);
        vec3 n = normalize(mat3(u_normalMatrix) * a_normal);
        v_tbn = transpose(mat3(t, b, n));
    }
`

const fsSource3 = `
    precision mediump float;

    uniform vec3 u_reverseLightDirection;

    // Shading parameters.
    uniform bool u_shadingOn;

    // Texture parameters.
    uniform int u_textureMode;
    varying vec2 v_textureCoord;

    // The position of the camera
    uniform vec3 u_worldCameraPosition;

    // The position of object.
    varying vec3 v_modelPosition;
    varying vec3 v_viewModelPosition;

    // The normal of object.
    varying vec3 v_worldNormal;

    // Passed in from the vertex shader.
    varying vec4 v_color;

    // The texture.
    uniform sampler2D u_texture_image;
    uniform samplerCube u_texture_environment;
    uniform sampler2D u_texture_bump;

    // All variables for Bump Mapping
    varying mat3 v_tbn;

    void main() {
        // Normalize the normal.
        vec3 worldNormal = normalize(v_worldNormal);

        // Lighting Effect.
        vec3 ambientLight = vec3(0.3, 0.3, 0.3);
        float directionalLight = dot(worldNormal, u_reverseLightDirection);
        vec3 light = ambientLight + directionalLight;

        // Default color is from buffer.
        gl_FragColor = v_color;

        // Set the color to the texture.
        if(u_textureMode == 0) {
            gl_FragColor = texture2D(u_texture_image, v_textureCoord);
        } else if(u_textureMode == 1) {
            // Reflection direction.
            vec3 eyeToSurfaceDir = normalize(v_modelPosition - u_worldCameraPosition);
            vec3 reflectionDir = reflect(eyeToSurfaceDir, worldNormal);

            gl_FragColor = textureCube(u_texture_environment, reflectionDir);
        } else if(u_textureMode == 2) {
            // Fragment position and lighting position.
            vec3 fragPos = v_tbn * v_viewModelPosition;
            vec3 lightPos = v_tbn * u_reverseLightDirection;

            // Lighting direction and ambient.
            vec3 lightDir = normalize(lightPos - fragPos);
            vec3 albedo = texture2D(u_texture_bump, v_textureCoord).rgb;
            vec3 ambient = 0.3 * albedo;
            // Lighting diffuse.
            vec3 norm = normalize(texture2D(u_texture_bump, v_textureCoord).rgb * 2.0 - 1.0);
            float diffuse = max(dot(lightDir, norm), 0.0);

            gl_FragColor = vec4(diffuse * albedo + ambient, 1.0);
        }

        // Set the shading.
        if(u_shadingOn) {
            gl_FragColor.rgb *= light;
        }

    }
`