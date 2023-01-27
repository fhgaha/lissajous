import React, { useEffect, useState } from 'react'

export function useMousePos(initialPos = null) {
	const [mousePos, setMousePos] = useState(initialPos);

	useEffect(() => {
		const handleMouseMove = (event) => {
			setMousePos({ x: event.clientX, y: event.clientY });
		};
		window.addEventListener('mousemove', handleMouseMove);
		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
		};
	}, []);

	return [mousePos, setMousePos]
}
