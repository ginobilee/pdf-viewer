import React, { Component } from 'react';
import { Document, Page } from 'react-pdf/dist/entry.webpack';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import qs from 'query-string';
import './Sample.less';

const options = {
  cMapUrl: 'cmaps/',
  cMapPacked: true,
};

export default class Sample extends Component {
  state = {
    file: '',
    numPages: null,
  }

  componentDidMount() {
    const { file } = qs.parse(window.location.search);
    if (file) {
      this.setState({
        file,
      })
    }
  }

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  }

  render() {
    const { file, numPages } = this.state;

    return (
      <div className="Example">
        <div className="Example__container">
          <div className="Example__container__document">
            <Document
              file={file}
              onLoadSuccess={this.onDocumentLoadSuccess}
              options={options}
              loading="loading..."
            >
              {
                Array.from(
                  new Array(numPages),
                  (el, index) => (
                    <Page
                      key={`page_${index + 1}`}
                      pageNumber={index + 1}
                    />
                  ),
                )
              }
            </Document>
          </div>
        </div>
      </div>
    );
  }
}
