import LargeButton from "./LargeButton"
import Title from "./Title"

function App() {

  // in Ternimal, write cd my-react-app, press enter
  // then, write npm run dev, press enter

  // Javascript code: if the user clicks on Student button, then load student log in page.
  // Otherwise, load the teacher's log in page if Teacher's button is selected.

  return (
    <div className="role-selection-container">
      <Title title="Please select your role"/>
      <LargeButton name="Student"/>
      <br />
      <LargeButton name="Teacher"/>
    </div>
  )
}

export default App