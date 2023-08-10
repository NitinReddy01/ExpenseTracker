import React, { useEffect, useState } from 'react'

export default function Animation() {
    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);
    useEffect(() => {
        const handleResize = () => {
            setHeight(window.innerHeight);
            setWidth(window.innerWidth);
        }
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, [])
    const style = {
        width: width + 'px',
        height: height / 2 + 'px',
        position: 'absolute',
        borderRadius: '50%',
        marginLeft: `calc(${width}px * -0.5)`,
        marginTop: `calc(${height / 2}px * -0.5)`,
        background: 'linear-gradient(180deg, #F56692 0%, #F2994A 100%)',
        filter: 'blur(400px)',
        animation: 'moveOrb 15s alternate linear infinite'
    }
    const keyframe = `
    @keyframes moveOrb {
        0% {
            transform: translate(0, 0);
        }
        50% {
            transform: translate(${width}px, ${height / 2}px);
        }
        100% {
            transform: translate(0, 0);
        }
    }`;
    return (
        <>
            <style>{keyframe}</style>
            <div style={style} ></div>
        </>

    )
}
