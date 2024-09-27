import { useRef, useState } from "react";
import RowComponent from "./components/RowComponent";
import SpaceComponent from "./components/SpaceComponent";
import GameComponent from "./components/GameComponent";

const convertTime = (time: number) => {
  return `${time / 10} s`;
};

function App() {
  const [resetGame, setResetGame] = useState(false);
  const [numsPlayed, setNumsPlayed] = useState(0);

  const [win, setWin] = useState<boolean>();
  const [points, setPoints] = useState(5);

  const [timer, setTimer] = useState(0);
  const countRef = useRef<number | null>(null);

  const handleStartTime = () => {
    setTimer(0);
    countRef.current = setInterval(() => {
      setTimer((timer) => timer + 1);
    }, 100);
  };

  const handleStopTime = () => {
    clearInterval(countRef.current as number);
  };

  const handleStart = () => {
    if (points <= 0) {
      alert("Please enter a valid number of points");
      return;
    }
    setNumsPlayed((prev) => prev + 1);
    setResetGame(!resetGame);
    setWin(undefined);
    handleStopTime();
    handleStartTime();
  };

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <header style={styles.headerContainer}>
          {win === undefined ? (
            <h1>{"Let's Play"}</h1>
          ) : win ? (
            <h1 style={{ color: "#73EC8B" }}>{"You Win!"}</h1>
          ) : (
            <h1 style={{ color: "#D91656" }}>{"Game Over"}</h1>
          )}
          <RowComponent style={{}} justifyContent="flex-start">
            <label>{"Points: "}</label>
            <SpaceComponent width={16} />
            <input
              type="number"
              value={points}
              onChange={(e) => {
                setPoints(parseInt(e.target.value));
              }}
            />
          </RowComponent>
          <RowComponent style={{}} justifyContent="flex-start">
            <label>{"Time: "}</label>
            <SpaceComponent width={16} />
            <p>{convertTime(timer)}</p>
          </RowComponent>
          <SpaceComponent height={16} />
          <RowComponent justifyContent="flex-start">
            <button onClick={handleStart} style={styles.button}>
              {numsPlayed > 0 ? "Restart" : "Start"}
            </button>
          </RowComponent>
        </header>
        <SpaceComponent height={16} />

        <GameComponent
          resetGame={resetGame}
          points={points}
          handleGameOver={() => {
            setWin(false);
            handleStopTime();
          }}
          handleGameWin={() => {
            setWin(true);
            handleStopTime();
          }}
        />
      </div>
    </div>
  );
}

export default App;

const styles: { [key: string]: React.CSSProperties } = {
  body: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f0f0f0",
  },
  container: {
    padding: "64px 64px",
    borderRadius: "8px",
    background: "white",
  },
  headerContainer: {
    textAlign: "start",
  },
  button: {
    padding: "8px 16px",
    borderRadius: "8px",
    background: "#0077cc",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
};
