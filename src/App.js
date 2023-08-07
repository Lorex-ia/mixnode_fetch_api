import { useEffect, useState } from 'react';
import './App.css';

 
// This app queries the chain via the use of the swagger API: https://validator.nymtech.net/api/swagger/index.html

function App() {

//null is the default value
// nodeList is a getter, gets the value, setNodeList is a SETTER, sets the value
const [nodeList, setNodeList] = useState(null)


  // Use a useEffect in react apps
  useEffect(() => {
       //Writing the fetch query method
       async function fetchMixnodes(){
        // In Swagger, make a request and change the parameter after /v1/ to what you want:
        const response = await fetch("https://validator.nymtech.net/api/v1/mixnodes")
        const nodesList = await response.json();
        console.log(nodesList)
        // here the setter sets the getter to what's in the (), so basically saying nodeList=nodesList
        setNodeList(nodesList)
      
      }

    fetchMixnodes();
  }, [])

  // When I want HTML I write it with return
  // use {} when wanting js logic and get back to HTML with return
return (
  <div>
    <table style={{ borderCollapse: 'collapse', width: '100%', border: '3px solid black', paddingBlock:'10px' }}>
      {nodeList?.map((v,i) => {
        const rowNumber = i + 1;
        return (
          //only put the key at tr level
          <tr key={i}>
            <td style={{ border: '1px solid black', padding: '8px' }}>
              Mixnode number : {rowNumber}
            </td>
            <td style={{ border: '1px solid black', padding: '8px' }}>
              Identity key : {v.bond_information.mix_node.identity_key}
            </td>
            <td style={{ border: '1px solid black', padding: '8px' }}>
              Mix Port : {v.bond_information.mix_node.mix_port}
            </td>
          </tr>
        )
      })}
    </table>
  </div>
)
}


export default App;
