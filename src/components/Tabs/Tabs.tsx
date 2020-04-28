import React, { FC } from 'react';
import { Item, Props, TabPanelProps } from './Tabs.interface';
import useStyles from './Tabs.styles';
import { AppBar, Paper, Tab, Tabs as MuiTabs } from '@material-ui/core';

const TabPanel: FC<TabPanelProps> = (props) => {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <>{children}</>}
    </div>
  );
};

const a11yProps = (index: number) => ({
  id: `simple-tab-${index}`,
  'aria-controls': `simple-tabpanel-${index}`,
});

const Tabs: FC<Props> = (props) => {
  const { tabs, onTabChange } = props;
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
    onTabChange && onTabChange(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar elevation={0} className={classes.bar} position="sticky">
        <MuiTabs
          textColor="primary"
          indicatorColor="primary"
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          {tabs.map((tab: Item, index: number) => (
            <Tab label={<Paper style={{ color: value === index ? 'inherit' : undefined}} elevation={0}>{tab.label}</Paper>} key={index} {...a11yProps(index)} />
          ))}
        </MuiTabs>
      </AppBar>
      {tabs.map((tab: Item, index: number) => (
        <TabPanel key={index} value={value} index={index}>
          {tab.component}
        </TabPanel>
      ))}
    </div>
  );
};

export default Tabs;
