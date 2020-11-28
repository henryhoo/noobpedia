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
      maxHeight: "50%",
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-evenly",
    },
    cardContent: {
      padding: "5px",
    },
    knowledgeCard: {
      flexBasis: "30%",
      flexGrow: 1,
      margin: "10px",
    },
  };
});

export default function AllKnowledgeSection({
  allKnowledge,
}: Props): React.ReactElement {
  const classes = useStyles();
  const knowledgeSections = allKnowledge.map((knowledge, idx) => {
    return (
      <Card className={classes.knowledgeCard} key={idx}>
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant="h5">
            {knowledge.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    );
  });
  return <div className={classes.container}>{knowledgeSections}</div>;
}
