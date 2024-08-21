import {Login} from './page/login'
import {Register} from './page/register'
import { useState } from 'react';

function App() {
  const [index,setIndex] = useState(1)

  return (
    <>
      <div>
        <div onClick={() => {setIndex(0)}}>登录</div>
        <div onClick={() => {setIndex(1)}}>注册</div>
      </div>
      {
        index===0 ? <Login/> : <Register/>
      }
    </>

  );
}

export default App;
