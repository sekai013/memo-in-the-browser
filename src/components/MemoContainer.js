import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import MemoNode from './MemoNode.js'

const mapStateToProps = (state, ownProps) => {
  return {
    memos: state.isExtensionEnabled ? state.memos : []
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {}
}

class MemoContainer extends Component {
  static get propTypes () {
    return {
      memos: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        position: PropTypes.shape({
          top: PropTypes.number.isRequired,
          left: PropTypes.number.isRequired
        }).isRequired,
        text: PropTypes.string.isRequired
      })).isRequired
    }
  }

  render () {
    const memoNodes = this.props.memos.map((memo, i) => {
      return <MemoNode key={i} onClick={this.props.onClick} {...memo} />
    })
    return (
      <div className='memoContainer'>
        {memoNodes}
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MemoContainer)
