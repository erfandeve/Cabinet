"use client";

import { ContactShadows, Environment, Html, Lightformer, RoundedBox } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

const C = {
  sage: "#3e5245",
  oak: "#b8895c",
  body: "#ede6da",
  quartz: "#f1ece4",
  brass: "#c9a063",
  wall: "#2b221c",
  floor: "#15110f",
};

type PartId = "drawer" | "door" | "lift" | "pantry";
const CYCLE: PartId[] = ["drawer", "lift", "door", "pantry"];

function damp(cur: number, target: number, dt: number, k = 6) {
  return THREE.MathUtils.damp(cur, target, k, dt);
}

function Handle({ length = 0.22, vertical = false, position }: { length?: number; vertical?: boolean; position: [number, number, number] }) {
  return (
    <mesh position={position} rotation={vertical ? [0, 0, 0] : [0, 0, Math.PI / 2]} castShadow>
      <capsuleGeometry args={[0.009, length, 4, 12]} />
      <meshStandardMaterial color={C.brass} metalness={1} roughness={0.28} />
    </mesh>
  );
}

function Label({ text, sub, position }: { text: string; sub: string; position: [number, number, number] }) {
  return (
    <Html position={position} center distanceFactor={4.2} zIndexRange={[20, 0]} style={{ pointerEvents: "none" }}>
      <div className="whitespace-nowrap rounded-xl border border-white/15 bg-coal/75 px-3 py-2 text-right text-white shadow-xl backdrop-blur-md" dir="rtl">
        <div className="text-[11px] font-bold">{text}</div>
        <div className="text-[9px] text-brass-light">{sub}</div>
      </div>
    </Html>
  );
}

/** Side-hinged door. hinge = "left" | "right" relative to viewer. */
function Door({ w, h, position, hinge, color, open, onHover, gloss = false }: { w: number; h: number; position: [number, number, number]; hinge: "left" | "right"; color: string; open: boolean; onHover: (v: boolean) => void; gloss?: boolean }) {
  const g = useRef<THREE.Group>(null);
  const sign = hinge === "left" ? 1 : -1;
  useFrame((_, dt) => {
    if (!g.current) return;
    g.current.rotation.y = damp(g.current.rotation.y, open ? -sign * 1.65 : 0, dt, 5);
  });
  const hx = hinge === "left" ? -w / 2 : w / 2;
  return (
    <group position={[position[0] + hx, position[1], position[2]]}>
      <group ref={g}>
        <RoundedBox
          args={[w - 0.008, h, 0.02]}
          radius={0.006}
          smoothness={3}
          position={[-hx, 0, 0.01]}
          castShadow
          onPointerOver={(e) => (e.stopPropagation(), onHover(true))}
          onPointerOut={() => onHover(false)}
        >
          <meshPhysicalMaterial color={color} roughness={gloss ? 0.18 : 0.55} clearcoat={gloss ? 1 : 0.2} clearcoatRoughness={0.15} />
        </RoundedBox>
        <Handle vertical position={[-hx + (hinge === "left" ? w / 2 - 0.05 : -w / 2 + 0.05), h > 0.6 ? 0.1 : h / 2 - 0.12, 0.035]} length={h > 1 ? 0.4 : 0.16} />
      </group>
    </group>
  );
}

