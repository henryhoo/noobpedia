import React from "react";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

import type { KnowledgeMetadata } from "types";

type Props = { allKnowledge: KnowledgeMetadata[] };

const useStyles = makeStyles((theme) => {
  return {
    container: {
      paddingTop: theme.spacing(4),
      display: "flex",
      maxWidth: "100%",
      maxHeight: "80%",
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-evenly",
    },
    knowledgeCard: {
      flexBasis: "30%",
      flexGrow: 1,
      margin: "10px",
      maxWidth: "25%",
    },
    cardContent: {
      // padding: "5px",
    },
    CardHeader: {
      fontSize: theme.typography.fontSize,
      flexGrow: 1,
      margin: "10px",
      maxWidth: "25%",
    },
  };
});

export default function AllKnowledgeSection({
  allKnowledge,
}: Props): React.ReactElement {
  const classes = useStyles();
  const knowledgeSections = allKnowledge.map((knowledge, idx) => {
    return (
      <Card variant="outlined" className={classes.knowledgeCard} key={idx}>
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant="h6">
            {knowledge.name}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {knowledge.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" href={"/knowledge/" + knowledge.path}>
            Learn
          </Button>
        </CardActions>
      </Card>
    );
  });
  return <div className={classes.container}>{knowledgeSections}</div>;
}
