import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import { NODE_SIZE } from "pages/components/knowledgeTree";
import type { KnowledgeResource, KnowledgeSubject } from "types";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { IconButton } from "@material-ui/core";

type TreeNodeProps = { nodeData: KnowledgeSubject };

const useStyles = makeStyles((theme) => {
  return {
    cardRoot: {
      maxWidth: NODE_SIZE.width,
      maxHeight: NODE_SIZE.height,
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
    likes: {
      float: "right",
    },
  };
});

function ResourceCard(props: {
  resource: KnowledgeResource;
}): React.ReactElement {
  const classes = useStyles();
  const [resource, setResource] = useState({ ...props.resource });

  const onLikeClicked = () => {
    const url = "/api/bumpLike";
    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify({
        resourceName: resource.name,
      }),
    };
    fetch(url, options).then((response) => {
      if (response.status === 200) {
        const newR = { ...resource };
        newR.liked = true;
        newR.likes += 1;
        setResource(newR);
      }
    });
  };

  const Icon = resource.liked ? FavoriteIcon : FavoriteBorderIcon;

  return (
    <div key={resource.name + resource.link}>
      <PlayCircleOutlineIcon className={classes.cardIcon} />
      <a href={resource.link || "/"}>{resource.name}</a>
      <div className={classes.likes}>
        <IconButton onClick={onLikeClicked} disabled={resource.liked}>
          <Icon />
          {resource.likes}
        </IconButton>
      </div>
    </div>
  );
}

export default function TreeNode({
  nodeData,
}: TreeNodeProps): React.ReactElement {
  const classes = useStyles();

  const resources = nodeData.resources?.map((resource: KnowledgeResource) => {
    return <ResourceCard resource={resource} key={resource.name} />;
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