function Drawer({ w, h, position, color, open, onHover }: { w: number; h: number; position: [number, number, number]; color: string; open: boolean; onHover: (v: boolean) => void }) {
  const g = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    if (!g.current) return;
    g.current.position.z = damp(g.current.position.z, open ? 0.36 : 0, dt, 5);
  });
  return (
    <group position={position}>
      <group ref={g}>
        <RoundedBox args={[w - 0.008, h - 0.008, 0.02]} radius={0.006} smoothness={3} position={[0, 0, 0.01]} castShadow onPointerOver={(e) => (e.stopPropagation(), onHover(true))} onPointerOut={() => onHover(false)}>
          <meshPhysicalMaterial color={color} roughness={0.55} clearcoat={0.2} />
        </RoundedBox>
        {/* drawer box */}
        <mesh position={[0, -0.02, -0.25]} castShadow>
          <boxGeometry args={[w - 0.06, h - 0.07, 0.5]} />
          <meshStandardMaterial color="#d9d2c6" roughness={0.8} />
        </mesh>
        {/* cutlery */}
        <mesh position={[0.08, h / 2 - 0.08, -0.2]}>
          <boxGeometry args={[0.18, 0.02, 0.3]} />
          <meshStandardMaterial color="#9a9da1" metalness={0.8} roughness={0.35} />
        </mesh>
        <mesh position={[-0.15, h / 2 - 0.08, -0.25]}>
          <boxGeometry args={[0.2, 0.05, 0.22]} />
          <meshStandardMaterial color="#e2b46b" roughness={0.6} />
        </mesh>
        <Handle position={[0, h / 2 - 0.06, 0.035]} length={0.26} />
      </group>
    </group>
  );
}

function LiftDoor({ w, h, position, color, open, onHover }: { w: number; h: number; position: [number, number, number]; color: string; open: boolean; onHover: (v: boolean) => void }) {
  const g = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    if (!g.current) return;
    g.current.rotation.x = damp(g.current.rotation.x, open ? -1.25 : 0, dt, 4);
  });
  return (
    <group position={[position[0], position[1] + h / 2, position[2]]}>
      <group ref={g}>
        <RoundedBox args={[w - 0.008, h, 0.02]} radius={0.006} smoothness={3} position={[0, -h / 2, 0.01]} castShadow onPointerOver={(e) => (e.stopPropagation(), onHover(true))} onPointerOut={() => onHover(false)}>
          <meshPhysicalMaterial color={color} roughness={0.42} clearcoat={0.4} />
        </RoundedBox>
        <Handle position={[0, -h + 0.05, 0.035]} length={0.32} />
      </group>
    </group>
  );
}

function Carcass({ w, h, d, position }: { w: number; h: number; d: number; position: [number, number, number] }) {
  const t = 0.018;
  const mat = <meshStandardMaterial color={C.body} roughness={0.85} />;
  return (
    <group position={position}>
      <mesh position={[-w / 2 + t / 2, 0, 0]} castShadow receiveShadow><boxGeometry args={[t, h, d]} />{mat}</mesh>
      <mesh position={[w / 2 - t / 2, 0, 0]} castShadow receiveShadow><boxGeometry args={[t, h, d]} />{mat}</mesh>
      <mesh position={[0, -h / 2 + t / 2, 0]} receiveShadow><boxGeometry args={[w, t, d]} />{mat}</mesh>
      <mesh position={[0, h / 2 - t / 2, 0]} receiveShadow><boxGeometry args={[w, t, d]} />{mat}</mesh>
      <mesh position={[0, 0, -d / 2 + t / 2]} receiveShadow><boxGeometry args={[w, h, t]} />{mat}</mesh>
      <mesh position={[0, 0, 0]} receiveShadow><boxGeometry args={[w - 2 * t, t, d - t]} />{mat}</mesh>
    </group>
  );
}

function Jars({ position }: { position: [number, number, number] }) {
  const cols = ["#d9a86c", "#9fb39a", "#e6dccb", "#c46d4a"];
  return (
    <group position={position}>
      {cols.map((c, i) => (
        <mesh key={i} position={[(i - 1.5) * 0.11, 0, 0]} castShadow>
          <cylinderGeometry args={[0.035, 0.035, 0.1 + (i % 2) * 0.04, 20]} />
          <meshPhysicalMaterial color={c} roughness={0.2} transmission={0.2} thickness={0.1} />
        </mesh>
      ))}
    </group>
  );
}

