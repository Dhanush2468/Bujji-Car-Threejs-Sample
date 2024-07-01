import React, { useEffect } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Mesh } from "three";

export function Bujji() {
  const gltf = useLoader(
    GLTFLoader,
    process.env.PUBLIC_URL + "models/Bujji/scene.gltf"
  );

  useEffect(() => {
    // Adjust scale, position, and rotation of the loaded GLTF scene
    gltf.scene.scale.set(0.03, 0.035, 0.035);
    gltf.scene.position.set(0, 0.029, 0);
    gltf.scene.rotation.set(0, 1.55, 0);

    // Traverse through the children meshes and apply shadow properties
    gltf.scene.traverse((object) => {
      if (object instanceof Mesh) {
        object.castShadow = true; // Enable casting shadows
        object.receiveShadow = true; // Enable receiving shadows
        object.material.envMapIntensity = 20; // Adjust environment map intensity
      }
    });

    // No dat.GUI code here, as it's commented out

    // No cleanup needed for dat.GUI

  }, [gltf]); // useEffect dependency on gltf to ensure it runs only when gltf is loaded

  // Function for rendering and updating the scene each frame
  useFrame((state, delta) => {
    let t = state.clock.getElapsedTime();

    // Check if the required group and its children exist
    if (gltf.scene && gltf.scene.children[0] && gltf.scene.children[0].children[0] && gltf.scene.children[0].children[0].children[0]) {
      let group = gltf.scene.children[0].children[0].children[0];

      // Rotate specific children based on elapsed time
      if (group.children.length >= 7) {
        group.children[0].rotation.x = t * 2;
        group.children[2].rotation.x = t * 2;
        group.children[4].rotation.x = t * 2;
        group.children[6].rotation.x = t * 2;
      }
    }
  });

  // Return the primitive object representing the loaded GLTF scene
  return <primitive object={gltf.scene} />;
}
