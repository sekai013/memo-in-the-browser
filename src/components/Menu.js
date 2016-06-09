import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { hideMenu } from '../actions/Menu.js'
import { switchExtension } from '../actions/Extension.js'

const mapStateToProps = (state, ownProps) => {
  return {
    isVisibleMenu: state.isVisibleMenu,
    isExtensionEnabled: state.isExtensionEnabled
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    hideMe: () => {
      dispatch(hideMenu())
    },
    switchExtension: () => {
      dispatch(switchExtension())
    }
  }
}

class Menu extends Component {
  static get propTypes () {
    return {
      isVisibleMenu: PropTypes.bool.isRequired,
      isExtensionEnabled: PropTypes.bool.isRequired,
      hideMe: PropTypes.func.isRequired,
      switchExtension: PropTypes.func.isRequired
    }
  }

  getExtensionSwitcher () {
    const onClickHandler = (event) => {
      this.props.switchExtension()
    }

    return (
      <div onClick={onClickHandler}>
        <p>
          {this.props.isExtensionEnabled ? 'Disable' : 'Enable'} Extension
        </p>
      </div>
    )
  }

  getCloseButton () {
    const onClickHandler = (event) => {
      this.props.hideMe()
    }
    return (
      <div onClick={onClickHandler}>
        <p>Close</p>
      </div>
    )
  }

  render () {
    if (this.props.isVisibleMenu) {
      const style = {
        right: 0,
        top: 0,
        position: 'fixed',
        width: '378px',
        border: '1px solid #ccc',
        borderTop: 0,
        zIndex: 10000,
        backgroundColor: '#e8e8e8'
      }
      return (
        <div style={style}>
          {this.getExtensionSwitcher()}
          {this.getCloseButton()}
        </div>
      )
    }
    return null
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Menu)
