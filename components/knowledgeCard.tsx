import React from "react";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import { NODE_SIZE } from "components/knowledgeTree";

import type { KnowledgeSubject } from "types";

type TreeNodeProps = { nodeData?: KnowledgeSubject };

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

export default function TreeNode({
  nodeData,
}: TreeNodeProps): React.ReactElement {
  const classes = useStyles();
  const resources = nodeData.resources?.map((resource) => {
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
