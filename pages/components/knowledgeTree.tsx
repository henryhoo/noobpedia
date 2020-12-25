import D3Tree from "pages/components/d3Tree";
import React, { useEffect, useState } from "react";
import TreeNode from "pages/components/knowledgeTreeNode";

export const NODE_SIZE: { width: number; height: number } = {
  width: 300,
  height: 150,
};

export default function Tree(props) {
  const targetRef = props.targetRef;
  const [translate, setTranslate] = useState({
    x: 0,
    y: 20,
  });

  useEffect(() => {
    if (targetRef.current) {
      const rect = targetRef.current.getBoundingClientRect();
      setTranslate({ x: rect.width / 2, y: rect.height / 5 });
    }
  }, [targetRef.current]);

  const svgShape = {
    shape: "none",
  };

  return (
    <D3Tree
      data={props.data}
      orientation="vertical"
      initialDepth={4}
      nodeSize={{ x: NODE_SIZE.width, y: NODE_SIZE.height }}
      nodeSvgShape={svgShape}
      pathFunc="elbow"
      allowForeignObjects
      nodeLabelComponent={{
        render: <TreeNode />,
        foreignObjectWrapper: {
          x: -NODE_SIZE.width / 2 + 12,
          y: -NODE_SIZE.height / 2,
        },
      }}
      separation={{ siblings: 1, nonSiblings: 1 }}
      translate={translate}
    />
  );
}