function Kitchen({ active, setHover, reduced }: { active: PartId | null; setHover: (p: PartId | null) => void; reduced: boolean }) {
  const root = useRef<THREE.Group>(null);
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const on = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", on, { passive: true });
    return () => window.removeEventListener("pointermove", on);
  }, []);

  useFrame((state, dt) => {
    if (!root.current) return;
    const t = state.clock.elapsedTime;
    const idle = reduced ? 0 : Math.sin(t * 0.25) * 0.08;
    root.current.rotation.y = damp(root.current.rotation.y, 0.32 + idle + pointer.current.x * 0.18, dt, 2.5);
    root.current.rotation.x = damp(root.current.rotation.x, pointer.current.y * 0.05, dt, 2.5);
  });

  const hover = (p: PartId) => (v: boolean) => setHover(v ? p : null);
  const D = 0.58;
  const baseH = 0.78;
  const zf = D / 2;

  return (
    <group ref={root} position={[-0.1, -1.05, 0]}>
      {/* plinth */}
      <mesh position={[0, 0.05, zf - 0.06]} receiveShadow>
        <boxGeometry args={[2.4, 0.1, 0.02]} />
        <meshStandardMaterial color="#141110" />
      </mesh>

      {/* ---- base run: 3 modules of 0.8 ---- */}
      {[-0.8, 0, 0.8].map((x) => (
        <Carcass key={x} w={0.8} h={baseH} d={D} position={[x, 0.1 + baseH / 2, 0]} />
      ))}
      {/* drawers module (left) */}
      <Drawer w={0.8} h={0.26} position={[-0.8, 0.1 + baseH - 0.13, zf]} color={C.sage} open={active === "drawer"} onHover={hover("drawer")} />
      <Drawer w={0.8} h={0.26} position={[-0.8, 0.1 + baseH - 0.39, zf]} color={C.sage} open={false} onHover={() => {}} />
      <Drawer w={0.8} h={0.26} position={[-0.8, 0.1 + 0.13, zf]} color={C.sage} open={false} onHover={() => {}} />
      {/* double door module */}
      <Door w={0.4} h={baseH} position={[-0.2, 0.1 + baseH / 2, zf]} hinge="left" color={C.sage} open={active === "door"} onHover={hover("door")} />
      <Door w={0.4} h={baseH} position={[0.2, 0.1 + baseH / 2, zf]} hinge="right" color={C.sage} open={active === "door"} onHover={hover("door")} />
      {/* pots inside the double-door module */}
      <mesh position={[0, 0.1 + baseH / 2 + 0.07, 0.02]} castShadow>
        <cylinderGeometry args={[0.13, 0.12, 0.13, 28]} />
        <meshStandardMaterial color="#a7aaae" metalness={0.9} roughness={0.25} />
      </mesh>
      <mesh position={[0, 0.1 + 0.1, 0.02]} castShadow>
        <boxGeometry args={[0.6, 0.12, 0.34]} />
        <meshStandardMaterial color="#c8bca9" roughness={0.7} />
      </mesh>
      {/* right module with oven */}
      <mesh position={[0.8, 0.1 + baseH / 2, zf + 0.012]} castShadow>
        <boxGeometry args={[0.78, baseH - 0.01, 0.025]} />
        <meshPhysicalMaterial color="#121212" roughness={0.1} clearcoat={1} />
      </mesh>
      <mesh position={[0.8, 0.1 + baseH / 2 - 0.05, zf + 0.026]}>
        <planeGeometry args={[0.62, 0.42]} />
        <meshStandardMaterial color="#2a1c12" emissive="#ff8a3d" emissiveIntensity={0.35} roughness={0.2} />
      </mesh>
      <Handle position={[0.8, 0.1 + baseH - 0.1, zf + 0.05]} length={0.55} />

      {/* worktop */}
      <RoundedBox args={[2.5, 0.04, D + 0.05]} radius={0.008} smoothness={3} position={[0, 0.1 + baseH + 0.02, 0.025]} castShadow receiveShadow>
        <meshPhysicalMaterial color={C.quartz} roughness={0.22} clearcoat={0.8} clearcoatRoughness={0.1} />
      </RoundedBox>
      {/* sink + tap */}
      <mesh position={[0, 0.1 + baseH + 0.041, 0.05]}>
        <boxGeometry args={[0.5, 0.004, 0.36]} />
        <meshStandardMaterial color="#7d8186" metalness={0.9} roughness={0.3} />
      </mesh>
      <group position={[0, 0.1 + baseH + 0.04, -0.17]}>
        <mesh position={[0, 0.14, 0]}><cylinderGeometry args={[0.012, 0.016, 0.28, 16]} /><meshStandardMaterial color={C.brass} metalness={1} roughness={0.25} /></mesh>
        <mesh position={[0, 0.28, 0.07]} rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[0.011, 0.011, 0.15, 16]} /><meshStandardMaterial color={C.brass} metalness={1} roughness={0.25} /></mesh>
      </group>
      <Jars position={[-0.85, 0.1 + baseH + 0.1, -0.12]} />
      {/* cutting board */}
      <mesh position={[0.75, 0.1 + baseH + 0.05, -0.05]} rotation={[0, 0.3, 0]} castShadow>
        <boxGeometry args={[0.36, 0.018, 0.24]} />
        <meshStandardMaterial color="#c28e5c" roughness={0.7} />
      </mesh>

      {/* backsplash wall */}
      <RoundedBox args={[3.3, 2.35, 0.04]} radius={0.02} smoothness={3} position={[0.35, 0.1 + 2.35 / 2, -zf - 0.03]} receiveShadow>
        <meshStandardMaterial color={C.wall} roughness={0.9} />
      </RoundedBox>
      {/* LED strip glow */}
      <mesh position={[0, 1.42, -0.1]}>
        <boxGeometry args={[2.38, 0.008, 0.02]} />
        <meshStandardMaterial color="#fff2cc" emissive="#ffd88a" emissiveIntensity={4} toneMapped={false} />
      </mesh>
      <pointLight position={[-0.6, 1.3, 0]} intensity={0.9} distance={1.6} color="#ffd9a0" />
      <pointLight position={[0.6, 1.3, 0]} intensity={0.9} distance={1.6} color="#ffd9a0" />

      {/* ---- upper run ---- */}
      {[-0.8, 0, 0.8].map((x) => (
        <Carcass key={`u${x}`} w={0.8} h={0.62} d={0.34} position={[x, 1.75, -zf + 0.17]} />
      ))}
      <LiftDoor w={0.8} h={0.62} position={[-0.8, 1.75, -zf + 0.34]} color={C.oak} open={active === "lift"} onHover={hover("lift")} />
      <Door w={0.4} h={0.62} position={[-0.2, 1.75, -zf + 0.34]} hinge="left" color={C.oak} open={false} onHover={() => {}} />
      <Door w={0.4} h={0.62} position={[0.2, 1.75, -zf + 0.34]} hinge="right" color={C.oak} open={false} onHover={() => {}} />
      <LiftDoor w={0.8} h={0.62} position={[0.8, 1.75, -zf + 0.34]} color={C.oak} open={false} onHover={() => {}} />
      {/* plates inside lift cabinet */}
      {[0, 1, 2, 3, 4].map((i) => (
        <mesh key={i} position={[-0.95 + i * 0.07, 1.62, -0.12]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.1, 0.1, 0.012, 24]} />
          <meshStandardMaterial color="#f4f1ec" roughness={0.3} />
        </mesh>
      ))}

      {/* ---- tall pantry ---- */}
      <Carcass w={0.6} h={2.0} d={D} position={[1.5, 0.1 + 1.0, 0]} />
      <Door w={0.6} h={2.0} position={[1.5, 1.1, zf]} hinge="right" color={C.sage} open={active === "pantry"} onHover={hover("pantry")} />
      {[0.5, 0.95, 1.4, 1.8].map((y) => (
        <group key={y} position={[1.5, y, 0.02]}>
          <mesh><boxGeometry args={[0.52, 0.012, 0.46]} /><meshStandardMaterial color="#a9adb1" metalness={0.85} roughness={0.35} /></mesh>
          <mesh position={[-0.12, 0.08, 0]}><boxGeometry args={[0.12, 0.15, 0.12]} /><meshStandardMaterial color="#c9573a" roughness={0.6} /></mesh>
          <mesh position={[0.1, 0.06, 0.05]}><cylinderGeometry args={[0.05, 0.05, 0.12, 16]} /><meshStandardMaterial color="#e8d7b0" roughness={0.5} /></mesh>
        </group>
      ))}

      {/* labels */}
      {active === "drawer" && <Label text="ریل تاندم آرام‌بند" sub="تحمل ۳۰ کیلوگرم" position={[-0.8, 1.05, 0.75]} />}
      {active === "door" && <Label text="لولا آرام‌بند ۱۱۰°" sub="بسته‌شدن بی‌صدا" position={[0, 0.85, 0.75]} />}
      {active === "lift" && <Label text="جک درب بالا آونتوس" sub="توقف در هر زاویه" position={[-0.8, 2.35, 0.3]} />}
      {active === "pantry" && <Label text="سبد سوپری کششی" sub="۵ طبقه استیل" position={[1.5, 2.2, 0.6]} />}
    </group>
  );
}

