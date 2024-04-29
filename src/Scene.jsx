import useSpline from '@splinetool/r3f-spline'
import { OrthographicCamera } from '@react-three/drei'

export default function Scene({ ...props }) {
    const { nodes, materials } = useSpline('https://prod.spline.design/gsBeBMWmNSKzvVr9/scene.splinecode')
    return (
    <>
        <color attach="background" args={['#000000']} />
        <group {...props} dispose={null}>
        <scene name="Scene 1">
            <mesh
            name="Rectangle"
            geometry={nodes.Rectangle.geometry}
            material={materials['Rectangle Material']}
            castShadow
            receiveShadow
            position={[208.09, 155.44, 1]}
            />
            <mesh
            name="Shape"
            geometry={nodes.Shape.geometry}
            material={materials['Shape Material']}
            castShadow
            receiveShadow
            position={[-188.62, 112.01, 251.03]}
            />
            <OrthographicCamera
            name="Camera"
            makeDefault={true}
            zoom={1.11}
            far={100000}
            near={-100000}
            position={[-222.84, 70.94, 1187.34]}
            rotation={[-0.03, -0.24, -0.01]}
            />
            <mesh
            name="invisible lair for sphere to move"
            geometry={nodes['invisible lair for sphere to move'].geometry}
            material={materials['invisible lair for sphere to move Material']}
            position={[-277, 34.86, 0]}
            scale={1.02}
            />
            <mesh
            name="Sphere"
            geometry={nodes.Sphere.geometry}
            material={materials['Sphere Material']}
            castShadow
            receiveShadow
            position={[-277, 34.86, 0]}
            >
            <mesh
                name="Cube"
                geometry={nodes.Cube.geometry}
                material={materials['Cube Material']}
                castShadow
                receiveShadow
                position={[-138.13, 70.74, 143.56]}
                rotation={[-1.82, 0.14, -0.73]}
                scale={1}
            />
            </mesh>
            <OrthographicCamera name="1" makeDefault={false} far={10000} near={-50000} />
            <hemisphereLight name="Default Ambient Light" intensity={1} />
        </scene>
        </group>
    </>
    )
}
