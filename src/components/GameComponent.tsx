import { useEffect, useRef } from "react";

interface GameComponentProps {
  width?: number;
  height?: number;
  resetGame: boolean;
  points: number;
  handleGameStart?: () => void;
  handleGameOver?: () => void;
  handleGameWin?: () => void;
}

function GameComponent(props: GameComponentProps) {
  const {
    resetGame,
    width = 540,
    height = 420,
    points,
    handleGameOver,
    handleGameWin,
  } = props;
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const createRandomPoints = (points: number) => {
    const randomPoints = Array.from({ length: points }, () => [
      Math.random() * width,
      Math.random() * height,
    ]);
    return randomPoints;
  };

  const drawPoint = (
    context: CanvasRenderingContext2D,
    points: number[],
    index?: number,
    color?: string
  ) => {
    const x = points[0];
    const y = points[1];

    context.beginPath();
    context.arc(x, y, 20, 0, 2 * Math.PI);
    context.strokeStyle = color || "black";
    context.stroke();
    context.fillStyle = "white";
    context.fill();
    if (index !== undefined) {
      context.fillStyle = "black";
      context.font = "16px Arial";
      context.fillText(index.toString(), x - 5, y + 5);
    }
  };

  useEffect(() => {
    let handleCanvasClick: (event: MouseEvent) => void;
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (context) {
      context.fillStyle = "white";
      context.fillRect(0, 0, width, height);

      if (points === 0) {
        return;
      }
      const randomPoints = createRandomPoints(points);
      console.log(randomPoints);
      for (let i = randomPoints.length - 1; i >= 0; i--) {
        drawPoint(context, randomPoints[i], i);
      }

      handleCanvasClick = (event: MouseEvent) => {
        const x = event.clientX - (canvas?.offsetLeft || 0);
        const y = event.clientY - (canvas?.offsetTop || 0);

        const index = randomPoints.findIndex(
          ([px, py]) => Math.abs(px - x) < 20 && Math.abs(py - y) < 20
        );
        if (index === 0) {
          drawPoint(context, randomPoints[0], undefined, "white");
          randomPoints.shift();
        } else if (index !== -1) {
          handleGameOver?.();
          drawPoint(context, randomPoints[index], undefined, "red");
          canvas?.removeEventListener("click", handleCanvasClick);
        }

        if (randomPoints.length === 0) {
          handleGameWin?.();
          canvas?.removeEventListener("click", handleCanvasClick);
        }
      };

      canvas?.addEventListener("click", handleCanvasClick);
    }
    return () => {
      canvas?.removeEventListener("click", handleCanvasClick);
    };
  }, [resetGame]);
  return (
    <>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        style={styles.container}
      />
    </>
  );
}

export default GameComponent;

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    borderRadius: "8px",
    border: "1px solid #333",
  },
};
