import D3Tree from "components/d3Tree";
import { useEffect, useState } from "react";

enum ResourceType {
  VIDEO = "video",
  READ = "read",
}

type Resource = {
  name: string;
  link: string;
  type: ResourceType;
};

type Subject = {
  name: string;
  resources: Resource[];
  children: Subject[];
};

type TreeNodeProps = { className?: string; nodeData?: Subject };

function TreeNode({ className, nodeData }: TreeNodeProps): React.ReactElement {
  const resources = nodeData.resources?.map((resource) => {
    return (
      <div>
        <a href={resource.link}>
          {resource.type}:{resource.name}
        </a>
      </div>
    );
  });
  return (
    <div className={className}>
      <h4>{nodeData.name}</h4>
      {resources}
    </div>
  );
}

export default function Tree(props) {
  const targetRef = props.targetRef;
  const [translate, setTranslate] = useState({
    x: 0,
    y: 20,
  });

  useEffect(() => {
    if (targetRef.current) {
      const rect = targetRef.current.getBoundingClientRect();
      setTranslate({ x: rect.width / 2, y: 20 });
    }
  }, [targetRef.current]);

  return (
    <D3Tree
      data={props.data}
      orientation="vertical"
      initialDepth={4}
      nodeSize={{ x: 150, y: 150 }}
      allowForeignObjects
      nodeLabelComponent={{
        render: <TreeNode />,
        // foreignObjectWrapper: {
        //   y: 24,
        // },
      }}
      translate={translate}
    />
  );
}
