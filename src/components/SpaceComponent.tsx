interface SpaceComponentProps {
  height?: number;
  width?: number;
}

function SpaceComponent(props: SpaceComponentProps) {
  const { height = 0, width = 0 } = props;
  return (
    <div
      style={{
        height: `${height}px`,
        width: `${width}px`,
      }}
    />
  );
}

export default SpaceComponent;
