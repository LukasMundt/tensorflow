import React from "react";
import { Label, Select } from "flowbite-react";

class Question extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="mb-5">
        <Label htmlFor={this.props.id} className="text-xl">
          {this.props.question}
        </Label>
        <Select
          sizing="md"
          id={this.props.id}
          required={true}
          defaultValue={2}
        >
          <option value={0}>überhaupt nicht</option>
          <option value={1}>selten</option>
          <option value={2}>manchmal</option>
          <option value={3}>oft</option>
          <option value={4}>immer</option>
        </Select>
      </div>
    );
  }
}

export default Question;
