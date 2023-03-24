import React from "react"
import axios from "axios"
function App() {
const req = async ()=>{
  try {
    const data = {
      name: "Akash",
      email: "fadsfadf@autviz.com",
      password: "13455",
    };
    const res = await axios.post("http://localhost:4000/api/v1/user",data)
    console.log(res)
  } catch (error) {
    console.log(error)
  }
}
  React.useEffect(() => {
 req()
}, [])

  return (
    <div className="App">
     fsdafads
    </div>
  );
}

export default App;
