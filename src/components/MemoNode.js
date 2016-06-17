import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { editMemo, focusOnMemo, removeMemo } from '../actions/Memo.js'
import { hoverMemo, saveCursorPosition } from '../actions/MemoClipboard.js'

const mapStateToProps = (state, ownProps) => {
  return {
    isFocused: state.focusedMemoId === ownProps.id
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    editText: (text) => {
      dispatch(editMemo(ownProps.id, text, ownProps.position))
    },
    moveTo: (position) => {
      dispatch(editMemo(ownProps.id, ownProps.text, position))
    },
    focus: () => {
      dispatch(focusOnMemo(ownProps.id))
    },
    blur: () => {
      dispatch(focusOnMemo(''))
    },
    removeMe: () => {
      dispatch(removeMemo(ownProps.id))
    },
    hover: () => {
      dispatch(hoverMemo(ownProps.id))
    },
    saveCursorPosition: (left, top) => {
      dispatch(saveCursorPosition(left, top))
    }
  }
}

class MemoNode extends Component {
  static get propTypes () {
    return {
      id: PropTypes.string.isRequired,
      position: PropTypes.shape({
        top: PropTypes.number.isRequired,
        left: PropTypes.number.isRequired
      }).isRequired,
      text: PropTypes.string.isRequired,
      color: PropTypes.shape({
        lineColor: PropTypes.string.isRequired,
        backgroundColor: PropTypes.string.isRequired
      }),
      isFocused: PropTypes.bool.isRequired,
      editText: PropTypes.func.isRequired,
      moveTo: PropTypes.func.isRequired,
      focus: PropTypes.func.isRequired,
      blur: PropTypes.func.isRequired,
      removeMe: PropTypes.func.isRequired,
      hover: PropTypes.func.isRequired
    }
  }

  componentDidMount () {
    if (this.props.isFocused) {
      this.refs.memoText.focus()
    }
  }

  componentDidUpdate (prevProps, prevState) {
    if (this.props.isFocused) {
      this.refs.memoText.focus()
    }
  }

  onChangeText (event) {
    this.props.editText(event.target.value)
  }

  onBlurText (event) {
    if (this.props.text) {
      return this.props.blur()
    }

    this.props.removeMe()
  }

  onDragStartNode (event) {
    this.setState({
      startPosition: {
        startX: event.clientX,
        startY: event.clientY
      }
    })
  }

  onDragNode (event) {
    const { clientX, clientY } = event
    if (clientX && clientY) {
      this.setState({
        endPosition: {
          endX: clientX,
          endY: clientY
        }
      })
    }
  }

  onDragEndNode (event) {
    const { startX, startY } = this.state.startPosition
    const { endX, endY } = this.state.endPosition
    const { left, top } = this.props.position
    this.props.moveTo({
      left: left + endX - startX,
      top: top + endY - startY
    })
  }

  onContextMenu (event) {
    event.stopPropagation()
    this.props.saveCursorPosition(event.pageX, event.pageY)
  }

  render () {
    const style = Object.assign({}, this.props.position, {
      color: this.props.color.lineColor,
      backgroundColor: this.props.color.backgroundColor,
      position: 'absolute'
    })

    if (this.props.isFocused) {
      return (
        <textarea className='memoText'
          ref='memoText'
          style={style}
          value={this.props.text}
          onChange={this.onChangeText.bind(this)}
          onBlur={this.onBlurText.bind(this)} />
      )
    }

    const paragraphs = this.props.text.split('\n').map((line, i) => {
      return <p key={i}>{line}</p>
    })

    return (
      <div className='memoNode'
        onClick={this.props.focus}
        onDragStart={this.onDragStartNode.bind(this)}
        onDrag={this.onDragNode.bind(this)}
        onDragEnd={this.onDragEndNode.bind(this)}
        onMouseEnter={this.props.hover}
        onContextMenu={this.onContextMenu.bind(this)}
        draggable='true'
        style={style}>
        {paragraphs}
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MemoNode)
