export function calculateGradientEndpoints(degree: number): {
  end: { x: number; y: number };
  start: { x: number; y: number };
} {
  if (typeof degree !== 'number' || Math.abs(degree) === Infinity)
    throw new Error('Invalid degree value');

  degree = ((degree % 360) + 360) % 360;

  const startEnd = (
    start: [number, number],
    end: [number, number]
  ): { end: { x: number; y: number }; start: { x: number; y: number } } => ({
    start: { x: start[0], y: start[1] },
    end: { x: end[0], y: end[1] },
  });

  const getCoordinates = (
    degree: number
  ): { end: [number, number]; start: [number, number] } => {
    const arc = Math.PI / (180 / degree);
    return {
      start: [0.5 - Math.tan(arc) * 0.5, 1],
      end: [0.5 + Math.tan(arc) * 0.5, 0],
    };
  };

  const coordinates: Record<number, [number, number][]> = {
    0: [
      [0.5, 1],
      [0.5, 0],
    ],
    45: [
      [0, 1],
      [1, 0],
    ],
    90: [
      [0, 0.5],
      [1, 0.5],
    ],
    135: [
      [0, 0],
      [1, 1],
    ],
    180: [
      [0.5, 0],
      [0.5, 1],
    ],
    225: [
      [0, 1],
      [1, 0],
    ],
    270: [
      [0, 0.5],
      [1, 0.5],
    ],
    315: [
      [1, 0],
      [0, 0],
    ],
  };

  if (Object.prototype.hasOwnProperty.call(coordinates, degree)) {
    return startEnd(
      coordinates[degree as keyof typeof coordinates][0],
      coordinates[degree as keyof typeof coordinates][1]
    );
  }

  if (degree < 45)
    return startEnd(getCoordinates(degree).start, getCoordinates(degree).end);
  if (degree < 90)
    return startEnd(
      [0, 0.5 + Math.tan(Math.PI / (180 / (90 - degree))) * 0.5],
      [1, 0.5 - Math.tan(Math.PI / (180 / (90 - degree))) * 0.5]
    );
  if (degree < 135)
    return startEnd(
      [0, 0.5 - Math.tan(Math.PI / (180 / (degree - 90))) * 0.5],
      [1, 0.5 + Math.tan(Math.PI / (180 / (degree - 90))) * 0.5]
    );
  if (degree < 180)
    return startEnd(
      [0.5 - Math.tan(Math.PI / (180 / (45 - (degree - 135)))) * 0.5, 0],
      [0.5 + Math.tan(Math.PI / (180 / (45 - (degree - 135)))) * 0.5, 1]
    );
  if (degree < 225)
    return startEnd(
      [0.5 + Math.tan(Math.PI / (180 / (degree - 180))) * 0.5, 0],
      [0.5 - Math.tan(Math.PI / (180 / (degree - 180))) * 0.5, 1]
    );
  if (degree < 270)
    return startEnd(
      [1, 0.5 - Math.tan(Math.PI / (180 / (45 - (degree - 225)))) * 0.5],
      [0, 0.5 + Math.tan(Math.PI / (180 / (45 - (degree - 225)))) * 0.5]
    );
  if (degree < 315)
    return startEnd(
      [1, 0.5 + Math.tan(Math.PI / (180 / (degree - 270))) * 0.5],
      [0, 0.5 - Math.tan(Math.PI / (180 / (degree - 270))) * 0.5]
    );
  return startEnd(
    [0.5 + Math.tan(Math.PI / (180 / (45 - (degree - 315)))) * 0.5, 1],
    [0.5 - Math.tan(Math.PI / (180 / (45 - (degree - 315)))) * 0.5, 0]
  );
}
