import "./App.css";
import { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [generatingAnswer, setGeneratingAnswer] = useState(false);

  async function generateAnswer(e) {
    setGeneratingAnswer(true);
    e.preventDefault();
    setAnswer("Loading... \n It might a while...");
    try {
      const response = await axios({
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${"AIzaSyCLBYt1TcwSAQLkDmEXOyZBYzINXKjSgMM"}`,
        method: "post",
        data: {
          contents: [{ parts: [{ text: question }] }],
        },
      });

      setAnswer(
        response["data"]["candidates"][0]["content"]["parts"][0]["text"]
      );
    } catch (error) {
      console.log(error);
      setAnswer("Sorry - Something went wrong.\n Please try again!");
    }

    setGeneratingAnswer(false);
  }

  return (
    <>
      <div className="bg-white h-screen p-3">
        <form
          onSubmit={generateAnswer}
          className="w-full md:w-2/3 m-auto text-center rounded align_vertical bg-gray-50 py-2"
        >
          <h1 className="text-3xl text-center">Chat AI</h1>

          <div className="w-full md:w-2/3 m-auto text-center rounded bg-gray-50 my-1 ">
            <p className="p-3 answer_size">{answer}</p>
          </div>

          <div className="flex">
            <textarea
              required
              className="border rounded textarea_size w-11/12 my-2 min-h-fit p-3"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask anything"
            ></textarea>
            <button
              type="submit"
              className="bg-blue-300 p-3 button_size button_size rounded-md mt-10 hover:bg-blue-400 transition-all duration-300"
              disabled={generatingAnswer}
            >
              Ask
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default App;
