import React, { useEffect, useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Line, Float, Html, Environment, Lightformer } from '@react-three/drei';
import * as THREE from 'three';

// Define geometries and materials outside the component to save memory/draw calls.
// Emissive tint guarantees the crystals stay visible even if reflections are weak,
// so the scene never renders as black blobs (previous network-HDRI failure mode).
const glassMaterial = new THREE.MeshPhysicalMaterial({
  color: new THREE.Color('#ff9ebb'),
  transmission: 0.9,
  opacity: 1,
  metalness: 0.2,
  roughness: 0.1,
  ior: 1.5,
  thickness: 1.5,
  specularIntensity: 1,
  clearcoat: 1,
  clearcoatRoughness: 0.1,
  iridescence: 1,
  iridescenceIOR: 1.3,
  envMapIntensity: 1.5,
  emissive: new THREE.Color('#fb6f92'),
  emissiveIntensity: 0.12,
});

const nodeGeometry = new THREE.IcosahedronGeometry(0.5, 0); // Abstract crystal shape

function PathScene() {
  const { camera } = useThree();
  const targetCamPos = useRef(new THREE.Vector3(0, 0, 5));
  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0));
  // Reused each frame to avoid per-frame allocations (GC pressure / jank).
  const dummy = useRef(new THREE.Object3D());

  // Cache the scrollable height. Reading scrollHeight forces a synchronous
  // layout reflow, so we compute it once and refresh only on resize — never
  // inside the render loop. window.scrollY (read per frame) does not reflow.
  const docHeight = useRef(0);
  useEffect(() => {
    const measure = () => {
      docHeight.current = document.documentElement.scrollHeight - window.innerHeight;
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

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
    const progress = docHeight.current > 0 ? window.scrollY / docHeight.current : 0;
    const offset = Math.max(0, Math.min(progress, 1));

    // Smooth camera target calculation (write into reused vectors).
    curve.getPoint(offset, targetCamPos.current);
    // Add an offset so we aren't inside the path.
    targetCamPos.current.y += 1;
    targetCamPos.current.z += 3;

    curve.getPoint(Math.min(offset + 0.1, 1), targetLookAt.current);

    // Framerate-independent exponential smoothing (stable regardless of fps).
    const alpha = 1 - Math.exp(-3 * delta);
    camera.position.lerp(targetCamPos.current, alpha);

    // Reused dummy object to derive the look-at rotation, then slerp.
    dummy.current.position.copy(camera.position);
    dummy.current.lookAt(targetLookAt.current);
    camera.quaternion.slerp(dummy.current.quaternion, alpha);
  });

  return (
    <>
      {/* Self-contained studio environment — no network HDRI fetch */}
      <Environment resolution={64} frames={1}>
        <Lightformer intensity={3} color="#ffffff" position={[0, 5, -5]} scale={[12, 12, 1]} />
        <Lightformer intensity={2.5} color="#fb6f92" position={[-6, 1, 2]} scale={[6, 6, 1]} />
        <Lightformer intensity={2} color="#7c3aed" position={[6, -1, 2]} scale={[6, 6, 1]} />
      </Environment>
      <ambientLight intensity={0.6} />
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
