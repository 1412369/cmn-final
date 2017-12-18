import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import { withRouter } from 'react-router-dom';
import { Link, Route, Switch } from 'react-router-dom';
import { Button, Drawer, Toolbar } from 'react-md';
import { Home, About, CallHistory, Login, Profile } from './'
import NavItemLink from './NavItemLink'
const navItems = [{
  label: 'Home',
  to: '/',
  component: Home,
  exact: true,
  icon: 'inbox',
}, {
  label: 'Profile',
  component: Profile,
  to: `/profile`,
  icon: 'star',
}, {
  label: 'History',
  component: CallHistory,
  to: `/history`,
  icon: 'send',
}, {
  label: 'About',
  component: About,
  to: `/about`,
  icon: 'drafts',
}];

class Routing extends PureComponent {
  static propTypes = {
    location: PropTypes.object.isRequired,
  };
  state = { visible: false };

  componentDidMount() {
    // Need to set the renderNode since the drawer uses an overlay
    this.dialog = document.getElementById('drawer-routing-example-dialog');
  }

  showDrawer = () => {
    this.setState({ visible: true });
  };

  // hideDrawer = () => {
  //   this.setState({ visible: false });
  // };

  handleVisibility = (visible) => {
    this.setState({ visible });
  };

  render() {
    const { location } = this.props;
    const { visible } = this.state;
    return (
      <div>
        {/* <Toolbar colored fixed title="Đăng nhập" /> */}
        
        <Toolbar colored fixed title="Login as driver" nav={<Button icon onClick={this.showDrawer}>menu</Button>} />
        <CSSTransitionGroup
          component="div"
          transitionName="md-cross-fade"
          transitionEnterTimeout={0}
          transitionLeave={false}
        >
          <Switch key={location.pathname}>
            {
                navItems.map(({ to, component, exact }) => { 
                 return <Route key={to} path={to} exact={!!exact}  component={component}  /> 
              })
            }
          </Switch>
        </CSSTransitionGroup>
        <Drawer
          type={Drawer.DrawerTypes.TEMPORARY}
          visible={visible}
          onVisibilityChange={this.handleVisibility}
          header={<Toolbar title={<Link to="/">Thao tác</Link>} />}
          renderNode={this.dialog}
          navItems={navItems.map(props => <NavItemLink {...props} key={props.to} />)}
        />
      </div>
    );
  }
}
export default withRouter(Routing);