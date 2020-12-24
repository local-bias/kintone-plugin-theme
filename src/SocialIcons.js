import React from 'react';

import {
  Fab,
  Grid,
  Tooltip,
} from '@material-ui/core';

import GitHubIcon from '@material-ui/icons/GitHub';
import TwitterIcon from '@material-ui/icons/Twitter';
import HomeIcon from '@material-ui/icons/Home';
import { makeStyles } from '@material-ui/core/styles';

import blueGrey from '@material-ui/core/colors/blueGrey';

const URL_HOMEPAGE = 'https://localbias.work';
const URL_TWITTER = 'https://twitter.com/LbRibbit';
const URL_GITHUB = 'https://github.com/Local-Bias?tab=repositories';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100%',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  fab: {
    color: blueGrey[100],
    boxShadow: 'none',
  },
  icon: {
    color: blueGrey[400],
  }
}));

export default function SocialIcons() {
  const classes = useStyles();

  return (
    <Grid container className={classes.root}>
      <Tooltip title="ホームページ" aria-label="Homepage">
        <Fab className={classes.fab} aria-label="Homepage" onClick={() => openNewTab(URL_HOMEPAGE)} >
          <HomeIcon className={classes.icon} />
        </Fab>
      </Tooltip>
      <Tooltip title="ツイッター" aria-label="Twitter" onClick={() => openNewTab(URL_TWITTER)} >
        <Fab className={classes.fab} aria-label="Twitter">
          <TwitterIcon className={classes.icon} />
        </Fab>
      </Tooltip>
      <Tooltip title="GitHub" aria-label="GitHub">
        <Fab className={classes.fab} aria-label="GitHub" onClick={() => openNewTab(URL_GITHUB)} >
          <GitHubIcon className={classes.icon} />
        </Fab>
      </Tooltip>
    </Grid>
  );
}

const openNewTab = path => window.open(path, '_blank');