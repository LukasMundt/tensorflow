import { ArrowPathIcon, PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { Button } from "flowbite-react";
import $ from "jquery";
import React from "react";
import Question from "./Questions";
import Typed from "react-typed";

class PageContainer extends React.Component {
  constructor(props) {
    super(props);
    this.typed = "";
    this.state = {
      showResult: false,
      result: "",
      question1: 2,
      question2: 2,
      question3: 2,
      question4: 2,
      question5: 2,
      question6: 2,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    // this.sortByStreet = this.sortByStreet.bind(this);
  }

  requestApi() {
    $.ajax({
      method: "GET",
      url:
        "http://localhost:5000/?q1=" +
        this.state.question1 +
        "&q2=" +
        this.state.question2 +
        "&q3=" +
        this.state.question3 +
        "&q4=" +
        this.state.question4 +
        "&q5=" +
        this.state.question5 +
        "&q6=" +
        this.state.question6,
      dataType: "json",
      processData: true,
      success: (data) => {
        console.log(data);
        this.setState({ result: data });
      },
    });
    // console.log(this.state);
  }

  handleChange(event) {
    this.setState({ showResult: false });
    if (event.target.id === "question1") {
      this.setState({ question1: event.target.value });
    } else if (event.target.id === "question2") {
      this.setState({ question2: event.target.value });
    } else if (event.target.id === "question3") {
      this.setState({ question3: event.target.value });
    } else if (event.target.id === "question4") {
      this.setState({ question4: event.target.value });
    } else if (event.target.id === "question5") {
      this.setState({ question5: event.target.value });
    } else if (event.target.id === "question6") {
      this.setState({ question6: event.target.value });
    }
    console.log(this.state);
  }

  handleSubmit(event) {
    this.requestApi();
    this.setState({ showResult: true });
  }

  render() {
    return (
      <div className="w-full px-10 lg:px-72">
        <div className="mt-5">
          <h2 className="text-3xl font-bold mb-4">Fragen:</h2>
        </div>
        <form onChange={this.handleChange} onReset={this.handleChange}>
          <Question
            id="question1"
            question="1. In der letzten Woche konnte ich bei Bedarf bewusst darauf achten,
            inwieweit ich gerade gestresst war."
          />
          <Question
            id="question2"
            question="2. In der letzten Woche konnte ich es aushalten, wenn ich Angst
            hatte."
          />
          <Question
            id="question3"
            question="3. In der letzten Woche konnte ich mich bei Bedarf gezielt von Ärger
            ablenken."
          />
          <Question
            id="question4"
            question="4. In der letzten Woche konnte ich es klar erkennen, wenn ich traurig war."
          />
          <Question
            id="question5"
            question="5. In der letzten Woche konnte ich es akzeptieren, wenn ich depressiv gestimmt war."
          />
          <Question
            id="question6"
            question="6. In der letzten Woche genoss ich meine positiven Gefühle ganz bewusst."
          />

          <div className="flex gap-3 mt-4">
            <Button
              onClick={this.handleSubmit}
              className="bg-green-400 hover:bg-green-500 "
            >
              <PaperAirplaneIcon className="h-5 w-5 mr-3" /> Absenden
            </Button>
            <Button type="reset" className="bg-red-400 hover:bg-red-500">
              <ArrowPathIcon className="h-5 w-5 mr-3" /> Zurücksetzen
            </Button>
          </div>
        </form>
        {this.state.showResult ? (
          <div
            id="answer"
            className="p-2 mt-6 bg-gray-300 border-b-4 border-gray-400"
          >
            <span className="font-bold">Antwort:</span>
            <br />

            <Typed
              typedRef={(typed) => {
                this.setState({ typed: typed });
              }}
              strings={[
                "",
                "Es wird der Wert " +
                  this.state.result.result +
                  ' ausgegeben. Das entspricht etwa dem Gefühl "' +
                  this.state.result.emotion +
                  '".',
              ]}
              typeSpeed={25}
            ></Typed>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default PageContainer;
