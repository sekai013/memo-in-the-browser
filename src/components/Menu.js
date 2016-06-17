import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { hideMenu } from '../actions/Menu.js'
import { switchExtension } from '../actions/Extension.js'
import { setLineColor, setBackgroundColor } from '../actions/Color.js'

const SubMenuType = {
  LineColor: 'LINE_COLOR',
  BackgroundColor: 'BACKGROUND_COLOR'
}

const mapStateToProps = (state, ownProps) => {
  return {
    isVisibleMenu: state.isVisibleMenu,
    isExtensionEnabled: state.isExtensionEnabled,
    lineColor: state.subMenu.lineColor,
    backgroundColor: state.subMenu.backgroundColor
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    hideMe: () => {
      dispatch(hideMenu())
    },
    switchExtension: () => {
      dispatch(switchExtension())
    },
    setLineColor: (color) => {
      dispatch(setLineColor(color))
    },
    setBackgroundColor: (color) => {
      dispatch(setBackgroundColor(color))
    }
  }
}

class Menu extends Component {
  static get propTypes () {
    return {
      isVisibleMenu: PropTypes.bool.isRequired,
      isExtensionEnabled: PropTypes.bool.isRequired,
      lineColor: PropTypes.string.isRequired,
      backgroundColor: PropTypes.string.isRequired,
      hideMe: PropTypes.func.isRequired,
      switchExtension: PropTypes.func.isRequired,
      setLineColor: PropTypes.func.isRequired,
      setBackgroundColor: PropTypes.func.isRequired
    }
  }

  componentDidMount () {
    this.setState({
      subMenuType: null
    })
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

  getLineColorSelector () {
    const style = {
      height: '30px',
      width: '30px',
      border: '1px solid #ccc',
      backgroundColor: this.props.lineColor
    }
    const onClickHandler = (event) => {
      this.setState({ subMenuType: SubMenuType.LineColor })
    }
    return (
      <div>
        <p>Line Color</p>
        <div style={style} onClick={onClickHandler}>
        </div>
      </div>
    )
  }

  getBackgroundColorSelector () {
    const style = {
      height: '30px',
      width: '30px',
      border: '1px solid #ccc',
      backgroundColor: this.props.backgroundColor
    }
    const onClickHandler = (event) => {
      this.setState({ subMenuType: SubMenuType.BackgroundColor })
    }
    return (
      <div>
        <p>Background Color</p>
        <div style={style} onClick={onClickHandler}>
        </div>
      </div>
    )
  }

  getColorPalette (paletteName, onClickHandler) {
    const colors = [
      '#e60012', '#f39800', '#fff100', '#009944', '#0068b7', '#1d2088', '#920783'
    ]
    const colorBoxStyle = {
      height: '30px',
      width: '30px',
      border: '1px solid #ccc'
    }
    const paletteStyle = {
      right: 0,
      top: '200px',
      position: 'fixed',
      width: '378px',
      border: '1px solid #ccc',
      zIndex: 10000,
      backgroundColor: '#e8e8e8'
    }
    const colorNodes = colors.map((color, i) => {
      const style = Object.assign({}, colorBoxStyle, { backgroundColor: color })
      return <div key={i} style={style} onClick={onClickHandler}></div>
    })
    return (
      <div style={paletteStyle}>
        <p>{paletteName}</p>
        {colorNodes}
      </div>
    )
  }

  getSubMenu () {
    switch (this.state.subMenuType) {
      case SubMenuType.LineColor:
        return this.getColorPalette('Line Color', (event) => {
          this.props.setLineColor(event.target.style.backgroundColor)
        })
      case SubMenuType.BackgroundColor:
        return this.getColorPalette('Background Color', (event) => {
          this.props.setBackgroundColor(event.target.style.backgroundColor)
        })
      default:
        return null
    }
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
      const mainMenuStyle = {
        right: 0,
        top: 0,
        position: 'fixed',
        height: '200px',
        width: '378px',
        border: '1px solid #ccc',
        borderTop: 0,
        zIndex: 10000,
        backgroundColor: '#e8e8e8'
      }
      return (
        <div>
          <div style={mainMenuStyle}>
            {this.getExtensionSwitcher()}
            {this.getLineColorSelector()}
            {this.getBackgroundColorSelector()}
            {this.getCloseButton()}
          </div>
          {this.getSubMenu()}
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