function ResponsiveCamera() {
  const { camera, size } = useThree();
  useEffect(() => {
    camera.position.z = size.width < 640 ? 7.6 : 6.4;
    camera.updateProjectionMatrix();
  }, [camera, size.width]);
  return null;
}

function Scene({ reduced }: { reduced: boolean }) {
  const [auto, setAuto] = useState<PartId | null>(null);
  const [hover, setHover] = useState<PartId | null>(null);
  useEffect(() => {
    let i = 0;
    const first = setTimeout(() => setAuto(CYCLE[0]), 900);
    const id = setInterval(() => {
      i = (i + 1) % (CYCLE.length + 1);
      setAuto(i < CYCLE.length ? CYCLE[i] : null);
    }, 2600);
    return () => {
      clearTimeout(first);
      clearInterval(id);
    };
  }, []);
  const active = hover ?? auto;
  return (
    <>
      <ResponsiveCamera />
      <ambientLight intensity={0.35} />
      <directionalLight position={[3, 5, 4]} intensity={1.6} castShadow shadow-mapSize={[1024, 1024]} shadow-bias={-0.0004}>
        <orthographicCamera attach="shadow-camera" args={[-3, 3, 3, -3, 0.1, 15]} />
      </directionalLight>
      <spotLight position={[-3, 3, 3]} angle={0.5} penumbra={1} intensity={18} color="#ffcf8f" />
      <Kitchen active={active} setHover={setHover} reduced={reduced} />
      <ContactShadows position={[0, -1.05, 0]} opacity={0.6} scale={7} blur={2.4} far={2} resolution={512} color="#000" />
      <Environment resolution={256}>
        <group rotation={[-Math.PI / 3, 0, 1]}>
          <Lightformer form="circle" intensity={4} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={2} />
          <Lightformer form="circle" intensity={2} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={2} />
          <Lightformer form="rect" intensity={2} rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={[10, 2, 1]} color="#ffd9a8" />
          <Lightformer form="ring" intensity={1.5} rotation-y={Math.PI / 2} position={[-0.1, -1, -5]} scale={8} />
        </group>
      </Environment>
    </>
  );
}

export default function KitchenScene() {
  const reduced = useMemo(() => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches, []);
  return (
    <Canvas
      shadows
      dpr={[1, 1.75]}
      camera={{ position: [0.1, 0.75, 6.4], fov: 33 }}
      gl={{ antialias: true, powerPreference: "high-performance", alpha: true }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.05;
      }}
      aria-label="نمایش سه‌بعدی تعاملی کابینت آشپزخانه"
      role="img"
    >
      <Suspense fallback={null}>
        <Scene reduced={reduced} />
      </Suspense>
    </Canvas>
  );
}
