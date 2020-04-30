import React, { FC } from 'react';
import { NewsCoin, Props } from './NewsComponent.interface';
import useStyles from './NewsComponent.styles';
import { Box, Card, CardMedia, Paper, Typography } from '@material-ui/core';
import ShareIcon from '@material-ui/icons/Share';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import moment from 'moment';

const NewsComponent: FC<Props> = (props) => {
  const { imgURL, title, description, source, sourceLink, link, shareURL, reactionsCount, feedDate, coins } = props;
  const { root, bottom, sourceLinks, hoverableText, reactions, flex, coinStyle } = useStyles();
  return (
    <Card elevation={0} className={root}>
      <CardMedia image={imgURL} style={{ height: 120, width: 120 }} />
      <Paper style={{ flex: 1, display: 'flex', flexDirection: 'column' }} elevation={0}>
        <a target="_blank" style={{ display: 'block' }} href={link}>
          <Typography className={hoverableText} color="primary" style={{ marginBottom: 8 }} variant="h5">
            {title}
          </Typography>
        </a>
        <div
          style={{ fontSize: 14, flex: 1 }}
          dangerouslySetInnerHTML={{
            __html: `<style jsx>
          a, table {
          text-decoration: none;
            display: none;
        }
          </style>${description}`,
          }}
        />
        <div className={flex}>
          <Typography>{moment(feedDate).fromNow()}</Typography>
          <div className={coinStyle} style={{ marginLeft: 32 }}>
            {coins.map((coin: NewsCoin, index: number) => (
              <div style={{ display: 'flex' }} key={index}>
                <Typography>{coin.coinIdKeyWords}</Typography>
                <Typography
                  style={{ color: coin.coinPercent >= 0 ? 'green' : 'red', marginLeft: 8 }}
                >{`${coin.coinPercent}%`}</Typography>
              </div>
            ))}
          </div>
        </div>
        <Box component="div" className={bottom}>
          <Box style={{ display: 'flex', width: 320, justifyContent: 'space-between' }}>
            <a style={{ display: 'block' }} href={sourceLink} target="_blank">
              <Typography className={[sourceLinks, hoverableText].join(' ')}>{source}</Typography>
            </a>
            <div style={{ marginLeft: 16, display: 'flex' }}>
              {reactionsCount['2'] && (
                <div className={reactions}>
                  <ArrowDropUpIcon />
                  {reactionsCount['2']}
                </div>
              )}
              {reactionsCount['3'] && (
                <div className={reactions}>
                  <ArrowDropDownIcon /> {reactionsCount['3']}
                </div>
              )}
            </div>
            <div style={{ flex: 1 }} />
          </Box>
          <div style={{ marginLeft: 16, display: 'flex' }} className={[sourceLinks, hoverableText].join(' ')}>
            <div style={{ marginRight: 8 }}>share</div>
            <ShareIcon onClick={() => window.open(shareURL, '_blank')} />
          </div>
        </Box>
      </Paper>
    </Card>
  );
};

export default NewsComponent;
