import React, { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Line, Float, Html, Environment } from '@react-three/drei';
import * as THREE from 'three';

// Define geometries and materials outside the component to save memory/draw calls
const glassMaterial = new THREE.MeshPhysicalMaterial({
  color: 0xffffff,
  transmission: 1, // glass-like
  opacity: 1,
  metalness: 0,
  roughness: 0.1,
  ior: 1.5,
  thickness: 2,
  specularIntensity: 1,
  clearcoat: 1,
  clearcoatRoughness: 0.1
});

const nodeGeometry = new THREE.IcosahedronGeometry(0.5, 0); // Abstract crystal shape

function PathScene() {
  const { camera } = useThree();
  const targetCamPos = useRef(new THREE.Vector3(0, 0, 5));
  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0));

  const curvePoints = useMemo(() => [
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(3, -3, -10),
    new THREE.Vector3(-3, -8, -20),
    new THREE.Vector3(2, -15, -30),
    new THREE.Vector3(0, -22, -40),
  ], []);

  const curve = useMemo(() => new THREE.CatmullRomCurve3(curvePoints), [curvePoints]);
  const linePoints = useMemo(() => curve.getPoints(150), [curve]);

  const nodes = useMemo(() => [
    { position: curve.getPoint(0.1), title: "OpMobility", date: "2024-2025" },
    { position: curve.getPoint(0.4), title: "Nexaglobe", date: "2024" },
    { position: curve.getPoint(0.7), title: "Soremed", date: "2023" },
    { position: curve.getPoint(0.95), title: "Agent IA Personnel", date: "2024" },
  ], [curve]);

  useFrame((state, delta) => {
    // Calculate global scroll progress manually (since we removed ScrollControls)
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollProgress = docHeight > 0 ? window.scrollY / docHeight : 0;
    
    const offset = Math.max(0, Math.min(scrollProgress, 1));
    
    // Smooth camera target calculation
    const camPos = curve.getPoint(offset);
    // Add an offset so we aren't inside the path
    camPos.y += 1; 
    camPos.z += 3;
    
    targetCamPos.current.copy(camPos);
    
    const lookAtPos = curve.getPoint(Math.min(offset + 0.1, 1));
    targetLookAt.current.copy(lookAtPos);

    // Spring physics / lerping for buttery smooth camera
    camera.position.lerp(targetCamPos.current, 3 * delta);
    
    // To slerp rotation, we create a dummy object
    const dummy = new THREE.Object3D();
    dummy.position.copy(camera.position);
    dummy.lookAt(targetLookAt.current);
    camera.quaternion.slerp(dummy.quaternion, 3 * delta);
  });

  return (
    <>
      <Environment preset="city" />
      <directionalLight position={[10, 20, 5]} intensity={1.5} color="#fb6f92" />
      <directionalLight position={[-10, -20, -5]} intensity={0.5} color="#3a0ca3" />

      {/* Glowing path */}
      <Line
        points={linePoints}
        color="#fb6f92"
        lineWidth={3}
        transparent
        opacity={0.4}
      />

      {nodes.map((node, i) => (
        <group key={i} position={[node.position.x, node.position.y, node.position.z]}>
          <Float speed={2} rotationIntensity={1} floatIntensity={1}>
            <mesh 
              geometry={nodeGeometry} 
              material={glassMaterial} 
              onPointerOver={(e) => { e.object.scale.setScalar(1.2); document.body.style.cursor = 'pointer'; }}
              onPointerOut={(e) => { e.object.scale.setScalar(1); document.body.style.cursor = 'default'; }}
            />
            <Html distanceFactor={10} position={[1.5, 0, 0]} transform sprite>
              <div className="node-label">
                <div className="node-title">{node.title}</div>
                <div className="node-date">{node.date}</div>
              </div>
            </Html>
          </Float>
        </group>
      ))}
    </>
  );
}

export default function Experience3D() {
  return <PathScene />;
}
