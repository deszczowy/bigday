import React from 'react';

export default class FileInput extends React.Component {
    constructor(props) {
      super(props);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.fileInput = React.createRef();

      this.state = {
          content: ""
      };
    }

    loadFile = (e) => {

        try {
            var data = JSON.parse(e.target.result);
            console.log(data);
        } catch {
            console.log("Not on my watch");
        }
        this.setState(
            {content: e.target.result}
        );
    }

    handleSubmit(event) {
      event.preventDefault();

      var file = this.fileInput.current.files[0];

      var reader = new FileReader();
      reader.onload = this.loadFile;
      reader.readAsText(file);
    }
  
    render() {
        const {content} = this.state;

      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            Upload file:
            <input type="file" ref={this.fileInput} />
          </label>
          <br />{content}
          <button type="submit">Submit</button>
        </form>
      );
    }
  }