import React, { Component } from 'react';
import { object } from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import launchData from '../../data/launches.json';


const styles = theme => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 20,
  },
  pageTitle: {
    marginTop: theme.spacing.unit * 2,
  },
  card: {
    height: '100%',
  },
  media: {
    height: 300,
  },
});

class LaunchDetails extends Component {
  static propTypes = {
    classes: object.isRequired,
  };

  renderLaunchCard(launch) {
    const { classes } = this.props;
    return (
      <Card classes={{ root: classes.card }}>
        <CardMedia
          className={classes.media}
          image={launch.rocket.imageURL}
          title={launch.rocket.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5">
            {launch.name}
          </Typography>
          <Typography component="p">
            Window start: <b>{launch.windowstart}</b>
          </Typography>
          <Typography component="p">
            Window start: <b>{launch.windowend}</b>
          </Typography>
          <Typography gutterBottom variant="h6">
            Mission
          </Typography>
          <Typography component="p">
            {launch.missions.map(mission => mission.description)}
          </Typography>
        </CardContent>
      </Card>
    );
  }

  renderLaunchPadCard(launch) {
    const { classes } = this.props;

    return (
      <Card classes={{ root: classes.card }}>
        <CardMedia
          className={classes.media}
          image="/google_maps.png"
          title={launch.location.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5">
            {launch.location.name}
          </Typography>
          <Typography component="p">
            Country: {launch.location.countryCode}
          </Typography>
          <Typography gutterBottom variant="h5">
            Pads
          </Typography>
          {launch.location.pads.map(pad => (
            <div key={pad.id}>
              <Typography component="p">
                Name: {pad.name}
              </Typography>
              <Typography component="p">
                Latitude: {pad.latitude}
              </Typography>
              <Typography component="p">
                Longitude: {pad.longitude}
              </Typography>
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  renderRocketCard(launch) {
    const { classes } = this.props;

    return (
      <Card classes={{ root: classes.card }}>
        <CardMedia
          className={classes.media}
          image={launch.rocket.imageURL}
          title={launch.rocket.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5">
            {launch.rocket.name}
          </Typography>
          <Typography component="p">
            Configuration: {launch.rocket.configuration}
          </Typography>
          <Typography component="p" gutterBottom>
            Family name: {launch.rocket.familyname}
          </Typography>
          <Typography gutterBottom variant="h6">
            Flight record
          </Typography>
          <CircularProgress
            variant="static"
            size={100}
            value={90}
          />
          <Typography variant="body2" component="p">
            Flights 54/60
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" color="primary" target="_blank" href={launch.rocket.wikiURL}>
            Learn More
          </Button>
        </CardActions>
      </Card>
    );
  }

  render() {
    const { match, classes } = this.props;
    const launch = launchData.find(data => data.id === Number(match.params.launchId));

    return (
      <div>
        <Typography variant="h2" gutterBottom classes={{ root: classes.pageTitle }}>
          {launch.name}
          </Typography>
        <Grid container>
          <Grid item xs={4}>
            {this.renderLaunchCard(launch)}
          </Grid>
          <Grid item xs={4}>
            {this.renderLaunchPadCard(launch)}
          </Grid>
          <Grid item xs={4}>
            {this.renderRocketCard(launch)}
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withRouter(withStyles(styles)(LaunchDetails));
