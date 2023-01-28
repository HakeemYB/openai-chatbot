import { useState } from "react";
import { Configuration, OpenAIApi} from "openai";
import './App.css';

function App() {
const configuration = new Configuration({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const [prompt, setPrompt] = useState("");
const [result, setResult] = useState("");
const [loading, setLoading] = useState(false);

const handleClick = async () => {
  setLoading(true);
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      temperature: 0.7,
      max_tokens: 300,
    });
    setResult
    (response.data.choices[0].text);
  } catch (error) {
    console.log(error);
  }
  setLoading(false);
};

return (
  <main className="main">
    <div className="auto">

      <textarea
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Don't act smart, Think smart..."
        className="textarea"
        required
        ></textarea>

        <button
        onClick={handleClick}
        disabled={loading || prompt.length === 0}
        className="btn"
        >
          {loading ? "Thinking...": "Generate"}
        </button>

        <pre className="result">{result}</pre>
    </div>
  </main>
);

}

export default App;