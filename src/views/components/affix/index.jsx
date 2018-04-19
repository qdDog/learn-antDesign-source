import React, { Component } from "react"
import classNames from 'classnames'
import Tool from '../../../common/tool'
import './index.scss'

const getScroll = (win, top)  => {
  let ret = win[`page${top ? 'Y' : 'X'}Offset`];
  const method = 'scroll' + (top ? 'Top' : 'Left')
  if (typeof ret !== 'number') {
    const doc = win.document

    ret = doc.document[method]

    if (typeof ret !== 'number') {
      ret = doc.body[method]
    }
  }
  return ret
}

const getOffset = (element) => {
  const rect = element.getBoundingClientRect()
  const body = document.body
  const clientTop = element.clientTop || body.clientTop || 0
  const clientLeft = element.clientLeft || body.clientLeft || 0
  const scrollTop = getScroll(window, true)
  const scrollLeft = getScroll(window)

  return {
    top: rect.top + scrollTop - clientTop,
    left: rect.left + scrollLeft - clientLeft
  }
}

class Affix extends Component {
  constructor() {
    super()
    this.state = {
      affix: false,
      affixStyle: null
    }
  }
  static defaultProps = {
    offset: 0
  }
  handleScroll = () => {
    const affix = this.state.affix
    const scrollTop = getScroll(window, true)
    const elementOffset = getOffset(this.getDOMNode())
    if (!affix && (elementOffset.top - this.props.offset)) {
      this.setState({
        affix: true,
        affixStyle: {
          top: this.props.offset,
          left: elementOffset.left,
          width: this.getDOMNode().width
        }
      })
    }

    if (affix && (elementOffset.top - this.props.offset) > scrollTop) {
      this.setState({
        affix: false,
        affixStyle: null
      })
    }
  }

  componentDidMount() {
    this.scrollEvent = Tool.bindEvent(window, 'scroll', this.handleScroll)
    this.resizeEvent = Tool.bindEvent(window, 'resize', this.handleScroll)
  }

  componentWillUnmount() {
    if (this.scrollEvent) {
      this.scrollEvent.remove()
    }

    this.resizeEvent && this.resizeEvent.remove()
  }
  render() {
    const affix = this.state.affix ? 'ant-affix' : ''
    const className = classNames(this.props.className, affix)
    return (
      <div {...this.props}>
        <div className={className} style={this.state.affixStyle}>
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default Affix
