import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { editMemo, focusOnMemo, removeMemo } from '../actions/Memo.js'

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
    focus: () => {
      dispatch(focusOnMemo(ownProps.id))
    },
    blur: () => {
      dispatch(focusOnMemo(''))
    },
    removeMe: () => {
      dispatch(removeMemo(ownProps.id))
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
      isFocused: PropTypes.bool.isRequired,
      editText: PropTypes.func.isRequired,
      focus: PropTypes.func.isRequired,
      blur: PropTypes.func.isRequired,
      removeMe: PropTypes.func.isRequired
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

  render () {
    const style = Object.assign({}, this.props.position, { position: 'absolute' })

    if (this.props.isFocused) {
      return <textarea className='memoText' ref='memoText' style={style} value={this.props.text} onChange={this.onChangeText.bind(this)} onBlur={this.onBlurText.bind(this)} />
    }

    const paragraphs = this.props.text.split('\n').map((line, i) => {
      return <p key={i}>{line}</p>
    })

    return <div className='memoNode' onClick={this.props.focus} style={style}>{paragraphs}</div>
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MemoNode)
