import React from "react";

interface RowComponentProps {
  children: React.ReactNode;
  justifyContent?: "flex-start" | "center" | "flex-end";
  alignItems?: "flex-start" | "center" | "flex-end";
  style?: React.CSSProperties;
}

function RowComponent(props: RowComponentProps) {
  const { children, justifyContent, alignItems, style } = props;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: justifyContent || "center",
        alignItems: alignItems || "center",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export default RowComponent;
