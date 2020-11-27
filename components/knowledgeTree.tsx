import D3Tree from "components/d3Tree";
import React, { useEffect, useState } from "react";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";

enum ResourceType {
  VIDEO = "video",
  READ = "read",
}

export type KnowledgeResource = {
  name: string;
  link: string;
  type: ResourceType;
};

export type KnowledgeSubject = {
  name: string;
  resources: KnowledgeResource[];
  children: KnowledgeSubject[];
};

type TreeNodeProps = { nodeData?: KnowledgeSubject };

const NODE_SIZE = { width: 300, height: 150 };

const useStyles = makeStyles((theme) => {
  return {
    cardRoot: {
      maxWidth: NODE_SIZE.width,
      maxHeight: NODE_SIZE.height,
      backgroundColor: theme.palette.primary.light,
    },
    cardContent: {
      padding: "5px",
    },
    cardHeader: {
      fontSize: "22px",
      fontWeight: 700,
      textTransform: "capitalize",
    },
    cardIcon: {
      marginRight: "3px",
    },
  };
});

function TreeNode({ nodeData }: TreeNodeProps): React.ReactElement {
  const classes = useStyles();
  const resources = nodeData.resources?.map((resource) => {
    console.log(resource.link);
    return (
      <div key={resource.name + resource.link}>
        <PlayCircleOutlineIcon className={classes.cardIcon} />
        <a href={resource.link || "/"}>{resource.name}</a>
      </div>
    );
  });
  return (
    <Card className={classes.cardRoot} key={nodeData.name}>
      <CardContent className={classes.cardContent}>
        <Typography className={classes.cardHeader} color="textPrimary">
          {nodeData.name}
        </Typography>
        <Divider variant="fullWidth" />
        <Typography variant="subtitle1" color="textPrimary">
          {resources}
        </Typography>
      </CardContent>
    </Card>
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
