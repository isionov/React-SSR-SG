import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchAdmins } from "../actions";
import requireAuth from "../components/hocs/requireAuth";

class UsersList extends Component {
  componentDidMount() {
    this.props.fetchAdmins();
  }

  renderUsers() {
    const { admins } = this.props;

    return admins.map((admin) => <li key={admin.id}>{admin.name}</li>);
  }

  render() {
    return (
      <div>
        List of users:
        <br />
        <ul>{this.renderUsers()}</ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { admins: state.admins };
}

function loadData(store) {
  return store.dispatch(fetchAdmins());
}

export default {
  loadData,
  component: connect(mapStateToProps, { fetchAdmins })(requireAuth(UsersList)),
};
